import { randomUUID } from "node:crypto";
import {
  Router,
  type Response,
} from "express";
import { z } from "zod";
import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { getRequestMetadata } from "../lib/session";
import { authenticateAdmin } from "../middleware/authenticate";
import { authorizeAdminRoles } from "../middleware/authorize";
import type { AuthContext } from "../types/auth";

export const adminContentRouter = Router();

adminContentRouter.use(authenticateAdmin);

const contentTypeSchema = z.enum([
  "NEWS",
  "NOTICE",
  "EVENT",
]);

const contentStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(200)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must use lowercase letters, numbers, and hyphens.",
  );

const dateInputSchema = z
  .string()
  .trim()
  .max(80)
  .refine(
    (value) =>
      !Number.isNaN(Date.parse(value)),
    "A valid date and time is required.",
  )
  .nullable()
  .optional();

const createContentSchema = z.object({
  type: contentTypeSchema,
  title: z.string().trim().min(3).max(180),
  slug: slugSchema.optional(),
  summary: z
    .string()
    .trim()
    .max(320)
    .nullable()
    .optional(),
  body: z.string().trim().min(1),
  featured: z.boolean().optional().default(false),
  eventStartAt: dateInputSchema,
  eventEndAt: dateInputSchema,
  eventLocation: z
    .string()
    .trim()
    .max(200)
    .nullable()
    .optional(),
});

const updateContentSchema = z.object({
  type: contentTypeSchema.optional(),
  title: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .optional(),
  slug: slugSchema.optional(),
  summary: z
    .string()
    .trim()
    .max(320)
    .nullable()
    .optional(),
  body: z.string().trim().min(1).optional(),
  featured: z.boolean().optional(),
  eventStartAt: dateInputSchema,
  eventEndAt: dateInputSchema,
  eventLocation: z
    .string()
    .trim()
    .max(200)
    .nullable()
    .optional(),
});

const listContentSchema = z.object({
  type: contentTypeSchema.optional(),
  status: contentStatusSchema.optional(),
  deleted: z
    .enum(["exclude", "include", "only"])
    .default("exclude"),
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

const idSchema = z.string().uuid();

const administratorContentSelect = {
  id: true,
  type: true,
  title: true,
  slug: true,
  summary: true,
  body: true,
  status: true,
  featured: true,
  publishedAt: true,
  eventStartAt: true,
  eventEndAt: true,
  eventLocation: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: {
      id: true,
      displayName: true,
      email: true,
    },
  },
  updatedBy: {
    select: {
      id: true,
      displayName: true,
      email: true,
    },
  },
} as const;

function getAuthentication(
  response: Response,
) {
  return response.locals.auth as AuthContext;
}

function normalizeNullableText(
  value: string | null | undefined,
) {
  if (value === null) {
    return null;
  }

  if (value === undefined) {
    return undefined;
  }

  const normalized = value.trim();

  return normalized || null;
}

function parseDate(
  value: string | null | undefined,
) {
  if (!value) {
    return null;
  }

  return new Date(value);
}

function createSlug(value: string) {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);

  return normalized || "content";
}

async function createUniqueSlug(
  value: string,
  excludedId?: string,
) {
  const baseSlug = createSlug(value);

  for (
    let attempt = 0;
    attempt < 50;
    attempt += 1
  ) {
    const suffix =
      attempt === 0
        ? ""
        : `-${attempt + 1}`;

    const candidate = `${baseSlug.slice(
      0,
      200 - suffix.length,
    )}${suffix}`;

    const existing =
      await prisma.contentEntry.findFirst({
        where: {
          slug: candidate,
          ...(excludedId
            ? {
                id: {
                  not: excludedId,
                },
              }
            : {}),
        },
        select: {
          id: true,
        },
      });

    if (!existing) {
      return candidate;
    }
  }

  return `${baseSlug.slice(0, 191)}-${randomUUID().slice(0, 8)}`;
}

