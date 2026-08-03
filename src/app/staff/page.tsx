import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { StaffDirectorySections } from "@/components/staff/staff-directory-sections";

export const metadata: Metadata = {
  title: "Academic Staff",
  description:
    "Explore approved academic staff, departments, subjects and professional responsibilities at Sripalee College.",
};

export default function StaffPage() {
  return (
    <PageTransition>
      <main>
        <StaffDirectorySections />
      </main>
    </PageTransition>
  );
}