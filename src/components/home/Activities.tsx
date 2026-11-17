"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const activities = [
  {
    title: "Creative Arts",
    body: "Discover creativity through music, art, drama and more.",
    src: "/images/activity-creative-arts.png",
    alt: "Students painting in the art studio",
  },
  {
    title: "Clubs & Societies",
    body: "Explore interests beyond the classroom.",
    src: "/images/activity-clubs.png",
    alt: "Student presenting at a careers club event",
  },
  {
    title: "Sports & Athletics",
    body: "Building teamwork, discipline and healthy competition.",
    src: "/images/activity-sports.png",
    alt: "Student athlete crossing the finish line at inter-house sports",
  },
  {
    title: "Leadership",
    body: "Opportunities to develop confidence and responsibility.",
    src: "/images/hero-student.png",
    alt: "Student leader holding textbooks on campus",
  },
  {
    title: "Excursions",
    body: "Educational trips that bring classroom lessons to life.",
    src: "/images/activity-excursions.png",
    alt: "Students on an educational excursion with a teacher",
  },
];

const n = activities.length;
const half = Math.floor(n / 2);

// Desktop coverflow geometry, from the design (center card 331px, neighbours scaled down).
const SCALE = [1, 0.915, 0.834];
const SHIFT = ["0px", "min(290px, 21vw)", "min(545px, 39vw)"];

export function Activities() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: 1 | -1) => setActive((a) => (a + dir + n) % n), []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), 4500);
    return () => window.clearInterval(id);
  }, [paused, go]);

  return (
    <section id="school-life" className="overflow-hidden bg-mist py-16 sm:py-20 lg:pt-[62px] lg:pb-[120px]">
      <div className="container-site text-center">
        <h2 className="text-[30px] leading-[1.3] font-medium text-ink sm:text-[40px]">
          Learning Doesn&apos;t Stop at the Classroom Door.
        </h2>
        <p className="mx-auto mt-5 max-w-[840px] text-lg leading-[1.45] text-ink sm:text-xl">
          From sports and clubs to competitions, celebrations, and creative activities, students
          have opportunities to explore their interests, build friendships, and discover new
          strengths.
        </p>
      </div>

      {/* Mobile / tablet: swipeable row */}
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-8 lg:hidden">
        {activities.map((a) => (
          <li key={a.title} className="w-[78%] max-w-[320px] shrink-0 snap-center">
            <Card a={a} />
          </li>
        ))}
      </ul>

      {/* Desktop: coverflow */}
      <div
        className="relative mt-[78px] hidden h-[474px] lg:block"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="School life activities"
      >
        {activities.map((a, i) => {
          const offset = ((i - active + n + half) % n) - half; // -2 … 2
          const d = Math.abs(offset);
          const sign = offset < 0 ? "-" : "";
          return (
            <button
              key={a.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${a.title}${d === 0 ? " (current)" : ""}`}
              aria-current={d === 0}
              className="absolute top-0 left-1/2 w-[clamp(250px,22vw,331px)] cursor-pointer text-left transition-[transform,filter] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-teal"
              style={{
                transform: `translateX(-50%) translateX(calc(${sign}1 * ${SHIFT[d]})) scale(${SCALE[d]})`,
                zIndex: 10 - d,
              }}
            >
              <Card a={a} emphasised={d === 0} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Card({ a, emphasised = false }: { a: (typeof activities)[number]; emphasised?: boolean }) {
  return (
    <article
      className={`overflow-hidden rounded-[15px] bg-white font-inter transition-shadow ${
        emphasised ? "shadow-[0_18px_40px_-20px_rgba(23,43,77,0.45)]" : ""
      }`}
    >
      <div className="relative aspect-[331/315] bg-teal">
        <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 331px, 78vw" className="object-cover" />
      </div>
      <div className="px-6 pt-6 pb-10 lg:min-h-[159px]">
        <h3 className="text-xl font-medium text-ink">{a.title}</h3>
        <p className="mt-4 text-base leading-[1.2] text-ink">{a.body}</p>
      </div>
    </article>
  );
}
