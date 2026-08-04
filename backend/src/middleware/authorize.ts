import type { RequestHandler } from "express";
import type {
  AdminRole,
  AuthContext,
} from "../types/auth";

export function authorizeAdminRoles(
  ...allowedRoles: AdminRole[]
): RequestHandler {
  return (
    _request,
    response,
    next,
  ) => {
    const authentication =
      response.locals.auth as
        | AuthContext
        | undefined;

    if (!authentication) {
      response.status(401).json({
        success: false,
        message:
          "Administrator authentication is required.",
      });
      return;
    }

    if (
      !allowedRoles.includes(
        authentication.admin.role,
      )
    ) {
      response.status(403).json({
        success: false,
        message:
          "You do not have permission to perform this action.",
      });
      return;
    }

    next();
  };
}