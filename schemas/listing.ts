import { z } from "zod";

export const listingFilterSchema = z.object({
  search: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  bodyType: z.string().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  condition: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  maxYear: z.coerce.number().optional(),
  sort: z
    .enum(["newest", "oldest", "price-asc", "price-desc", "mileage-asc", "year-desc"])
    .optional(),
  featured: z.coerce.boolean().optional(),
  status: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(24).default(9)
});

export const inquirySchema = z.object({
  listingId: z.string().cuid("Invalid listing identifier."),
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  message: z.string().min(10, "Tell us more about what you need."),
  honeypot: z.string().max(0).optional().default("")
});

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number.").optional().or(z.literal("")),
  subject: z.string().min(3, "Enter a short subject."),
  message: z.string().min(12, "Please include a little more detail."),
  honeypot: z.string().max(0).optional().default("")
});

export const sellerLeadSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  make: z.string().min(2, "Enter the vehicle make."),
  model: z.string().min(1, "Enter the vehicle model."),
  year: z.coerce.number().min(1990, "Enter a valid model year.").max(2100),
  mileage: z.coerce.number().min(0, "Mileage cannot be negative."),
  askingPrice: z.coerce.number().min(0, "Enter a valid asking price."),
  location: z.string().min(2, "Enter your location."),
  photos: z.array(z.string().url("Invalid uploaded image URL.")).min(1, "Upload at least one vehicle photo."),
  notes: z.string().min(12, "Add a little more detail about the vehicle."),
  honeypot: z.string().max(0).optional().default("")
});

export const createListingSchema = z.object({
  title: z.string().min(6, "Enter a descriptive listing title."),
  make: z.string().min(2, "Enter the vehicle make."),
  model: z.string().min(1, "Enter the vehicle model."),
  trim: z.string().optional().or(z.literal("")),
  year: z.coerce.number().min(1990, "Enter a valid model year.").max(2100),
  price: z.coerce.number().min(0, "Enter a valid price."),
  mileage: z.coerce.number().min(0, "Enter a valid mileage."),
  fuelType: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC"]),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  bodyType: z.enum(["SEDAN", "SUV", "COUPE", "HATCHBACK", "TRUCK", "VAN", "CONVERTIBLE"]),
  color: z.string().min(2, "Enter the vehicle color."),
  condition: z.enum(["NEW", "FOREIGN_USED", "NIGERIAN_USED", "CERTIFIED_PRE_OWNED"]),
  description: z.string().min(20, "Add a fuller description for the listing."),
  location: z.string().min(2, "Enter the listing location."),
  city: z.string().min(2, "Enter the city."),
  state: z.string().min(2, "Enter the state."),
  engine: z.string().optional().or(z.literal("")),
  drivetrain: z.string().optional().or(z.literal("")),
  seats: z.coerce.number().min(1).max(20).optional(),
  doors: z.coerce.number().min(1).max(8).optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(["DRAFT", "PENDING", "PUBLISHED", "RESERVED", "SOLD", "REJECTED"]).default("DRAFT"),
  photos: z.array(z.string().url("Invalid uploaded image URL.")).min(1, "Upload at least one listing image."),
  honeypot: z.string().max(0).optional().default("")
});

export type ListingFilterInput = z.infer<typeof listingFilterSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SellerLeadInput = z.infer<typeof sellerLeadSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type InquiryFormInput = z.input<typeof inquirySchema>;
export type ContactFormInput = z.input<typeof contactSchema>;
export type SellerLeadFormInput = z.input<typeof sellerLeadSchema>;
export type CreateListingFormInput = z.input<typeof createListingSchema>;
