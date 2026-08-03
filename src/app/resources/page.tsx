import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { ResourcesSections } from "@/components/resources/resources-sections";

export const metadata: Metadata = {
  title: "Resources and Downloads",
  description:
    "Browse approved calendars, forms, policies, circulars, examination files and learning resources from Sripalee College.",
};

export default function ResourcesPage() {
  return (
    <PageTransition>
      <main>
        <ResourcesSections />
      </main>
    </PageTransition>
  );
}