export type AdminRole =
  | "SUPER_ADMIN"
  | "CONTENT_ADMIN"
  | "EDITOR";

export type AdminStatus =
  | "ACTIVE"
  | "PENDING"
  | "DISABLED";

export interface Administrator {
  id: string;
  email: string;
  displayName: string;
  role: AdminRole;
  status: AdminStatus;
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

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}