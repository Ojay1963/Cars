import { NavLink, useNavigate } from "react-router-dom";
import vehicleCatalog from "../data/vehicleCatalog.js";
import PricingSnapshotTable from "../components/PricingSnapshotTable.jsx";
import { servicePricingSnapshot } from "../data/servicePricing.js";

const heroImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80";
const ctaImage =
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2000&q=80";

const stats = [
  { value: "500+", label: "Cars Sold" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support" }
];

const whyCards = [
  {
    title: "Certified Quality",
    text: "Every vehicle comes with a comprehensive inspection and certification of authenticity.",
    icon: "M12 4l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V7l7-3z"
  },
  {
    title: "Instant Financing",
    text: "Get approved in minutes with our streamlined financing process.",
    icon: "M4 7h16v10H4zM9 11h6"
  },
  {
    title: "Award Winning Service",
    text: "Rated #1 dealership for customer satisfaction three years in a row.",
    icon: "M12 6l2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 16l-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L12 6z"
  }
];

const testimonials = [
  {
    name: "Chinedu A.",
    quote: "Smooth financing, fast delivery, and the car was exactly as listed.",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Teni O.",
    quote: "Best dealership experience I have had in Lagos. Clear pricing and great support.",
    location: "Abuja, Nigeria",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Seyi K.",
    quote: "Trade-in was simple and the team helped me upgrade in one visit.",
    location: "Port Harcourt, Nigeria",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
  }
];

const timeline = [
  { title: "Test Drive", time: "30–45 min" },
  { title: "Purchase Process", time: "2–3 hours" },
  { title: "Vehicle Delivery", time: "Same day" },
  { title: "Detailing", time: "3–5 hours" }
];

const fleetPerks = [
  "Priority sourcing for fleet vehicles",
  "Consolidated monthly invoicing",
  "Dedicated account advisor",
  "After-hours drop-off"
];

const partsBrands = [
  {
    title: "OEM Parts",
    text: "Factory-fit components for original performance."
  },
  {
    title: "Premium Aftermarket",
    text: "High-quality alternatives when OEM is unavailable."
  },
  {
    title: "Warranty Options",
    text: "Clear coverage and protection tiers for every budget."
  }
];

const sustainability = [
  "Fluid recovery and recycling",
  "Low-VOC cleaners and coatings",
  "LED lighting across all bays",
  "Digital estimates to reduce paper waste"
];

const beforeAfter = [
  {
    title: "Interior Deep Clean",
    text: "Stain removal, steam treatment, and fresh finish."
  },
  {
    title: "Headlight Restoration",
    text: "Clarity restored for safer night visibility."
  },
  {
    title: "Paint Correction",
    text: "Swirl removal and gloss enhancement."
  }
];
export default function Home() {
  const navigate = useNavigate();
  const featured = vehicleCatalog.slice(0, 3);

  return (
    <>
      <section className="home-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-pill">Premium Dealership Experience</span>
          <h1>
            Find Your Dream Car
            <span>Without Limits.</span>
          </h1>
          <p>
            Discover a curated collection of the finest vehicles in Nigeria.
            Unmatched quality, transparent pricing, and exceptional service.
          </p>
          <div className="hero-actions">
            <NavLink className="btn primary" to="/showroom">
              Browse Inventory
            </NavLink>
            <NavLink className="btn ghost" to="/contact">
              Contact Sales
            </NavLink>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container fade-in">
          <div className="section-header">
            <div>
              <h2>Featured Vehicles</h2>
              <p>Hand-picked from our exclusive collection. Each vehicle undergoes a rigorous inspection.</p>
            </div>
            <NavLink className="text-link" to="/showroom">
              View All
            </NavLink>
          </div>
          <div className="card-grid">
            {featured.map((car) => (
              <article
                key={car.id}
                className="vehicle-card"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/showroom/${car.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/showroom/${car.id}`);
                  }
                }}
              >
                <div
                  className="vehicle-media"
                  style={{ backgroundImage: `url(${car.image})` }}
                >
                  <span className="tag">{car.type}</span>
                </div>
                <div className="vehicle-content">
                  <h3>{car.name}</h3>
                  <span className="vehicle-meta">{car.type} ï¿½ Stock #{car.id.split("-").pop()}</span>
                  <div className="vehicle-specs">
                    <span>{car.distance}</span>
                    <span>{car.transmission}</span>
                    <span>{car.fuel}</span>
                  </div>
                  <div className="vehicle-footer">
                    <div>
                      <span className="price-label">Price</span>
                      <strong>{car.price}</strong>
                    </div>
                    <NavLink
                      className="spec-link"
                      to={`/showroom/${car.id}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      View Specs
                    </NavLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Why Choose Ojay Motors</h2>
            <p>We are not just selling cars; we are providing a lifestyle.</p>
          </div>
          <div className="feature-grid">
            {whyCards.map((card) => (
              <article key={card.title} className="feature-card">
                <span className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={card.icon} />
                  </svg>
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Customer Stories</h2>
            <p>Trusted by drivers across Nigeria for clarity and quality care.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <img className="testimonial-avatar" src={item.image} alt={item.name} />
                <p className="testimonial-quote">"{item.quote}"</p>
                <strong className="testimonial-name">{item.name}</strong>
                <span className="testimonial-location">{item.location}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Pricing Snapshot</h2>
            <p>Transparent estimates before work begins.</p>
          </div>
          <PricingSnapshotTable items={servicePricingSnapshot} />
        </div>
      </section>

      <section className="section">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Service Timeline</h2>
            <p>Typical completion windows for popular services.</p>
          </div>
          <div className="timeline-grid">
            {timeline.map((item) => (
              <article key={item.title} className="timeline-card">
                <h3>{item.title}</h3>
                <span>{item.time}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Fleet & Corporate</h2>
            <p>Reliable sourcing and service plans for business fleets.</p>
          </div>
          <div className="fleet-card">
            <ul>
              {fleetPerks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <NavLink className="text-link" to="/contact">
              Create a Fleet Account
            </NavLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Parts & Brands</h2>
            <p>We match the right part to your vehicle and budget.</p>
          </div>
          <div className="parts-grid">
            {partsBrands.map((item) => (
              <article key={item.title} className="parts-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Sustainability</h2>
            <p>Responsible practices that reduce waste and energy use.</p>
          </div>
          <div className="sustain-grid">
            {sustainability.map((item) => (
              <div key={item} className="sustain-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container fade-in">
          <div className="section-header centered">
            <h2>Before & After</h2>
            <p>Detailing and restoration results you can see.</p>
          </div>
          <div className="before-after-grid">
            {beforeAfter.map((item) => (
              <article key={item.title} className="before-after-card">
                <div className="before-after-badge">Before / After</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner" style={{ backgroundImage: `url(${ctaImage})` }}>
        <div className="cta-overlay" />
        <div className="container cta-content">
          <h2>Ready to upgrade your ride?</h2>
          <p>
            Schedule a test drive today and experience the difference. Our team is
            ready to help you find the perfect vehicle.
          </p>
          <NavLink className="btn primary" to="/contact">
            Schedule Test Drive
          </NavLink>
        </div>
      </section>
    </>
  );
}



