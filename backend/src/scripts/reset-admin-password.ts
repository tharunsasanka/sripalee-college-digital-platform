import { hashPassword } from "../lib/password";
import { prisma } from "../lib/prisma";

function requireEnvironmentValue(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

async function main() {
  const email = requireEnvironmentValue(
    "RESET_ADMIN_EMAIL",
  ).toLowerCase();

  const password = requireEnvironmentValue(
    "RESET_ADMIN_PASSWORD",
  );

  const administrator =
    await prisma.adminUser.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      },
    });

  if (!administrator) {
    throw new Error(
      "Administrator account was not found.",
    );
  }

  const passwordHash =
    await hashPassword(password);

  const result = await prisma.$transaction(
    async (transaction) => {
      const updatedAdministrator =
        await transaction.adminUser.update({
          where: {
            id: administrator.id,
          },
          data: {
            passwordHash,
            passwordChangedAt: new Date(),
            failedLoginCount: 0,
            lockedUntil: null,
            status: "ACTIVE",
          },
          select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
            status: true,
          },
        });

      const revoked =
        await transaction.adminSession.updateMany({
          where: {
            adminUserId: administrator.id,
            revokedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        });

      await transaction.auditLog.create({
        data: {
          action: "ADMIN_PASSWORD_RESET",
          entityType: "AdminUser",
          entityId: administrator.id,
          metadata: {
            source: "administrator-reset-command",
            revokedSessions: revoked.count,
          },
        },
      });

      return {
        administrator: updatedAdministrator,
        revokedSessions: revoked.count,
      };
    },
  );

  console.log(
    JSON.stringify(
      {
        success: true,
        ...result,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error: unknown) => {
    const message =
      error instanceof Error
        ? error.message
        : "Administrator password reset failed.";

    console.error(message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });