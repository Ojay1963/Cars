import { DealerListingForm } from "@/components/dashboard/dealer-listing-form";
import { requireRole } from "@/lib/session";

export default async function NewDealerListingPage() {
  await requireRole(["ADMIN", "DEALER"]);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Dealer dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            Create a new vehicle listing
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Dealers and admins can now create real inventory records with uploaded images
            through the new platform workflow.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
          <DealerListingForm />
        </div>
      </div>
    </section>
  );
}
