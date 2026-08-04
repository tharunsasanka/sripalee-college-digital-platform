"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Newspaper,
  Star,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  createContentExcerpt,
  listPublicContent,
  type PublicContentEntry,
} from "@/lib/public-content";

interface HomeContentState {
  news: PublicContentEntry[];
  notices: PublicContentEntry[];
  events: PublicContentEntry[];
}

const emptyContent: HomeContentState = {
  news: [],
  notices: [],
  events: [],
};

function parseDate(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

function formatDate(
  value: string | null,
) {
  const date = parseDate(value);

  if (!date) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-LK",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function getEventDay(
  value: string | null,
) {
  const date = parseDate(value);

  return date
    ? new Intl.DateTimeFormat(
        "en-LK",
        {
          day: "2-digit",
        },
      ).format(date)
    : "--";
}

function getEventMonth(
  value: string | null,
) {
  const date = parseDate(value);

  return date
    ? new Intl.DateTimeFormat(
        "en-LK",
        {
          month: "short",
        },
      )
        .format(date)
        .toUpperCase()
    : "TBC";
}

function formatEventMeta(
  entry: PublicContentEntry,
) {
  const start =
    parseDate(entry.eventStartAt);

  const time = start
    ? new Intl.DateTimeFormat(
        "en-LK",
        {
          hour: "numeric",
          minute: "2-digit",
        },
      ).format(start)
    : "Time to be confirmed";

  return `${time} · ${
    entry.eventLocation ??
    "Sripalee College"
  }`;
}

function selectUpcomingEvents(
  entries: PublicContentEntry[],
) {
  const now = new Date();

  now.setHours(0, 0, 0, 0);

  return entries
    .filter((entry) => {
      const start =
        parseDate(entry.eventStartAt);

      return (
        !start ||
        start.getTime() >= now.getTime()
      );
    })
    .sort((first, second) => {
      const firstDate =
        parseDate(first.eventStartAt);

      const secondDate =
        parseDate(second.eventStartAt);

      if (!firstDate && !secondDate) {
        return 0;
      }

      if (!firstDate) {
        return 1;
      }

      if (!secondDate) {
        return -1;
      }

      return (
        firstDate.getTime() -
        secondDate.getTime()
      );
    })
    .slice(0, 3);
}

export function HomeLiveContent() {
  const [content, setContent] =
    useState<HomeContentState>(
      emptyContent,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadHomepageContent() {
      try {
        const [
          news,
          notices,
          events,
        ] = await Promise.all([
          listPublicContent(
            "NEWS",
            6,
          ),
          listPublicContent(
            "NOTICE",
            6,
          ),
          listPublicContent(
            "EVENT",
            12,
          ),
        ]);

        if (!active) {
          return;
        }

        setContent({
          news: news.slice(0, 3),
          notices:
            notices.slice(0, 3),
          events:
            selectUpcomingEvents(
              events,
            ),
        });

        setError("");
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Published school updates are temporarily unavailable.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadHomepageContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Stay Informed"
          title="Latest news, notices and upcoming events"
          description="Official information published through the authorised Sripalee College administration portal."
        />
      </Reveal>

      {loading ? (
        <div
          className="mt-12 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-10 text-center"
          aria-live="polite"
        >
          <p className="font-semibold text-[#741f2b]">
            Loading official school updates…
          </p>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="mt-12 rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center text-red-900"
        >
          {error}
        </div>
      ) : (
        <div className="mt-12 space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="h-full rounded-[2rem] border border-black/10 bg-white p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#741f2b]">
                      Latest News
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                      Stories from the school
                    </h3>
                  </div>

                  <Newspaper className="shrink-0 text-[#741f2b]" />
                </div>

                {content.news.length > 0 ? (
                  <div className="mt-7 divide-y divide-black/10">
                    {content.news.map(
                      (entry) => (
                        <article
                          key={entry.id}
                          className="py-5 first:pt-0 last:pb-0"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#741f2b]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#741f2b]">
                              School News
                            </span>

                            {entry.featured ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#c9a227]/20 px-3 py-1.5 text-xs font-semibold text-[#4e111b]">
                                <Star size={13} />
                                Featured
                              </span>
                            ) : null}
                          </div>

                          <h4 className="mt-3 text-lg font-semibold text-[#4e111b]">
                            {entry.title}
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-black/60">
                            {createContentExcerpt(
                              entry,
                              150,
                            )}
                          </p>

                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-black/45">
                            {formatDate(
                              entry.publishedAt,
                            )}
                          </p>
                        </article>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="mt-7 rounded-2xl bg-[#faf7ef] p-6 text-sm leading-6 text-black/60">
                    No official news has been published yet.
                  </p>
                )}

                <Link
                  href="/news"
                  className="focus-ring mt-7 inline-flex items-center gap-2 font-semibold text-[#741f2b]"
                >
                  View all news
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="h-full rounded-[2rem] border border-black/10 bg-[#faf7ef] p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#741f2b]">
                      Latest Notices
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold text-[#4e111b]">
                      Official information centre
                    </h3>
                  </div>

                  <FileText className="shrink-0 text-[#741f2b]" />
                </div>

                {content.notices.length > 0 ? (
                  <div className="mt-7 divide-y divide-black/10">
                    {content.notices.map(
                      (entry) => (
                        <article
                          key={entry.id}
                          className="py-5 first:pt-0 last:pb-0"
                        >
                          <span className="rounded-full bg-[#741f2b]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#741f2b]">
                            {entry.featured
                              ? "Important Notice"
                              : "School Notice"}
                          </span>

                          <h4 className="mt-3 text-lg font-semibold text-[#4e111b]">
                            {entry.title}
                          </h4>

                          <p className="mt-2 text-sm text-black/60">
                            {formatDate(
                              entry.publishedAt,
                            )}
                          </p>
                        </article>
                      ),
                    )}
                  </div>
                ) : (
                  <p className="mt-7 rounded-2xl bg-white p-6 text-sm leading-6 text-black/60">
                    No official notices have been published yet.
                  </p>
                )}

                <Link
                  href="/noticeboard"
                  className="focus-ring mt-7 inline-flex items-center gap-2 font-semibold text-[#741f2b]"
                >
                  Open digital noticeboard
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-[#4e111b] p-6 text-white md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e8c85e]">
                    Upcoming Events
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold">
                    School calendar preview
                  </h3>
                </div>

                <CalendarDays className="text-[#e8c85e]" />
              </div>

              {content.events.length > 0 ? (
                <div className="mt-7 grid gap-4 lg:grid-cols-3">
                  {content.events.map(
                    (entry) => (
                      <article
                        key={entry.id}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#c9a227] text-center text-[#4e111b]">
                          <div>
                            <p className="text-lg font-bold leading-none">
                              {getEventDay(
                                entry.eventStartAt,
                              )}
                            </p>

                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em]">
                              {getEventMonth(
                                entry.eventStartAt,
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-semibold">
                            {entry.title}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-white/60">
                            {formatEventMeta(
                              entry,
                            )}
                          </p>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-6 text-white/65">
                  No upcoming events have been published yet.
                </p>
              )}

              <Link
                href="/events"
                className="focus-ring mt-7 inline-flex items-center gap-2 font-semibold text-[#e8c85e]"
              >
                View complete event calendar
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}