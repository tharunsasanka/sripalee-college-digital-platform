import type { Server } from "node:http";
import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const host = "127.0.0.1";

let server: Server | undefined;
let shuttingDown = false;

async function startServer() {
  await prisma.$connect();

  server = app.listen(env.port, host, () => {
    console.log(
      `Sripalee College API running at http://${host}:${env.port}`,
    );
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${env.port} is already in use.`);
    } else {
      console.error("API server failed:", error);
    }

    process.exit(1);
  });
}

async function finishShutdown(error?: Error) {
  try {
    await prisma.$disconnect();
  } catch (disconnectError) {
    console.error(
      "Database disconnection failed:",
      disconnectError,
    );
  }

  if (error) {
    console.error("Server shutdown failed:", error);
    process.exit(1);
  }

  console.log("API server closed.");
  process.exit(0);
}

function shutdown(signal: string) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  console.log(`${signal} received. Closing the API server.`);

  if (!server) {
    void finishShutdown();
    return;
  }

  server.close((error) => {
    void finishShutdown(error);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

void startServer().catch(async (error: unknown) => {
  console.error("API startup failed:", error);

  try {
    await prisma.$disconnect();
  } finally {
    process.exit(1);
  }
});