"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Languages,
  LockKeyhole,
  School,
  Send,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  admissionFaqs,
  admissionFacts,
  admissionGrades,
  admissionPathways,
  admissionSecurityRules,
  admissionWorkflow,
  applicantRelationships,
  documentGuidance,
  preferredLanguages,
  type AdmissionStatus,
} from "@/lib/admissions-data";

type EnquiryFormState = {
  applicantName: string;
  contactName: string;
  relationship: string;
  email: string;
  phone: string;
  requestedGrade: string;
  preferredLanguage: string;
  previousSchool: string;
  message: string;
  consent: boolean;
};

const statusStyles: Record<
  AdmissionStatus,
  {
    label: string;
    badge: string;
    border: string;
  }
> = {
  planned: {
    label: "Planned",
    badge: "bg-amber-100 text-amber-800",
    border: "border-amber-200",
  },
  open: {
    label: "Applications open",
    badge: "bg-emerald-100 text-emerald-800",
    border: "border-emerald-200",
  },
  closed: {
    label: "Applications closed",
    badge: "bg-slate-100 text-slate-700",
    border: "border-slate-300",
  },
};

const initialForm: EnquiryFormState = {
  applicantName: "",
  contactName: "",
  relationship: "Select relationship",
  email: "",
  phone: "",
  requestedGrade: "Select requested grade",
  preferredLanguage: "Select preferred language",
  previousSchool: "",
  message: "",
  consent: false,
};

const sectionLinks = [
  {
    href: "pathways",
    label: "Admission pathways",
  },
  {
    href: "process",
    label: "Application process",
  },
  {
    href: "documents",
    label: "Document guidance",
  },
  {
    href: "enquiry",
    label: "Admission enquiry",
  },
  {
    href: "faq",
    label: "Questions",
  },
  {
    href: "security",
    label: "Data protection",
  },
];

