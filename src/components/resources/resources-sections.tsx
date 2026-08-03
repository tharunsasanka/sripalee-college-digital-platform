"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  FileArchive,
  FileText,
  FolderOpen,
  GraduationCap,
  LockKeyhole,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  resourceAccessModels,
  resourceAudiences,
  resourceCategories,
  resourceFacts,
  resourceFileTypes,
  resourcePublishingRules,
  resourceWorkflow,
  schoolResources,
  type ResourceStatus,
} from "@/lib/resources-data";

const resourceIcons: Record<string, LucideIcon> = {
  Academic: BookOpen,
  Examinations: GraduationCap,
  Forms: ClipboardList,
  Circulars: FileText,
  Policies: ShieldCheck,
  Calendars: CalendarDays,
  Heritage: Archive,
};

const statusStyles: Record<
  ResourceStatus,
  {
    label: string;
    badge: string;
    border: string;
  }
> = {
  available: {
    label: "Available",
    badge: "bg-emerald-100 text-emerald-800",
    border: "border-emerald-200",
  },
  pending: {
    label: "Pending approval",
    badge: "bg-amber-100 text-amber-800",
    border: "border-amber-200",
  },
  archived: {
    label: "Archived",
    badge: "bg-slate-100 text-slate-700",
    border: "border-slate-300",
  },
};

const sectionLinks = [
  {
    href: "featured",
    label: "Featured resources",
  },
  {
    href: "directory",
    label: "Resource directory",
  },
  {
    href: "access",
    label: "Access levels",
  },
  {
    href: "workflow",
    label: "File workflow",
  },
  {
    href: "controls",
    label: "Security controls",
  },
];

