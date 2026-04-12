import { SectionShell } from "@/components/home/section-shell";

export function TestimonialsSection({
  testimonials
}: {
  testimonials: Array<{ name: string; role: string; quote: string }>;
}) {
  return (
    <SectionShell
      eyebrow="Credibility"
      title="Testimonials that reinforce trust and platform maturity"
      description="These seeded testimonials help the experience feel real immediately while dealer and review systems are being expanded."
      className="border-y border-slate-200 bg-slate-50/80"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-base leading-8 text-slate-600">“{testimonial.quote}”</p>
            <div className="mt-6">
              <p className="font-semibold text-slate-950">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
