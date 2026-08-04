import {
  createHash,
  randomBytes,
} from "node:crypto";
import type { Request } from "express";
import { env } from "../config/env";
import type {
  AuthContext,
  RequestMetadata,
} from "../types/auth";
import { prisma } from "./prisma";

const sessionTokenBytes = 32;
const sessionTokenPattern =
  /^[A-Za-z0-9_-]{43}$/;
const lastSeenWriteIntervalMs =
  5 * 60 * 1000;

function limitText(
  value: string | undefined,
  maximumLength: number,
) {
  if (!value) {
    return null;
  }

  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maximumLength);
}

export function getRequestMetadata(
  request: Request,
): RequestMetadata {
  return {
    ipAddress: limitText(
      request.ip ||
        request.socket.remoteAddress,
      64,
    ),
    userAgent: limitText(
      request.get("user-agent"),
      512,
    ),
  };
}

export function hashSessionToken(
  token: string,
) {
  return createHash("sha256")
    .update(token, "utf8")
    .digest("hex");
}

export function isSessionTokenValid(
  token: unknown,
): token is string {
  return (
    typeof token === "string" &&
    sessionTokenPattern.test(token)
  );
}

export async function createAdminSession(
  adminUserId: string,
  request: Request,
) {
  const token = randomBytes(
    sessionTokenBytes,
  ).toString("base64url");

  const tokenHash =
    hashSessionToken(token);

  const createdAt = new Date();

  const expiresAt = new Date(
    createdAt.getTime() +
      env.sessionTtlHours *
        60 *
        60 *
        1000,
  );

  const metadata =
    getRequestMetadata(request);

  const session =
    await prisma.adminSession.create({
      data: {
        adminUserId,
        tokenHash,
        expiresAt,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
      },
      select: {
        id: true,
        expiresAt: true,
      },
    });

  return {
    token,
    sessionId: session.id,
    expiresAt: session.expiresAt,
  };
}

export async function resolveAdminSession(
  token: string,
): Promise<AuthContext | null> {
  if (!isSessionTokenValid(token)) {
    return null;
  }

  const tokenHash =
    hashSessionToken(token);

  const now = new Date();

  const session =
    await prisma.adminSession.findUnique({
      where: {
        tokenHash,
      },
      include: {
        adminUser: {
          select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
            status: true,
          },
        },
      },
    });

  if (!session) {
    return null;
  }

  const expired =
    session.expiresAt.getTime() <=
    now.getTime();

  const inactiveAdministrator =
    session.adminUser.status !== "ACTIVE";

  if (
    session.revokedAt ||
    expired ||
    inactiveAdministrator
  ) {
    if (!session.revokedAt) {
      await prisma.adminSession.updateMany({
        where: {
          id: session.id,
          revokedAt: null,
        },
        data: {
          revokedAt: now,
        },
      });
    }

    return null;
  }

  const lastSeenThreshold =
    now.getTime() -
    lastSeenWriteIntervalMs;

  if (
    session.lastSeenAt.getTime() <
    lastSeenThreshold
  ) {
    await prisma.adminSession.updateMany({
      where: {
        id: session.id,
        revokedAt: null,
        expiresAt: {
          gt: now,
        },
      },
      data: {
        lastSeenAt: now,
      },
    });
  }

  return {
    sessionId: session.id,
    expiresAt: session.expiresAt,
    admin: {
      id: session.adminUser.id,
      email: session.adminUser.email,
      displayName:
        session.adminUser.displayName,
      role: session.adminUser.role,
      status: "ACTIVE",
    },
  };
}

export async function revokeAdminSession(
  token: string,
) {
  if (!isSessionTokenValid(token)) {
    return false;
  }

  const result =
    await prisma.adminSession.updateMany({
      where: {
        tokenHash:
          hashSessionToken(token),
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

  return result.count > 0;
}

export async function revokeAllAdminSessions(
  adminUserId: string,
) {
  const result =
    await prisma.adminSession.updateMany({
      where: {
        adminUserId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

  return result.count;
}