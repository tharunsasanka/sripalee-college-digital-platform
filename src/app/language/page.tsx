import type { Metadata } from "next";
import { LanguageCentre } from "@/components/language/language-centre";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Language Access",
  description:
    "Choose English, Sinhala or Tamil and review multilingual publication information for the Sripalee College digital platform.",
};

export default function LanguagePage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <LanguageCentre />
      </main>
    </PageTransition>
  );
}