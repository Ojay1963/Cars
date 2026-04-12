import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";

const tabs = [
  {
    id: "mission",
    title: "Our Mission",
    content:
      "To make premium mobility more trustworthy through verified inventory, transparent pricing, and dependable after-sales support."
  },
  {
    id: "vision",
    title: "Our Vision",
    content:
      "To become West Africa's most trusted digital-first automotive marketplace for premium new and certified pre-owned vehicles."
  },
  {
    id: "values",
    title: "Our Values",
    content:
      "Integrity, clarity, and operational excellence guide every listing, showroom interaction, and delivery handover."
  }
];

const highlights = [
  { label: "Vehicles delivered", value: "3,400+" },
  { label: "Inspection checks", value: "120-point" },
  { label: "Repeat customers", value: "71%" },
  { label: "Delivery cities", value: "14" }
];

const milestones = [
  {
    year: "2014",
    title: "The Ojay Motors story begins",
    text: "The business launched with a focused premium showroom and a reputation for disciplined sourcing."
  },
  {
    year: "2017",
    title: "Expanded to multi-city delivery",
    text: "Delivery operations grew across Lagos, Abuja, and Port Harcourt with stronger logistics support."
  },
  {
    year: "2020",
    title: "Certified inspection facility launched",
    text: "A more structured vehicle inspection workflow improved buyer confidence and handover quality."
  },
  {
    year: "2024",
    title: "Digital marketplace upgrade",
    text: "The buying experience evolved into a cleaner, faster marketplace for high-intent customers."
  }
];

const leadership = [
  {
    name: "Onos Jideofor",
    role: "Founder & CEO",
    focus: "Customer trust, inventory quality, and dealer partnerships."
  },
  {
    name: "Tomi Ajayi",
    role: "Head of Operations",
    focus: "Inspection workflows, delivery planning, and team training."
  },
  {
    name: "Sade Olatunji",
    role: "Director of Experience",
    focus: "Showroom design, finance support, and post-sale care."
  }
];

const certifications = [
  "OEM sourcing network",
  "Battery health validation",
  "Climate-ready detailing",
  "Security tracking install",
  "Warranty-backed delivery",
  "Road-test verification"
];

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const [openYear, setOpenYear] = useState("2014");

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="page-section about-page">
      <div className="container">
        <div className="about-hero">
          <div className="about-hero-copy">
            <span className="section-eyebrow">Premium mobility, done right</span>
            <h1>About Ojay Motors</h1>
            <p>
              We connect Nigerians to premium vehicles with the confidence of
              verified history, transparent pricing, and a more professional buying
              journey from discovery to delivery.
            </p>
            <div className="about-actions">
              <NavLink to="/contact">Schedule a call</NavLink>
              <NavLink to="/showroom" className="ghost">
                Browse inventory
              </NavLink>
            </div>
          </div>

          <div className="about-hero-panel">
            <div className="about-panel-card">
              <h3>Trust built on proof</h3>
              <p>
                Every serious listing is presented with stronger structure,
                inspection-backed positioning, and clearer next steps.
              </p>
            </div>
            <div className="about-panel-card accent">
              <h3>Precision logistics</h3>
              <p>Coordinated sourcing, handover, and delivery support across 14 cities.</p>
            </div>
          </div>
        </div>

        <motion.div
          className="about-highlight-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {highlights.map((item, index) => (
            <motion.article
              key={item.label}
              className="highlight-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.article>
          ))}
        </motion.div>

        <div className="tab-strip">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={tab.id === activeTab ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="tab-panel about-tab-panel">
          <p>{active?.content}</p>
          <div className="cert-grid">
            {certifications.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="timeline">
          <SectionHeading
            eyebrow="Growth timeline"
            title="How the company has evolved"
            description="Operational maturity, inspection standards, and digital product improvements have shaped the current marketplace experience."
          />

          <div className="timeline-grid">
            {milestones.map((item) => (
              <div key={item.year} className="timeline-card">
                <button
                  type="button"
                  className="timeline-title"
                  onClick={() => setOpenYear((prev) => (prev === item.year ? "" : item.year))}
                >
                  <span>{item.year}</span>
                  <strong>{item.title}</strong>
                </button>
                {openYear === item.year ? <p>{item.text}</p> : null}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="leadership"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="Leadership"
            title="A team focused on trust, delivery quality, and customer outcomes"
            description="The marketplace is supported by operators who understand sourcing, presentation, and the details that improve conversion."
            align="center"
          />

          <div className="leadership-grid">
            {leadership.map((leader, index) => (
              <motion.article
                key={leader.name}
                className="leader-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="leader-avatar">{leader.name[0]}</div>
                <h3>{leader.name}</h3>
                <span>{leader.role}</span>
                <p>{leader.focus}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
