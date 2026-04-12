// Legacy Vite page kept for reference only.
// The active homepage now lives in app/page.tsx and components/home/*.
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PricingSnapshotTable from "../components/PricingSnapshotTable.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { servicePricingSnapshot } from "../data/servicePricing.js";
import vehicleCatalog from "../data/vehicleCatalog.js";

const heroImage =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=80";

const stats = [
  { value: "100+", label: "Verified listings" },
  { value: "15+", label: "Years in market" },
  { value: "24 hrs", label: "Average response time" },
  { value: "120-point", label: "Inspection standard" }
];

const partnerBrands = ["Toyota", "Lexus", "Mercedes-Benz", "BMW", "Ford", "Honda"];

const trustHighlights = [
  {
    title: "Verified listings",
    text: "Each vehicle is reviewed for ownership history, condition, and market-aligned pricing."
  },
  {
    title: "Trusted dealers",
    text: "We work with vetted sourcing partners and experienced advisors across key Nigerian cities."
  },
  {
    title: "Transparent pricing",
    text: "Clear valuation guidance, finance support, and no hidden marketplace surprises."
  },
  {
    title: "Inspected vehicles",
    text: "Major systems, interior condition, and documentation are checked before vehicles go live."
  }
];

const featuredCollections = [
  {
    title: "Executive Sedans",
    description: "Comfort-first models for daily driving, client movement, and polished business travel."
  },
  {
    title: "Family SUVs",
    description: "Spacious, durable options designed for long-distance comfort and practical flexibility."
  },
  {
    title: "Prestige Picks",
    description: "High-spec models with standout design, premium cabin finishes, and stronger resale appeal."
  }
];

const steps = [
  {
    title: "Discover",
    text: "Use structured search, pricing, and specs to narrow quickly."
  },
  {
    title: "Validate",
    text: "Review verified condition details, dealership support, and finance options."
  },
  {
    title: "Convert",
    text: "Book a test drive, request a quote, or speak with a specialist without friction."
  }
];

const testimonials = [
  {
    name: "Chinedu A.",
    quote:
      "The pricing was clear, the inspection was documented, and the delivery process felt properly managed.",
    location: "Lagos"
  },
  {
    name: "Teni O.",
    quote:
      "It felt like buying from a real automotive brand, not scrolling through random listings.",
    location: "Abuja"
  },
  {
    name: "Seyi K.",
    quote:
      "The team helped me shortlist quickly and book a test drive without back-and-forth stress.",
    location: "Port Harcourt"
  }
];

