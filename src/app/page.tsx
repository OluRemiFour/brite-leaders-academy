import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Activities } from "@/components/home/Activities";
import { NextChapter } from "@/components/home/NextChapter";
import { EventsCarousel } from "@/components/home/EventsCarousel";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Activities />
        <NextChapter />
        <EventsCarousel />
        <AdmissionCTA />
      </main>
      <Footer />
    </>
  );
}
