import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { authenticateAdmin } from "../middleware/authenticate";
import { authorizeAdminRoles } from "../middleware/authorize";

export const adminAuditLogsRouter = Router();

adminAuditLogsRouter.use(authenticateAdmin);
adminAuditLogsRouter.use(
  authorizeAdminRoles("SUPER_ADMIN"),
);

const auditLogQuerySchema = z.object({
  action: z
    .string()
    .trim()
    .max(80)
    .optional(),
  entityType: z
    .string()
    .trim()
    .max(80)
    .optional(),
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20),
});

const auditLogSelect = {
  id: true,
  actorId: true,
  action: true,
  entityType: true,
  entityId: true,
  ipAddress: true,
  userAgent: true,
  metadata: true,
  createdAt: true,
  actor: {
    select: {
      id: true,
      displayName: true,
      email: true,
    },
  },
} as const;

adminAuditLogsRouter.get(
  "/",
  async (request, response, next) => {
    try {
      const parsed =
        auditLogQuerySchema.safeParse(
          request.query,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "The audit-log filters are invalid.",
          errors: parsed.error.flatten(),
        });
        return;
      }

      const {
        action,
        entityType,
        page,
        pageSize,
      } = parsed.data;

      const where:
        Prisma.AuditLogWhereInput = {
        ...(action
          ? {
              action: {
                contains: action,
                mode: "insensitive",
              },
            }
          : {}),
        ...(entityType
          ? {
              entityType: {
                contains: entityType,
                mode: "insensitive",
              },
            }
          : {}),
      };

      const [
        auditLogs,
        total,
      ] = await prisma.$transaction([
        prisma.auditLog.findMany({
          where,
          select: auditLogSelect,
          orderBy: {
            createdAt: "desc",
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.auditLog.count({
          where,
        }),
      ]);

      response.status(200).json({
        success: true,
        auditLogs,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(
            total / pageSize,
          ),
        },
      });
    } catch (error) {
      next(error);
    }
  },
);