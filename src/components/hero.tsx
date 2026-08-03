"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-grid hero-pattern relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0">
        <motion.div animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[7%] top-20 h-36 w-36 rounded-full border border-[#c9a227]/55" />
        <motion.div animate={reduceMotion ? undefined : { y: [0, 16, 0], rotate: [0, -3, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[10%] top-28 h-64 w-64 rounded-full border border-white/15" />
      </div>

      <div className="relative mx-auto grid min-h-[690px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -30 }} animate={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8c85e]/30 bg-[#e8c85e]/10 px-4 py-2 text-sm font-semibold text-[#f5dda0]">
            <Landmark size={17} /> Heritage · Education · Progress
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.06] md:text-7xl">Rooted in heritage. Advancing through education.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">A secure, multilingual and accessible digital platform designed for the Sripalee College community.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/about" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#c9a227] px-6 py-3.5 font-semibold text-[#4e111b] hover:bg-[#e0bd4f]">Explore the School <ArrowRight size={18} /></Link>
            <Link href="/news" className="focus-ring rounded-full border border-white/30 px-6 py-3.5 font-semibold hover:bg-white/10">Latest Notices</Link>
          </div>
          <div className="mt-10 grid gap-3 text-sm text-white/75 sm:grid-cols-3">
            <div className="flex items-center gap-2"><CheckCircle2 size={17} className="text-[#e8c85e]" /> Multilingual</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={17} className="text-[#e8c85e]" /> Accessible</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={17} className="text-[#e8c85e]" /> Security-focused</div>
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, rotateY: 12, y: 28 }} animate={reduceMotion ? undefined : { opacity: 1, rotateY: 0, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="glass-panel card-3d rounded-[2rem] p-5 md:p-7">
          <div className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-black/10 p-7">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#e8c85e]/25" />
            <div className="relative flex min-h-[376px] flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-sm uppercase tracking-[0.18em] text-[#e8c85e]">Official Media Area</p><h2 className="mt-3 text-2xl font-semibold">Crest and school photography</h2></div>
                <ShieldCheck className="text-[#e8c85e]" />
              </div>
              <div className="grid place-items-center py-8 text-center">
                <div>
                  <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-2 border-[#c9a227] bg-[#4e111b] text-4xl font-bold text-[#e8c85e]">SC</div>
                  <p className="mt-6 text-lg font-semibold">Approved crest and campus image</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/65">Replace this development placeholder after receiving official media and permission.</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.16em] text-[#e8c85e]">Public platform</p><p className="mt-2 font-semibold">Website, heritage and notices</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.16em] text-[#e8c85e]">Protected services</p><p className="mt-2 font-semibold">Academic portal in later phases</p></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
