import type { ReactNode } from "react";
import { LogoMark } from "@/components/site/Logo";
import { SCHOOL } from "@/lib/site";
import { FEES, formatNaira } from "@/lib/payment";
import type { PaymentForm } from "./PaymentFlow";

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,170px)_1fr] gap-3 py-1 text-base text-black sm:text-lg">
      <dt>{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="mb-1.5 text-lg font-semibold text-teal sm:text-xl">{title}</h3>
      <dl>{children}</dl>
    </section>
  );
}

export function PaymentSummary({ form, total }: { form: PaymentForm; total: number }) {
  const hasStudent = form.studentName || form.studentClass || form.classArm;
  const hasParent = form.parentPhone || form.parentEmail;
  const fees = FEES.filter((f) => form.feeIds.includes(f.id));
  const isEmpty = !hasStudent && !hasParent;

  return (
    <aside
      aria-label="Payment summary"
      className="relative rounded-[15px] bg-mist px-5 pt-6 pb-10 sm:px-16 sm:pt-7 lg:min-h-[856px]"
    >
      <h2 className="text-center text-xl font-semibold text-teal sm:absolute sm:top-8 sm:right-8 sm:text-[22px]">
        Payment summary
      </h2>

      <header className="mt-4 flex flex-col items-center border-b-2 border-[#5f6b80]/70 pb-2 text-center sm:mt-0">
        <LogoMark size={72} />
        <p className="mt-5 text-xl text-black">{SCHOOL.name}</p>
        <p className="mt-1 text-xs text-navy">{SCHOOL.address}</p>
        <p className="mt-1.5 text-xs text-black italic">{SCHOOL.receiptTagline}</p>
      </header>

      {isEmpty ? (
        <div className="grid min-h-[260px] place-items-center lg:min-h-[480px]" aria-live="polite">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 items-center gap-1.5" aria-hidden>
              <span className="summary-bar h-8 w-2.5 bg-[#C0BABA]/70" style={{ animationDelay: "0s" }} />
              <span className="summary-bar h-16 w-2.5 bg-teal" style={{ animationDelay: "0.15s" }} />
              <span className="summary-bar h-11 w-2.5 bg-[#C0BABA]/70" style={{ animationDelay: "0.3s" }} />
            </div>
            <p className="text-sm text-[#978D8D]">Your payment details will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-6" aria-live="polite">
          {hasStudent && (
            <Group title="Student Information">
              <Row label="Student’s name:" value={form.studentName || "—"} />
              <Row label="Student’s class:" value={form.studentClass || "—"} />
              <Row label="Class arm:" value={form.classArm || "—"} />
            </Group>
          )}
          {hasParent && (
            <Group title="Parent’s Information">
              <Row label="Parent’s phone number" value={form.parentPhone || "—"} />
              <Row label="Parent’s Email" value={form.parentEmail || "—"} />
            </Group>
          )}
          {(form.session || form.term || fees.length > 0) && (
            <Group title="Fee Details">
              {form.session && <Row label="Session" value={form.session.replace(" Academic Session", "")} />}
              {form.term && <Row label="Term" value={form.term} />}
              {fees.map((f) => (
                <Row key={f.id} label={f.name} value={formatNaira(f.amount)} />
              ))}
              {fees.length > 0 && (
                <div className="mt-3 grid grid-cols-[minmax(0,170px)_1fr] gap-3 border-t border-[#C0BABA] pt-3 text-lg font-semibold text-ink sm:text-xl">
                  <dt>Total</dt>
                  <dd>{formatNaira(total)}</dd>
                </div>
              )}
            </Group>
          )}
        </div>
      )}
    </aside>
  );
}
