import type { Metadata } from "next";
import { NewsSections } from "@/components/news/news-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "News and Notices",
  description:
    "View important announcements, academic notices, examination information, events and school updates from Sripalee College.",
};

export default function NewsPage() {
  return (
    <PageTransition>
      <main>
        <NewsSections />
      </main>
    </PageTransition>
  );
}