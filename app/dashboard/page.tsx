import Link from "next/link";
import { requireAuth } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { getDashboardLeadSummary } from "@/services/contact";

export default async function DashboardPage() {
  const session = await requireAuth();
  const summary = await getDashboardLeadSummary(session.user.role, session.user.id);
  const canManageListings = session.user.role === "ADMIN" || session.user.role === "DEALER";
  const heroActions = canManageListings
    ? [
        {
          href: "/dashboard/listings/new",
          label: "Create listing",
          description: "Publish new inventory with gallery uploads and production-ready listing data."
        },
        {
          href: "/inventory",
          label: "Review live inventory",
          description: "Check how listings appear on the public marketplace before sharing them."
        }
      ]
    : [
        {
          href: "/inventory",
          label: "Browse saved inventory",
          description: "Return to the marketplace and continue comparing vehicles you like."
        },
        {
          href: "/contact",
          label: "Contact marketplace team",
          description: "Get support with financing, inspections, or a vehicle search request."
        }
      ];

  const cards =
    session.user.role === "ADMIN"
      ? [
          ["Inquiries", `${summary.stats.inquiries}`, "Marketplace leads received"],
          ["Contact messages", `${summary.stats.contacts}`, "General support and sales messages"],
          ["Listings", `${summary.stats.listings}`, "Active listings in the system"]
        ]
      : session.user.role === "DEALER"
        ? [
            ["Lead volume", `${summary.stats.inquiries}`, "Buyer inquiries routed to your inventory"],
            ["Your listings", `${summary.stats.listings}`, "Listings assigned to your account"],
            ["Response workflow", "Live", "Lead routing and notifications are enabled"]
          ]
        : [
            ["Saved vehicles", `${summary.stats.listings}`, "Favorite inventory tracked to your account"],
            ["Your inquiries", `${summary.stats.inquiries}`, "Vehicle inquiries you have submitted"],
            ["Account status", "Active", "Buyer workspace is authenticated and protected"]
          ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            Welcome, {session.user.name ?? session.user.email}
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Role-aware dashboards are now connected to real lead and listing summary data for{" "}
            {session.user.role.toLowerCase()} accounts.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {heroActions.map((action, index) => (
            <article
              key={action.href}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/80"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {index === 0 ? "Primary action" : "Next step"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {action.label}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                {action.description}
              </p>
              <div className="mt-5">
                <Link href={action.href}>
                  <Button variant={index === 0 ? "primary" : "secondary"}>
                    {action.label}
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map(([title, value, description]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h2>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{value}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Recent inquiries
            </h2>
            <div className="mt-6 space-y-4">
              {summary.recentInquiries.length === 0 ? (
                <p className="text-sm leading-7 text-slate-600">
                  No inquiries yet. New lead activity will appear here automatically.
                </p>
              ) : (
                summary.recentInquiries.map((inquiry: any) => (
                  <div key={inquiry.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-950">{inquiry.name}</p>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{inquiry.email}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {inquiry.listing?.title ?? "General listing inquiry"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Recent contact messages
            </h2>
            <div className="mt-6 space-y-4">
              {summary.recentContacts.length === 0 ? (
                <p className="text-sm leading-7 text-slate-600">
                  Contact traffic will appear here for admin accounts once messages start arriving.
                </p>
              ) : (
                summary.recentContacts.map((message: any) => (
                  <div key={message.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-950">{message.name}</p>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {message.subject || "Contact"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{message.email}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 line-clamp-3">
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
