import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const TABS = ['Dashboard', 'Menu', 'Specials', 'Offers', 'Messages'];

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      localStorage.setItem('nc_admin_token', data.token);
      onLogin();
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Invalid credentials. Try admin / naidu123');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0705', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{ background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(200,115,42,0.2)', borderRadius: '16px', padding: '48px', width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, background: 'linear-gradient(135deg,#c8732a,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Naidu Café</div>
          <div style={{ color: 'rgba(253,246,236,0.4)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginTop: '4px' }}>ADMIN PANEL</div>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" required
            style={{ padding: '13px 16px', background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(253,246,236,0.08)', borderRadius: '6px', color: '#fdf6ec', fontSize: '14px', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#c8732a'} onBlur={e => e.target.style.borderColor = 'rgba(253,246,236,0.08)'} />
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" required
            style={{ padding: '13px 16px', background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(253,246,236,0.08)', borderRadius: '6px', color: '#fdf6ec', fontSize: '14px', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#c8732a'} onBlur={e => e.target.style.borderColor = 'rgba(253,246,236,0.08)'} />
          <button type="submit" disabled={loading}
            style={{ padding: '14px', background: 'linear-gradient(135deg,#c8732a,#f59e0b)', borderRadius: '6px', border: 'none', color: '#0a0705', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', cursor: 'pointer', marginTop: '8px' }}>
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>
        </form>
        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(200,115,42,0.05)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(253,246,236,0.4)', textAlign: 'center' }}>
          Demo: admin / naidu123
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, emoji, color = '#c8732a' }) {
  return (
    <div style={{ background: 'rgba(253,246,236,0.02)', border: '1px solid rgba(253,246,236,0.07)', borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ width: '48px', height: '48px', background: `${color}18`, border: `1px solid ${color}30`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{emoji}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(253,246,236,0.4)', letterSpacing: '0.1em', marginTop: '4px' }}>{label}</div>
      </div>
    </div>
  );
}

function AddMenuItemForm({ onAdded }) {
  const [form, setForm] = useState({ name: '', category: 'Milkshakes', price: '', description: '', emoji: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: Number(form.price) }) });
    const data = await res.json();
    setLoading(false);
    if (data.success) { toast.success('Menu item added!'); onAdded(); setForm({ name: '', category: 'Milkshakes', price: '', description: '', emoji: '' }); }
    else toast.error('Failed to add item');
  }

  const inputStyle = { width: '100%', padding: '11px 14px', background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(253,246,236,0.08)', borderRadius: '6px', color: '#fdf6ec', fontSize: '13px', outline: 'none', fontFamily: 'var(--font-body)' };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', background: 'rgba(200,115,42,0.04)', border: '1px solid rgba(200,115,42,0.12)', borderRadius: '10px', padding: '20px' }}>
      <div style={{ gridColumn: '1/-1', fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Add Menu Item</div>
      <input style={inputStyle} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        {['Milkshakes', 'Thickshakes', 'Mocktails', 'Fresh Juices'].map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input style={inputStyle} placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
      <input style={inputStyle} placeholder="Emoji (e.g. 🍫)" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} />
      <input style={{ ...inputStyle, gridColumn: '1/-1' }} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <button type="submit" disabled={loading} style={{ gridColumn: '1/-1', padding: '12px', background: 'linear-gradient(135deg,#c8732a,#f59e0b)', borderRadius: '6px', border: 'none', color: '#0a0705', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', cursor: 'pointer' }}>
        {loading ? 'ADDING...' : '+ ADD ITEM'}
      </button>
    </form>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [menuItems, setMenuItems] = useState([]);
  const [specials, setSpecials] = useState([]);
  const [offers, setOffers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('nc_admin_token');
    if (token) setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch('/api/menu').then(r => r.json()).then(d => setMenuItems(d.data || []));
    fetch('/api/specials').then(r => r.json()).then(d => setSpecials(d.data || []));
    fetch('/api/offers').then(r => r.json()).then(d => setOffers(d.data || []));
  }, [authed]);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const sideStyle = { padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'rgba(253,246,236,0.6)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em', textAlign: 'left', cursor: 'pointer', transition: 'all .2s', width: '100%' };

  return (
    <>
      <Head><title>Naidu Café — Admin</title></Head>
      <div style={{ minHeight: '100vh', background: '#0a0705', display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', background: 'rgba(253,246,236,0.02)', borderRight: '1px solid rgba(253,246,236,0.06)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, background: 'linear-gradient(135deg,#c8732a,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px', padding: '0 8px' }}>Naidu Admin</div>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ ...sideStyle, background: activeTab === tab ? 'rgba(200,115,42,0.12)' : 'transparent', color: activeTab === tab ? '#c8732a' : 'rgba(253,246,236,0.55)', borderLeft: activeTab === tab ? '2px solid #c8732a' : '2px solid transparent' }}>
              {tab}
            </button>
          ))}
          <div style={{ marginTop: 'auto' }}>
            <button onClick={() => { localStorage.removeItem('nc_admin_token'); setAuthed(false); }}
              style={{ ...sideStyle, color: 'rgba(253,246,236,0.35)' }}>Logout</button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              
              {activeTab === 'Dashboard' && (
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>Dashboard</h1>
                  <p style={{ color: 'rgba(253,246,236,0.4)', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '32px' }}>Welcome back, Admin. Here's your overview.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    <StatCard label="MENU ITEMS" value={menuItems.length} emoji="🍫" color="#c8732a" />
                    <StatCard label="SPECIALS" value={specials.length} emoji="⭐" color="#f59e0b" />
                    <StatCard label="COMBO OFFERS" value={offers.length} emoji="🎁" color="#0fa87e" />
                    <StatCard label="CATEGORIES" value={4} emoji="📋" color="#ec4899" />
                  </div>
                  <div style={{ background: 'rgba(200,115,42,0.05)', border: '1px solid rgba(200,115,42,0.12)', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Quick Actions</div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {[['Add Menu Item', () => setActiveTab('Menu')], ['Add Special', () => setActiveTab('Specials')], ['Add Offer', () => setActiveTab('Offers')]].map(([label, fn]) => (
                        <button key={label} onClick={fn}
                          style={{ padding: '10px 20px', background: 'rgba(200,115,42,0.1)', border: '1px solid rgba(200,115,42,0.2)', borderRadius: '6px', color: '#c8732a', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', cursor: 'pointer' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Menu' && (
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>Menu Items</h1>
                  <AddMenuItemForm onAdded={() => fetch('/api/menu').then(r => r.json()).then(d => setMenuItems(d.data || []))} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {menuItems.map(item => (
                      <div key={item._id} style={{ padding: '16px 20px', background: 'rgba(253,246,236,0.02)', border: '1px solid rgba(253,246,236,0.06)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '24px' }}>{item.emoji || '🥤'}</span>
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(253,246,236,0.4)', fontFamily: 'var(--font-mono)' }}>{item.category}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#c8732a' }}>₹{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Specials' && (
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>Today's Specials</h1>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                    {specials.map(s => (
                      <div key={s._id} style={{ background: 'rgba(253,246,236,0.02)', border: '1px solid rgba(253,246,236,0.06)', borderRadius: '10px', padding: '20px' }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{s.emoji || '⭐'}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{s.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(253,246,236,0.4)', marginBottom: '12px' }}>{s.description}</div>
                        <div style={{ color: '#c8732a', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '22px' }}>₹{s.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Offers' && (
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>Combo Offers</h1>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                    {offers.map(o => (
                      <div key={o._id} style={{ background: 'rgba(253,246,236,0.02)', border: '1px solid rgba(200,115,42,0.12)', borderRadius: '10px', padding: '24px' }}>
                        <div style={{ fontSize: '36px', marginBottom: '12px' }}>{o.emoji}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{o.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(253,246,236,0.4)', marginBottom: '8px' }}>{(o.drinks || []).join(' + ')}</div>
                        <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(200,115,42,0.12)', borderRadius: '3px', color: '#c8732a', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>{o.badge}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: '#c8732a' }}>₹{o.offerPrice} <span style={{ fontSize: '16px', color: 'rgba(253,246,236,0.3)', textDecoration: 'line-through', fontWeight: 400 }}>₹{o.originalPrice}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Messages' && (
                <div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>Contact Messages</h1>
                  <div style={{ background: 'rgba(200,115,42,0.05)', border: '1px solid rgba(200,115,42,0.12)', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📬</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Messages stored in MongoDB</div>
                    <div style={{ color: 'rgba(253,246,236,0.4)', fontSize: '14px' }}>Connect your MongoDB Atlas to view real messages here.</div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
