import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(`/products${trimmedQuery ? `?search=${encodeURIComponent(trimmedQuery)}` : ""}`);
    setQuery("");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 10px rgba(15, 23, 42, 0.08)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", minWidth: 180 }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "#0F172A",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>⚡</span>
            <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "#2563EB" }}>
              VoltStore
            </span>
          </Link>
          <span style={{ fontSize: "0.85rem", color: "#475569", marginTop: "0.15rem" }}>
            Power Your World
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            minWidth: 240,
            maxWidth: 520,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F8FAFC",
            borderRadius: 9999,
            padding: "0.5rem 0.75rem",
            border: "1px solid #E2E8F0",
          }}
        >
          <span style={{ color: "#64748B", marginRight: "0.5rem", fontSize: "1rem" }}>🔍</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search electronics, accessories, gadgets..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "0.95rem",
              color: "#0F172A",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "0.75rem",
              backgroundColor: "#2563EB",
              color: "#ffffff",
              border: "none",
              borderRadius: 9999,
              padding: "0.6rem 1rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Search
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#0F172A",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{
              color: "#0F172A",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Products
          </Link>
          <button
            type="button"
            onClick={() => navigate("/cart")}
            style={{
              position: "relative",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#0F172A",
              padding: 0,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "1.35rem" }}>🛒</span>
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                minWidth: 20,
                height: 20,
                borderRadius: 9999,
                backgroundColor: "#FACC15",
                color: "#0F172A",
                fontWeight: 700,
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 0.35rem",
                boxShadow: "0 1px 4px rgba(15, 23, 42, 0.2)",
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
