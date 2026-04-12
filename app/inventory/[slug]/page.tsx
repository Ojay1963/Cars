import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { InquiryForm } from "@/components/listings/inquiry-form";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { getFeaturedListings, getListingBySlug } from "@/services/listings";
import { VehicleCard } from "@/components/listings/vehicle-card";

export default async function ListingDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const listing = await getListingBySlug(params.slug);
  const relatedListings = (await getFeaturedListings(3)).filter(
    (item) => item.slug !== params.slug
  );

  if (!listing) {
    notFound();
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
              {listing.images[0] ? (
                <Image
                  src={listing.images[0].url}
                  alt={listing.images[0].altText ?? listing.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {listing.images.slice(1, 3).map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"
                >
                  <Image
                    src={image.url}
                    alt={image.altText ?? listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="flex flex-wrap gap-2">
              <Badge>{listing.status}</Badge>
              {listing.featured ? <Badge>Featured</Badge> : null}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-slate-950">
              {listing.title}
            </h1>
            <p className="mt-3 text-lg text-slate-500">{listing.location}</p>
            <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-950">
              {formatCurrency(listing.price)}
            </p>
            <p className="mt-6 text-base leading-8 text-slate-600">
              {listing.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Year</p>
                <p className="mt-2 font-semibold text-slate-950">{listing.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Mileage</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {formatMileage(listing.mileage)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Transmission
                </p>
                <p className="mt-2 font-semibold text-slate-950">{listing.transmission}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fuel</p>
                <p className="mt-2 font-semibold text-slate-950">{listing.fuelType}</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Dealer
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {listing.dealer?.businessName ?? "Ojay Premium Autos"}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Verified dealer profile, financing support, and structured inquiry handling
                are now connected into the lead pipeline.
              </p>
            </div>
          </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
              <div className="mb-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Vehicle inquiry
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  Ask about availability, financing, or inspection
                </h2>
                <p className="text-sm leading-7 text-slate-600">
                  Inquiries are validated, rate-limited, saved, and routed to the relevant
                  dealer or admin workflow.
                </p>
              </div>
              <InquiryForm listingId={listing.id} listingTitle={listing.title} />
            </div>
          </div>
        </div>

        {relatedListings.length > 0 ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Related vehicles
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                Explore similar premium listings
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedListings.map((item) => (
                <VehicleCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
