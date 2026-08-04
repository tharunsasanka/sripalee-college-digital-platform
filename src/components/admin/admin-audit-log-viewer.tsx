"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  History,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  AdminApiError,
  listAuditLogs,
} from "../../lib/admin-api";
import type {
  AuditLogEntry,
  ContentPagination,
} from "../../types/admin-auth";

const initialPagination:
  ContentPagination = {
  page: 1,
  pageSize: 20,
  total: 0,
  totalPages: 0,
};

function formatDateTime(
  value: string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat(
    "en-LK",
    {
      dateStyle: "medium",
      timeStyle: "medium",
    },
  ).format(date);
}

function formatMetadata(
  metadata: unknown,
) {
  if (
    metadata === null ||
    metadata === undefined
  ) {
    return "No additional details";
  }

  try {
    const value = JSON.stringify(
      metadata,
    );

    if (value.length <= 180) {
      return value;
    }

    return `${value.slice(0, 180)}…`;
  } catch {
    return "Metadata unavailable";
  }
}

function getErrorMessage(
  error: unknown,
) {
  return error instanceof AdminApiError
    ? error.message
    : "Audit logs could not be loaded.";
}

export function AdminAuditLogViewer() {
  const [auditLogs, setAuditLogs] =
    useState<AuditLogEntry[]>([]);

  const [
    pagination,
    setPagination,
  ] = useState<ContentPagination>(
    initialPagination,
  );

  const [actionInput, setActionInput] =
    useState("");

  const [
    entityTypeInput,
    setEntityTypeInput,
  ] = useState("");

  const [
    actionFilter,
    setActionFilter,
  ] = useState("");

  const [
    entityTypeFilter,
    setEntityTypeFilter,
  ] = useState("");

  const [page, setPage] =
    useState(1);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadLogs() {
      try {
        const result =
          await listAuditLogs({
            action:
              actionFilter ||
              undefined,
            entityType:
              entityTypeFilter ||
              undefined,
            page,
            pageSize: 20,
          });

        if (!active) {
          return;
        }

        setAuditLogs(
          result.auditLogs,
        );

        setPagination(
          result.pagination,
        );

        setError("");
      } catch (requestError) {
        if (!active) {
          return;
        }

        setError(
          getErrorMessage(
            requestError,
          ),
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadLogs();

    return () => {
      active = false;
    };
  }, [
    actionFilter,
    entityTypeFilter,
    page,
    refreshKey,
  ]);

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setPage(1);
    setActionFilter(
      actionInput.trim(),
    );
    setEntityTypeFilter(
      entityTypeInput.trim(),
    );
    setRefreshKey(
      (current) => current + 1,
    );
  }

  function clearFilters() {
    setActionInput("");
    setEntityTypeInput("");
    setActionFilter("");
    setEntityTypeFilter("");
    setPage(1);
    setLoading(true);
    setRefreshKey(
      (current) => current + 1,
    );
  }

  function showPreviousPage() {
    if (page <= 1) {
      return;
    }

    setLoading(true);
    setPage(
      (current) => current - 1,
    );
  }

  function showNextPage() {
    if (
      page >= pagination.totalPages
    ) {
      return;
    }

    setLoading(true);
    setPage(
      (current) => current + 1,
    );
  }

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Security monitoring
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Administrator audit logs
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Review authentication, account-management, session, password, and content-publication activity.
          </p>
        </div>

        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
          <ShieldCheck size={24} />
        </div>
      </header>

      <form
        onSubmit={handleSearch}
        className="grid gap-4 rounded-2xl bg-slate-50 p-5 lg:grid-cols-[1fr_1fr_auto]"
      >
        <div>
          <label
            htmlFor="audit-action"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Action
          </label>

          <input
            id="audit-action"
            value={actionInput}
            onChange={(event) =>
              setActionInput(
                event.target.value,
              )
            }
            placeholder="CONTENT, LOGIN, SESSION"
            maxLength={80}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="audit-entity"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Entity type
          </label>

          <input
            id="audit-entity"
            value={entityTypeInput}
            onChange={(event) =>
              setEntityTypeInput(
                event.target.value,
              )
            }
            placeholder="AdminUser, ContentEntry"
            maxLength={80}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            <Search size={18} />
            Search
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear
          </button>
        </div>
      </form>

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Date
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Actor
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Action
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Entity
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Details
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  Loading audit logs…
                </td>
              </tr>
            ) : auditLogs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No audit records match the selected filters.
                </td>
              </tr>
            ) : (
              auditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {formatDateTime(
                      log.createdAt,
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-950">
                      {log.actor
                        ?.displayName ??
                        "System"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {log.actor?.email ??
                        "No administrator actor"}
                    </p>

                    {log.ipAddress ? (
                      <p className="mt-1 text-xs text-slate-400">
                        {log.ipAddress}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      {log.action}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    <p>
                      {log.entityType ??
                        "Not specified"}
                    </p>

                    {log.entityId ? (
                      <p className="mt-1 max-w-48 break-all text-xs text-slate-400">
                        {log.entityId}
                      </p>
                    ) : null}
                  </td>

                  <td className="max-w-sm px-4 py-4">
                    <p className="break-words text-xs leading-5 text-slate-500">
                      {formatMetadata(
                        log.metadata,
                      )}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <History size={18} />

          <span>
            {pagination.total} records · Page{" "}
            {pagination.page} of{" "}
            {Math.max(
              pagination.totalPages,
              1,
            )}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={showPreviousPage}
            disabled={
              loading || page <= 1
            }
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={17} />
            Previous
          </button>

          <button
            type="button"
            onClick={showNextPage}
            disabled={
              loading ||
              page >=
                pagination.totalPages
            }
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}