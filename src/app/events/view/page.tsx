import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PublicContentReader } from "@/components/public/public-content-reader";

export const metadata: Metadata = {
  title: "Event Details",
  description:
    "View official Sripalee College event information.",
};

export default function EventReaderPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <PublicContentReader
          expectedType="EVENT"
          backHref="/events"
          backLabel="Back to events"
        />
      </main>
    </PageTransition>
  );
}