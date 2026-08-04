import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PublicContentReader } from "@/components/public/public-content-reader";

export const metadata: Metadata = {
  title: "News Article",
  description:
    "Read an official Sripalee College news publication.",
};

export default function NewsReaderPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <PublicContentReader
          expectedType="NEWS"
          backHref="/news"
          backLabel="Back to news"
        />
      </main>
    </PageTransition>
  );
}