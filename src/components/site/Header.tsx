"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";
import { btnPrimary } from "./Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/payment" ? pathname === "/payment" : false);

  return (
    <header className="sticky top-0 z-50 bg-mist">
      <div className="container-site flex h-[70px] items-center justify-between gap-4 lg:h-[78px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-[22px] lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors hover:text-teal ${
                isActive(link.href) ? "font-medium text-teal" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-8">
          <WhatsAppLink
            aria-label="Enquire on WhatsApp"
            className="grid size-11 place-items-center rounded-full bg-white shadow-sm transition-transform hover:scale-105 lg:size-[57px]"
          >
            <span className="grid size-[30px] place-items-center rounded-full bg-whatsapp text-white lg:size-[39px]">
              <WhatsAppIcon className="size-[18px] lg:size-[22px]" />
            </span>
          </WhatsAppLink>
          <WhatsAppLink className={`${btnPrimary} w-[217px] max-lg:hidden`}>
            Make Enquiries
          </WhatsAppLink>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-navy lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-7" /> : <MenuIcon className="size-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[70px] bottom-0 z-40 overflow-y-auto bg-mist lg:hidden"
        >
          <nav aria-label="Mobile" className="container-site flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg text-ink"
              >
                {link.label}
              </Link>
            ))}
            <WhatsAppLink className={`${btnPrimary} mt-6 w-full`} onClick={() => setOpen(false)}>
              Make Enquiries
            </WhatsAppLink>
          </nav>
        </div>
      )}
    </header>
  );
}
