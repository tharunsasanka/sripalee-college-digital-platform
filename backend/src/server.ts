import { app } from "./app";
import { env } from "./config/env";

const host = "127.0.0.1";
let shuttingDown = false;

const server = app.listen(env.port, host, () => {
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

function shutdown(signal: string) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  console.log(`${signal} received. Closing the API server.`);

  server.close((error) => {
    if (error) {
      console.error("Server shutdown failed:", error);
      process.exit(1);
    }

    console.log("API server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));