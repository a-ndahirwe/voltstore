import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = product.price.toLocaleString("en-US");

  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.round(product.rating || 0);
    return (
      <span key={index} style={{ color: filled ? "#FACC15" : "#CBD5E1", marginRight: 2 }}>
        {filled ? "★" : "☆"}
      </span>
    );
  });

  return (
    <article
      onClick={handleCardClick}
      style={{
        cursor: "pointer",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px) scale(1.005)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "none";
      }}
    >
      <div style={{ width: "100%", height: 200, overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500';
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        <span style={{ color: "#64748B", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {product.brand}
        </span>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.4,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center" }}>{stars}</div>
          <span style={{ fontSize: "0.85rem", color: "#64748B" }}>
            ({product.numReviews})
          </span>
        </div>

        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2563EB", marginBottom: "0.75rem" }}>
            RWF {formattedPrice}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              width: "100%",
              backgroundColor: "#2563EB",
              border: "none",
              color: "#ffffff",
              borderRadius: 9999,
              padding: "0.85rem 1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background-color 160ms ease",
            }}
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
