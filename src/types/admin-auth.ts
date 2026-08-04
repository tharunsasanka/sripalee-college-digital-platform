export type AdminRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "EDITOR";

export type ManageableAdminRole =
  | "CONTENT_ADMIN"
  | "EDITOR";

export type AdminStatus =
  | "ACTIVE"
  | "PENDING"
  | "DISABLED";

export type ManageableAdminStatus =
  | "ACTIVE"
  | "DISABLED";

export interface Administrator {
  id: string;
  email: string;
  displayName: string;
  role: AdminRole;
  status: AdminStatus;
}

export interface ManagedAdministrator
  extends Administrator {
  failedLoginCount: number;
  lockedUntil: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdministratorSession {
  id?: string;
  expiresAt: string;
}

export interface AuthenticationResponse {
  success: true;
  administrator: Administrator;
  session: AdministratorSession;
}

export interface LogoutResponse {
  success: true;
  message: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateAdministratorInput {
  email: string;
  displayName: string;
  password: string;
  role: ManageableAdminRole;
}

export interface AdministratorListResponse {
  success: true;
  administrators: ManagedAdministrator[];
}

export interface AdministratorMutationResponse {
  success: true;
  administrator: ManagedAdministrator;
  revokedSessions?: number;
}

export interface SessionRevocationResponse {
  success: true;
  revokedSessions: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}