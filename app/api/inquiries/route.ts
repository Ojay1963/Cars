import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { inquirySchema } from "@/schemas/listing";
import { createInquiry } from "@/services/contact";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(`inquiry:${ip}`, {
    limit: 8,
    windowMs: 1000 * 60 * 10
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many inquiry requests. Please try again shortly." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid inquiry payload.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const session = await getServerSession(authOptions);
  const inquiry = await createInquiry(parsed.data, session?.user?.id);

  return NextResponse.json(
    {
      ok: true,
      message:
        "Your inquiry has been sent. A dealer or advisor will contact you shortly.",
      data: {
        id: inquiry.id
      }
    },
    { status: 201 }
  );
}
