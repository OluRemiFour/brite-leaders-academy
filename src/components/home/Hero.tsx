"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { btnOutline, btnPrimary } from "@/components/site/Button";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const slides = [
  { src: "/images/hero-student.png", alt: "Smiling Brite Leaders student holding textbooks on campus" },
  { src: "/images/hero-science.png", alt: "Student using a microscope in the science laboratory" },
  { src: "/images/hero-pottery.png", alt: "Student shaping clay on a pottery wheel in the art studio" },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  // Order the stack so the active slide is in front, the next ones peek out behind it.
  const order = slides.map((_, i) => (i - active + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Cyan waves */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[58%] w-full sm:h-[62%] lg:h-[56%]"
        viewBox="0 490 1728 627"
        preserveAspectRatio="none"
      >
        <path
          d="M0 632.948C0 625.838 6.64294 620.596 13.5576 622.249L566.559 754.448C601.579 762.82 638.348 759.924 671.626 746.172L1265.11 500.921C1291.06 490.195 1320.43 491.503 1345.33 504.495L1723.94 702.037C1728.89 704.623 1732 709.748 1732 715.336V1117H0V632.948Z"
          fill="#00CED1"
          fillOpacity="0.4"
        />
        <path
          d="M0 672.948C0 665.838 6.64294 660.596 13.5576 662.249L566.559 794.448C601.579 802.82 638.348 799.924 671.626 786.172L1265.11 540.921C1291.06 530.195 1320.43 531.503 1345.33 544.495L1723.94 742.037C1728.89 744.623 1732 749.748 1732 755.336V1117H0V672.948Z"
          fill="#00CED1"
          fillOpacity="0.5"
        />
      </svg>

      <div className="container-site relative grid items-center gap-10 pt-10 pb-8 md:pt-14 lg:grid-cols-[1fr_auto] lg:pt-14">
        <div className="max-w-[640px] lg:pb-16">
          <h1 className="text-[40px] leading-[1.25] font-medium tracking-tight text-ink sm:text-5xl lg:text-[64px] lg:leading-[1.3]">
            Welcome to Brite Leaders Academy
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.3] text-black sm:text-xl lg:mt-10">
            We provide a supportive and inspiring learning environment where students develop
            academically, build strong character, and gain the confidence to shape their future.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-11">
            <Link href="/payment" className={`${btnPrimary} w-full sm:w-[217px]`}>
              Proceed to pay
            </Link>
            <WhatsAppLink className={`${btnOutline} w-full sm:w-[190px]`}>Make enquiries</WhatsAppLink>
          </div>
        </div>

        {/* Stacked image cards */}
        <div className="relative mx-auto w-full max-w-[450px] lg:mx-0 lg:mt-0 lg:w-[450px]">
          <div className="relative aspect-[414/648] w-[92%]">
            {slides.map((s, i) => {
              const pos = order[i]; // 0 = front
              return (
                <div
                  key={s.src}
                  className="absolute inset-0 overflow-hidden rounded-[18px] rounded-l-[17px] transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${pos * 4.6}%)`,
                    zIndex: slides.length - pos,
                  }}
                  aria-hidden={pos !== 0}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    preload={i === 0}
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="object-cover"
                    style={{ objectPosition: "50% 50%" }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center gap-2 lg:hidden" role="tablist" aria-label="Hero images">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-navy" : "w-2 bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative pb-16 text-center text-ink sm:pb-24 lg:-mt-24 lg:pb-[120px]">
        <p className="text-3xl sm:text-4xl lg:text-[40px]">15+ Years</p>
        <p className="mt-1 text-4xl sm:text-5xl lg:text-[60px] lg:leading-[1.25]">of Nurturing</p>
        <p className="mt-1 text-4xl font-bold sm:text-5xl lg:text-[60px] lg:leading-[1.25]">Future Leaders</p>
      </div>
    </section>
  );
}
