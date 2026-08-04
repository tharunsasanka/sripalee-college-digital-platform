import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { PublicNoticeboardLoader } from "@/components/public/public-noticeboard-loader";

export const metadata: Metadata = {
  title: "Digital Noticeboard",
  description:
    "View official notices published through the Sripalee College digital noticeboard.",
};

export default function NoticeboardPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <PublicNoticeboardLoader />
      </main>
    </PageTransition>
  );
}