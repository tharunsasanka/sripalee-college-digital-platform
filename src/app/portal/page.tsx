import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PortalSections } from "@/components/portal/portal-sections";

export const metadata: Metadata = {
  title: "Student, Parent and Staff Portal",
  description:
    "Access protected student, parent and staff services through the secure Sripalee College digital portal.",
};

export default function PortalPage() {
  return (
    <PageTransition>
      <main>
        <PortalSections />
      </main>
    </PageTransition>
  );
}