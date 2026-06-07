import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api";

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
  const [paymentProcessing, setPaymentProcessing] = useState(null); // 'MTN' | 'Airtel' | null

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!formData.address.trim()) nextErrors.address = "Delivery address is required.";
    if (!formData.city.trim()) nextErrors.city = "City is required.";
    // Mobile money number validation when applicable
    if (formData.paymentMethod.includes("Mobile Money")) {
      const mobile = (formData.mobileNumber || "").trim();
      if (!mobile) nextErrors.mobileNumber = "Mobile Money number is required.";
      else if (!/^07\d{8}$/.test(mobile)) nextErrors.mobileNumber = "Enter a valid Rwandan mobile number starting with 07 and 10 digits.";
    }
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

    const proceedOrder = async () => {
      try {
        const selectedPaymentMethod = formData.paymentMethod;
        console.log('formData:', formData);
        const orderPayload = {
          customer: {
            name: (formData.name || formData.fullName || "").trim(),
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
          },
          items: cartItems.map((item) => ({
            product: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: cartTotal,
          paymentMethod: selectedPaymentMethod,
        };

        console.log("Order payload:", orderPayload);

        const response = await createOrder(orderPayload);
        const orderId = response?.data?.id || response?.data?._id || response?.data?.orderId;
        clearCart();
        if (orderId) {
          navigate(`/order-confirmation/${orderId}`);
        } else {
          setSubmitError("Order created, but we could not determine the confirmation link.");
        }
      } catch (err) {
        console.error('Order error:', err.response?.data || err.message);
        setSubmitError("Unable to place your order. Please try again.");
      } finally {
        setSubmitting(false);
        setPaymentProcessing(null);
      }
    };

    // If Mobile Money selected, simulate payment processing modal then place order
    if (formData.paymentMethod.includes("Mobile Money")) {
      const provider = formData.paymentMethod.includes("MTN") ? "MTN" : "Airtel";
      setPaymentProcessing(provider);
      // simulate delay then proceed
      setTimeout(() => {
        proceedOrder();
      }, 3000);
      return;
    }

    // Otherwise place order immediately
    await proceedOrder();
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
                <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                  <div
                    role="button"
                    onClick={() => setFormData((c) => ({ ...c, paymentMethod: "Cash on Delivery", mobileNumber: "" }))}
                    style={{
                      padding: "0.9rem 1rem",
                      borderRadius: 12,
                      backgroundColor: "#F3F4F6",
                      color: "#0F172A",
                      cursor: "pointer",
                      border: formData.paymentMethod === "Cash on Delivery" ? "2px solid #2563EB" : "2px solid transparent",
                      minWidth: 170,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 700,
                    }}
                  >
                    💵 Cash on Delivery
                  </div>

                  <div
                    role="button"
                    onClick={() => setFormData((c) => ({ ...c, paymentMethod: "Mobile Money (MTN)" }))}
                    style={{
                      padding: "0.9rem 1rem",
                      borderRadius: 12,
                      backgroundColor: "#FFCB00",
                      color: "#000000",
                      cursor: "pointer",
                      border: formData.paymentMethod === "Mobile Money (MTN)" ? "2px solid #2563EB" : "2px solid transparent",
                      minWidth: 170,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 700,
                    }}
                  >
                    MTN Mobile Money
                  </div>

                  <div
                    role="button"
                    onClick={() => setFormData((c) => ({ ...c, paymentMethod: "Mobile Money (Airtel)" }))}
                    style={{
                      padding: "0.9rem 1rem",
                      borderRadius: 12,
                      backgroundColor: "#FF0000",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      border: formData.paymentMethod === "Mobile Money (Airtel)" ? "2px solid #2563EB" : "2px solid transparent",
                      minWidth: 170,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 700,
                    }}
                  >
                    Airtel Money
                  </div>
                </div>
                {formData.paymentMethod.includes("Mobile Money") && (
                  <div style={{ marginTop: 12 }}>
                    <input
                      type="tel"
                      placeholder="07XXXXXXXX"
                      value={formData.mobileNumber || ""}
                      onChange={(e) => setFormData((c) => ({ ...c, mobileNumber: e.target.value }))}
                      style={{ ...fieldStyle }}
                    />
                    {errors.mobileNumber && <div style={{ color: "#DC2626", fontSize: "0.9rem", marginTop: 6 }}>{errors.mobileNumber}</div>}
                  </div>
                )}
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

      {paymentProcessing && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(2,6,23,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: 16, padding: "2rem", width: 420, maxWidth: "90%", textAlign: "center", boxShadow: "0 18px 40px rgba(2,6,23,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 9999, border: "6px solid rgba(37,99,235,0.15)", borderTopColor: "#2563EB", animation: "spin 1s linear infinite" }} />
            </div>
            <h3 style={{ margin: 0, marginBottom: 8 }}>Processing Mobile Money Payment...</h3>
            <p style={{ margin: 0, color: "#64748B", marginBottom: 10 }}>Please check your phone and enter your PIN</p>
            <div style={{ marginTop: 12, padding: "0.5rem 1rem", borderRadius: 8, fontWeight: 700, display: "inline-block", color: paymentProcessing === "MTN" ? "#000" : "#FFF", backgroundColor: paymentProcessing === "MTN" ? "#FFCB00" : "#FF0000" }}>
              {paymentProcessing === "MTN" ? "MTN Mobile Money" : "Airtel Money"}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (max-width: 980px) { div[style*='grid-template-columns: 1.4fr 0.8fr'] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default Checkout;
