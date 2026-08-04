"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  AdminApiError,
  getCurrentAdministrator,
  loginAdministrator,
} from "../../lib/admin-api";

export function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [checkingSession, setCheckingSession] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        await getCurrentAdministrator();

        if (active) {
          router.replace("/admin");
        }
      } catch {
        if (active) {
          setCheckingSession(false);
        }
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setSubmitting(true);

    try {
      await loginAdministrator({
        email: email.trim().toLowerCase(),
        password,
      });

      setPassword("");
      router.replace("/admin");
    } catch (error) {
      if (error instanceof AdminApiError) {
        setMessage(error.message);
      } else {
        setMessage(
          "The administrator API is currently unavailable.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingSession) {
    return (
      <div
        className="flex min-h-[420px] items-center justify-center"
        aria-live="polite"
      >
        <p className="text-sm text-slate-600">
          Checking administrator session…
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Sripalee College
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Administrator login
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in using an approved school administrator account.
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="admin-email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email address
          </label>

          <input
            id="admin-email"
            type="email"
            name="email"
            autoComplete="username"
            required
            maxLength={254}
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Password
          </label>

          <input
            id="admin-password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            maxLength={128}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {message ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Signing in…"
            : "Sign in securely"}
        </button>
      </form>
    </section>
  );
}