import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getProduct(id);
        if (response?.data) {
          setProduct(response.data);
        } else {
          setError("Product not found.");
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load the product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
      setError("Product ID missing.");
    }
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity((current) => {
      const next = current + value;
      return next < 1 ? 1 : next;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem = { ...product, quantity };
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
  };

  const formattedPrice = product ? product.price.toLocaleString("en-US") : "0";
  const isInStock = product?.stock > 0;

  const renderStars = () => {
    const rating = Math.round(product?.rating || 0);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? "#FACC15" : "#CBD5E1", marginRight: 3 }}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div style={{ minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, border: "5px solid rgba(37, 99, 235, 0.2)", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: "2rem", boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)", textAlign: "center", maxWidth: 520 }}>
          <h2 style={{ margin: 0, color: "#0F172A" }}>Error</h2>
          <p style={{ color: "#64748B", marginTop: "1rem" }}>{error}</p>
          <Link to="/products" style={{ display: "inline-block", marginTop: "1.5rem", color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8FAFC", color: "#0F172A", minHeight: "100vh", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          <Link to="/products" style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
            ← Continue Shopping
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, color: "#2563EB", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                Product Details
              </p>
              <h1 style={{ margin: "0.5rem 0 0", fontSize: "2rem" }}>{product.name}</h1>
            </div>
            <span style={{ color: "#64748B", fontSize: "0.95rem" }}>{product.numReviews} reviews</span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "2rem",
          }}
        >
          <div style={{ backgroundColor: "#ffffff", borderRadius: 28, overflow: "hidden", boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", maxHeight: 560, objectFit: "cover", display: "block" }} />
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "2rem", boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span style={{ backgroundColor: "#E0F2FE", color: "#2563EB", borderRadius: 9999, padding: "0.5rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}>
                {product.category}
              </span>
              <span style={{ backgroundColor: "#F8FAFC", color: "#0F172A", borderRadius: 9999, padding: "0.5rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}>
                {product.brand}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center" }}>{renderStars()}</div>
              <span style={{ color: "#64748B", fontSize: "0.95rem" }}>{product.rating.toFixed(1)} / 5</span>
              <span style={{ color: "#94A3B8", fontSize: "0.95rem" }}>| {product.numReviews} reviews</span>
            </div>

            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#2563EB", margin: "0 0 1rem" }}>
              RWF {formattedPrice}
            </p>

            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: isInStock ? "#16A34A" : "#DC2626", margin: "0 0 1.5rem" }}>
              {isInStock ? "In Stock" : "Out of Stock"}
            </p>

            <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1.75rem" }}>{product.description}</p>

            <div style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", border: "1px solid #E2E8F0", borderRadius: 16, padding: "0.75rem 1rem", width: "max-content" }}>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  style={{ border: "none", backgroundColor: "#F8FAFC", color: "#2563EB", width: 36, height: 36, borderRadius: 12, cursor: "pointer" }}
                >
                  −
                </button>
                <span style={{ minWidth: 32, textAlign: "center", fontWeight: 700 }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  style={{ border: "none", backgroundColor: "#F8FAFC", color: "#2563EB", width: 36, height: 36, borderRadius: 12, cursor: "pointer" }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock}
                style={{
                  width: "100%",
                  backgroundColor: isInStock ? "#2563EB" : "#94A3B8",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 16,
                  padding: "1rem 1.25rem",
                  fontWeight: 700,
                  cursor: isInStock ? "pointer" : "not-allowed",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (max-width: 980px) { div[style*='grid-template-columns: 1.1fr 0.9fr'] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default ProductDetail;
