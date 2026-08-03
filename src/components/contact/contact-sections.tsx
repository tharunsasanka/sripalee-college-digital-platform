"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  contactAudiences,
  contactChannels,
  contactFacts,
  contactPublishingRules,
  departmentContacts,
  inquirySubjects,
  officeHours,
  visitGuidelines,
} from "@/lib/contact-data";

type ContactFormState = {
  name: string;
  email: string;
  audience: string;
  subject: string;
  reference: string;
  message: string;
  consent: boolean;
};

const channelIcons: Record<string, LucideIcon> = {
  office: Building2,
  email: Mail,
  academic: GraduationCap,
  technical: Wrench,
};

const departmentIcons: Record<string, LucideIcon> = {
  administration: Building2,
  admissions: FileText,
  academic: GraduationCap,
  events: CalendarClock,
  heritage: Landmark,
  technical: Wrench,
};

const sectionLinks = [
  {
    href: "channels",
    label: "Contact channels",
  },
  {
    href: "departments",
    label: "Departments",
  },
  {
    href: "enquiry",
    label: "Send an enquiry",
  },
  {
    href: "visit",
    label: "Plan a visit",
  },
  {
    href: "location",
    label: "Location",
  },
  {
    href: "controls",
    label: "Privacy controls",
  },
];

const initialForm: ContactFormState = {
  name: "",
  email: "",
  audience: "Select audience",
  subject: "Select enquiry subject",
  reference: "",
  message: "",
  consent: false,
};

