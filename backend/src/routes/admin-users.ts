import {
  Router,
  type Request,
  type Response,
} from "express";
import { z } from "zod";
import { hashPassword } from "../lib/password";
import { prisma } from "../lib/prisma";
import { getRequestMetadata } from "../lib/session";
import { authenticateAdmin } from "../middleware/authenticate";
import { authorizeAdminRoles } from "../middleware/authorize";
import type { AuthContext } from "../types/auth";

export const adminUsersRouter = Router();

adminUsersRouter.use(
  authenticateAdmin,
  authorizeAdminRoles("SUPER_ADMIN"),
);

const userIdSchema = z.string().uuid();

const manageableRoleSchema = z.enum([
  "CONTENT_ADMIN",
  "EDITOR",
]);

const manageableStatusSchema = z.enum([
  "ACTIVE",
  "DISABLED",
]);

const createAdministratorSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((value) =>
      value.toLowerCase(),
    ),
  displayName: z
    .string()
    .trim()
    .min(2)
    .max(120),
  password: z
    .string()
    .min(12)
    .max(128),
  role: manageableRoleSchema,
});

const updateRoleSchema = z.object({
  role: manageableRoleSchema,
});

const updateStatusSchema = z.object({
  status: manageableStatusSchema,
});

const publicAdministratorSelect = {
  id: true,
  email: true,
  displayName: true,
  role: true,
  status: true,
  failedLoginCount: true,
  lockedUntil: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

function getAuthentication(
  response: Response,
) {
  return response.locals.auth as AuthContext;
}

function getTargetAdministratorId(
  request: Request,
  response: Response,
) {
  const parsed = userIdSchema.safeParse(
    request.params.id,
  );

  if (!parsed.success) {
    response.status(400).json({
      success: false,
      message:
        "The administrator identifier is invalid.",
    });

    return null;
  }

  return parsed.data;
}

adminUsersRouter.get(
  "/",
  async (_request, response, next) => {
    try {
      const administrators =
        await prisma.adminUser.findMany({
          select:
            publicAdministratorSelect,
          orderBy: [
            {
              role: "asc",
            },
            {
              createdAt: "desc",
            },
          ],
        });

      response.status(200).json({
        success: true,
        administrators,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminUsersRouter.post(
  "/",
  async (request, response, next) => {
    try {
      const parsed =
        createAdministratorSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "Valid administrator details are required.",
          errors: parsed.error.flatten(),
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      const existingAdministrator =
        await prisma.adminUser.findUnique({
          where: {
            email: parsed.data.email,
          },
          select: {
            id: true,
          },
        });

      if (existingAdministrator) {
        response.status(409).json({
          success: false,
          message:
            "An administrator already uses this email address.",
        });
        return;
      }

      const passwordHash =
        await hashPassword(
          parsed.data.password,
        );

      const requestMetadata =
        getRequestMetadata(request);

      const administrator =
        await prisma.$transaction(
          async (transaction) => {
            const createdAdministrator =
              await transaction.adminUser.create({
                data: {
                  email: parsed.data.email,
                  displayName:
                    parsed.data.displayName,
                  passwordHash,
                  role: parsed.data.role,
                  status: "ACTIVE",
                },
                select:
                  publicAdministratorSelect,
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "ADMIN_USER_CREATED",
                entityType: "AdminUser",
                entityId:
                  createdAdministrator.id,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  createdEmail:
                    createdAdministrator.email,
                  createdRole:
                    createdAdministrator.role,
                },
              },
            });

            return createdAdministrator;
          },
        );

      response.status(201).json({
        success: true,
        administrator,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminUsersRouter.patch(
  "/:id/role",
  async (request, response, next) => {
    try {
      const targetAdministratorId =
        getTargetAdministratorId(
          request,
          response,
        );

      if (!targetAdministratorId) {
        return;
      }

      const parsed =
        updateRoleSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "A valid administrator role is required.",
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      if (
        targetAdministratorId ===
        authentication.admin.id
      ) {
        response.status(400).json({
          success: false,
          message:
            "You cannot change your own administrator role.",
        });
        return;
      }

      const targetAdministrator =
        await prisma.adminUser.findUnique({
          where: {
            id: targetAdministratorId,
          },
          select: {
            id: true,
            role: true,
          },
        });

      if (!targetAdministrator) {
        response.status(404).json({
          success: false,
          message:
            "Administrator account not found.",
        });
        return;
      }

      if (
        targetAdministrator.role ===
        "SUPER_ADMIN"
      ) {
        response.status(400).json({
          success: false,
          message:
            "The super administrator role cannot be changed through this endpoint.",
        });
        return;
      }

      const requestMetadata =
        getRequestMetadata(request);

      const administrator =
        await prisma.$transaction(
          async (transaction) => {
            const updatedAdministrator =
              await transaction.adminUser.update({
                where: {
                  id: targetAdministratorId,
                },
                data: {
                  role: parsed.data.role,
                },
                select:
                  publicAdministratorSelect,
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "ADMIN_USER_ROLE_CHANGED",
                entityType: "AdminUser",
                entityId:
                  targetAdministratorId,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  previousRole:
                    targetAdministrator.role,
                  newRole:
                    updatedAdministrator.role,
                },
              },
            });

            return updatedAdministrator;
          },
        );

      response.status(200).json({
        success: true,
        administrator,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminUsersRouter.patch(
  "/:id/status",
  async (request, response, next) => {
    try {
      const targetAdministratorId =
        getTargetAdministratorId(
          request,
          response,
        );

      if (!targetAdministratorId) {
        return;
      }

      const parsed =
        updateStatusSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "A valid administrator status is required.",
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      if (
        targetAdministratorId ===
        authentication.admin.id
      ) {
        response.status(400).json({
          success: false,
          message:
            "You cannot change your own account status.",
        });
        return;
      }

      const targetAdministrator =
        await prisma.adminUser.findUnique({
          where: {
            id: targetAdministratorId,
          },
          select: {
            id: true,
            role: true,
            status: true,
          },
        });

      if (!targetAdministrator) {
        response.status(404).json({
          success: false,
          message:
            "Administrator account not found.",
        });
        return;
      }

      if (
        targetAdministrator.role ===
        "SUPER_ADMIN"
      ) {
        response.status(400).json({
          success: false,
          message:
            "The super administrator status cannot be changed through this endpoint.",
        });
        return;
      }

      const requestMetadata =
        getRequestMetadata(request);

      const result =
        await prisma.$transaction(
          async (transaction) => {
            const updatedAdministrator =
              await transaction.adminUser.update({
                where: {
                  id: targetAdministratorId,
                },
                data: {
                  status:
                    parsed.data.status,
                  failedLoginCount: 0,
                  lockedUntil: null,
                },
                select:
                  publicAdministratorSelect,
              });

            let revokedSessions = 0;

            if (
              parsed.data.status ===
              "DISABLED"
            ) {
              const revoked =
                await transaction.adminSession.updateMany({
                  where: {
                    adminUserId:
                      targetAdministratorId,
                    revokedAt: null,
                  },
                  data: {
                    revokedAt: new Date(),
                  },
                });

              revokedSessions =
                revoked.count;
            }

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "ADMIN_USER_STATUS_CHANGED",
                entityType: "AdminUser",
                entityId:
                  targetAdministratorId,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  previousStatus:
                    targetAdministrator.status,
                  newStatus:
                    updatedAdministrator.status,
                  revokedSessions,
                },
              },
            });

            return {
              administrator:
                updatedAdministrator,
              revokedSessions,
            };
          },
        );

      response.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminUsersRouter.post(
  "/:id/revoke-sessions",
  async (request, response, next) => {
    try {
      const targetAdministratorId =
        getTargetAdministratorId(
          request,
          response,
        );

      if (!targetAdministratorId) {
        return;
      }

      const authentication =
        getAuthentication(response);

      if (
        targetAdministratorId ===
        authentication.admin.id
      ) {
        response.status(400).json({
          success: false,
          message:
            "Use the logout endpoint to end your current session.",
        });
        return;
      }

      const targetAdministrator =
        await prisma.adminUser.findUnique({
          where: {
            id: targetAdministratorId,
          },
          select: {
            id: true,
            email: true,
          },
        });

      if (!targetAdministrator) {
        response.status(404).json({
          success: false,
          message:
            "Administrator account not found.",
        });
        return;
      }

      const requestMetadata =
        getRequestMetadata(request);

      const revokedSessions =
        await prisma.$transaction(
          async (transaction) => {
            const revoked =
              await transaction.adminSession.updateMany({
                where: {
                  adminUserId:
                    targetAdministratorId,
                  revokedAt: null,
                },
                data: {
                  revokedAt: new Date(),
                },
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "ADMIN_USER_SESSIONS_REVOKED",
                entityType: "AdminUser",
                entityId:
                  targetAdministratorId,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  targetEmail:
                    targetAdministrator.email,
                  revokedSessions:
                    revoked.count,
                },
              },
            });

            return revoked.count;
          },
        );

      response.status(200).json({
        success: true,
        revokedSessions,
      });
    } catch (error) {
      next(error);
    }
  },
);