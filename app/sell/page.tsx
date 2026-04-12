import { CheckCircle2, LineChart, ShieldCheck, WalletCards } from "lucide-react";
import { SellerIntakeForm } from "@/components/sell/seller-intake-form";

const sellingBenefits = [
  {
    icon: LineChart,
    title: "Market-aligned pricing",
    text: "We help position your vehicle for realistic demand and stronger conversion."
  },
  {
    icon: ShieldCheck,
    title: "Verified buyer flow",
    text: "Structured intake and lead routing make the process feel safer and more professional."
  },
  {
    icon: WalletCards,
    title: "Premium presentation",
    text: "Serious listings are presented with cleaner product-grade marketplace UX."
  }
];

const sellSteps = [
  "Submit your vehicle details for appraisal",
  "Receive pricing guidance and listing next steps",
  "Move into dealer review, media, and publication workflow"
];

export default function SellPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Sell your car
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
                Start a real seller intake flow, not a placeholder page.
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                This page now captures real appraisal leads through the backend so sellers
                can begin the listing process with structured data instead of a dead end.
              </p>
            </div>

            <div className="grid gap-5">
              {sellingBenefits.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <item.icon className="h-10 w-10 text-amber-600" />
                  <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                How it works
              </p>
              <div className="mt-5 space-y-4">
                {sellSteps.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-300" />
                    <p className="text-sm leading-7 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="mb-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Seller intake form
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Submit your vehicle for appraisal
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                We’ll use this information to review your vehicle and contact you with
                appraisal and listing guidance.
              </p>
            </div>
            <SellerIntakeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
