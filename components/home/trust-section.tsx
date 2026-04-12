import { ShieldCheck, BadgeCheck, LineChart, CarTaxiFront } from "lucide-react";
import { SectionShell } from "@/components/home/section-shell";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified listings",
    text: "Every listing is structured around real condition, status, and ownership context."
  },
  {
    icon: BadgeCheck,
    title: "Trusted dealers",
    text: "Role-based tools support professional dealers and stronger moderation workflows."
  },
  {
    icon: LineChart,
    title: "Transparent pricing",
    text: "Clear, data-backed price presentation helps reduce buyer hesitation."
  },
  {
    icon: CarTaxiFront,
    title: "Lifecycle support",
    text: "From browsing to inquiry, financing, and after-sales service, the platform stays coherent."
  }
];

export function TrustSection() {
  return (
    <SectionShell
      eyebrow="Why choose us"
      title="Trust-building UX backed by real platform architecture"
      description="This isn’t just a prettier landing page. The product foundation is being rebuilt around listings, auth, dealer workflows, and admin control."
      className="border-y border-slate-200 bg-slate-50/80"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <item.icon className="h-10 w-10 text-amber-600" />
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
