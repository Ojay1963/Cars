import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sampleListings } from "@/lib/data/sample-data";
import {
  createListingSchema,
  listingFilterSchema,
  type CreateListingInput,
  type ListingFilterInput
} from "@/schemas/listing";
import { slugify } from "@/lib/utils";

const listingSelect = {
  id: true,
  slug: true,
  title: true,
  make: true,
  model: true,
  trim: true,
  year: true,
  price: true,
  mileage: true,
  fuelType: true,
  transmission: true,
  bodyType: true,
  color: true,
  condition: true,
  location: true,
  featured: true,
  status: true,
  engine: true,
  drivetrain: true,
  createdAt: true,
  images: {
    orderBy: { position: "asc" as const },
    take: 1,
    select: {
      url: true,
      altText: true
    }
  },
  dealer: {
    select: {
      businessName: true,
      verified: true
    }
  }
} satisfies Prisma.CarListingSelect;

export async function getFeaturedListings(limit = 6) {
  if (!process.env.DATABASE_URL) {
    return sampleListings
      .filter((listing) => listing.featured)
      .slice(0, limit)
      .map((listing) => ({
        ...listing,
        id: listing.slug,
        createdAt: new Date(),
        images: listing.images.slice(0, 1),
        dealer: {
          businessName: "Ojay Premium Autos",
          verified: true
        }
      }));
  }

  try {
    return await prisma.carListing.findMany({
      where: {
        status: "PUBLISHED",
        featured: true
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit,
      select: listingSelect
    });
  } catch {
    return sampleListings
      .filter((listing) => listing.featured)
      .slice(0, limit)
      .map((listing) => ({
        ...listing,
        id: listing.slug,
        createdAt: new Date(),
        images: listing.images.slice(0, 1),
        dealer: {
          businessName: "Ojay Premium Autos",
          verified: true
        }
      }));
  }
}

export async function getInventory(filters: Partial<ListingFilterInput>) {
  const parsed = listingFilterSchema.parse(filters);

  if (!process.env.DATABASE_URL) {
    return sampleListings.slice(0, parsed.perPage).map((listing) => ({
      ...listing,
      id: listing.slug,
      createdAt: new Date(),
      images: listing.images.slice(0, 1),
      dealer: {
        businessName: "Ojay Premium Autos",
        verified: true
      }
    }));
  }

  const where: Prisma.CarListingWhereInput = {
    status: parsed.status ? (parsed.status as never) : "PUBLISHED",
    featured: parsed.featured,
    make: parsed.make ? { equals: parsed.make, mode: "insensitive" } : undefined,
    model: parsed.model ? { contains: parsed.model, mode: "insensitive" } : undefined,
    bodyType: parsed.bodyType ? (parsed.bodyType as never) : undefined,
    fuelType: parsed.fuelType ? (parsed.fuelType as never) : undefined,
    transmission: parsed.transmission ? (parsed.transmission as never) : undefined,
    condition: parsed.condition ? (parsed.condition as never) : undefined,
    location: parsed.location ? { contains: parsed.location, mode: "insensitive" } : undefined,
    price: {
      gte: parsed.minPrice,
      lte: parsed.maxPrice
    },
    year: {
      gte: parsed.minYear,
      lte: parsed.maxYear
    },
    OR: parsed.search
      ? [
          { title: { contains: parsed.search, mode: "insensitive" } },
          { make: { contains: parsed.search, mode: "insensitive" } },
          { model: { contains: parsed.search, mode: "insensitive" } },
          { location: { contains: parsed.search, mode: "insensitive" } }
        ]
      : undefined
  };

  const orderByMap: Record<string, Prisma.CarListingOrderByWithRelationInput[]> = {
    newest: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    oldest: [{ createdAt: "asc" }],
    "price-asc": [{ price: "asc" }],
    "price-desc": [{ price: "desc" }],
    "mileage-asc": [{ mileage: "asc" }],
    "year-desc": [{ year: "desc" }]
  };

  return prisma.carListing.findMany({
    where,
    orderBy: orderByMap[parsed.sort ?? "newest"],
    take: parsed.perPage,
    skip: (parsed.page - 1) * parsed.perPage,
    select: listingSelect
  });
}

export async function getListingBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    const listing = sampleListings.find((item) => item.slug === slug);
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      id: listing.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      dealer: {
        id: "sample-dealer",
        userId: "sample-user",
        businessName: "Ojay Premium Autos",
        slug: "ojay-premium-autos",
        description: "Verified premium dealer.",
        phone: "+2348002866678",
        website: null,
        address: "15 Adeola Odeku Street, Victoria Island, Lagos",
        city: "Lagos",
        state: "Lagos",
        logoUrl: null,
        coverImageUrl: null,
        verified: true,
        responseRate: 96,
        responseTimeMins: 28,
        ratingAverage: 4.8,
        totalReviews: 128,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      images: listing.images.map((image, index) => ({
        id: `${listing.slug}-${index}`,
        listingId: listing.slug,
        publicId: null,
        width: null,
        height: null,
        position: index,
        createdAt: new Date(),
        ...image
      }))
    };
  }

  try {
    const listing = await prisma.carListing.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { position: "asc" }
        },
        dealer: true
      }
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch {
    const listing = sampleListings.find((item) => item.slug === slug);
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      id: listing.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      dealer: {
        id: "sample-dealer",
        userId: "sample-user",
        businessName: "Ojay Premium Autos",
        slug: "ojay-premium-autos",
        description: "Verified premium dealer.",
        phone: "+2348002866678",
        website: null,
        address: "15 Adeola Odeku Street, Victoria Island, Lagos",
        city: "Lagos",
        state: "Lagos",
        logoUrl: null,
        coverImageUrl: null,
        verified: true,
        responseRate: 96,
        responseTimeMins: 28,
        ratingAverage: 4.8,
        totalReviews: 128,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      images: listing.images.map((image, index) => ({
        id: `${listing.slug}-${index}`,
        listingId: listing.slug,
        publicId: null,
        width: null,
        height: null,
        position: index,
        createdAt: new Date(),
        ...image
      }))
    };
  }
}

