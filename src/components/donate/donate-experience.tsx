"use client";

import { Check, ChevronDown, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  bankTransfer,
  donationFaqs,
  formatGiftAmount,
  moneyBreakdown,
  paymentLinkFor,
  suggestedAmounts,
  type GiftCurrency,
  type GiftFrequency,
} from "@/content/donate";
import { values } from "@/content/values";
import { isPlaceholderUrl } from "@/lib/external-url";
import { cn, focusRing } from "@/lib/utils";

const frequencies = [
  { value: "once", label: "One-time" },
  { value: "monthly", label: "Monthly" },
] as const satisfies readonly { value: GiftFrequency; label: string }[];

const currencies = [
  { value: "NGN", label: "NGN" },
  { value: "USD", label: "USD" },
] as const satisfies readonly { value: GiftCurrency; label: string }[];

const trustValues = values.items.filter(
  (item) => item.name === "Accountability" || item.name === "Transparency",
);

function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-wisteria-900">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 py-2 text-sm font-bold",
                checked
                  ? "border-wisteria-100 bg-wisteria-100 text-white"
                  : "border-lavender-100 bg-white text-wisteria-900",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-wisteria-700",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function DonateExperience() {
  const [frequency, setFrequency] = useState<GiftFrequency>("once");
  const [currency, setCurrency] = useState<GiftCurrency>("NGN");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const paymentUrl = paymentLinkFor(frequency, currency);
  const givingLive = !isPlaceholderUrl(paymentUrl);
  const amounts = suggestedAmounts[currency];
  const copyMessage =
    copyState === "copied"
      ? "Account number copied."
      : copyState === "failed"
        ? "Could not copy automatically. Select the account number and copy it."
        : "";

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(bankTransfer.accountNumber);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="min-w-0">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)]">
        <div className="min-w-0">
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-8">
            <ChoiceGroup
              legend="Gift frequency"
              name="gift-frequency"
              value={frequency}
              options={frequencies}
              onChange={(value) => {
                setFrequency(value);
                setSelectedAmount(null);
              }}
            />
            <ChoiceGroup
              legend="Currency"
              name="gift-currency"
              value={currency}
              options={currencies}
              onChange={(value) => {
                setCurrency(value);
                setSelectedAmount(null);
              }}
            />
          </div>

          <div className="mt-8" role="group" aria-describedby="amount-note" aria-label="Suggested amounts">
            <ul className="grid gap-3 sm:grid-cols-2">
              {amounts.map((option) => {
                const pressed = selectedAmount === option.amount;
                return (
                  <li key={`${currency}-${option.amount}`} className="min-w-0">
                    <button
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setSelectedAmount(pressed ? null : option.amount)}
                      className={cn(
                        "flex h-full w-full min-w-0 flex-col rounded-3xl border-2 p-4 text-left",
                        pressed
                          ? "border-wisteria-100 bg-wisteria-20"
                          : "border-lavender-100 bg-white",
                        focusRing,
                      )}
                    >
                      <span className="text-2xl font-extrabold text-wisteria-900">
                        {formatGiftAmount(currency, option.amount)}
                      </span>
                      <span className="mt-2 text-base leading-relaxed text-neutral-80">
                        {option.impact}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p id="amount-note" className="mt-4 text-base leading-relaxed text-neutral-80">
              You enter the amount on the payment page. Selecting a card here only shows the kind of
              difference that gift can make. It is not added to the payment link.
            </p>
          </div>

          <div className="mt-8">
            {givingLive ? (
              <Button
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full sm:w-auto"
              >
                Donate now
              </Button>
            ) : (
              <Button type="button" size="lg" className="w-full sm:w-auto" disabled>
                Donate now
              </Button>
            )}
            {givingLive ? null : (
              <p className="mt-4 text-base font-semibold leading-relaxed text-wisteria-900">
                Online giving coming soon – please use bank transfer below.
              </p>
            )}
            <p className="mt-3 text-base leading-relaxed text-neutral-80">
              You&apos;ll be taken to our secure payment partner to complete your gift.
            </p>
          </div>
        </div>

        <aside className="min-w-0 rounded-3xl border border-lavender-100 bg-white p-5 sm:p-6">
          <h2 className="text-2xl text-wisteria-900">Bank transfer</h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-80">
            These bank details are placeholders, not a real account. Do not transfer money to them.
          </p>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm font-bold text-wisteria-700">Bank</dt>
              <dd className="text-lg break-words text-foreground">{bankTransfer.bankName}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-wisteria-700">Account name</dt>
              <dd className="text-lg break-words text-foreground">{bankTransfer.accountName}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-wisteria-700">Account number</dt>
              <dd id="account-number" className="text-lg font-bold break-all text-foreground">
                {bankTransfer.accountNumber}
              </dd>
            </div>
          </dl>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => void copyAccountNumber()}
          >
            {copyState === "copied" ? (
              <Check aria-hidden="true" className="size-4" />
            ) : (
              <Copy aria-hidden="true" className="size-4" />
            )}
            Copy account number
          </Button>
          <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm font-semibold text-wisteria-900">
            {copyMessage}
          </p>

          <h2 className="mt-8 text-2xl text-wisteria-900">Where your money goes</h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-80">
            TODO: replace with real content. These percentages are placeholders and are not a
            published account of spending.
          </p>
          <ul className="mt-5 space-y-4">
            {moneyBreakdown.map((item) => (
              <li key={item.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-foreground">{item.label}</span>
                  <span className="font-bold text-wisteria-900">{item.percent}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-lavender-40" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-wisteria-100"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-2xl text-wisteria-900">How we hold this</h2>
          <ul className="mt-4 space-y-4">
            {trustValues.map((item) => (
              <li key={item.name}>
                <p className="font-bold text-foreground">{item.name}</p>
                <p className="mt-1 text-base leading-relaxed text-neutral-80">{item.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl text-wisteria-900">Questions about giving</h2>
        <div className="mt-6 divide-y divide-lavender-100 rounded-3xl border border-lavender-100 bg-white">
          {donationFaqs.map((faq, index) => {
            const open = openFaq === index;
            const panelId = `donation-faq-${index}`;
            const buttonId = `donation-faq-button-${index}`;
            return (
              <div key={faq.question} className="min-w-0 px-4 py-1 sm:px-6">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className={cn(
                      "flex w-full min-h-12 items-center justify-between gap-4 py-3 text-left text-lg font-bold text-wisteria-900",
                      focusRing,
                    )}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(open ? null : index)}
                  >
                    <span className="min-w-0 flex-1">{faq.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-5 shrink-0 transition motion-reduce:transition-none",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p className="pb-4 text-base leading-relaxed text-neutral-80">{faq.answer}</p>
                  {faq.question === "How else can I support?" ? (
                    <ul className="space-y-2 pb-4">
                      <li>
                        <Link href="/get-involved#volunteer" className={cn("font-bold", focusRing)}>
                          Volunteer
                        </Link>
                      </li>
                      <li>
                        <Link href="/get-involved#partner" className={cn("font-bold", focusRing)}>
                          Partner with us
                        </Link>
                      </li>
                      <li>
                        <Link href="#newsletter" className={cn("font-bold", focusRing)}>
                          Join the newsletter
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
