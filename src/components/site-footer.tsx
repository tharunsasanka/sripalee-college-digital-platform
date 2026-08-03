import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "Our School" },
  { href: "/academics", label: "Academics" },
  { href: "/staff", label: "Academic Staff" },
  { href: "/news", label: "News and Notices" },
  { href: "/heritage", label: "Heritage Archive" },
  { href: "/resources", label: "Resources" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#20242a] px-5 pt-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#c9a227] bg-[#741f2b] text-sm font-bold text-[#e8c85e]">SC</div><div><p className="font-semibold">Sripalee College Digital Platform</p><p className="text-sm text-white/50">Horana, Sri Lanka</p></div></div>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">A secure, multilingual and accessible government-school digital platform currently under development. This is not yet the official public website.</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/60"><ShieldCheck size={17} className="text-[#e8c85e]" /> Privacy and accessibility by design</div>
        </div>
        <div><p className="font-semibold text-[#e8c85e]">Quick Links</p><div className="mt-5 grid gap-3 text-sm text-white/60">{footerLinks.map((link) => <Link key={link.href} href={link.href} className="focus-ring rounded-sm hover:text-white">{link.label}</Link>)}</div></div>
        <div><p className="font-semibold text-[#e8c85e]">Official Contact</p><div className="mt-5 space-y-4 text-sm text-white/60"><p className="flex gap-3"><MapPin size={18} className="shrink-0 text-[#e8c85e]" /> Horana, Sri Lanka</p><p className="flex gap-3"><Phone size={18} className="shrink-0 text-[#e8c85e]" /> Pending confirmation</p><p className="flex gap-3"><Mail size={18} className="shrink-0 text-[#e8c85e]" /> Pending confirmation</p></div></div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Sripalee College Digital Platform development project.</p><p>Development preview · Not yet an official school service</p></div>
    </footer>
  );
}
