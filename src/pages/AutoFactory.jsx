import { useState } from "react";
import { NavLink } from "react-router-dom";
import PricingSnapshotTable from "../components/PricingSnapshotTable.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { servicePricingSnapshot } from "../data/servicePricing.js";
import { postJson } from "../utils/api.js";

const services = [
  {
    title: "Oil Change",
    text: "Full synthetic, blend, or conventional oil change with filter replacement.",
    price: "From NGN 18,000",
    image:
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Brake Repair",
    text: "Brake pad replacement, rotor resurfacing, and fluid flush.",
    price: "Free inspection",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Tire Services",
    text: "Tire rotation, balancing, alignment, and new tire installation.",
    price: "From NGN 28,000",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Engine Diagnostics",
    text: "Comprehensive engine checks using dealership-grade diagnostic tools.",
    price: "From NGN 45,000",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Battery Service",
    text: "Battery testing, terminal cleaning, and replacement support where needed.",
    price: "Free testing",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "AC & Heating",
    text: "System evacuation, recharge, and leak detection for year-round comfort.",
    price: "From NGN 55,000",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  }
];

const whyChoose = [
  {
    title: "Certified technicians",
    text: "Experienced mechanics with multi-brand expertise and structured diagnostics."
  },
  {
    title: "Genuine parts",
    text: "We prioritize OEM or trusted premium aftermarket parts based on your needs."
  },
  {
    title: "Transparent pricing",
    text: "No hidden surprises. Quotes are clearer before work begins."
  },
  {
    title: "Ownership continuity",
    text: "The same premium service mindset carries through after the sale."
  }
];

const faqs = [
  {
    q: "Do I need an appointment for an oil change?",
    a: "Walk-ins are welcome, but booking ahead ensures the fastest service."
  },
  {
    q: "What type of oil do you use?",
    a: "We offer conventional, synthetic blend, and full synthetic options."
  },
  {
    q: "How long does a brake service take?",
    a: "Most brake services are completed within 2-3 hours depending on parts and condition."
  }
];

const bookingBenefits = [
  "Flexible scheduling with early drop-off and weekend slots.",
  "Fast turnaround with real-time status updates.",
  "Dedicated service advisor for each visit."
];

export default function AutoFactory() {
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    vehicle: "",
    serviceType: "Oil Change",
    preferredDate: "",
    details: ""
  });
  const [bookingStatus, setBookingStatus] = useState("");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    if (
      !bookingForm.fullName ||
      !bookingForm.phone ||
      !bookingForm.vehicle ||
      !bookingForm.serviceType ||
      !bookingForm.preferredDate
    ) {
      setBookingStatus("Please fill all required booking fields.");
      return;
    }

    try {
      setIsSubmittingBooking(true);
      setBookingStatus("");
      const result = await postJson("/api/appointments", bookingForm);
      setBookingStatus(
        result.message || "Appointment confirmed. A service advisor will contact you shortly."
      );
      setBookingForm({
        fullName: "",
        phone: "",
        vehicle: "",
        serviceType: "Oil Change",
        preferredDate: "",
        details: ""
      });
    } catch (error) {
      setBookingStatus(error.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <section className="section services-page pro-service">
      <div className="container">
        <div className="service-hero">
          <div className="container">
            <div className="service-hero-content">
              <span className="section-eyebrow">After-sales support</span>
              <h1>Premium vehicle care that matches the marketplace experience</h1>
              <p>
                Diagnostics, maintenance, and ownership support presented with the same
                clarity and polish as the buying journey.
              </p>
              <NavLink className="service-hero-cta" to="/contact">
                Schedule Service
              </NavLink>
            </div>
          </div>
        </div>

        <SectionHeading
          eyebrow="Core services"
          title="Structured care packages for modern vehicle ownership"
          description="Service cards now feel like premium marketplace modules instead of a basic list."
        />

        <div className="service-card-grid">
          {services.map((item) => (
            <article key={item.title} className="service-tile">
              <div
                className="service-tile-media"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <span className="service-price">{item.price}</span>
              </div>
              <div className="service-tile-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <NavLink className="button button-secondary" to="/contact">
                  Book This Service
                </NavLink>
              </div>
            </article>
          ))}
        </div>

        <div className="service-section">
          <SectionHeading
            eyebrow="Price clarity"
            title="Transparent service pricing snapshot"
            description="Customers should understand likely ownership costs before they commit."
            align="center"
          />
          <PricingSnapshotTable items={servicePricingSnapshot} />
        </div>

        <div className="service-section">
          <SectionHeading
            eyebrow="Why choose us"
            title="Service quality that reinforces marketplace trust"
            description="The same premium brand signals now carry through into after-sales support."
            align="center"
          />
          <div className="why-grid">
            {whyChoose.map((item) => (
              <article key={item.title} className="why-card">
                <span className="why-icon" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="service-section">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to common ownership questions"
            description="A clearer knowledge layer helps reduce friction before customers contact support."
            align="center"
          />
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="service-cta-band">
        <div className="container service-cta-grid">
          <div className="service-cta-copy">
            <span className="section-eyebrow">Book your visit</span>
            <h2>Ready to schedule your next service appointment?</h2>
            <p>
              Book in minutes and let a service advisor confirm your slot quickly.
            </p>
            <ul>
              {bookingBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <form className="service-cta-form" onSubmit={handleBookingSubmit}>
            <h3>Book appointment</h3>
            <div className="service-form-grid">
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={bookingForm.fullName}
                  onChange={handleBookingChange}
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 000-0000"
                  value={bookingForm.phone}
                  onChange={handleBookingChange}
                />
              </label>
              <label>
                Vehicle Make/Model
                <input
                  type="text"
                  name="vehicle"
                  placeholder="e.g. 2020 Honda Civic"
                  value={bookingForm.vehicle}
                  onChange={handleBookingChange}
                />
              </label>
              <label>
                Service Type
                <select
                  name="serviceType"
                  value={bookingForm.serviceType}
                  onChange={handleBookingChange}
                >
                  <option>Oil Change</option>
                  <option>Brake Repair</option>
                  <option>Tire Services</option>
                  <option>Diagnostics</option>
                </select>
              </label>
              <label>
                Preferred Date
                <input
                  type="date"
                  name="preferredDate"
                  value={bookingForm.preferredDate}
                  onChange={handleBookingChange}
                />
              </label>
              <label>
                Additional Details
                <textarea
                  name="details"
                  placeholder="Any specific issues?"
                  rows={3}
                  value={bookingForm.details}
                  onChange={handleBookingChange}
                />
              </label>
            </div>
            <button
              type="submit"
              className="service-form-submit"
              disabled={isSubmittingBooking}
            >
              {isSubmittingBooking ? "Confirming..." : "Confirm Appointment"}
            </button>
            {bookingStatus ? <span className="form-status">{bookingStatus}</span> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
