"use client";

import { useState, type ReactNode } from "react";
import { btnOutline, btnPrimary } from "@/components/site/Button";
import { CheckIcon, CopyIcon } from "@/components/icons";
import { BANK_ACCOUNT, USSD_BANKS, formatAmount } from "@/lib/payment";
import { Field, Select, TextInput } from "./fields";
import type { PaymentForm } from "./PaymentFlow";

function MethodHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-medium text-ink">{title}</h2>
      <p className="mt-4 text-base text-ink">{subtitle}</p>
    </div>
  );
}

function AmountCard({ form, total }: { form: PaymentForm; total: number }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-[5px] border border-line bg-teal-soft px-5 pt-5 pb-6 sm:px-7">
      <div>
        <p className="text-xl text-ink">{form.studentName}</p>
        <p className="mt-2 text-base text-ink">
          {form.studentClass.replace(" ", "")} {form.classArm}
        </p>
      </div>
      <div className="sm:mr-16">
        <p className="text-base text-ink">Amount to pay</p>
        <p className="mt-2 text-[34px] leading-none font-medium text-ink sm:text-[40px]">
          <span className="sr-only">₦</span>
          {formatAmount(total)}
        </p>
      </div>
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable – nothing to do */
        }
      }}
      className="grid size-10 place-items-center rounded-md text-ink transition-colors hover:bg-mist"
    >
      {copied ? <CheckIcon className="size-5 text-teal" /> : <CopyIcon className="size-5" />}
    </button>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-5 space-y-2.5">{children}</div>;
}

/* ---------------------------------------------------------------------------------------------
 * Card payment
 * This is a UI mock only: nothing is sent anywhere. For production, hand card collection to a
 * PCI-compliant gateway (e.g. Paystack / Flutterwave inline checkout) instead of these inputs.
 * ------------------------------------------------------------------------------------------- */
export function CardPayment({
  form,
  total,
  onCancel,
  onPaid,
}: {
  form: PaymentForm;
  total: number;
  onCancel: () => void;
  onPaid: () => void;
}) {
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (holder.trim().length < 2) e.holder = "Enter the name on the card.";
    const digits = number.replace(/\s/g, "");
    if (digits.length < 16) e.number = "Enter a valid card number.";
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length !== 2) e.expiry = "Use MM/YY.";
    if (!/^\d{3,4}$/.test(cvv)) e.cvv = "3 or 4 digits.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setProcessing(true);
    // TODO: replace with the payment gateway call.
    window.setTimeout(onPaid, 1600);
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <MethodHeader title="Card Payment" subtitle="Complete your payment using your bank card" />
      <AmountCard form={form} total={total} />
      <div className="mt-6 space-y-6">
        <Field id="holder" label="Card Holder’s name" error={errors.holder}>
          <TextInput
            id="holder"
            autoComplete="cc-name"
            placeholder="e.g john adeyemi"
            value={holder}
            invalid={!!errors.holder}
            onChange={(e) => setHolder(e.target.value)}
          />
        </Field>
        <Field id="cardNumber" label="Card number" error={errors.number}>
          <TextInput
            id="cardNumber"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="0000 0000 0000 0000"
            value={number}
            invalid={!!errors.number}
            onChange={(e) => setNumber(formatCard(e.target.value))}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4 sm:gap-7">
          <Field id="expiry" label="Expiry date" error={errors.expiry}>
            <TextInput
              id="expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="mm/yy"
              value={expiry}
              invalid={!!errors.expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
          </Field>
          <Field id="cvv" label="CVV" error={errors.cvv}>
            <TextInput
              id="cvv"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="***"
              maxLength={4}
              value={cvv}
              invalid={!!errors.cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            />
          </Field>
        </div>
      </div>
      <Actions>
        <button type="submit" disabled={processing} className={`${btnPrimary} w-full`}>
          {processing ? (
            <span className="inline-flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              Processing…
            </span>
          ) : (
            "Proceed to pay"
          )}
        </button>
        <button type="button" onClick={onCancel} disabled={processing} className={`${btnOutline} w-full`}>
          Cancel
        </button>
      </Actions>
    </form>
  );
}

