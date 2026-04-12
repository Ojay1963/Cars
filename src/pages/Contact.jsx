import { useState } from "react";
import { postJson } from "../utils/api.js";

const contactHighlights = [
  { title: "Sales support", value: "+234 800 286 6678" },
  { title: "Service desk", value: "+234 814 555 2400" },
  { title: "Visit the showroom", value: "15 Adeola Odeku Street, Victoria Island, Lagos" }
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setStatus("Please complete all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("");
      const result = await postJson("/api/contact", form);
      setStatus(result.message || "Thanks. Our team will contact you within 24 hours.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      });
    } catch (error) {
      setStatus(error.message || "We could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section contact-page">
      <div className="container">
        <div className="contact-shell">
          <div className="contact-intro">
            <span className="section-eyebrow">Contact dealer</span>
            <h1>Speak with a team that can help you buy, sell, or service with confidence.</h1>
            <p>
              The contact experience has been cleaned up to feel more like a premium
              product flow: clearer information, stronger hierarchy, and more useful
              next steps.
            </p>

            <div className="contact-highlight-list">
              {contactHighlights.map((item) => (
                <article key={item.title} className="contact-highlight-card">
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="contact-layout">
            <form className="contact-form surface-card" onSubmit={handleSubmit}>
              <div className="form-heading">
                <h2>Send us a message</h2>
                <p>Tell us what you need and we will route it to the right specialist.</p>
              </div>

              <div className="form-row">
                <label>
                  First name
                  <input
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Last name
                  <input
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Subject
                <select name="subject" value={form.subject} onChange={handleChange}>
                  <option>General Inquiry</option>
                  <option>Sales</option>
                  <option>Service</option>
                  <option>Financing</option>
                </select>
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="6"
                  placeholder="How can we help you today?"
                  value={form.message}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="button button-primary button-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {status ? <span className="form-status">{status}</span> : null}
            </form>

            <div className="contact-side-panel">
              <div className="surface-card contact-map-card">
                <div className="contact-map" role="img" aria-label="Map preview of showroom location" />
                <div className="contact-map-copy">
                  <h3>Visit the showroom</h3>
                  <p>
                    Premium inventory viewings, trade-in conversations, and test drive
                    planning from our Victoria Island location.
                  </p>
                </div>
              </div>

              <div className="surface-card">
                <h3>Opening hours</h3>
                <div className="contact-hours">
                  <span>Monday - Friday</span>
                  <strong>9:00 AM - 6:00 PM</strong>
                  <span>Saturday - Sunday</span>
                  <strong>10:00 AM - 5:00 PM</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
