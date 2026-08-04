import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const publicContentRouter = Router();

const publicListSchema = z.object({
  type: z
    .enum(["NEWS", "NOTICE", "EVENT"])
    .optional(),
  featured: z
    .enum(["true", "false"])
    .transform(
      (value) => value === "true",
    )
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(50)
    .default(12),
});

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(200);

const publicContentSelect = {
  id: true,
  type: true,
  title: true,
  slug: true,
  summary: true,
  body: true,
  featured: true,
  publishedAt: true,
  eventStartAt: true,
  eventEndAt: true,
  eventLocation: true,
  updatedAt: true,
  createdBy: {
    select: {
      displayName: true,
    },
  },
} as const;

publicContentRouter.get(
  "/",
  async (request, response, next) => {
    try {
      const parsed =
        publicListSchema.safeParse(
          request.query,
        );

      if (!parsed.success) {
        response.status(400).json({
          success: false,
          message:
            "The public content filters are invalid.",
        });
        return;
      }

      const now = new Date();

      const where:
        Prisma.ContentEntryWhereInput = {
        status: "PUBLISHED",
        deletedAt: null,
        publishedAt: {
          lte: now,
        },
        ...(parsed.data.type
          ? {
              type: parsed.data.type,
            }
          : {}),
        ...(parsed.data.featured !==
        undefined
          ? {
              featured:
                parsed.data.featured,
            }
          : {}),
      };

      const orderBy:
        Prisma.ContentEntryOrderByWithRelationInput[] =
        parsed.data.type === "EVENT"
          ? [
              {
                eventStartAt: "asc",
              },
              {
                publishedAt: "desc",
              },
            ]
          : [
              {
                featured: "desc",
              },
              {
                publishedAt: "desc",
              },
            ];

      const content =
        await prisma.contentEntry.findMany({
          where,
          select: publicContentSelect,
          orderBy,
          take: parsed.data.limit,
        });

      response.status(200).json({
        success: true,
        content,
      });
    } catch (error) {
      next(error);
    }
  },
);

publicContentRouter.get(
  "/:slug",
  async (request, response, next) => {
    try {
      const slug = slugSchema.safeParse(
        request.params.slug,
      );

      if (!slug.success) {
        response.status(400).json({
          success: false,
          message:
            "The content slug is invalid.",
        });
        return;
      }

      const content =
        await prisma.contentEntry.findFirst({
          where: {
            slug: slug.data,
            status: "PUBLISHED",
            deletedAt: null,
            publishedAt: {
              lte: new Date(),
            },
          },
          select: publicContentSelect,
        });

      if (!content) {
        response.status(404).json({
          success: false,
          message:
            "The requested content was not found.",
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