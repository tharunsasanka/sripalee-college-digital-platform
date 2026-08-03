"use client";

import { useLanguage } from "@/components/language/language-provider";
import { languageOptions } from "@/lib/language";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("selectLanguage")}
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
            className={`focus-ring min-w-10 rounded-full px-2.5 py-2 text-xs font-semibold transition ${
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
  );
}