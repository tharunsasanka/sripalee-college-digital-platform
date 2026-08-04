import { Router, type Response } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { env } from "../config/env";
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
} from "../lib/auth-cookie";
import { writeAuditLog } from "../lib/audit";
import { verifyPassword } from "../lib/password";
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

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
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
  response.status(401).json({
    success: false,
    message: genericLoginMessage,
  });
}

authRouter.post(
  "/login",
  loginRateLimiter,
  async (request, response, next) => {
    try {
      const parsed =
        loginSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "A valid email address and password are required.",
        });
        return;
      }

      const { email, password } =
        parsed.data;

      const administrator =
        await prisma.adminUser.findUnique({
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
            failedLoginCount: true,
            lockedUntil: true,
          },
        });

      if (!administrator) {
        await verifyPassword(
          password,
          dummyPasswordHash,
        );

        await writeAuditLog({
          request,
          action: "ADMIN_LOGIN_FAILED",
          entityType: "AdminUser",
          metadata: {
            reason:
              "invalid_credentials",
            matchedAccount: false,
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

      const now = new Date();

      const activeLock =
        administrator.lockedUntil !==
          null &&
        administrator.lockedUntil.getTime() >
          now.getTime();

      if (activeLock) {
        await writeAuditLog({
          request,
          actorId: administrator.id,
          action: "ADMIN_LOGIN_BLOCKED",
          entityType: "AdminUser",
          entityId: administrator.id,
          metadata: {
            reason: "account_locked",
          },
        });

        sendGenericLoginFailure(
          response,
        );
        return;
      }

      if (
        administrator.status !== "ACTIVE"
      ) {
        await writeAuditLog({
          request,
          actorId: administrator.id,
          action: "ADMIN_LOGIN_FAILED",
          entityType: "AdminUser",
          entityId: administrator.id,
          metadata: {
            reason: "inactive_account",
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
          currentFailureCount + 1;

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

        await prisma.adminUser.update({
          where: {
            id: administrator.id,
          },
          data: {
            failedLoginCount:
              nextFailureCount,
            lockedUntil,
          },
        });

        await writeAuditLog({
          request,
          actorId: administrator.id,
          action: shouldLockAccount
            ? "ADMIN_ACCOUNT_LOCKED"
            : "ADMIN_LOGIN_FAILED",
          entityType: "AdminUser",
          entityId: administrator.id,
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
        await prisma.adminUser.update({
          where: {
            id: administrator.id,
          },
          data: {
            failedLoginCount: 0,
            lockedUntil: null,
            lastLoginAt: now,
          },
        });
      } catch (error) {
        await revokeAdminSession(
          session.token,
        );

        throw error;
      }

      await writeAuditLog({
        request,
        actorId: administrator.id,
        action: "ADMIN_LOGIN_SUCCEEDED",
        entityType: "AdminSession",
        entityId: session.sessionId,
        metadata: {
          role: administrator.role,
        },
      });

      setAdminSessionCookie(
        response,
        session.token,
        session.expiresAt,
      );

      response.status(200).json({
        success: true,
        administrator: {
          id: administrator.id,
          email: administrator.email,
          displayName:
            administrator.displayName,
          role: administrator.role,
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
  async (request, response, next) => {
    try {
      const token =
        request.cookies?.[
          env.sessionCookieName
        ];

      let authentication:
        | AuthContext
        | null = null;

      if (typeof token === "string") {
        authentication =
          await resolveAdminSession(
            token,
          );

        await revokeAdminSession(token);
      }

      clearAdminSessionCookie(
        response,
      );

      if (authentication) {
        await writeAuditLog({
          request,
          actorId:
            authentication.admin.id,
          action:
            "ADMIN_LOGOUT_SUCCEEDED",
          entityType: "AdminSession",
          entityId:
            authentication.sessionId,
        });
      }

      response.status(200).json({
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
  (_request, response) => {
    const authentication =
      response.locals.auth as
        AuthContext;

    response.status(200).json({
      success: true,
      administrator:
        authentication.admin,
      session: {
        id: authentication.sessionId,
        expiresAt:
          authentication.expiresAt,
      },
    });
  },
);