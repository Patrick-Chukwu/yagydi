export type GiftFrequency = "once" | "monthly";
export type GiftCurrency = "NGN" | "USD";

export const paymentLinks = {
  ngnOneTime: "https://paystack.com/pay/XXXXXX", // TODO Paystack Payment Page
  ngnMonthly: "https://paystack.com/pay/XXXXXX", // TODO Paystack subscription page
  usdOneTime: "https://flutterwave.com/pay/XXXXXX", // TODO Flutterwave / Stripe Payment Link
  usdMonthly: "https://flutterwave.com/pay/XXXXXX", // TODO Flutterwave / Stripe Payment Link
} as const;

const linksByChoice = {
  NGN: { once: paymentLinks.ngnOneTime, monthly: paymentLinks.ngnMonthly },
  USD: { once: paymentLinks.usdOneTime, monthly: paymentLinks.usdMonthly },
} as const;

export function paymentLinkFor(frequency: GiftFrequency, currency: GiftCurrency) {
  return linksByChoice[currency][frequency];
}

export function formatGiftAmount(currency: GiftCurrency, amount: number) {
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return currency === "NGN" ? `₦${formatted}` : `$${formatted}`;
}

// TODO: replace with real content
export const suggestedAmounts = {
  NGN: [
    { amount: 5000, impact: "[provides learning materials for one student]" },
    { amount: 20000, impact: "[TODO: impact of 20,000 naira]" },
    { amount: 50000, impact: "[TODO: impact of 50,000 naira]" },
    { amount: 100000, impact: "[TODO: impact of 100,000 naira]" },
  ],
  USD: [
    { amount: 10, impact: "[TODO: impact of 10 US dollars]" },
    { amount: 25, impact: "[TODO: impact of 25 US dollars]" },
    { amount: 50, impact: "[TODO: impact of 50 US dollars]" },
    { amount: 100, impact: "[TODO: impact of 100 US dollars]" },
  ],
} as const satisfies Record<GiftCurrency, readonly { amount: number; impact: string }[]>;

// TODO: replace with real content
export const bankTransfer = {
  bankName: "[Bank name]",
  accountName: "[Account name]",
  accountNumber: "[0000000000]",
} as const;

// TODO: replace with real content
export const moneyBreakdown = [
  { id: "programmes", label: "Programmes", percent: 70 },
  { id: "operations", label: "Operations", percent: 20 },
  { id: "reserves", label: "Reserves", percent: 10 },
] as const;

const breakdownTotal = moneyBreakdown.reduce((sum, item) => sum + item.percent, 0);
if (breakdownTotal !== 100) {
  throw new Error(`moneyBreakdown must sum to 100. Current total: ${breakdownTotal}.`);
}

export const donationFaqs = [
  {
    question: "Is my donation secure?",
    answer:
      "You complete a gift on the payment partner's own page. This website does not collect card numbers or online-banking passwords. Online giving opens only from the Donate button published here.",
  },
  {
    question: "Can I cancel monthly giving?",
    answer:
      "Yes. A monthly gift is managed by the payment partner. You cancel it with that partner. This website does not store the subscription.",
  },
  {
    question: "Do you issue receipts?",
    answer:
      "Receipts will be issued by the payment partner once online giving is live. This page is not a receipt, and a separate receipt policy is not published here.",
  },
  {
    question: "How else can I support?",
    answer:
      "You can volunteer, partner with us, or join the newsletter. Those are ways to take part without sending money.",
  },
] as const;
