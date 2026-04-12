import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AppointmentModal from "../components/AppointmentModal.jsx";
import vehicleCatalog from "../data/vehicleCatalog.js";
import useCompareVehicles from "../hooks/useCompareVehicles.js";
import useSavedVehicles from "../hooks/useSavedVehicles.js";

const assurancePoints = [
  "Verified listing review",
  "Transparent asking price",
  "Inspection-backed presentation"
];

export default function VehicleDetails() {
  const { id } = useParams();
  const vehicle = vehicleCatalog.find((item) => item.id === id);
  const { isSaved, toggleSaved } = useSavedVehicles();
  const { compareIds, canAdd, toggleCompare } = useCompareVehicles();
  const [showAppointment, setShowAppointment] = useState(false);
  const [downPayment, setDownPayment] = useState(
    vehicle ? Math.round(vehicle.priceValue * 0.2) : 0
  );
  const [term, setTerm] = useState(36);
  const [interest, setInterest] = useState(12);

  const formatNgn = (value) => `NGN ${Math.round(value).toLocaleString("en-NG")}`;

  const handleAppointmentSubmit = (payload) => {
    const subject = `Test Drive Request - ${vehicle.name}`;
    const body = [
      `Vehicle: ${vehicle.name}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email || "N/A"}`,
      `Phone: ${payload.phone}`,
      `City: ${payload.location || "N/A"}`,
      `Date: ${payload.date}`,
      `Time: ${payload.time}`,
      `Type: ${payload.reason}`,
      `Notes: ${payload.notes || "N/A"}`
    ].join("\n");

    window.location.href = `mailto:sales@ojaymotors.ng?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const monthlyEstimate = useMemo(() => {
    if (!vehicle) return 0;
    const loanAmount = Math.max(0, vehicle.priceValue - downPayment);
    if (!loanAmount || !term) return 0;
    const monthlyRate = interest / 100 / 12;
    if (!monthlyRate) return loanAmount / term;
    return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  }, [downPayment, interest, term, vehicle]);

  if (!vehicle) {
    return (
      <section className="page-section">
        <div className="container simple-page-card">
          <h1>Vehicle not found</h1>
          <p>We could not locate that listing. Try browsing the showroom instead.</p>
          <NavLink className="button button-primary" to="/showroom">
            Back to inventory
          </NavLink>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section vehicle-detail-page">
      <div className="container">
        <NavLink className="detail-back" to="/showroom">
          Back to inventory
        </NavLink>

        <div className="detail-hero">
          <div className="detail-media-column">
            <a
              className="detail-hero-image"
              style={{ backgroundImage: `url(${vehicle.image})` }}
              href={vehicle.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full image for ${vehicle.name}`}
            />

            <div className="detail-gallery-strip">
              {vehicle.gallery.map((image) => (
                <a
                  key={image}
                  className="detail-gallery-thumb"
                  style={{ backgroundImage: `url(${image})` }}
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open gallery image"
                />
              ))}
            </div>
          </div>

          <div className="detail-summary-card">
            <div className="detail-summary-top">
              <span className="vehicle-chip vehicle-chip-top">{vehicle.badge}</span>
              <span className="detail-location">{vehicle.location}</span>
            </div>

            <h1>{vehicle.name}</h1>
            <p className="detail-subtitle">
              {vehicle.model} • {vehicle.year} • {vehicle.type}
            </p>

            <div className="detail-price-row">
              <strong>{vehicle.price}</strong>
              <span>Transparent asking price</span>
            </div>

            <p className="detail-description">{vehicle.description}</p>

            <div className="detail-keyfacts">
              <span>{vehicle.distance}</span>
              <span>{vehicle.transmission}</span>
              <span>{vehicle.fuel}</span>
              <span>{vehicle.engine}</span>
            </div>

            <div className="detail-assurance-list">
              {assurancePoints.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="detail-actions">
              <NavLink className="button button-primary" to="/contact">
                Request Quote
              </NavLink>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setShowAppointment(true)}
              >
                Book Test Drive
              </button>
              <button
                type="button"
                className={`button button-tertiary ${isSaved(vehicle.id) ? "is-active" : ""}`}
                aria-pressed={isSaved(vehicle.id)}
                onClick={() => toggleSaved(vehicle.id)}
              >
                {isSaved(vehicle.id) ? "Saved" : "Save Vehicle"}
              </button>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <article className="surface-card">
            <h3>Key specifications</h3>
            <div className="detail-specs">
              <span>
                <strong>Engine</strong>
                {vehicle.engine}
              </span>
              <span>
                <strong>Transmission</strong>
                {vehicle.transmission}
              </span>
              <span>
                <strong>Fuel</strong>
                {vehicle.fuel}
              </span>
              <span>
                <strong>Drivetrain</strong>
                {vehicle.drivetrain}
              </span>
              <span>
                <strong>Seats</strong>
                {vehicle.seats}
              </span>
              <span>
                <strong>Mileage</strong>
                {vehicle.distance}
              </span>
              <span>
                <strong>Exterior</strong>
                {vehicle.exterior}
              </span>
              <span>
                <strong>Interior</strong>
                {vehicle.interior}
              </span>
            </div>
          </article>

          <article className="surface-card">
            <h3>Why buyers shortlist this vehicle</h3>
            <ul className="detail-features">
              {vehicle.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h3>Compare and track</h3>
            <p className="support-copy">
              Add this listing to your comparison set or save it for later review.
            </p>
            <button
              type="button"
              className={`button button-primary button-full ${
                compareIds.includes(vehicle.id) ? "is-active" : ""
              }`}
              onClick={() => toggleCompare(vehicle.id)}
              disabled={!canAdd(vehicle.id)}
            >
              {compareIds.includes(vehicle.id) ? "Added to Compare" : "Add to Compare"}
            </button>
            <NavLink to="/showroom" className="section-link">
              Continue browsing inventory
            </NavLink>
          </article>

          <article className="surface-card surface-card-wide">
            <div className="finance-header">
              <div>
                <h3>Finance estimator</h3>
                <p className="support-copy">
                  Adjust your down payment, term, and rate to preview a likely monthly cost.
                </p>
              </div>
              <span className="finance-badge">Fast finance support available</span>
            </div>

            <div className="finance-grid">
              <label>
                Down payment
                <input
                  type="range"
                  min="0"
                  max={vehicle.priceValue}
                  step="500000"
                  value={downPayment}
                  onChange={(event) => setDownPayment(Number(event.target.value))}
                />
                <span>{formatNgn(downPayment)}</span>
              </label>

              <label>
                Term (months)
                <select value={term} onChange={(event) => setTerm(Number(event.target.value))}>
                  {[12, 24, 36, 48, 60].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Interest rate (% APR)
                <input
                  type="number"
                  min="0"
                  max="35"
                  step="0.5"
                  value={interest}
                  onChange={(event) => setInterest(Number(event.target.value))}
                />
              </label>
            </div>

            <div className="finance-summary">
              <strong>{formatNgn(monthlyEstimate)}</strong>
              <span>Estimated monthly payment</span>
            </div>

            <div className="detail-actions">
              <NavLink to="/contact" className="button button-primary">
                Apply for Financing
              </NavLink>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setShowAppointment(true)}
              >
                Talk to an Advisor
              </button>
            </div>
            <span className="finance-note">
              Estimates are indicative and subject to lender review and vehicle eligibility.
            </span>
          </article>
        </div>

        <div className="detail-gallery-section">
          <div className="section-heading">
            <div className="section-heading-copy">
              <span className="section-eyebrow">Interior gallery</span>
              <h2>See more of the cabin finish and seating comfort</h2>
            </div>
          </div>
          <div className="detail-gallery-grid">
            {vehicle.interiorImages.map((image) => (
              <a
                key={image}
                className="detail-gallery-item"
                style={{ backgroundImage: `url(${image})` }}
                href={image}
                target="_blank"
                rel="noreferrer"
                aria-label="Open interior gallery image"
              />
            ))}
          </div>
        </div>
      </div>

      <AppointmentModal
        open={showAppointment}
        onClose={() => setShowAppointment(false)}
        title={`Book a Test Drive - ${vehicle.name}`}
        onSubmit={handleAppointmentSubmit}
      />
    </section>
  );
}
