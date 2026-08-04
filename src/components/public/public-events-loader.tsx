"use client";

import {
  useEffect,
  useState,
} from "react";
import { CalendarDays } from "lucide-react";
import { EventsSections } from "@/components/events/events-sections";
import {
  listPublicContent,
  mapPublicEvent,
} from "@/lib/public-content";
import type { SchoolEvent } from "@/lib/events-data";

export function PublicEventsLoader() {
  const [events, setEvents] =
    useState<SchoolEvent[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        const content =
          await listPublicContent(
            "EVENT",
            50,
          );

        if (!active) {
          return;
        }

        setEvents(
          content.map(mapPublicEvent),
        );
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Published events are temporarily unavailable.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-5 py-20">
        <p className="text-sm font-semibold text-[#741f2b]">
          Loading published events…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <CalendarDays
          className="text-[#741f2b]"
          size={36}
        />

        <h1 className="mt-5 text-3xl font-semibold text-[#4e111b]">
          Events unavailable
        </h1>

        <p className="mt-4 text-black/60">
          {error}
        </p>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
        <CalendarDays
          className="text-[#741f2b]"
          size={36}
        />

        <h1 className="mt-5 text-3xl font-semibold text-[#4e111b]">
          No published events
        </h1>

        <p className="mt-4 text-black/60">
          Approved school events will appear here after publication.
        </p>
      </section>
    );
  }

  return <EventsSections events={events} />;
}