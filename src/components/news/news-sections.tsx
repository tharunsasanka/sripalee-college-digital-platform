"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  Globe2,
  GraduationCap,
  Megaphone,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  multilingualRequirements,
  newsAudiences,
  newsCategories,
  newsFacts,
  newsNotices,
  newsPublishingRules,
  noticeChannels,
  publicationWorkflow,
  type NewsPriority,
} from "@/lib/news-data";

const priorityStyles: Record<
  NewsPriority,
  {
    label: string;
    badge: string;
    border: string;
    icon: string;
  }
> = {
  urgent: {
    label: "Urgent",
    badge: "bg-red-100 text-red-800",
    border: "border-red-300",
    icon: "text-red-700",
  },
  high: {
    label: "Important",
    badge: "bg-amber-100 text-amber-800",
    border: "border-amber-300",
    icon: "text-amber-700",
  },
  standard: {
    label: "Standard",
    badge: "bg-slate-100 text-slate-700",
    border: "border-black/10",
    icon: "text-[#741f2b]",
  },
};

const sectionLinks = [
  {
    href: "priority",
    label: "Priority notices",
  },
  {
    href: "directory",
    label: "All announcements",
  },
  {
    href: "workflow",
    label: "Publication workflow",
  },
  {
    href: "languages",
    label: "Languages",
  },
  {
    href: "channels",
    label: "Communication channels",
  },
  {
    href: "controls",
    label: "Controls",
  },
];

