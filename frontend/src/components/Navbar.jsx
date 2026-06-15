import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(`/products${trimmedQuery ? `?search=${encodeURIComponent(trimmedQuery)}` : ""}`);
    setQuery("");
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        height: 70,
      }}
    >
      <nav
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          gap: '1rem',
        }}
      >
        {/* LEFT - Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 180 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span style={{ fontSize: 24, color: '#FACC15', lineHeight: 1 }}>⚡</span>
            <span style={{ fontWeight: 800, fontSize: 24, color: '#2563EB' }}>VoltStore</span>
          </Link>
        </div>

        {/* CENTER - Search */}
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 500, display: 'flex', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 25, padding: '6px 8px' }}>
            <span style={{ color: '#64748B', marginLeft: 10, marginRight: 10, fontSize: 18 }}>🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search phones, laptops, TVs..."
              style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: 14, color: '#0F172A', padding: '8px 6px' }}
            />
            <button type="submit" style={{ backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 14px', marginRight: 6, cursor: 'pointer', fontWeight: 700 }}>Search</button>
          </div>
        </form>

        {/* RIGHT - Links & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
          <Link to="/products" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 500 }}>Products</Link>
          <Link to="/about" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 500 }}>About</Link>
          <Link to="/contact" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 500 }}>Contact</Link>

          <button type="button" onClick={() => navigate('/cart')} style={{ position: 'relative', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
            <span style={{ fontSize: 20 }}>🛒</span>
            <span style={{ position: 'absolute', top: -6, right: -6, minWidth: 20, height: 20, borderRadius: 9999, backgroundColor: '#FACC15', color: '#0F172A', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0.35rem', boxShadow: '0 1px 4px rgba(15,23,42,0.15)' }}>{cartCount}</span>
          </button>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button type="button" onClick={() => setDropdownOpen((prev) => !prev)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 9999 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                  {user.name?.split(' ')[0]?.charAt(0)?.toUpperCase()}
                </div>
                <span style={{ color: '#0F172A', fontWeight: 700 }}>{user.name?.split(' ')[0]}</span>
              </button>
              {dropdownOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 10px)', minWidth: 180, backgroundColor: '#ffffff', border: '1px solid rgba(15,23,42,0.12)', borderRadius: 12, boxShadow: '0 18px 40px rgba(15,23,42,0.12)', padding: '8px 0', zIndex: 1100 }}>
                  <button type="button" onClick={() => { setDropdownOpen(false); navigate('/profile'); }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#0F172A', fontWeight: 700 }}>My Profile</button>
                  <button type="button" onClick={() => { setDropdownOpen(false); navigate('/orders'); }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#0F172A', fontWeight: 700 }}>My Orders</button>
                  {user.isAdmin && (
                    <button type="button" onClick={() => { setDropdownOpen(false); navigate('/admin'); }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#2563EB', fontWeight: 700 }}>Admin Panel</button>
                  )}
                  <button type="button" onClick={handleSignOut} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#dc2626', fontWeight: 700 }}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" onClick={() => navigate('/signin')} style={{ backgroundColor: 'transparent', border: '2px solid #2563EB', color: '#2563EB', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>Sign In</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
