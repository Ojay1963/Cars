import { useEffect, useState } from "react";
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
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <path d="M6 19.5c1.6-5 5.9-8 10-8s8.4 3 10 8" />
        <path d="M8.5 19.5h15" />
        <circle cx="11" cy="23" r="2.2" />
        <circle cx="21" cy="23" r="2.2" />
      </svg>
    </span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 920) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container site-header-inner">
          <NavLink className="brand" to="/" aria-label="Ojay Motors" onClick={() => setMenuOpen(false)}>
            <BrandMark />
            <span className="brand-copy">
              <strong>Ojay Motors</strong>
              <span>Premium automotive marketplace</span>
            </span>
          </NavLink>

          <nav className="site-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header-actions">
            <NavLink className="button button-secondary desktop-admin-link" to="/admin">
              Admin
            </NavLink>
            <NavLink className="button button-primary" to="/contact">
              List Your Car
            </NavLink>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-nav" className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
          <div className="container mobile-nav-panel">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink className="button button-secondary" to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
            <NavLink className="button button-primary" to="/contact" onClick={() => setMenuOpen(false)}>
              List Your Car
            </NavLink>
          </div>
        </div>
      </header>

      <main className="site-main">
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
        <div className="container footer-top">
          <div className="footer-brand">
            <div className="brand">
              <BrandMark />
              <span className="brand-copy">
                <strong>Ojay Motors</strong>
                <span>Premium automotive marketplace</span>
              </span>
            </div>
            <p>
              Verified listings, trusted dealers, and concierge-style support for
              buyers across Nigeria.
            </p>
            <div className="footer-badges">
              <span>Verified Inventory</span>
              <span>Transparent Pricing</span>
              <span>Fast Delivery Support</span>
            </div>
          </div>

          <div className="footer-column">
            <h4>Marketplace</h4>
            <NavLink to="/showroom">Browse inventory</NavLink>
            <NavLink to="/contact">Sell your vehicle</NavLink>
            <NavLink to="/factory">Service center</NavLink>
            <NavLink to="/news">News & guides</NavLink>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <NavLink to="/about">About us</NavLink>
            <NavLink to="/contact">Contact sales</NavLink>
            <NavLink to="/privacy">Privacy policy</NavLink>
            <NavLink to="/terms">Terms of service</NavLink>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <a href="tel:+2348002866678">+234 800 286 6678</a>
            <a href="mailto:sales@ojaymotors.ng">sales@ojaymotors.ng</a>
            <span>15 Adeola Odeku Street, Victoria Island, Lagos</span>
            <div className="footer-socials">
              <a href="/" aria-label="Instagram">
                IG
              </a>
              <a href="/" aria-label="LinkedIn">
                IN
              </a>
              <a href="/" aria-label="Facebook">
                FB
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Ojay Motors Nigeria. All rights reserved.</span>
          <span>Built for trusted buying, selling, and after-sales support.</span>
        </div>
      </footer>
    </div>
  );
}
