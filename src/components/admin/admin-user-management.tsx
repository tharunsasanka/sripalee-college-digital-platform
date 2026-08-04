"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  AdminApiError,
  createAdministrator,
  listAdministrators,
  revokeAdministratorSessions,
  updateAdministratorRole,
  updateAdministratorStatus,
} from "../../lib/admin-api";
import type {
  ManageableAdminRole,
  ManageableAdminStatus,
  ManagedAdministrator,
} from "../../types/admin-auth";

export function AdminUserManagement() {
  const [
    administrators,
    setAdministrators,
  ] = useState<ManagedAdministrator[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [busyAdministratorId, setBusyAdministratorId] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [displayName, setDisplayName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<ManageableAdminRole>("EDITOR");

  useEffect(() => {
    let active = true;

    async function loadAdministrators() {
      try {
        const result =
          await listAdministrators();

        if (!active) {
          return;
        }

        setAdministrators(
          result.administrators,
        );
      } catch (requestError) {
        if (!active) {
          return;
        }

        setError(
          requestError instanceof AdminApiError
            ? requestError.message
            : "Administrator accounts could not be loaded.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadAdministrators();

    return () => {
      active = false;
    };
  }, []);

  function replaceAdministrator(
    updatedAdministrator:
      ManagedAdministrator,
  ) {
    setAdministrators(
      (currentAdministrators) =>
        currentAdministrators.map(
          (administrator) =>
            administrator.id ===
            updatedAdministrator.id
              ? updatedAdministrator
              : administrator,
        ),
    );
  }

  async function handleCreate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 12) {
      setError(
        "The administrator password must contain at least 12 characters.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const result =
        await createAdministrator({
          email: email
            .trim()
            .toLowerCase(),
          displayName:
            displayName.trim(),
          password,
          role,
        });

      setAdministrators(
        (currentAdministrators) => [
          result.administrator,
          ...currentAdministrators,
        ],
      );

      setEmail("");
      setDisplayName("");
      setPassword("");
      setRole("EDITOR");

      setMessage(
        "Administrator account created successfully.",
      );
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "The administrator account could not be created.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRoleChange(
    administratorId: string,
    nextRole: ManageableAdminRole,
  ) {
    setBusyAdministratorId(
      administratorId,
    );
    setMessage("");
    setError("");

    try {
      const result =
        await updateAdministratorRole(
          administratorId,
          nextRole,
        );

      replaceAdministrator(
        result.administrator,
      );

      setMessage(
        "Administrator role updated.",
      );
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "The administrator role could not be updated.",
      );
    } finally {
      setBusyAdministratorId(null);
    }
  }

  async function handleStatusChange(
    administratorId: string,
    nextStatus: ManageableAdminStatus,
  ) {
    setBusyAdministratorId(
      administratorId,
    );
    setMessage("");
    setError("");

    try {
      const result =
        await updateAdministratorStatus(
          administratorId,
          nextStatus,
        );

      replaceAdministrator(
        result.administrator,
      );

      setMessage(
        nextStatus === "ACTIVE"
          ? "Administrator account enabled."
          : "Administrator account disabled.",
      );
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "The administrator status could not be updated.",
      );
    } finally {
      setBusyAdministratorId(null);
    }
  }

  async function handleSessionRevocation(
    administratorId: string,
  ) {
    const confirmed = window.confirm(
      "Revoke all active sessions for this administrator?",
    );

    if (!confirmed) {
      return;
    }

    setBusyAdministratorId(
      administratorId,
    );
    setMessage("");
    setError("");

    try {
      const result =
        await revokeAdministratorSessions(
          administratorId,
        );

      setMessage(
        `${result.revokedSessions} administrator session(s) revoked.`,
      );
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "Administrator sessions could not be revoked.",
      );
    } finally {
      setBusyAdministratorId(null);
    }
  }

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Super administrator
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Administrator accounts
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Create authorised accounts, assign roles, control access, and revoke active sessions.
        </p>
      </header>

      {message ? (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          {message}
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      ) : null}

      <form
        onSubmit={handleCreate}
        className="grid gap-4 rounded-2xl bg-slate-50 p-5 lg:grid-cols-2"
      >
        <div>
          <label
            htmlFor="new-admin-name"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Display name
          </label>

          <input
            id="new-admin-name"
            required
            minLength={2}
            maxLength={120}
            value={displayName}
            onChange={(event) =>
              setDisplayName(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="new-admin-email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email
          </label>

          <input
            id="new-admin-email"
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="new-admin-password"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Temporary password
          </label>

          <input
            id="new-admin-password"
            type="password"
            required
            minLength={12}
            maxLength={128}
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Minimum 12 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="new-admin-role"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Role
          </label>

          <select
            id="new-admin-role"
            value={role}
            onChange={(event) =>
              setRole(
                event.target
                  .value as ManageableAdminRole,
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="EDITOR">
              Editor
            </option>
            <option value="CONTENT_ADMIN">
              Content administrator
            </option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Creating accountâ€¦"
              : "Create administrator"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Administrator
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Last login
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Sessions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  Loading administrator accountsâ€¦
                </td>
              </tr>
            ) : administrators.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No administrator accounts were found.
                </td>
              </tr>
            ) : (
              administrators.map(
                (administrator) => {
                  const busy =
                    busyAdministratorId ===
                    administrator.id;

                  const isSuperAdministrator =
                    administrator.role ===
                    "SUPER_ADMIN";

                  return (
                    <tr key={administrator.id}>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-950">
                          {administrator.displayName}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {administrator.email}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {isSuperAdministrator ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                            SUPER ADMIN
                          </span>
                        ) : (
                          <select
                            aria-label={`Role for ${administrator.displayName}`}
                            disabled={busy}
                            value={administrator.role}
                            onChange={(event) =>
                              void handleRoleChange(
                                administrator.id,
                                event.target
                                  .value as ManageableAdminRole,
                              )
                            }
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                          >
                            <option value="EDITOR">
                              Editor
                            </option>
                            <option value="CONTENT_ADMIN">
                              Content administrator
                            </option>
                          </select>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {isSuperAdministrator ? (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                            ACTIVE
                          </span>
                        ) : (
                          <select
                            aria-label={`Status for ${administrator.displayName}`}
                            disabled={busy}
                            value={administrator.status}
                            onChange={(event) =>
                              void handleStatusChange(
                                administrator.id,
                                event.target
                                  .value as ManageableAdminStatus,
                              )
                            }
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                          >
                            <option value="ACTIVE">
                              Active
                            </option>
                            <option value="DISABLED">
                              Disabled
                            </option>
                          </select>
                        )}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {administrator.lastLoginAt
                          ? new Date(
                              administrator.lastLoginAt,
                            ).toLocaleString()
                          : "Never"}
                      </td>

                      <td className="px-4 py-4">
                        {isSuperAdministrator ? (
                          <span className="text-sm text-slate-500">
                            Current super administrator
                          </span>
                        ) : (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              void handleSessionRevocation(
                                administrator.id,
                              )
                            }
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                          >
                            {busy
                              ? "Updatingâ€¦"
                              : "Revoke sessions"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}