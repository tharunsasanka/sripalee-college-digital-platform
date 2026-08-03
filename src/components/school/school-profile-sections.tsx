import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Flag,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MapPin,
  Quote,
  School,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  campusAreas,
  identityItems,
  leadershipRoles,
  profileSourceNotes,
  proposedValues,
  schoolFacts,
  schoolTimeline,
} from "@/lib/school-profile-data";

const valueIcons = [
  GraduationCap,
  Landmark,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  UsersRound,
];

const identityIcons = [Award, Flag, Star, BookOpenCheck];

const sectionLinks = [
  {
    href: "story",
    label: "Our story",
  },
  {
    href: "direction",
    label: "Vision and mission",
  },
  {
    href: "identity",
    label: "Identity",
  },
  {
    href: "leadership",
    label: "Leadership",
  },
  {
    href: "traditions",
    label: "Traditions",
  },
  {
    href: "campus",
    label: "Campus",
  },
];

const traditionItems = [
  "School houses and house colours",
  "Annual ceremonies and recognised traditions",
  "Student leadership and service",
  "Past-pupil and community relationships",
  "Cultural, artistic and religious observances",
];

const traditionCards = [
  "House identity",
  "Leadership",
  "Culture",
  "Service",
];

export function SchoolProfileSections() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#4e111b] px-5 py-24 text-white lg:px-8 lg:py-32">
        <div className="soft-grid absolute inset-0 opacity-30" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-[#c9a227]/30" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
                Our School
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                A school identity shaped by heritage, learning and public
                service.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                This section introduces Sripalee College through verified
                history, approved institutional information, leadership,
                values, traditions and campus life.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#story"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
                >
                  Explore our story
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/heritage"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Heritage archive
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
                      Official identity area
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      Crest, flag and approved school media
                    </h2>
                  </div>

                  <School className="text-[#e8c85e]" size={30} />
                </div>

                <div className="mt-8 grid place-items-center rounded-3xl border border-dashed border-white/20 bg-white/5 px-6 py-12 text-center">
                  <div className="grid h-28 w-28 place-items-center rounded-full border-2 border-[#c9a227] bg-[#741f2b] text-3xl font-semibold text-[#e8c85e]">
                    SC
                  </div>

                  <p className="mt-5 font-semibold">
                    Approved crest and official image
                  </p>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">
                    This development placeholder will be replaced after
                    receiving authorised high-resolution material.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 lg:px-8">
        <nav
          aria-label="Our School page sections"
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

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {schoolFacts.map((fact) => (
              <article
                key={fact.label}
                className="card-3d rounded-3xl border border-black/10 bg-white p-6"
              >
                <p className="text-3xl font-semibold text-[#741f2b]">
                  {fact.value}
                </p>

                <p className="mt-2 text-sm leading-6 text-black/60">
                  {fact.label}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <p className="mt-5 text-sm leading-6 text-black/60">
          Development summary based on available authoritative records. Final
          wording and current institutional details require school
          confirmation.
        </p>
      </section>

      <section
        id="story"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="A distinctive educational beginning"
              description="Sripalee College’s story is closely connected with Wilmot A. Perera, Rabindranath Tagore and an educational vision that brought cultural learning together with wider academic development."
            />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="sticky top-36 rounded-[2rem] bg-[#741f2b] p-8 text-white">
                <Quote className="text-[#e8c85e]" size={40} />

                <h3 className="mt-6 text-3xl font-semibold">
                  History should be presented with evidence, context and
                  respect.
                </h3>

                <p className="mt-5 leading-7 text-white/[0.65]">
                  The digital archive will distinguish verified facts from
                  recollections, record source information and preserve
                  permissions for photographs and documents.
                </p>

                <Link
                  href="/heritage"
                  className="focus-ring mt-8 inline-flex items-center gap-2 font-semibold text-[#e8c85e]"
                >
                  Open heritage section
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>

            <div className="relative space-y-6 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-[#c9a227]/[0.55] md:before:left-6">
              {schoolTimeline.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="relative pl-14 md:pl-16">
                    <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-4 border-[#faf7ef] bg-[#c9a227] text-xs font-bold text-[#4e111b] md:h-12 md:w-12">
                      {index + 1}
                    </div>

                    <div className="rounded-3xl border border-black/10 bg-[#faf7ef] p-6 md:p-8">
                      <p className="text-sm font-semibold uppercase tracking-[0.17em] text-[#741f2b]">
                        {item.period}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold text-[#4e111b]">
                        {item.title}
                      </h3>

                      <p className="mt-4 leading-7 text-black/[0.65]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="direction"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Educational Direction"
            title="Vision, mission and shared values"
            description="The following layout demonstrates how approved institutional statements can be presented. The exact wording must be supplied and approved by the school before public launch."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card-3d h-full rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-10">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                <Trees size={26} />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Proposed presentation
              </p>

              <h3 className="mt-3 text-3xl font-semibold">Vision</h3>

              <p className="mt-5 text-lg leading-8 text-white/[0.68]">
                A concise, officially approved statement describing the future
                educational direction and aspirations of Sripalee College.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="card-3d h-full rounded-[2rem] border border-black/10 bg-white p-8 md:p-10">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#741f2b]/10 text-[#741f2b]">
                <MapPin size={26} />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Proposed presentation
              </p>

              <h3 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                Mission
              </h3>

              <p className="mt-5 text-lg leading-8 text-black/[0.65]">
                A clear statement explaining how the school supports learning,
                character, creativity, cultural responsibility and service to
                the community.
              </p>
            </article>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proposedValues.map((value, index) => {
            const Icon = valueIcons[index];

            return (
              <Reveal key={value.title} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                  <Icon className="text-[#741f2b]" size={26} />

                  <h3 className="mt-5 text-xl font-semibold text-[#4e111b]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/60">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        id="identity"
        className="scroll-mt-36 bg-[#4e111b] px-5 py-20 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                School Identity
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Symbols that represent the school
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/[0.65]">
                Every symbol should be published from an approved source and
                presented consistently across the website, documents and
                digital noticeboard.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {identityItems.map((item, index) => {
              const Icon = identityIcons[index];

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8c85e]">
                      {item.status}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-white/60">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="leadership"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Leadership and Administration"
            title="Clear responsibilities and accountable management"
            description="Public profiles may introduce approved leaders and departments. Private personnel, appointment and contact information will remain inside authorised administrative systems."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="card-3d rounded-[2rem] border border-black/10 bg-white p-7">
              <div className="grid min-h-96 place-items-center rounded-[1.5rem] bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-8 text-center text-white">
                <div>
                  <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-2 border-[#c9a227] bg-white/10 text-[#e8c85e]">
                    Photo
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    Principal’s approved profile
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Name, photograph and official message will be added after
                    administrative confirmation.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {leadershipRoles.map((item, index) => (
              <Reveal key={item.role} delay={index * 0.04}>
                <article className="card-3d h-full rounded-3xl border border-black/10 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#741f2b]/10 text-[#741f2b]">
                      <UsersRound size={20} />
                    </div>

                    <h3 className="text-lg font-semibold text-[#4e111b]">
                      {item.role}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-black/60">
                    {item.scope}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="traditions"
        className="soft-grid scroll-mt-36 border-y border-black/5 bg-white px-5 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Traditions and Community
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b] md:text-5xl">
                Preserving meaning, not merely listing events
              </h2>

              <p className="mt-6 text-lg leading-8 text-black/[0.65]">
                The final section can explain school houses, ceremonies, annual
                events, leadership traditions, cultural practices and
                long-standing community relationships.
              </p>

              <div className="mt-8 space-y-4">
                {traditionItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[#741f2b]"
                      size={20}
                    />

                    <p className="leading-7 text-black/[0.65]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              {traditionCards.map((item, index) => {
                const highlighted = index === 0 || index === 3;

                return (
                  <div
                    key={item}
                    className={`card-3d grid min-h-44 place-items-center rounded-3xl p-6 text-center ${
                      highlighted
                        ? "bg-[#741f2b] text-white"
                        : "border border-black/10 bg-[#faf7ef] text-[#4e111b]"
                    }`}
                  >
                    <div>
                      <p className="text-3xl font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <p className="mt-3 font-semibold">{item}</p>

                      <p
                        className={`mt-2 text-xs ${
                          highlighted
                            ? "text-white/60"
                            : "text-black/60"
                        }`}
                      >
                        Approved details required
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="campus"
        className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8"
      >
        <Reveal>
          <SectionHeading
            eyebrow="Campus and Facilities"
            title="A visual guide to learning and heritage spaces"
            description="The final page can combine original photography, short descriptions, accessibility information and an optional interactive campus guide."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {campusAreas.map((area, index) => (
            <Reveal key={area} delay={index * 0.035}>
              <article className="card-3d relative min-h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-6 text-white">
                <div className="soft-grid absolute inset-0 opacity-30" />

                <div className="relative flex h-full flex-col justify-between">
                  <Building2 className="text-[#e8c85e]" size={27} />

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#e8c85e]">
                      Area {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">{area}</h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      Approved photography and facility details to be added.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-black/10 bg-[#faf7ef] p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">
                Publication Controls
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">
                What must be confirmed before launch
              </h2>

              <p className="mt-5 leading-7 text-black/[0.65]">
                This development page intentionally separates verified facts,
                proposed wording and content that requires formal approval.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {profileSourceNotes.map((note, index) => (
              <Reveal key={note} delay={index * 0.035}>
                <div className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#741f2b] text-xs font-semibold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-black/[0.65]">
                    {note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
                Continue Exploring
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Discover the heritage archive and academic community
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/[0.65]">
                The deeper archive will preserve source-backed historical
                records, while the academic staff section will introduce
                approved teacher profiles and departments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/heritage"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]"
              >
                Heritage archive
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/staff"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Academic staff
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}