import Link from "next/link";
import { SCHOOL } from "@/lib/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { LogoMark } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";

const columns = [
  {
    title: "School",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Academics", href: "/#academics" },
      { label: "School Life", href: "/#school-life" },
      { label: "Events", href: "/#events" },
      { label: "Gallery", href: "#" }, // TODO: gallery page
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Admission Process", href: "/#admission" },
      { label: "Requirements", href: "/#admission" },
      { label: "School Fees", href: "/payment" },
      { label: "FAQs", href: "#" }, // TODO: FAQ page
    ],
  },
  {
    title: "Parents",
    links: [
      { label: "Parent Portal", href: "#" }, // TODO: parent portal URL
      { label: "Fee Payment", href: "/payment" },
      { label: "School Updates", href: "/#events" },
    ],
  },
];

const linkClass = "text-base text-white/90 transition-colors hover:text-teal";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy-deep text-white">
      {/* Decorative stepped bars (bottom-left in the design) */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 hidden w-[463px] flex-col gap-[3px] md:flex">
        <span className="h-[68px] w-[209px] rounded-r-[10px] bg-navy-stripe" />
        <span className="h-[68px] w-[340px] rounded-r-[10px] bg-navy-stripe" />
        <span className="h-[68px] w-[466px] rounded-r-[10px] bg-navy-stripe" />
      </div>

      <div className="container-site relative grid gap-12 pt-14 pb-10 md:pt-[68px] lg:grid-cols-[1.1fr_2fr]">
        <div>
          <div className="inline-block border-b border-teal pb-3">
            <div className="flex items-center gap-6">
              {/* Logo slot – the design shows a placeholder square here */}
              <div className="grid size-[90px] shrink-0 place-items-center rounded-sm bg-white sm:size-[107px]">
                <LogoMark size={64} />
              </div>
              <p className="text-[28px] leading-[1.35] font-medium sm:text-[32px]">
                Brite
                <br />
                Leaders
                <br />
                Academy
              </p>
            </div>
          </div>
          <p className="mt-2 max-w-[260px] text-xl leading-snug">{SCHOOL.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 xl:grid-cols-[auto_auto_auto_1fr] xl:gap-x-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xl font-semibold">{col.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Admissions" && (
                  <li>
                    <WhatsAppLink className={linkClass}>Enquire on WhatsApp</WhatsAppLink>
                  </li>
                )}
              </ul>
            </div>
          ))}

          <div className="col-span-2 space-y-10 sm:col-span-3 xl:col-span-1 xl:justify-self-end">
            <div>
              <h3 className="text-xl font-semibold">School Address</h3>
              <address className="mt-3 text-base not-italic text-white/90">
                {SCHOOL.addressLines[0]}
                <br />
                {SCHOOL.addressLines[1]}
              </address>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <ul className="mt-3 space-y-2">
                {SCHOOL.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className={linkClass}>
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl">Check out our socials</h3>
              <div className="mt-4 flex gap-4">
                <a href={SCHOOL.socials.instagram} aria-label="Instagram" className="hover:text-teal">
                  <InstagramIcon className="size-6" />
                </a>
                <a href={SCHOOL.socials.tiktok} aria-label="TikTok" className="hover:text-teal">
                  <TikTokIcon className="size-6" />
                </a>
                <a href={SCHOOL.socials.facebook} aria-label="Facebook" className="hover:text-teal">
                  <FacebookIcon className="size-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="relative pb-6 text-center text-base text-white/90 md:pb-8">
        © 2026 {SCHOOL.name}. All Rights Reserved.
      </p>
    </footer>
  );
}
