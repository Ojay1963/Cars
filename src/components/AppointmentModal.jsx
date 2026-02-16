import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  date: "",
  time: "",
  reason: "Test Drive",
  notes: ""
};

export default function AppointmentModal({ open, onClose, title, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm(initialForm);
    setStatus("");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      setStatus("Please complete the required fields.");
      return;
    }
    if (onSubmit) {
      onSubmit(form);
      setStatus("Opening your email client to complete the request.");
      return;
    }
    setStatus("Appointment request received. We will confirm shortly.");
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title || "Schedule an Appointment"}</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="modal-grid">
            <label>
              Full name *
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </label>
            <label>
              Email
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
              />
            </label>
            <label>
              Phone *
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234..."
              />
            </label>
            <label>
              Preferred city
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Lagos, Abuja..."
              />
            </label>
            <label>
              Date *
              <input name="date" type="date" value={form.date} onChange={handleChange} />
            </label>
            <label>
              Time *
              <input name="time" type="time" value={form.time} onChange={handleChange} />
            </label>
            <label>
              Appointment type
              <select name="reason" value={form.reason} onChange={handleChange}>
                <option>Test Drive</option>
                <option>Service</option>
                <option>Finance Consultation</option>
                <option>Delivery</option>
              </select>
            </label>
          </div>
          <label className="modal-notes">
            Notes
            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any extra details you want us to know..."
            />
          </label>
          <button type="submit" className="modal-submit">
            Request Appointment
          </button>
          {status && <span className="modal-status">{status}</span>}
        </form>
      </div>
    </div>
  );
}
