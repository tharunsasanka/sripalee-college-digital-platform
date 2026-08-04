import type {
  CookieOptions,
  Response,
} from "express";
import { env } from "../config/env";

const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "strict",
  path: "/",
};

export function setAdminSessionCookie(
  response: Response,
  token: string,
  expiresAt: Date,
) {
  response.cookie(
    env.sessionCookieName,
    token,
    {
      ...sessionCookieOptions,
      expires: expiresAt,
    },
  );
}

export function clearAdminSessionCookie(
  response: Response,
) {
  response.clearCookie(
    env.sessionCookieName,
    sessionCookieOptions,
  );
}