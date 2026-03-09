
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

// ─── Bubble Particle Component ───
function BubbleParticles({ count = 8, color = 'rgba(200,115,42,0.2)' }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${6 + Math.random() * 14}px`,
            height: `${6 + Math.random() * 14}px`,
            background: `radial-gradient(circle, ${color}, transparent)`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            animation: `bubble ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

// ─── Section Reveal Wrapper ───
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Drink Emoji Orb (replaces 3D for pure HTML) ───
const SHOWCASE_DRINKS = [
  { name: 'Chocolate Overload', category: 'Milkshake', emoji: '🍫', color: '#3d1a08', accent: '#c8732a', desc: 'Belgian chocolate explosion' },
  { name: 'Blue Lagoon', category: 'Mocktail', emoji: '🌊', color: '#040d3d', accent: '#3b82f6', desc: 'Electric citrus cooler' },
  { name: 'Strawberry Cream', category: 'Thickshake', emoji: '🍓', color: '#3d0a1a', accent: '#ec4899', desc: 'Ultra-thick berry dream' },
  { name: 'Mango Mint', category: 'Fresh Juice', emoji: '🥭', color: '#3d2a08', accent: '#f59e0b', desc: 'Tropical freshness' },
];

// ─── NAV ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'scrolled' : ''}`}
      style={{ padding: '20px 48px' }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}
            className="text-gradient cursor-none">
            Naidu Café
          </a>
        </motion.div>
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="hidden md:flex gap-8 list-none">
          {['Menu', 'Specials', 'Offers', 'Gallery', 'Contact'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="cursor-none"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(253,246,236,0.6)', transition: 'color .2s', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#c8732a'}
                onMouseLeave={e => e.target.style.color = 'rgba(253,246,236,0.6)'}>
                {item}
              </a>
            </li>
          ))}
        </motion.ul>
        <motion.a href="#order" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="hidden md:flex cursor-none"
          style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #c8732a, #f59e0b)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', color: '#0a0705', fontWeight: 600, textDecoration: 'none' }}>
          ORDER NOW
        </motion.a>
      </div>
    </nav>
  );
}

