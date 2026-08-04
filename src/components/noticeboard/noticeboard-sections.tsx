"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Maximize2,
  Megaphone,
  MonitorPlay,
  Palette,
  Pause,
  Play,
  School,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  noticeboardCategories,
  noticeboardFacts,
  noticeboardSecurityRules,
  noticeboardWorkflow,
  noticeboardZones,
  type NoticeboardPriority,
  type NoticeboardSlide,
} from "@/lib/noticeboard-data";

const slideIcons: Record<string, LucideIcon> = {
  emergency: AlertTriangle,
  examination: GraduationCap,
  parents: UsersRound,
  academic: BookOpenCheck,
  sports: Trophy,
  culture: Palette,
  achievement: Trophy,
  administration: School,
};

const priorityStyles: Record<
  NoticeboardPriority,
  {
    label: string;
    badge: string;
    background: string;
    accent: string;
    border: string;
  }
> = {
  emergency: {
    label: "Emergency",
    badge: "bg-white text-red-800",
    background: "from-red-800 via-red-700 to-red-950",
    accent: "text-red-100",
    border: "border-red-300",
  },
  important: {
    label: "Important",
    badge: "bg-amber-100 text-amber-900",
    background: "from-[#6a1723] via-[#4e111b] to-[#301016]",
    accent: "text-[#f1d474]",
    border: "border-amber-300",
  },
  standard: {
    label: "Information",
    badge: "bg-white/15 text-white",
    background: "from-[#4e111b] via-[#39131a] to-[#241014]",
    accent: "text-[#e8c85e]",
    border: "border-black/10",
  },
  celebration: {
    label: "Achievement",
    badge: "bg-[#f5dc76] text-[#4e111b]",
    background: "from-[#4e111b] via-[#6c2530] to-[#2c1317]",
    accent: "text-[#f5dc76]",
    border: "border-[#c9a227]",
  },
};

const sectionLinks = [
  {
    href: "display",
    label: "Board preview",
  },
  {
    href: "zones",
    label: "Display zones",
  },
  {
    href: "workflow",
    label: "Publishing workflow",
  },
  {
    href: "security",
    label: "Screen security",
  },
];

type NoticeboardSectionsProps = {
  slides: NoticeboardSlide[];
};

