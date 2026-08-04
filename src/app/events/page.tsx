import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PublicEventsLoader } from "@/components/public/public-events-loader";

export const metadata: Metadata = {
  title: "Events and Calendar",
  description:
    "Explore approved events published by Sripalee College.",
};

export default function EventsPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <PublicEventsLoader />
      </main>
    </PageTransition>
  );
}