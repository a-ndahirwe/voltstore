import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';

const statusChoices = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/signin');
      return;
    }

    const fetchOrders = async () => {
      try {
        const params = { status: filter !== 'All' ? filter : undefined, search: search || undefined };
        const res = await API.get('/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      }
    };
    fetchOrders();
  }, [navigate, token, user, filter, search]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await API.put(`/admin/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.map((order) => order._id === orderId ? res.data : order));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update order');
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>Order Management</h1>
            <p style={{ color: '#64748B', marginTop: 8 }}>Review, filter, and update order statuses from one place.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer or email"
              style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', minWidth: 260 }}
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <option>All</option>
              {statusChoices.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        </div>

        {error && <div style={{ color: '#dc2626', fontWeight: 700, marginBottom: 16 }}>{error}</div>}

        <div style={{ display: 'grid', gap: 16 }}>
          {orders.map((order) => (
            <div key={order._id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 20px 40px rgba(15,23,42,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>Order #{String(order._id).slice(0, 8)}</div>
                  <div style={{ color: '#64748B', fontSize: 14 }}>{new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ padding: '8px 12px', borderRadius: 9999, backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700 }}>{order.status}</div>
                  <div style={{ fontWeight: 700, color: '#2563EB' }}>RWF {(order.totalAmount || 0).toLocaleString()}</div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Customer</div>
                  <div>{order.customer.name}</div>
                  <div style={{ color: '#64748B', fontSize: 14 }}>{order.customer.email}</div>
                  <div style={{ color: '#64748B', fontSize: 14 }}>{order.customer.phone}</div>
                  <div style={{ color: '#64748B', fontSize: 14 }}>{order.customer.address}, {order.customer.city}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Items</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {order.items.map((item) => (
                      <div key={item.product ? item.product._id : item.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid #E2E8F0', paddingBottom: 8 }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{item.name}</div>
                          <div style={{ color: '#94A3B8', fontSize: 13 }}>Qty: {item.quantity} • RWF {(item.price || 0).toLocaleString()}</div>
                        </div>
                        <div style={{ fontWeight: 700 }}>RWF {(item.quantity * item.price || 0).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <label style={{ fontWeight: 700, minWidth: 120 }}>Update status:</label>
                <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', minWidth: 220 }}>
                  {statusChoices.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
