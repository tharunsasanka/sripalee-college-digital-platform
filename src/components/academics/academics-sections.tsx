import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Languages,
  Laptop,
  Library,
  Palette,
  School,
  ShieldCheck,
  Sigma,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  academicCalendarItems,
  academicDepartments,
  academicFacts,
  academicPublishingRules,
  academicResources,
  academicStages,
  advancedLevelPathways,
  examinationProcess,
} from "@/lib/academics-data";

const departmentIcons: Record<string, LucideIcon> = {
  languages: Languages,
  mathematics: Sigma,
  science: FlaskConical,
  social: UsersRound,
  technology: Laptop,
  commerce: BriefcaseBusiness,
  aesthetic: Palette,
  health: HeartPulse,
};

const resourceIcons: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  notice: BellRing,
  resources: Library,
  downloads: Download,
};

const sectionLinks = [
  {
    href: "stages",
    label: "Learning stages",
  },
  {
    href: "departments",
    label: "Departments",
  },
  {
    href: "pathways",
    label: "A/L pathways",
  },
  {
    href: "examinations",
    label: "Examinations",
  },
  {
    href: "calendar",
    label: "Calendar",
  },
  {
    href: "resources",
    label: "Resources",
  },
];

export function AcademicsSections() {
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
                Academics
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Structured learning for every stage of the student journey.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                Explore learning stages, academic departments, subject
                pathways, examination information and approved educational
                resources.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#stages"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Explore academics
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/resources"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Learning resources
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                      Academic overview
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Learning from Grade 1 to Grade 13
                    </h2>
                  </div>

                  <GraduationCap className="text-[#e8c85e]" size={32} />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {academicFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <p className="text-3xl font-semibold text-[#e8c85e]">
                        {fact.value}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {fact.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-6 text-white/60">
                  Final departments, subjects and Advanced Level streams must
                  be confirmed by authorised school officers.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Academic page sections"
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
        id="stages"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Learning Stages"
            title="A clear academic journey from primary to Advanced Level"
            description="Each stage can provide students and parents with approved information about learning priorities, subjects, assessment and progression."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {academicStages.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 0.05}>
              <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <School size={26} />
                  </div>

                  <span className="rounded-full bg-[#c9a227]/20 px-4 py-2 text-sm font-semibold text-[#4e111b]">
                    {stage.grades}
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-[#4e111b]">
                  {stage.title}
                </h3>

                <p className="mt-4 leading-7 text-black/65">
                  {stage.description}
                </p>

                <div className="mt-6 space-y-3">
                  {stage.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-[#741f2b]"
                        size={19}
                      />

                      <p className="text-sm leading-6 text-black/60">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="departments"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Academic Departments"
              title="Organised subject areas and learning communities"
              description="Department pages can later include approved staff profiles, subjects, learning resources, achievements and department announcements."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academicDepartments.map((department, index) => {
              const Icon = departmentIcons[department.icon] ?? BookOpen;

              return (
                <Reveal key={department.title} delay={index * 0.035}>
                  <article className="card-3d h-full rounded-3xl border border-black/10 bg-[#faf7ef] p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                      {department.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-black/60">
                      {department.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {department.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full border border-[#741f2b]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#741f2b]"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-[#c9a227]/40 bg-[#c9a227]/10 p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck
                className="mt-1 shrink-0 text-[#741f2b]"
                size={24}
              />

              <div>
                <h3 className="font-semibold text-[#4e111b]">
                  Department confirmation required
                </h3>

                <p className="mt-2 text-sm leading-6 text-black/60">
                  These categories provide the proposed website structure.
                  Official departments, subject combinations and teaching media
                  must be confirmed before public launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pathways"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Advanced Level Pathways"
            title="Helping students understand available subject directions"
            description="The final system should display only the streams and subject combinations officially offered by the school."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {advancedLevelPathways.map((pathway, index) => (
            <Reveal key={pathway.title} delay={index * 0.05}>
              <article className="card-3d h-full overflow-hidden rounded-[2rem] border border-black/10 bg-white">
                <div className="bg-[#4e111b] p-7 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <GraduationCap className="text-[#e8c85e]" size={29} />

                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#e8c85e]">
                      {pathway.status}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {pathway.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/65">
                    {pathway.description}
                  </p>
                </div>

                <div className="p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#741f2b]">
                    Possible subject areas
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {pathway.examples.map((example) => (
                      <div
                        key={example}
                        className="flex items-start gap-3 rounded-2xl bg-[#faf7ef] p-4"
                      >
                        <Sparkles
                          className="mt-0.5 shrink-0 text-[#c9a227]"
                          size={18}
                        />

                        <p className="text-sm font-semibold leading-6 text-[#4e111b]">
                          {example}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="examinations"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Examinations and Results
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                A controlled process from planning to publication
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/65">
                Examination information may be public, but individual marks and
                student reports must remain inside the protected academic
                portal.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {examinationProcess.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-3xl font-semibold text-[#e8c85e]">
                    {item.step}
                  </p>

                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-7 md:grid-cols-3">
              <div>
                <ClipboardCheck className="text-[#e8c85e]" size={26} />
                <h3 className="mt-4 font-semibold">Approval workflow</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Draft, review, approval, publication, locking and controlled
                  amendment.
                </p>
              </div>

              <div>
                <ShieldCheck className="text-[#e8c85e]" size={26} />
                <h3 className="mt-4 font-semibold">Protected records</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Students and parents access only records linked to their
                  verified accounts.
                </p>
              </div>

              <div>
                <FileText className="text-[#e8c85e]" size={26} />
                <h3 className="mt-4 font-semibold">Audited corrections</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Published marks retain the original value, correction reason,
                  requester and approver.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="calendar"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Academic Calendar"
            title="Important academic periods in one clear view"
            description="Official dates will later be managed through the administration dashboard and published in all supported languages."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {academicCalendarItems.map((item, index) => (
            <Reveal key={item.period} delay={index * 0.05}>
              <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                    <CalendarDays size={23} />
                  </div>

                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#741f2b]">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-[#4e111b]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-black/60">
                  {item.description}
                </p>

                <p className="mt-6 rounded-2xl bg-[#faf7ef] p-4 text-sm font-medium text-black/55">
                  Exact dates will be added after official approval.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="resources"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Academic Resources"
              title="Important information without unnecessary searching"
              description="Students and parents should be able to reach approved calendars, notices, resources and downloads directly."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academicResources.map((resource, index) => {
              const Icon = resourceIcons[resource.icon] ?? BookOpenCheck;

              return (
                <Reveal key={resource.title} delay={index * 0.05}>
                  <Link
                    href={resource.href}
                    className="focus-ring card-3d block h-full rounded-3xl border border-black/10 bg-[#faf7ef] p-6"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b] text-white">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">
                      {resource.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-black/60">
                      {resource.description}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#741f2b]">
                      {resource.action}
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Publication Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Academic information must remain accurate and authorised
              </h2>

              <p className="mt-5 leading-7 text-black/65">
                The public website should clearly separate general academic
                information from private student, examination and result
                records.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {academicPublishingRules.map((rule, index) => (
              <Reveal key={rule} delay={index * 0.035}>
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
                Academic Community
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Meet the teachers and departments supporting student learning
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                The academic staff directory will provide approved teacher
                profiles, subject information, departments and assigned
                responsibilities.
              </p>
            </div>

            <Link
              href="/staff"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
            >
              Academic staff
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}