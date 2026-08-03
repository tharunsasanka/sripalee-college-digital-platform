"use client";

import Link from "next/link";
import { ArrowRight, BellRing } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { shellCopy } from "@/lib/site-shell-copy";

export default function AnnouncementBar() {
  const { language } = useLanguage();
  const copy = shellCopy[language];

  return (
    <div className="bg-[#4e111b] px-5 py-2.5 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 text-sm">
        <div className="flex min-w-0 items-center gap-2">
          <BellRing
            className="shrink-0 text-[#e8c85e]"
            size={16}
          />

          <p className="truncate text-white/75">
            <span className="font-semibold text-[#f3d97a]">
              {copy.noticeLabel}:
            </span>{" "}
            {copy.noticeMessage}
          </p>
        </div>

        <Link
          href="/news"
          className="focus-ring inline-flex shrink-0 items-center gap-1 rounded-lg font-semibold text-[#e8c85e]"
        >
          <span className="hidden sm:inline">
            {copy.viewNotices}
          </span>

          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}