import type { Metadata } from "next";
import { ContactSections } from "@/components/contact/contact-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Contact and Enquiries",
  description:
    "Find official contact routes, department information, visitor guidance and general enquiry support for Sripalee College.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <ContactSections />
      </main>
    </PageTransition>
  );
}