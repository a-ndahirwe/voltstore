import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%)', backgroundImage: 'linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%)', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>About VoltStore</div>
          <p style={{ fontSize: 18, color: '#e0e7ff', marginBottom: 0 }}>Rwanda's leading electronics marketplace bringing the latest tech to your doorstep.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* Mission Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: '4rem', padding: '3rem 0' }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>Our Mission</div>
            <p style={{ color: '#64748B', fontSize: 16, lineHeight: 1.8, marginBottom: 12 }}>
              We believe everyone deserves access to high-quality electronics at competitive prices. VoltStore is dedicated to bringing the latest tech innovations to Rwanda, making premium devices affordable and accessible to all.
            </p>
            <p style={{ color: '#64748B', fontSize: 16, lineHeight: 1.8 }}>
              Our mission is to empower customers with the tools they need to learn, work, and stay connected.
            </p>
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
            <div style={{ fontSize: 48 }}>🎯</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 12 }}>Quality & Affordability</div>
            <p style={{ color: '#64748B', marginTop: 12 }}>We curate the best brands and products at the most competitive prices, ensuring value for every purchase.</p>
          </div>
        </div>

        {/* Values Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 32, textAlign: 'center' }}>Our Core Values</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: '💎', title: 'Quality', desc: 'Only authentic, high-quality products from trusted brands.' },
              { icon: '⚡', title: 'Speed', desc: '24-hour delivery in Kigali for fast, reliable service.' },
              { icon: '🛡️', title: 'Trust', desc: 'Secure transactions and a 30-day return guarantee.' },
              { icon: '👥', title: 'Support', desc: '24/7 customer service ready to help anytime.' },
            ].map((value, idx) => (
              <div key={idx} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, textAlign: 'center', boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{value.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{value.title}</div>
                <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer Section */}
        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '3rem', boxShadow: '0 20px 40px rgba(15,23,42,0.08)', marginBottom: '4rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 32 }}>What We Offer</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📱</span> Phones
              </div>
              <p style={{ color: '#64748B', lineHeight: 1.8 }}>
                The latest smartphones from Apple, Samsung, Xiaomi, and more. From flagship models to budget-friendly options.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>💻</span> Laptops
              </div>
              <p style={{ color: '#64748B', lineHeight: 1.8 }}>
                Premium laptops for work and gaming. MacBooks, Dell, HP, and more for every budget and need.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📺</span> TVs
              </div>
              <p style={{ color: '#64748B', lineHeight: 1.8 }}>
                4K Smart TVs from Samsung, LG, Sony, and more for an immersive home entertainment experience.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🎧</span> Audio
              </div>
              <p style={{ color: '#64748B', lineHeight: 1.8 }}>
                Headphones, earbuds, and speakers from top brands for crystal-clear sound quality.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🔌</span> Accessories
              </div>
              <p style={{ color: '#64748B', lineHeight: 1.8 }}>
                Chargers, cables, cases, and more to complete your tech setup.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: '4rem' }}>
          {[
            { number: '500+', label: 'Products' },
            { number: '50+', label: 'Brands' },
            { number: '10k+', label: 'Happy Customers' },
            { number: '24h', label: 'Delivery' },
          ].map((stat, idx) => (
            <div key={idx} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, textAlign: 'center', boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#2563EB', marginBottom: 8 }}>{stat.number}</div>
              <div style={{ color: '#64748B', fontWeight: 700 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{ backgroundColor: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)', color: '#fff', borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Ready to Shop?</div>
          <p style={{ fontSize: 16, marginBottom: 24, opacity: 0.9 }}>Explore our full collection of premium electronics at unbeatable prices.</p>
          <button onClick={() => navigate('/products')} style={{ backgroundColor: '#FACC15', color: '#0F172A', border: 'none', padding: '12px 24px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
