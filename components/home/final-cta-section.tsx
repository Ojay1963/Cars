import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Phase 1 foundation shipped
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
              The platform is now moving from brochure site to real marketplace.
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Next steps build on this stack with full inventory browsing, listing
              CRUD, media workflows, dashboards, and moderation.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 lg:mt-0">
            <Link
              href="/inventory"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore inventory
            </Link>
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
