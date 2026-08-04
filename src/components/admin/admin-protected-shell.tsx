"use client";

import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  AdminApiError,
  getCurrentAdministrator,
  logoutAdministrator,
} from "../../lib/admin-api";
import type {
  Administrator,
  AdministratorSession,
} from "../../types/admin-auth";
import { AdminContentManagement } from "./admin-content-management";
import { AdminUserManagement } from "./admin-user-management";

export function AdminProtectedShell() {
  const router = useRouter();

  const [administrator, setAdministrator] =
    useState<Administrator | null>(null);

  const [session, setSession] =
    useState<AdministratorSession | null>(
      null,
    );

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [loggingOut, setLoggingOut] =
    useState(false);

  useEffect(() => {
    let active = true;

    async function loadAdministrator() {
      try {
        const result =
          await getCurrentAdministrator();

        if (!active) {
          return;
        }

        setAdministrator(
          result.administrator,
        );

        setSession(result.session);
        setLoading(false);
      } catch (error) {
        if (!active) {
          return;
        }

        if (
          error instanceof AdminApiError &&
          error.status === 401
        ) {
          router.replace("/admin/login");
          return;
        }

        setMessage(
          "The administrator dashboard could not connect to the API.",
        );

        setLoading(false);
      }
    }

    void loadAdministrator();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    setMessage("");

    try {
      await logoutAdministrator();
      router.replace("/admin/login");
    } catch {
      setMessage(
        "Logout could not be completed. Please try again.",
      );

      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <div
        className="flex min-h-[480px] items-center justify-center"
        aria-live="polite"
      >
        <p className="text-sm text-slate-600">
          Loading administrator dashboardÃ¢â‚¬Â¦
        </p>
      </div>
    );
  }

  if (!administrator) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
        {message ||
          "Administrator authentication is required."}
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8">
      <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Administration portal
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome, {administrator.displayName}
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              {administrator.email}
              {" Ã‚Â· "}
              {administrator.role.replaceAll(
                "_",
                " ",
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 disabled:opacity-60"
          >
            {loggingOut
              ? "Signing outÃ¢â‚¬Â¦"
              : "Sign out"}
          </button>
        </div>
      </header>

      {message ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {message}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Account role
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-950">
            {administrator.role.replaceAll(
              "_",
              " ",
            )}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Account status
          </p>

          <p className="mt-3 text-2xl font-bold text-emerald-700">
            {administrator.status}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Session expires
          </p>

          <p className="mt-3 text-lg font-bold text-slate-950">
            {session
              ? new Date(
                  session.expiresAt,
                ).toLocaleString()
              : "Unavailable"}
          </p>
        </article>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Content management
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            News, notices, events, resources, staff information, and school content modules will appear here.
          </p>
        </article>

        {administrator.role ===
        "SUPER_ADMIN" ? (
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-emerald-950">
              Administrator management
            </h2>

            <p className="mt-3 text-sm leading-6 text-emerald-900">
              This account can create administrators, change roles, disable accounts, and revoke sessions.
            </p>
          </article>
        ) : (
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-950">
              Limited access
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Available dashboard modules are restricted according to the administrator role.
            </p>
          </article>
        )}
      </div>
      <AdminContentManagement role={administrator.role} />


      {administrator.role ===
      "SUPER_ADMIN" ? (
        <AdminUserManagement />
      ) : null}
    </section>
  );
}