import type { RequestHandler } from "express";
import { env } from "../config/env";
import {
  clearAdminSessionCookie,
} from "../lib/auth-cookie";
import {
  resolveAdminSession,
} from "../lib/session";

export const authenticateAdmin:
  RequestHandler = async (
    request,
    response,
    next,
  ) => {
    try {
      const token =
        request.cookies?.[
          env.sessionCookieName
        ];

      if (typeof token !== "string") {
        response.status(401).json({
          success: false,
          message:
            "Administrator authentication is required.",
        });
        return;
      }

      const authentication =
        await resolveAdminSession(token);

      if (!authentication) {
        clearAdminSessionCookie(response);

        response.status(401).json({
          success: false,
          message:
            "Administrator session is invalid or expired.",
        });
        return;
      }

      response.locals.auth =
        authentication;

      next();
    } catch (error) {
      next(error);
    }
  };