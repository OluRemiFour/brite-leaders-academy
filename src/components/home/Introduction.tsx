import Image from "next/image";

const stats = [
  { value: "1200+", label: "Students" },
  { value: "50+", label: "Dedicated Teachers" },
  { value: "15+", label: "Years of Experience" },
  { value: "95%+", label: "Academic Success" },
];

type Feature = {
  title: string;
  body: string;
  image?: { src: string; alt: string };
  tone?: "navy" | "teal";
  className: string;
};

const features: Feature[][] = [
  [
    {
      title: "Academic Excellence",
      body: "A structured learning environment designed to help students achieve their academic potential.",
      image: { src: "/images/academic-excellence.png", alt: "Students learning in a Brite Leaders classroom" },
      className: "md:flex-[798]",
    },
    {
      title: "Character & Values",
      body: "We nurture responsible, disciplined, respectful, and confident young people.",
      tone: "navy",
      className: "md:flex-[349]",
    },
  ],
  [
    {
      title: "Dedicated Teachers",
      body: "Passionate educators committed to understanding and supporting every learner.",
      tone: "teal",
      className: "md:flex-[418]",
    },
    {
      title: "A Thriving Community",
      body: "A school community where students, teachers, and parents work together.",
      image: { src: "/images/thriving-community.png", alt: "Students studying together outdoors on campus" },
      className: "md:flex-[729]",
    },
  ],
];

function FeatureCard({ f }: { f: Feature }) {
  const bg = f.image ? "bg-navy text-white" : f.tone === "navy" ? "bg-navy text-white" : "bg-teal text-ink";
  return (
    <article
      className={`relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[15px] p-6 font-inter sm:min-h-[305px] md:p-[38px] md:pb-[26px] ${bg} ${f.className}`}
    >
      {f.image && (
        <>
          <Image
            src={f.image.src}
            alt={f.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
        </>
      )}
      <div className="relative max-w-[480px]">
        <h3 className="text-xl font-semibold">{f.title}</h3>
        <p className="mt-4 text-base leading-[1.2]">{f.body}</p>
      </div>
    </article>
  );
}

export function Introduction() {
  return (
    <section id="about" className="bg-mist py-16 sm:py-20 lg:pt-[110px] lg:pb-[110px]">
      <div className="mx-auto grid max-w-[1376px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-[682fr_694fr] lg:gap-11 xl:px-0">
        {/* Image collage */}
        <div className="relative mx-auto aspect-[682/671] w-full max-w-[682px]">
          <div className="absolute top-[15.35%] left-[8.36%] h-[76.75%] w-[64.08%] overflow-hidden rounded-[15px]">
            <Image
              src="/images/intro-gate.png"
              alt="Main gate of Brite Leaders Academy"
              fill
              sizes="(min-width: 1024px) 440px, 64vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 left-[63.49%] h-[43.96%] w-[36.51%] overflow-hidden rounded-[15px]">
            <Image
              src="/images/intro-building.png"
              alt="Students walking outside the Brite Leaders Academy building"
              fill
              sizes="(min-width: 1024px) 250px, 37vw"
              className="object-cover"
            />
          </div>
          <svg
            aria-hidden
            viewBox="215 634 125 147"
            className="absolute top-[78.09%] left-0 h-[21.91%] w-[18.33%] text-navy"
          >
            <path
              fill="currentColor"
              d="M215 646.25C215 639.485 220.485 634 227.25 634C234.015 634 239.5 639.485 239.5 646.25V744.5C239.5 752.784 246.216 759.5 254.5 759.5H329.25C335.187 759.5 340 764.313 340 770.25C340 776.187 335.187 781 329.25 781H230C221.716 781 215 774.284 215 766V646.25Z"
            />
          </svg>
          <span
            aria-hidden
            className="absolute top-[56.04%] left-[84.6%] h-[11.62%] w-[7.18%] rounded-[15px] bg-teal"
          />
        </div>

        {/* Copy + stats */}
        <div>
          <h2 className="text-[32px] leading-[1.3] font-medium text-ink sm:text-[40px]">
            More Than a School. A Place to Become.
          </h2>
          <p className="mt-6 max-w-[565px] text-lg leading-[1.45] text-ink sm:text-xl">
            At Brite Leaders Academy, education goes beyond the classroom. We create an environment
            where students are encouraged to think independently, discover their strengths, build
            meaningful relationships, and develop the discipline and values needed for life beyond
            school.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-y-6 rounded-[10px] bg-white px-4 py-6 sm:grid-cols-4 sm:gap-y-0 lg:max-w-[650px]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-2 text-center ${
                  i > 0 ? "sm:border-l sm:border-black" : ""
                } ${i % 2 === 1 ? "border-l border-black sm:border-l" : ""}`}
              >
                <dt className="order-2 mt-1 max-w-[100px] text-[15px] leading-[1.3] text-ink">{s.label}</dt>
                <dd className="order-1 text-[34px] leading-none font-medium text-ink sm:text-[40px]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Why families choose us */}
      <div className="mx-auto mt-20 max-w-[1175px] px-4 sm:px-8 lg:mt-[150px] xl:px-0">
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="text-[32px] leading-[1.3] font-medium text-ink sm:text-[40px]">
            Why Families choose Brite Leaders Academy
          </h2>
          <p className="mt-5 text-lg leading-[1.45] text-ink sm:text-xl">
            We combine academic excellence with character, creativity, and a supportive community
            to give every student room to thrive.
          </p>
        </div>
        <div className="mt-12 space-y-7">
          {features.map((row, r) => (
            <div key={r} className="flex flex-col gap-7 md:flex-row">
              {row.map((f) => (
                <FeatureCard key={f.title} f={f} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
