import React from "react";

const categories = [
  { key: "All", label: "All", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50" },
  { key: "Phones", label: "Phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=50" },
  { key: "Laptops", label: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=50" },
  { key: "TVs", label: "TVs", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=50" },
  { key: "Audio", label: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50" },
  { key: "Accessories", label: "Accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=50" },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div
      style={{
        overflowX: "auto",
        padding: "0.75rem 0",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
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
                padding: "0.75rem 1rem",
                fontSize: "0.95rem",
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
              <img
                src={category.image}
                alt={category.label}
                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', marginRight: '6px' }}
              />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
