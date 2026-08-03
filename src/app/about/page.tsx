import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SchoolProfileSections } from "@/components/school/school-profile-sections";

export const metadata: Metadata = {
  title: "Our School",
  description:
    "Explore the verified history, identity, leadership, traditions and campus of Sripalee College, Horana.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <SchoolProfileSections />
      </main>
    </PageTransition>
  );
}