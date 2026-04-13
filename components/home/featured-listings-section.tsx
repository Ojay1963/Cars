import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { VehicleCard } from "@/components/listings/vehicle-card";

export function FeaturedListingsSection({
  listings
}: {
  listings: Array<Parameters<typeof VehicleCard>[0]["listing"]>;
}) {
  return (
    <SectionShell
      eyebrow="Featured inventory"
      title="Featured vehicles worth a closer look"
      description="Discover standout listings selected for their condition, value, and overall appeal."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {listings.map((listing) => (
          <VehicleCard key={listing.id} listing={listing} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/inventory"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
        >
          View all inventory
        </Link>
      </div>
    </SectionShell>
  );
}
