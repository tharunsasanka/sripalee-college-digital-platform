import type { Metadata } from "next";
import { AdmissionsSections } from "@/components/admissions/admissions-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Admissions and Registration",
  description:
    "Review admission pathways, application guidance, document requirements and student-registration information for Sripalee College.",
};

export default function AdmissionsPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <AdmissionsSections />
      </main>
    </PageTransition>
  );
}