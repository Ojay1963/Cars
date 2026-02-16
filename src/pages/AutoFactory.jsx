import { useState } from "react";
import { NavLink } from "react-router-dom";
import PricingSnapshotTable from "../components/PricingSnapshotTable.jsx";
import { servicePricingSnapshot } from "../data/servicePricing.js";
import { postJson } from "../utils/api.js";

const services = [
  {
    title: "Oil Change",
    text: "Full synthetic, blend, or conventional oil change with filter replacement.",
    price: "From ₦18,000",
    image:
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Brake Repair",
    text: "Brake pad replacement, rotor resurfacing, and fluid flush.",
    price: "Free Inspection",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Tire Services",
    text: "Tire rotation, balancing, alignment, and new tire installation.",
    price: "From ₦28,000",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Engine Diagnostics",
    text: "Comprehensive engine check using state-of-the-art diagnostic tools.",
    price: "From ₦45,000",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Battery Service",
    text: "Battery testing, terminal cleaning, and replacement if needed.",
    price: "Free Testing",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "AC & Heating",
    text: "System evacuation, recharge, and leak detection services.",
    price: "From ₦55,000",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
  }
];

const whyChoose = [
  {
    title: "Certified Technicians",
    text: "ASE-certified mechanics with multi-brand expertise."
  },
  {
    title: "Genuine Parts",
    text: "We use OEM or high-quality aftermarket parts for all repairs."
  },
  {
    title: "Transparent Pricing",
    text: "No hidden fees. We provide detailed quotes before any work."
  },
  {
    title: "Satisfaction Guaranteed",
    text: "24-month warranty on parts and labor for peace of mind."
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
    a: "Most brake services are completed within 2–3 hours."
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
      <div className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1>Our Services</h1>
            <p>Comprehensive auto care delivered by certified experts.</p>
            <NavLink className="service-hero-cta" to="/contact">
              Schedule Service
            </NavLink>
          </div>
        </div>
      </div>

      <div className="container">
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
                <NavLink className="service-tile-cta" to="/contact">
                  Book This Service
                </NavLink>
              </div>
            </article>
          ))}
        </div>

        <div className="service-section">
          <div className="section-header centered">
            <h2>Pricing Snapshot</h2>
            <p>Transparent estimates before work begins.</p>
          </div>
          <PricingSnapshotTable items={servicePricingSnapshot} />
        </div>

        <div className="service-section">
          <div className="section-header centered">
            <h2>Why Choose AutoFactory?</h2>
            <p>Dealership-quality service at independent shop prices.</p>
          </div>
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
          <div className="section-header centered">
            <h2>Frequently Asked Questions</h2>
            <p>Got questions about your vehicle service? We have answers.</p>
          </div>
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
            <h2>Ready to schedule your visit?</h2>
            <p>
              Book your appointment in minutes. Our service advisors will confirm your
              slot within 30 minutes.
            </p>
            <ul>
              {bookingBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <form className="service-cta-form" onSubmit={handleBookingSubmit}>
            <h3>Book Appointment</h3>
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
            {bookingStatus && <span className="form-status">{bookingStatus}</span>}
          </form>
        </div>
      </div>
    </section>
  );
}
