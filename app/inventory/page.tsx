import { getInventory } from "@/services/listings";
import { VehicleCard } from "@/components/listings/vehicle-card";

export default async function InventoryPage() {
  const listings = await getInventory({ perPage: 9 });

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Inventory
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            Browse available vehicles
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Explore quality cars from trusted sellers and dealers, with clear details
            to help you compare options and buy with confidence.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {listings.map((listing) => (
            <VehicleCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
