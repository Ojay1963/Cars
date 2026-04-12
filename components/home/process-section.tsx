import { Search, MessagesSquare, HandCoins } from "lucide-react";
import { SectionShell } from "@/components/home/section-shell";

const steps = [
  {
    icon: Search,
    title: "Search smarter",
    text: "Filter by make, model, price, body type, transmission, and condition."
  },
  {
    icon: MessagesSquare,
    title: "Connect instantly",
    text: "Send inquiries, save cars, and route leads to dealers or admins securely."
  },
  {
    icon: HandCoins,
    title: "Close with confidence",
    text: "Move into financing, inspection, and handover with a more trustworthy workflow."
  }
];

export function ProcessSection() {
  return (
    <SectionShell
      eyebrow="How it works"
      title="A premium marketplace flow designed for conversion"
      description="The user journey is being rebuilt to support real-world buyer intent instead of just brochure-style browsing."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <step.icon className="h-5 w-5" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Step {index + 1}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
