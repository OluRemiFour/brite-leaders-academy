import Image from "next/image";
import Link from "next/link";
import { SCHOOL } from "@/lib/site";

export function LogoMark({ size = 38, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.svg"
      alt=""
      width={size}
      height={Math.round(size * (88 / 75))}
      className={className}
      unoptimized
    />
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${SCHOOL.name} home`}>
      <LogoMark size={38} />
      <span className="text-xl font-medium text-ink sm:text-[22px]">{SCHOOL.shortName}</span>
    </Link>
  );
}
