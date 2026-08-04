import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PublicContentReader } from "@/components/public/public-content-reader";

export const metadata: Metadata = {
  title: "Official Notice",
  description:
    "Read an official Sripalee College notice.",
};

export default function NoticeReaderPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <PublicContentReader
          expectedType="NOTICE"
          backHref="/noticeboard"
          backLabel="Back to noticeboard"
        />
      </main>
    </PageTransition>
  );
}