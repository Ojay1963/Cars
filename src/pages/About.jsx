import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  {
    id: "mission",
    title: "Our Mission",
    content:
      "To make luxury mobility accessible in Nigeria through transparent pricing, verified inventory, and dependable delivery.",
  },
  {
    id: "vision",
    title: "Our Vision",
    content:
      "To be West Africa's most trusted automotive retailer for premium new and certified pre-owned vehicles.",
  },
  {
    id: "values",
    title: "Our Values",
    content:
      "Integrity, customer-first service, and meticulous inspection standards define every OJ Motors experience.",
  },
];

const highlights = [
  { label: "Vehicles delivered", value: "3,400+" },
  { label: "Inspection checks", value: "120-point" },
  { label: "Repeat customers", value: "71%" },
  { label: "Delivery cities", value: "14" },
];

const milestones = [
  {
    year: "2014",
    title: "The OJ Motors story begins",
    text: "Started with a small showroom and a focus on Toyota inventory.",
  },
  {
    year: "2017",
    title: "Expanded to multi-city delivery",
    text: "Added delivery routes across Lagos, Abuja, and Port Harcourt.",
  },
  {
    year: "2020",
    title: "Certified inspection facility launched",
    text: "Introduced a 120-point check for all imported vehicles.",
  },
  {
    year: "2024",
    title: "Digital showroom upgrade",
    text: "Built a digital experience for on-demand browsing and booking.",
  },
];

const leadership = [
  {
    name: "Onos Jideofor",
    role: "Founder & CEO",
    focus: "Customer trust, inventory quality, and dealer partnerships.",
  },
  {
    name: "Tomi Ajayi",
    role: "Head of Operations",
    focus: "Inspection workflows, delivery planning, and team training.",
  },
  {
    name: "Sade Olatunji",
    role: "Director of Experience",
    focus: "Showroom design, finance support, and post-sale care.",
  },
];

const certifications = [
  "OEM sourcing network",
  "Battery health validation",
  "Climate-ready detailing",
  "Security tracking install",
  "Warranty-backed delivery",
  "Road-test verification",
];

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const [openYear, setOpenYear] = useState("2014");
  const navigate = useNavigate();

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="page-section about-page">
      <div className="about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow">Premium mobility, done right</span>
          <h1>About OJ Motors</h1>
          <p>
            We connect Nigerians to premium vehicles with the confidence of
            verified history, transparent pricing, and expert after-sales
            support.
          </p>
          <div className="about-actions">
            <NavLink to="/contact">Schedule a call</NavLink>
            <NavLink to="/news" className="ghost">
              Download profile
            </NavLink>
          </div>
        </div>
        <div className="about-hero-panel">
          <div
            className="about-panel-card glass"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/showroom")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate("/showroom");
              }
            }}
          >
            <h3>Trust built on proof</h3>
            <p>
              Every vehicle receives a digital inspection record and delivery
              checklist for peace of mind.
            </p>
          </div>
          <div
            className="about-panel-card accent"
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
            <h3>Precision logistics</h3>
            <p>Coordinated delivery teams across 14 cities.</p>
            <div className="pulse-dot" />
          </div>
        </div>
      </div>

      <motion.div
        className="about-highlight-grid"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
        viewport={{ once: true }}
      >
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            className="highlight-card"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            role="button"
            tabIndex={0}
            onClick={() => navigate("/showroom")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate("/showroom");
              }
            }}
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </motion.div>
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
        <h2>How We&apos;ve Grown</h2>
        <div className="timeline-grid">
          {milestones.map((item) => (
            <div key={item.year} className="timeline-card">
              <button
                type="button"
                className="timeline-title"
                onClick={() =>
                  setOpenYear((prev) => (prev === item.year ? "" : item.year))
                }
              >
                <span>{item.year}</span>
                <strong>{item.title}</strong>
              </button>
              {openYear === item.year && <p>{item.text}</p>}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="leadership"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Leadership that cares
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experts focused on quality, transparency, and customer outcomes.
        </motion.p>
        <motion.div
          className="leadership-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {leadership.map((leader, index) => (
            <motion.article
              key={leader.name}
              className="leader-card"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
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
              <div className="leader-avatar">{leader.name[0]}</div>
              <h3>{leader.name}</h3>
              <span>{leader.role}</span>
              <p>{leader.focus}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
