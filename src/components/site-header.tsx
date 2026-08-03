"use client";

import Link from "next/link";
import { Menu, Search, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/navigation";

const languages = ["සිංහල", "English", "தமிழ்"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#faf7ef]/95 backdrop-blur-xl">
      <div className="border-b border-black/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-xs text-black/60 lg:px-8">
          <p>Government school digital platform development preview</p>
          <div className="hidden items-center gap-3 sm:flex">
            {languages.map((language, index) => (
              <button key={language} type="button" className={`focus-ring rounded-full px-2 py-1 transition ${index === 1 ? "bg-[#741f2b] text-white" : "hover:bg-black/5"}`}>
                {language}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-xl">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#c9a227] bg-[#741f2b] text-sm font-bold text-[#e8c85e]">SC</div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#4e111b]">Sripalee College</p>
            <p className="truncate text-sm text-black/55">Horana, Sri Lanka</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`focus-ring rounded-full px-3 py-2 text-sm font-medium transition ${active ? "bg-[#741f2b] text-white" : "hover:bg-[#741f2b]/10 hover:text-[#741f2b]"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" aria-label="Search" className="focus-ring rounded-full border border-black/10 p-2.5 hover:bg-white"><Search size={19} /></button>
          <Link href="/academics" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#741f2b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4e111b]">
            <ShieldCheck size={17} /> Portal
          </Link>
        </div>

        <button type="button" aria-label="Toggle navigation" aria-expanded={open} className="focus-ring rounded-xl border border-black/10 p-2.5 xl:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-black/10 bg-[#faf7ef] px-5 py-4 xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring rounded-xl px-4 py-3 font-medium hover:bg-[#741f2b]/10" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2 border-t border-black/10 pt-4 sm:col-span-2">
              {languages.map((language) => <button key={language} type="button" className="focus-ring rounded-full border border-black/10 px-3 py-2 text-sm">{language}</button>)}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
