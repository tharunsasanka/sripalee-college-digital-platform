import type { Metadata } from "next";
import "./globals.css";
// Fallback/local stub for AccessibilityToolbar to avoid import errors during development
// Replace with the real component at '@/components/accessibility/accessibility-toolbar' when available
const AccessibilityToolbar: React.FC = () => null;
import { AnnouncementBar } from "@/components/home/announcement-bar";
import { LanguageProvider } from "@/components/language/language-provider";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { PwaShell } from "@/components/pwa/pwa-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Sripalee College Digital Platform",
    template: "%s | Sripalee College",
  },
  description:
    "Development preview for the secure, multilingual and accessible Sripalee College digital platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <AnnouncementBar />
          <SiteHeader />

          {children}

          <SiteFooter />
          <PwaShell />
          <AccessibilityToolbar />
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}