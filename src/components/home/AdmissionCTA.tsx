import Image from "next/image";
import { btnPrimary } from "@/components/site/Button";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

export function AdmissionCTA() {
  return (
    <section className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-[81px]">
      <Image src="/images/campus-aerial.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_70%]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(0,206,209,0)_40%,#172B4D_120%)] mix-blend-hard-light"
      />
      <div className="container-site">
        <div className="mx-auto flex max-w-[1220px] flex-col items-center rounded-[15px] bg-white px-6 py-14 text-center sm:py-20 lg:min-h-[468px] lg:justify-center">
          <h2 className="max-w-[440px] text-[28px] leading-[1.4] font-medium text-black sm:text-[32px]">
            Ready to begin the journey to a brighter future
          </h2>
          <p className="mt-6 max-w-[440px] font-inter text-base leading-[1.2] text-ink">
            Give your child an environment where they can learn with confidence, grow with
            purpose, and prepare for the future.
          </p>
          <WhatsAppLink className={`${btnPrimary} mt-10 w-full text-xl sm:w-[217px]`}>Explore JSS</WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
