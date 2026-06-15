import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.isAdmin) {
    navigate('/signin');
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#0F172A' }}>Admin Dashboard</div>
            <div style={{ color: '#64748B', marginTop: 8 }}>Welcome back, {user.name}. Manage products, orders, and the store from here.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/admin/products" style={{ backgroundColor: '#2563EB', color: '#fff', padding: '12px 18px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Manage Products</Link>
            <Link to="/admin/orders" style={{ backgroundColor: '#FACC15', color: '#0F172A', padding: '12px 18px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>View Orders</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {[
            { title: 'Inventory', subtitle: 'Create, edit and remove products from your catalog', icon: '📦' },
            { title: 'Orders', subtitle: 'Monitor and update order status in real time', icon: '🧾' },
            { title: 'Users', subtitle: 'See store usage and manage account status', icon: '👥' },
            { title: 'Reports', subtitle: 'Track revenue and popular categories', icon: '📈' },
          ].map((item) => (
            <div key={item.title} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, minHeight: 160, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <div style={{ marginTop: 16, fontSize: 20, fontWeight: 700, color: '#0F172A' }}>{item.title}</div>
              <div style={{ marginTop: 8, color: '#64748B', lineHeight: 1.6 }}>{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
