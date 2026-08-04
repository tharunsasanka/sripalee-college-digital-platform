export type AdminRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "EDITOR";

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  displayName: string;
  role: AdminRole;
  status: "ACTIVE";
}

export interface AuthContext {
  sessionId: string;
  expiresAt: Date;
  admin: AuthenticatedAdmin;
}

export interface RequestMetadata {
  ipAddress: string | null;
  userAgent: string | null;
}