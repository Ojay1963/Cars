import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import vehicleCatalog from "../data/vehicleCatalog.js";
import useSavedVehicles from "../hooks/useSavedVehicles.js";
import AppointmentModal from "../components/AppointmentModal.jsx";
import useCompareVehicles from "../hooks/useCompareVehicles.js";

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

  const formatNgn = (value) =>
    `NGN ${Math.round(value).toLocaleString("en-NG")}`;

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
  }, [downPayment, term, interest, vehicle]);

  if (!vehicle) {
    return (
      <section className="page-section">
        <div className="page-hero">
          <h1>Vehicle not found</h1>
          <p>We could not locate that listing. Try browsing the showroom.</p>
        </div>
        <NavLink className="detail-back" to="/showroom">
          Back to Showroom
        </NavLink>
      </section>
    );
  }

  return (
    <section className="page-section vehicle-detail">
      <NavLink className="detail-back" to="/showroom">
        Back to Showroom
      </NavLink>
      <div className="vehicle-detail-hero">
        <a
          className="vehicle-detail-media"
          style={{ backgroundImage: `url(${vehicle.image})` }}
          href={vehicle.image}
          target="_blank"
          rel="noreferrer"
        />
        <div className="vehicle-detail-summary">
          <span className="detail-badge">{vehicle.badge}</span>
          <h1>{vehicle.name}</h1>
          <p>
            {vehicle.year} - {vehicle.location}
          </p>
          <strong className="detail-price">{vehicle.price}</strong>
          <p className="detail-description">{vehicle.description}</p>
          <div className="detail-actions">
            <NavLink to="/contact">Request Quote</NavLink>
            <button
              type="button"
              className="outline"
              onClick={() => setShowAppointment(true)}
            >
              Book Test Drive
            </button>
            <button
              type="button"
              className={`save-toggle ${isSaved(vehicle.id) ? "is-saved" : ""}`}
              aria-pressed={isSaved(vehicle.id)}
              onClick={() => toggleSaved(vehicle.id)}
            >
              {isSaved(vehicle.id) ? "Saved" : "Save Vehicle"}
            </button>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Key Specifications</h3>
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
        </div>
        <div className="detail-card">
          <h3>Highlights</h3>
          <ul className="detail-features">
            {vehicle.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="detail-card compare-summary">
          <h3>Compare this vehicle</h3>
          <p>Add this listing to a side-by-side comparison.</p>
          <button
            type="button"
            className={`compare-toggle ${
              compareIds.includes(vehicle.id) ? "is-active" : ""
            }`}
            onClick={() => toggleCompare(vehicle.id)}
            disabled={!canAdd(vehicle.id)}
          >
            {compareIds.includes(vehicle.id) ? "Added to Compare" : "Add to Compare"}
          </button>
          <NavLink to="/showroom" className="compare-link">
            Open Comparison
          </NavLink>
        </div>
        <div className="detail-card finance-card">
          <h3>Finance Estimator</h3>
          <p>Estimate a monthly payment based on your preferred plan.</p>
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
          <NavLink to="/contact" className="finance-cta">
            Apply for Financing
          </NavLink>
          <span className="finance-note">
            Estimates are indicative and subject to credit approval.
          </span>
        </div>
      </div>

      <div className="detail-gallery">
        <div>
          <h3>Interior Gallery</h3>
          <p>Explore the cabin and seating comfort.</p>
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
            />
          ))}
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
