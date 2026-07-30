import Link from "next/link";
import { CalendarDays, GraduationCap, Landmark, Megaphone, Trophy, Users } from "lucide-react";
import { Hero } from "@/components/hero";
import { PageTransition } from "@/components/page-transition";

const quickLinks = [
  { label: "Latest Notices", href: "/news", icon: Megaphone },
  { label: "Academics", href: "/academics", icon: GraduationCap },
  { label: "Academic Staff", href: "/staff", icon: Users },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Achievements", href: "/school-life", icon: Trophy },
  { label: "Heritage Archive", href: "/heritage", icon: Landmark }
];

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">Quick Access</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#4e111b] md:text-4xl">Important school services</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="card-3d rounded-3xl border border-black/10 bg-white p-6">
                <Icon className="text-[#741f2b]" />
                <h3 className="mt-5 text-xl font-semibold">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-black/60">Open the relevant section of the digital platform.</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">Project Foundation</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#4e111b]">Designed for a government school</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-black/65">
            <p>The public website, private academic portal and administration system will be separated clearly.</p>
            <p>Real student information will only be introduced after formal school approval, privacy review and security testing.</p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
