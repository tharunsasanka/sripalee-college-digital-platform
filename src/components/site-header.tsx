"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Bell,
  Menu,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { languageOptions } from "@/lib/language";
import {
  shellCopy,
  siteNavigation,
} from "@/lib/site-shell-copy";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const { language, setLanguage } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const copy = shellCopy[language];

  const primaryNavigation = siteNavigation.filter(
    (item) => item.primary,
  );

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const searchResults =
    normalizedQuery.length === 0
      ? siteNavigation
      : siteNavigation.filter((item) => {
          const searchableText = [
            item.label[language],
            item.keywords[language],
            item.label.en,
            item.keywords.en,
            item.href,
          ]
            .join(" ")
            .toLocaleLowerCase();

          return searchableText.includes(normalizedQuery);
        });

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <>
      <header className="school-shell-paper sticky top-0 z-50 border-b border-[#6b4626]/20 backdrop-blur-xl">
        <div className="bg-[#4e111b] px-4 py-2.5 text-white lg:px-6">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 text-sm">
            <div className="flex min-w-0 items-center gap-2">
              <Bell
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

        <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-3 lg:px-6">
          <Link
            href="/"
            className="focus-ring flex min-w-0 shrink-0 items-center gap-3 rounded-xl"
          >
            <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#c9a227] bg-[#741f2b] text-sm font-bold text-[#e8c85e] shadow-md">
              SC

              <span className="absolute inset-1 rounded-full border border-[#e8c85e]/25" />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-serif text-lg font-semibold text-[#4e111b]">
                {copy.schoolName}
              </p>

              <p className="truncate text-xs text-[#5f5148]">
                {copy.location}
              </p>
            </div>
          </Link>

          <nav
            aria-label="Main navigation"
            className="mx-auto hidden items-center gap-0.5 2xl:flex"
          >
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-[#741f2b] text-white shadow-md"
                    : "text-[#392a23] hover:bg-[#741f2b]/10 hover:text-[#741f2b]"
                }`}
              >
                {item.label[language]}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div
              role="group"
              aria-label="Language selection"
              className="inline-flex shrink-0 items-center rounded-full border border-[#741f2b]/20 bg-[#efe1c4] p-1 shadow-sm"
            >
              {languageOptions.map((option) => {
                const selected = option.code === language;

                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLanguage(option.code)}
                    aria-pressed={selected}
                    title={option.nativeName}
                    className={`focus-ring min-w-9 rounded-full px-2 py-2 text-xs font-semibold transition sm:min-w-10 sm:px-2.5 ${
                      selected
                        ? "bg-[#741f2b] text-white shadow-sm"
                        : "text-[#5a352d] hover:bg-[#741f2b]/10"
                    }`}
                  >
                    {option.shortLabel}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={copy.search}
              className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[#741f2b]/20 bg-[#f4ead2] text-[#4e111b] transition hover:border-[#c9a227] hover:bg-[#efe0bd]"
            >
              <Search size={19} />
            </button>

            <Link
              href="/portal"
              className="focus-ring hidden items-center gap-2 rounded-full bg-[#741f2b] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4e111b] md:inline-flex"
            >
              <ShieldCheck size={17} />
              {copy.portal}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen ? copy.closeMenu : copy.menu
              }
              className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[#741f2b]/20 bg-[#f4ead2] text-[#4e111b] 2xl:hidden"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            aria-label="Compact navigation"
            className="border-t border-[#6b4626]/20 bg-[#f3e7cb] px-4 py-5 2xl:hidden"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {siteNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`focus-ring rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    isActive(item.href)
                      ? "border-[#741f2b] bg-[#741f2b] text-white"
                      : "border-[#6b4626]/15 bg-[#fbf4e5] text-[#4e111b] hover:border-[#c9a227]"
                  }`}
                >
                  {item.label[language]}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#1c100d]/80 px-4 py-16 backdrop-blur-md md:py-24"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSearch();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="global-search-title"
            className="heritage-search-panel w-full max-w-3xl overflow-hidden rounded-[2rem]"
          >
            <div className="border-b border-[#6b4626]/25 p-6 md:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741f2b]">
                    {copy.search}
                  </p>

                  <h2
                    id="global-search-title"
                    className="mt-2 font-serif text-3xl font-semibold text-[#3b241b]"
                  >
                    {copy.searchTitle}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#5e493b]">
                    {copy.searchDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label={copy.closeSearch}
                  className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#6b4626]/20 bg-[#fbf4e5] text-[#4e111b]"
                >
                  <X size={20} />
                </button>
              </div>

              <label className="mt-6 flex items-center gap-3 rounded-2xl border border-[#741f2b]/25 bg-[#fffaf0] px-5 py-4 shadow-inner">
                <Search
                  className="shrink-0 text-[#741f2b]"
                  size={21}
                />

                <input
                  autoFocus
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder={copy.searchPlaceholder}
                  className="w-full bg-transparent text-lg text-[#3b241b] outline-none placeholder:text-[#6d5d50]/55"
                />

                <kbd className="hidden rounded-lg border border-[#6b4626]/20 bg-[#efe1c4] px-2 py-1 text-xs text-[#5e493b] sm:block">
                  Esc
                </kbd>
              </label>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-4 md:p-6">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                {copy.searchResults} · {searchResults.length}
              </p>

              {searchResults.length > 0 ? (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {searchResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSearch}
                      className="focus-ring group flex items-center justify-between gap-4 rounded-2xl border border-transparent bg-[#fbf4e5] px-5 py-4 transition hover:border-[#c9a227] hover:bg-[#f0dfbd]"
                    >
                      <div>
                        <p className="font-serif text-lg font-semibold text-[#3b241b]">
                          {item.label[language]}
                        </p>

                        <p className="mt-1 text-xs text-[#6d5d50]">
                          {item.href}
                        </p>
                      </div>

                      <ArrowRight
                        className="shrink-0 text-[#741f2b] transition group-hover:translate-x-1"
                        size={19}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-14 text-center">
                  <Search
                    className="mx-auto text-[#741f2b]"
                    size={32}
                  />

                  <h3 className="mt-5 font-serif text-2xl font-semibold text-[#3b241b]">
                    {copy.noResults}
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6d5d50]">
                    {copy.noResultsDescription}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}