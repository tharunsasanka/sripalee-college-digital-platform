"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  Building2,
  Camera,
  Clock3,
  FileText,
  Landmark,
  LibraryBig,
  Mic2,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  archiveCollectionTypes,
  heritageCategories,
  heritageFacts,
  heritageFigures,
  heritagePublishingRules,
  heritageRecords,
  preservationProcess,
} from "@/lib/heritage-data";

const recordIcons: Record<string, LucideIcon> = {
  "Founding History": Landmark,
  People: UserRound,
  Buildings: Building2,
  Documents: FileText,
  Photographs: Camera,
  Traditions: Sparkles,
  "Oral History": Mic2,
};

const collectionIcons: Record<string, LucideIcon> = {
  documents: FileText,
  photographs: Camera,
  audio: Mic2,
  timeline: Clock3,
  people: UsersRound,
  buildings: Building2,
};

const sectionLinks = [
  {
    href: "archive",
    label: "Archive",
  },
  {
    href: "figures",
    label: "Historical figures",
  },
  {
    href: "collections",
    label: "Collections",
  },
  {
    href: "preservation",
    label: "Preservation",
  },
  {
    href: "controls",
    label: "Publication controls",
  },
];

export function HeritageSections() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Records");

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return heritageRecords.filter((record) => {
      const matchesCategory =
        category === "All Records" || record.category === category;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        record.title.toLowerCase().includes(normalizedQuery) ||
        record.year.toLowerCase().includes(normalizedQuery) ||
        record.category.toLowerCase().includes(normalizedQuery) ||
        record.summary.toLowerCase().includes(normalizedQuery) ||
        record.keywords.some((keyword) =>
          keyword.toLowerCase().includes(normalizedQuery),
        );

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />
        <div className="absolute -left-28 top-24 h-80 w-80 rounded-full border border-[#c9a227]/30" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
                Digital Heritage Archive
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Preserving the people, places and stories that shaped
                Sripalee College.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Explore the proposed structure for source-backed history,
                historical photographs, documents, buildings, traditions and
                oral-history collections.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#archive"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Explore the archive
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/about"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Our School
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
                      Archive overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Evidence, context and responsible preservation
                    </h2>
                  </div>

                  <Archive className="text-[#e8c85e]" size={31} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {heritageFacts.map((fact) => (
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
                  Development records remain clearly marked until their
                  sources, permissions and descriptions are approved.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Heritage page sections"
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
        id="archive"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Archive Directory"
            title="Search historical records by subject or category"
            description="The final archive will connect every public record with source, date, permission, verification and preservation information."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-4 rounded-[2rem] border border-black/10 bg-white p-5 lg:grid-cols-[1.3fr_1fr]">
            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Search records
              </span>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 px-4 py-3">
                <Search className="shrink-0 text-[#741f2b]" size={19} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search people, places, dates or keywords"
                  className="w-full bg-transparent text-base outline-none placeholder:text-black/35"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Archive category
              </span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
              >
                {heritageCategories.map((item) => (
                  <option key={item}>{item}</option>
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
            Showing {filteredRecords.length}{" "}
            {filteredRecords.length === 1 ? "record" : "records"}.
          </p>

          {(query || category !== "All Records") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All Records");
              }}
              className="focus-ring rounded-full border border-[#741f2b]/20 px-4 py-2 text-sm font-semibold text-[#741f2b]"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredRecords.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecords.map((record, index) => {
              const Icon = recordIcons[record.category] ?? BookOpen;

              return (
                <Reveal key={record.id} delay={index * 0.04}>
                  <article className="card-3d flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white">
                    <div className="bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-7 text-white">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                          <Icon size={25} />
                        </div>

                        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#e8c85e]">
                          {record.year}
                        </span>
                      </div>

                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c85e]">
                        {record.category}
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold">
                        {record.title}
                      </h2>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <p className="leading-7 text-black/65">
                        {record.summary}
                      </p>

                      <div className="mt-6 rounded-2xl bg-[#faf7ef] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#741f2b]">
                          Historical significance
                        </p>

                        <p className="mt-2 text-sm leading-6 text-black/60">
                          {record.significance}
                        </p>
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="flex items-start gap-3 rounded-2xl border border-[#c9a227]/30 bg-[#c9a227]/10 p-4">
                          <ShieldCheck
                            className="mt-0.5 shrink-0 text-[#741f2b]"
                            size={19}
                          />

                          <p className="text-sm font-semibold leading-6 text-[#741f2b]">
                            {record.sourceStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-black/20 bg-white p-12 text-center">
            <Search className="mx-auto text-[#741f2b]" size={30} />

            <h2 className="mt-5 text-2xl font-semibold text-[#4e111b]">
              No matching historical records
            </h2>

            <p className="mt-3 text-black/55">
              Change the search term or archive category.
            </p>
          </div>
        )}
      </section>

      <section
        id="figures"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Historical Figures"
              title="People connected with the school’s story"
              description="Biographical profiles should separate verified historical information from interpretation, recollection and unconfirmed material."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {heritageFigures.map((figure, index) => (
              <Reveal key={figure.name} delay={index * 0.05}>
                <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-[#faf7ef] p-7">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-[#741f2b] text-2xl font-semibold text-[#e8c85e]">
                    {figure.name
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    {figure.period}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                    {figure.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-black/50">
                    {figure.role}
                  </p>

                  <p className="mt-5 leading-7 text-black/65">
                    {figure.summary}
                  </p>

                  <p className="mt-6 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-[#741f2b]">
                    {figure.publicationStatus}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="collections"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Digital Collections
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Different materials require different forms of preservation
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                The archive can organise related records while preserving
                ownership, source, context, privacy and technical metadata.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {archiveCollectionTypes.map((collection, index) => {
              const Icon = collectionIcons[collection.icon] ?? LibraryBig;

              return (
                <Reveal key={collection.title} delay={index * 0.04}>
                  <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {collection.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-white/60">
                      {collection.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="preservation"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Preservation Workflow"
            title="From original material to a trusted digital record"
            description="Digitisation is only one part of archival work. Every item should pass through assessment, description, verification and approval."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {preservationProcess.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.035}>
              <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-3xl font-semibold text-[#741f2b]">
                    {item.step}
                  </p>

                  <Archive className="text-[#c9a227]" size={22} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#4e111b]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/60">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="controls"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={34} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Publication Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Historical value does not remove privacy and copyright duties
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                The archive must remain useful, trustworthy and respectful to
                students, staff, families, contributors and rights holders.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {heritagePublishingRules.map((rule, index) => (
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

      <section className="px-5 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                School Identity
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Continue exploring Sripalee College
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Visit the Our School section for the institutional profile,
                leadership structure, identity and educational direction.
              </p>
            </div>

            <Link
              href="/about"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
            >
              Explore Our School
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}