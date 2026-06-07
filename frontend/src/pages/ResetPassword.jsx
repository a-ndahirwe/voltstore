import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to reset password');
      }
      setSuccess('Password reset successfully. Redirecting to Sign In...');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.message || 'Invalid or expired reset token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 450, backgroundColor: '#ffffff', borderRadius: 16, padding: 40, boxShadow: '0 20px 60px rgba(15, 23, 42, 0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ color: '#2563EB', fontSize: 32, fontWeight: 800 }}>⚡ VoltStore</div>
          <h1 style={{ marginTop: 16, marginBottom: 8, fontSize: 28, color: '#0F172A' }}>Reset Password</h1>
          <p style={{ color: '#64748B', margin: 0 }}>Enter your new password</p>
        </div>

        {success && <div style={{ color: '#16a34a', marginBottom: 16, fontWeight: 600 }}>{success}</div>}
        {error && <div style={{ color: '#db2777', marginBottom: 16, fontWeight: 600 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8, color: '#475569', fontWeight: 600 }}>New Password</label>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="New password"
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

          <label style={{ display: 'block', marginBottom: 8, color: '#475569', fontWeight: 600 }}>Confirm New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #CBD5E1', marginBottom: 24, fontSize: 16 }}
          />

          <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#2563EB', color: '#ffffff', border: 'none', borderRadius: 12, padding: '14px 16px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569' }}>
          <Link to="/signin" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 700 }}>Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
