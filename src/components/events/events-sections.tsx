"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Flag,
  GraduationCap,
  MapPin,
  Palette,
  Search,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  calendarViews,
  eventAudiences,
  eventCategories,
  eventFacts,
  eventMonths,
  eventPublishingRules,
  eventWorkflow,
  schoolEvents,
  type EventStatus,
} from "@/lib/events-data";

const eventIcons: Record<string, LucideIcon> = {
  Academic: BookOpen,
  Examination: GraduationCap,
  Sports: Trophy,
  "Arts and Culture": Palette,
  "School Community": UsersRound,
  Administration: ClipboardCheck,
  Commemorations: Flag,
};

const statusStyles: Record<
  EventStatus,
  {
    label: string;
    badge: string;
    border: string;
  }
> = {
  upcoming: {
    label: "Upcoming",
    badge: "bg-blue-100 text-blue-800",
    border: "border-blue-200",
  },
  registration: {
    label: "Registration",
    badge: "bg-amber-100 text-amber-800",
    border: "border-amber-300",
  },
  completed: {
    label: "Completed",
    badge: "bg-emerald-100 text-emerald-800",
    border: "border-emerald-200",
  },
  postponed: {
    label: "Postponed",
    badge: "bg-red-100 text-red-800",
    border: "border-red-300",
  },
};

const sectionLinks = [
  {
    href: "featured",
    label: "Featured events",
  },
  {
    href: "calendar",
    label: "Event calendar",
  },
  {
    href: "views",
    label: "Calendar access",
  },
  {
    href: "workflow",
    label: "Event workflow",
  },
  {
    href: "controls",
    label: "Controls",
  },
];

