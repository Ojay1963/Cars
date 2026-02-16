import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();
  return (
    <section className="page-section">
      <div className="page-hero">
        <h1>Terms of Service</h1>
        <p>Review the terms that apply when using Ojay Motors services.</p>
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
          This is a placeholder terms page. Replace with your official terms,
          including eligibility, payments, warranties, and dispute resolution.
        </p>
      </div>
    </section>
  );
}
