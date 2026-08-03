import { Hero } from "@/components/hero";
import { HomeSections } from "@/components/home/home-sections";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <HomeSections />
      </main>
    </PageTransition>
  );
}