export function EventsSections() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [audience, setAudience] = useState("All Audiences");
  const [month, setMonth] = useState("All Months");

  const featuredEvents = schoolEvents.filter((event) => event.featured);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredEvents = schoolEvents.filter((event) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.category.toLowerCase().includes(normalizedQuery) ||
      event.audience.toLowerCase().includes(normalizedQuery) ||
      event.venue.toLowerCase().includes(normalizedQuery) ||
      event.summary.toLowerCase().includes(normalizedQuery) ||
      event.details.some((detail) =>
        detail.toLowerCase().includes(normalizedQuery),
      );

    const matchesCategory =
      category === "All Categories" || event.category === category;

    const matchesAudience =
      audience === "All Audiences" || event.audience === audience;

    const matchesMonth = month === "All Months" || event.month === month;

    return matchesQuery && matchesCategory && matchesAudience && matchesMonth;
  });

  const filtersActive =
    query.length > 0 ||
    category !== "All Categories" ||
    audience !== "All Audiences" ||
    month !== "All Months";

  const clearFilters = () => {
    setQuery("");
    setCategory("All Categories");
    setAudience("All Audiences");
    setMonth("All Months");
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
                Events and Calendar
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Important dates and activities in one clear calendar.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Explore approved academic, sporting, cultural, administrative
                and community events organised by Sripalee College.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#calendar"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Browse calendar
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/news"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  News and notices
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
                      Calendar overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Public and protected event information
                    </h2>
                  </div>

                  <CalendarDays className="text-[#e8c85e]" size={31} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {eventFacts.map((fact) => (
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
                  The displayed event records are development examples and must
                  be replaced with approved school information.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Events page sections"
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
            eyebrow="Featured Events"
            title="Upcoming activities for the school community"
            description="Featured events remain prominent until they are completed, postponed or replaced by authorised organisers."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredEvents.map((event, index) => {
            const Icon = eventIcons[event.category] ?? CalendarDays;
            const style = statusStyles[event.status];

            return (
              <Reveal key={event.id} delay={index * 0.05}>
                <article
                  className={`card-3d flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white ${style.border}`}
                >
                  <div className="bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-7 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                        <Icon size={25} />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
                      >
                        {style.label}
                      </span>
                    </div>

                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c85e]">
                      {event.category}
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      {event.title}
                    </h2>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className="leading-7 text-black/65">{event.summary}</p>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <CalendarDays
                          className="mt-0.5 shrink-0 text-[#741f2b]"
                          size={19}
                        />

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Date
                          </p>

                          <p className="mt-1 text-sm text-black/60">
                            {event.month} · {event.dateLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock3
                          className="mt-0.5 shrink-0 text-[#741f2b]"
                          size={19}
                        />

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Time
                          </p>

                          <p className="mt-1 text-sm text-black/60">
                            {event.timeLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin
                          className="mt-0.5 shrink-0 text-[#741f2b]"
                          size={19}
                        />

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Venue
                          </p>

                          <p className="mt-1 text-sm text-black/60">
                            {event.venue}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-7">
                      <p className="rounded-2xl bg-[#faf7ef] p-4 text-sm font-semibold leading-6 text-[#741f2b]">
                        {event.approvalStatus}
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
        id="calendar"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="School Calendar"
              title="Search events by category, month and audience"
              description="Approved dates, venues, registrations and event updates will be managed through the administration dashboard."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 grid gap-4 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-5 md:grid-cols-2 xl:grid-cols-4">
              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Search events
                </span>

                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 bg-white px-4 py-3">
                  <Search className="shrink-0 text-[#741f2b]" size={19} />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Event, venue or keyword"
                    className="w-full bg-transparent text-base outline-none placeholder:text-black/55"
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
                  {eventCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#4e111b]">
                  Month
                </span>

                <select
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
                >
                  {eventMonths.map((item) => (
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
                  {eventAudiences.map((item) => (
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
              Showing {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"}.
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

          {filteredEvents.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {filteredEvents.map((event, index) => {
                const Icon = eventIcons[event.category] ?? CalendarDays;
                const style = statusStyles[event.status];

                return (
                  <Reveal key={event.id} delay={index * 0.035}>
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
                              {event.category}
                            </p>

                            <p className="mt-1 text-sm text-black/60">
                              {event.audience}
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
                        {event.title}
                      </h2>

                      <p className="mt-4 leading-7 text-black/65">
                        {event.summary}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <CalendarDays
                            className="text-[#741f2b]"
                            size={18}
                          />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Date
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {event.month}
                            <br />
                            {event.dateLabel}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <Clock3 className="text-[#741f2b]" size={18} />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Time
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {event.timeLabel}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#faf7ef] p-4">
                          <MapPin className="text-[#741f2b]" size={18} />

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#741f2b]">
                            Venue
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {event.venue}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {event.details.map((detail) => (
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
                        <div className="rounded-2xl border border-black/10 bg-[#faf7ef] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                            Participation
                          </p>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {event.registrationStatus}
                          </p>
                        </div>
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
                No matching events
              </h2>

              <p className="mt-3 text-black/55">
                Change the search term, category, month or audience.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring mt-6 rounded-full bg-[#741f2b] px-5 py-3 text-sm font-semibold text-white"
              >
                Reset calendar
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        id="views"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Calendar Access"
            title="Different users receive different event information"
            description="Public events remain separate from private class schedules, student activities and internal staff calendars."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {calendarViews.map((view, index) => (
            <Reveal key={view.title} delay={index * 0.05}>
              <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                  {index === 0 && <CalendarDays size={22} />}
                  {index === 1 && <GraduationCap size={22} />}
                  {index === 2 && <UsersRound size={22} />}
                  {index === 3 && <ClipboardCheck size={22} />}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                  {view.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-black/60">
                  {view.description}
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
                Event Workflow
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Every published event follows an approval process
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Dates, venues, participation requirements and public
                instructions should be reviewed before becoming visible.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {eventWorkflow.map((item, index) => (
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
        id="controls"
        className="scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={34} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Calendar Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Accurate schedules, secure participation and visible updates
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                Event publication should protect student information while
                keeping the school community informed of important changes.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {eventPublishingRules.map((rule, index) => (
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
                Important Updates
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Check announcements before attending an event
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Postponements, venue changes and urgent instructions will be
                published through the News and Notices section.
              </p>
            </div>

            <Link
              href="/news"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
            >
              View notices
              <BellRing size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}