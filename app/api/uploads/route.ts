import { NextResponse } from "next/server";
import { cloudinaryEnabled, uploadImageToCloudinary } from "@/lib/cloudinary";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function toDataUri(file: File, buffer: Buffer) {
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(`upload:${ip}`, {
    limit: 20,
    windowMs: 1000 * 60 * 10
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many uploads. Please try again shortly." },
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, and WebP images are supported." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Each image must be 5MB or smaller." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const dataUri = toDataUri(file, buffer);
  const uploaded = await uploadImageToCloudinary(dataUri, "ojay-motors/seller-intake");

  return NextResponse.json({
    ok: true,
    data: {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      storage: cloudinaryEnabled() ? "cloudinary" : "inline-dev"
    }
  });
}
