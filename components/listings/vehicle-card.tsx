import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, MapPin, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatMileage } from "@/lib/utils";

type ListingCardProps = {
  listing: {
    id: string;
    slug: string;
    title: string;
    price: number;
    year: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    location: string;
    featured?: boolean;
    status: string;
    images: Array<{ url: string; altText: string | null }>;
    dealer?: { businessName: string; verified: boolean } | null;
  };
};

export function VehicleCard({ listing }: ListingCardProps) {
  const primaryImage = listing.images[0];

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70">
      <Link href={`/inventory/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText ?? listing.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute left-4 top-4 flex gap-2">
            {listing.featured ? <Badge>Featured</Badge> : null}
            <Badge className="border-white/40 bg-slate-950/75 text-white">
              {listing.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                {listing.title}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Price
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                {formatCurrency(listing.price)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              {formatMileage(listing.mileage)}
            </span>
            <span className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              {listing.transmission}
            </span>
            <span className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              {listing.fuelType}
            </span>
            <span className="font-medium text-slate-800">{listing.year}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              {listing.dealer?.businessName ?? "Verified dealer"}
            </span>
            <span className="text-sm font-semibold text-slate-950">View details</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
