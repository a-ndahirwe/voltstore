import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiBase = process.env.REACT_APP_API_URL || '';

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, login, logout } = useAuth();
  const [editing, setEditing] = useState({});
  const [orders, setOrders] = useState([]);
  const [prefs, setPrefs] = useState({ newsletter: true, sms: false, updates: true });
  const [twoFA, setTwoFA] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    setEditing({ name: user.name || '', email: user.email || '', phone: user.phone || '', address: user.address || '', city: user.city || '' });
  }, [navigate, user]);

  useEffect(() => {
    // fetch all orders and compute stats
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiBase}/orders`);
        if (!res.ok) return;
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        // ignore
      }
    };
    fetchOrders();
  }, []);

  const userOrders = orders.filter(o => o.customer?.email === user?.email);
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const rewardPoints = totalOrders * 100;

  const handleSave = () => {
    const updated = { ...user, ...editing };
    login(updated, token);
    alert('Profile updated (saved locally)');
  };

  const handleDelete = () => {
    if (!confirm('Delete your account? This cannot be undone.')) return;
    logout();
    navigate('/');
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header card */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 24, borderRadius: 12, backgroundColor: '#0F172A', color: '#fff' }}>
          <div style={{ width: 96, height: 96, borderRadius: 9999, backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800 }}>
            {user.name?.split(' ')[0]?.charAt(0)?.toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{user.name}</div>
            <div style={{ color: '#CBD5E1', marginTop: 6 }}>{user.email}</div>
            <div style={{ color: '#94a3b8', marginTop: 6 }}>Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</div>
          </div>
          <div>
            <button onClick={() => alert('Edit profile clicked')} style={{ backgroundColor: '#FACC15', color: '#0F172A', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 700 }}>Edit Profile</button>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 18 }}>
          <div style={{ background: '#fff', padding: 18, borderRadius: 8 }}>
            <div style={{ color: '#64748B', fontWeight: 700 }}>Total Orders</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginTop: 8 }}>{totalOrders}</div>
          </div>
          <div style={{ background: '#fff', padding: 18, borderRadius: 8 }}>
            <div style={{ color: '#64748B', fontWeight: 700 }}>Total Spent (RWF)</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2563EB', marginTop: 8 }}>{totalSpent.toLocaleString()}</div>
          </div>
          <div style={{ background: '#fff', padding: 18, borderRadius: 8 }}>
            <div style={{ color: '#64748B', fontWeight: 700 }}>Wishlist Items</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginTop: 8 }}>0</div>
          </div>
          <div style={{ background: '#fff', padding: 18, borderRadius: 8 }}>
            <div style={{ color: '#64748B', fontWeight: 700 }}>Reward Points</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginTop: 8 }}>{rewardPoints}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 20 }}>
          <div>
            {/* Account Details */}
            <div style={{ background: '#fff', padding: 18, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Account Details</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Full Name</div>
                  <input value={editing.name} onChange={(e) => setEditing(s => ({ ...s, name: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #E6EEF8', marginTop: 8 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Email</div>
                  <input value={editing.email} onChange={(e) => setEditing(s => ({ ...s, email: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #E6EEF8', marginTop: 8 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Phone Number</div>
                  <input value={editing.phone} onChange={(e) => setEditing(s => ({ ...s, phone: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #E6EEF8', marginTop: 8 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Delivery Address</div>
                  <input value={editing.address} onChange={(e) => setEditing(s => ({ ...s, address: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #E6EEF8', marginTop: 8 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>City</div>
                  <input value={editing.city} onChange={(e) => setEditing(s => ({ ...s, city: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #E6EEF8', marginTop: 8 }} />
                </div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={handleSave} style={{ backgroundColor: '#2563EB', color: '#fff', padding: '10px 16px', borderRadius: 8, border: 'none', fontWeight: 700 }}>Save Changes</button>
                </div>
              </div>
            </div>

            {/* Security */}
            <div style={{ background: '#fff', padding: 18, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Security</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <button onClick={() => navigate('/forgot-password')} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #E6EEF8', background: '#fff', cursor: 'pointer' }}>Change Password</button>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(v => !v)} /> Enable Two-Factor Authentication
                </label>
              </div>
              <div>
                <button onClick={handleDelete} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', fontWeight: 700 }}>Delete Account</button>
              </div>
            </div>

            {/* Preferences */}
            <div style={{ background: '#fff', padding: 18, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Preferences</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Newsletter subscription</span>
                  <input type="checkbox" checked={prefs.newsletter} onChange={() => setPrefs(s => ({ ...s, newsletter: !s.newsletter }))} />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>SMS notifications</span>
                  <input type="checkbox" checked={prefs.sms} onChange={() => setPrefs(s => ({ ...s, sms: !s.sms }))} />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Order updates</span>
                  <input type="checkbox" checked={prefs.updates} onChange={() => setPrefs(s => ({ ...s, updates: !s.updates }))} />
                </label>
              </div>
            </div>
          </div>

          <div>
            {/* Right column: Orders summary and danger zone */}
            <div style={{ background: '#fff', padding: 18, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Orders Summary</div>
              <div style={{ marginBottom: 8 }}>Total Orders: <strong>{totalOrders}</strong></div>
              <div style={{ marginBottom: 8 }}>Total Spent: <strong style={{ color: '#2563EB' }}>{totalSpent.toLocaleString()} RWF</strong></div>
              <div style={{ marginBottom: 8 }}>Reward Points: <strong>{rewardPoints}</strong></div>
              <div style={{ marginTop: 12 }}>
                <button onClick={() => navigate('/orders')} style={{ backgroundColor: '#2563EB', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', fontWeight: 700 }}>View My Orders</button>
              </div>
            </div>

            <div style={{ background: '#fff', padding: 18, borderRadius: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, color: '#ef4444' }}>Danger Zone</div>
              <div>
                <button onClick={handleSignOut} style={{ width: '100%', backgroundColor: '#ef4444', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', fontWeight: 700 }}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
