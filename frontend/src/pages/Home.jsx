import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const categories = [
  { name: "Phones", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "TVs", icon: "📺" },
  { name: "Audio", icon: "🎧" },
  { name: "Accessories", icon: "⚡" },
];

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts({ limit: 8 });
        setFeaturedProducts(response.data || []);
      } catch (error) {
        console.error("Unable to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleShopNow = () => {
    navigate("/products");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const query = category === "All" ? "" : `?category=${encodeURIComponent(category)}`;
    navigate(`/products${query}`);
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", color: "#0F172A" }}>
      <section
        style={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          padding: "4rem 1rem",
          background: "linear-gradient(135deg, #0F172A 0%, #2563EB 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <p style={{ color: "#FACC15", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>
                VoltStore
              </p>
              <h1 style={{ fontSize: "3rem", lineHeight: 1.05, margin: "1rem 0" }}>
                Power Your World
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
                Rwanda's premier electronics store for premium devices, smart home gear, and everyday essentials.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={handleShopNow}
                  style={{
                    backgroundColor: "#FACC15",
                    color: "#0F172A",
                    border: "none",
                    borderRadius: 9999,
                    padding: "0.95rem 1.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Shop Now
                </button>
                <button
                  type="button"
                  onClick={handleShopNow}
                  style={{
                    backgroundColor: "transparent",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.9)",
                    borderRadius: 9999,
                    padding: "0.95rem 1.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 1rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "2rem", margin: 0 }}>
                Shop by Category
              </h2>
              <p style={{ color: "#64748B", marginTop: "0.75rem" }}>
                Find the best phones, laptops, TVs, audio gear, and accessories for your setup.
              </p>
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategorySelect} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategorySelect(category.name)}
                style={{
                  minHeight: 140,
                  borderRadius: 24,
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 160ms ease, box-shadow 160ms ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-4px)";
                  event.currentTarget.style.boxShadow = "0 18px 40px rgba(15, 23, 42, 0.12)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "none";
                  event.currentTarget.style.boxShadow = "0 12px 30px rgba(15, 23, 42, 0.05)";
                }}
              >
                <span style={{ fontSize: "1.75rem" }}>{category.icon}</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "1rem", color: "#0F172A" }}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 1rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "2rem", margin: 0 }}>
                Featured Products
              </h2>
              <p style={{ color: "#64748B", marginTop: "0.75rem" }}>
                Browse our handpicked selection of top electronics available right now.
              </p>
            </div>
            <button
              type="button"
              onClick={handleShopNow}
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 9999,
                padding: "0.85rem 1.5rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              View All Products
            </button>
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
              <div style={{ width: 48, height: 48, border: "5px solid rgba(37, 99, 235, 0.2)", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {featuredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default Home;
