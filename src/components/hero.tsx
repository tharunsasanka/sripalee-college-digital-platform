import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Landmark,
  ShieldCheck,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-gradient-to-br from-[#4e111b] via-[#641722] to-[#2c1015] px-5 pb-20 pt-16 text-white lg:px-8 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute -left-32 top-12 h-96 w-96 rounded-full border border-[#c9a227]/20" />
        <div className="absolute -right-28 top-24 h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="absolute bottom-[-12rem] left-[35%] h-[30rem] w-[30rem] rounded-full border border-[#c9a227]/10" />
      </div>

      <div className="soft-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8c85e]/25 bg-white/5 px-4 py-2 text-sm font-semibold text-[#e8c85e]">
            <Landmark size={17} />
            Sripalee College Digital Platform
          </div>

          <h1 className="mt-8 max-w-4xl text-[clamp(3.5rem,6.2vw,6.9rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            Rooted in heritage.
            <span className="block text-[#f4e7cb]">
              Advancing through education.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
            A secure, multilingual and accessible digital platform designed
            for the Sripalee College community.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#d9ad20] px-7 py-4 font-semibold text-[#3b1118] shadow-lg transition hover:-translate-y-1 hover:bg-[#e7c34b]"
            >
              Explore the School
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/news"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              <BellRing size={18} />
              Latest Notices
            </Link>
          </div>

          <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8c85e]">
                Public Platform
              </p>

              <p className="mt-3 font-semibold leading-6 text-white/85">
                Website, heritage archive, news and public notices
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8c85e]">
                Protected Services
              </p>

              <p className="mt-3 font-semibold leading-6 text-white/85">
                Student, parent and staff services through secure access
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2.25rem] border border-[#c9a227]/35 bg-[#eadfc7] p-4 shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#8f6d3c]/20 bg-gradient-to-br from-[#ded0b6] to-[#cbbda4] px-7 py-10 text-center text-[#4e111b] md:px-10 md:py-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#c9a227]/25" />
              <div className="pointer-events-none absolute -left-20 bottom-[-6rem] h-64 w-64 rounded-full border border-[#741f2b]/10" />

              <p className="relative font-serif text-2xl font-semibold md:text-3xl">
                Crest and School Photography
              </p>

              <div className="relative mx-auto mt-9 grid h-32 w-32 place-items-center rounded-full border-2 border-[#c9a227] bg-[#5b111c] text-4xl font-bold text-[#e8c85e] shadow-xl">
                SC
              </div>

              <h2 className="relative mt-8 text-xl font-semibold">
                Approved crest and campus image
              </h2>

              <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-[#5d4a3d]">
                Replace this development placeholder after receiving official
                school photographs and publication permission.
              </p>

              <div className="relative mt-9 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/35 bg-white/15 p-5 text-left backdrop-blur-sm">
                  <ShieldCheck className="text-[#741f2b]" size={22} />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.17em] text-[#8a6318]">
                    Public Platform
                  </p>

                  <p className="mt-2 font-semibold leading-6">
                    Website, heritage and notices
                  </p>
                </div>

                <div className="rounded-2xl border border-white/35 bg-white/15 p-5 text-left backdrop-blur-sm">
                  <Landmark className="text-[#741f2b]" size={22} />

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.17em] text-[#8a6318]">
                    Protected Services
                  </p>

                  <p className="mt-2 font-semibold leading-6">
                    Academic portal in later phases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}