import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiBase = process.env.REACT_APP_API_URL || '';

const statusColors = {
  Pending: '#FACC15',
  Processing: '#2563EB',
  Shipped: '#7C3AED',
  Delivered: '#16A34A',
  Cancelled: '#EF4444'
};

const MyOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [navigate, user]);

  useEffect(() => {
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

  if (!user) return null;

  const myOrders = orders.filter(o => o.customer?.email === user.email);
  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filtered = filter === 'All' ? myOrders : myOrders.filter(o => o.status === filter);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h1 style={{ margin: 0 }}>My Orders <span style={{ backgroundColor: '#2563EB', color: '#fff', padding: '4px 8px', borderRadius: 9999, marginLeft: 8, fontSize: 14 }}>{myOrders.length}</span></h1>
          <div>
            <button onClick={() => navigate('/products')} style={{ backgroundColor: '#2563EB', color: '#fff', padding: '8px 12px', borderRadius: 8, border: 'none', fontWeight: 700 }}>Shop Now</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: '8px 12px', borderRadius: 8, border: filter === t ? '2px solid #2563EB' : '1px solid #E6EEF8', background: filter === t ? '#EEF2FF' : '#fff', cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 8 }}>
            <div style={{ fontSize: 36 }}>👜</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 12 }}>No orders yet</div>
            <div style={{ color: '#64748B', marginTop: 8 }}>Looks like you haven't placed any orders yet.</div>
            <div style={{ marginTop: 16 }}>
              <button onClick={() => navigate('/products')} style={{ backgroundColor: '#2563EB', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', fontWeight: 700 }}>Shop Now</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {filtered.map(order => (
              <div key={order._id} style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>Order #{String(order._id).slice(0,8)}</div>
                    <div style={{ color: '#64748B', fontSize: 13 }}>{new Date(order.createdAt || order.createdAt).toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ backgroundColor: statusColors[order.status] || '#CBD5E1', color: '#0F172A', padding: '6px 10px', borderRadius: 9999, fontWeight: 700 }}>{order.status}</div>
                    <div>
                      <button onClick={() => navigate(`/order-confirmation/${order._id}`)} style={{ backgroundColor: '#2563EB', color: '#fff', padding: '8px 12px', borderRadius: 8, border: 'none', fontWeight: 700 }}>View Details</button>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                  {(order.orderItems || []).map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={it.image || (it.product && it.product.image) || 'https://via.placeholder.com/60'} width={60} height={60} style={{ borderRadius: 8, objectFit: 'cover' }} alt={it.name || it.product?.name} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>{it.name || it.product?.name}</div>
                        <div style={{ color: '#64748B', fontSize: 13 }}>Qty: {it.qty || it.quantity || 1}</div>
                      </div>
                      <div style={{ fontWeight: 800, color: '#2563EB' }}>{(it.price || it.product?.price || 0).toLocaleString()} RWF</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#64748B' }}>Payment: {order.paymentMethod || 'N/A'}</div>
                  <div style={{ fontWeight: 800, color: '#2563EB' }}>Total: {(order.totalPrice || 0).toLocaleString()} RWF</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
