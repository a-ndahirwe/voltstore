import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';

const defaultForm = {
  name: '',
  description: '',
  price: '',
  category: 'Phones',
  brand: '',
  stock: 10,
  image: '',
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/signin');
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await API.get('/admin/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      }
    };
    fetchProducts();
  }, [navigate, token, user]);

  const openEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      stock: product.stock,
      image: product.image,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(defaultForm);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      let response;
      if (editingId) {
        response = await API.put(`/admin/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prev) => prev.map((product) => product._id === editingId ? response.data : product));
      } else {
        response = await API.post('/admin/products', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prev) => [response.data, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete product');
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>Product Management</h1>
            <p style={{ color: '#64748B', marginTop: 8 }}>Create, edit or delete product listings for the store.</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Add / Edit Product</h2>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
                <input value={form.name} placeholder="Product name" required onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                <textarea value={form.description} placeholder="Product description" required rows={4} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input value={form.price} placeholder="Price" required type="number" onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                  <input value={form.stock} placeholder="Stock" required type="number" onChange={(e) => setForm(prev => ({ ...prev, stock: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <select value={form.category} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                    <option>Phones</option>
                    <option>Laptops</option>
                    <option>Accessories</option>
                    <option>TVs</option>
                    <option>Audio</option>
                  </select>
                  <input value={form.brand} placeholder="Brand" required onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                </div>
                <input value={form.image} placeholder="Image URL" onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))} style={{ padding: 12, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                {error && <div style={{ color: '#dc2626', fontWeight: 700 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button type="submit" disabled={loading} style={{ padding: '12px 18px', borderRadius: 12, border: 'none', backgroundColor: '#2563EB', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{editingId ? 'Update Product' : 'Create Product'}</button>
                  <button type="button" onClick={resetForm} style={{ padding: '12px 18px', borderRadius: 12, border: '1px solid #CBD5E1', backgroundColor: '#fff', color: '#0F172A', fontWeight: 700, cursor: 'pointer' }}>Clear</button>
                </div>
              </form>
            </div>

            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Inventory preview</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {products.map((product) => (
                  <div key={product._id} style={{ padding: 14, borderRadius: 12, border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center' }}>
                    <img src={product.image || 'https://via.placeholder.com/80'} alt={product.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{product.name}</div>
                      <div style={{ color: '#64748B', fontSize: 13 }}>{product.category} • {product.brand}</div>
                      <div style={{ marginTop: 8, fontWeight: 700 }}>RWF {product.price?.toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button onClick={() => openEdit(product)} type="button" style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #2563EB', backgroundColor: '#fff', color: '#2563EB', cursor: 'pointer', fontWeight: 700 }}>Edit</button>
                      <button onClick={() => handleDelete(product._id)} type="button" style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #ef4444', backgroundColor: '#fff', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
