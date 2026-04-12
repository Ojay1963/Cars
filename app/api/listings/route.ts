import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";
import { createListing, getInventory } from "@/services/listings";
import { createListingSchema } from "@/schemas/listing";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = Object.fromEntries(searchParams.entries());
  const listings = await getInventory(filters);
  return NextResponse.json({ data: listings });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !["ADMIN", "DEALER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(`create-listing:${ip}`, {
    limit: 12,
    windowMs: 1000 * 60 * 15
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many listing submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = createListingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid listing payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const listing = await createListing(parsed.data, {
    userId: session.user.id,
    role: session.user.role
  });

  return NextResponse.json(
    {
      ok: true,
      message: "Listing created successfully.",
      data: listing
    },
    { status: 201 }
  );
}
