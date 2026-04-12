import { NavLink, useNavigate } from "react-router-dom";

export default function VehicleCard({ vehicle, variant = "grid" }) {
  const navigate = useNavigate();
  const stockId = vehicle.id.split("-").pop();
  const detailUrl = `/showroom/${vehicle.id}`;

  const handleActivate = () => {
    navigate(detailUrl);
  };

  return (
    <article
      className={`vehicle-card vehicle-card-${variant}`}
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleActivate();
        }
      }}
    >
      <div className="vehicle-card-media-wrap">
        <div
          className="vehicle-card-media"
          style={{ backgroundImage: `url(${vehicle.image})` }}
        />
        <span className="vehicle-chip vehicle-chip-top">{vehicle.badge}</span>
        <span className="vehicle-chip vehicle-chip-type">{vehicle.type}</span>
      </div>

      <div className="vehicle-card-body">
        <div className="vehicle-card-topline">
          <span>{vehicle.location}</span>
          <span>Stock #{stockId}</span>
        </div>

        <div className="vehicle-card-heading">
          <h3>{vehicle.name}</h3>
          <strong>{vehicle.price}</strong>
        </div>

        <p className="vehicle-card-subtitle">
          {vehicle.model} • {vehicle.year}
        </p>

        <div className="vehicle-card-specs">
          <span>{vehicle.distance}</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.fuel}</span>
          <span>{vehicle.drivetrain}</span>
        </div>

        <div className="vehicle-card-actions">
          <NavLink
            className="button button-secondary"
            to={detailUrl}
            onClick={(event) => event.stopPropagation()}
          >
            View Details
          </NavLink>
          <span className="vehicle-card-meta">{vehicle.engine}</span>
        </div>
      </div>
    </article>
  );
}
