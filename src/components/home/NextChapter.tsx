import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { ClipboardCheckIcon, FolderUploadIcon, GraduationIcon, QuestionIcon } from "@/components/icons";
import { btnPrimary } from "@/components/site/Button";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

type Step = {
  n: string;
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  bg: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Make an Enquiry",
    body: "Reach out on WhatsApp or visit us to learn about available classes.",
    Icon: QuestionIcon,
    bg: "bg-teal/25",
  },
  {
    n: "02",
    title: "Submit Application",
    body: "Complete the application form and provide the required documents.",
    Icon: FolderUploadIcon,
    bg: "bg-teal/40",
  },
  {
    n: "03",
    title: "Assessment / Interview",
    body: "Your child sits a short assessment and meets our admissions team.",
    Icon: ClipboardCheckIcon,
    bg: "bg-teal/60",
  },
  {
    n: "04",
    title: "Receive Admission Offer",
    body: "Successful candidates receive an offer letter and enrolment details.",
    Icon: GraduationIcon,
    bg: "bg-teal",
  },
];

const programmes = [
  {
    title: "Junior Secondary",
    subtitle: "Building Strong Foundations",
    body: "Students develop essential knowledge, critical thinking skills, confidence, and positive learning habits.",
    cta: "Explore JSS",
    bg: "bg-[linear-gradient(213deg,#172B4D_-30%,#ffffff_55%)]",
  },
  {
    title: "Senior Secondary",
    subtitle: "Preparing for What's Next",
    body: "Students prepare for examinations, and develop the skills needed for higher education and future careers.",
    cta: "Explore SSS",
    bg: "bg-[linear-gradient(180deg,#ffffff_0%,#00CED1_100%)]",
  },
];

export function NextChapter() {
  return (
    <section id="admission" className="bg-white">
      <div className="container-site flex flex-col gap-6 py-10 lg:flex-row lg:items-start lg:justify-between lg:pt-[42px] lg:pb-[25px]">
        <h2 className="max-w-[520px] text-[32px] leading-[1.3] font-medium text-ink sm:text-[40px]">
          Your Child&apos;s Next Chapter Starts Here.
        </h2>
        <div className="max-w-[534px]">
          <p className="text-lg leading-[1.45] text-ink sm:text-xl">
            Thinking about joining Brite Leaders Academy? Discover our admission process,
            requirements, available classes, and everything you need to take the next step.
          </p>
          <WhatsAppLink className={`${btnPrimary} mt-4 w-full px-4 text-xl sm:w-auto`}>
            Begin Admission process
          </WhatsAppLink>
        </div>
      </div>

      <ol className="grid sm:grid-cols-2 xl:grid-cols-4">
        {steps.map(({ n, title, body, Icon, bg }) => (
          <li key={n} className={`relative min-h-[220px] px-6 pt-6 pb-10 sm:min-h-[254px] xl:px-[45px] ${bg}`}>
            <span aria-hidden className="absolute top-3 right-6 text-[56px] leading-none font-medium text-white sm:text-[64px] xl:right-9">
              {n}
            </span>
            <div className="mt-[96px] flex gap-4">
              <span className="grid h-[31px] w-[34px] shrink-0 place-items-center rounded-[5px] bg-mist text-gold">
                <Icon className="size-5" />
              </span>
              <div className="font-inter">
                <h3 className="text-xl font-medium text-ink">
                  <span className="sr-only">Step {n}: </span>
                  {title}
                </h3>
                <p className="mt-3 max-w-[240px] text-base leading-[1.2] text-ink">{body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div id="academics" className="relative isolate overflow-hidden">
        <Image
          src="/images/campus-aerial.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(218deg,rgba(0,206,209,0)_30%,#172B4D_100%)] mix-blend-hard-light"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,43,77,0.45)_0%,rgba(23,43,77,0)_45%)] lg:hidden" />

        <div className="container-site pt-16 pb-16 lg:pt-[78px] lg:pb-[134px]">
          <h2 className="max-w-[480px] text-[32px] leading-[1.3] font-medium text-white sm:text-[40px]">
            Learning That Prepares Students for More
          </h2>
          <p className="mt-6 max-w-[490px] text-lg leading-[1.45] text-white sm:text-xl">
            Our academic programmes are designed to build strong foundations, encourage curiosity,
            and prepare students for the next stage of their educational journey.
          </p>

          <div className="mx-auto mt-12 grid max-w-[1245px] gap-5 md:grid-cols-2 lg:mt-16">
            {programmes.map((p) => (
              <article
                key={p.title}
                className={`flex min-h-[360px] flex-col justify-end rounded-[15px] p-7 font-inter sm:p-[43px] lg:min-h-[468px] ${p.bg}`}
              >
                <h3 className="text-[28px] font-medium text-ink sm:text-[32px]">{p.title}</h3>
                <p className="mt-5 text-xl font-semibold text-ink">{p.subtitle}</p>
                <p className="mt-5 max-w-[430px] text-base leading-[1.2] text-ink">{p.body}</p>
                <WhatsAppLink className={`${btnPrimary} mt-7 w-full text-xl sm:w-[217px]`}>{p.cta}</WhatsAppLink>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
