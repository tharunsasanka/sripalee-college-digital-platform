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

export type ContentType =
  | "NEWS"
  | "NOTICE"
  | "EVENT";

export type ContentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

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

export interface ContentAuthor {
  id: string;
  displayName: string;
  email: string;
}

export interface ManagedContentEntry {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  status: ContentStatus;
  featured: boolean;
  publishedAt: string | null;
  eventStartAt: string | null;
  eventEndAt: string | null;
  eventLocation: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: ContentAuthor;
  updatedBy: ContentAuthor;
}

export interface AdminContentFilters {
  type?: ContentType;
  status?: ContentStatus;
  deleted?: "exclude" | "include" | "only";
  page?: number;
  pageSize?: number;
}

export interface ContentPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ContentListResponse {
  success: true;
  content: ManagedContentEntry[];
  pagination: ContentPagination;
}

export interface ContentMutationResponse {
  success: true;
  content: ManagedContentEntry;
}

export interface ContentDeleteResponse {
  success: true;
  message: string;
}

export interface CreateContentInput {
  type: ContentType;
  title: string;
  slug?: string;
  summary?: string | null;
  body: string;
  featured?: boolean;
  eventStartAt?: string | null;
  eventEndAt?: string | null;
  eventLocation?: string | null;
}

export interface UpdateContentInput {
  type?: ContentType;
  title?: string;
  slug?: string;
  summary?: string | null;
  body?: string;
  featured?: boolean;
  eventStartAt?: string | null;
  eventEndAt?: string | null;
  eventLocation?: string | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

export interface AuditLogActor {
  id: string;
  displayName: string;
  email: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: unknown;
  createdAt: string;
  actor: AuditLogActor | null;
}

export interface AuditLogFilters {
  action?: string;
  entityType?: string;
  page?: number;
  pageSize?: number;
}

export interface AuditLogListResponse {
  success: true;
  auditLogs: AuditLogEntry[];
  pagination: ContentPagination;
}
