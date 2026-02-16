import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <section className="page-section">
      <div className="page-hero">
        <h1>Privacy Policy</h1>
        <p>
          Learn how Ojay Motors collects, uses, and protects customer
          information.
        </p>
      </div>
      <div
        className="tab-panel"
        role="button"
        tabIndex={0}
        onClick={() => navigate("/contact")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate("/contact");
          }
        }}
      >
        <p>
          This is a placeholder privacy policy. Provide official content when
          ready, including data collection, usage, retention, and contact
          details.
        </p>
      </div>
    </section>
  );
}
