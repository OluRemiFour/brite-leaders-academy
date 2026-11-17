import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "@/components/icons";

const control =
  "h-[47px] w-full rounded-[5px] border bg-white px-5 text-base text-ink placeholder:text-[#978D8D] transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25 sm:px-7";

export function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-3 block text-lg font-medium text-ink sm:mb-4 sm:text-xl">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ invalid, ...props }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${props.id}-error` : undefined}
      className={`${control} ${invalid ? "border-red-400" : "border-line"} ${props.className ?? ""}`}
    />
  );
}

export function Select({
  invalid,
  placeholder,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${props.id}-error` : undefined}
        className={`${control} appearance-none pr-12 ${props.value ? "text-ink" : "text-[#978D8D]"} ${
          invalid ? "border-red-400" : "border-line"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-ink" />
    </div>
  );
}
