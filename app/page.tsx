import { FinalCtaSection } from "@/components/home/final-cta-section";
import { FeaturedListingsSection } from "@/components/home/featured-listings-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TrustSection } from "@/components/home/trust-section";
import { sampleTestimonials } from "@/lib/data/sample-data";
import { getFeaturedListings } from "@/services/listings";

export default async function HomePage() {
  const listings = await getFeaturedListings(6);

  return (
    <>
      <HeroSection />
      <FeaturedListingsSection listings={listings} />
      <TrustSection />
      <ProcessSection />
      <TestimonialsSection testimonials={sampleTestimonials} />
      <FinalCtaSection />
    </>
  );
}
