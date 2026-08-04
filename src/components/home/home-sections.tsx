import Link from "next/link";
import { ArrowRight, ArrowUpRight, ImageIcon, MapPin, MessageSquareText, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { HomeLiveContent } from "@/components/home/home-live-content";
import { departments, quickLinks, schoolLife, staffPreview } from "@/lib/home-data";

export function HomeSections() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal><SectionHeading eyebrow="Quick Access" title="Important school services" description="A clear starting point for the information and services most frequently needed by students, parents, teachers and visitors." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.href} delay={index * 0.05}>
                <Link href={item.href} className="card-3d focus-ring group block rounded-3xl border border-black/10 bg-white p-6">
                  <div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#741f2b]/10 text-[#741f2b]"><Icon size={23} /></div><ArrowUpRight className="text-black/50 group-hover:text-[#741f2b]" size={20} /></div>
                  <h3 className="mt-6 text-xl font-semibold text-[#4e111b]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/60">{item.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="soft-grid border-y border-black/5 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <div className="card-3d rounded-[2rem] border border-black/10 bg-[#faf7ef] p-6">
              <div className="grid min-h-96 place-items-center rounded-[1.5rem] bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-8 text-center text-white">
                <div><div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-2 border-[#c9a227] bg-white/10 text-2xl font-semibold text-[#e8c85e]">Photo</div><p className="mt-6 text-lg font-semibold">PrincipalÃ¢â‚¬â„¢s approved photograph</p><p className="mt-2 text-sm text-white/65">To be added after official confirmation.</p></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">Message from the Principal</p>
              <Quote className="mt-6 text-[#c9a227]" size={42} />
              <h2 className="mt-5 text-3xl font-semibold text-[#4e111b] md:text-5xl">Leadership, learning and responsibility</h2>
              <p className="mt-6 text-lg leading-8 text-black/65">The official principalÃ¢â‚¬â„¢s message will introduce the schoolÃ¢â‚¬â„¢s educational direction, values, responsibilities and commitment to students. This development text will be replaced with approved content before launch.</p>
              <Link href="/about" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-[#741f2b] px-5 py-3 font-semibold text-white hover:bg-[#4e111b]">Read about the school <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <HomeLiveContent />

      <section className="bg-[#4e111b] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">Academic Excellence</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Departments and learning pathways</h2><p className="mt-5 text-lg leading-8 text-white/65">Academic information will be organised by department, grade, subject, medium and study stream.</p></div></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{departments.map((department, index) => { const Icon = department.icon; return <Reveal key={department.title} delay={index * 0.05}><article className="card-3d h-full rounded-3xl border border-white/10 bg-white/5 p-6"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]"><Icon size={23} /></div><h3 className="mt-6 text-xl font-semibold">{department.title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{department.description}</p></article></Reveal>; })}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal><SectionHeading eyebrow="Academic Staff" title="Meet the people who guide learning" description="Approved profiles can include photographs, positions, departments, subjects taught, qualifications and supervised activities." /></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">{staffPreview.map((staff, index) => <Reveal key={staff.name} delay={index * 0.06}><article className="card-3d rounded-3xl border border-black/10 bg-white p-6"><div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-[#741f2b] to-[#4e111b] text-xl font-semibold text-[#e8c85e]">{staff.initials}</div><p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[#741f2b]">{staff.role}</p><h3 className="mt-2 text-2xl font-semibold text-[#4e111b]">{staff.name}</h3><p className="mt-3 text-sm leading-6 text-black/60">{staff.detail}</p></article></Reveal>)}</div>
      </section>

      <section className="soft-grid border-y border-black/5 bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Beyond the Classroom" title="School life, creativity and leadership" description="The platform will highlight student participation while using approved photographs, accurate achievements and responsible publication practices." /></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{schoolLife.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * 0.05}><article className="card-3d h-full rounded-3xl border border-black/10 bg-[#faf7ef] p-6"><Icon className="text-[#741f2b]" size={28} /><h3 className="mt-6 text-xl font-semibold text-[#4e111b]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-black/60">{item.description}</p></article></Reveal>; })}</div>
        </div>
      </section>

      <section className="bg-[#741f2b] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">Digital Heritage Archive</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Preserving the story of Sripalee College</h2><p className="mt-6 text-lg leading-8 text-white/70">The heritage archive will preserve verified history, important people, traditions, photographs, scanned records, publications and oral-history material.</p><Link href="/heritage" className="focus-ring mt-9 inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-5 py-3 font-semibold text-[#4e111b]">Explore the archive <ArrowRight size={18} /></Link></div></Reveal>
          <Reveal delay={0.08}><div className="grid min-h-[420px] place-items-center rounded-[2rem] border border-white/15 bg-[#4e111b] p-8 text-center"><div><div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#e8c85e]/30 text-[#e8c85e]">Archive</div><h3 className="mt-6 text-2xl font-semibold">Timeline, documents and virtual museum</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/60">Every item will include source, date, verification and permission details.</p></div></div></Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Media Gallery" title="Approved moments from school life" description="Original, consent-cleared and appropriately credited photography will replace these development placeholders." /></Reveal>
          <div className="mt-12 grid auto-rows-[180px] gap-4 sm:grid-cols-2 lg:grid-cols-4">{["Campus", "Academic", "Culture", "Sports", "Heritage", "Events"].map((item, index) => <Reveal key={item} className={index === 0 || index === 5 ? "lg:col-span-2" : ""} delay={index * 0.04}><div className="card-3d relative h-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#741f2b] to-[#4e111b] p-5 text-white"><div className="absolute inset-0 opacity-30 soft-grid" /><div className="relative flex h-full flex-col justify-between"><ImageIcon className="text-[#e8c85e]" /><div><p className="text-lg font-semibold">{item}</p><p className="mt-1 text-sm text-white/60">Approved photo collection</p></div></div></div></Reveal>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <Reveal><div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#4e111b] p-8 text-white md:p-12 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">Contact and Location</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Connect through approved school channels</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">Official telephone numbers, email addresses, office hours, location details and enquiry procedures will be published after administrative confirmation.</p><div className="mt-7 flex flex-wrap gap-4 text-sm text-white/70"><span className="inline-flex items-center gap-2"><MapPin size={17} className="text-[#e8c85e]" /> Horana, Sri Lanka</span><span className="inline-flex items-center gap-2"><MessageSquareText size={17} className="text-[#e8c85e]" /> Secure enquiry form planned</span></div></div><Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b]">Contact page <ArrowRight size={18} /></Link></div></Reveal>
      </section>
    </>
  );
}
