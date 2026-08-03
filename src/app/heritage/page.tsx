import type { Metadata } from "next";
import { HeritageSections } from "@/components/heritage/heritage-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Digital Heritage Archive",
  description:
    "Explore the historical records, people, buildings, photographs, documents and traditions of Sripalee College.",
};

export default function HeritagePage() {
  return (
    <PageTransition>
      <main>
        <HeritageSections />
      </main>
    </PageTransition>
  );
}