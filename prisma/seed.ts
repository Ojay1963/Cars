import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";
import { sampleListings } from "../lib/data/sample-data";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ojaymotors.ng" },
    update: {},
    create: {
      email: "admin@ojaymotors.ng",
      name: "Platform Admin",
      passwordHash,
      role: UserRole.ADMIN
    }
  });

  const dealerUser = await prisma.user.upsert({
    where: { email: "dealer@ojaymotors.ng" },
    update: {},
    create: {
      email: "dealer@ojaymotors.ng",
      name: "Ojay Premium Autos",
      passwordHash,
      role: UserRole.DEALER,
      phone: "+2348002866678",
      location: "Lagos"
    }
  });

  const customer = await prisma.user.upsert({
    where: { email: "buyer@ojaymotors.ng" },
    update: {},
    create: {
      email: "buyer@ojaymotors.ng",
      name: "Demo Buyer",
      passwordHash,
      role: UserRole.USER,
      location: "Abuja"
    }
  });

  const dealer = await prisma.dealerProfile.upsert({
    where: { userId: dealerUser.id },
    update: {},
    create: {
      userId: dealerUser.id,
      businessName: "Ojay Premium Autos",
      slug: "ojay-premium-autos",
      description:
        "Verified premium dealer specializing in executive sedans, SUVs, and inspection-backed luxury inventory.",
      phone: "+2348002866678",
      city: "Lagos",
      state: "Lagos",
      address: "15 Adeola Odeku Street, Victoria Island, Lagos",
      verified: true,
      responseRate: 96,
      responseTimeMins: 28,
      ratingAverage: 4.8,
      totalReviews: 128
    }
  });

  for (const listing of sampleListings) {
    await prisma.carListing.upsert({
      where: { slug: listing.slug },
      update: {
        title: listing.title,
        price: listing.price,
        mileage: listing.mileage,
        featured: listing.featured,
        status: listing.status
      },
      create: {
        slug: listing.slug,
        title: listing.title,
        make: listing.make,
        model: listing.model,
        trim: listing.trim,
        year: listing.year,
        price: listing.price,
        mileage: listing.mileage,
        fuelType: listing.fuelType,
        transmission: listing.transmission,
        bodyType: listing.bodyType,
        color: listing.color,
        condition: listing.condition,
        description: listing.description,
        location: listing.location,
        city: listing.city,
        state: listing.state,
        featured: listing.featured,
        status: listing.status,
        engine: listing.engine,
        drivetrain: listing.drivetrain,
        seats: listing.seats,
        doors: listing.doors,
        publishedAt: new Date(),
        sellerId: dealerUser.id,
        dealerId: dealer.id,
        images: {
          create: listing.images.map((image, index) => ({
            url: image.url,
            altText: image.altText,
            isPrimary: Boolean(image.isPrimary),
            position: index
          }))
        }
      }
    });
  }

  await prisma.review.createMany({
    data: [
      {
        name: "Adaeze I.",
        roleLabel: "Corporate Buyer, Lagos",
        rating: 5,
        quote:
          "The shortlist was accurate, the pricing was transparent, and the team handled delivery like a proper premium operation.",
        featured: true,
        userId: customer.id,
        dealerId: dealer.id
      },
      {
        name: "Sola K.",
        roleLabel: "Family SUV Buyer, Abuja",
        rating: 5,
        quote:
          "I could actually trust what I was seeing on the platform. The process felt structured from inquiry to inspection.",
        featured: true,
        dealerId: dealer.id
      }
    ],
    skipDuplicates: true
  });

  await prisma.siteSetting.upsert({
    where: { key: "homepage" },
    update: {},
    create: {
      key: "homepage",
      value: {
        heroHeading: "Buy premium vehicles with confidence.",
        primaryCta: "Browse inventory",
        secondaryCta: "List your car"
      }
    }
  });

  console.log(`Seed complete. Admin user: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
