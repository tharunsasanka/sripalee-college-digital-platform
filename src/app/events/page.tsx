import type { Metadata } from "next";
import { EventsSections } from "@/components/events/events-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Events and Calendar",
  description:
    "Explore academic, sporting, cultural, administrative and school-community events at Sripalee College.",
};

export default function EventsPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <EventsSections />
      </main>
    </PageTransition>
  );
}