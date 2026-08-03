"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  HeartPulse,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  achievementCategories,
  activityCategories,
  participationProcess,
  schoolLifeActivities,
  schoolLifeFacts,
  schoolLifePublishingRules,
  studentLeadershipRoles,
} from "@/lib/school-life-data";

const activityIcons: Record<string, LucideIcon> = {
  "Academic Clubs": BookOpen,
  Sports: Activity,
  "Arts and Culture": Palette,
  "Community Service": HeartHandshake,
  "Student Leadership": UsersRound,
  "Media and Technology": Megaphone,
  Competitions: Trophy,
  "Health and Wellbeing": HeartPulse,
};

const sectionLinks = [
  {
    href: "activities",
    label: "Activities",
  },
  {
    href: "leadership",
    label: "Leadership",
  },
  {
    href: "achievements",
    label: "Achievements",
  },
  {
    href: "participation",
    label: "Participation",
  },
  {
    href: "safety",
    label: "Safety",
  },
];

export function SchoolLifeSections() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Activities");

  const filteredActivities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return schoolLifeActivities.filter((activity) => {
      const matchesCategory =
        category === "All Activities" || activity.category === category;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        activity.title.toLowerCase().includes(normalizedQuery) ||
        activity.category.toLowerCase().includes(normalizedQuery) ||
        activity.summary.toLowerCase().includes(normalizedQuery) ||
        activity.highlights.some((highlight) =>
          highlight.toLowerCase().includes(normalizedQuery),
        );

      return matchesCategory && matchesSearch;
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
                School Life
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Learning, leadership, creativity and service beyond the
                classroom.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Explore the proposed structure for clubs, sports, societies,
                student leadership, achievements, cultural activities and
                community participation.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#activities"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Explore activities
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/events"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Upcoming events
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
                      Student experience
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Participation with safety and responsibility
                    </h2>
                  </div>

                  <Sparkles className="text-[#e8c85e]" size={31} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {schoolLifeFacts.map((fact) => (
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
                  All activity names, teacher assignments and achievements must
                  be verified before official publication.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="School Life page sections"
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
        id="activities"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Activities and Societies"
            title="Discover opportunities beyond regular lessons"
            description="The final directory will contain only activities officially offered by the school, together with approved schedules and teacher supervision."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-4 rounded-[2rem] border border-black/10 bg-white p-5 lg:grid-cols-[1.3fr_1fr]">
            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Search activities
              </span>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-black/15 px-4 py-3">
                <Search className="shrink-0 text-[#741f2b]" size={19} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search clubs, sports or activities"
                  className="w-full bg-transparent text-base outline-none placeholder:text-black/35"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#4e111b]">
                Activity category
              </span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-base"
              >
                {activityCategories.map((item) => (
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
            Showing {filteredActivities.length} proposed activit
            {filteredActivities.length === 1 ? "y" : "ies"}.
          </p>

          {(query || category !== "All Activities") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All Activities");
              }}
              className="focus-ring rounded-full border border-[#741f2b]/20 px-4 py-2 text-sm font-semibold text-[#741f2b]"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredActivities.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filteredActivities.map((activity, index) => {
              const Icon = activityIcons[activity.category] ?? BookOpen;

              return (
                <Reveal key={activity.id} delay={index * 0.04}>
                  <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b] text-white">
                        <Icon size={25} />
                      </div>

                      <span className="rounded-full bg-[#c9a227]/20 px-3 py-1.5 text-xs font-semibold text-[#4e111b]">
                        {activity.category}
                      </span>
                    </div>

                    <h2 className="mt-7 text-2xl font-semibold text-[#4e111b]">
                      {activity.title}
                    </h2>

                    <p className="mt-4 leading-7 text-black/[0.65]">
                      {activity.summary}
                    </p>

                    <div className="mt-6 space-y-3">
                      {activity.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 shrink-0 text-[#c9a227]"
                            size={18}
                          />

                          <p className="text-sm leading-6 text-black/60">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="mt-7 rounded-2xl bg-[#faf7ef] p-4 text-sm font-semibold text-[#741f2b]">
                      {activity.status}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-black/20 bg-white p-12 text-center">
            <Search className="mx-auto text-[#741f2b]" size={30} />

            <h2 className="mt-5 text-2xl font-semibold text-[#4e111b]">
              No matching activities
            </h2>

            <p className="mt-3 text-black/55">
              Change the search term or activity category.
            </p>
          </div>
        )}
      </section>

      <section
        id="leadership"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Student Leadership"
              title="Developing responsibility through service"
              description="Leadership roles should operate under clear staff supervision, defined responsibilities and approved appointment processes."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studentLeadershipRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 0.05}>
                <article className="card-3d h-full rounded-3xl border border-black/10 bg-[#faf7ef] p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <UsersRound size={22} />
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    Leadership {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-[#4e111b]">
                    {role.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-black/60">
                    {role.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="achievements"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Achievements
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Celebrating verified student and school success
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/[0.65]">
                Every achievement should include an approved title, date,
                category, level, result and supporting evidence.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {achievementCategories.map((achievement, index) => (
              <Reveal key={achievement.title} delay={index * 0.05}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                    <Award size={23} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {achievement.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {achievement.description}
                  </p>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#e8c85e]">
                    Verified records required
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="participation"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Participation Process"
            title="A clear path from interest to approved participation"
            description="The future portal may support controlled activity registration while keeping student information private."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {participationProcess.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.04}>
              <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-3xl font-semibold text-[#741f2b]">
                    {item.step}
                  </p>

                  <CalendarDays className="text-[#c9a227]" size={23} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#4e111b]">
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
        id="safety"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={34} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Safety and Publication Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Protecting students while sharing school life
              </h2>

              <p className="mt-5 leading-7 text-black/[0.65]">
                Public activity content must balance school communication with
                student privacy, consent, accuracy and responsible
                supervision.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {schoolLifePublishingRules.map((rule, index) => (
              <Reveal key={rule} delay={index * 0.035}>
                <div className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#741f2b] text-xs font-semibold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-black/[0.65]">
                    {rule}
                  </p>
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
                School Calendar
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Discover upcoming school events and activities
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/[0.65]">
                Approved event dates, locations, notices and participation
                information will be published through the events section.
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