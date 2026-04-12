import { NextResponse } from "next/server";
import { contactSchema } from "@/schemas/listing";
import { createContactMessage } from "@/services/contact";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 1000 * 60 * 10
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many contact requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid contact payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const message = await createContactMessage(parsed.data);

  return NextResponse.json(
    {
      ok: true,
      message:
        "Thanks. Your message has been received and our team will respond shortly.",
      data: {
        id: message.id
      }
    },
    { status: 201 }
  );
}
