import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Home,
  RefreshCw,
  ShieldCheck,
  WifiOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "The Sripalee College digital platform is currently unavailable because the device is offline.",
};

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f0e4] px-5 py-16">
      <section className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl">
        <div className="bg-[#4e111b] p-8 text-white md:p-12">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#c9a227] text-[#4e111b]">
            <WifiOff size={29} />
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#e8c85e]">
            Offline Mode
          </p>

          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
            The internet connection is unavailable.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Some previously visited public pages may still be available.
            Sign-in services, forms and current updates require an internet
            connection.
          </p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#faf7ef] p-5">
              <FileText className="text-[#741f2b]" size={22} />

              <h2 className="mt-4 font-semibold text-[#4e111b]">
                Cached pages
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Previously opened public content may remain readable.
              </p>
            </div>

            <div className="rounded-2xl bg-[#faf7ef] p-5">
              <ShieldCheck className="text-[#741f2b]" size={22} />

              <h2 className="mt-4 font-semibold text-[#4e111b]">
                Protected areas
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Portal and form pages are not saved for offline access.
              </p>
            </div>

            <div className="rounded-2xl bg-[#faf7ef] p-5">
              <RefreshCw className="text-[#741f2b]" size={22} />

              <h2 className="mt-4 font-semibold text-[#4e111b]">
                Reconnect
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Reload the platform after the connection returns.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#741f2b] px-6 py-3.5 font-semibold text-white"
            >
              Try connecting again
              <RefreshCw size={18} />
            </Link>

            <Link
              href="/"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#741f2b]/25 px-6 py-3.5 font-semibold text-[#741f2b]"
            >
              Homepage
              <Home size={18} />
            </Link>

            <Link
              href="/news"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#741f2b]/25 px-6 py-3.5 font-semibold text-[#741f2b]"
            >
              Cached notices
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}