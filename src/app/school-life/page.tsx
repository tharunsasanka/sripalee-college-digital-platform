import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SchoolLifeSections } from "@/components/school-life/school-life-sections";

export const metadata: Metadata = {
  title: "School Life",
  description:
    "Explore clubs, sports, student leadership, cultural activities, achievements and student life at Sripalee College.",
};

export default function SchoolLifePage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <SchoolLifeSections />
      </main>
    </PageTransition>
  );
}