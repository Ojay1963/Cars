import { useState } from "react";
import { postJson } from "../utils/api.js";

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
      setStatus(result.message || "Thanks! Our team will contact you within 24 hours.");
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
    <section className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            We are here to help you find your dream car. Reach out to us with any
            questions or to schedule a visit.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-info-grid">
          <div className="info-card">
            <span className="info-icon">PH</span>
            <h3>Phone</h3>
            <p>Sales: +234 800 286 6678</p>
            <p>Service: +234 814 555 2400</p>
          </div>
          <div className="info-card">
            <span className="info-icon">AD</span>
            <h3>Address</h3>
            <p>15 Adeola Odeku Street</p>
            <p>Victoria Island, Lagos</p>
          </div>
          <div className="info-card">
            <span className="info-icon">HR</span>
            <h3>Hours</h3>
            <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat-Sun: 10:00 AM - 5:00 PM</p>
          </div>
        </div>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a message</h2>
            <div className="form-row">
              <label>
                First Name
                <input
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name
                <input
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label>
              Email Address
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
                rows="5"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn primary full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {status && <span className="form-status">{status}</span>}
          </form>

          <div className="contact-map">
            <div className="map-card" role="img" aria-label="Map preview" />
          </div>
        </div>
      </div>
    </section>
  );
}
