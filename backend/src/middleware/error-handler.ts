import type { ErrorRequestHandler } from "express";
import { env } from "../config/env";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected server error occurred.";

  response.status(500).json({
    success: false,
    message:
      env.nodeEnv === "production"
        ? "An unexpected server error occurred."
        : message,
  });
};