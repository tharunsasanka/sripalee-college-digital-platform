import type { Metadata } from "next";
import {
  Accessibility,
  Eye,
  Link2,
  MoveHorizontal,
  RotateCcw,
  Type,
} from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Review the accessibility controls available on the Sripalee College digital platform.",
};

const controls = [
  {
    title: "Text size",
    description:
      "Increase or reduce interface text while keeping the page layout readable.",
    icon: Type,
  },
  {
    title: "High contrast",
    description:
      "Strengthen foreground and background contrast for clearer reading.",
    icon: Eye,
  },
  {
    title: "Underline links",
    description:
      "Make interactive text links easier to distinguish from ordinary content.",
    icon: Link2,
  },
  {
    title: "Reduced motion",
    description:
      "Stop decorative movement and reduce animated transitions throughout the platform.",
    icon: MoveHorizontal,
  },
  {
    title: "Readable font",
    description:
      "Use a simplified typeface where a decorative font may be harder to read.",
    icon: Accessibility,
  },
  {
    title: "Reset preferences",
    description:
      "Return all accessibility controls to the platform defaults at any time.",
    icon: RotateCcw,
  },
];

export default function AccessibilityPage() {
  return (
    <PageTransition>
      <main className="site-page-theme">
        <section className="relative overflow-hidden bg-[#4e111b] px-5 py-20 text-white lg:px-8 lg:py-28">
          <div className="soft-grid pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e8c85e]">
              Accessibility Centre
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              Adjust the platform for a more comfortable experience.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              Use the floating accessibility button at the lower-left corner of
              any page to change reading and motion preferences.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Available Controls"
              title="Personalise how the platform is displayed"
              description="Preferences are stored only in the current browser and can be reset whenever required."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {controls.map((control, index) => {
              const Icon = control.icon;

              return (
                <Reveal key={control.title} delay={index * 0.04}>
                  <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      <Icon size={22} />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-[#4e111b]">
                      {control.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-black/60">
                      {control.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
