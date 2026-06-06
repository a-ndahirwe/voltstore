import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#0F172A", color: "#F8FAFC" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3rem 1rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.75rem" }}>⚡</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.25rem", color: "#FACC15" }}>
                VoltStore
              </div>
              <div style={{ fontSize: "0.9rem", color: "#94A3B8", marginTop: "0.25rem" }}>
                Power Your World
              </div>
            </div>
          </div>
          <p style={{ lineHeight: 1.75, color: "#CBD5E1" }}>
            VoltStore brings premium electronics and smart gadgets to your doorstep. Discover curated products, fast delivery, and trusted support across Rwanda.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#CBD5E1" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <Link to="/" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <Link to="/products" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
            Contact
          </h3>
          <p style={{ color: "#CBD5E1", lineHeight: 1.8, margin: 0 }}>
            Kigali, Rwanda
          </p>
          <p style={{ color: "#CBD5E1", lineHeight: 1.8, margin: "0.75rem 0 0" }}>
            <a href="mailto:info@voltstore.rw" style={{ color: "#FACC15", textDecoration: "none" }}>
              info@voltstore.rw
            </a>
          </p>
          <p style={{ color: "#CBD5E1", lineHeight: 1.8, margin: "0.75rem 0 0" }}>
            +250 780 000 000
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(203, 213, 225, 0.15)",
          padding: "1rem 1rem 1.5rem",
          marginTop: "1rem",
          textAlign: "center",
          color: "#94A3B8",
        }}
      >
        © 2026 VoltStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
