import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../../api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!formData.address.trim()) nextErrors.address = "Delivery address is required.";
    if (!formData.city.trim()) nextErrors.city = "City is required.";
    return nextErrors;
  };

  const handleChange = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty. Add items before placing an order.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          paymentMethod: formData.paymentMethod,
        },
        items: cartItems.map((item) => ({
          productId: item.id || item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
        total: cartTotal,
      };

      const response = await createOrder(orderPayload);
      const orderId = response?.data?.id || response?.data?._id || response?.data?.orderId;
      clearCart();
      if (orderId) {
        navigate(`/order-confirmation/${orderId}`);
      } else {
        setSubmitError("Order created, but we could not determine the confirmation link.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Unable to place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = {
    width: "100%",
    borderRadius: 16,
    border: "1px solid #CBD5E1",
    padding: "0.95rem 1rem",
    fontSize: "0.95rem",
    outline: "none",
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", color: "#0F172A", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "2.25rem" }}>Checkout</h1>
          <p style={{ margin: 0, color: "#475569" }}>Complete your purchase with secure delivery details.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: "2rem" }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "2rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
            <h2 style={{ margin: 0, marginBottom: "1rem", fontSize: "1.5rem" }}>Customer Details</h2>

            <div style={{ display: "grid", gap: "1rem" }}>
              <label style={{ display: "grid", gap: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>Full Name</span>
                <input type="text" value={formData.fullName} onChange={handleChange("fullName")} style={fieldStyle} />
                {errors.fullName && <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{errors.fullName}</span>}
              </label>

              <label style={{ display: "grid", gap: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>Email</span>
                <input type="email" value={formData.email} onChange={handleChange("email")} style={fieldStyle} />
                {errors.email && <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{errors.email}</span>}
              </label>

              <label style={{ display: "grid", gap: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>Phone Number</span>
                <input type="tel" value={formData.phone} onChange={handleChange("phone")} style={fieldStyle} />
                {errors.phone && <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{errors.phone}</span>}
              </label>

              <label style={{ display: "grid", gap: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>Delivery Address</span>
                <textarea value={formData.address} onChange={handleChange("address")} rows={4} style={{ ...fieldStyle, resize: "vertical" }} />
                {errors.address && <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{errors.address}</span>}
              </label>

              <label style={{ display: "grid", gap: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>City</span>
                <input type="text" value={formData.city} onChange={handleChange("city")} style={fieldStyle} />
                {errors.city && <span style={{ color: "#DC2626", fontSize: "0.9rem" }}>{errors.city}</span>}
              </label>

              <label style={{ display: "grid", gap: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>Payment Method</span>
                <select value={formData.paymentMethod} onChange={handleChange("paymentMethod")} style={fieldStyle}>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Mobile Money (MTN)">Mobile Money (MTN)</option>
                  <option value="Mobile Money (Airtel)">Mobile Money (Airtel)</option>
                </select>
              </label>
            </div>

            {submitError && <div style={{ marginTop: "1rem", color: "#DC2626", fontWeight: 700 }}>{submitError}</div>}
          </form>

          <aside style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "2rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
            <h2 style={{ margin: 0, marginBottom: "1rem", fontSize: "1.5rem" }}>Order Summary</h2>

            <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
              {cartItems.map((item) => (
                <div key={item.id || item._id} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <img src={item.image} alt={item.name} style={{ width: 70, height: 70, borderRadius: 18, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, color: "#0F172A" }}>{item.name}</p>
                    <p style={{ margin: "0.35rem 0 0", color: "#64748B", fontSize: "0.9rem" }}>
                      {item.quantity} × RWF {item.price.toLocaleString("en-US")}
                    </p>
                  </div>
                  <span style={{ fontWeight: 700, color: "#2563EB" }}>
                    RWF {(item.price * item.quantity).toLocaleString("en-US")}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B", marginBottom: "0.75rem" }}>
                <span>Total</span>
                <span style={{ fontWeight: 700, color: "#2563EB", fontSize: "1.35rem" }}>
                  RWF {cartTotal.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: "100%",
                backgroundColor: "#2563EB",
                color: "#ffffff",
                border: "none",
                borderRadius: 18,
                padding: "1rem 1.25rem",
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </div>
      </div>

      <style>{`@media (max-width: 980px) { div[style*='grid-template-columns: 1.4fr 0.8fr'] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default Checkout;
