"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import {
  shellCopy,
  siteNavigation,
} from "@/lib/site-shell-copy";

export default function SiteFooter() {
  const { language } = useLanguage();
  const copy = shellCopy[language];

  const footerLinks = siteNavigation.filter(
    (item) =>
      item.href === "/about" ||
      item.href === "/academics" ||
      item.href === "/staff" ||
      item.href === "/news" ||
      item.href === "/heritage" ||
      item.href === "/resources",
  );

  return (
    <footer className="relative overflow-hidden bg-[#271716] px-5 pt-16 text-white lg:px-8">
      <div className="heritage-footer-pattern pointer-events-none absolute inset-0 opacity-35" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full border border-[#c9a227]/15" />

      <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full border border-white/5" />

      <div className="relative mx-auto grid max-w-7xl gap-10 border-b border-[#d6b55c]/20 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-[#c9a227] bg-[#741f2b] text-sm font-bold text-[#e8c85e]">
              SC

              <span className="absolute inset-1 rounded-full border border-[#e8c85e]/25" />
            </div>

            <div>
              <p className="font-serif text-xl font-semibold text-[#f3dfac]">
                {copy.schoolName}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {copy.location}
              </p>
            </div>
          </div>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/60">
            {copy.platformDescription}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d6b55c]/20 bg-white/5 px-4 py-2 text-sm text-white/65">
            <span className="h-2 w-2 rounded-full bg-[#c9a227]" />

            {copy.privacyAccessibility}
          </div>
        </div>

        <div>
          <p className="font-serif text-lg font-semibold text-[#e8c85e]">
            {copy.quickLinks}
          </p>

          <nav
            aria-label="Footer navigation"
            className="mt-5 grid gap-3 text-sm text-white/60"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring w-fit rounded-sm transition hover:translate-x-1 hover:text-[#f3dfac]"
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-serif text-lg font-semibold text-[#e8c85e]">
            {copy.officialContact}
          </p>

          <div className="mt-5 space-y-4 text-sm leading-6 text-white/60">
            <p>{copy.location}</p>

            <p>{copy.contactPending}</p>

            <p>{copy.contactPending}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href="/language"
              className="focus-ring rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/65 transition hover:border-[#c9a227]/50 hover:text-white"
            >
              {copy.languageCentre}
            </Link>

            <Link
              href="/accessibility"
              className="focus-ring rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/65 transition hover:border-[#c9a227]/50 hover:text-white"
            >
              {copy.accessibility}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>© 2026 {copy.copyright}.</p>

          <p className="mt-1 text-white/35">
            {copy.developmentProject}
          </p>

          <p className="mt-2 font-semibold text-[#e8c85e]">
            Developed by Tharun Sasanka
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d6b55c]/15 bg-black/10 px-4 py-2 text-[#d8c69e]">
          <span className="h-2 w-2 rounded-full bg-[#c9a227]" />

          {copy.developmentStatus}
        </div>
      </div>
    </footer>
  );
}