import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const formattedTotal = cartTotal.toLocaleString("en-US");

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", padding: "3rem 1rem", color: "#0F172A" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "3rem", textAlign: "center", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>Your cart is empty</h1>
            <p style={{ color: "#64748B", marginTop: "1rem", lineHeight: 1.75 }}>
              Add the latest electronics, accessories, and gadgets to your cart to begin checkout.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              style={{
                marginTop: "1.75rem",
                backgroundColor: "#2563EB",
                color: "#ffffff",
                border: "none",
                borderRadius: 9999,
                padding: "0.95rem 1.75rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", padding: "2rem 1rem", color: "#0F172A" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "2.25rem" }}>Shopping Cart</h1>
          <p style={{ margin: 0, color: "#475569" }}>
            Review your order before proceeding to checkout.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.45fr 0.85fr", gap: "2rem" }}>
          <section style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "1.5rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ margin: 0, color: "#64748B", fontSize: "0.95rem" }}>
                  {cartItems.length} items in cart
                </p>
                <h2 style={{ margin: "0.35rem 0 0", fontSize: "1.45rem" }}>Cart Items</h2>
              </div>
              <button
                type="button"
                onClick={clearCart}
                style={{
                  backgroundColor: "transparent",
                  color: "#DC2626",
                  border: "1px solid #FECACA",
                  borderRadius: 9999,
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Clear Cart
              </button>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {cartItems.map((item) => {
                const itemId = item._id;
                const itemTotal = (item.price * item.quantity).toLocaleString("en-US");
                return (
                  <div key={itemId} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "1rem", padding: "1rem", borderRadius: 24, border: "1px solid #E2E8F0" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 80, height: 80, borderRadius: 18, objectFit: "cover" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "1rem", color: "#0F172A" }}>{item.name}</h3>
                        <p style={{ margin: "0.35rem 0 0", color: "#64748B", fontSize: "0.9rem" }}>{item.brand}</p>
                      </div>
                      <div style={{ display: "grid", gap: "0.75rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, color: "#2563EB" }}>RWF {item.price.toLocaleString("en-US")}</span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(itemId)}
                            style={{
                              backgroundColor: "#FEE2E2",
                              border: "none",
                              color: "#B91C1C",
                              borderRadius: 12,
                              padding: "0.55rem 0.75rem",
                              cursor: "pointer",
                            }}
                          >
                            🗑 Remove
                          </button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "max-content", border: "1px solid #E2E8F0", borderRadius: 16, padding: "0.35rem 0.5rem" }}>
                          <button
                            type="button"
                            onClick={() => {
                              const newQuantity = item.quantity - 1;
                              if (newQuantity === 0) {
                                removeFromCart(itemId);
                              } else {
                                updateQuantity(itemId, newQuantity);
                              }
                            }}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              color: "#2563EB",
                              width: 32,
                              height: 32,
                              borderRadius: 12,
                              cursor: "pointer",
                              fontSize: "1.1rem",
                            }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: 24, textAlign: "center", fontWeight: 700 }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              color: "#2563EB",
                              width: 32,
                              height: 32,
                              borderRadius: 12,
                              cursor: "pointer",
                              fontSize: "1.1rem",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
                          Subtotal: RWF {itemTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "1.75rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.6rem" }}>Order Summary</h2>
            <div style={{ display: "grid", gap: "0.85rem", marginBottom: "1.5rem" }}>
              {cartItems.map((item) => (
                <div key={`summary-${item._id}`} style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>RWF {(item.price * item.quantity).toLocaleString("en-US")}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B", marginBottom: "0.5rem" }}>
                <span>Total items</span>
                <span>{cartCount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#0F172A", fontWeight: 700 }}>Total</span>
                <span style={{ color: "#2563EB", fontSize: "1.4rem", fontWeight: 800 }}>RWF {formattedTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                backgroundColor: "#2563EB",
                color: "#ffffff",
                border: "none",
                borderRadius: 18,
                padding: "1rem 1.25rem",
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              Proceed to Checkout
            </button>

            <Link to="/products" style={{ display: "block", textAlign: "center", color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>

      <style>{`@media (max-width: 980px) { div[style*='grid-template-columns: 1.45fr 0.85fr'] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default Cart;
