"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import {
  AdminApiError,
  changeAdministratorPassword,
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

  const [
    administrator,
    setAdministrator,
  ] =
    useState<Administrator | null>(
      null,
    );

  const [
    session,
    setSession,
  ] =
    useState<AdministratorSession | null>(
      null,
    );

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");

  const [
    passwordError,
    setPasswordError,
  ] = useState("");

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(false);

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

        setSession(
          result.session,
        );

        setLoading(false);
      } catch (error) {
        if (!active) {
          return;
        }

        if (
          error instanceof
            AdminApiError &&
          error.status === 401
        ) {
          router.replace(
            "/admin/login",
          );

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

      router.replace(
        "/admin/login",
      );

      router.refresh();
    } catch {
      setMessage(
        "Logout could not be completed. Please try again.",
      );

      setLoggingOut(false);
    }
  }

  async function handleChangePassword(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordError(
        "Please complete all password fields.",
      );

      return;
    }

    if (
      newPassword.length < 12
    ) {
      setPasswordError(
        "The new password must contain at least 12 characters.",
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setPasswordError(
        "The new password confirmation does not match.",
      );

      return;
    }

    if (
      currentPassword ===
      newPassword
    ) {
      setPasswordError(
        "The new password must be different from the current password.",
      );

      return;
    }

    setChangingPassword(true);

    try {
      const result =
        await changeAdministratorPassword(
          {
            currentPassword,
            newPassword,
            confirmPassword,
          },
        );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage(
        result.message,
      );

      window.alert(
        `${result.message}\n\nFor security, all active administrator sessions have been signed out.`,
      );

      router.replace(
        "/admin/login",
      );

      router.refresh();
    } catch (error) {
      if (
        error instanceof
        AdminApiError
      ) {
        if (
          error.status === 401
        ) {
          router.replace(
            "/admin/login",
          );

          router.refresh();

          return;
        }

        setPasswordError(
          error.message,
        );
      } else {
        setPasswordError(
          "The password could not be changed. Please try again.",
        );
      }
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <div
        className="flex min-h-[480px] items-center justify-center"
        aria-live="polite"
      >
        <p className="text-sm text-slate-600">
          Loading administrator
          dashboard…
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
              Welcome,{" "}
              {
                administrator.displayName
              }
            </h1>

            <p className="mt-3 text-sm text-slate-300">
              {
                administrator.email
              }

              {" · "}

              {administrator.role.replaceAll(
                "_",
                " ",
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              void handleLogout();
            }}
            disabled={
              loggingOut
            }
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut
              ? "Signing out…"
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
            {
              administrator.status
            }
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
            Create and manage
            official school news,
            notices and events,
            including cover images,
            publishing and archival
            workflows.
          </p>
        </article>

        {administrator.role ===
        "SUPER_ADMIN" ? (
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-emerald-950">
              Administrator
              management
            </h2>

            <p className="mt-3 text-sm leading-6 text-emerald-900">
              This account can
              create administrators,
              change roles, disable
              accounts, and revoke
              sessions.
            </p>
          </article>
        ) : (
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-950">
              Limited access
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Available dashboard
              modules are restricted
              according to the
              administrator role.
            </p>
          </article>
        )}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Account security
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Change password
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Change the password
            used to access your
            administrator account.
            After the password is
            changed, all active
            sessions for this
            account will be signed
            out and you will need
            to sign in again.
          </p>
        </div>

        {passwordMessage ? (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          >
            {passwordMessage}
          </div>
        ) : null}

        {passwordError ? (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {passwordError}
          </div>
        ) : null}

        <form
          onSubmit={
            handleChangePassword
          }
          className="mt-6 grid max-w-3xl gap-5"
        >
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Current password
            </label>

            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={128}
              value={
                currentPassword
              }
              onChange={(
                event,
              ) => {
                setCurrentPassword(
                  event.target
                    .value,
                );
              }}
              disabled={
                changingPassword
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              New password
            </label>

            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              maxLength={128}
              value={
                newPassword
              }
              onChange={(
                event,
              ) => {
                setNewPassword(
                  event.target
                    .value,
                );
              }}
              disabled={
                changingPassword
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Use at least 12
              characters. Do not
              reuse your current
              password.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Confirm new password
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              maxLength={128}
              value={
                confirmPassword
              }
              onChange={(
                event,
              ) => {
                setConfirmPassword(
                  event.target
                    .value,
                );
              }}
              disabled={
                changingPassword
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={
                changingPassword
              }
              className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {changingPassword
                ? "Changing password…"
                : "Change password"}
            </button>
          </div>
        </form>
      </section>

      <AdminContentManagement
        role={
          administrator.role
        }
      />

      {administrator.role ===
      "SUPER_ADMIN" ? (
        <AdminUserManagement />
      ) : null}
    </section>
  );
}