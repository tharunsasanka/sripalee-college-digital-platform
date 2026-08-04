import type {
  AdministratorListResponse,
  AdministratorMutationResponse,
  ApiErrorResponse,
  AuthenticationResponse,
  CreateAdministratorInput,
  LoginInput,
  LogoutResponse,
  ManageableAdminRole,
  ManageableAdminStatus,
  SessionRevocationResponse,
} from "../types/admin-auth";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

export class AdminApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(
    message: string,
    status: number,
    details?: unknown,
  ) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const errorBody =
      body as Partial<ApiErrorResponse> | null;

    throw new AdminApiError(
      errorBody?.message ??
        "The administrator service could not complete the request.",
      response.status,
      errorBody?.errors,
    );
  }

  return body as T;
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(
    options.headers,
  );

  headers.set(
    "Accept",
    "application/json",
  );

  if (
    options.body !== undefined &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const response = await fetch(
    `${apiBaseUrl}${path}`,
    {
      ...options,
      headers,
      credentials: "include",
      cache: "no-store",
    },
  );

  return parseResponse<T>(response);
}

export function loginAdministrator(
  input: LoginInput,
) {
  return apiRequest<AuthenticationResponse>(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function getCurrentAdministrator() {
  return apiRequest<AuthenticationResponse>(
    "/api/auth/me",
  );
}

export function logoutAdministrator() {
  return apiRequest<LogoutResponse>(
    "/api/auth/logout",
    {
      method: "POST",
    },
  );
}

export function listAdministrators() {
  return apiRequest<AdministratorListResponse>(
    "/api/admin/users",
  );
}

export function createAdministrator(
  input: CreateAdministratorInput,
) {
  return apiRequest<AdministratorMutationResponse>(
    "/api/admin/users",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function updateAdministratorRole(
  administratorId: string,
  role: ManageableAdminRole,
) {
  return apiRequest<AdministratorMutationResponse>(
    `/api/admin/users/${administratorId}/role`,
    {
      method: "PATCH",
      body: JSON.stringify({
        role,
      }),
    },
  );
}

export function updateAdministratorStatus(
  administratorId: string,
  status: ManageableAdminStatus,
) {
  return apiRequest<AdministratorMutationResponse>(
    `/api/admin/users/${administratorId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    },
  );
}

export function revokeAdministratorSessions(
  administratorId: string,
) {
  return apiRequest<SessionRevocationResponse>(
    `/api/admin/users/${administratorId}/revoke-sessions`,
    {
      method: "POST",
    },
  );
}