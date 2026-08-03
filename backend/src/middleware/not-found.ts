import type { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (
  request,
  response,
) => {
  response.status(404).json({
    success: false,
    message: "API endpoint not found.",
    path: request.originalUrl,
  });
};