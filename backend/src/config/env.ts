import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  FRONTEND_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://localhost:3010"),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required."),
  PASSWORD_PEPPER: z
    .string()
    .regex(
      /^[a-f0-9]{64}$/i,
      "PASSWORD_PEPPER must be a 64-character hexadecimal value.",
    ),
});

const result = environmentSchema.safeParse(process.env);

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
  frontendOrigins: result.data.FRONTEND_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};