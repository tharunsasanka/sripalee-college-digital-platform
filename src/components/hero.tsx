"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-grid relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[8%] top-16 h-40 w-40 rounded-full border border-[#c9a227]/70" />
        <div className="absolute right-[12%] top-28 h-64 w-64 rounded-full border border-white/20" />
      </div>

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#e8c85e]">
            Heritage · Education · Progress
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
            Rooted in heritage. Advancing through education.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            A modern multilingual digital platform created for the Sripalee College community.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/about" className="rounded-full bg-[#c9a227] px-6 py-3 font-semibold text-[#4e111b]">
              Explore the School
            </Link>
            <Link href="/news" className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              Latest Notices
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateY: 12, y: 24 }}
          animate={{ opacity: 1, rotateY: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-panel card-3d rounded-[2rem] p-7"
        >
          <div className="grid min-h-80 place-items-center rounded-[1.5rem] border border-white/15 bg-black/10 p-8 text-center">
            <div>
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-2 border-[#c9a227] bg-[#4e111b] text-3xl font-bold text-[#c9a227]">
                SC
              </div>
              <p className="mt-6 text-xl font-semibold">Official crest and school photograph</p>
              <p className="mt-2 text-sm text-white/65">Add approved media after school authorisation.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
