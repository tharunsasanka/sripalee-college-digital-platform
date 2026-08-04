import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PublicNewsSections } from "@/components/public/public-news-sections";

export const metadata: Metadata = {
  title: "News and Announcements",
  description:
    "Read official news and announcements published by Sripalee College.",
};

export default function NewsPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <PublicNewsSections />
      </main>
    </PageTransition>
  );
}