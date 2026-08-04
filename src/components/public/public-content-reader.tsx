"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  Newspaper,
  UserRound,
} from "lucide-react";
import {
  getPublicContentBySlug,
  type PublicContentEntry,
  type PublicContentType,
} from "@/lib/public-content";

interface PublicContentReaderProps {
  expectedType: PublicContentType;
  backHref: string;
  backLabel: string;
}

function formatDateTime(
  value: string | null,
) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not specified";
  }

  return new Intl.DateTimeFormat(
    "en-LK",
    {
      dateStyle: "long",
      timeStyle: "short",
    },
  ).format(date);
}

function getTypeLabel(
  type: PublicContentType,
) {
  if (type === "NEWS") {
    return "School News";
  }

  if (type === "NOTICE") {
    return "Official Notice";
  }

  return "School Event";
}

interface ContentTypeIconProps {
  type: PublicContentType;
}

function ContentTypeIcon({
  type,
}: ContentTypeIconProps) {
  if (type === "NEWS") {
    return <Newspaper size={25} />;
  }

  if (type === "NOTICE") {
    return <FileText size={25} />;
  }

  return <CalendarDays size={25} />;
}

export function PublicContentReader({
  expectedType,
  backHref,
  backLabel,
}: PublicContentReaderProps) {
  const [entry, setEntry] =
    useState<PublicContentEntry | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadContent() {
      const slug =
        new URLSearchParams(
          window.location.search,
        )
          .get("slug")
          ?.trim();

      if (!slug) {
        setError(
          "No content identifier was provided.",
        );
        setLoading(false);
        return;
      }

      try {
        const result =
          await getPublicContentBySlug(
            slug,
          );

        if (!active) {
          return;
        }

        if (
          result.type !== expectedType
        ) {
          setError(
            "The requested content was not found in this section.",
          );
          return;
        }

        setEntry(result);
      } catch {
        if (!active) {
          return;
        }

        setError(
          "The requested content is unavailable or is no longer published.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      active = false;
    };
  }, [expectedType]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center px-5 py-20">
        <p className="font-semibold text-[#741f2b]">
          Loading published contentâ€¦
        </p>
      </section>
    );
  }

  if (!entry) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <FileText
          className="text-[#741f2b]"
          size={38}
        />

        <h1 className="mt-5 text-3xl font-semibold text-[#4e111b]">
          Content unavailable
        </h1>

        <p className="mt-4 text-black/60">
          {error}
        </p>

        <Link
          href={backHref}
          className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-[#741f2b] px-5 py-3 font-semibold text-white"
        >
          <ArrowLeft size={18} />
          {backLabel}
        </Link>
      </section>
    );
  }
  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            href={backHref}
            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[#e8c85e]"
          >
            <ArrowLeft size={17} />
            {backLabel}
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
              <ContentTypeIcon type={entry.type} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                {getTypeLabel(entry.type)}
              </p>

              {entry.featured ? (
                <p className="mt-1 text-sm text-white/60">
                  Featured publication
                </p>
              ) : null}
            </div>
          </div>

          <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            {entry.title}
          </h1>

          {entry.summary ? (
            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/70 md:text-xl">
              {entry.summary}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <article className="rounded-[2rem] border border-black/10 bg-white p-6 md:p-10">
            <div className="whitespace-pre-line text-base leading-8 text-black/70 md:text-lg">
              {entry.body}
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-[#faf7ef] p-5">
              <CalendarDays
                className="text-[#741f2b]"
                size={21}
              />

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                Published
              </p>

              <p className="mt-2 text-sm leading-6 text-black/65">
                {formatDateTime(
                  entry.publishedAt,
                )}
              </p>
            </div>

            <div className="rounded-3xl bg-[#faf7ef] p-5">
              <UserRound
                className="text-[#741f2b]"
                size={21}
              />

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                Published by
              </p>

              <p className="mt-2 text-sm leading-6 text-black/65">
                {entry.createdBy.displayName}
              </p>
            </div>

            {entry.type === "EVENT" ? (
              <>
                <div className="rounded-3xl bg-[#4e111b] p-5 text-white">
                  <Clock3
                    className="text-[#e8c85e]"
                    size={21}
                  />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8c85e]">
                    Event time
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {formatDateTime(
                      entry.eventStartAt,
                    )}
                  </p>

                  {entry.eventEndAt ? (
                    <p className="mt-2 text-xs text-white/50">
                      Ends{" "}
                      {formatDateTime(
                        entry.eventEndAt,
                      )}
                    </p>
                  ) : null}
                </div>

                <div className="rounded-3xl bg-[#faf7ef] p-5">
                  <MapPin
                    className="text-[#741f2b]"
                    size={21}
                  />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                    Location
                  </p>

                  <p className="mt-2 text-sm leading-6 text-black/65">
                    {entry.eventLocation ??
                      "Sripalee College"}
                  </p>
                </div>
              </>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}