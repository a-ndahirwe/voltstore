import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.slice(0, 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', gradient: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)' },
    { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' },
    { name: 'TVs', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300', gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)' },
    { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' },
  ];

  const trustBadges = [
    { image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200', title: 'Fast Delivery', desc: 'Ships within 24 hours in Kigali' },
    { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200', title: 'Secure Payment', desc: '100% secure transactions' },
    { image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=200', title: 'Easy Returns', desc: '30-day return policy' },
    { image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200', title: '24/7 Support', desc: 'Always here to help' },
  ];

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-text h1 {
            font-size: 2rem !important;
          }
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      {/* ANNOUNCEMENT BAR */}
      <div style={{ backgroundColor: '#000', color: '#FACC15', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
        🚀 Free delivery on orders above RWF 200,000 | 📞 Support: +250 780 000 000
      </div>

      {/* HERO SECTION */}
      <div style={{
        backgroundImage: 'linear-gradient(rgba(15,23,42,0.85), rgba(37,99,235,0.75)), url(https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        padding: '4rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
      }}>
        {/* Content */}
        <div style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#FACC15',
            color: '#000',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            Rwanda's #1 Electronics Store
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', lineHeight: 1.2 }}>
            Power Your World
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#e0e7ff', marginBottom: '2rem', lineHeight: 1.6 }}>
            Shop the latest phones, laptops, TVs and more
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
            <button onClick={() => navigate('/products')} style={{
              backgroundColor: '#FACC15',
              color: '#000',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }} onMouseOver={(e) => { e.target.style.backgroundColor = '#fbbf24'; e.target.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.target.style.backgroundColor = '#FACC15'; e.target.style.transform = 'translateY(0)'; }}>
              Shop Now
            </button>
            <button onClick={() => navigate('/products')} style={{
              backgroundColor: 'transparent',
              color: '#FACC15',
              border: '2px solid #FACC15',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }} onMouseOver={(e) => { e.target.style.backgroundColor = '#FACC15'; e.target.style.color = '#000'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#FACC15'; }}>
              View All Products
            </button>
          </div>
          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            marginTop: '32px',
            color: '#cbd5e1',
            alignItems: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>500+</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Products</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>50+</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Brands</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Free</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Delivery</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>24/7</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div style={{ padding: '4rem 2rem', backgroundColor: '#F8FAFC' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', color: '#0F172A' }}>
          Shop by Category
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }} className="category-grid">
          {categories.map((cat) => (
            <div key={cat.name} onClick={() => navigate(`/products?category=${cat.name}`)} style={{
              background: cat.gradient,
              color: 'white',
              padding: '0',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              overflow: 'hidden',
            }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)'; }}>
              <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px 8px 0 0', display: 'block' }} />
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.95, margin: 0 }}>Shop Now →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROMOTIONAL BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%)',
        color: 'white',
        padding: '3rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FACC15', marginBottom: '0.5rem' }}>
            🔥 New Arrivals 2026
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#e0e7ff' }}>
            Latest phones laptops and smart devices
          </p>
        </div>
        <button onClick={() => navigate('/products')} style={{
          backgroundColor: '#FACC15',
          color: '#000',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }} onMouseOver={(e) => { e.target.style.backgroundColor = '#fbbf24'; e.target.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.target.style.backgroundColor = '#FACC15'; e.target.style.transform = 'translateY(0)'; }}>
          Explore Now →
        </button>
      </div>

      {/* FEATURED PRODUCTS */}
      <div style={{ padding: '4rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Featured Products
          </h2>
          <Link to="/products" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>
            View All →
          </Link>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #e0e7ff',
              borderTop: '4px solid #2563EB',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}></div>
            <p style={{ marginTop: '1rem', color: '#666' }}>Loading products...</p>
          </div>
        )}

        {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

        {!loading && products.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* TRUST BADGES */}
      <div style={{ padding: '4rem 2rem', backgroundColor: '#F8FAFC' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {trustBadges.map((badge) => (
            <div key={badge.title} style={{
              backgroundColor: 'white',
              padding: '0',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
            }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <img src={badge.image} alt={badge.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px 8px 0 0', display: 'block' }} />
              <div style={{ padding: '1.75rem 1.5rem 2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                  {badge.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
