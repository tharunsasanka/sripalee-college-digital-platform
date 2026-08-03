import { Hero } from "@/components/hero";
import HomeAtmosphere from "@/components/home/home-atmosphere";
import { HomeSections } from "@/components/home/home-sections";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <main className="home-heritage-theme relative isolate overflow-hidden">
        <HomeAtmosphere />

        <div className="home-content relative z-10">
          <Hero />
          <HomeSections />
        </div>
      </main>
    </PageTransition>
  );
}