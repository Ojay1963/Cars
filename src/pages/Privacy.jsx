import { NavLink } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";

const privacySections = [
  {
    title: "Information we collect",
    text: "We may collect contact details, appointment requests, saved vehicle preferences, and browsing interactions needed to improve the marketplace experience."
  },
  {
    title: "How information is used",
    text: "Information is used to respond to inquiries, coordinate test drives or service bookings, improve listings, and support customer communication."
  },
  {
    title: "Data protection",
    text: "Access to customer information should be limited to authorized personnel, and operational systems should follow reasonable security and retention practices."
  },
  {
    title: "Customer choices",
    text: "Customers should be able to request clarification, updates, or removal of personal information through the official support channels."
  }
];

export default function Privacy() {
  return (
    <section className="page-section legal-page">
      <div className="container">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="This page now matches the product experience with a cleaner, structured legal layout. Replace the placeholder copy with your final approved policy when ready."
        />

        <div className="legal-layout">
          {privacySections.map((section) => (
            <article key={section.title} className="surface-card legal-card">
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>

        <div className="surface-card legal-cta">
          <div>
            <span className="section-eyebrow">Need support?</span>
            <h3>Contact the team for privacy-related questions</h3>
            <p>
              If you need clarification on data handling, requests, or account-related
              concerns, reach out directly through the contact page.
            </p>
          </div>
          <NavLink className="button button-primary" to="/contact">
            Contact Support
          </NavLink>
        </div>
      </div>
    </section>
  );
}
