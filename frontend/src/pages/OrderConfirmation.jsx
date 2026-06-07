import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api";

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getOrder(id);
        if (response?.data) {
          setOrder(response.data);
        } else {
          setError("Order not found.");
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to retrieve order details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setLoading(false);
      setError("Order ID missing.");
    }
  }, [id]);

  const getOrderDate = () => {
    if (!order?.createdAt) return "—";
    try {
      return new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const totalAmount = order?.total ?? order?.orderTotal ?? 0;
  const formattedTotal = Number(totalAmount).toLocaleString("en-US");
  const status = order?.status || order?.orderStatus || "Pending";
  const statusColor = status.toLowerCase() === "pending" ? "#FACC15" : status.toLowerCase() === "delivered" ? "#16A34A" : "#2563EB";

  if (loading) {
    return (
      <div style={{ minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, border: "5px solid rgba(37, 99, 235, 0.2)", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", color: "#0F172A", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: "2rem" }}>
        {error ? (
          <div style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "2rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)", textAlign: "center" }}>
            <h2 style={{ margin: 0, color: "#0F172A" }}>Order not found</h2>
            <p style={{ color: "#64748B", marginTop: "1rem" }}>{error}</p>
            <Link to="/products" style={{ marginTop: "1.5rem", display: "inline-block", backgroundColor: "#2563EB", color: "#ffffff", padding: "0.95rem 1.75rem", borderRadius: 9999, textDecoration: "none", fontWeight: 700 }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <section style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "2rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)", display: "grid", gap: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem" }}>✅</div>
              <h1 style={{ margin: 0, fontSize: "2.25rem" }}>Order Placed Successfully!</h1>
              <p style={{ color: "#64748B", margin: "0.75rem auto 0", maxWidth: 620 }}>
                Thank you for shopping with VoltStore. Your order is being processed and we will notify you with updates.
              </p>
              <div style={{ marginTop: "1rem", backgroundColor: "#F8FAFC", color: "#0F172A", borderRadius: 20, padding: "1rem 1.25rem", display: "inline-flex", alignItems: "center", gap: "0.75rem", fontWeight: 700 }}>
                Order ID: <span style={{ color: "#2563EB" }}>{order?.id || order?._id || id}</span>
              </div>
            </section>

            <section style={{ display: "grid", gap: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "1.75rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
                  <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem" }}>Order Details</h2>
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Payment Method</span>
                      <span>{order?.customer?.paymentMethod || order?.paymentMethod || "N/A"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Status</span>
                      <span style={{ color: statusColor, fontWeight: 700 }}>{status}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                      <span>Order Date</span>
                      <span>{getOrderDate()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "1.75rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
                  <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem" }}>Customer Info</h2>
                  <div style={{ display: "grid", gap: "0.75rem", color: "#475569" }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: "#0F172A" }}>{order?.customer?.fullName || order?.customerName || "—"}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Email</span>
                      <span>{order?.customer?.email || order?.email || "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Phone</span>
                      <span>{order?.customer?.phone || order?.phone || "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>City</span>
                      <span>{order?.customer?.city || order?.city || "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Address</span>
                      <span style={{ maxWidth: 320, textAlign: "right" }}>{order?.customer?.address || order?.address || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "#ffffff", borderRadius: 28, padding: "1.75rem", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)" }}>
                <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem" }}>Items Ordered</h2>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {(order?.items || []).map((item) => (
                    <div key={item.productId || item._id || item.name} style={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: "1rem", alignItems: "center", padding: "1rem", borderRadius: 20, backgroundColor: "#F8FAFC" }}>
                      <img src={item.image || item.productImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100"} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100'; }} style={{ width: 72, height: 72, borderRadius: 18, objectFit: "cover" }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: "#0F172A" }}>{item.name}</p>
                        <p style={{ margin: "0.35rem 0 0", color: "#64748B", fontSize: "0.9rem" }}>
                          Qty {item.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontWeight: 700, color: "#2563EB" }}>
                          RWF {(item.subtotal || item.price * item.quantity).toLocaleString("en-US")}
                        </p>
                        <p style={{ margin: "0.35rem 0 0", color: "#64748B", fontSize: "0.9rem" }}>
                          RWF {(item.price || 0).toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1rem", marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <span style={{ color: "#64748B", fontWeight: 700 }}>Total Amount</span>
                  <span style={{ color: "#2563EB", fontSize: "1.75rem", fontWeight: 800 }}>RWF {formattedTotal}</span>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                  <Link to="/products" style={{ flex: "1 1 auto", backgroundColor: "#2563EB", color: "#ffffff", textAlign: "center", textDecoration: "none", borderRadius: 18, padding: "1rem 1.25rem", fontWeight: 700 }}>
                    Continue Shopping
                  </Link>
                  <button
                    type="button"
                    style={{ flex: "1 1 auto", backgroundColor: "transparent", border: "1px solid #2563EB", color: "#2563EB", borderRadius: 18, padding: "1rem 1.25rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (max-width: 980px) { div[style*='grid-template-columns: 1fr 1fr'] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

export default OrderConfirmation;
