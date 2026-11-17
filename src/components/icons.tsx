import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
      />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M15 5.5 8.7 10.8c-.9.7-.9 1.7 0 2.4L15 18.5" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 5.5 15.3 10.8c.9.7.9 1.7 0 2.4L9 18.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 15c0-2.83 0-4.24.88-5.12C10.76 9 12.17 9 15 9h1c2.83 0 4.24 0 5.12.88.88.88.88 2.29.88 5.12v1c0 2.83 0 4.24-.88 5.12-.88.88-2.29.88-5.12.88h-1c-2.83 0-4.24 0-5.12-.88C9 20.24 9 18.83 9 16v-1Z" />
      <path d="M17 9c0-2.96-.04-4.49-.9-5.53a3 3 0 0 0-.42-.42C14.6 2 12.98 2 9.75 2 6.51 2 4.9 2 3.82 2.88c-.16.13-.3.28-.42.42C2.5 4.38 2.5 6 2.5 9.25c0 3.23 0 4.85.89 5.93.12.15.27.29.42.42C4.85 16.46 6.37 16.5 9.33 16.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M17 2v4M7 2v4" />
      <path d="M13 4h-2C7.23 4 5.34 4 4.17 5.17 3 6.34 3 8.23 3 12v2c0 3.77 0 5.66 1.17 6.83C5.34 22 7.23 22 11 22h2c3.77 0 5.66 0 6.83-1.17C21 19.66 21 17.77 21 14v-2c0-3.77 0-5.66-1.17-6.83C18.66 4 16.77 4 13 4Z" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14.5 9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
      <path d="M13.26 17.49a1.8 1.8 0 0 1-2.51 0C7.65 14.5 3.52 11.16 5.53 6.3 6.63 3.68 9.25 2 12 2s5.38 1.68 6.47 4.3c2.01 4.85-2.11 8.21-5.21 11.19Z" />
      <path d="M18 20c0 1.1-2.69 2-6 2s-6-.9-6-2" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M2.5 12c0-4.24 0-6.36 1.32-7.68C5.14 3 7.26 3 11.5 3h1c4.24 0 6.36 0 7.68 1.32C21.5 5.64 21.5 7.76 21.5 12s0 6.36-1.32 7.68C18.86 21 16.74 21 12.5 21h-1c-4.24 0-6.36 0-7.68-1.32C2.5 18.36 2.5 16.24 2.5 12Z" />
      <path d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      <path d="M17.51 6.5h-.01" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M2.5 12c0-4.48 0-6.72 1.39-8.11C5.28 2.5 7.52 2.5 12 2.5s6.72 0 8.11 1.39C21.5 5.28 21.5 7.52 21.5 12s0 6.72-1.39 8.11C18.72 21.5 16.48 21.5 12 21.5s-6.72 0-8.11-1.39C2.5 18.72 2.5 16.48 2.5 12Z" />
      <path d="M10.54 11.01c-.82-.12-2.69.07-3.61 1.77-.92 1.7.01 3.46.58 4.13.58.63 2.38 1.82 4.29.66.47-.29 1.06-.5 1.73-2.75l-.08-8.46c.13 1.09 1.28 2.91 4 3.15" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M2.5 12c0-4.48 0-6.72 1.39-8.11C5.28 2.5 7.52 2.5 12 2.5s6.72 0 8.11 1.39C21.5 5.28 21.5 7.52 21.5 12s0 6.72-1.39 8.11C18.72 21.5 16.48 21.5 12 21.5s-6.72 0-8.11-1.39C2.5 18.72 2.5 16.48 2.5 12Z" />
      <path d="M16.93 8.03h-2.95c-1.05 0-1.9.84-1.9 1.89l-.03 4.08m0 0L12 21.43M12.05 14H10.08m1.97 0h2.83" />
    </svg>
  );
}

export function QuestionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M10 9a2 2 0 1 1 3.36 1.46c-.6.57-1.36 1.21-1.36 2.04M12.13 15.75H12m.25 0a.25.25 0 1 1-.5 0 .25.25 0 0 1 .5 0Z" />
      <path d="M8 19.5C5.1 18.6 3 16 3 12.5c0-4.97 4.03-8.5 9-8.5s9 3.53 9 8.5c0 4.97-4.03 8.5-9 8.5-1.1 0-2.38-.24-3.4-.6L5 22l1-2.8" />
    </svg>
  );
}

export function FolderUploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M20 16c-.59-.61-2.16-3-3-3s-2.41 2.39-3 3m3-2v7" />
      <path d="M13 21h-3c-4.72 0-7.07 0-8.54-1.46C0 18.07 0 15.71 0 11V7.94c0-1.82 0-2.72.38-3.4.27-.49.67-.89 1.16-1.16C2.22 3 3.13 3 4.95 3c1.16 0 1.74 0 2.25.19 1.16.44 1.64 1.5 2.17 2.54L10 7m0 0H6m4 0h4.75c2.11 0 3.16 0 3.92.51.33.22.61.5.83.83.45.67.5 1.56.5 3.16" transform="translate(2 0)" />
    </svg>
  );
}

export function ClipboardCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M8 3.5c-1.56.05-2.48.22-3.13.86C4 5.24 4 6.66 4 9.49v6.5c0 2.83 0 4.25.88 5.13.88.88 2.29.88 5.12.88h5c2.83 0 4.24 0 5.12-.88.88-.88.88-2.3.88-5.13v-6.5c0-2.83 0-4.25-.88-5.13-.64-.64-1.57-.81-3.13-.86" />
      <path d="M8 3.75C8 2.78 8.78 2 9.75 2h5.5C16.22 2 17 2.78 17 3.75s-.78 1.75-1.75 1.75h-5.5C8.78 5.5 8 4.72 8 3.75Z" />
      <path d="M7 10h4M14 11s.5 0 1 1c0 0 1.59-2.5 3-3M7 16h4M14 17s.5 0 1 1c0 0 1.59-2.5 3-3" />
    </svg>
  );
}

export function GraduationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M19 15c0 1.86 0 2.8-.3 3.53a3 3 0 0 1-1.62 1.62C16.34 20.5 15.4 20.5 13.5 20.5h-3c-3.77 0-5.66 0-6.83-1.17C2.5 18.16 2.5 16.27 2.5 12.5V7.5a4 4 0 0 1 4-4" />
      <path d="m9.5 9 .43 3.97c.04.33.25.62.56.75.68.3 1.97.78 3.01.78 1.04 0 2.33-.48 3.01-.78.31-.13.52-.42.56-.75L17.5 9M20 8v3.77M13.5 4.5l-7 3 7 3 7-3-7-3Z" />
    </svg>
  );
}
