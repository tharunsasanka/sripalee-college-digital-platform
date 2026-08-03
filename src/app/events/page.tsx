import { PageTransition } from "@/components/page-transition";

export default function Page() {
  return (
    <PageTransition>
      <main className="mx-auto min-h-[65vh] max-w-7xl px-5 py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">Sripalee College</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#4e111b] md:text-6xl">Events</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">Upcoming school activities, examinations, ceremonies and community events will be listed here.</p>
      </main>
    </PageTransition>
  );
}
