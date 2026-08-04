import type { Request } from "express";
import { prisma } from "./prisma";
import { getRequestMetadata } from "./session";

type AuditMetadataValue =
  | string
  | number
  | boolean
  | null;

interface WriteAuditLogInput {
  request: Request;
  actorId?: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Record<
    string,
    AuditMetadataValue
  >;
}

export async function writeAuditLog(
  input: WriteAuditLogInput,
) {
  try {
    const requestMetadata =
      getRequestMetadata(input.request);

    await prisma.auditLog.create({
      data: {
        actorId: input.actorId ?? null,
        action: input.action,
        entityType:
          input.entityType ?? null,
        entityId: input.entityId ?? null,
        ipAddress:
          requestMetadata.ipAddress,
        userAgent:
          requestMetadata.userAgent,
        metadata: input.metadata,
      },
    });

    return true;
  } catch (error) {
    console.error(
      "Unable to write administrator audit log.",
      error,
    );

    return false;
  }
}