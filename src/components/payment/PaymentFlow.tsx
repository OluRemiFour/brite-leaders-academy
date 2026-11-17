"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { btnOutline, btnPrimary } from "@/components/site/Button";
import { CheckIcon } from "@/components/icons";
import {
  ARMS,
  CLASSES,
  FEES,
  PAYMENT_METHODS,
  SESSIONS,
  TERMS,
  formatNaira,
  type PaymentMethod,
} from "@/lib/payment";
import { Field, Select, TextInput } from "./fields";
import { PaymentSummary } from "./PaymentSummary";
import { BankTransfer, CardPayment, UssdPayment } from "./methods";

export type PaymentForm = {
  studentName: string;
  studentClass: string;
  classArm: string;
  parentPhone: string;
  parentEmail: string;
  session: string;
  term: string;
  feeIds: string[];
};

type Step = "student" | "fees" | "method" | "pay" | "done";

const STEP_META: Record<Step, { label: string; progress: number }> = {
  student: { label: "Student Information", progress: 1 },
  fees: { label: "Fee Details", progress: 2 },
  method: { label: "Payment method", progress: 3 },
  pay: { label: "Payment method", progress: 3 },
  done: { label: "Confirmation", progress: 4 },
};

const initialForm: PaymentForm = {
  studentName: "",
  studentClass: "",
  classArm: "",
  parentPhone: "",
  parentEmail: "",
  session: SESSIONS[0],
  term: "",
  feeIds: ["tuition"],
};

type Errors = Partial<Record<keyof PaymentForm, string>>;

function validateStudent(f: PaymentForm): Errors {
  const e: Errors = {};
  if (f.studentName.trim().length < 2) e.studentName = "Enter the student’s full name.";
  if (!f.studentClass) e.studentClass = "Select a class.";
  if (!f.classArm) e.classArm = "Select an arm.";
  if (!/^\+?\d{10,14}$/.test(f.parentPhone.replace(/[\s-]/g, ""))) e.parentPhone = "Enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.parentEmail.trim())) e.parentEmail = "Enter a valid email address.";
  return e;
}

function validateFees(f: PaymentForm): Errors {
  const e: Errors = {};
  if (!f.session) e.session = "Select an academic session.";
  if (!f.term) e.term = "Select a term.";
  if (f.feeIds.length === 0) e.feeIds = "Choose at least one fee.";
  return e;
}

export type Receipt = { reference: string; method: PaymentMethod; status: "paid" | "pending" };

