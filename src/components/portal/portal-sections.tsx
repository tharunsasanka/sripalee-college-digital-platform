"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  accountActivationSteps,
  portalAccessRules,
  portalFacts,
  portalFeatures,
  portalRoles,
  portalSecurityControls,
  portalSupportTopics,
  type PortalRoleId,
} from "@/lib/portal-data";

type LoginFormState = {
  role: PortalRoleId;
  identifier: string;
  password: string;
  acknowledgement: boolean;
};

const roleIcons: Record<string, LucideIcon> = {
  student: GraduationCap,
  parent: UsersRound,
  staff: UserCheck,
};

const sectionLinks = [
  {
    href: "access",
    label: "Portal access",
  },
  {
    href: "login",
    label: "Sign-in gateway",
  },
  {
    href: "features",
    label: "Available services",
  },
  {
    href: "activation",
    label: "Account activation",
  },
  {
    href: "security",
    label: "Security",
  },
  {
    href: "support",
    label: "Support",
  },
];

const initialForm: LoginFormState = {
  role: "student",
  identifier: "",
  password: "",
  acknowledgement: false,
};

export function PortalSections() {
  const [form, setForm] = useState<LoginFormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<
    "success" | "error" | ""
  >("");

  function updateField<K extends keyof LoginFormState>(
    field: K,
    value: LoginFormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (feedback) {
      setFeedback("");
      setFeedbackType("");
    }
  }

  function selectRole(role: PortalRoleId) {
    updateField("role", role);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validIdentifier = form.identifier.trim().length >= 4;
    const validPassword = form.password.length >= 8;

    if (!validIdentifier || !validPassword || !form.acknowledgement) {
      setFeedback(
        "Enter an institutional identifier with at least 4 characters, a password with at least 8 characters and accept the security acknowledgement.",
      );
      setFeedbackType("error");
      return;
    }

    setFeedback(
      "The form passed browser validation. No login request was sent because the secure authentication backend has not been connected.",
    );
    setFeedbackType("success");

    setForm((current) => ({
      ...current,
      password: "",
    }));

    setShowPassword(false);
  }

  function resetForm() {
    setForm(initialForm);
    setFeedback("");
    setFeedbackType("");
    setShowPassword(false);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-[#c9a227]/30" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
                Digital Portal
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Protected services for students, parents and staff.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Access academic records, attendance information, resources,
                notices and authorised administrative services through a
                secure role-based platform.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#login"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Open portal gateway
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Get account support
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                      Portal overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Private records remain behind secure authentication
                    </h2>
                  </div>

                  <LockKeyhole className="text-[#e8c85e]" size={32} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {portalFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <p className="text-2xl font-semibold text-[#e8c85e]">
                        {fact.value}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {fact.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-6 text-white/50">
                  The current interface is a frontend demonstration. It does
                  not contain real accounts, passwords or student records.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Portal page sections"
          className="mx-auto flex max-w-7xl flex-wrap gap-x-7 gap-y-2 py-4 text-sm font-semibold text-[#4e111b]"
        >
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="focus-ring rounded-lg px-2 py-1.5 transition hover:bg-[#741f2b]/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section
        id="access"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Portal Access"
            title="Each user receives a separate protected experience"
            description="Access is determined by verified identity, role, student relationship and assigned institutional responsibilities."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portalRoles.map((role, index) => {
            const Icon = roleIcons[role.icon] ?? UserRound;

            return (
              <Reveal key={role.id} delay={index * 0.05}>
                <article className="card-3d flex h-full flex-col rounded-[2rem] border border-black/10 bg-white p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      <Icon size={25} />
                    </div>

                    <span className="rounded-full bg-[#c9a227]/20 px-3 py-1.5 text-xs font-semibold text-[#4e111b]">
                      {role.audience}
                    </span>
                  </div>

                  <h2 className="mt-7 text-2xl font-semibold text-[#4e111b]">
                    {role.title}
                  </h2>

                  <p className="mt-4 leading-7 text-black/65">
                    {role.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {role.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-[#c9a227]"
                          size={18}
                        />

                        <p className="text-sm leading-6 text-black/60">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <p className="rounded-2xl bg-[#faf7ef] p-4 text-sm font-semibold leading-6 text-[#741f2b]">
                      {role.accessStatus}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        id="login"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Secure Sign-In Gateway
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b] md:text-5xl">
                Access only your authorised services
              </h2>

              <p className="mt-6 text-lg leading-8 text-black/65">
                The current form validates input in the browser but does not
                authenticate users or transmit credentials.
              </p>

              <div className="mt-8 rounded-[2rem] border border-amber-300 bg-amber-50 p-7">
                <AlertTriangle className="text-amber-700" size={29} />

                <h3 className="mt-5 text-xl font-semibold text-[#4e111b]">
                  Use test values during development
                </h3>

                <p className="mt-3 text-sm leading-7 text-black/65">
                  Do not enter a real password until the official secure
                  authentication backend and school domain are connected.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[2rem] border border-black/10 bg-white p-6 md:p-8"
            >
              <fieldset>
                <legend className="text-sm font-semibold text-[#4e111b]">
                  Select account type
                </legend>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {portalRoles.map((role) => {
                    const Icon = roleIcons[role.icon] ?? UserRound;
                    const selected = form.role === role.id;

                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => selectRole(role.id)}
                        aria-pressed={selected}
                        className={`focus-ring flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#741f2b] bg-[#741f2b] text-white"
                            : "border-black/10 bg-[#faf7ef] text-[#4e111b]"
                        }`}
                      >
                        <Icon
                          className={
                            selected ? "text-[#e8c85e]" : "text-[#741f2b]"
                          }
                          size={21}
                        />

                        <span className="font-semibold">{role.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="mt-6 block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Institutional identifier *
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5">
                  <Mail className="shrink-0 text-[#741f2b]" size={19} />

                  <input
                    value={form.identifier}
                    onChange={(event) =>
                      updateField("identifier", event.target.value)
                    }
                    maxLength={160}
                    autoComplete="username"
                    className="w-full bg-transparent outline-none"
                    placeholder="Student ID, parent email or staff account"
                  />
                </div>
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Password *
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5">
                  <KeyRound className="shrink-0 text-[#741f2b]" size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    maxLength={128}
                    autoComplete="current-password"
                    className="w-full bg-transparent outline-none"
                    placeholder="Use a test value during development"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="focus-ring rounded-lg p-1 text-[#741f2b]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-[#faf7ef] p-4">
                <input
                  type="checkbox"
                  checked={form.acknowledgement}
                  onChange={(event) =>
                    updateField("acknowledgement", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#741f2b]"
                />

                <span className="text-sm leading-6 text-black/65">
                  I understand that this development form does not provide real
                  account access and that I should not enter a real password. *
                </span>
              </label>

              {feedback && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${
                    feedbackType === "success"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "border-red-300 bg-red-50 text-red-800"
                  }`}
                >
                  {feedback}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#741f2b] px-6 py-3.5 font-semibold text-white"
                >
                  Validate sign-in
                  <LockKeyhole size={18} />
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="focus-ring rounded-full border border-[#741f2b]/25 px-6 py-3.5 font-semibold text-[#741f2b]"
                >
                  Clear form
                </button>
              </div>

              <div className="mt-6 border-t border-black/10 pt-5">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[#741f2b]"
                >
                  <LifeBuoy size={18} />
                  Account and access support
                </Link>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Portal Services"
            title="Access is adjusted according to each verified role"
            description="The same service may provide different information and actions to students, parents and authorised staff."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            <div className="hidden grid-cols-[1.4fr_repeat(3,0.75fr)] bg-[#4e111b] px-6 py-5 text-sm font-semibold text-white lg:grid">
              <span>Service</span>
              <span>Student</span>
              <span>Parent</span>
              <span>Staff</span>
            </div>

            {portalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid gap-5 p-6 lg:grid-cols-[1.4fr_repeat(3,0.75fr)] lg:items-center ${
                  index !== portalFeatures.length - 1
                    ? "border-b border-black/10"
                    : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#4e111b]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {feature.description}
                  </p>
                </div>

                {[
                  {
                    label: "Student",
                    value: feature.student,
                    icon: GraduationCap,
                  },
                  {
                    label: "Parent",
                    value: feature.parent,
                    icon: UsersRound,
                  },
                  {
                    label: "Staff",
                    value: feature.staff,
                    icon: UserCheck,
                  },
                ].map((access) => {
                  const Icon = access.icon;

                  return (
                    <div
                      key={access.label}
                      className="rounded-2xl bg-[#faf7ef] p-4"
                    >
                      <div className="flex items-center gap-2 lg:hidden">
                        <Icon className="text-[#741f2b]" size={17} />

                        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                          {access.label}
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-semibold leading-6 text-[#4e111b] lg:mt-0">
                        {access.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="activation"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Account Activation
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Accounts begin with verified institutional information
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Public self-registration should not create immediate access to
                private student or staff records.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {accountActivationSteps.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold text-[#e8c85e]">
                      {item.step}
                    </p>

                    <UserCheck className="text-[#e8c85e]" size={23} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="security"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Portal Security"
            title="Private records must never become public search results"
            description="Authentication, role permissions, guardian verification and audit logging protect student and institutional information."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {portalSecurityControls.map((control, index) => (
            <Reveal key={control.title} delay={index * 0.035}>
              <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                  {index === 0 && <GraduationCap size={22} />}
                  {index === 1 && <UserCheck size={22} />}
                  {index === 2 && <UsersRound size={22} />}
                  {index === 3 && <KeyRound size={22} />}
                  {index === 4 && <ShieldCheck size={22} />}
                  {index === 5 && <ClipboardCheck size={22} />}
                  {index === 6 && <LockKeyhole size={22} />}
                  {index === 7 && <LifeBuoy size={22} />}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                  {control.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-black/60">
                  {control.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={35} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Access Rules
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Identity and permission before information
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                Student identification numbers alone should never be treated as
                sufficient proof of identity.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {portalAccessRules.map((rule, index) => (
              <Reveal key={rule} delay={index * 0.03}>
                <div className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#741f2b] text-xs font-semibold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-black/65">{rule}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="support"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Portal Support"
              title="Account problems require a verified support process"
              description="Support staff should help users without requesting passwords, authentication codes or unnecessary private information."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portalSupportTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.04}>
                <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-[#faf7ef] p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      {index === 0 && <UserCheck size={22} />}
                      {index === 1 && <KeyRound size={22} />}
                      {index === 2 && <UsersRound size={22} />}
                      {index === 3 && <FileText size={22} />}
                      {index === 4 && <BellRing size={22} />}
                      {index === 5 && <BookOpenCheck size={22} />}
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                      Support
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                    {topic.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-black/60">
                    {topic.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Need Portal Assistance?
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Use the official support route
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Never send passwords, verification codes or complete student
                records through an ordinary contact message.
              </p>
            </div>

            <Link
              href="/contact"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
            >
              Contact support
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}