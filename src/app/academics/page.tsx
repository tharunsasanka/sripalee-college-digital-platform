import type { Metadata } from "next";
import { AcademicsSections } from "@/components/academics/academics-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore academic stages, departments, subject pathways, examinations and learning resources at Sripalee College.",
};

export default function AcademicsPage() {
  return (
    <PageTransition>
      <main>
        <AcademicsSections />
      </main>
    </PageTransition>
  );
}