export function ResourcesSections() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [audience, setAudience] = useState("All Audiences");
  const [fileType, setFileType] = useState("All File Types");

  const featuredResources = schoolResources.filter(
    (resource) => resource.featured,
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredResources = schoolResources.filter((resource) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.category.toLowerCase().includes(normalizedQuery) ||
      resource.audience.toLowerCase().includes(normalizedQuery) ||
      resource.fileType.toLowerCase().includes(normalizedQuery) ||
      resource.summary.toLowerCase().includes(normalizedQuery) ||
      resource.details.some((detail) =>
        detail.toLowerCase().includes(normalizedQuery),
      );

    const matchesCategory =
      category === "All Categories" || resource.category === category;

    const matchesAudience =
      audience === "All Audiences" || resource.audience === audience;

    const matchesFileType =
      fileType === "All File Types" || resource.fileType === fileType;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesAudience &&
      matchesFileType
    );
  });

  const filtersActive =
    query.length > 0 ||
    category !== "All Categories" ||
    audience !== "All Audiences" ||
    fileType !== "All File Types";

  const clearFilters = () => {
    setQuery("");
    setCategory("All Categories");
    setAudience("All Audiences");
    setFileType("All File Types");
  };

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
                Resources and Downloads
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Approved school documents in one organised centre.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Find calendars, examination files, forms, policies, circulars,
                learning materials and approved public documents.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#directory"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Browse resources
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/academics"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore academics
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
                      Resource overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Controlled uploads and versioned downloads
                    </h2>
                  </div>

                  <FolderOpen className="text-[#e8c85e]" size={31} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {resourceFacts.map((fact) => (
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
                  Development entries do not provide real downloads until the
                  school supplies and approves the official files.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Resources page sections"
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
        id="featured"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Featured Resources"
            title="Important documents for students and families"
            description="Featured resources remain visible until they are replaced, expired or moved into the document archive."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredResources.map((resource, index) => {
            const Icon = resourceIcons[resource.category] ?? FileText;
            const style = statusStyles[resource.status];

            return (
              <Reveal key={resource.id} delay={index * 0.05}>
                <article
                  className={`card-3d flex h-full flex-col rounded-[2rem] border bg-white p-7 ${style.border}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      <Icon size={25} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    {resource.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                    {resource.title}
                  </h2>

                  <p className="mt-4 leading-7 text-black/65">
                    {resource.summary}
                  </p>

                  <div className="mt-6 space-y-3">
                    {resource.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-[#c9a227]"
                          size={18}
                        />

                        <p className="text-sm leading-6 text-black/60">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="rounded-2xl bg-[#faf7ef] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                        Publication status
                      </p>

                      <p className="mt-2 text-sm leading-6 text-black/60">
                        {resource.approvalStatus}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        id="directory"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Resource Directory"
              title="Search documents by category, audience and file type"
              description="Official resources will display their publication date, version, language, size and approving authority."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 grid gap-4 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-5 md:grid-cols-2 xl:grid-cols-4">
              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Search resources
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 bg-white px-4 py-3">
                  <Search className="shrink-0 text-[#741f2b]" size={19} />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Title, category or keyword"
                    className="w-full bg-transparent text-base outline-none placeholder:text-black/35"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Category
                </span>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
                >
                  {resourceCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Audience
                </span>

                <select
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
                >
                  {resourceAudiences.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  File type
                </span>

                <select
                  value={fileType}
                  onChange={(event) => setFileType(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
                >
                  {resourceFileTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Reveal>

          <div
            className="mt-6 flex flex-wrap items-center justify-between gap-4"
            aria-live="polite"
          >
            <p className="text-sm text-black/55">
              Showing {filteredResources.length}{" "}
              {filteredResources.length === 1 ? "resource" : "resources"}.
            </p>

            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring rounded-full border border-[#741f2b]/20 px-4 py-2 text-sm font-semibold text-[#741f2b]"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {filteredResources.map((resource, index) => {
                const Icon = resourceIcons[resource.category] ?? FileText;
                const style = statusStyles[resource.status];

                return (
                  <Reveal key={resource.id} delay={index * 0.035}>
                    <article
                      className={`card-3d flex h-full flex-col rounded-[2rem] border bg-white p-7 ${style.border}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                            <Icon size={22} />
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741f2b]">
                              {resource.category}
                            </p>

                            <p className="mt-1 text-sm text-black/50">
                              {resource.audience}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
                        >
                          {style.label}
                        </span>
                      </div>

                      <h2 className="mt-6 text-2xl font-semibold text-[#4e111b]">
                        {resource.title}
                      </h2>

                      <p className="mt-4 leading-7 text-black/65">
                        {resource.summary}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <FileArchive className="text-[#741f2b]" size={18} />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            File type
                          </p>

                          <p className="mt-2 text-sm text-black/60">
                            {resource.fileType}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <Download className="text-[#741f2b]" size={18} />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            File size
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {resource.sizeLabel}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <CalendarDays
                            className="text-[#741f2b]"
                            size={18}
                          />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Updated
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {resource.updatedLabel}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {resource.languages.map((language) => (
                          <span
                            key={language}
                            className="rounded-full border border-[#741f2b]/15 bg-[#741f2b]/5 px-3 py-1.5 text-xs font-semibold text-[#741f2b]"
                          >
                            {language}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-7">
                        {resource.downloadPath ? (
                          <a
                            href={resource.downloadPath}
                            download
                            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#741f2b] px-5 py-3.5 font-semibold text-white"
                          >
                            Download resource
                            <Download size={18} />
                          </a>
                        ) : (
                          <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#faf7ef] p-4">
                            <LockKeyhole
                              className="shrink-0 text-[#741f2b]"
                              size={20}
                            />

                            <p className="text-sm font-semibold leading-6 text-[#741f2b]">
                              Official file awaiting approval
                            </p>
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-black/20 bg-[#faf7ef] p-12 text-center">
              <Search className="mx-auto text-[#741f2b]" size={30} />

              <h2 className="mt-5 text-2xl font-semibold text-[#4e111b]">
                No matching resources
              </h2>

              <p className="mt-3 text-black/55">
                Change the search term, category, audience or file type.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring mt-6 rounded-full bg-[#741f2b] px-5 py-3 text-sm font-semibold text-white"
              >
                Reset resource search
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        id="access"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Access Levels"
            title="Public documents and protected resources remain separate"
            description="Authentication and role-based permissions determine which resources each visitor can access."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resourceAccessModels.map((model, index) => (
            <Reveal key={model.title} delay={index * 0.05}>
              <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                  {index === 0 && <FolderOpen size={22} />}
                  {index === 1 && <GraduationCap size={22} />}
                  {index === 2 && <UsersRound size={22} />}
                  {index === 3 && <LockKeyhole size={22} />}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                  {model.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-black/60">
                  {model.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Resource Workflow
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Files move through validation, review and approval
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Uploading a document does not automatically make it public.
                Every resource should be validated and approved first.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {resourceWorkflow.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold text-[#e8c85e]">
                      {item.step}
                    </p>

                    <FileArchive className="text-[#e8c85e]" size={23} />
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
        id="controls"
        className="scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={34} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                File Security
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Safe uploads, controlled access and complete version history
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                Resource publication must protect users from unsafe files and
                prevent private information from entering public downloads.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {resourcePublishingRules.map((rule, index) => (
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
                Academic Information
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Explore learning stages, subjects and examinations
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Visit the Academics section for learning pathways, departments,
                examinations and academic guidance.
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