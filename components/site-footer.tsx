import Link from "next/link";
import { CarFront, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

const marketplaceLinks = [
  { href: "/inventory", label: "Browse inventory" },
  { href: "/sell", label: "Sell your car" },
  { href: "/contact", label: "Book a consultation" },
  { href: "/login", label: "Sign in" }
];

const companyLinks = [
  { href: "/about", label: "About Ojay Motors" },
  { href: "/dashboard", label: "Dealer dashboard" },
  { href: "/terms", label: "Terms and policies" },
  { href: "/contact", label: "Support" }
];

const trustPillars = [
  "Verified dealer screening",
  "Inspection-first vehicle sourcing",
  "Transparent pricing guidance"
];

const footerLinkClassName =
  "relative z-10 block pointer-events-auto rounded-md hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70";

export function SiteFooter() {
  return (
    <footer className="relative isolate z-10 mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
              Premium automotive marketplace
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Buy, sell, and manage premium vehicles with more trust and less friction.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Ojay Motors brings verified inventory, stronger lead routing, and a cleaner
              dealership workflow into one production-ready platform.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Why buyers trust the platform</h3>
                <div className="space-y-2 text-sm leading-7 text-slate-300">
                  {trustPillars.map((pillar) => (
                    <p key={pillar}>{pillar}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:px-8">
        <div className="space-y-6">
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-3 pointer-events-auto"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-black/20">
              <CarFront className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="text-base font-semibold text-white">Ojay Motors</span>
              <span className="text-sm text-slate-400">Premium automotive marketplace</span>
            </span>
          </Link>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Built for serious buyers, trusted dealers, and cleaner lead management from
            first discovery to final delivery.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Coverage</p>
              <p className="mt-2 text-sm font-semibold text-white">Nationwide sourcing</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Support</p>
              <p className="mt-2 text-sm font-semibold text-white">Guided buying help</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Trust</p>
              <p className="mt-2 text-sm font-semibold text-white">Verified listings</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Marketplace
          </h4>
          <div className="space-y-3 text-sm text-slate-300">
            {marketplaceLinks.map((link) => (
              <Link key={link.href} href={link.href} className={footerLinkClassName}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Company
          </h4>
          <div className="space-y-3 text-sm text-slate-300">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className={footerLinkClassName}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Contact
          </h4>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-amber-400" />
              <p>15 Adeola Odeku Street, Victoria Island, Lagos</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4 text-amber-400" />
              <a
                href="mailto:sales@ojaymotors.ng"
                className="relative z-10 pointer-events-auto rounded-md hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              >
                sales@ojaymotors.ng
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-4 w-4 text-amber-400" />
              <a
                href="tel:+2348002866678"
                className="relative z-10 pointer-events-auto rounded-md hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              >
                +234 800 286 6678
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Clock3 className="mt-1 h-4 w-4 text-amber-400" />
              <p>Mon - Sat, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>&copy; 2026 Ojay Motors. Built for trusted automotive commerce.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/terms" className={footerLinkClassName}>
              Terms
            </Link>
            <Link href="/contact" className={footerLinkClassName}>
              Contact support
            </Link>
            <Link href="/inventory" className={footerLinkClassName}>
              Live inventory
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
