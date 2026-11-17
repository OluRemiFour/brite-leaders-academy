"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, LocationIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";

type SchoolEvent = {
  date: string;
  title: string;
  location: string;
  /** Leave undefined to show a placeholder until the photo is available. */
  image?: { src: string; alt: string };
};

// TODO: Replace the placeholder events (and add their photos to /public/images) with real ones.
const events: SchoolEvent[] = [
  {
    date: "September 20, 2026",
    title: "Science & Innovation Exhibition",
    location: "Brite Leaders Academy, Science building",
    image: { src: "/images/event-science-fair.png", alt: "Students demonstrating projects at the science fair" },
  },
  {
    date: "October 15, 2026",
    title: "Inter-House Sports Festival",
    location: "Brite Leaders Academy, Sports field",
  },
  {
    date: "December 12, 2026",
    title: "End of Year Prize Giving & Carol Service",
    location: "Brite Leaders Academy, Main hall",
  },
];

export function EventsCarousel() {
  const [index, setIndex] = useState(0);
  const total = events.length;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <section id="events" className="bg-mist py-16 sm:py-20 lg:pt-[90px] lg:pb-[142px]">
      <div className="container-site">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-[30px] leading-[1.3] font-medium text-ink sm:text-[40px]">
            What&apos;s Happening at Brite Leaders Academy?
          </h2>
          <p className="mt-5 text-lg leading-[1.45] text-ink sm:text-xl">
            Stay connected with the latest activities, celebrations, competitions, and important
            events happening across our school community.
          </p>
        </div>

        <div
          className="relative mx-auto mt-10 max-w-[1258px] overflow-hidden rounded-[15px] bg-navy lg:mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="School events"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {events.map((e, i) => (
              <div
                key={e.title}
                className="relative aspect-[4/5] w-full shrink-0 sm:aspect-[16/10] lg:aspect-[1256/552]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}
                aria-hidden={i !== index}
              >
                {e.image ? (
                  <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1280px) 1258px, 100vw" className="object-cover" />
                ) : (
                  <ImagePlaceholder label="Add event photo" className="absolute inset-0 pb-40" />
                )}
                <div aria-hidden className="absolute inset-0 bg-black/20" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 px-5 pb-28 text-white sm:px-10 lg:px-[58px] lg:pb-[90px]">
                  <p className="inline-flex items-center gap-2 rounded-[15px] border border-mist px-4 py-1.5 text-[15px]">
                    <CalendarIcon className="size-[18px] text-teal" />
                    <time>{e.date}</time>
                  </p>
                  <h3 className="mt-6 max-w-[340px] text-[26px] leading-[1.2] font-bold sm:text-[32px]">{e.title}</h3>
                  <p className="mt-6 flex items-center gap-2 text-[15px]">
                    <LocationIcon className="size-5 shrink-0 text-teal" />
                    {e.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls tab */}
          <div className="absolute bottom-0 left-1/2 flex h-[84px] w-[226px] -translate-x-1/2 items-center justify-center gap-10 rounded-t-[20px] bg-mist">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous event"
              className="grid size-[50px] place-items-center rounded-full border border-navy text-navy-deep transition-colors hover:bg-navy hover:text-white"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next event"
              className="grid size-[50px] place-items-center rounded-full border border-navy text-navy-deep transition-colors hover:bg-navy hover:text-white"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
