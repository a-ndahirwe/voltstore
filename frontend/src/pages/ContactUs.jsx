import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission (in production, send to backend)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#0F172A' }}>Contact Us</div>
          <p style={{ color: '#64748B', marginTop: 12, fontSize: 16 }}>Have a question or feedback? We'd love to hear from you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: '3rem' }}>
          {/* Contact Information */}
          <div>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Get in Touch</h2>
              
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24 }}>📧</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Email</div>
                    <div style={{ color: '#64748B' }}>support@voltstore.com</div>
                    <div style={{ color: '#64748B' }}>info@voltstore.com</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24 }}>📞</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Phone</div>
                    <div style={{ color: '#64748B' }}>+250 780 000 000</div>
                    <div style={{ color: '#64748B' }}>+250 788 000 000</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24 }}>📍</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Location</div>
                    <div style={{ color: '#64748B' }}>VoltStore Headquarters</div>
                    <div style={{ color: '#64748B' }}>Kigali, Rwanda</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24 }}>🕐</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Hours</div>
                    <div style={{ color: '#64748B' }}>Monday - Friday: 9:00 AM - 6:00 PM</div>
                    <div style={{ color: '#64748B' }}>Saturday: 10:00 AM - 4:00 PM</div>
                    <div style={{ color: '#64748B' }}>Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Send us a Message</h2>

              {submitted && (
                <div style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: 16, borderRadius: 12, marginBottom: 16, fontWeight: 700 }}>
                  ✅ Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, color: '#475569' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 14 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, color: '#475569' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 14 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, color: '#475569' }}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                    style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 14 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: 8, color: '#475569' }}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Please share your message..."
                    rows={5}
                    style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 14, fontFamily: 'inherit' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: 12,
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { q: 'What is the delivery time?', a: 'We deliver within 24 hours in Kigali for orders above RWF 200,000.' },
              { q: 'Do you offer returns?', a: 'Yes, we offer a 30-day return policy on all products in original condition.' },
              { q: 'What payment methods do you accept?', a: 'We accept mobile money, bank transfers, and cash on delivery.' },
              { q: 'How can I track my order?', a: 'You can track your order from your account dashboard under "My Orders".' },
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>❓ {item.q}</div>
                <div style={{ color: '#64748B' }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
