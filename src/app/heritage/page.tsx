import type { Metadata } from "next";
import { HeritageSections } from "@/components/heritage/heritage-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Digital Heritage Archive",
  description:
    "Explore the history, people, buildings, documents, photographs and traditions of Sripalee College.",
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