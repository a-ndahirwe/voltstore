import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const brands = ["Apple", "Samsung", "HP", "Dell", "Sony", "JBL", "Logitech", "Anker"];
const priceOptions = [
  { key: "all", label: "All prices" },
  { key: "under100k", label: "Under 100k" },
  { key: "100k-500k", label: "100k-500k" },
  { key: "above500k", label: "Above 500k" },
];
const ratingOptions = [
  { key: "all", label: "All ratings" },
  { key: "4", label: "4★ & above" },
  { key: "3", label: "3★ & above" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "All";
    setSearchTerm(searchQuery);
    setCategory(categoryQuery);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        const searchQuery = searchParams.get("search");
        const categoryQuery = searchParams.get("category");
        if (searchQuery) params.search = searchQuery;
        if (categoryQuery && categoryQuery !== "All") params.category = categoryQuery;

        const response = await getProducts(params);
        setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleCategoryChange = (newCategory) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (newCategory === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", newCategory);
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const nextParams = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      nextParams.set("search", searchTerm.trim());
    } else {
      nextParams.delete("search");
    }
    setSearchParams(nextParams);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  };

  const handlePriceChange = (key) => {
    setPriceRange(key);
  };

  const handleRatingChange = (key) => {
    setRatingFilter(key);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange("all");
    setRatingFilter("all");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      if (priceRange === "under100k" && product.price >= 100000) return false;
      if (priceRange === "100k-500k" && (product.price < 100000 || product.price > 500000)) return false;
      if (priceRange === "above500k" && product.price <= 500000) return false;

      if (ratingFilter === "4" && product.rating < 4) return false;
      if (ratingFilter === "3" && product.rating < 3) return false;

      return true;
    });
  }, [products, selectedBrands, priceRange, ratingFilter]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", color: "#0F172A", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
            <h1 style={{ margin: 0, fontSize: "2.25rem" }}>Shop Electronics</h1>
            <p style={{ margin: 0, color: "#475569" }}>
              Browse the latest phones, laptops, TVs, audio gear, and accessories at VoltStore.
            </p>
          </div>
          <CategoryFilter selectedCategory={category} onCategoryChange={handleCategoryChange} />
        </div>

          <div className="products-layout" style={{ display: "grid", gap: "2rem" }}>
          <aside
            className="products-sidebar"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 24,
              padding: "1.5rem",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
              minWidth: 260,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.15rem" }}>Filters</h2>
              <button
                type="button"
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#2563EB",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Clear
              </button>
            </div>

            <section style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Brand</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {brands.map((brand) => (
                  <label key={brand} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", cursor: "pointer", color: "#0F172A" }}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      style={{ width: 16, height: 16, accentColor: "#2563EB" }}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </section>

            <section style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Price Range</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {priceOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handlePriceChange(option.key)}
                    style={{
                      textAlign: "left",
                      borderRadius: 12,
                      border: priceRange === option.key ? "1px solid #2563EB" : "1px solid #E2E8F0",
                      backgroundColor: priceRange === option.key ? "rgba(37, 99, 235, 0.08)" : "#ffffff",
                      color: "#0F172A",
                      padding: "0.85rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem" }}>Rating</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {ratingOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleRatingChange(option.key)}
                    style={{
                      textAlign: "left",
                      borderRadius: 12,
                      border: ratingFilter === option.key ? "1px solid #2563EB" : "1px solid #E2E8F0",
                      backgroundColor: ratingFilter === option.key ? "rgba(37, 99, 235, 0.08)" : "#ffffff",
                      color: "#0F172A",
                      padding: "0.85rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <main>
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products by name, brand, or feature"
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "1px solid #CBD5E1",
                  borderRadius: 9999,
                  padding: "0.85rem 1rem",
                  outline: "none",
                  fontSize: "0.95rem",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#2563EB",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "0.85rem 1.5rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </form>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
              <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
                {loading ? "Loading products..." : `${filteredProducts.length} products found`}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {selectedBrands.length > 0 && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#DBEAFE", color: "#1D4ED8", borderRadius: 9999, padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}>
                    Brand: {selectedBrands.join(", ")}
                  </span>
                )}
                {priceRange !== "all" && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#DBEAFE", color: "#1D4ED8", borderRadius: 9999, padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}>
                    Price: {priceOptions.find((option) => option.key === priceRange)?.label}
                  </span>
                )}
                {ratingFilter !== "all" && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#DBEAFE", color: "#1D4ED8", borderRadius: 9999, padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}>
                    Rating: {ratingOptions.find((option) => option.key === ratingFilter)?.label}
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 220 }}>
                <div style={{ width: 48, height: 48, border: "5px solid rgba(37, 99, 235, 0.2)", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: "3rem", textAlign: "center", color: "#64748B" }}>
                <h2 style={{ margin: 0, color: "#0F172A" }}>No products found</h2>
                <p style={{ marginTop: "0.75rem" }}>Try changing your search or filters to see more results.</p>
              </div>
            ) : (
              <div className="products-grid" style={{ gap: "1.5rem" }}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .products-layout { grid-template-columns: 300px minmax(0, 1fr); }
          .products-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
          @media (max-width: 1100px) {
            .products-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          @media (max-width: 840px) {
            .products-layout { grid-template-columns: 1fr; }
            .products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .products-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>
    </div>
  );
};

export default Products;
