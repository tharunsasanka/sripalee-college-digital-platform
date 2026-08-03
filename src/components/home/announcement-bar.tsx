import Link from "next/link";
import { ArrowRight, BellRing } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#4e111b] px-5 py-2.5 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 text-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <BellRing size={16} className="text-[#e8c85e]" />
          <span className="font-medium">Development preview:</span>
          <span className="text-white/70">Official notices will be published after school approval.</span>
        </div>
        <Link href="/news" className="focus-ring inline-flex items-center gap-1 font-semibold text-[#e8c85e]">
          View notices <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
