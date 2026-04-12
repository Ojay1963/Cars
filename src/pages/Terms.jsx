import { NavLink } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";

const termsSections = [
  {
    title: "Marketplace use",
    text: "Users should rely on the platform for browsing, inquiries, booking requests, and dealership communication in line with applicable local regulations and business policies."
  },
  {
    title: "Pricing and availability",
    text: "Vehicle pricing, specifications, and availability may change, so final confirmation should always happen with the sales or operations team before a transaction is completed."
  },
  {
    title: "Bookings and appointments",
    text: "Test drive and service bookings submitted through the platform are requests until confirmed by the dealership or service team."
  },
  {
    title: "Warranties and liability",
    text: "Any final sale terms, warranties, financing conditions, and delivery obligations should be documented in the official transaction or service paperwork."
  }
];

export default function Terms() {
  return (
    <section className="page-section legal-page">
      <div className="container">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Service"
          description="This structured page replaces the basic placeholder treatment and gives the legal content the same polished product framing as the rest of the site."
        />

        <div className="legal-layout">
          {termsSections.map((section) => (
            <article key={section.title} className="surface-card legal-card">
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>

        <div className="surface-card legal-cta">
          <div>
            <span className="section-eyebrow">Questions about terms?</span>
            <h3>Speak with the team before moving forward</h3>
            <p>
              For clarity on transactions, appointments, financing, or service obligations,
              contact the dealership directly before committing.
            </p>
          </div>
          <NavLink className="button button-primary" to="/contact">
            Contact Dealer
          </NavLink>
        </div>
      </div>
    </section>
  );
}
