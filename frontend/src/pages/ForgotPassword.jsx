import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to send reset link');
      }
      setMessage('✅ Reset link sent! Check your email');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Unable to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 450, backgroundColor: '#ffffff', borderRadius: 16, padding: 40, boxShadow: '0 20px 60px rgba(15, 23, 42, 0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ color: '#2563EB', fontSize: 32, fontWeight: 800 }}>⚡ VoltStore</div>
          <h1 style={{ marginTop: 16, marginBottom: 8, fontSize: 28, color: '#0F172A' }}>Forgot Password?</h1>
          <p style={{ color: '#64748B', margin: 0 }}>Enter your email and we'll send you a reset link</p>
        </div>

        {message && <div style={{ color: '#16a34a', marginBottom: 16, fontWeight: 600 }}>{message}</div>}
        {error && <div style={{ color: '#db2777', marginBottom: 16, fontWeight: 600 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8, color: '#475569', fontWeight: 600 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #CBD5E1', marginBottom: 24, fontSize: 16 }}
          />

          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#2563EB', color: '#ffffff', border: 'none', borderRadius: 12, padding: '14px 16px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569' }}>
          <Link to="/signin" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 700 }}>Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
