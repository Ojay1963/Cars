import { BadgeCheck, CarFront, MapPinned, ShieldCheck } from "lucide-react";

const stats = [
  ["100+", "Curated listings"],
  ["14", "Delivery cities"],
  ["120-point", "Inspection standard"],
  ["24 hrs", "Lead response target"]
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Trust first",
    text: "The platform is built around verified presentation, cleaner workflows, and reduced buyer uncertainty."
  },
  {
    icon: CarFront,
    title: "Marketplace quality",
    text: "Listings, inquiries, dashboards, and admin control are being structured like a real automotive product."
  },
  {
    icon: BadgeCheck,
    title: "Dealer credibility",
    text: "Professional dealer representation and lead routing help the marketplace feel commercially credible."
  },
  {
    icon: MapPinned,
    title: "Local operating context",
    text: "The experience is tailored for Nigerian buyers, sellers, dealers, and delivery workflows."
  }
];

export default function AboutPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 lg:p-10">
          <div className="max-w-4xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              About Ojay Motors
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
              A trusted destination for quality vehicles
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              Ojay Motors connects buyers with quality vehicles through a cleaner,
              more transparent experience for browsing, inquiries, and dealer engagement.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([value, label]) => (
              <article
                key={label}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
                <p className="mt-2 text-sm text-slate-500">{label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item) => (
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

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              What we are building
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              Built around trust, quality, and service
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              We focus on clear vehicle information, responsive support, and a buying
              experience that feels professional from first visit to final inquiry.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Our goal is to make it easier for buyers and sellers to connect through
              a marketplace that feels dependable, polished, and easy to use.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-950/20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Marketplace principles
            </p>
            <div className="mt-6 space-y-5">
              {[
                "Carefully presented listings that highlight the right details",
                "Straightforward inquiry flows for buyers and sellers",
                "Professional dealer presence built on trust and clarity",
                "A polished experience designed for everyday use"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
