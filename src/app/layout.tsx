import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { LanguageProvider } from "@/components/language/language-provider";
import SiteFooterStatic from "@/components/site-footer-static";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Sripalee College",
    template: "%s | Sripalee College",
  },

  description:
    "Official website of Sripalee College.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
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