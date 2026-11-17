/**
 * Stand-in for an image that hasn't been supplied yet.
 * Replace by passing a real `image` to the parent component's data.
 */
export function ImagePlaceholder({ label = "Add image", className = "" }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={`grid place-items-center bg-[repeating-linear-gradient(45deg,#1d355c_0,#1d355c_14px,#172b4d_14px,#172b4d_28px)] text-white/70 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/40 px-6 py-4 text-center">
        <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="2" />
          <path d="m21 16-5-5-9 9" />
        </svg>
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}