export function PaymentFlow() {
  const [step, setStep] = useState<Step>("student");
  const [form, setForm] = useState<PaymentForm>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const total = useMemo(
    () => FEES.filter((f) => form.feeIds.includes(f.id)).reduce((sum, f) => sum + f.amount, 0),
    [form.feeIds],
  );

  const update = <K extends keyof PaymentForm>(key: K, value: PaymentForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const goTo = (next: Step) => {
    setStep(next);
    setErrors({});
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitStudent = () => {
    const e = validateStudent(form);
    setErrors(e);
    if (Object.keys(e).length === 0) goTo("fees");
  };

  const submitFees = () => {
    const e = validateFees(form);
    setErrors(e);
    if (Object.keys(e).length === 0) goTo("method");
  };

  const complete = (status: Receipt["status"]) => {
    const reference = `BLA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setReceipt({ reference, method, status });
    goTo("done");
  };

  const toggleFee = (id: string) =>
    update("feeIds", form.feeIds.includes(id) ? form.feeIds.filter((x) => x !== id) : [...form.feeIds, id]);

  const meta = STEP_META[step];
  const showBackCrumb = step === "method" || step === "pay";

  return (
    <div ref={topRef} className="container-site scroll-mt-24 pt-8 pb-16 lg:pt-[42px] lg:pb-[103px]">
      <nav aria-label="Breadcrumb" className="text-[15px]">
        {showBackCrumb ? (
          <button
            type="button"
            onClick={() => goTo(step === "pay" ? "method" : "fees")}
            className="text-[#757575] hover:text-teal"
          >
            Back
          </button>
        ) : (
          <Link href="/" className="text-[#757575] hover:text-teal">
            Home
          </Link>
        )}
        <span className="text-ink">/ Payment</span>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,665px)_1px_minmax(0,696px)] lg:justify-between lg:gap-10">
        <div>
          <h1 className="text-[34px] font-medium text-ink sm:text-[40px]">Pay School fees</h1>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
            <p className="text-lg text-ink sm:text-xl">Enter your child’s details to get started</p>
            <p className="text-lg font-semibold text-teal">{meta.label}</p>
          </div>
          <div
            className="mt-5 grid grid-cols-4 gap-2"
            role="progressbar"
            aria-label="Payment progress"
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={meta.progress}
          >
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={`h-0.5 rounded-full transition-colors ${n <= meta.progress ? "bg-teal" : "bg-[#C0BABA]"}`}
              />
            ))}
          </div>

          <div className="mt-10">
            {step === "student" && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submitStudent();
                }}
                className="space-y-6"
              >
                <Field id="studentName" label="Student’s full name" error={errors.studentName}>
                  <TextInput
                    id="studentName"
                    autoComplete="off"
                    placeholder="e.g Adeyemi Joy"
                    value={form.studentName}
                    invalid={!!errors.studentName}
                    onChange={(e) => update("studentName", e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-[3fr_2fr] gap-2 sm:grid-cols-[2fr_1fr]">
                  <Field id="studentClass" label="Student’s Class" error={errors.studentClass}>
                    <Select
                      id="studentClass"
                      placeholder="-select class-"
                      options={CLASSES}
                      value={form.studentClass}
                      invalid={!!errors.studentClass}
                      onChange={(e) => update("studentClass", e.target.value)}
                    />
                  </Field>
                  <Field id="classArm" label="Class arm" error={errors.classArm}>
                    <Select
                      id="classArm"
                      placeholder="-select arm-"
                      options={ARMS}
                      value={form.classArm}
                      invalid={!!errors.classArm}
                      onChange={(e) => update("classArm", e.target.value)}
                    />
                  </Field>
                </div>
                <Field id="parentPhone" label="Parent’s Phone number" error={errors.parentPhone}>
                  <TextInput
                    id="parentPhone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="e.g 08012345678"
                    value={form.parentPhone}
                    invalid={!!errors.parentPhone}
                    onChange={(e) => update("parentPhone", e.target.value)}
                  />
                </Field>
                <Field id="parentEmail" label="Parent’s Email Address" error={errors.parentEmail}>
                  <TextInput
                    id="parentEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="e.g parent@email.com"
                    value={form.parentEmail}
                    invalid={!!errors.parentEmail}
                    onChange={(e) => update("parentEmail", e.target.value)}
                  />
                </Field>
                <div className="flex justify-end gap-3 pt-14">
                  <Link href="/" className={`${btnOutline} flex-1 sm:w-[151px] sm:flex-none`}>
                    Back
                  </Link>
                  <button type="submit" className={`${btnPrimary} flex-1 sm:w-[151px] sm:flex-none`}>
                    Continue
                  </button>
                </div>
              </form>
            )}

            {step === "fees" && (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submitFees();
                }}
                className="space-y-6"
              >
                <Field id="session" label="Academic session" error={errors.session}>
                  <Select
                    id="session"
                    placeholder="-select session-"
                    options={SESSIONS}
                    value={form.session}
                    invalid={!!errors.session}
                    onChange={(e) => update("session", e.target.value)}
                  />
                </Field>
                <Field id="term" label="School term" error={errors.term}>
                  <Select
                    id="term"
                    placeholder="-select term-"
                    options={TERMS}
                    value={form.term}
                    invalid={!!errors.term}
                    onChange={(e) => update("term", e.target.value)}
                  />
                </Field>
                <fieldset>
                  <legend className="mb-4 text-lg font-medium text-ink sm:text-xl">Choose fee type</legend>
                  <div className="space-y-4">
                    {FEES.map((fee) => {
                      const checked = form.feeIds.includes(fee.id);
                      return (
                        <label
                          key={fee.id}
                          className={`flex cursor-pointer items-center gap-4 rounded-[5px] border bg-white px-5 py-4 transition-colors sm:px-7 ${
                            checked ? "border-teal" : "border-line hover:border-teal/50"
                          }`}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-lg text-ink sm:text-xl">{fee.name}</span>
                            <span className="mt-1 block text-[15px] text-ink/90 sm:text-base">{fee.description}</span>
                          </span>
                          <span className="text-lg text-ink sm:text-xl">{formatNaira(fee.amount)}</span>
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={checked}
                            onChange={() => toggleFee(fee.id)}
                          />
                          <span
                            aria-hidden
                            className="ml-2 grid size-[19px] shrink-0 place-items-center rounded-full border border-[#C0BABA] peer-checked:border-teal peer-focus-visible:ring-2 peer-focus-visible:ring-teal/40 sm:ml-6"
                          >
                            {checked && <span className="size-[13px] rounded-full bg-teal" />}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.feeIds && <p className="mt-2 text-sm text-red-600">{errors.feeIds}</p>}
                </fieldset>
                <div className="flex justify-end gap-3 pt-4 sm:gap-7">
                  <button type="button" onClick={() => goTo("student")} className={`${btnOutline} flex-1 sm:w-[151px] sm:flex-none`}>
                    Back
                  </button>
                  <button type="submit" className={`${btnPrimary} flex-1 sm:w-[205px] sm:flex-none`}>
                    Proceed to payment
                  </button>
                </div>
              </form>
            )}

            {step === "method" && (
              <div>
                <h2 className="text-xl font-medium text-ink">Choose a payment method</h2>
                <p className="mt-2 text-base text-ink">
                  Amount to pay: <strong className="font-semibold">{formatNaira(total)}</strong>
                </p>
                <div className="mt-6 space-y-4" role="radiogroup" aria-label="Payment method">
                  {PAYMENT_METHODS.map((m) => {
                    const selected = method === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-center gap-4 rounded-[5px] border bg-white px-5 py-4 transition-colors sm:px-7 ${
                          selected ? "border-teal" : "border-line hover:border-teal/50"
                        }`}
                      >
                        <span className="flex-1">
                          <span className="block text-lg text-ink sm:text-xl">{m.name}</span>
                          <span className="mt-1 block text-[15px] text-ink/90 sm:text-base">{m.description}</span>
                        </span>
                        <input
                          type="radio"
                          name="method"
                          className="peer sr-only"
                          checked={selected}
                          onChange={() => setMethod(m.id)}
                        />
                        <span
                          aria-hidden
                          className="grid size-[19px] shrink-0 place-items-center rounded-full border border-[#C0BABA] peer-checked:border-teal peer-focus-visible:ring-2 peer-focus-visible:ring-teal/40"
                        >
                          {selected && <span className="size-[13px] rounded-full bg-teal" />}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="flex justify-end gap-3 pt-10 sm:gap-7">
                  <button type="button" onClick={() => goTo("fees")} className={`${btnOutline} flex-1 sm:w-[151px] sm:flex-none`}>
                    Back
                  </button>
                  <button type="button" onClick={() => goTo("pay")} className={`${btnPrimary} flex-1 sm:w-[205px] sm:flex-none`}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === "pay" && method === "card" && (
              <CardPayment form={form} total={total} onCancel={() => goTo("method")} onPaid={() => complete("paid")} />
            )}
            {step === "pay" && method === "bank" && (
              <BankTransfer form={form} total={total} onBack={() => goTo("method")} onDone={() => complete("pending")} />
            )}
            {step === "pay" && method === "ussd" && (
              <UssdPayment form={form} total={total} onBack={() => goTo("method")} onDone={() => complete("pending")} />
            )}

            {step === "done" && receipt && (
              <div className="rounded-[10px] border border-line bg-white p-6 text-center sm:p-10" role="status">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-teal-soft text-teal">
                  <CheckIcon className="size-9" />
                </span>
                <h2 className="mt-5 text-2xl font-medium text-ink">
                  {receipt.status === "paid" ? "Payment successful" : "Payment submitted"}
                </h2>
                <p className="mx-auto mt-3 max-w-[440px] text-base text-ink">
                  {receipt.status === "paid"
                    ? `We have received ${formatNaira(total)} for ${form.studentName}. A receipt has been sent to ${form.parentEmail}.`
                    : `Thank you. Once we confirm your payment of ${formatNaira(total)}, a receipt will be sent to ${form.parentEmail}.`}
                </p>
                <p className="mt-5 text-sm text-[#757575]">
                  Reference: <span className="font-semibold text-ink">{receipt.reference}</span>
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button type="button" onClick={() => window.print()} className={`${btnOutline} sm:w-[190px]`}>
                    Print summary
                  </button>
                  <Link href="/" className={`${btnPrimary} sm:w-[190px]`}>
                    Back to home
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setReceipt(null);
                    goTo("student");
                  }}
                  className="mt-5 text-sm text-navy underline underline-offset-4 hover:text-teal"
                >
                  Pay for another child
                </button>
              </div>
            )}
          </div>
        </div>

        <span aria-hidden className="mt-14 hidden w-px bg-teal/60 lg:block lg:h-[730px]" />

        <PaymentSummary form={form} total={total} />
      </div>
    </div>
  );
}