// ─── HERO SECTION ───
function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [chars, setChars] = useState([]);
  const name = "NAIDU CAFÉ";

  useEffect(() => {
    setChars(name.split(''));
  }, []);

  const floatingItems = ['🍓', '🥭', '🍫', '🍊', '🍃', '🍇', '🍋', '🥝'];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0a0705' }}>
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(200,115,42,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(181,48,92,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '40%', right: '15%', width: '250px', height: '250px', background: 'radial-gradient(ellipse, rgba(15,168,126,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* Floating fruits */}
      {floatingItems.map((emoji, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.4, 0.7, 0.4], y: [0, -18, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: `${8 + i * 11}%`, top: `${20 + (i % 3) * 20}%`, fontSize: '28px', pointerEvents: 'none', filter: 'blur(0.5px)' }}>
          {emoji}
        </motion.div>
      ))}

      {/* Bubble particles */}
      <BubbleParticles count={12} color="rgba(200,115,42,0.15)" />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,115,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,115,42,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Main content */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl px-6">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="section-tag justify-center mb-6" style={{ justifyContent: 'center' }}>
          Premium Craft Beverages · India
        </motion.div>

        {/* Animated name reveal */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 12vw, 140px)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
          {chars.map((char, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ display: 'inline-block', transformOrigin: '50% 0%', background: i > 5 ? 'linear-gradient(135deg, #c8732a, #f59e0b)' : undefined, WebkitBackgroundClip: i > 5 ? 'text' : undefined, WebkitTextFillColor: i > 5 ? 'transparent' : undefined }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          style={{ fontSize: '18px', color: 'rgba(253,246,236,0.55)', fontWeight: 300, maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.7 }}>
          Handcrafted milkshakes, thickshakes, mocktails & fresh juices — every sip tells a story.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="flex gap-4 justify-center flex-wrap">
          <a href="#menu" className="cursor-none"
            style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #c8732a, #f59e0b)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: '#0a0705', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 40px rgba(200,115,42,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(200,115,42,0.6)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(200,115,42,0.35)'}>
            EXPLORE MENU ↓
          </a>
          <a href="#specials" className="cursor-none"
            style={{ padding: '16px 36px', border: '1px solid rgba(200,115,42,0.35)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: '#fdf6ec', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,115,42,0.05)' }}>
            TODAY'S SPECIALS ✦
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2" style={{ transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(253,246,236,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c8732a, transparent)' }} />
      </motion.div>
    </section>
  );
}

// ─── 3D DRINK SHOWCASE ───
function DrinkShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Cycle drinks on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const idx = Math.min(Math.floor(progress * SHOWCASE_DRINKS.length), SHOWCASE_DRINKS.length - 1);
      if (idx >= 0) setActiveIdx(idx);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const drink = SHOWCASE_DRINKS[activeIdx];

  return (
    <section ref={containerRef} id="showcase" className="relative" style={{ height: '300vh', background: '#06040a' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div className="absolute inset-0" animate={{ background: `radial-gradient(ellipse at center, ${drink.color} 0%, #06040a 70%)` }} transition={{ duration: 0.8 }} />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <Reveal>
            <div className="section-tag justify-center mb-6" style={{ justifyContent: 'center' }}>Signature Collection</div>
          </Reveal>
          
          {/* Drink orb */}
          <div className="relative inline-block mb-12">
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx}
                initial={{ opacity: 0, scale: 0.5, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -40 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                data-cursor="drink"
                style={{ width: '240px', height: '240px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px', position: 'relative', background: `radial-gradient(ellipse at 35% 35%, ${drink.accent}33, ${drink.color})`, border: `1px solid ${drink.accent}33`, boxShadow: `0 0 80px ${drink.accent}44, inset 0 0 40px rgba(0,0,0,0.4)` }}>
                {drink.emoji}
                {/* Liquid wave inside */}
                <div style={{ position: 'absolute', bottom: '20%', left: 0, right: 0, height: '40%', background: `${drink.accent}22`, borderRadius: '0 0 50% 50%', animation: 'wave 3s ease-in-out infinite' }} />
                {/* Reflection */}
                <div style={{ position: 'absolute', top: '15%', left: '20%', width: '30%', height: '25%', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', transform: 'rotate(-30deg)', filter: 'blur(4px)' }} />
              </motion.div>
            </AnimatePresence>
            {/* Orbit rings */}
            {[80, 140, 200].map((r, i) => (
              <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: `${r * 2 + 80}px`, height: `${r * 2 + 80}px`, transform: 'translate(-50%, -50%)', border: `1px solid ${drink.accent}${i === 0 ? '22' : '10'}`, borderRadius: '50%', animation: `spin-slow ${12 + i * 4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }} />
            ))}
          </div>

          {/* Drink info */}
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: drink.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>{drink.category}</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px' }}>{drink.name}</h2>
              <p style={{ color: 'rgba(253,246,236,0.5)', fontSize: '16px' }}>{drink.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Drink selector dots */}
          <div className="flex gap-3 justify-center mt-8">
            {SHOWCASE_DRINKS.map((d, i) => (
              <button key={i} onClick={() => setActiveIdx(i)} className="cursor-none"
                style={{ width: i === activeIdx ? '32px' : '8px', height: '8px', borderRadius: '4px', background: i === activeIdx ? drink.accent : 'rgba(253,246,236,0.2)', border: 'none', transition: 'all .3s', cursor: 'none' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TODAY'S SPECIALS ───
function SpecialsSection() {
  const [specials, setSpecials] = useState([]);
  useEffect(() => {
    fetch('/api/specials').then(r => r.json()).then(d => setSpecials(d));
  }, []);

  const colors = ['#c8732a', '#ec4899', '#3b82f6', '#f59e0b'];

  return (
    <section id="specials" style={{ background: '#0a0705', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-8">
        <Reveal><div className="section-tag mb-4">Limited Time</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '60px', lineHeight: 1 }}>Today's<br /><span className="text-gradient">Specials.</span></h2></Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((item, i) => (
            <Reveal key={item._id} delay={i * 0.1}>
              <div data-cursor="drink" className="glass-card relative overflow-hidden group"
                style={{ padding: '32px 24px', transition: 'transform .3s, border-color .3s', cursor: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = `${colors[i % colors.length]}44`; e.currentTarget.style.boxShadow = `0 20px 60px ${colors[i % colors.length]}20`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}>
                <BubbleParticles count={4} color={`${colors[i % colors.length]}33`} />
                <div style={{ fontSize: '52px', marginBottom: '16px', display: 'block' }}>{item.emoji || '🥤'}</div>
                <div style={{ display: 'inline-block', padding: '3px 10px', background: `${colors[i % colors.length]}22`, border: `1px solid ${colors[i % colors.length]}44`, borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: colors[i % colors.length], letterSpacing: '0.1em', marginBottom: '12px' }}>{item.badge}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>{item.name}</h3>
                <p style={{ color: 'rgba(253,246,236,0.5)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>{item.description}</p>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: colors[i % colors.length] }}>₹{item.price}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTERACTIVE MENU ───
function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Milkshakes');
  const [hoveredItem, setHoveredItem] = useState(null);
  const categories = ['Milkshakes', 'Thickshakes', 'Mocktails', 'Fresh Juices'];
  const catEmojis = { Milkshakes: '🍫', Thickshakes: '🥛', Mocktails: '🌊', 'Fresh Juices': '🥭' };

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(d => setMenuItems(d));
  }, []);

  const filtered = menuItems.filter(i => i.category === activeCategory);
  const displayItem = hoveredItem || filtered[0];

  return (
    <section id="menu" style={{ background: '#06040a', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-8">
        <Reveal><div className="section-tag mb-4">Full Menu</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '48px', lineHeight: 1 }}>Crafted<br /><span className="text-gradient">with love.</span></h2></Reveal>

        {/* Category tabs */}
        <Reveal delay={0.2}>
          <div className="flex gap-3 flex-wrap mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="cursor-none"
                style={{ padding: '10px 20px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', border: '1px solid', transition: 'all .3s', background: activeCategory === cat ? '#c8732a' : 'rgba(200,115,42,0.05)', borderColor: activeCategory === cat ? '#c8732a' : 'rgba(200,115,42,0.2)', color: activeCategory === cat ? '#0a0705' : '#fdf6ec', fontWeight: activeCategory === cat ? 600 : 400 }}>
                {catEmojis[cat]} {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu list */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-2">
                {filtered.map((item, i) => (
                  <motion.div key={item._id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    data-cursor="drink"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ padding: '20px 24px', borderRadius: '8px', border: '1px solid', transition: 'all .3s', cursor: 'none', borderColor: hoveredItem?._id === item._id ? 'rgba(200,115,42,0.4)' : 'rgba(253,246,236,0.06)', background: hoveredItem?._id === item._id ? 'rgba(200,115,42,0.05)' : 'rgba(253,246,236,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '28px' }}>{item.emoji || '🥤'}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>{item.name}</div>
                        <div style={{ color: 'rgba(253,246,236,0.4)', fontSize: '12px', marginTop: '2px' }}>{item.description?.slice(0, 50)}...</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#c8732a', whiteSpace: 'nowrap' }}>₹{item.price}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preview panel */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              {displayItem && (
                <motion.div key={displayItem._id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card text-center"
                  style={{ padding: '48px 40px', width: '100%', maxWidth: '360px' }}>
                  <div style={{ fontSize: '90px', marginBottom: '20px', filter: 'drop-shadow(0 0 30px rgba(200,115,42,0.4))' }}>{displayItem.emoji || '🥤'}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c8732a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>{displayItem.category}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>{displayItem.name}</h3>
                  <p style={{ color: 'rgba(253,246,236,0.5)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>{displayItem.description}</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700 }} className="text-gradient">₹{displayItem.price}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMBO OFFERS ───
function OffersSection() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    fetch('/api/offers').then(r => r.json()).then(d => setOffers(d.data || []));
  }, []);

  return (
    <section id="offers" style={{ background: '#0a0705', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-8">
        <Reveal><div className="section-tag mb-4">Best Value</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '60px', lineHeight: 1 }}>Combo<br /><span className="text-gradient">Deals.</span></h2></Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <Reveal key={offer._id} delay={i * 0.15}>
              <div data-cursor="drink" className="glass-card relative overflow-hidden group"
                style={{ padding: '36px 28px', cursor: 'none', transition: 'all .3s', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'; e.currentTarget.style.borderColor = 'rgba(200,115,42,0.3)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(200,115,42,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}>
                {/* Badge */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '5px 12px', background: 'linear-gradient(135deg, #c8732a, #f59e0b)', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#0a0705' }}>{offer.badge}</div>
                <BubbleParticles count={5} color="rgba(200,115,42,0.12)" />
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{offer.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '8px' }}>{offer.name}</h3>
                <p style={{ color: 'rgba(253,246,236,0.45)', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px' }}>{offer.description}</p>
                <div className="flex gap-2 flex-wrap mb-18" style={{ marginBottom: '20px' }}>
                  {(offer.drinks || []).map((d, di) => (
                    <span key={di} style={{ padding: '4px 10px', background: 'rgba(200,115,42,0.1)', border: '1px solid rgba(200,115,42,0.2)', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c8732a' }}>{d}</span>
                  ))}
                </div>
                <div className="flex items-baseline gap-3">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: '#c8732a' }}>₹{offer.offerPrice}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'rgba(253,246,236,0.3)', textDecoration: 'line-through' }}>₹{offer.originalPrice}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ───
function GallerySection() {
  const [lightbox, setLightbox] = useState(null);
  const drinks = [
    { emoji: '🍫', name: 'Chocolate Overload', color: '#3d1a08' },
    { emoji: '🍓', name: 'Strawberry Dream', color: '#3d0a1a' },
    { emoji: '🌊', name: 'Blue Lagoon', color: '#040d3d' },
    { emoji: '🥭', name: 'Mango Tango', color: '#3d2a08' },
    { emoji: '🍃', name: 'Mint Mojito', color: '#0a3d1a' },
    { emoji: '🍊', name: 'Orange Sunrise', color: '#3d1e08' },
    { emoji: '🥝', name: 'Kiwi Twist', color: '#1a3d08' },
    { emoji: '🍇', name: 'Berry Blast', color: '#1a0a3d' },
    { emoji: '🍋', name: 'Lemon Zest', color: '#3d3008' },
  ];
  return (
    <section id="gallery" style={{ background: '#06040a', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-8">
        <Reveal><div className="section-tag mb-4">Our Gallery</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '60px', lineHeight: 1 }}>Visual<br /><span className="text-gradient">Stories.</span></h2></Reveal>

        {/* Masonry grid */}
        <div style={{ columns: '3', columnGap: '16px' }} className="md:columns-3 columns-2">
          {drinks.map((d, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div data-cursor="drink"
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightbox(i)}
                style={{ breakInside: 'avoid', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', cursor: 'none', background: `radial-gradient(ellipse at center, ${d.color}, #06040a)`, height: `${140 + (i % 3) * 80}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(253,246,236,0.06)', fontSize: `${50 + (i % 3) * 20}px`, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background .3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'} />
                {d.emoji}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(253,246,236,0.7)', letterSpacing: '0.08em', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '3px' }}>{d.name}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}
              style={{ width: '320px', height: '320px', borderRadius: '50%', background: `radial-gradient(ellipse at center, ${drinks[lightbox].color}, #06040a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', border: '1px solid rgba(200,115,42,0.3)', boxShadow: '0 0 80px rgba(200,115,42,0.2)' }}>
              {drinks[lightbox].emoji}
            </motion.div>
            <div style={{ position: 'absolute', bottom: '20%', fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700 }}>{drinks[lightbox].name}</div>
            <button onClick={() => setLightbox(null)} className="cursor-none" style={{ position: 'absolute', top: '24px', right: '32px', background: 'none', border: 'none', color: '#fdf6ec', fontSize: '24px', cursor: 'none' }}>✕</button>
            <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + drinks.length) % drinks.length); }} className="cursor-none" style={{ position: 'absolute', left: '32px', background: 'rgba(200,115,42,0.1)', border: '1px solid rgba(200,115,42,0.3)', color: '#fdf6ec', padding: '12px 20px', borderRadius: '4px', cursor: 'none', fontSize: '18px' }}>←</button>
            <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % drinks.length); }} className="cursor-none" style={{ position: 'absolute', right: '32px', background: 'rgba(200,115,42,0.1)', border: '1px solid rgba(200,115,42,0.3)', color: '#fdf6ec', padding: '12px 20px', borderRadius: '4px', cursor: 'none', fontSize: '18px' }}>→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── AI RECOMMENDATION ───
function AIMoodSection() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const moods = [
    { label: 'Refreshing', emoji: '💧', color: '#3b82f6' },
    { label: 'Sweet', emoji: '🍯', color: '#f59e0b' },
    { label: 'Creamy', emoji: '🥛', color: '#c8732a' },
    { label: 'Energy Boost', emoji: '⚡', color: '#0fa87e' },
  ];

  async function handleMood(mood) {
    setSelectedMood(mood);
    setLoading(true);
    const res = await fetch('/api/recommend', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mood }) });
    const data = await res.json();
    setRecs(data.recommendations || []);
    setLoading(false);
  }

  return (
    <section id="recommend" style={{ background: '#0a0705', padding: '120px 0' }}>
      <div className="max-w-5xl mx-auto px-8 text-center">
        <Reveal><div className="section-tag mb-4 justify-center" style={{ justifyContent: 'center' }}>AI Powered</div></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '16px', lineHeight: 1 }}>What's your<br /><span className="text-gradient">mood today?</span></h2></Reveal>
        <Reveal delay={0.2}><p style={{ color: 'rgba(253,246,236,0.5)', marginBottom: '48px', fontSize: '16px', fontWeight: 300 }}>Let us recommend the perfect drink for your vibe.</p></Reveal>

        {/* Mood selector */}
        <Reveal delay={0.3}>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            {moods.map(m => (
              <motion.button key={m.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleMood(m.label)} className="cursor-none"
                style={{ padding: '20px 28px', borderRadius: '12px', border: '1px solid', background: selectedMood === m.label ? `${m.color}22` : 'rgba(253,246,236,0.02)', borderColor: selectedMood === m.label ? m.color : 'rgba(253,246,236,0.08)', transition: 'all .3s', cursor: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                <span style={{ fontSize: '32px' }}>{m.emoji}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: selectedMood === m.label ? m.color : 'rgba(253,246,236,0.6)', textTransform: 'uppercase' }}>{m.label}</span>
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Recommendations */}
        <AnimatePresence>
          {loading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#c8732a', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em' }}>Analyzing your mood...</motion.div>}
          {!loading && recs.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recs.map((rec, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="glass-card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>{rec.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{rec.name}</div>
                  <div style={{ color: 'rgba(253,246,236,0.4)', fontSize: '12px', fontStyle: 'italic' }}>{rec.reason}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── CONTACT ───
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    setSending(false);
    if (data.success) {
      toast.success('Message sent! We\'ll be in touch.');
      setForm({ name: '', email: '', message: '' });
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact" style={{ background: '#06040a', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal><div className="section-tag mb-4">Get In Touch</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '20px', lineHeight: 1 }}>Visit<br /><span className="text-gradient">Naidu Café.</span></h2></Reveal>
            <Reveal delay={0.2}><p style={{ color: 'rgba(253,246,236,0.5)', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', fontWeight: 300 }}>We'd love to have you. Come enjoy a handcrafted drink in a warm, welcoming atmosphere.</p></Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col gap-4">
                {[{ icon: '📞', label: 'Phone', value: '9949592477', href: 'tel:9949592477' },
                  { icon: '✉', label: 'Email', value: 'naidu@gmail.com', href: 'mailto:naidu@gmail.com' },
                  { icon: '📍', label: 'Location', value: 'India', href: '#' }
                ].map(c => (
                  <a key={c.label} href={c.href} className="cursor-none" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8732a'}
                    onMouseLeave={e => e.currentTarget.style.color = ''}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(200,115,42,0.08)', border: '1px solid rgba(200,115,42,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c8732a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>{c.label}</div>
                      <div style={{ fontSize: '15px', color: 'rgba(253,246,236,0.8)' }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Contact form */}
          <Reveal delay={0.3}>
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>Send a message</h3>
              {[{ id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' }
              ].map(f => (
                <div key={f.id}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c8732a', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                  <input type={f.type} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })} placeholder={f.placeholder} required
                    style={{ width: '100%', padding: '14px 16px', background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(253,246,236,0.08)', borderRadius: '6px', color: '#fdf6ec', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', transition: 'border-color .2s' }}
                    onFocus={e => e.target.style.borderColor = '#c8732a'} onBlur={e => e.target.style.borderColor = 'rgba(253,246,236,0.08)'} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#c8732a', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you'd like..." rows={4} required
                  style={{ width: '100%', padding: '14px 16px', background: 'rgba(253,246,236,0.03)', border: '1px solid rgba(253,246,236,0.08)', borderRadius: '6px', color: '#fdf6ec', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', resize: 'none', transition: 'border-color .2s' }}
                  onFocus={e => e.target.style.borderColor = '#c8732a'} onBlur={e => e.target.style.borderColor = 'rgba(253,246,236,0.08)'} />
              </div>
              <button type="submit" disabled={sending} className="cursor-none"
                style={{ padding: '16px', background: 'linear-gradient(135deg, #c8732a, #f59e0b)', borderRadius: '6px', border: 'none', color: '#0a0705', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', cursor: 'none', boxShadow: '0 0 30px rgba(200,115,42,0.3)', transition: 'box-shadow .2s', opacity: sending ? 0.7 : 1 }}>
                {sending ? 'SENDING...' : 'SEND MESSAGE →'}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Fake maps placeholder */}
        <Reveal delay={0.4}>
          <div style={{ marginTop: '60px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(200,115,42,0.15)', height: '280px', background: 'rgba(5,3,8,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,115,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,115,42,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="text-center relative z-10">
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📍</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Naidu Café</div>
              <div style={{ color: 'rgba(253,246,236,0.4)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em' }}>India · 9949592477</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FLOATING ORDER BUTTON ───
function FloatingOrder() {
  const [open, setOpen] = useState(false);
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch('/api/popular').then(r => r.json()).then(d => setPopular(d.data || []));
  }, []);
  return (
    <>
     <motion.button
  initial={{ scale: 0 }}
  animate={{
    boxShadow: [
      "0 8px 40px rgba(200,115,42,0.3)",
      "0 8px 60px rgba(200,115,42,0.6)",
      "0 8px 40px rgba(200,115,42,0.3)"
    ]
  }}
  transition={{ duration: 2, repeat: Infinity }}
  onClick={() => setOpen(true)}
  className="cursor-none"
  style={{ position: "fixed", bottom: "32px", right: "32px" }}
>
  ORDER A DRINK
</motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 800, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '100px 32px 100px 32px' }}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#0f0b08', border: '1px solid rgba(200,115,42,0.2)', borderRadius: '16px', padding: '28px', width: '320px', maxHeight: '60vh', overflowY: 'auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Quick Order</div>
              <div style={{ color: 'rgba(253,246,236,0.4)', fontSize: '12px', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>Popular picks today</div>
              <div className="flex flex-col gap-3">
                {popular.map(item => (
                  <div key={item._id} className="flex justify-between items-center"
                    style={{ padding: '14px', background: 'rgba(200,115,42,0.05)', border: '1px solid rgba(200,115,42,0.1)', borderRadius: '8px' }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: '24px' }}>{item.emoji || '🥤'}</span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(253,246,236,0.4)' }}>{item.category}</div>
                      </div>
                    </div>
                    <button onClick={() => toast.success(`${item.name} added to order!`)} className="cursor-none"
                      style={{ padding: '6px 14px', background: '#c8732a', border: 'none', borderRadius: '4px', color: '#0a0705', fontWeight: 700, fontSize: '12px', cursor: 'none' }}>
                      + ADD
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ background: '#0a0705', borderTop: '1px solid rgba(200,115,42,0.1)', padding: '40px 48px' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }} className="text-gradient">Naidu Café</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(253,246,236,0.35)', letterSpacing: '0.05em' }}>© 2024 Naidu Café · Crafted with love · India</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8732a' }}>9949592477</div>
      </div>
    </footer>
  );
}

// ─── WAVE DIVIDER ───
function WaveDivider({ from = '#0a0705', to = '#06040a' }) {
  return (
    <div style={{ background: from, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" style={{ display: 'block', width: '100%' }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={to} />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════
export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <WaveDivider from="#0a0705" to="#06040a" />
      <DrinkShowcase />
      <WaveDivider from="#06040a" to="#0a0705" />
      <SpecialsSection />
      <WaveDivider from="#0a0705" to="#06040a" />
      <MenuSection />
      <WaveDivider from="#06040a" to="#0a0705" />
      <OffersSection />
      <WaveDivider from="#0a0705" to="#06040a" />
      <GallerySection />
      <WaveDivider from="#06040a" to="#0a0705" />
      <AIMoodSection />
      <WaveDivider from="#0a0705" to="#06040a" />
      <ContactSection />
      <Footer />
      <FloatingOrder />
    </main>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
