import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Sripalee College Digital Platform",
  description: "Development preview for the Sripalee College digital platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <footer className="bg-[#4e111b] px-5 py-10 text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-semibold">Sripalee College Digital Platform</p>
            <p className="mt-2 text-sm text-white/65">Development preview - not yet the official school website.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
