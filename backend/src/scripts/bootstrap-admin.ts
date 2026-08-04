import { prisma } from "../lib/prisma";
import {
  hashPassword,
  verifyPassword,
} from "../lib/password";

function requireEnvironmentValue(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

async function main() {
  const email = requireEnvironmentValue(
    "BOOTSTRAP_ADMIN_EMAIL",
  ).toLowerCase();

  const displayName = requireEnvironmentValue(
    "BOOTSTRAP_ADMIN_NAME",
  );

  const password = requireEnvironmentValue(
    "BOOTSTRAP_ADMIN_PASSWORD",
  );

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(
      "BOOTSTRAP_ADMIN_EMAIL is not valid.",
    );
  }

  if (
    displayName.length < 2 ||
    displayName.length > 120
  ) {
    throw new Error(
      "Administrator name must contain between 2 and 120 characters.",
    );
  }

  const existingSuperAdministrator =
    await prisma.adminUser.findFirst({
      where: {
        role: "SUPER_ADMIN",
      },
      select: {
        id: true,
        email: true,
      },
    });

  if (existingSuperAdministrator) {
    throw new Error(
      `A super administrator already exists: ${existingSuperAdministrator.email}`,
    );
  }

  const existingEmail =
    await prisma.adminUser.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

  if (existingEmail) {
    throw new Error(
      "An administrator already uses this email address.",
    );
  }

  const passwordHash = await hashPassword(password);

  const administrator = await prisma.$transaction(
    async (transaction) => {
      const createdAdministrator =
        await transaction.adminUser.create({
          data: {
            email,
            displayName,
            passwordHash,
            role: "SUPER_ADMIN",
            status: "ACTIVE",
          },
        });

      await transaction.auditLog.create({
        data: {
          actorId: createdAdministrator.id,
          action: "ADMIN_BOOTSTRAP_CREATED",
          entityType: "AdminUser",
          entityId: createdAdministrator.id,
          metadata: {
            source: "bootstrap-command",
            role: createdAdministrator.role,
          },
        },
      });

      return createdAdministrator;
    },
  );

  const passwordVerified = await verifyPassword(
    password,
    administrator.passwordHash,
  );

  if (!passwordVerified) {
    throw new Error(
      "Administrator password verification failed.",
    );
  }

  console.log(
    JSON.stringify(
      {
        success: true,
        administrator: {
          id: administrator.id,
          email: administrator.email,
          displayName: administrator.displayName,
          role: administrator.role,
          status: administrator.status,
        },
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
        : "Administrator bootstrap failed.";

    console.error(message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });