import { NavLink } from "react-router-dom";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  linkLabel,
  linkTo
}) {
  return (
    <div className={`section-heading ${align === "center" ? "is-centered" : ""}`}>
      <div className="section-heading-copy">
        {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {linkLabel && linkTo ? (
        <NavLink className="section-link" to={linkTo}>
          {linkLabel}
        </NavLink>
      ) : null}
    </div>
  );
}