export function NewsSections() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [audience, setAudience] = useState("All Audiences");

  const priorityNotices = newsNotices.filter((notice) => notice.featured);

  const urgentNotice = priorityNotices.find(
    (notice) => notice.priority === "urgent",
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredNotices = newsNotices.filter((notice) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      notice.title.toLowerCase().includes(normalizedQuery) ||
      notice.category.toLowerCase().includes(normalizedQuery) ||
      notice.audience.toLowerCase().includes(normalizedQuery) ||
      notice.summary.toLowerCase().includes(normalizedQuery) ||
      notice.details.some((detail) =>
        detail.toLowerCase().includes(normalizedQuery),
      );

    const matchesCategory =
      category === "All Categories" || notice.category === category;

    const matchesAudience =
      audience === "All Audiences" || notice.audience === audience;

    return matchesQuery && matchesCategory && matchesAudience;
  });

  const filtersActive =
    query.length > 0 ||
    category !== "All Categories" ||
    audience !== "All Audiences";

  const clearFilters = () => {
    setQuery("");
    setCategory("All Categories");
    setAudience("All Audiences");
  };

  return (
    <>
      {urgentNotice && (
        <section className="border-b border-red-300 bg-red-700 px-5 py-3 text-white lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 shrink-0" size={20} />

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em]">
                  Emergency announcement demonstration
                </p>

                <p className="mt-1 text-sm text-white/80">
                  This development banner shows where authorised emergency
                  messages will appear.
                </p>
              </div>
            </div>

            <a
              href="#priority"
              className="focus-ring rounded-full border border-white/40 px-4 py-2 text-sm font-semibold"
            >
              View announcement
            </a>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-[#c9a227]/30" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
                News and Notices
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Timely information for the entire school community.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Find approved announcements, academic notices, examination
                information, events, achievements and important school
                updates.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#directory"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Browse announcements
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/events"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  School events
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
                      Communication overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Approved notices across multiple channels
                    </h2>
                  </div>

                  <BellRing className="text-[#e8c85e]" size={31} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {newsFacts.map((fact) => (
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
                  Current records are development examples and must be replaced
                  with authorised school announcements.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="News page sections"
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
        id="priority"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Priority Notices"
            title="Important information that should not be missed"
            description="Priority notices remain prominent until their approved expiry time or until an authorised officer replaces them."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {priorityNotices.map((notice, index) => {
            const style = priorityStyles[notice.priority];

            return (
              <Reveal key={notice.id} delay={index * 0.05}>
                <article
                  className={`card-3d flex h-full flex-col rounded-[2rem] border bg-white p-7 ${style.border}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl bg-[#faf7ef] ${style.icon}`}
                    >
                      {notice.priority === "urgent" ? (
                        <AlertTriangle size={24} />
                      ) : (
                        <Megaphone size={24} />
                      )}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    {notice.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                    {notice.title}
                  </h2>

                  <p className="mt-4 leading-7 text-black/65">
                    {notice.summary}
                  </p>

                  <div className="mt-6 space-y-3">
                    {notice.details.map((detail) => (
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
                        Approval
                      </p>

                      <p className="mt-2 text-sm leading-6 text-black/60">
                        {notice.approvalStatus}
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
              eyebrow="Announcements Directory"
              title="Search notices by category and audience"
              description="The final directory will support approved publication dates, expiry controls, attachments, translations and archived notices."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 grid gap-4 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-5 lg:grid-cols-[1.3fr_1fr_1fr]">
              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Search notices
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 bg-white px-4 py-3">
                  <Search className="shrink-0 text-[#741f2b]" size={19} />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Title, category, audience or keyword"
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
                  {newsCategories.map((item) => (
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
                  {newsAudiences.map((item) => (
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
              Showing {filteredNotices.length}{" "}
              {filteredNotices.length === 1 ? "notice" : "notices"}.
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

          {filteredNotices.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {filteredNotices.map((notice, index) => {
                const style = priorityStyles[notice.priority];

                return (
                  <Reveal key={notice.id} delay={index * 0.035}>
                    <article
                      className={`card-3d flex h-full flex-col rounded-[2rem] border bg-white p-7 ${style.border}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                            {notice.category}
                          </p>

                          <p className="mt-2 text-sm font-medium text-black/50">
                            Audience: {notice.audience}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
                        >
                          {style.label}
                        </span>
                      </div>

                      <h2 className="mt-5 text-2xl font-semibold text-[#4e111b]">
                        {notice.title}
                      </h2>

                      <p className="mt-4 leading-7 text-black/65">
                        {notice.summary}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              className="text-[#741f2b]"
                              size={18}
                            />

                            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                              Published
                            </p>
                          </div>

                          <p className="mt-2 text-sm text-black/60">
                            {notice.publishedDate}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <div className="flex items-center gap-2">
                            <ClipboardCheck
                              className="text-[#741f2b]"
                              size={18}
                            />

                            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                              Expiry
                            </p>
                          </div>

                          <p className="mt-2 text-sm text-black/60">
                            {notice.expiresDate}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {notice.languages.map((language) => (
                          <span
                            key={language}
                            className="rounded-full border border-[#741f2b]/15 bg-[#741f2b]/5 px-3 py-1.5 text-xs font-semibold text-[#741f2b]"
                          >
                            {language}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-7">
                        {notice.attachmentLabel ? (
                          <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-[#faf7ef] p-4">
                            <div className="flex items-center gap-3">
                              <FileText
                                className="shrink-0 text-[#741f2b]"
                                size={20}
                              />

                              <p className="text-sm font-semibold text-[#4e111b]">
                                {notice.attachmentLabel}
                              </p>
                            </div>

                            <Download
                              className="shrink-0 text-[#741f2b]"
                              size={19}
                            />
                          </div>
                        ) : (
                          <p className="rounded-2xl bg-[#faf7ef] p-4 text-sm font-semibold text-[#741f2b]">
                            {notice.approvalStatus}
                          </p>
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
                No matching notices
              </h2>

              <p className="mt-3 text-black/55">
                Change the search term, category or audience.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring mt-6 rounded-full bg-[#741f2b] px-5 py-3 text-sm font-semibold text-white"
              >
                Reset search
              </button>
            </div>
          )}
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
                Publication Workflow
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Notices move from draft to approved publication
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Editors should not be able to publish important school
                information without an appropriate review and approval step.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {publicationWorkflow.map((item, index) => (
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
        id="languages"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Multilingual Communication"
            title="Important information should reach every intended audience"
            description="Translations must preserve dates, times, locations, safety instructions and the original meaning of each approved notice."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {multilingualRequirements.map((language, index) => (
            <Reveal key={language.title} delay={index * 0.05}>
              <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b] text-white">
                  <Globe2 size={25} />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                  Language {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                  {language.title}
                </h3>

                <p className="mt-4 leading-7 text-black/60">
                  {language.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="channels"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Communication Channels"
              title="Different messages belong in different systems"
              description="Public announcements, private student communication and restricted staff information must remain clearly separated."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {noticeChannels.map((channel, index) => (
              <Reveal key={channel.title} delay={index * 0.05}>
                <article className="card-3d h-full rounded-3xl border border-black/10 bg-[#faf7ef] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    {index === 0 && <Globe2 size={22} />}
                    {index === 1 && <Megaphone size={22} />}
                    {index === 2 && <GraduationCap size={22} />}
                    {index === 3 && <UsersRound size={22} />}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                    {channel.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-black/60">
                    {channel.description}
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
                Publication Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Accurate information, controlled access and complete history
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                Notice publishing should protect private information while
                preserving accountability for every public update.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {newsPublishingRules.map((rule, index) => (
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
                School Calendar
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                View approved dates and upcoming school activities
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                The Events section will organise academic, sporting, cultural
                and administrative activities in one calendar.
              </p>
            </div>

            <Link
              href="/events"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
            >
              View events
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}