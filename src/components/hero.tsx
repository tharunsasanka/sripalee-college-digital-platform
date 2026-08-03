import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Landmark,
  ShieldCheck,
} from "lucide-react";

export function Hero() {
  return (
    <section className="home-hero-section relative overflow-hidden bg-gradient-to-br from-[#4e111b] via-[#681824] to-[#2c1015] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full border border-[#c9a227]/20" />
        <div className="absolute -right-24 top-20 h-[32rem] w-[32rem] rounded-full border border-white/10" />
        <div className="absolute bottom-[-14rem] left-[38%] h-[32rem] w-[32rem] rounded-full border border-[#c9a227]/10" />
      </div>

      <div className="soft-grid pointer-events-none absolute inset-0 opacity-15" />

      <div className="home-hero-grid relative mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-9 xl:gap-12">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8c85e]/25 bg-white/5 px-4 py-2 text-xs font-semibold text-[#e8c85e] sm:text-sm">
            <Landmark size={16} />
            Sripalee College Digital Platform
          </div>

          <h1 className="home-hero-title mt-6 max-w-4xl font-serif font-semibold leading-[0.91] tracking-[-0.045em]">
            Rooted in heritage.
            <span className="mt-1 block text-[#f4e4bd]">
              Advancing through education.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            A secure, multilingual and accessible digital platform designed
            for the Sripalee College community.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#dfb515] px-6 py-3.5 font-semibold text-[#351017] shadow-lg transition hover:-translate-y-1 hover:bg-[#edc93f]"
            >
              Explore the School
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/news"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              <BellRing size={18} />
              Latest Notices
            </Link>
          </div>
        </div>

        <div className="home-hero-visual hidden lg:block">
          <div className="rounded-[2rem] border border-[#c9a227]/35 bg-[#eadfc7] p-3 shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-[#8f6d3c]/20 bg-gradient-to-br from-[#e0d3b9] to-[#cbbda4] px-6 py-7 text-center text-[#4e111b]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full border border-[#c9a227]/30" />

              <p className="relative font-serif text-2xl font-semibold">
                Crest and School Photography
              </p>

              <div className="relative mx-auto mt-6 grid h-24 w-24 place-items-center rounded-full border-2 border-[#c9a227] bg-[#5b111c] text-3xl font-bold text-[#e8c85e] shadow-lg">
                SC
              </div>

              <h2 className="relative mt-6 text-lg font-semibold">
                Approved crest and campus image
              </h2>

              <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-[#5d4a3d]">
                Replace this development placeholder after receiving official
                photographs and publication permission.
              </p>

              <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/40 bg-white/15 p-4 text-left">
                  <ShieldCheck className="text-[#741f2b]" size={20} />

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6318]">
                    Public Platform
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-5">
                    Website, heritage and notices
                  </p>
                </div>

                <div className="rounded-2xl border border-white/40 bg-white/15 p-4 text-left">
                  <Landmark className="text-[#741f2b]" size={20} />

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6318]">
                    Protected Services
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-5">
                    Academic services in later phases
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