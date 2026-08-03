"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Languages,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { languageOptions } from "@/lib/language";

export function LanguageCentre() {
  const { language, setLanguage, t } = useLanguage();

  const principles = [
    {
      title: t("principleOneTitle"),
      description: t("principleOneDescription"),
      icon: ShieldCheck,
    },
    {
      title: t("principleTwoTitle"),
      description: t("principleTwoDescription"),
      icon: RefreshCw,
    },
    {
      title: t("principleThreeTitle"),
      description: t("principleThreeDescription"),
      icon: MessageSquareText,
    },
    {
      title: t("principleFourTitle"),
      description: t("principleFourDescription"),
      icon: CheckCircle2,
    },
  ];

  const languageStatuses = [
    {
      code: "en" as const,
      title: t("englishStatus"),
      description: t("englishStatusText"),
    },
    {
      code: "si" as const,
      title: t("sinhalaStatus"),
      description: t("sinhalaStatusText"),
    },
    {
      code: "ta" as const,
      title: t("tamilStatus"),
      description: t("tamilStatusText"),
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e8c85e]">
              {t("centreEyebrow")}
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.05] md:text-7xl">
              {t("centreTitle")}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
              {t("centreDescription")}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
              >
                {t("reportTranslationIssue")}
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white"
              >
                {t("returnHome")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t("currentLanguage")}
            title={t("supportedLanguages")}
            description={t("developmentNotice")}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {languageOptions.map((option, index) => {
            const selected = option.code === language;

            return (
              <Reveal
                key={option.code}
                delay={index * 0.05}
              >
                <button
                  type="button"
                  onClick={() => setLanguage(option.code)}
                  aria-pressed={selected}
                  className={`card-3d focus-ring flex h-full w-full flex-col rounded-[2rem] border p-7 text-left ${
                    selected
                      ? "border-[#741f2b] bg-[#741f2b] text-white"
                      : "border-black/10 bg-white text-[#4e111b]"
                  }`}
                >
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl text-lg font-semibold ${
                      selected
                        ? "bg-[#c9a227] text-[#4e111b]"
                        : "bg-[#741f2b] text-white"
                    }`}
                  >
                    {option.shortLabel}
                  </div>

                  <h2 className="mt-7 text-2xl font-semibold">
                    {option.nativeName}
                  </h2>

                  <p
                    className={`mt-3 text-sm leading-6 ${
                      selected
                        ? "text-white/65"
                        : "text-black/55"
                    }`}
                  >
                    {selected
                      ? t("currentSelection")
                      : t("selectLanguage")}
                  </p>

                  {selected && (
                    <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-[#e8c85e]">
                      <CheckCircle2 size={18} />
                      {t("preferenceSaved")}
                    </div>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="soft-grid border-y border-black/5 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow={t("translationStatus")}
              title={t("translationStatus")}
              description={t("translationStatusDescription")}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {languageStatuses.map((item, index) => (
              <Reveal key={item.code} delay={index * 0.05}>
                <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-[#faf7ef] p-7">
                  <Languages
                    className="text-[#741f2b]"
                    size={29}
                  />

                  <h2 className="mt-6 text-2xl font-semibold text-[#4e111b]">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-black/60">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t("languagePrinciples")}
            title={t("languagePrinciples")}
            description={t("translationStatusDescription")}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <Reveal
                key={principle.title}
                delay={index * 0.04}
              >
                <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <Icon size={22} />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold text-[#4e111b]">
                    {principle.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-black/60">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}