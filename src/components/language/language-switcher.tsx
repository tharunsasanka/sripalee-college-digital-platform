"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Globe2,
  Languages,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import {
  getTranslation,
  languageOptions,
  type LanguageCode,
} from "@/lib/language";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const currentLanguage =
    languageOptions.find((option) => option.code === language) ??
    languageOptions[0];

  function selectLanguage(code: LanguageCode) {
    setLanguage(code);
    setStatusMessage(
      getTranslation(code, "preferenceSaved"),
    );
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="global-language-selector"
        className="focus-ring fixed left-4 top-24 z-[85] inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#4e111b] px-4 py-3 font-semibold text-white shadow-2xl"
        aria-label={t("selectLanguage")}
      >
        <Globe2 size={20} />

        <span>{currentLanguage.shortLabel}</span>

        <ChevronDown
          size={16}
          className={`transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <section
          id="global-language-selector"
          role="dialog"
          aria-modal="false"
          aria-labelledby="language-selector-title"
          className="fixed left-4 top-40 z-[85] w-[calc(100%-2rem)] max-w-sm rounded-[1.75rem] border border-black/10 bg-white p-5 text-[#4e111b] shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#741f2b]">
                {t("languageLabel")}
              </p>

              <h2
                id="language-selector-title"
                className="mt-2 text-xl font-semibold"
              >
                {t("selectLanguage")}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="focus-ring rounded-full p-2 text-black/45 transition hover:bg-black/5"
              aria-label={t("closeLanguageSelector")}
            >
              <X size={19} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {languageOptions.map((option) => {
              const selected = option.code === language;

              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() =>
                    selectLanguage(option.code)
                  }
                  aria-pressed={selected}
                  className={`focus-ring flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#741f2b] bg-[#741f2b]/5"
                      : "border-black/10 bg-white hover:bg-[#faf7ef]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full font-semibold ${
                        selected
                          ? "bg-[#741f2b] text-white"
                          : "bg-[#faf7ef] text-[#741f2b]"
                      }`}
                    >
                      {option.shortLabel}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {option.nativeName}
                      </p>

                      <p className="mt-1 text-xs text-black/45">
                        {option.code.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {selected && (
                    <Check
                      className="text-[#741f2b]"
                      size={21}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <Link
            href="/language"
            onClick={() => setIsOpen(false)}
            className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4e111b] px-5 py-3 font-semibold text-white"
          >
            <Languages size={18} />
            {t("openLanguageCentre")}
          </Link>
        </section>
      )}

      <p
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {statusMessage}
      </p>
    </>
  );
}