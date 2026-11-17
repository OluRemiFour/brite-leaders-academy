/** Shared button styles taken from the design: 45px tall, 10px radius. */
export const btn = {
  base: "inline-flex h-[45px] items-center justify-center rounded-[10px] px-6 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-60",
  primary: "bg-navy text-white hover:bg-[#21396a]",
  outline: "border border-teal bg-white text-ink hover:bg-teal-soft",
};

export const btnPrimary = `${btn.base} ${btn.primary}`;
export const btnOutline = `${btn.base} ${btn.outline}`;
