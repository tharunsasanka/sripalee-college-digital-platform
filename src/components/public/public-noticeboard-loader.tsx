"use client";

import {
  useEffect,
  useState,
} from "react";
import { Megaphone } from "lucide-react";
import { NoticeboardSections } from "@/components/noticeboard/noticeboard-sections";
import {
  listPublicContent,
  mapPublicNotice,
} from "@/lib/public-content";
import type { NoticeboardSlide } from "@/lib/noticeboard-data";

export function PublicNoticeboardLoader() {
  const [slides, setSlides] =
    useState<NoticeboardSlide[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadNotices() {
      try {
        const content =
          await listPublicContent(
            "NOTICE",
            50,
          );

        if (!active) {
          return;
        }

        setSlides(
          content.map(mapPublicNotice),
        );
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Published notices are temporarily unavailable.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadNotices();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-5 py-20">
        <p className="text-sm font-semibold text-[#741f2b]">
          Loading the digital noticeboard…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <Megaphone
          className="text-[#741f2b]"
          size={36}
        />

        <h1 className="mt-5 text-3xl font-semibold text-[#4e111b]">
          Noticeboard unavailable
        </h1>

        <p className="mt-4 text-black/60">
          {error}
        </p>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <Megaphone
          className="text-[#741f2b]"
          size={36}
        />

        <h1 className="mt-5 text-3xl font-semibold text-[#4e111b]">
          No published notices
        </h1>

        <p className="mt-4 text-black/60">
          Approved school notices will appear here after publication.
        </p>
      </section>
    );
  }

  return (
    <NoticeboardSections
      slides={slides}
    />
  );
}