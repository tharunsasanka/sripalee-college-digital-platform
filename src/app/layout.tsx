import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/home/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Sripalee College Digital Platform",
    template: "%s | Sripalee College",
  },
  description: "Development preview for the secure, multilingual and accessible Sripalee College digital platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
