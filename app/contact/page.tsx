import { ContactForm } from "@/components/contact/contact-form";

const contactHighlights = [
  {
    title: "Sales support",
    value: "+234 800 286 6678",
    text: "Talk to a product specialist about inventory, pricing, or sourcing."
  },
  {
    title: "Dealer relations",
    value: "dealer@ojaymotors.ng",
    text: "Onboarding, listing support, and marketplace partnership questions."
  },
  {
    title: "Showroom location",
    value: "15 Adeola Odeku Street, Victoria Island, Lagos",
    text: "Schedule inspections, handovers, or in-person consultations."
  }
];

export default function ContactPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            Contact workflows are now live and routed through the new backend.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Contact requests now support validation, database persistence, basic
            anti-spam protection, and notification routing for real marketplace use.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {contactHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {item.title}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
                  {item.value}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="mb-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Send a message
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Reach the right team quickly
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                Messages are validated and routed to the platform team for follow-up.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
