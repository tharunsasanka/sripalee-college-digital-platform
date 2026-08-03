import { PageTransition } from "@/components/page-transition";

export default function Page() {
  return (
    <PageTransition>
      <main className="site-page-theme mx-auto min-h-[65vh] max-w-7xl px-5 py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">Sripalee College</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#4e111b] md:text-6xl">News and Announcements</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">Official notices, school news, emergency announcements and publication documents will be managed here.</p>
      </main>
    </PageTransition>
  );
}
