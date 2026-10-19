import {
  Router,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";

import { env } from "../config/env";
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
} from "../lib/auth-cookie";
import { writeAuditLog } from "../lib/audit";
import {
  hashPassword,
  verifyPassword,
} from "../lib/password";
import { prisma } from "../lib/prisma";
import {
  createAdminSession,
  resolveAdminSession,
  revokeAdminSession,
} from "../lib/session";
import { authenticateAdmin } from "../middleware/authenticate";
import type { AuthContext } from "../types/auth";

export const authRouter = Router();

const genericLoginMessage =
  "The email address or password is incorrect.";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((value) =>
      value.toLowerCase(),
    ),

  password: z
    .string()
    .min(1)
    .max(128),
});

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1)
      .max(128),

    newPassword: z
      .string()
      .min(
        12,
        "The new password must contain at least 12 characters.",
      )
      .max(128),

    confirmPassword: z
      .string()
      .min(1)
      .max(128),
  })
  .superRefine(
    (
      value,
      context,
    ) => {
      if (
        value.newPassword !==
        value.confirmPassword
      ) {
        context.addIssue({
          code: "custom",
          path: [
            "confirmPassword",
          ],
          message:
            "The new password confirmation does not match.",
        });
      }

      if (
        value.currentPassword ===
        value.newPassword
      ) {
        context.addIssue({
          code: "custom",
          path: [
            "newPassword",
          ],
          message:
            "The new password must be different from the current password.",
        });
      }
    },
  );

const loginRateLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    limit: 20,

    standardHeaders:
      "draft-8",

    legacyHeaders: false,

    skipSuccessfulRequests:
      true,

    message: {
      success: false,
      message:
        "Too many login attempts. Please try again later.",
    },
  });

const passwordChangeRateLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    limit: 10,

    standardHeaders:
      "draft-8",

    legacyHeaders: false,

    message: {
      success: false,
      message:
        "Too many password change attempts. Please try again later.",
    },
  });

const dummyPasswordHash = [
  "scrypt",
  "32768",
  "8",
  "3",
  "00000000000000000000000000000000",
  "00".repeat(64),
].join("$");

function sendGenericLoginFailure(
  response: Response,
) {
  response
    .status(401)
    .json({
      success: false,
      message:
        genericLoginMessage,
    });
}

