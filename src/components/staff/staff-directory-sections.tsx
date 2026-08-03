"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArchiveRestore,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Eye,
  FileClock,
  GraduationCap,
  LockKeyhole,
  PencilLine,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  privateStaffFields,
  publicStaffFields,
  staffApprovalWorkflow,
  staffCrudActions,
  staffDepartments,
  staffFacts,
  staffProfiles,
  staffPublishingRules,
  subjectOptions,
} from "@/lib/staff-data";

const statusStyles = {
  published: "bg-emerald-100 text-emerald-800",
  review: "bg-amber-100 text-amber-800",
  draft: "bg-slate-100 text-slate-700",
};

const photoLabels = {
  approved: "Photo approved",
  pending: "Photo pending",
  "not-provided": "Photo not provided",
};

const crudIcons = [Plus, Eye, PencilLine, FileClock, ArchiveRestore];

export function StaffDirectorySections() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [subject, setSubject] = useState("All Subjects");

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return staffProfiles.filter((profile) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        profile.displayName.toLowerCase().includes(normalizedQuery) ||
        profile.position.toLowerCase().includes(normalizedQuery) ||
        profile.department.toLowerCase().includes(normalizedQuery) ||
        profile.subjects.some((item) =>
          item.toLowerCase().includes(normalizedQuery),
        );

      const matchesDepartment =
        department === "All Departments" ||
        profile.department === department;

      const matchesSubject =
        subject === "All Subjects" || profile.subjects.includes(subject);

      return matchesQuery && matchesDepartment && matchesSubject;
    });
  }, [department, query, subject]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />
        <div className="absolute -left-28 top-24 h-80 w-80 rounded-full border border-[#c9a227]/30" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
                Academic Staff
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Introducing the people who support teaching, learning and
                school development.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                The public directory will contain only approved professional
                information, while private staff records remain protected
                inside the administration system.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#directory"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Browse directory
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/academics"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Academic departments
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
                      Staff-management model
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Public profiles and protected records
                    </h2>
                  </div>

                  <UsersRound className="text-[#e8c85e]" size={31} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {staffFacts.map((fact) => (
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
                  The current entries are development placeholders and must be
                  replaced with verified school-approved information.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="directory"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Staff Directory"
            title="Search by name, department or subject"
            description="The final directory will show approved teachers and academic staff without exposing private employment or contact information."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-4 rounded-[2rem] border border-black/10 bg-white p-5 lg:grid-cols-[1.3fr_1fr_1fr]">
            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Search profiles
              </span>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 px-4 py-3">
                <Search className="shrink-0 text-[#741f2b]" size={19} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Name, role, department or subject"
                  className="w-full bg-transparent text-base outline-none placeholder:text-black/35"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Department
              </span>

              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
              >
                {staffDepartments.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Subject
              </span>

              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
              >
                {subjectOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        <div
          className="mt-6 flex items-center justify-between gap-4"
          aria-live="polite"
        >
          <p className="text-sm text-black/55">
            Showing {filteredProfiles.length} development profile
            {filteredProfiles.length === 1 ? "" : "s"}.
          </p>

          {(query ||
            department !== "All Departments" ||
            subject !== "All Subjects") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDepartment("All Departments");
                setSubject("All Subjects");
              }}
              className="focus-ring rounded-full border border-[#741f2b]/20 px-4 py-2 text-sm font-semibold text-[#741f2b]"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredProfiles.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile, index) => (
              <Reveal key={profile.id} delay={index * 0.04}>
                <article className="card-3d flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white">
                  <div className="bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-7 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#c9a227] bg-white/10 text-2xl font-semibold text-[#e8c85e]">
                        {profile.initials}
                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                          statusStyles[profile.profileStatus]
                        }`}
                      >
                        {profile.profileStatus}
                      </span>
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c85e]">
                      {profile.department}
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {profile.displayName}
                    </h2>

                    <p className="mt-2 text-sm text-white/60">
                      {profile.position}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className="leading-7 text-black/60">
                      {profile.introduction}
                    </p>

                    {profile.subjects.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741f2b]">
                          Subjects
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {profile.subjects.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-[#741f2b]/10 px-3 py-1.5 text-xs font-semibold text-[#741f2b]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741f2b]">
                        Responsibilities
                      </p>

                      <div className="mt-3 space-y-2">
                        {profile.responsibilities.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <CheckCircle2
                              className="mt-0.5 shrink-0 text-[#c9a227]"
                              size={17}
                            />

                            <p className="text-sm leading-6 text-black/55">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-7">
                      <div className="flex items-center gap-2 rounded-2xl bg-[#faf7ef] p-4">
                        <UserRound className="text-[#741f2b]" size={19} />

                        <p className="text-sm font-medium text-black/55">
                          {photoLabels[profile.photoStatus]}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-black/20 bg-white p-12 text-center">
            <Search className="mx-auto text-[#741f2b]" size={30} />
            <h2 className="mt-5 text-2xl font-semibold text-[#4e111b]">
              No matching profiles
            </h2>
            <p className="mt-3 text-black/55">
              Change the search term, department or subject filter.
            </p>
          </div>
        )}
      </section>

      <section className="soft-grid border-y border-black/5 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Information Separation"
              title="Public information and private staff records"
              description="The public website should never expose private employment, identity or personal contact information."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-700 text-white">
                  <Eye size={25} />
                </div>

                <h2 className="mt-7 text-2xl font-semibold text-[#4e111b]">
                  Approved public profile
                </h2>

                <div className="mt-6 space-y-3">
                  {publicStaffFields.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <BadgeCheck
                        className="mt-0.5 shrink-0 text-emerald-700"
                        size={19}
                      />
                      <p className="text-sm leading-6 text-black/65">{item}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="h-full rounded-[2rem] border border-[#741f2b]/20 bg-[#741f2b] p-8 text-white">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                  <LockKeyhole size={25} />
                </div>

                <h2 className="mt-7 text-2xl font-semibold">
                  Protected internal record
                </h2>

                <div className="mt-6 space-y-3">
                  {privateStaffFields.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <ShieldCheck
                        className="mt-0.5 shrink-0 text-[#e8c85e]"
                        size={19}
                      />
                      <p className="text-sm leading-6 text-white/65">{item}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Staff CRUD"
            title="Manage staff records without destroying institutional history"
            description="Important government-school records should use archive and restore operations rather than unrestricted permanent deletion."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {staffCrudActions.map((action, index) => {
            const Icon = crudIcons[index];

            return (
              <Reveal key={action.title} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <Icon size={22} />
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-[#4e111b]">
                    {action.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/60">
                    {action.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[#4e111b] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Approval Workflow
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Every public profile passes through review
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/65">
                Editors should not automatically publish staff information.
                Appropriate officers must verify the details before the profile
                becomes visible.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {staffApprovalWorkflow.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#c9a227] text-sm font-semibold text-[#4e111b]">
                    {index + 1}
                  </div>

                  <p className="font-medium text-white/75">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Publication Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Staff privacy and accuracy requirements
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                These controls should be applied by both the public website and
                the future administration dashboard.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {staffPublishingRules.map((rule, index) => (
              <Reveal key={rule} delay={index * 0.035}>
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
                Academic Information
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Explore subjects, departments and academic stages
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                The Academics section explains learning stages, subject areas,
                examinations and approved resources.
              </p>
            </div>

            <Link
              href="/academics"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
            >
              Explore academics
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}