/* ---------------------------------------------------------------------------------------------
 * Bank transfer
 * ------------------------------------------------------------------------------------------- */
export function BankTransfer({
  form,
  total,
  onBack,
  onDone,
}: {
  form: PaymentForm;
  total: number;
  onBack: () => void;
  onDone: () => void;
}) {
  return (
    <div>
      <MethodHeader title="Bank Transfer" subtitle="Use the account details below to complete the payment" />
      <AmountCard form={form} total={total} />
      <dl className="mt-2.5 space-y-5 rounded-[5px] border border-line bg-white px-4 py-4">
        <div>
          <dt className="text-xl font-medium text-ink">Bank name</dt>
          <dd className="mt-3 text-base text-ink">{BANK_ACCOUNT.bankName}</dd>
        </div>
        <div>
          <dt className="text-xl font-medium text-ink">Account name</dt>
          <dd className="mt-3 text-base text-ink">{BANK_ACCOUNT.accountName}</dd>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <dt className="text-xl font-medium text-ink">Account number</dt>
            <dd className="mt-3 text-base tracking-wide text-ink">{BANK_ACCOUNT.accountNumber}</dd>
          </div>
          <CopyButton value={BANK_ACCOUNT.accountNumber} label="Copy account number" />
        </div>
      </dl>
      <Actions>
        <button type="button" onClick={onDone} className={`${btnPrimary} w-full`}>
          I have made payment
        </button>
        <button type="button" onClick={onBack} className={`${btnOutline} w-full`}>
          Back
        </button>
      </Actions>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------
 * USSD
 * ------------------------------------------------------------------------------------------- */
export function UssdPayment({
  form,
  total,
  onBack,
  onDone,
}: {
  form: PaymentForm;
  total: number;
  onBack: () => void;
  onDone: () => void;
}) {
  const [bank, setBank] = useState("");
  const [error, setError] = useState("");
  const selected = USSD_BANKS.find((b) => b.name === bank);
  // TODO: the real, unique code comes from the payment gateway. This only illustrates the format.
  const code = selected ? `${selected.code.slice(0, -1)}*000*${total}#` : "";

  return (
    <div>
      <MethodHeader title="USSD" subtitle="Follow the instruction to complete the payment" />
      <AmountCard form={form} total={total} />
      <div className="mt-2.5 rounded-[5px] border border-line bg-white px-4 pt-4 pb-8">
        <Field id="ussdBank" label="Choose Bank" error={error}>
          <Select
            id="ussdBank"
            placeholder="-select your bank-"
            options={USSD_BANKS.map((b) => b.name)}
            value={bank}
            invalid={!!error}
            onChange={(e) => {
              setBank(e.target.value);
              setError("");
            }}
          />
        </Field>

        {selected && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-[5px] bg-teal-soft px-4 py-3">
            <div>
              <p className="text-sm text-ink">Dial this code</p>
              <p className="text-2xl font-medium tracking-wide text-ink">{code}</p>
            </div>
            <a href={`tel:${encodeURIComponent(code)}`} className="text-sm font-medium text-navy underline underline-offset-4 sm:hidden">
              Dial
            </a>
            <CopyButton value={code} label="Copy USSD code" />
          </div>
        )}

        <h3 className="mt-6 text-xl font-medium text-ink">Payment Instruction</h3>
        <ol className="mt-4 list-decimal space-y-1 pl-6 text-base text-ink">
          <li>Select your bank.</li>
          <li>Generate your unique USSD payment code.</li>
          <li>Dial the code using the phone number linked to your bank account.</li>
          <li>Follow your bank&apos;s prompts to authorise payment.</li>
        </ol>
      </div>
      <Actions>
        <button
          type="button"
          onClick={() => (bank ? onDone() : setError("Select your bank first."))}
          className={`${btnPrimary} w-full`}
        >
          I have made payment
        </button>
        <button type="button" onClick={onBack} className={`${btnOutline} w-full`}>
          Back
        </button>
      </Actions>
    </div>
  );
}
