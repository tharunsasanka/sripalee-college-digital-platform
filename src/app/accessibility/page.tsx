import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  CheckCircle2,
  Eye,
  Keyboard,
  Languages,
  LifeBuoy,
  MonitorSmartphone,
  MousePointer2,
  ShieldCheck,
  Volume2,
} from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Review the accessibility features, reading controls and support process for the Sripalee College digital platform.",
};

const supportedFeatures = [
  {
    title: "Keyboard navigation",
    description:
      "Interactive controls should remain reachable and usable without requiring a mouse or touch screen.",
    icon: Keyboard,
  },
  {
    title: "Visible keyboard focus",
    description:
      "Focused links, buttons and form controls receive a visible outline.",
    icon: MousePointer2,
  },
  {
    title: "Text resizing",
    description:
      "The accessibility toolbar provides standard, large and extra-large text modes.",
    icon: Accessibility,
  },
  {
    title: "Reduced movement",
    description:
      "Users can minimise decorative animations, transitions and smooth scrolling.",
    icon: MonitorSmartphone,
  },
  {
    title: "Link identification",
    description:
      "An optional setting underlines text links across the platform.",
    icon: Eye,
  },
  {
    title: "Language planning",
    description:
      "Important public information is planned for approved Sinhala, English and Tamil versions.",
    icon: Languages,
  },
];

const reviewAreas = [
  "Heading order and page landmarks",
  "Keyboard access and focus order",
  "Alternative text for meaningful images",
  "Form labels, validation and error announcements",
  "Colour contrast for text and controls",
  "Touch-target size and spacing",
  "Content behaviour at enlarged text sizes",
  "Screen-reader names for interactive controls",
  "Captions and transcripts for audio or video",
  "Accessibility of PDF and downloadable documents",
];

const knownLimitations = [
  "Most current page content is available only in English.",
  "Official Sinhala and Tamil translations have not yet been supplied.",
  "Real historical images and documents require approved alternative text.",
  "Future authentication and administrative systems require a separate accessibility audit.",
  "Official downloadable documents must be checked individually for accessibility.",
  "The accessibility toolbar does not replace browser or assistive-technology settings.",
];

export default function AccessibilityPage() {
  return (
    <PageTransition>
      <main>
        <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
          <div className="soft-grid absolute inset-0 opacity-30" />

          <div className="relative mx-auto max-w-7xl">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e8c85e]">
                Accessibility Centre
              </p>

              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                A digital platform designed for broader access.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Sripalee College aims to provide information and digital
                services that can be understood and operated by people with
                different access needs, devices and input methods.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Report an accessibility problem
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white"
                >
                  Return to homepage
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Available Features"
              title="Tools supporting different reading and navigation needs"
              description="Accessibility should be included throughout the website rather than treated as a separate visual mode."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportedFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal key={feature.title} delay={index * 0.04}>
                  <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                    <div className="grid h-13 w-13 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      <Icon size={23} />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-[#4e111b]">
                      {feature.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-black/60">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="bg-[#4e111b] px-5 py-20 text-white lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <div>
                <ShieldCheck className="text-[#e8c85e]" size={35} />

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                  Accessibility Review
                </p>

                <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                  Areas requiring regular testing
                </h2>

                <p className="mt-5 text-lg leading-8 text-white/65">
                  Automated checks can identify some problems, but keyboard,
                  screen-reader and human usability testing remain necessary.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {reviewAreas.map((item, index) => (
                <Reveal key={item} delay={index * 0.03}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[#e8c85e]"
                      size={19}
                    />

                    <p className="text-sm leading-6 text-white/70">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8">
                <Volume2 className="text-[#741f2b]" size={32} />

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                  Assistive Technology
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                  Browser and device settings remain important
                </h2>

                <p className="mt-5 leading-8 text-black/65">
                  Users may continue using browser zoom, screen readers,
                  voice-control software, operating-system contrast settings
                  and other assistive technologies alongside the website
                  toolbar.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <article className="h-full rounded-[2rem] border border-black/10 bg-white p-8">
                <LifeBuoy className="text-[#741f2b]" size={32} />

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                  Accessibility Support
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                  Report barriers through the official contact route
                </h2>

                <p className="mt-5 leading-8 text-black/65">
                  A useful report should identify the affected page, the task
                  being attempted, the device or browser and what prevented
                  completion. Sensitive student or staff information should not
                  be included.
                </p>

                <Link
                  href="/contact"
                  className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-[#741f2b] px-6 py-3.5 font-semibold text-white"
                >
                  Contact support
                  <ArrowRight size={18} />
                </Link>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="soft-grid border-y border-black/5 bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Known Limitations"
                title="Accessibility work still to be completed"
                description="This development version should not claim complete accessibility conformance before formal testing and remediation."
              />
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {knownLimitations.map((limitation, index) => (
                <Reveal key={limitation} delay={index * 0.04}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-black/10 bg-[#faf7ef] p-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#741f2b] text-xs font-semibold text-white">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-7 text-black/65">
                      {limitation}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}