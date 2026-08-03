import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { LanguageProvider } from "@/components/language/language-provider";
import SiteFooterStatic from "@/components/site-footer-static";
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
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <SiteHeader />

          {children}

          <SiteFooterStatic />
          <AccessibilityToolbar />
        </LanguageProvider>
      </body>
    </html>
  );
}