function validateEventDates(
  type: string,
  eventStartAt: Date | null,
  eventEndAt: Date | null,
) {
  if (type !== "EVENT") {
    return null;
  }

  if (!eventStartAt) {
    return "Events require a start date and time.";
  }

  if (
    eventEndAt &&
    eventEndAt.getTime() <
      eventStartAt.getTime()
  ) {
    return "The event end date cannot be earlier than its start date.";
  }

  return null;
}

adminContentRouter.get(
  "/",
  async (request, response, next) => {
    try {
      const parsed =
        listContentSchema.safeParse(
          request.query,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "The content filters are invalid.",
        });
        return;
      }

      const {
        type,
        status,
        deleted,
        page,
        pageSize,
      } = parsed.data;

      const where:
        Prisma.ContentEntryWhereInput = {
        ...(type ? { type } : {}),
        ...(status ? { status } : {}),
        ...(deleted === "exclude"
          ? {
              deletedAt: null,
            }
          : {}),
        ...(deleted === "only"
          ? {
              deletedAt: {
                not: null,
              },
            }
          : {}),
      };

      const [
        content,
        total,
      ] = await prisma.$transaction([
        prisma.contentEntry.findMany({
          where,
          select:
            administratorContentSelect,
          orderBy: {
            updatedAt: "desc",
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.contentEntry.count({
          where,
        }),
      ]);

      response.status(200).json({
        success: true,
        content,
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

adminContentRouter.get(
  "/:id",
  async (request, response, next) => {
    try {
      const parsed = idSchema.safeParse(
        request.params.id,
      );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "The content identifier is invalid.",
        });
        return;
      }

      const content =
        await prisma.contentEntry.findUnique({
          where: {
            id: parsed.data,
          },
          select:
            administratorContentSelect,
        });

      if (!content) {
        response.status(404).json({
          success: false,
          message:
            "The content entry was not found.",
        });
        return;
      }

      response.status(200).json({
        success: true,
        content,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminContentRouter.post(
  "/",
  async (request, response, next) => {
    try {
      const parsed =
        createContentSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "Valid content details are required.",
          errors: parsed.error.flatten(),
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      const eventStartAt = parseDate(
        parsed.data.eventStartAt,
      );

      const eventEndAt = parseDate(
        parsed.data.eventEndAt,
      );

      const eventError =
        validateEventDates(
          parsed.data.type,
          eventStartAt,
          eventEndAt,
        );

      if (eventError) {
        response.status(400).json({
          success: false,
          message: eventError,
        });
        return;
      }

      const slug =
        await createUniqueSlug(
          parsed.data.slug ??
            parsed.data.title,
        );

      const requestMetadata =
        getRequestMetadata(request);

      const content =
        await prisma.$transaction(
          async (transaction) => {
            const created =
              await transaction.contentEntry.create({
                data: {
                  type: parsed.data.type,
                  title: parsed.data.title,
                  slug,
                  summary:
                    normalizeNullableText(
                      parsed.data.summary,
                    ) ?? null,
                  body: parsed.data.body,
                  status: "DRAFT",
                  featured:
                    parsed.data.featured,
                  eventStartAt:
                    parsed.data.type ===
                    "EVENT"
                      ? eventStartAt
                      : null,
                  eventEndAt:
                    parsed.data.type ===
                    "EVENT"
                      ? eventEndAt
                      : null,
                  eventLocation:
                    parsed.data.type ===
                    "EVENT"
                      ? normalizeNullableText(
                          parsed.data
                            .eventLocation,
                        ) ?? null
                      : null,
                  createdById:
                    authentication.admin.id,
                  updatedById:
                    authentication.admin.id,
                },
                select:
                  administratorContentSelect,
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "CONTENT_CREATED",
                entityType: "ContentEntry",
                entityId: created.id,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  type: created.type,
                  status: created.status,
                  slug: created.slug,
                },
              },
            });

            return created;
          },
        );

      response.status(201).json({
        success: true,
        content,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminContentRouter.patch(
  "/:id",
  async (request, response, next) => {
    try {
      const id = idSchema.safeParse(
        request.params.id,
      );

      const parsed =
        updateContentSchema.safeParse(
          request.body,
        );

      if (!id.success) {
        response.status(400).json({
          success: false,
          message:
            "The content identifier is invalid.",
        });
        return;
      }

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "Valid content details are required.",
          errors: parsed.error.flatten(),
        });
        return;
      }

      if (
        Object.keys(parsed.data).length === 0
      ) {
        response.status(400).json({
          success: false,
          message:
            "At least one content field must be supplied.",
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      const existing =
        await prisma.contentEntry.findUnique({
          where: {
            id: id.data,
          },
        });

      if (
        !existing ||
        existing.deletedAt
      ) {
        response.status(404).json({
          success: false,
          message:
            "The content entry was not found.",
        });
        return;
      }

      if (
        authentication.admin.role ===
          "EDITOR" &&
        existing.status !== "DRAFT"
      ) {
        response.status(403).json({
          success: false,
          message:
            "Editors can modify draft content only.",
        });
        return;
      }

      const nextType =
        parsed.data.type ??
        existing.type;

      const nextEventStartAt =
        nextType === "EVENT"
          ? parsed.data.eventStartAt !==
            undefined
            ? parseDate(
                parsed.data.eventStartAt,
              )
            : existing.eventStartAt
          : null;

      const nextEventEndAt =
        nextType === "EVENT"
          ? parsed.data.eventEndAt !==
            undefined
            ? parseDate(
                parsed.data.eventEndAt,
              )
            : existing.eventEndAt
          : null;

      const eventError =
        validateEventDates(
          nextType,
          nextEventStartAt,
          nextEventEndAt,
        );

      if (eventError) {
        response.status(400).json({
          success: false,
          message: eventError,
        });
        return;
      }

      const nextSlug =
        parsed.data.slug !== undefined
          ? await createUniqueSlug(
              parsed.data.slug,
              existing.id,
            )
          : existing.slug;

      const requestMetadata =
        getRequestMetadata(request);

      const content =
        await prisma.$transaction(
          async (transaction) => {
            const updated =
              await transaction.contentEntry.update({
                where: {
                  id: existing.id,
                },
                data: {
                  type: nextType,
                  title:
                    parsed.data.title ??
                    existing.title,
                  slug: nextSlug,
                  summary:
                    parsed.data.summary !==
                    undefined
                      ? normalizeNullableText(
                          parsed.data.summary,
                        ) ?? null
                      : existing.summary,
                  body:
                    parsed.data.body ??
                    existing.body,
                  featured:
                    parsed.data.featured ??
                    existing.featured,
                  eventStartAt:
                    nextEventStartAt,
                  eventEndAt:
                    nextEventEndAt,
                  eventLocation:
                    nextType === "EVENT"
                      ? parsed.data
                            .eventLocation !==
                          undefined
                        ? normalizeNullableText(
                            parsed.data
                              .eventLocation,
                          ) ?? null
                        : existing.eventLocation
                      : null,
                  updatedById:
                    authentication.admin.id,
                },
                select:
                  administratorContentSelect,
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "CONTENT_UPDATED",
                entityType: "ContentEntry",
                entityId: updated.id,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  type: updated.type,
                  status: updated.status,
                  slug: updated.slug,
                },
              },
            });

            return updated;
          },
        );

      response.status(200).json({
        success: true,
        content,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminContentRouter.post(
  "/:id/publish",
  authorizeAdminRoles(
    "SUPER_ADMIN",
    "CONTENT_ADMIN",
  ),
  async (request, response, next) => {
    try {
      const id = idSchema.safeParse(
        request.params.id,
      );

      if (!id.success) {
        response.status(400).json({
          success: false,
          message:
            "The content identifier is invalid.",
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      const existing =
        await prisma.contentEntry.findUnique({
          where: {
            id: id.data,
          },
        });

      if (
        !existing ||
        existing.deletedAt
      ) {
        response.status(404).json({
          success: false,
          message:
            "The content entry was not found.",
        });
        return;
      }

      const eventError =
        validateEventDates(
          existing.type,
          existing.eventStartAt,
          existing.eventEndAt,
        );

      if (eventError) {
        response.status(400).json({
          success: false,
          message: eventError,
        });
        return;
      }

      const now = new Date();

      const requestMetadata =
        getRequestMetadata(request);

      const content =
        await prisma.$transaction(
          async (transaction) => {
            const published =
              await transaction.contentEntry.update({
                where: {
                  id: existing.id,
                },
                data: {
                  status: "PUBLISHED",
                  publishedAt:
                    existing.publishedAt ??
                    now,
                  updatedById:
                    authentication.admin.id,
                },
                select:
                  administratorContentSelect,
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "CONTENT_PUBLISHED",
                entityType: "ContentEntry",
                entityId: published.id,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  type: published.type,
                  slug: published.slug,
                },
              },
            });

            return published;
          },
        );

      response.status(200).json({
        success: true,
        content,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminContentRouter.post(
  "/:id/archive",
  authorizeAdminRoles(
    "SUPER_ADMIN",
    "CONTENT_ADMIN",
  ),
  async (request, response, next) => {
    try {
      const id = idSchema.safeParse(
        request.params.id,
      );

      if (!id.success) {
        response.status(400).json({
          success: false,
          message:
            "The content identifier is invalid.",
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      const existing =
        await prisma.contentEntry.findUnique({
          where: {
            id: id.data,
            deletedAt: null,
          },
          select: {
            id: true,
            type: true,
            slug: true,
          },
        });

      if (!existing) {
        response.status(404).json({
          success: false,
          message:
            "The content entry was not found.",
        });
        return;
      }

      const requestMetadata =
        getRequestMetadata(request);

      const content =
        await prisma.$transaction(
          async (transaction) => {
            const archived =
              await transaction.contentEntry.update({
                where: {
                  id: existing.id,
                },
                data: {
                  status: "ARCHIVED",
                  updatedById:
                    authentication.admin.id,
                },
                select:
                  administratorContentSelect,
              });

            await transaction.auditLog.create({
              data: {
                actorId:
                  authentication.admin.id,
                action:
                  "CONTENT_ARCHIVED",
                entityType: "ContentEntry",
                entityId: archived.id,
                ipAddress:
                  requestMetadata.ipAddress,
                userAgent:
                  requestMetadata.userAgent,
                metadata: {
                  type: archived.type,
                  slug: archived.slug,
                },
              },
            });

            return archived;
          },
        );

      response.status(200).json({
        success: true,
        content,
      });
    } catch (error) {
      next(error);
    }
  },
);

adminContentRouter.delete(
  "/:id",
  authorizeAdminRoles(
    "SUPER_ADMIN",
    "CONTENT_ADMIN",
  ),
  async (request, response, next) => {
    try {
      const id = idSchema.safeParse(
        request.params.id,
      );

      if (!id.success) {
        response.status(400).json({
          success: false,
          message:
            "The content identifier is invalid.",
        });
        return;
      }

      const authentication =
        getAuthentication(response);

      const existing =
        await prisma.contentEntry.findUnique({
          where: {
            id: id.data,
          },
          select: {
            id: true,
            type: true,
            slug: true,
            deletedAt: true,
          },
        });

      if (
        !existing ||
        existing.deletedAt
      ) {
        response.status(404).json({
          success: false,
          message:
            "The content entry was not found.",
        });
        return;
      }

      const now = new Date();

      const requestMetadata =
        getRequestMetadata(request);

      await prisma.$transaction(
        async (transaction) => {
          await transaction.contentEntry.update({
            where: {
              id: existing.id,
            },
            data: {
              status: "ARCHIVED",
              deletedAt: now,
              deletedById:
                authentication.admin.id,
              updatedById:
                authentication.admin.id,
            },
          });

          await transaction.auditLog.create({
            data: {
              actorId:
                authentication.admin.id,
              action:
                "CONTENT_SOFT_DELETED",
              entityType: "ContentEntry",
              entityId: existing.id,
              ipAddress:
                requestMetadata.ipAddress,
              userAgent:
                requestMetadata.userAgent,
              metadata: {
                type: existing.type,
                slug: existing.slug,
              },
            },
          });
        },
      );

      response.status(200).json({
        success: true,
        message:
          "The content entry was deleted.",
      });
    } catch (error) {
      next(error);
    }
  },
);