"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  CalendarDays,
  Newspaper,
  Star,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  createContentExcerpt,
  listPublicContent,
  type PublicContentEntry,
} from "@/lib/public-content";

function formatPublishedDate(
  value: string | null,
) {
  if (!value) {
    return "Publication date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Publication date unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-LK",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(date);
}

export function PublicNewsSections() {
  const [news, setNews] =
    useState<PublicContentEntry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadNews() {
      try {
        const content =
          await listPublicContent(
            "NEWS",
            50,
          );

        if (!active) {
          return;
        }

        setNews(content);
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Published news is temporarily unavailable.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadNews();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
            Sripalee College
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] md:text-7xl">
            News and announcements
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
            Read official school news published through the authorised administration portal.
          </p>
        </div>
      </section>

      <section className="mx-auto min-h-[50vh] max-w-7xl px-5 py-20 lg:px-8">
        {loading ? (
          <p className="rounded-[2rem] bg-[#faf7ef] p-10 text-center font-semibold text-[#741f2b]">
            Loading published newsâ€¦
          </p>
        ) : error ? (
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center">
            <Newspaper
              className="mx-auto text-red-700"
              size={34}
            />

            <h2 className="mt-5 text-2xl font-semibold text-red-900">
              News unavailable
            </h2>

            <p className="mt-3 text-red-800/70">
              {error}
            </p>
          </div>
        ) : news.length === 0 ? (
          <div className="rounded-[2rem] border border-black/10 bg-[#faf7ef] p-10 text-center">
            <Newspaper
              className="mx-auto text-[#741f2b]"
              size={34}
            />

            <h2 className="mt-5 text-2xl font-semibold text-[#4e111b]">
              No published news
            </h2>

            <p className="mt-3 text-black/60">
              Official school news will appear here after publication.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {news.map(
              (entry, index) => (
                <Reveal
                  key={entry.id}
                  delay={index * 0.04}
                >
                  <article className="card-3d flex h-full flex-col rounded-[2rem] border border-black/10 bg-white p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-[#741f2b]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#741f2b]">
                        School news
                      </span>

                      {entry.featured ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a227]/20 px-3 py-1.5 text-xs font-bold text-[#4e111b]">
                          <Star size={14} />
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold leading-tight text-[#4e111b]">
                      <Link
                        href={`/news/view?slug=${encodeURIComponent(entry.slug)}`}
                        className="focus-ring rounded-lg transition hover:text-[#741f2b]"
                      >
                        {entry.title}
                      </Link>
                    </h2>

                    <p className="mt-4 leading-7 text-black/65">
                      {createContentExcerpt(
                        entry,
                        300,
                      )}
                    </p>

                    <div className="mt-6 whitespace-pre-line rounded-2xl bg-[#faf7ef] p-5 text-sm leading-7 text-black/65">
                      {entry.body}
                    </div>

                    <div className="mt-auto flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-black/55 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays
                          size={17}
                        />
                        {formatPublishedDate(
                          entry.publishedAt,
                        )}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <UserRound size={17} />
                        {entry.createdBy.displayName}
                      </span>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        )}
      </section>
    </>
  );
}