import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/notifications";
import type { ContactInput, InquiryInput } from "@/schemas/listing";

export async function createContactMessage(input: ContactInput) {
  if (!process.env.DATABASE_URL) {
    await sendLeadNotification({
      type: "contact",
      title: `Contact form submitted by ${input.name}`,
      recipient: process.env.ADMIN_EMAIL || "admin@ojaymotors.ng",
      metadata: {
        email: input.email,
        phone: input.phone || "",
        subject: input.subject
      }
    });

    return {
      id: `contact-${Date.now()}`,
      createdAt: new Date()
    };
  }

  const message = await prisma.contactMessage.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      subject: input.subject,
      message: input.message
    }
  });

  await sendLeadNotification({
    type: "contact",
    title: `Contact form submitted by ${input.name}`,
    recipient: process.env.ADMIN_EMAIL || "admin@ojaymotors.ng",
    metadata: {
      email: input.email,
      phone: input.phone || "",
      subject: input.subject,
      messageId: message.id
    }
  });

  return message;
}

export async function createInquiry(input: InquiryInput, userId?: string) {
  const listing = process.env.DATABASE_URL
    ? await prisma.carListing.findUnique({
        where: { id: input.listingId },
        select: {
          id: true,
          title: true,
          dealerId: true,
          dealer: {
            select: {
              businessName: true,
              user: {
                select: {
                  email: true
                }
              }
            }
          }
        }
      })
    : null;

  if (process.env.DATABASE_URL && !listing) {
    throw new Error("Listing not found.");
  }

  if (!process.env.DATABASE_URL) {
    await sendLeadNotification({
      type: "inquiry",
      title: `Inquiry submitted by ${input.name}`,
      recipient: process.env.ADMIN_EMAIL || "admin@ojaymotors.ng",
      metadata: {
        email: input.email,
        phone: input.phone,
        listingId: input.listingId
      }
    });

    return {
      id: `inquiry-${Date.now()}`,
      createdAt: new Date()
    };
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      listingId: input.listingId,
      customerId: userId ?? null,
      dealerId: listing?.dealerId ?? null,
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message
    }
  });

  await sendLeadNotification({
    type: "inquiry",
    title: `New inquiry for ${listing?.title ?? "listing"}`,
    recipient:
      listing?.dealer?.user.email ||
      process.env.ADMIN_EMAIL ||
      "admin@ojaymotors.ng",
    metadata: {
      email: input.email,
      phone: input.phone,
      inquiryId: inquiry.id,
      listingId: input.listingId,
      dealer: listing?.dealer?.businessName || null
    }
  });

  return inquiry;
}

export async function getDashboardLeadSummary(role: "ADMIN" | "DEALER" | "USER", userId: string) {
  if (!process.env.DATABASE_URL) {
    return {
      stats: {
        inquiries: 0,
        contacts: 0,
        listings: 0
      },
      recentInquiries: [],
      recentContacts: []
    };
  }

  if (role === "ADMIN") {
    const [inquiries, contacts, listings, recentInquiries, recentContacts] = await Promise.all([
      prisma.inquiry.count(),
      prisma.contactMessage.count(),
      prisma.carListing.count(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          listing: { select: { title: true, slug: true } },
          dealer: { select: { businessName: true } }
        }
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      })
    ]);

    return {
      stats: { inquiries, contacts, listings },
      recentInquiries,
      recentContacts
    };
  }

  if (role === "DEALER") {
    const dealer = await prisma.dealerProfile.findUnique({
      where: { userId },
      select: { id: true }
    });

    const [inquiries, listings, recentInquiries] = await Promise.all([
      prisma.inquiry.count({
        where: {
          dealerId: dealer?.id
        }
      }),
      prisma.carListing.count({
        where: {
          sellerId: userId
        }
      }),
      prisma.inquiry.findMany({
        where: {
          dealerId: dealer?.id
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          listing: { select: { title: true, slug: true } }
        }
      })
    ]);

    return {
      stats: {
        inquiries,
        contacts: 0,
        listings
      },
      recentInquiries,
      recentContacts: []
    };
  }

  const [inquiries, favorites] = await Promise.all([
    prisma.inquiry.count({
      where: {
        customerId: userId
      }
    }),
    prisma.favorite.count({
      where: {
        userId
      }
    })
  ]);

  return {
    stats: {
      inquiries,
      contacts: 0,
      listings: favorites
    },
    recentInquiries: await prisma.inquiry.findMany({
      where: { customerId: userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        listing: { select: { title: true, slug: true } }
      }
    }),
    recentContacts: []
  };
}