export function NoticeboardSections({
  slides,
}: NoticeboardSectionsProps) {
  const [category, setCategory] = useState("All Slides");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotationSeconds, setRotationSeconds] = useState(8);
  const [fullscreenFeedback, setFullscreenFeedback] = useState("");

  const filteredSlides = slides.filter(
    (slide) => category === "All Slides" || slide.category === category,
  );

  const safeIndex =
    filteredSlides.length === 0
      ? 0
      : Math.min(activeIndex, filteredSlides.length - 1);

  const activeSlide = filteredSlides[safeIndex];

  useEffect(() => {
    if (!isPlaying || filteredSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % filteredSlides.length);
    }, rotationSeconds * 1000);

    return () => window.clearInterval(timer);
  }, [filteredSlides.length, isPlaying, rotationSeconds]);

  function changeCategory(value: string) {
    setCategory(value);
    setActiveIndex(0);
  }

  function showPreviousSlide() {
    if (filteredSlides.length === 0) {
      return;
    }

    setActiveIndex((current) =>
      current <= 0 ? filteredSlides.length - 1 : current - 1,
    );
  }

  function showNextSlide() {
    if (filteredSlides.length === 0) {
      return;
    }

    setActiveIndex((current) => (current + 1) % filteredSlides.length);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setFullscreenFeedback("Full-screen display closed.");
        return;
      }

      const display = document.getElementById("noticeboard-display");

      if (!display) {
        setFullscreenFeedback("The noticeboard display could not be found.");
        return;
      }

      await display.requestFullscreen();
      setFullscreenFeedback("Full-screen TV display opened.");
    } catch {
      setFullscreenFeedback(
        "The browser blocked full-screen mode. Use the browser full-screen controls instead.",
      );
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-[#c9a227]/30" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
                Digital Noticeboard
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                School information designed for public display screens.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Present important notices, events, achievements, examination
                reminders and emergency instructions through an approved
                full-screen display.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#display"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Open board preview
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/news"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  View all notices
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                      Display overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Automatic rotation with priority control
                    </h2>
                  </div>

                  <MonitorPlay className="text-[#e8c85e]" size={32} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {noticeboardFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <p className="text-2xl font-semibold text-[#e8c85e]">
                        {fact.value}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {fact.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-6 text-white/60">
                  Current slides are development examples and must be replaced
                  with authorised school content.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Noticeboard page sections"
          className="mx-auto flex max-w-7xl flex-wrap gap-x-7 gap-y-2 py-4 text-sm font-semibold text-[#4e111b]"
        >
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="focus-ring rounded-lg px-2 py-1.5 transition hover:bg-[#741f2b]/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <section
        id="display"
        className="scroll-mt-36 bg-[#171013] px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                  Interactive Board Preview
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                  Test the school display experience
                </h2>

                <p className="mt-5 text-lg leading-8 text-white/60">
                  Select a category, control slide rotation and open the board
                  in full-screen TV mode.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2">
                <span className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                  Rotation
                </span>

                {[5, 8, 12].map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setRotationSeconds(seconds)}
                    className={`focus-ring grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                      rotationSeconds === seconds
                        ? "bg-[#c9a227] text-[#4e111b]"
                        : "text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {seconds}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
              <label className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white">
                  Display category
                </span>

                <select
                  value={category}
                  onChange={(event) => changeCategory(event.target.value)}
                  className="rounded-full border border-white/15 bg-[#2c1b20] px-4 py-2.5 text-sm text-white"
                >
                  {noticeboardCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={showPreviousSlide}
                  className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                  aria-label="Show previous slide"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying((current) => !current)}
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-[#c9a227] px-5 font-semibold text-[#4e111b]"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  type="button"
                  onClick={showNextSlide}
                  className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                  aria-label="Show next slide"
                >
                  <ChevronRight size={20} />
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 font-semibold text-white transition hover:bg-white/10"
                >
                  <Maximize2 size={18} />
                  TV mode
                </button>
              </div>
            </div>
          </Reveal>

          {fullscreenFeedback && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 text-sm text-white/60"
            >
              {fullscreenFeedback}
            </p>
          )}

          {activeSlide ? (
            <Reveal delay={0.08}>
              <div
                id="noticeboard-display"
                className="mt-8 flex min-h-[650px] flex-col overflow-hidden bg-[#171013] shadow-2xl"
              >
                <NoticeboardDisplay
                  slide={activeSlide}
                  position={safeIndex + 1}
                  total={filteredSlides.length}
                  isPlaying={isPlaying}
                  rotationSeconds={rotationSeconds}
                />
              </div>
            </Reveal>
          ) : (
            <div className="mt-8 grid min-h-[420px] place-items-center border border-white/10 bg-white/5 p-10 text-center">
              <div>
                <Megaphone className="mx-auto text-[#e8c85e]" size={34} />

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  No slides available
                </h3>

                <p className="mt-3 text-white/60">
                  Select another display category.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filteredSlides.map((slide, index) => {
              const style = priorityStyles[slide.priority];
              const selected = index === safeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`focus-ring rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#c9a227] bg-[#c9a227]/15"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.badge}`}
                    >
                      {style.label}
                    </span>

                    <span className="text-xs text-white/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-4 font-semibold text-white">{slide.title}</p>

                  <p className="mt-2 text-xs text-white/60">
                    {slide.category}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="zones"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Display Zones"
            title="A structured layout for different types of information"
            description="Each screen area should have a clear purpose so urgent information remains visible and regular notices stay readable."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {noticeboardZones.map((zone, index) => (
            <Reveal key={zone.title} delay={index * 0.04}>
              <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    {index === 0 && <MonitorPlay size={22} />}
                    {index === 1 && <Megaphone size={22} />}
                    {index === 2 && <CalendarDays size={22} />}
                    {index === 3 && <Trophy size={22} />}
                    {index === 4 && <BellRing size={22} />}
                    {index === 5 && <Languages size={22} />}
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#741f2b]">
                    Zone {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                  {zone.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#741f2b]">
                  {zone.position}
                </p>

                <p className="mt-4 text-sm leading-7 text-black/60">
                  {zone.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Publishing Workflow
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Screen content moves through approval and scheduling
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Editors should not be able to place unauthorised messages
                directly onto public school screens.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {noticeboardWorkflow.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold text-[#e8c85e]">
                      {item.step}
                    </p>

                    <ClipboardCheck className="text-[#e8c85e]" size={23} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="security"
        className="scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <ShieldCheck className="text-[#741f2b]" size={35} />

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Display Security
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Public screens require restricted access
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                A school display should show approved public information
                without exposing the administration system or private records.
              </p>

              <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white p-4">
                <LayoutDashboard
                  className="shrink-0 text-[#741f2b]"
                  size={22}
                />

                <p className="text-sm font-semibold leading-6 text-[#4e111b]">
                  Display devices should use a dedicated restricted account,
                  not an administrator account.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {noticeboardSecurityRules.map((rule, index) => (
              <Reveal key={rule} delay={index * 0.03}>
                <div className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#741f2b] text-xs font-semibold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-black/65">{rule}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Complete Information
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Open the full notice or event page
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                Display slides should remain brief and direct users to approved
                pages for complete information and downloadable documents.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/news"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
              >
                View notices
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/events"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white"
              >
                View events
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

type NoticeboardDisplayProps = {
  slide: NoticeboardSlide;
  position: number;
  total: number;
  isPlaying: boolean;
  rotationSeconds: number;
};

function NoticeboardDisplay({
  slide,
  position,
  total,
  isPlaying,
  rotationSeconds,
}: NoticeboardDisplayProps) {
  const Icon = slideIcons[slide.icon] ?? Megaphone;
  const style = priorityStyles[slide.priority];

  return (
    <div
      className={`flex min-h-[650px] flex-1 flex-col bg-gradient-to-br ${style.background} text-white`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 px-6 py-5 md:px-10">
        <div className="flex items-center gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#c9a227] text-[#4e111b]">
            <School size={21} />
          </div>

          <div>
            <p className="font-semibold">Sripalee College</p>
            <p className="text-xs uppercase tracking-[0.16em] text-white/60">
              Digital Noticeboard
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] ${style.badge}`}
          >
            {style.label}
          </span>

          <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/65">
            Slide {position}/{total}
          </span>
        </div>
      </div>

      <div className="grid flex-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-14 lg:py-14">
        <div>
          <div
            className={`grid h-20 w-20 place-items-center rounded-[1.6rem] border border-white/20 bg-white/10 ${style.accent}`}
          >
            <Icon size={38} />
          </div>

          <p
            className={`mt-8 text-sm font-semibold uppercase tracking-[0.22em] ${style.accent}`}
          >
            {slide.category}
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            {slide.title}
          </h2>

          <p className={`mt-4 text-xl font-semibold ${style.accent}`}>
            {slide.subtitle}
          </p>

          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/70 md:text-xl">
            {slide.summary}
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/15 bg-black/15 p-6 md:p-8">
          <div className="space-y-4">
            {slide.details.map((detail) => (
              <div key={detail} className="flex items-start gap-3">
                <CheckCircle2
                  className={`mt-0.5 shrink-0 ${style.accent}`}
                  size={20}
                />

                <p className="leading-7 text-white/75">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <CalendarDays className={style.accent} size={20} />

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                Date
              </p>

              <p className="mt-2 text-sm leading-6 text-white/75">
                {slide.dateLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Clock3 className={style.accent} size={20} />

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                Time
              </p>

              <p className="mt-2 text-sm leading-6 text-white/75">
                {slide.timeLabel}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
              Location or channel
            </p>

            <p className="mt-2 text-sm leading-6 text-white/75">
              {slide.location}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {slide.languages.map((language) => (
              <span
                key={language}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/65"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 px-6 py-4 text-xs text-white/60 md:px-10">
        <p>{slide.status}</p>

        <div className="flex items-center gap-3">
          {isPlaying ? <Play size={14} /> : <Pause size={14} />}
          <span>
            {isPlaying
              ? `Automatic rotation every ${rotationSeconds} seconds`
              : "Automatic rotation paused"}
          </span>
        </div>
      </div>
    </div>
  );
}