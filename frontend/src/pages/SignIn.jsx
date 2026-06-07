import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      login(response.data, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 450, backgroundColor: '#ffffff', borderRadius: 16, padding: 40, boxShadow: '0 20px 60px rgba(15, 23, 42, 0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ color: '#2563EB', fontSize: 32, fontWeight: 800 }}>⚡ VoltStore</div>
          <h1 style={{ marginTop: 16, marginBottom: 8, fontSize: 28, color: '#0F172A' }}>Welcome Back</h1>
          <p style={{ color: '#64748B', margin: 0 }}>Sign in to your VoltStore account</p>
        </div>

        {error && <div style={{ color: '#db2777', marginBottom: 16, fontWeight: 600 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8, color: '#475569', fontWeight: 600 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #CBD5E1', marginBottom: 16, fontSize: 16 }}
          />

          <label style={{ display: 'block', marginBottom: 8, color: '#475569', fontWeight: 600 }}>Password</label>
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #CBD5E1', fontSize: 16 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <Link to="/forgot-password" style={{ color: '#2563EB', fontSize: 14, textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#2563EB', color: '#ffffff', border: 'none', borderRadius: 12, padding: '14px 16px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: 12, color: '#94a3b8', fontSize: 14 }}>
          <span style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
          <span>OR CONTINUE WITH</span>
          <span style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginBottom: 24 }}>
          <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 12, border: '1px solid #CBD5E1', backgroundColor: '#ffffff', color: '#0F172A', fontWeight: 700, cursor: 'pointer' }}>
            <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google" />
            Google
          </button>
          <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 12, border: 'none', backgroundColor: '#1877F2', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>
            <img src="https://www.facebook.com/favicon.ico" width="20" height="20" alt="Facebook" />
            Facebook
          </button>
          <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 12, border: 'none', backgroundImage: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>
            <img src="https://www.instagram.com/favicon.ico" width="20" height="20" alt="Instagram" />
            Instagram
          </button>
        </div>

        <div style={{ textAlign: 'center', color: '#475569' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 700 }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