authRouter.post(
  "/login",
  loginRateLimiter,
  async (
    request,
    response,
    next,
  ) => {
    try {
      const parsed =
        loginSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response
          .status(400)
          .json({
            success: false,
            message:
              "A valid email address and password are required.",
          });

        return;
      }

      const {
        email,
        password,
      } = parsed.data;

      const administrator =
        await prisma.adminUser.findUnique(
          {
            where: {
              email,
            },

            select: {
              id: true,
              email: true,
              displayName: true,
              passwordHash: true,
              role: true,
              status: true,
              failedLoginCount:
                true,
              lockedUntil: true,
            },
          },
        );

      if (!administrator) {
        await verifyPassword(
          password,
          dummyPasswordHash,
        );

        await writeAuditLog({
          request,
          action:
            "ADMIN_LOGIN_FAILED",
          entityType:
            "AdminUser",

          metadata: {
            reason:
              "invalid_credentials",
            matchedAccount:
              false,
          },
        });

        sendGenericLoginFailure(
          response,
        );

        return;
      }

      const passwordIsValid =
        await verifyPassword(
          password,
          administrator.passwordHash,
        );

      const now =
        new Date();

      const activeLock =
        administrator.lockedUntil !==
          null &&
        administrator.lockedUntil.getTime() >
          now.getTime();

      if (activeLock) {
        await writeAuditLog({
          request,
          actorId:
            administrator.id,
          action:
            "ADMIN_LOGIN_BLOCKED",
          entityType:
            "AdminUser",
          entityId:
            administrator.id,

          metadata: {
            reason:
              "account_locked",
          },
        });

        sendGenericLoginFailure(
          response,
        );

        return;
      }

      if (
        administrator.status !==
        "ACTIVE"
      ) {
        await writeAuditLog({
          request,
          actorId:
            administrator.id,
          action:
            "ADMIN_LOGIN_FAILED",
          entityType:
            "AdminUser",
          entityId:
            administrator.id,

          metadata: {
            reason:
              "inactive_account",
          },
        });

        sendGenericLoginFailure(
          response,
        );

        return;
      }

      if (!passwordIsValid) {
        const previousLockExpired =
          administrator.lockedUntil !==
            null &&
          administrator.lockedUntil.getTime() <=
            now.getTime();

        const currentFailureCount =
          previousLockExpired
            ? 0
            : administrator.failedLoginCount;

        const nextFailureCount =
          currentFailureCount +
          1;

        const shouldLockAccount =
          nextFailureCount >=
          env.loginMaxAttempts;

        const lockedUntil =
          shouldLockAccount
            ? new Date(
                now.getTime() +
                  env.loginLockMinutes *
                    60 *
                    1000,
              )
            : null;

        await prisma.adminUser.update(
          {
            where: {
              id:
                administrator.id,
            },

            data: {
              failedLoginCount:
                nextFailureCount,
              lockedUntil,
            },
          },
        );

        await writeAuditLog({
          request,
          actorId:
            administrator.id,

          action:
            shouldLockAccount
              ? "ADMIN_ACCOUNT_LOCKED"
              : "ADMIN_LOGIN_FAILED",

          entityType:
            "AdminUser",

          entityId:
            administrator.id,

          metadata: {
            reason:
              "invalid_credentials",

            failedLoginCount:
              nextFailureCount,

            accountLocked:
              shouldLockAccount,
          },
        });

        sendGenericLoginFailure(
          response,
        );

        return;
      }

      const session =
        await createAdminSession(
          administrator.id,
          request,
        );

      try {
        await prisma.adminUser.update(
          {
            where: {
              id:
                administrator.id,
            },

            data: {
              failedLoginCount:
                0,

              lockedUntil: null,

              lastLoginAt: now,
            },
          },
        );
      } catch (error) {
        await revokeAdminSession(
          session.token,
        );

        throw error;
      }

      await writeAuditLog({
        request,

        actorId:
          administrator.id,

        action:
          "ADMIN_LOGIN_SUCCEEDED",

        entityType:
          "AdminSession",

        entityId:
          session.sessionId,

        metadata: {
          role:
            administrator.role,
        },
      });

      setAdminSessionCookie(
        response,
        session.token,
        session.expiresAt,
      );

      response
        .status(200)
        .json({
          success: true,

          administrator: {
            id:
              administrator.id,

            email:
              administrator.email,

            displayName:
              administrator.displayName,

            role:
              administrator.role,

            status:
              administrator.status,
          },

          session: {
            expiresAt:
              session.expiresAt,
          },
        });
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post(
  "/logout",
  async (
    request,
    response,
    next,
  ) => {
    try {
      const token =
        request.cookies?.[
          env.sessionCookieName
        ];

      let authentication:
        | AuthContext
        | null = null;

      if (
        typeof token ===
        "string"
      ) {
        authentication =
          await resolveAdminSession(
            token,
          );

        await revokeAdminSession(
          token,
        );
      }

      clearAdminSessionCookie(
        response,
      );

      if (authentication) {
        await writeAuditLog({
          request,

          actorId:
            authentication.admin
              .id,

          action:
            "ADMIN_LOGOUT_SUCCEEDED",

          entityType:
            "AdminSession",

          entityId:
            authentication.sessionId,
        });
      }

      response
        .status(200)
        .json({
          success: true,

          message:
            "Administrator session ended.",
        });
    } catch (error) {
      next(error);
    }
  },
);

authRouter.get(
  "/me",
  authenticateAdmin,
  (
    _request,
    response,
  ) => {
    const authentication =
      response.locals
        .auth as AuthContext;

    response
      .status(200)
      .json({
        success: true,

        administrator:
          authentication.admin,

        session: {
          id:
            authentication.sessionId,

          expiresAt:
            authentication.expiresAt,
        },
      });
  },
);

authRouter.post(
  "/change-password",
  authenticateAdmin,
  passwordChangeRateLimiter,
  async (
    request,
    response,
    next,
  ) => {
    try {
      const parsed =
        changePasswordSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response
          .status(400)
          .json({
            success: false,

            message:
              "Valid password change details are required.",

            errors:
              parsed.error.flatten(),
          });

        return;
      }

      const authentication =
        response.locals
          .auth as AuthContext;

      const administrator =
        await prisma.adminUser.findUnique(
          {
            where: {
              id:
                authentication
                  .admin.id,
            },

            select: {
              id: true,
              email: true,
              status: true,
              passwordHash: true,
            },
          },
        );

      if (
        !administrator ||
        administrator.status !==
          "ACTIVE"
      ) {
        clearAdminSessionCookie(
          response,
        );

        response
          .status(401)
          .json({
            success: false,

            message:
              "Administrator authentication is required.",
          });

        return;
      }

      const currentPasswordIsValid =
        await verifyPassword(
          parsed.data
            .currentPassword,

          administrator.passwordHash,
        );

      if (
        !currentPasswordIsValid
      ) {
        await writeAuditLog({
          request,

          actorId:
            administrator.id,

          action:
            "ADMIN_PASSWORD_CHANGE_FAILED",

          entityType:
            "AdminUser",

          entityId:
            administrator.id,

          metadata: {
            reason:
              "incorrect_current_password",
          },
        });

        response
          .status(400)
          .json({
            success: false,

            message:
              "The current password is incorrect.",
          });

        return;
      }

      const newPasswordHash =
        await hashPassword(
          parsed.data.newPassword,
        );

      const now =
        new Date();

      const result =
        await prisma.$transaction(
          async (
            transaction,
          ) => {
            await transaction.adminUser.update(
              {
                where: {
                  id:
                    administrator.id,
                },

                data: {
                  passwordHash:
                    newPasswordHash,

                  failedLoginCount:
                    0,

                  lockedUntil: null,
                },
              },
            );

            const revoked =
              await transaction.adminSession.updateMany(
                {
                  where: {
                    adminUserId:
                      administrator.id,

                    revokedAt:
                      null,
                  },

                  data: {
                    revokedAt:
                      now,
                  },
                },
              );

            await transaction.auditLog.create(
              {
                data: {
                  actorId:
                    administrator.id,

                  action:
                    "ADMIN_PASSWORD_CHANGED",

                  entityType:
                    "AdminUser",

                  entityId:
                    administrator.id,

                  metadata: {
                    revokedSessions:
                      revoked.count,
                  },
                },
              },
            );

            return {
              revokedSessions:
                revoked.count,
            };
          },
        );

      clearAdminSessionCookie(
        response,
      );

      response
        .status(200)
        .json({
          success: true,

          message:
            "Password changed successfully. Please sign in again.",

          revokedSessions:
            result.revokedSessions,
        });
    } catch (error) {
      next(error);
    }
  },
);