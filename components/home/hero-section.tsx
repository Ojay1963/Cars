import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.14),_transparent_20%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
        <div className="space-y-8">
          <Badge>Production-ready premium marketplace</Badge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">
              Buy, sell, and manage premium vehicles with confidence.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Ojay Motors is evolving into a full-stack automotive platform with
              verified listings, secure role-based workflows, and a polished
              marketplace experience for buyers, dealers, and administrators.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/inventory"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
            >
              Browse Inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
            >
              List Your Car
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["100+", "Curated listings"],
              ["3 roles", "Users, dealers, admins"],
              ["24hrs", "Lead response target"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
                <p className="mt-1 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
              Search inventory
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Start with the right fit
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Filter by body type, price, location, fuel, and transmission with
              shareable URL-driven search.
            </p>
          </div>
          <div className="mt-5 space-y-4">
            {[
              "Make or model",
              "Price range",
              "Body type",
              "Location"
            ].map((label) => (
              <div
                key={label}
                className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500"
              >
                {label}
              </div>
            ))}
            <Link
              href="/inventory"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Cars
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