export function ContactSections() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">(
    "",
  );

  function updateField<K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K],
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validName = form.name.trim().length >= 2;
    const validEmail =
      form.email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const validAudience = form.audience !== "Select audience";
    const validSubject = form.subject !== "Select enquiry subject";
    const validMessage = form.message.trim().length >= 20;

    if (
      !validName ||
      !validEmail ||
      !validAudience ||
      !validSubject ||
      !validMessage ||
      !form.consent
    ) {
      setFeedback(
        "Complete all required fields, enter a valid email address, provide at least 20 characters in the message and accept the privacy acknowledgement.",
      );
      setFeedbackType("error");
      return;
    }

    setFeedback(
      "The enquiry passed browser validation. Message delivery will be enabled after the approved backend and official school mailbox are connected.",
    );
    setFeedbackType("success");
  }

  function resetForm() {
    setForm(initialForm);
    setFeedback("");
    setFeedbackType("");
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
                Contact and Enquiries
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Clear contact routes for families, students and visitors.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Find the appropriate school office, submit a general enquiry,
                review visitor guidance and check official communication
                channels.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#enquiry"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Send an enquiry
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/news"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Check school notices
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                      Contact overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Official information with privacy controls
                    </h2>
                  </div>

                  <MessageSquareText
                    className="text-[#e8c85e]"
                    size={31}
                  />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {contactFacts.map((fact) => (
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
                  Telephone numbers, email addresses and office hours remain
                  placeholders until confirmed by the school.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Contact page sections"
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
        id="channels"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Contact Channels"
            title="Choose the correct route for your enquiry"
            description="Official contact details will be published only after administrative confirmation."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map((channel, index) => {
            const Icon = channelIcons[channel.icon] ?? Phone;

            return (
              <Reveal key={channel.title} delay={index * 0.05}>
                <article className="card-3d flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <Icon size={22} />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold text-[#4e111b]">
                    {channel.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-black/60">
                    {channel.purpose}
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#faf7ef] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                      Contact
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-[#4e111b]">
                      {channel.value}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-black/50">
                      {channel.availability}
                    </p>
                  </div>

                  <p className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                    {channel.status}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        id="departments"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Department Directory"
              title="Route questions to the responsible school area"
              description="Private student and staff matters should never be handled through unrestricted public communication."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departmentContacts.map((department, index) => {
              const Icon =
                departmentIcons[department.icon] ?? MessageSquareText;

              return (
                <Reveal key={department.title} delay={index * 0.04}>
                  <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-[#faf7ef] p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                        <Icon size={22} />
                      </div>

                      <span className="rounded-full bg-[#c9a227]/20 px-3 py-1.5 text-xs font-semibold text-[#4e111b]">
                        {department.audience}
                      </span>
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-[#4e111b]">
                      {department.title}
                    </h2>

                    <p className="mt-4 leading-7 text-black/60">
                      {department.description}
                    </p>

                    <div className="mt-6 flex items-start gap-3 border-t border-black/10 pt-5">
                      <ShieldCheck
                        className="mt-0.5 shrink-0 text-[#741f2b]"
                        size={19}
                      />

                      <p className="text-sm font-semibold leading-6 text-[#741f2b]">
                        {department.contactStatus}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="enquiry"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                General Enquiry Form
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b] md:text-5xl">
                Send a structured public enquiry
              </h2>

              <p className="mt-6 text-lg leading-8 text-black/65">
                This form currently performs browser validation only. Secure
                delivery will be added when the backend and official mailbox
                are approved.
              </p>

              <div className="mt-8 rounded-[2rem] bg-[#4e111b] p-7 text-white">
                <ShieldCheck className="text-[#e8c85e]" size={30} />

                <h3 className="mt-5 text-xl font-semibold">
                  Do not include sensitive information
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  Do not submit passwords, verification codes, medical
                  information, private examination results, identity-card
                  numbers or confidential staff information.
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
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Name *
                  </span>

                  <input
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    autoComplete="name"
                    maxLength={120}
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Email address *
                  </span>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    autoComplete="email"
                    maxLength={160}
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="name@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Audience *
                  </span>

                  <select
                    value={form.audience}
                    onChange={(event) =>
                      updateField("audience", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5"
                  >
                    {contactAudiences.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Enquiry subject *
                  </span>

                  <select
                    value={form.subject}
                    onChange={(event) =>
                      updateField("subject", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5"
                  >
                    {inquirySubjects.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Existing reference number
                </span>

                <input
                  value={form.reference}
                  onChange={(event) =>
                    updateField("reference", event.target.value)
                  }
                  maxLength={80}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                  placeholder="Optional approved reference"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Message *
                </span>

                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  maxLength={2000}
                  rows={8}
                  className="mt-2 w-full resize-y rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                  placeholder="Explain your enquiry clearly without including sensitive personal information."
                />

                <span className="mt-2 block text-right text-xs text-black/45">
                  {form.message.length}/2000
                </span>
              </label>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-[#faf7ef] p-4">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    updateField("consent", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#741f2b]"
                />

                <span className="text-sm leading-6 text-black/65">
                  I understand that this public enquiry form should not contain
                  passwords, authentication codes or sensitive student and
                  staff information. *
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
                  Validate enquiry
                  <Send size={18} />
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="focus-ring rounded-full border border-[#741f2b]/25 px-6 py-3.5 font-semibold text-[#741f2b]"
                >
                  Clear form
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section
        id="visit"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                School Visits
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Confirm availability before travelling
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Office hours, school holidays, visitor access and appointment
                requirements must be confirmed using official information.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {officeHours.map((period, index) => (
              <Reveal key={period.day} delay={index * 0.05}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <Clock3 className="text-[#e8c85e]" size={25} />

                  <h3 className="mt-6 text-xl font-semibold">{period.day}</h3>

                  <p className="mt-4 font-semibold leading-7 text-[#e8c85e]">
                    {period.hours}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {period.availability}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {visitGuidelines.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-3xl font-semibold text-[#e8c85e]">
                    {item.step}
                  </p>

                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="location"
        className="mx-auto grid max-w-7xl scroll-mt-36 gap-8 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
      >
        <Reveal>
          <div className="grid min-h-[440px] place-items-center rounded-[2rem] border border-black/10 bg-gradient-to-br from-[#eee4d0] to-[#d8c49e] p-8 text-center">
            <div>
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#741f2b] text-white">
                <MapPin size={32} />
              </div>

              <h2 className="mt-6 text-3xl font-semibold text-[#4e111b]">
                Approved campus map
              </h2>

              <p className="mx-auto mt-4 max-w-md leading-7 text-black/60">
                An official map location, entrance guidance and accessible
                route information will be added after school confirmation.
              </p>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                Sripalee College · Horana, Sri Lanka
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="rounded-[2rem] border border-black/10 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
              Location and Arrival
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
              Information to confirm before launch
            </h2>

            <div className="mt-8 space-y-4">
              {[
                "Official postal address",
                "Approved map coordinates",
                "Public visitor entrance",
                "Accessible entrance and route",
                "Public transport guidance",
                "Parking and vehicle-access rules",
                "Visitor registration point",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-[#faf7ef] p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#741f2b]"
                    size={19}
                  />

                  <p className="text-sm font-semibold leading-6 text-[#4e111b]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="soft-grid border-y border-black/5 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-start gap-5 rounded-[2rem] border border-amber-300 bg-amber-50 p-7 md:p-9">
              <AlertTriangle
                className="mt-1 shrink-0 text-amber-700"
                size={30}
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
                  Urgent and emergency matters
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[#4e111b]">
                  Do not depend on a public website form for emergencies
                </h2>

                <p className="mt-4 leading-7 text-black/65">
                  Follow officially published school emergency instructions
                  and appropriate local emergency procedures. The general
                  enquiry form is intended only for non-urgent communication.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="controls"
        className="scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={34} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Contact Security
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Protecting enquiries and official communication
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                Contact services should collect only necessary information and
                route each message to authorised staff.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {contactPublishingRules.map((rule, index) => (
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

      <section className="px-5 pb-20 lg:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Before Contacting the School
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Check notices and public documents first
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Current announcements, calendars, forms and approved documents
                may already contain the information you need.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/news"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
              >
                View notices
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/resources"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white"
              >
                Browse resources
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}