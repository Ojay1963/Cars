import { NextResponse } from "next/server";
import { sellerLeadSchema } from "@/schemas/listing";
import { createContactMessage } from "@/services/contact";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(`sell:${ip}`, {
    limit: 4,
    windowMs: 1000 * 60 * 15
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many seller submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = sellerLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid seller intake payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const vehicleSummary = [
    `Vehicle: ${parsed.data.year} ${parsed.data.make} ${parsed.data.model}`,
    `Mileage: ${parsed.data.mileage.toLocaleString("en-NG")} km`,
    `Asking price: NGN ${parsed.data.askingPrice.toLocaleString("en-NG")}`,
    `Location: ${parsed.data.location}`,
    `Phone: ${parsed.data.phone}`,
    `Photos uploaded: ${parsed.data.photos.length}`,
    "",
    "Photo URLs:",
    ...parsed.data.photos,
    "",
    parsed.data.notes
  ].join("\n");

  const message = await createContactMessage({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: `Seller intake - ${parsed.data.year} ${parsed.data.make} ${parsed.data.model}`,
    message: vehicleSummary,
    honeypot: ""
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Your vehicle details have been submitted. Our team will contact you with appraisal next steps.",
      data: {
        id: message.id
      }
    },
    { status: 201 }
  );
}
