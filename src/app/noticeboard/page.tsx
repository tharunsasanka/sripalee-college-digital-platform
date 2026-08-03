import type { Metadata } from "next";
import { NoticeboardSections } from "@/components/noticeboard/noticeboard-sections";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Digital Noticeboard",
  description:
    "View important notices, events, achievements, examination reminders and emergency announcements through the Sripalee College digital noticeboard.",
};

export default function NoticeboardPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <NoticeboardSections />
      </main>
    </PageTransition>
  );
}