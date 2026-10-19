import { resolve } from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { env } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";

import { adminAuditLogsRouter } from "./routes/admin-audit-logs";
import { adminContentRouter } from "./routes/admin-content";
import { adminMediaRouter } from "./routes/admin-media";
import { adminUsersRouter } from "./routes/admin-users";
import { authRouter } from "./routes/auth";
import { healthRouter } from "./routes/health";
import { publicContentRouter } from "./routes/public-content";

export const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    credentials: true,

    origin(origin, callback) {
      if (
        !origin ||
        env.frontendOrigins.includes(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          "Request origin is not permitted.",
        ),
      );
    },
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);

app.use(cookieParser());

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  }),
);

/*
 * Public uploaded media
 *
 * IMPORTANT:
 * This must be registered BEFORE
 * notFoundHandler.
 */
app.use(
  "/uploads",
  express.static(
    resolve(
      process.cwd(),
      "uploads",
    ),
    {
      setHeaders(response) {
        response.setHeader(
          "Cross-Origin-Resource-Policy",
          "cross-origin",
        );
      },
    },
  ),
);

app.get(
  "/",
  (_request, response) => {
    response.status(200).json({
      success: true,
      service:
        "Sripalee College Administration API",
    });
  },
);

/*
 * API routes
 */
app.use(
  "/api/health",
  healthRouter,
);

app.use(
  "/api/auth",
  authRouter,
);

app.use(
  "/api/admin/users",
  adminUsersRouter,
);

app.use(
  "/api/admin/content",
  adminContentRouter,
);

app.use(
  "/api/admin/media",
  adminMediaRouter,
);

app.use(
  "/api/admin/audit-logs",
  adminAuditLogsRouter,
);

app.use(
  "/api/content",
  publicContentRouter,
);

/*
 * These MUST always be last.
 */
app.use(notFoundHandler);

app.use(errorHandler);