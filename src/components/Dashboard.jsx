// Dashboard.jsx
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls } from 'framer-motion';
import { HER_NAME, ANNIVERSARY_DATE, RELATIONSHIP_START } from '../data/relationshipData';
import { useCountdown, useElapsedTime } from '../hooks/useCountdown';
import confetti from 'canvas-confetti';
import TerminalPanel from './TerminalPanel';
import Footer from './Footer';

/* ════════════════════════════════════════════════════════
   ✨ PARTICLE FIELD — Floating luminous particles
   ════════════════════════════════════════════════════════ */
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      color: ['#f472b6', '#a855f7', '#00f0ff', '#7c3aed', '#ec4899'][Math.floor(Math.random() * 5)],
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -100, -200, -100, 0],
            x: [0, 30, -20, 40, 0],
            opacity: [0, 0.8, 0.4, 0.7, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   💫 SHOOTING STARS — Occasional diagonal streaks
   ════════════════════════════════════════════════════════ */
function ShootingStars() {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setStars(prev => [...prev, {
        id,
        startX: Math.random() * 60,
        startY: Math.random() * 40,
        angle: 25 + Math.random() * 20,
        length: 80 + Math.random() * 120,
      }]);
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== id));
      }, 1500);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: `${star.length}px`,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00f0ff, #a855f7, transparent)',
              transform: `rotate(${star.angle}deg)`,
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🌊 AURORA WAVE — Flowing gradient background
   ════════════════════════════════════════════════════════ */
function AuroraWaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute w-[200%] h-[50%]"
          style={{
            bottom: `${-20 + i * 10}%`,
            left: '-50%',
            background: `linear-gradient(${90 + i * 30}deg, 
              transparent 20%, 
              ${['rgba(244,114,182,0.1)', 'rgba(168,85,247,0.08)', 'rgba(0,240,255,0.06)'][i]} 40%, 
              ${['rgba(168,85,247,0.08)', 'rgba(0,240,255,0.06)', 'rgba(244,114,182,0.05)'][i]} 60%, 
              transparent 80%)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: [0, -30, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   💕 HEARTBEAT MONITOR — Animated ECG line
   ════════════════════════════════════════════════════════ */
function HeartbeatMonitor() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="relative w-full max-w-md mx-auto h-16 overflow-hidden"
    >
      <svg viewBox="0 0 400 60" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ecgGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#f472b6" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,30 L60,30 L70,30 L80,10 L90,50 L100,20 L110,40 L120,30 L200,30 L210,30 L220,10 L230,50 L240,20 L250,40 L260,30 L340,30 L350,30 L360,10 L370,50 L380,20 L390,40 L400,30"
          fill="none"
          stroke="url(#ecgGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Glowing scan line */}
        <motion.circle
          r="4"
          fill="#f472b6"
          filter="url(#ecgGlow)"
          animate={{
            cx: [0, 400],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <animate attributeName="cy" values="30;30;30;10;50;20;40;30;30;30;30;10;50;20;40;30;30;30;30;10;50;20;40;30" dur="3s" repeatCount="indefinite" />
        </motion.circle>
        <defs>
          <filter id="ecgGlow">
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
      </svg>
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <span className="text-[9px] terminal-text text-love-pink/50 tracking-[0.3em] uppercase">
          heartbeat synced
        </span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🎯 INTERACTIVE LOVE ORBIT — Mouse-following orbits
   ════════════════════════════════════════════════════════ */
function LoveOrbit() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  const orbits = [
    { size: 200, duration: 20, color: '#f472b6', dotSize: 6 },
    { size: 300, duration: 30, color: '#a855f7', dotSize: 5 },
    { size: 400, duration: 40, color: '#00f0ff', dotSize: 4 },
    { size: 500, duration: 50, color: '#7c3aed', dotSize: 3 },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ x: smoothX, y: smoothY }}
    >
      {orbits.map((orbit, i) => (
        <div key={i} className="absolute" style={{ width: orbit.size, height: orbit.size }}>
          {/* Orbit ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${orbit.color}15`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
          >
            {/* Orbiting dot */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: orbit.dotSize,
                height: orbit.dotSize,
                backgroundColor: orbit.color,
                boxShadow: `0 0 ${orbit.dotSize * 3}px ${orbit.color}`,
                top: -orbit.dotSize / 2,
                left: '50%',
                marginLeft: -orbit.dotSize / 2,
              }}
            />
            {/* Second dot on opposite side */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: orbit.dotSize * 0.7,
                height: orbit.dotSize * 0.7,
                backgroundColor: orbit.color,
                boxShadow: `0 0 ${orbit.dotSize * 2}px ${orbit.color}80`,
                bottom: -orbit.dotSize / 2,
                left: '50%',
                marginLeft: -orbit.dotSize / 2,
              }}
            />
          </motion.div>
        </div>
      ))}
      {/* Central pulsing core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          background: 'radial-gradient(circle, #f472b6, #a855f7)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          boxShadow: [
            '0 0 20px rgba(244,114,182,0.3)',
            '0 0 40px rgba(244,114,182,0.6)',
            '0 0 20px rgba(244,114,182,0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📊 LOVE METRICS PANEL — Animated stat cards
   ════════════════════════════════════════════════════════ */
function LoveMetrics({ elapsed }) {
  const totalDays = elapsed.years * 365 + elapsed.months * 30 + elapsed.days;
  const totalHours = totalDays * 24 + elapsed.hours;
  const metrics = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#f472b6" />
        </svg>
      ),
      label: 'Heartbeats Together',
      value: (totalHours * 4200).toLocaleString(),
      subtext: '~70 bpm × 2 hearts',
      color: '#f472b6',
      bg: 'rgba(244,114,182,0.06)',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      label: 'Moments Shared',
      value: (totalDays * 1440).toLocaleString(),
      subtext: 'Minutes of togetherness',
      color: '#a855f7',
      bg: 'rgba(168,85,247,0.06)',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      label: '"I Love You" Said',
      value: `${totalDays * 12}+`,
      subtext: 'At least 12 times a day 💕',
      color: '#00f0ff',
      bg: 'rgba(0,240,255,0.06)',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      label: 'Smiles Caused',
      value: '∞',
      subtext: 'Cannot compute — overflow',
      color: '#fbbf24',
      bg: 'rgba(251,191,36,0.06)',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 100 }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 },
          }}
          className="relative group cursor-default rounded-2xl p-5 overflow-hidden"
          style={{
            background: m.bg,
            border: `1px solid ${m.color}20`,
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Hover gradient sweep */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${m.color}10, transparent 70%)`,
            }}
          />
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-16 h-16 opacity-20"
            style={{
              background: `radial-gradient(circle at top right, ${m.color}30, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                whileHover={{ rotate: 20, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {m.icon}
              </motion.div>
              <span className="text-[10px] terminal-text text-slate-500 tracking-wider uppercase">
                {m.label}
              </span>
            </div>
            <motion.p
              className="text-2xl md:text-3xl font-bold terminal-text mb-1"
              style={{ color: m.color, textShadow: `0 0 20px ${m.color}40` }}
            >
              <AnimatedNumber value={m.value} />
            </motion.p>
            <p className="text-[10px] text-slate-500 terminal-text">{m.subtext}</p>
          </div>
          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedNumber({ value }) {
  return <span>{value}</span>;
}

/* ════════════════════════════════════════════════════════
   📜 LOVE TIMELINE — Key relationship milestones
   ════════════════════════════════════════════════════════ */
function LoveTimeline() {
  const milestones = [
    { date: 'Day 1', title: 'The Beginning', desc: 'When two souls found each other', icon: 'spark', color: '#f472b6' },
    { date: 'First Month', title: 'First "I Love You"', desc: 'Three words that changed everything', icon: 'heart', color: '#a855f7' },
    { date: 'Month 6', title: 'Half Year Together', desc: 'Six months of pure magic', icon: 'star', color: '#00f0ff' },
    { date: 'Year 1', title: 'First Anniversary', desc: 'One year down, forever to go', icon: 'cake', color: '#fbbf24' },
    { date: 'Year 1.5', title: 'Growing Stronger', desc: 'Every challenge made us closer', icon: 'shield', color: '#4ade80' },
    { date: 'Year 2', title: 'Two Years of Love', desc: 'Still falling deeper every day', icon: 'infinity', color: '#ec4899' },
  ];

  const iconMap = {
    spark: (
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" fill="currentColor" />
    ),
    heart: (
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
    ),
    star: (
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6L12 2z" fill="currentColor" />
    ),
    cake: (
      <>
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 7V4M8 7V5M16 7V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1" fill="currentColor" />
        <circle cx="8" cy="4" r="1" fill="currentColor" />
        <circle cx="16" cy="4" r="1" fill="currentColor" />
      </>
    ),
    shield: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    ),
    infinity: (
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    ),
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Central line */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.3), rgba(244,114,182,0.3), transparent)',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      {milestones.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.2, duration: 0.6, type: 'spring' }}
          className={`relative flex items-start gap-4 mb-8 ${
            i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } flex-row`}
        >
          {/* Timeline dot */}
          <motion.div
            className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full z-10"
            style={{
              backgroundColor: m.color,
              boxShadow: `0 0 12px ${m.color}80`,
              transform: 'translateX(-50%)',
            }}
            whileInView={{
              scale: [0, 1.5, 1],
            }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
          />

          {/* Content card */}
          <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              className="p-4 rounded-xl relative overflow-hidden group cursor-default"
              style={{
                background: `rgba(15, 15, 35, 0.6)`,
                border: `1px solid ${m.color}20`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 100%, ${m.color}10, transparent 60%)` }}
              />
              <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ color: m.color }}>
                  {iconMap[m.icon]}
                </svg>
                <span className="text-[10px] terminal-text tracking-wider uppercase" style={{ color: m.color }}>
                  {m.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{m.title}</h4>
              <p className="text-[11px] text-slate-400 terminal-text">{m.desc}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   💌 LOVE LETTER CARD — Expandable letter
   ════════════════════════════════════════════════════════ */
function LoveLetterCard() {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimationControls();

  const handleOpen = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      await controls.start({ rotateX: 180 });
    } else {
      await controls.start({ rotateX: 0 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        onClick={handleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(244,114,182,0.08), rgba(168,85,247,0.08))',
          border: '1px solid rgba(244,114,182,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Envelope flap
        <motion.div
          animate={controls}
          className="relative z-10"
          style={{ transformOrigin: 'top center', perspective: 800 }}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isOpen ? 0 : [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: isOpen ? 0 : Infinity, repeatDelay: 3 }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-sm font-bold text-love-pink">A Letter For You</h3>
                <p className="text-[10px] text-slate-500 terminal-text">
                  {isOpen ? 'Click to close' : 'Click to open this letter'}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
        </motion.div> */}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2">
                <motion.div
                  className="h-px w-full mb-4"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />
                {[
                  `Dear ${HER_NAME},`,
                  '',
                  "If love were code, you'd be the function that makes everything work — the one I can't compile without.",
                  '',
                  'Every morning I wake up and my first thought is you. Every night before I sleep, my last thought is you. And every moment in between? Still you.',
                  '',
                  "You make my bugs feel like features, my errors feel like lessons, and my life feel like the most beautiful program ever written.",
                  '',
                  'I love you more than all the stars in the sky, more than every line of code ever written, more than infinity itself (and yes, I know that\'s a lot).',
                  '',
                  'Forever yours,',
                  'Your Partner in Crime & Code 💕',
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className={`text-xs leading-relaxed ${
                      i === 0 ? 'text-love-pink font-bold mb-1' :
                      line === '' ? 'mb-2' :
                      i >= 9 ? 'text-love-violet font-medium italic' :
                      'text-slate-400'
                    } terminal-text`}
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🎵 MUSIC VISUALIZER — Fake audio bars
   ════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════
   🌸 FLOATING ACTION BUTTON — Quick love note
   ════════════════════════════════════════════════════════ */
function FloatingLoveButton() {
  const [showNote, setShowNote] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const notes = [
    "You're my favorite notification 💕",
    "You had me at 'Hello World' 🌍",
    "My love for you has no bugs 🐛❌",
    "You're the CSS to my HTML 🎨",
    "404: Life without you not found 💔→💕",
    "sudo apt-get install more-love 💕",
    "You complete my stack 🥞",
    "Compiling feelings... 100% love ❤️",
    `${HER_NAME} > everything else 💫`,
    "git commit -m 'loved you more today' 💕",
  ];

  const showRandomNote = () => {
    setNoteIndex(Math.floor(Math.random() * notes.length));
    setShowNote(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.9, y: 0.9 },
      colors: ['#f472b6', '#a855f7', '#00f0ff'],
    });
    setTimeout(() => setShowNote(false), 3000);
  };

  return (
    <>
      <motion.button
        onClick={showRandomNote}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center
                   shadow-2xl group"
        style={{
          background: 'linear-gradient(135deg, #f472b6, #a855f7)',
          boxShadow: '0 4px 30px rgba(244,114,182,0.4)',
        }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 4px 30px rgba(244,114,182,0.4)',
            '0 4px 50px rgba(244,114,182,0.7)',
            '0 4px 30px rgba(244,114,182,0.4)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.svg
          width="24" height="24" viewBox="0 0 24 24" fill="white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 max-w-xs p-4 rounded-xl"
            style={{
              background: 'rgba(15, 15, 35, 0.9)',
              border: '1px solid rgba(244,114,182,0.3)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <p className="text-sm text-love-pink terminal-text">{notes[noteIndex]}</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
              style={{ background: 'rgba(15, 15, 35, 0.9)', borderRight: '1px solid rgba(244,114,182,0.3)', borderBottom: '1px solid rgba(244,114,182,0.3)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ════════════════════════════════════════════════════════
   🔮 CONSTELLATION MAP — Interactive star map
   ════════════════════════════════════════════════════════ */
function ConstellationHeart() {
  const points = [
    { x: 50, y: 25 }, { x: 35, y: 15 }, { x: 20, y: 20 },
    { x: 15, y: 35 }, { x: 20, y: 50 }, { x: 30, y: 62 },
    { x: 50, y: 80 }, { x: 70, y: 62 }, { x: 80, y: 50 },
    { x: 85, y: 35 }, { x: 80, y: 20 }, { x: 65, y: 15 },
  ];

  const lines = points.map((p, i) => ({
    x1: p.x, y1: p.y,
    x2: points[(i + 1) % points.length].x,
    y2: points[(i + 1) % points.length].y,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative w-full max-w-xs mx-auto aspect-square"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connection lines */}
        {lines.map((l, i) => (
          <motion.line
            key={`line-${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(168,85,247,0.3)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
        ))}
        {/* Star points */}
        {points.map((p, i) => (
          <motion.g key={`star-${i}`}>
            <motion.circle
              cx={p.x} cy={p.y} r="1.2"
              fill="#a855f7"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.5, type: 'spring' }}
            />
            <motion.circle
              cx={p.x} cy={p.y} r="3"
              fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="0.3"
              animate={{
                r: [3, 5, 3],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            />
          </motion.g>
        ))}
        {/* Center label */}
        <motion.text
          x="50" y="50"
          textAnchor="middle"
          fill="rgba(244,114,182,0.6)"
          fontSize="4"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
        >
          our love
        </motion.text>
      </svg>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🎲 MOOD DISPLAY — Current mood widget
   ════════════════════════════════════════════════════════ */
function MoodWidget() {
  const moods = [
    { mood: 'In Love', icon: 'heart', color: '#f472b6', desc: 'Deeply & madly' },
    { mood: 'Missing You', icon: 'tear', color: '#a855f7', desc: 'Every second apart' },
    { mood: 'Happy', icon: 'star', color: '#fbbf24', desc: `Because you exist` },
    { mood: 'Grateful', icon: 'hands', color: '#4ade80', desc: `For having ${HER_NAME}` },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % moods.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [moods.length]);

  const moodIcons = {
    heart: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />,
    tear: <><circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></>,
    star: <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6L12 2z" fill="currentColor" />,
    hands: <><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none" /></>,
  };

  const m = moods[current];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
      style={{
        background: 'rgba(15, 15, 35, 0.6)',
        border: `1px solid ${m.color}25`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="text-[10px] terminal-text text-slate-500 uppercase tracking-wider">mood:</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ color: m.color }}>
            {moodIcons[m.icon]}
          </svg>
          <span className="text-xs font-bold terminal-text" style={{ color: m.color }}>{m.mood}</span>
          <span className="text-[10px] text-slate-500 terminal-text">— {m.desc}</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🔄 PROGRESS RING — Love level indicator
   ════════════════════════════════════════════════════════ */
function LoveProgressRing() {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
    >
      <svg width="160" height="160" viewBox="0 0 160 160">
        {/* Background ring */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="6" />
        {/* Progress ring */}
        <motion.circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * 0.01 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
          transform="rotate(-90 80 80)"
        />
        {/* Glowing dot at end */}
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold gradient-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          99%
        </motion.span>
        <span className="text-[9px] terminal-text text-slate-500 uppercase tracking-wider">love level</span>
      </div>
      <motion.p
        className="text-[10px] text-slate-500 terminal-text mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2 }}
      >
        (1% reserved for growth 💕)
      </motion.p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📊 SYSTEM STATUS BAR — Scrolling status info
   ════════════════════════════════════════════════════════ */
function SystemStatusBar() {
  const items = [
    '❤ LOVE_STATUS: INFINITE',
    `⚡ PARTNER: ${HER_NAME}`,
    '🔒 COMMITMENT: LOCKED_IN',
    '🌡 WARMTH: OVERFLOWING',
    '💎 LOYALTY: MAX_INT',
    '🌟 COMPATIBILITY: 100%',
    '🔋 ENERGY_FOR_YOU: UNLIMITED',
    '🛡 PROTECTION: ALWAYS_ON',
  ];

  return (
    <div className="w-full overflow-hidden py-3 relative"
      style={{
        background: 'rgba(15, 15, 35, 0.8)',
        borderTop: '1px solid rgba(168,85,247,0.15)',
        borderBottom: '1px solid rgba(168,85,247,0.15)',
      }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] terminal-text text-slate-500 tracking-wider">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   🚀 MAIN DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const countdown = useCountdown(ANNIVERSARY_DATE);
  const elapsed = useElapsedTime(RELATIONSHIP_START);
  const terminalRef = useRef(null);
  const [anniversaryReached, setAnniversaryReached] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const confettiFired = useRef(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fireCelebration = useCallback(() => {
    const duration = 8000;
    const end = Date.now() + duration;
    const colors = ['#f472b6', '#a855f7', '#00f0ff', '#7c3aed', '#ec4899', '#fbbf24'];
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 80, origin: { x: 0 }, colors, gravity: 0.6 });
      confetti({ particleCount: 6, angle: 120, spread: 80, origin: { x: 1 }, colors, gravity: 0.6 });
      confetti({ particleCount: 3, angle: 90, spread: 100, origin: { x: 0.5, y: 0 }, colors, gravity: 0.8 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  // Detect anniversary
  useEffect(() => {
    if (countdown.isPast && !confettiFired.current) {
      confettiFired.current = true;
      setAnniversaryReached(true);
      setShowSurprise(true);
      fireCelebration();
    }
  }, [countdown.isPast, fireCelebration]);

  return (
    <>
      {/* Global effects */}
      <ParticleField />
      <ShootingStars />
      <AuroraWaves />
      <FloatingLoveButton />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #f472b6, #a855f7, #00f0ff)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col relative z-10"
      >
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <LoveOrbit />

          {/* Main hero content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Version badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
                         border border-love-violet/20"
              style={{ background: 'rgba(168, 85, 247, 0.08)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs terminal-text text-love-violet tracking-widest uppercase">
                System Online — v2.0
              </span>
            </motion.div>

            {/* Title with typewriter effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-6xl md:text-8xl font-bold mb-3"
            >
              <motion.span
                className="gradient-text inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                LoveOS
              </motion.span>
              <motion.span
                className="text-slate-600 font-light ml-3 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                v2.0
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-slate-400 text-base md:text-lg mb-3 terminal-text"
            >
              A digital universe built with love — for{' '}
              <motion.span
                className="text-love-pink text-glow-pink font-medium inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {HER_NAME}
              </motion.span>
            </motion.p>

            {/* Heartbeat Monitor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <HeartbeatMonitor />
            </motion.div>

            {/* Mood Widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-8"
            >
              <MoodWidget />
            </motion.div>

            {/* ═══ ANNIVERSARY SURPRISE ═══ */}
            <AnimatePresence>
              {showSurprise && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                  className="mb-8 relative"
                >
                  {/* Glowing background pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        '0 0 30px rgba(244, 114, 182, 0.2), 0 0 60px rgba(168, 85, 247, 0.1)',
                        '0 0 50px rgba(244, 114, 182, 0.4), 0 0 100px rgba(168, 85, 247, 0.2)',
                        '0 0 30px rgba(244, 114, 182, 0.2), 0 0 60px rgba(168, 85, 247, 0.1)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Ring burst effect */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`ring-${i}`}
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ border: '2px solid rgba(244, 114, 182, 0.3)' }}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.3 + i * 0.15 }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: 'easeOut',
                      }}
                    />
                  ))}

                  <div
                    className="relative px-8 py-8 rounded-2xl text-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.08), rgba(168, 85, 247, 0.08), rgba(0, 240, 255, 0.05))',
                      border: '1px solid rgba(244, 114, 182, 0.25)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                    />

                    {/* Sparkle particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.svg
                        key={`sparkle-${i}`}
                        className="absolute pointer-events-none"
                        style={{
                          left: `${8 + i * 12}%`,
                          top: `${8 + (i % 4) * 22}%`,
                        }}
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0.4, 1, 0.4],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2.5 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.35,
                        }}
                      >
                        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
                          fill="rgba(251, 191, 36, 0.7)" />
                      </motion.svg>
                    ))}

                    {/* Celebration icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: [0, 1.3, 1], rotate: [-30, 10, 0] }}
                      transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                      className="mb-4 inline-flex items-center justify-center"
                    >
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                        <motion.circle cx="5" cy="4" r="1" fill="#f472b6"
                          animate={{ y: [0, 2, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                        <motion.circle cx="19" cy="3" r="0.8" fill="#00f0ff"
                          animate={{ y: [0, 3, 0], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }} />
                        <motion.rect x="15" y="5" width="1.5" height="1.5" rx="0.3" fill="#fbbf24" transform="rotate(30 15 5)"
                          animate={{ y: [0, 2, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.3, repeat: Infinity, delay: 0.8 }} />
                        <motion.circle cx="9" cy="2" r="0.7" fill="#a855f7"
                          animate={{ y: [0, 2, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }} />
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill="url(#heartGrad2)" />
                        <defs>
                          <linearGradient id="heartGrad2" x1="2" y1="3" x2="22" y2="21">
                            <stop offset="0%" stopColor="#f472b6" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#00f0ff" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-2xl md:text-3xl font-bold gradient-text mb-3"
                    >
                      Happy 2nd Anniversary!
                    </motion.h2>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="mx-auto mb-4 h-px w-48"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(244, 114, 182, 0.5), rgba(168, 85, 247, 0.5), transparent)' }}
                    />

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="text-love-pink text-sm md:text-base terminal-text mb-3"
                      style={{ textShadow: '0 0 15px rgba(244, 114, 182, 0.4)' }}
                    >
                      Two years of loving you, and I&apos;d do every second all over again.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                      className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto"
                    >
                      From our first &ldquo;I love you&rdquo; to this very moment — every laugh, every fight
                      we fixed together, every late night call, every hug that made the world disappear —
                      you are the most beautiful thing that ever happened to my life.
                      <br /><br />
                      <span className="text-love-violet font-medium">Here&apos;s to forever, {HER_NAME}.</span>
                    </motion.p>

                    {/* Music visualizer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="mt-4 mb-3"
                    >
                      <MusicVisualizer />
                      <span className="text-[9px] terminal-text text-slate-600 mt-1 block">
                        ♪ our love song playing...
                      </span>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      onClick={() => setShowSurprise(false)}
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs terminal-text
                                 text-slate-400 hover:text-love-cyan border border-white/10
                                 hover:border-love-cyan/30 hover:bg-love-cyan/5 transition-all"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      continue to LoveOS
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══ TIME TOGETHER COUNTER ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mb-6"
            >
              <p className="text-xs terminal-text text-slate-500 tracking-[0.3em] uppercase mb-4">
                Time Together
              </p>
              <div className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3">
                <TimeUnit value={elapsed.years} label="Years" color="#f472b6" delay={0.8} />
                <TimeSeparator />
                <TimeUnit value={elapsed.months} label="Months" color="#a855f7" delay={0.9} />
                <TimeSeparator />
                <TimeUnit value={elapsed.days} label="Days" color="#00f0ff" delay={1.0} />
                <TimeSeparator />
                <TimeUnit value={elapsed.hours} label="Hours" color="#7c3aed" delay={1.1} />
                <TimeSeparator />
                <TimeUnit value={elapsed.minutes} label="Mins" color="#6366f1" delay={1.2} />
                <TimeSeparator />
                <TimeUnit value={elapsed.seconds} label="Secs" color="#3b82f6" delay={1.3} />
              </div>
            </motion.div>

            {/* Anniversary countdown or celebration */}
            {!countdown.isPast ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mt-2"
                style={{
                  background: 'rgba(244, 114, 182, 0.06)',
                  border: '1px solid rgba(244, 114, 182, 0.15)',
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm inline-flex"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6L12 2z" fill="#fbbf24" />
                  </svg>
                </motion.span>
                <span className="text-xs terminal-text text-slate-400">
                  Anniversary in{' '}
                  <span className="text-love-pink font-bold">{countdown.days}d </span>
                  <span className="text-love-violet font-bold">{countdown.hours}h </span>
                  <span className="text-love-cyan font-bold">{countdown.minutes}m </span>
                  <span className="text-white font-bold">{countdown.seconds}s</span>
                </span>
              </motion.div>
            ) : anniversaryReached && !showSurprise ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mt-2 cursor-pointer"
                onClick={() => { setShowSurprise(true); fireCelebration(); }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1), rgba(168, 85, 247, 0.1))',
                  border: '1px solid rgba(244, 114, 182, 0.25)',
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm inline-flex"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6L12 2z" fill="#fbbf24" />
                  </svg>
                </motion.span>
                <span className="text-xs terminal-text text-love-pink font-bold">
                  It&apos;s our 2nd Anniversary! ✨
                </span>
                <motion.svg animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  width="14" height="14" viewBox="0 0 24 24" fill="#f472b6">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
              </motion.div>
            ) : null}

            {/* Status line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="mt-8 flex items-center justify-center gap-4 text-[10px] terminal-text text-slate-600 flex-wrap"
            >
              <span>PID: 1432</span>
              <span>•</span>
              <span>MEM: {elapsed.years * 365 + elapsed.months * 30 + elapsed.days} memories cached</span>
              <span>•</span>
              <span className="text-green-400/70 inline-flex items-center gap-1">
                <motion.svg
                  width="10" height="10" viewBox="0 0 24 24" fill="#4ade80"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
                heartbeat: stable
              </span>
            </motion.div>
          </div>

          {/* Scroll-down indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            onClick={() => terminalRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer
                       group z-10"
          >
            <span className="text-[10px] terminal-text text-slate-500 tracking-widest uppercase
                            group-hover:text-love-cyan transition-colors">
              explore more
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                className="text-slate-500 group-hover:text-love-cyan transition-colors"
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.button>
        </section>

        {/* ═══ SCROLLING STATUS BAR ═══ */}
        <SystemStatusBar />

        {/* ═══ LOVE METRICS SECTION ═══ */}
        <section className="px-4 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Love Analytics</h2>
            <p className="text-xs terminal-text text-slate-500 tracking-wider">
              Real-time relationship metrics — all systems nominal
            </p>
          </motion.div>
          <LoveMetrics elapsed={elapsed} />
        </section>

        {/* ═══ CONSTELLATION + PROGRESS SECTION ═══ */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h3 className="text-lg font-bold text-love-violet mb-2 terminal-text">Our Constellation</h3>
              <p className="text-[10px] text-slate-500 terminal-text mb-4 tracking-wider">
                A heart written in the stars — just for us
              </p>
              <ConstellationHeart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h3 className="text-lg font-bold text-love-pink mb-2 terminal-text">Love Level</h3>
              <p className="text-[10px] text-slate-500 terminal-text mb-4 tracking-wider">
                Current system love capacity
              </p>
              <LoveProgressRing />
            </motion.div>
          </div>
        </section>

        {/* ═══ LOVE LETTER SECTION ═══
        <section className="px-4 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">A Letter For You</h2>
            <p className="text-xs terminal-text text-slate-500 tracking-wider">
              encrypted with love — click to decrypt
            </p>
          </motion.div>
          <LoveLetterCard />
        </section> */}

        {/* ═══ TIMELINE SECTION ═══ */}
        <section className="px-4 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Our Timeline</h2>
            <p className="text-xs terminal-text text-slate-500 tracking-wider">
              git log --oneline --graph -- love-story
            </p>
          </motion.div>
          <LoveTimeline />
        </section>

        {/* ═══ TERMINAL SECTION ═══ */}
        <section ref={terminalRef} className="px-4 md:px-8 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Love Terminal</h2>
            <p className="text-xs terminal-text text-slate-500 tracking-wider">
              type &apos;help&apos; to explore our universe
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto w-full" style={{ minHeight: '70vh' }}>
            <TerminalPanel />
          </div>
        </section>

        <Footer />
      </motion.div>
    </>
  );
}

/* ─── Time Counter Unit ─── */
function TimeUnit({ value, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 150 }}
      whileHover={{
        scale: 1.1,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="flex flex-col items-center min-w-[56px] md:min-w-[72px] py-3 px-2 md:px-3 rounded-xl
                 relative overflow-hidden group cursor-default"
      style={{
        background: 'rgba(15, 15, 35, 0.6)',
        border: `1px solid ${color}22`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{
          boxShadow: `inset 0 0 30px ${color}15`,
          background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)`,
        }}
      />
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      />
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl md:text-3xl font-bold terminal-text relative z-10"
        style={{ color, textShadow: `0 0 20px ${color}60` }}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-[9px] md:text-[10px] text-slate-500 terminal-text uppercase tracking-wider mt-1 relative z-10">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Separator between time units ─── */
function TimeSeparator() {
  return (
    <motion.span
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="text-slate-600 text-lg font-light hidden sm:inline-block"
    >
      :
    </motion.span>
  );
}