import { Router } from "express";
import { prisma } from "../lib/prisma";

export const healthRouter = Router();

healthRouter.get("/", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.status(200).json({
      success: true,
      service: "Sripalee College Administration API",
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});