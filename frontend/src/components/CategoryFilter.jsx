import React from "react";

const categories = [
  { key: "All", label: "All", icon: "🛍️" },
  { key: "Phones", label: "Phones", icon: "📱" },
  { key: "Laptops", label: "Laptops", icon: "💻" },
  { key: "TVs", label: "TVs", icon: "📺" },
  { key: "Audio", label: "Audio", icon: "🎧" },
  { key: "Accessories", label: "Accessories", icon: "⚡" },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div
      style={{
        overflowX: "auto",
        padding: "0.75rem 0",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: "0.75rem",
          padding: "0 1rem",
          minWidth: "100%",
        }}
      >
        {categories.map((category) => {
          const active = selectedCategory === category.key;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategoryChange(category.key)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
                borderRadius: 9999,
                border: active ? "1px solid #2563EB" : "1px solid #CBD5E1",
                backgroundColor: active ? "#2563EB" : "#ffffff",
                color: active ? "#ffffff" : "#0F172A",
                padding: "0.7rem 1rem",
                fontSize: "0.92rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "transform 160ms ease, background-color 160ms ease, color 160ms ease",
              }}
              onMouseEnter={(event) => {
                if (!active) {
                  event.currentTarget.style.backgroundColor = "#F8FAFC";
                }
              }}
              onMouseLeave={(event) => {
                if (!active) {
                  event.currentTarget.style.backgroundColor = "#ffffff";
                }
              }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
