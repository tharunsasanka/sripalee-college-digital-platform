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
  CheckCircle2,
  Clock3,
  FileText,
  Landmark,
  LibraryBig,
  Mic2,
  Quote,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
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
    label: "Archive catalogue",
  },
  {
    href: "founding",
    label: "Founding story",
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
        record.reference.toLowerCase().includes(normalizedQuery) ||
        record.title.toLowerCase().includes(normalizedQuery) ||
        record.year.toLowerCase().includes(normalizedQuery) ||
        record.category.toLowerCase().includes(normalizedQuery) ||
        record.collection.toLowerCase().includes(normalizedQuery) ||
        record.summary.toLowerCase().includes(normalizedQuery) ||
        record.keywords.some((keyword) =>
          keyword.toLowerCase().includes(normalizedQuery),
        );

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="heritage-page">
      <section className="heritage-hero relative overflow-hidden px-5 py-24 text-[#f7ecd1] lg:px-8 lg:py-32">
        <div className="heritage-hero-pattern absolute inset-0" />
        <div className="heritage-hero-vignette absolute inset-0" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-14 bg-[#c7a05a]" />

                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#dbc17d]">
                  Sripalee College Historical Collection
                </p>
              </div>

              <h1 className="heritage-serif mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] md:text-7xl">
                Preserving a legacy of education, culture and service.
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#f7ecd1]/70 md:text-xl">
                Enter a digital archive designed like a museum collection,
                bringing together verified history, photographs, documents,
                buildings, traditions and recorded memories.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#archive"
                  className="focus-ring inline-flex items-center gap-2 rounded-sm border border-[#d4b66b] bg-[#c7a05a] px-6 py-3.5 font-semibold text-[#2f2117] shadow-lg"
                >
                  Enter the archive
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/about"
                  className="focus-ring inline-flex items-center gap-2 rounded-sm border border-[#f7ecd1]/30 px-6 py-3.5 font-semibold text-[#f7ecd1] transition hover:bg-white/10"
                >
                  Our School
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#f7ecd1]/15 pt-6">
                {heritageFacts.map((fact) => (
                  <div key={fact.label}>
                    <p className="heritage-serif text-2xl text-[#dbc17d]">
                      {fact.value}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#f7ecd1]/45">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="heritage-paper heritage-document-tilt p-5 md:p-7">
              <div className="heritage-document-border p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#73532f]">
                      Foundation Record
                    </p>

                    <p className="mt-2 font-mono text-xs text-[#6a5139]/70">
                      Archive Ref. SC-FA-1934-001
                    </p>
                  </div>

                  <div className="heritage-stamp">
                    <ShieldCheck size={25} />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="my-8 border-y border-[#755938]/25 py-9 text-center">
                  <p className="heritage-serif text-7xl font-semibold text-[#5d1b25] md:text-8xl">
                    1934
                  </p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#73532f]">
                    The Founding Era
                  </p>
                </div>

                <Quote className="text-[#8b6b3f]" size={30} />

                <p className="heritage-serif mt-5 text-2xl leading-9 text-[#34271d]">
                  A historical beginning connected with Wilmot A. Perera,
                  Rabindranath Tagore and a vision that brought education and
                  culture together.
                </p>

                <p className="mt-7 border-t border-[#755938]/20 pt-5 text-sm leading-6 text-[#5d4937]">
                  This public record is presented as a curated historical
                  summary. Detailed dates, media and supporting documents must
                  remain linked to approved sources.
                </p>

                <div className="mt-7 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#73532f]">
                  <span>Founding Archive</span>
                  <span>Record 001</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="heritage-nav border-b border-[#765934]/20 px-5 lg:px-8">
        <nav
          aria-label="Heritage archive sections"
          className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-2 py-5"
        >
          {sectionLinks.map((item, index) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="focus-ring heritage-serif rounded-sm px-2 py-1.5 text-sm font-semibold text-[#4c3423] transition hover:bg-[#7d1f2b]/10"
            >
              <span className="mr-2 text-xs text-[#a1763d]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section
        id="archive"
        className="scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-6 border-b border-[#745737]/25 pb-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#7d1f2b]">
                  Archive Catalogue
                </p>

                <h2 className="heritage-serif mt-3 text-4xl font-semibold text-[#34261c] md:text-6xl">
                  Records held in the collection
                </h2>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5b4837]">
                  Search by person, period, building, document, collection or
                  archival reference number.
                </p>
              </div>

              <div className="heritage-catalogue-label">
                Collection Register
                <span>SC/ARCHIVE/PUBLIC</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="heritage-catalogue-panel mt-10 grid gap-4 p-5 lg:grid-cols-[1.3fr_1fr]">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.17em] text-[#62472e]">
                  Search the catalogue
                </span>

                <div className="mt-2 flex items-center gap-3 border border-[#795c3b]/30 bg-[#fffaf0]/70 px-4 py-3.5">
                  <Search className="shrink-0 text-[#7d1f2b]" size={19} />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Title, person, date or archive reference"
                    className="w-full bg-transparent text-base text-[#34261c] outline-none placeholder:text-[#5b4837]/45"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.17em] text-[#62472e]">
                  Collection category
                </span>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full border border-[#795c3b]/30 bg-[#fffaf0]/70 px-4 py-3.5 text-base text-[#34261c]"
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
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#67503a]">
              Catalogue results: {filteredRecords.length}{" "}
              {filteredRecords.length === 1 ? "record" : "records"}
            </p>

            {(query || category !== "All Records") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All Records");
                }}
                className="focus-ring border-b border-[#7d1f2b] pb-1 text-sm font-semibold text-[#7d1f2b]"
              >
                Clear catalogue filters
              </button>
            )}
          </div>

          {filteredRecords.length > 0 ? (
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecords.map((record, index) => {
                const Icon = recordIcons[record.category] ?? BookOpen;

                return (
                  <Reveal key={record.id} delay={index * 0.035}>
                    <article className="heritage-record-card flex h-full flex-col">
                      <div className="heritage-record-header">
                        <div className="flex items-start justify-between gap-4">
                          <div className="grid h-12 w-12 place-items-center border border-[#d0af66]/50 bg-[#d0af66]/15 text-[#e2c781]">
                            <Icon size={23} />
                          </div>

                          <span className="font-mono text-[11px] uppercase tracking-[0.13em] text-[#e8d8b4]/55">
                            {record.reference}
                          </span>
                        </div>

                        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#d0af66]">
                          {record.category}
                        </p>

                        <h3 className="heritage-serif mt-2 text-3xl leading-9 text-[#f6ead0]">
                          {record.title}
                        </h3>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.12em] text-[#f6ead0]/45">
                          <span>{record.year}</span>
                          <span>{record.collection}</span>
                        </div>
                      </div>

                      <div className="heritage-record-body flex flex-1 flex-col">
                        <p className="leading-7 text-[#4e3b2c]">
                          {record.summary}
                        </p>

                        <div className="mt-6 border-l-2 border-[#b38a48] pl-4">
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#7d1f2b]">
                            Curatorial note
                          </p>

                          <p className="mt-2 text-sm leading-6 text-[#5d4937]">
                            {record.significance}
                          </p>
                        </div>

                        <div className="mt-auto pt-7">
                          <div className="border-t border-[#806342]/20 pt-5">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d1f2b]">
                                  Evidence type
                                </p>

                                <p className="mt-1 text-sm text-[#5d4937]">
                                  {record.evidenceType}
                                </p>
                              </div>

                              <ShieldCheck
                                className="shrink-0 text-[#8f6b37]"
                                size={25}
                              />
                            </div>

                            <p className="mt-4 bg-[#e9dcc0]/60 px-3 py-2.5 text-xs font-semibold leading-5 text-[#674b30]">
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
            <div className="heritage-paper mt-10 p-12 text-center">
              <Search className="mx-auto text-[#7d1f2b]" size={30} />

              <h3 className="heritage-serif mt-5 text-3xl text-[#34261c]">
                No matching archive records
              </h3>

              <p className="mt-3 text-[#5d4937]">
                Change the search term or collection category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        id="founding"
        className="heritage-dark-section scroll-mt-36 px-5 py-24 text-[#f6ead0] lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <div className="heritage-photo-frame">
              <div className="heritage-photo-placeholder">
                <Landmark size={44} />
                <p className="heritage-serif mt-5 text-3xl">
                  Historical photograph
                </p>
                <p className="mt-3 max-w-sm text-sm leading-6">
                  Approved foundation-era or early-campus photography will be
                  displayed here with its source and archive reference.
                </p>
              </div>

              <div className="heritage-photo-caption">
                <span>Collection: Founding Archive</span>
                <span>Image awaiting approval</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d0af66]">
                The Founding Story
              </p>

              <h2 className="heritage-serif mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                A school born from an educational and cultural vision.
              </h2>

              <div className="mt-8 border-l border-[#d0af66]/50 pl-6">
                <p className="heritage-serif text-2xl leading-9 text-[#ead9b8]">
                  Sripalee College’s founding history connects Wilmot A.
                  Perera, Rabindranath Tagore and a wider belief in education
                  enriched by creativity and culture.
                </p>
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                <div className="heritage-founding-fact">
                  <span>01</span>
                  <p>Founding vision</p>
                </div>

                <div className="heritage-founding-fact">
                  <span>02</span>
                  <p>Cultural learning</p>
                </div>

                <div className="heritage-founding-fact">
                  <span>03</span>
                  <p>Public service</p>
                </div>
              </div>

              <p className="mt-9 text-sm leading-7 text-[#f6ead0]/55">
                The final public narrative must remain connected with approved
                historical records. Unverified recollections should be
                identified separately as oral history.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="figures"
        className="scroll-mt-36 px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#7d1f2b]">
                Historical Figures
              </p>

              <h2 className="heritage-serif mt-3 text-4xl font-semibold text-[#34261c] md:text-6xl">
                Lives connected with the institution
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#5b4837]">
                Each profile is treated as an archival record with identified
                sources, historical context and publication controls.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 space-y-8">
            {heritageFigures.map((figure, index) => (
              <Reveal key={figure.name} delay={index * 0.05}>
                <article className="heritage-figure-card grid gap-0 lg:grid-cols-[0.36fr_0.64fr]">
                  <div className="heritage-figure-portrait">
                    <div className="heritage-portrait-medallion">
                      {figure.initials}
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em]">
                      Portrait pending
                    </p>

                    <p className="mt-2 text-center text-xs leading-5 opacity-60">
                      Approved historical image required
                    </p>
                  </div>

                  <div className="p-7 md:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7d1f2b]">
                          {figure.period}
                        </p>

                        <h3 className="heritage-serif mt-2 text-4xl text-[#34261c]">
                          {figure.name}
                        </h3>

                        <p className="mt-2 font-semibold text-[#765637]">
                          {figure.role}
                        </p>
                      </div>

                      <ScrollText className="text-[#a47c42]" size={31} />
                    </div>

                    <p className="mt-7 max-w-3xl text-lg leading-8 text-[#5d4937]">
                      {figure.summary}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {figure.focus.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 border border-[#806342]/15 bg-[#eadfc7]/45 p-3"
                        >
                          <CheckCircle2
                            className="mt-0.5 shrink-0 text-[#8d6935]"
                            size={17}
                          />

                          <p className="text-sm font-semibold text-[#4f3a29]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="mt-7 border-t border-[#806342]/20 pt-5 font-mono text-xs uppercase tracking-[0.1em] text-[#7d1f2b]">
                      {figure.publicationStatus}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="collections"
        className="heritage-collections-section scroll-mt-36 px-5 py-24 text-[#f6ead0] lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d0af66]">
                Museum Collections
              </p>

              <h2 className="heritage-serif mt-4 text-4xl font-semibold md:text-6xl">
                Different forms of evidence, preserved together
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#f6ead0]/60">
                Documents, photography, oral history and buildings require
                different forms of description, storage and access control.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px border border-[#d0af66]/20 bg-[#d0af66]/20 sm:grid-cols-2 lg:grid-cols-3">
            {archiveCollectionTypes.map((collection, index) => {
              const Icon = collectionIcons[collection.icon] ?? LibraryBig;

              return (
                <Reveal key={collection.title} delay={index * 0.04}>
                  <article className="heritage-collection-card h-full p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div className="grid h-12 w-12 place-items-center border border-[#d0af66]/40 text-[#d0af66]">
                        <Icon size={23} />
                      </div>

                      <span className="font-mono text-xs tracking-[0.18em] text-[#f6ead0]/30">
                        {collection.code}
                      </span>
                    </div>

                    <h3 className="heritage-serif mt-8 text-3xl">
                      {collection.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#f6ead0]/55">
                      {collection.description}
                    </p>

                    <div className="mt-7 h-px w-14 bg-[#d0af66]/50" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="preservation"
        className="scroll-mt-36 px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 border-b border-[#745737]/25 pb-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#7d1f2b]">
                  Preservation Workflow
                </p>

                <h2 className="heritage-serif mt-3 text-4xl font-semibold text-[#34261c] md:text-6xl">
                  From original object to trusted digital record
                </h2>
              </div>

              <p className="text-sm leading-7 text-[#5d4937]">
                Digitisation does not replace archival care. Every item should
                pass through assessment, description, verification, approval
                and long-term preservation.
              </p>
            </div>
          </Reveal>

          <div className="heritage-process-line relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {preservationProcess.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.035}>
                <article className="heritage-process-card relative h-full p-6">
                  <div className="heritage-process-number">{item.step}</div>

                  <Archive className="mt-7 text-[#9d743c]" size={24} />

                  <h3 className="heritage-serif mt-5 text-2xl text-[#34261c]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#5d4937]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border border-[#7b5a36]/25 bg-[#eadfc7]/55 p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#7d1f2b]" size={35} />

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#7d1f2b]">
                Curatorial and Publication Controls
              </p>

              <h2 className="heritage-serif mt-3 text-4xl text-[#34261c]">
                Heritage must remain accurate, respectful and traceable
              </h2>

              <p className="mt-5 leading-7 text-[#5d4937]">
                Historical value does not remove privacy, consent, copyright or
                information-security responsibilities.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {heritagePublishingRules.map((rule, index) => (
              <Reveal key={rule} delay={index * 0.03}>
                <div className="flex gap-4 border-b border-[#795c3b]/20 bg-[#fff9eb]/50 p-4">
                  <span className="heritage-serif text-xl text-[#7d1f2b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-[#584432]">{rule}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="heritage-final-cta px-5 py-20 text-[#f6ead0] lg:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#d0af66]">
                Continue the Story
              </p>

              <h2 className="heritage-serif mt-3 text-4xl font-semibold md:text-6xl">
                Discover the school behind the archive
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#f6ead0]/60">
                Explore the institutional profile, educational direction,
                leadership structure and school identity.
              </p>
            </div>

            <Link
              href="/about"
              className="focus-ring inline-flex items-center justify-center gap-2 border border-[#d0af66] bg-[#d0af66] px-6 py-3.5 font-semibold text-[#2f2117]"
            >
              Explore Our School
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}