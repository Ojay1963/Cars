import { NavLink, Route, Routes } from "react-router-dom";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";
import AutoFactory from "./pages/AutoFactory.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import NewsFeed from "./pages/NewsFeed.jsx";
import Privacy from "./pages/Privacy.jsx";
import Showroom from "./pages/Showroom.jsx";
import Terms from "./pages/Terms.jsx";
import VehicleDetails from "./pages/VehicleDetails.jsx";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Inventory", to: "/showroom" },
  { label: "Services", to: "/factory" },
  { label: "Contact", to: "/contact" },
  { label: "Admin", to: "/admin" }
];

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink className="brand" to="/" aria-label="Ojay Motors">
            <span className="brand-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12c1-3 3-6 9-6s8 3 9 6" />
                <path d="M5 12h14" />
                <circle cx="7" cy="16" r="2" />
                <circle cx="17" cy="16" r="2" />
              </svg>
            </span>
            <span className="brand-name">Ojay Motors</span>
          </NavLink>
          <nav className="site-nav">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <NavLink className="header-cta" to="/showroom">
            Find a Car
          </NavLink>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/factory" element={<AutoFactory />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/showroom/:id" element={<VehicleDetails />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12c1-3 3-6 9-6s8 3 9 6" />
                  <path d="M5 12h14" />
                  <circle cx="7" cy="16" r="2" />
                  <circle cx="17" cy="16" r="2" />
                </svg>
              </span>
              <span className="brand-name">Ojay Motors</span>
            </div>
            <p>
              Premium vehicles for the discerning driver. Experience the thrill of
              the open road with our curated collection of luxury and performance
              cars across Nigeria.
            </p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <NavLink to="/showroom">Browse Inventory</NavLink>
            <NavLink to="/factory">Financing</NavLink>
            <NavLink to="/factory">Service Center</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <span>15 Adeola Odeku Street, Victoria Island, Lagos</span>
            <span>+234 800 AUTOMART</span>
            <span>sales@ojaymotors.ng</span>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="footer-socials">
              <span>f</span>
              <span>ig</span>
              <span>in</span>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>(c) 2026 Ojay Motors Nigeria. All rights reserved.</span>
          <div>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/terms">Terms of Service</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
