import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PaymentFlow } from "@/components/payment/PaymentFlow";

export const metadata: Metadata = {
  title: "Pay School Fees",
  description: "Pay Brite Leaders Academy school fees by card, bank transfer or USSD.",
};

export default function PaymentPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <PaymentFlow />
      </main>
      <Footer />
    </>
  );
}