const ctaBlocks = [
  {
    title: "Browse inventory",
    text: "Explore ready-to-drive sedans, SUVs, trucks, and vans in one structured catalog.",
    link: "/showroom",
    action: "View listings"
  },
  {
    title: "Sell your vehicle",
    text: "Connect with our team for pricing support, inspections, and qualified buyer reach.",
    link: "/contact",
    action: "Start appraisal"
  },
  {
    title: "Book a service visit",
    text: "Keep your vehicle showroom-ready with diagnostics, detailing, and after-sales care.",
    link: "/factory",
    action: "Schedule service"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const featuredVehicles = vehicleCatalog.slice(0, 6);
  const [heroSearch, setHeroSearch] = useState({
    query: "",
    type: "",
    maxPrice: ""
  });

  const handleHeroChange = (event) => {
    const { name, value } = event.target;
    setHeroSearch((current) => ({ ...current, [name]: value }));
  };

  const handleHeroSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (heroSearch.query.trim()) params.set("q", heroSearch.query.trim());
    if (heroSearch.type) params.set("type", heroSearch.type);
    if (heroSearch.maxPrice) params.set("max", heroSearch.maxPrice);

    navigate(`/showroom${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-background" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-overlay" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="hero-eyebrow">Trusted automotive marketplace</span>
            <h1>Find premium vehicles with the confidence of a modern dealer platform.</h1>
            <p>
              Browse verified listings, compare serious options, and move from
              discovery to test drive with a cleaner, more trustworthy buying journey.
            </p>

            <div className="hero-actions">
              <NavLink className="button button-primary" to="/showroom">
                Browse Inventory
              </NavLink>
              <NavLink className="button button-secondary button-on-dark" to="/contact">
                Speak to Sales
              </NavLink>
            </div>

            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-search-card">
            <div className="hero-search-head">
              <span className="section-eyebrow">Search smarter</span>
              <h2>Start with the right fit</h2>
              <p>Use premium quick filters to jump directly into the best inventory for your budget.</p>
            </div>

            <form className="hero-search-form" onSubmit={handleHeroSubmit}>
              <label>
                Search by make or model
                <input
                  name="query"
                  placeholder="Toyota, Lexus, G-Wagon..."
                  value={heroSearch.query}
                  onChange={handleHeroChange}
                />
              </label>

              <div className="hero-search-grid">
                <label>
                  Body type
                  <select name="type" value={heroSearch.type} onChange={handleHeroChange}>
                    <option value="">All types</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                  </select>
                </label>

                <label>
                  Max budget
                  <select name="maxPrice" value={heroSearch.maxPrice} onChange={handleHeroChange}>
                    <option value="">Any budget</option>
                    <option value="20000000">Up to NGN 20M</option>
                    <option value="40000000">Up to NGN 40M</option>
                    <option value="80000000">Up to NGN 80M</option>
                    <option value="200000000">Up to NGN 200M</option>
                  </select>
                </label>
              </div>

              <button type="submit" className="button button-primary button-full">
                Search Inventory
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="brand-strip-section">
        <div className="container brand-strip">
          <span className="brand-strip-label">Popular brands on the marketplace</span>
          <div className="brand-strip-logos" aria-label="Popular vehicle brands">
            {partnerBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured inventory"
            title="Popular vehicles buyers are exploring now"
            description="Premium cards, clearer pricing, and faster access to the details that matter most."
            linkLabel="View all inventory"
            linkTo="/showroom"
          />

          <div className="vehicle-grid">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Trust and quality"
            title="Marketplace standards designed to build confidence"
            description="Every interaction is structured to make discovery easier, pricing clearer, and decisions more informed."
            align="center"
          />

          <div className="trust-grid">
            {trustHighlights.map((item) => (
              <article key={item.title} className="trust-card">
                <span className="trust-icon" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-panel">
            <div className="split-panel-copy">
              <span className="section-eyebrow">Curated discovery</span>
              <h2>Shop the marketplace the way real buyers think</h2>
              <p>
                Whether you are buying for executive use, family comfort, or premium
                status, the journey is now built around clearer decisions and faster
                scanning.
              </p>
              <div className="journey-steps">
                {steps.map((step) => (
                  <article key={step.title} className="journey-step">
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="collection-list">
              {featuredCollections.map((item) => (
                <article key={item.title} className="collection-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container cta-band-grid">
          {ctaBlocks.map((item) => (
            <article key={item.title} className="cta-band-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <NavLink className="section-link" to={item.link}>
                {item.action}
              </NavLink>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Ownership support"
            title="Transparent service pricing at a glance"
            description="A cleaner table and structured ranges help customers understand what comes next after purchase."
            align="center"
          />
          <PricingSnapshotTable items={servicePricingSnapshot} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Customer feedback"
            title="Built to feel credible from first click to final handover"
            description="Real marketplace UX is about reducing friction and uncertainty. These stories reinforce that promise."
            align="center"
          />

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <p className="testimonial-quote">"{item.quote}"</p>
                <strong>{item.name}</strong>
                <span>{item.location}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container final-cta">
          <div>
            <span className="section-eyebrow">Ready to move forward?</span>
            <h2>Browse verified inventory or speak with a product specialist today.</h2>
          </div>
          <div className="final-cta-actions">
            <NavLink className="button button-primary" to="/showroom">
              Browse Inventory
            </NavLink>
            <NavLink className="button button-secondary" to="/contact">
              Contact Dealer
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