export function AdmissionsSections() {
  const [form, setForm] = useState<EnquiryFormState>(initialForm);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">(
    "",
  );

  function updateField<K extends keyof EnquiryFormState>(
    field: K,
    value: EnquiryFormState[K],
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

  function resetForm() {
    setForm(initialForm);
    setFeedback("");
    setFeedbackType("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validApplicantName = form.applicantName.trim().length >= 2;
    const validContactName = form.contactName.trim().length >= 2;
    const validRelationship = form.relationship !== "Select relationship";
    const validEmail =
      form.email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const validGrade = form.requestedGrade !== "Select requested grade";
    const validLanguage =
      form.preferredLanguage !== "Select preferred language";
    const validMessage = form.message.trim().length >= 20;

    if (
      !validApplicantName ||
      !validContactName ||
      !validRelationship ||
      !validEmail ||
      !validGrade ||
      !validLanguage ||
      !validMessage ||
      !form.consent
    ) {
      setFeedback(
        "Complete every required field, enter a valid email address, provide at least 20 characters in the message and accept the privacy acknowledgement.",
      );
      setFeedbackType("error");
      return;
    }

    setFeedback(
      "The enquiry passed browser validation. It has not been submitted because the approved admissions backend and official school mailbox are not connected yet.",
    );
    setFeedbackType("success");
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
                Admissions and Registration
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Clear guidance for future students and families.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Review proposed admission pathways, application stages,
                document guidance and secure student-registration controls.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#pathways"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Explore admissions
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Contact the school
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
                      Admissions overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Secure applications and controlled decisions
                    </h2>
                  </div>

                  <GraduationCap className="text-[#e8c85e]" size={32} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {admissionFacts.map((fact) => (
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

                <p className="mt-6 text-sm leading-6 text-white/60">
                  No admission period is active unless the school publishes an
                  authorised announcement.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Admissions page sections"
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
        id="pathways"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Admission Pathways"
            title="Information for different stages of school entry"
            description="Every pathway remains inactive until the school confirms availability, eligibility, dates and the official application process."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {admissionPathways.map((pathway, index) => {
            const style = statusStyles[pathway.status];

            return (
              <Reveal key={pathway.id} delay={index * 0.05}>
                <article
                  className={`card-3d flex h-full flex-col rounded-[2rem] border bg-white p-7 ${style.border}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      {index === 0 && <School size={25} />}
                      {index === 1 && <UsersRound size={25} />}
                      {index === 2 && <GraduationCap size={25} />}
                      {index === 3 && <BookOpenCheck size={25} />}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    {pathway.gradeRange}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                    {pathway.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-black/60">
                    For: {pathway.audience}
                  </p>

                  <p className="mt-5 leading-7 text-black/65">
                    {pathway.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {pathway.requirements.map((requirement) => (
                      <div
                        key={requirement}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-[#c9a227]"
                          size={18}
                        />

                        <p className="text-sm leading-6 text-black/60">
                          {requirement}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <p className="rounded-2xl bg-[#faf7ef] p-4 text-sm font-semibold leading-6 text-[#741f2b]">
                      {pathway.statusMessage}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        id="process"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Application Process
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                From official notice to completed registration
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Submission confirmation does not mean that an applicant has
                been selected or admitted.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {admissionWorkflow.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold text-[#e8c85e]">
                      {item.step}
                    </p>

                    <ClipboardCheck className="text-[#e8c85e]" size={23} />
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
        id="documents"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Document Guidance"
            title="Submit only officially requested documents"
            description="Sensitive documents must be uploaded through a protected application portal, not through public email or the enquiry form."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documentGuidance.map((document, index) => (
            <Reveal key={document.title} delay={index * 0.04}>
              <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <FileText size={22} />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741f2b]">
                    Document {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-[#4e111b]">
                  {document.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-black/60">
                  {document.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex items-start gap-5 rounded-[2rem] border border-amber-300 bg-amber-50 p-7">
            <AlertTriangle
              className="mt-1 shrink-0 text-amber-700"
              size={29}
            />

            <div>
              <h2 className="text-xl font-semibold text-[#4e111b]">
                Do not upload private documents through an unverified link
              </h2>

              <p className="mt-3 leading-7 text-black/65">
                Applicants should confirm that they are using the official
                school domain and approved application portal before uploading
                identity, guardianship or academic documents.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="enquiry"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Admission Enquiry
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b] md:text-5xl">
                Ask a general admissions question
              </h2>

              <p className="mt-6 text-lg leading-8 text-black/65">
                This browser-validated form does not create an application and
                does not send or store information yet.
              </p>

              <div className="mt-8 rounded-[2rem] bg-[#4e111b] p-7 text-white">
                <LockKeyhole className="text-[#e8c85e]" size={31} />

                <h3 className="mt-5 text-xl font-semibold">
                  Do not attach private documents
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  Birth certificates, identification documents, examination
                  results and student records belong only in the future secure
                  application portal.
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
                    Applicant name *
                  </span>

                  <input
                    value={form.applicantName}
                    onChange={(event) =>
                      updateField("applicantName", event.target.value)
                    }
                    maxLength={120}
                    autoComplete="name"
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="Applicant name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Parent or contact name *
                  </span>

                  <input
                    value={form.contactName}
                    onChange={(event) =>
                      updateField("contactName", event.target.value)
                    }
                    maxLength={120}
                    autoComplete="name"
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="Responsible contact person"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Relationship *
                  </span>

                  <select
                    value={form.relationship}
                    onChange={(event) =>
                      updateField("relationship", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5"
                  >
                    {applicantRelationships.map((relationship) => (
                      <option key={relationship} value={relationship}>
                        {relationship}
                      </option>
                    ))}
                  </select>
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
                    maxLength={160}
                    autoComplete="email"
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="name@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Telephone number
                  </span>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    maxLength={30}
                    autoComplete="tel"
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="Optional contact number"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Requested grade *
                  </span>

                  <select
                    value={form.requestedGrade}
                    onChange={(event) =>
                      updateField("requestedGrade", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5"
                  >
                    {admissionGrades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Preferred language *
                  </span>

                  <select
                    value={form.preferredLanguage}
                    onChange={(event) =>
                      updateField("preferredLanguage", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5"
                  >
                    {preferredLanguages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#4e111b]">
                    Previous school
                  </span>

                  <input
                    value={form.previousSchool}
                    onChange={(event) =>
                      updateField("previousSchool", event.target.value)
                    }
                    maxLength={160}
                    className="mt-2 w-full rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Enquiry message *
                </span>

                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  maxLength={2000}
                  rows={7}
                  className="mt-2 w-full resize-y rounded-2xl border border-black/15 bg-[#faf7ef] px-4 py-3.5 outline-none transition focus:border-[#741f2b]"
                  placeholder="Ask a general question without including sensitive documents or private student information."
                />

                <span className="mt-2 block text-right text-xs text-black/60">
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
                  I understand that this is only a general enquiry and does not
                  create an application or guarantee admission. *
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
        id="faq"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Important information before applying"
            description="Final answers must be reviewed whenever admission regulations, dates or school procedures change."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {admissionFaqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group rounded-3xl border border-black/10 bg-white p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold text-[#4e111b]">
                  <span>{faq.question}</span>

                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#741f2b] text-sm text-white">
                    +
                  </span>
                </summary>

                <p className="mt-5 border-t border-black/10 pt-5 text-sm leading-7 text-black/60">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="security"
        className="scroll-mt-36 px-5 pb-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={35} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Applicant Data Protection
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Student information requires stronger protection
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                Admission systems may process identity, guardianship and
                academic information. Access must remain restricted and
                auditable.
              </p>

              <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white p-4">
                <Languages className="shrink-0 text-[#741f2b]" size={22} />

                <p className="text-sm font-semibold leading-6 text-[#4e111b]">
                  Important instructions should be provided in approved
                  Sinhala, English and Tamil versions.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {admissionSecurityRules.map((rule, index) => (
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
                Official Announcements
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Check for an authorised admission notice
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Admission dates, available grades, forms and deadlines should
                always be confirmed through the official News and Notices
                section.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/news"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
              >
                Check notices
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/resources"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white"
              >
                View application forms
                <FileCheck2 size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}