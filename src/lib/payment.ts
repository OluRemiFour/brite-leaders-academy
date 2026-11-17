/**
 * Payment flow data. Everything here is sample data from the design —
 * replace it with the school's real fee schedule and account details.
 */

export const CLASSES = ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"];
export const ARMS = ["A", "B", "C", "D"];
export const SESSIONS = ["2026/2027 Academic Session", "2025/2026 Academic Session"];
export const TERMS = ["First Term", "Second Term", "Third Term"];

export type Fee = { id: string; name: string; description: string; amount: number };

// TODO: confirm fee names and amounts with the school.
export const FEES: Fee[] = [
  { id: "tuition", name: "Tuition fee", description: "General academic tuition", amount: 200_000 },
  { id: "development", name: "Development levy", description: "Campus facilities and upkeep", amount: 50_000 },
  { id: "exam", name: "Examination fee", description: "Termly examinations and reports", amount: 25_000 },
  { id: "books", name: "Books & materials", description: "Textbooks and learning materials", amount: 40_000 },
];

// TODO: replace with the school's real account details.
export const BANK_ACCOUNT = {
  bankName: "Flourish Bank",
  accountName: "Brite Leaders Academy",
  accountNumber: "0123456789",
};

export const USSD_BANKS = [
  { name: "Access Bank", code: "*901#" },
  { name: "Fidelity Bank", code: "*770#" },
  { name: "First Bank", code: "*894#" },
  { name: "GTBank", code: "*737#" },
  { name: "Stanbic IBTC", code: "*909#" },
  { name: "Sterling Bank", code: "*822#" },
  { name: "UBA", code: "*919#" },
  { name: "Union Bank", code: "*826#" },
  { name: "Wema Bank", code: "*945#" },
  { name: "Zenith Bank", code: "*966#" },
];

export type PaymentMethod = "card" | "bank" | "ussd";

export const PAYMENT_METHODS: { id: PaymentMethod; name: string; description: string }[] = [
  { id: "card", name: "Card Payment", description: "Pay instantly with your debit card" },
  { id: "bank", name: "Bank Transfer", description: "Transfer to the school's account" },
  { id: "ussd", name: "USSD", description: "Dial a code from your phone" },
];

export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
export const formatAmount = (n: number) => n.toLocaleString("en-NG");
