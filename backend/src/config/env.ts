import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(4000),
  FRONTEND_ORIGINS: z
    .string()
    .default(
      "http://localhost:3000,http://localhost:3010",
    ),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required."),
  PASSWORD_PEPPER: z
    .string()
    .regex(
      /^[a-f0-9]{64}$/i,
      "PASSWORD_PEPPER must be a 64-character hexadecimal value.",
    ),
  SESSION_TTL_HOURS: z.coerce
    .number()
    .int()
    .min(1)
    .max(168)
    .default(12),
  LOGIN_MAX_ATTEMPTS: z.coerce
    .number()
    .int()
    .min(3)
    .max(20)
    .default(5),
  LOGIN_LOCK_MINUTES: z.coerce
    .number()
    .int()
    .min(1)
    .max(1440)
    .default(15),
  SESSION_COOKIE_NAME: z
    .string()
    .regex(
      /^(?:__Host-)?[A-Za-z0-9_-]{1,80}$/,
      "SESSION_COOKIE_NAME is invalid.",
    )
    .default("sripalee_admin_session"),
});

const result = environmentSchema.safeParse(
  process.env,
);

if (!result.success) {
  throw new Error(
    `Invalid environment configuration: ${result.error.message}`,
  );
}

export const env = {
  nodeEnv: result.data.NODE_ENV,
  port: result.data.PORT,
  databaseUrl: result.data.DATABASE_URL,
  passwordPepper: result.data.PASSWORD_PEPPER,
  sessionTtlHours:
    result.data.SESSION_TTL_HOURS,
  loginMaxAttempts:
    result.data.LOGIN_MAX_ATTEMPTS,
  loginLockMinutes:
    result.data.LOGIN_LOCK_MINUTES,
  sessionCookieName:
    result.data.SESSION_COOKIE_NAME,
  frontendOrigins:
    result.data.FRONTEND_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
};