export async function createListing(
  input: CreateListingInput,
  context: { userId: string; role: "ADMIN" | "DEALER" | "USER" }
) {
  const parsed = createListingSchema.parse(input);

  if (!process.env.DATABASE_URL) {
    return {
      id: `draft-${Date.now()}`,
      slug: slugify(`${parsed.year}-${parsed.make}-${parsed.model}-${parsed.title}`),
      title: parsed.title
    };
  }

  let dealerId: string | null = null;
  if (context.role === "DEALER") {
    const dealer = await prisma.dealerProfile.findUnique({
      where: { userId: context.userId },
      select: { id: true }
    });
    dealerId = dealer?.id ?? null;
  }

  let slugBase = slugify(`${parsed.year}-${parsed.make}-${parsed.model}-${parsed.title}`);
  let slug = slugBase;
  let counter = 1;

  while (await prisma.carListing.findUnique({ where: { slug }, select: { id: true } })) {
    counter += 1;
    slug = `${slugBase}-${counter}`;
  }

  return prisma.carListing.create({
    data: {
      slug,
      title: parsed.title,
      make: parsed.make,
      model: parsed.model,
      trim: parsed.trim || null,
      year: parsed.year,
      price: parsed.price,
      mileage: parsed.mileage,
      fuelType: parsed.fuelType,
      transmission: parsed.transmission,
      bodyType: parsed.bodyType,
      color: parsed.color,
      condition: parsed.condition,
      description: parsed.description,
      location: parsed.location,
      city: parsed.city,
      state: parsed.state,
      engine: parsed.engine || null,
      drivetrain: parsed.drivetrain || null,
      seats: parsed.seats ?? null,
      doors: parsed.doors ?? null,
      featured: parsed.featured ?? false,
      status: parsed.status,
      sellerId: context.userId,
      dealerId,
      publishedAt: parsed.status === "PUBLISHED" ? new Date() : null,
      images: {
        create: parsed.photos.map((url, index) => ({
          url,
          altText: `${parsed.title} photo ${index + 1}`,
          position: index,
          isPrimary: index === 0
        }))
      }
    },
    select: {
      id: true,
      slug: true,
      title: true
    }
  });
}
