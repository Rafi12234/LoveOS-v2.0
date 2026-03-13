// MemoryCarousel.jsx
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MEMORY_IMAGES, MEMORY_CAPTIONS, HER_NAME } from '../data/relationshipData';
import confetti from 'canvas-confetti';

/* ════════════════════════════════════════════════════════
   ✨ AMBIENT PARTICLES — Floating luminous dots
   ════════════════════════════════════════════════════════ */
function AmbientParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 8 + Math.random() * 15,
      delay: Math.random() * 8,
      color: ['#f472b6', '#a855f7', '#00f0ff', '#7c3aed', '#fbbf24'][Math.floor(Math.random() * 5)],
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
            boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
          }}
          animate={{
            y: [0, -80, -160, -80, 0],
            x: [0, 20, -15, 25, 0],
            opacity: [0, 0.8, 0.4, 0.7, 0],
            scale: [0.5, 1.3, 0.8, 1.1, 0.5],
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
   🌌 STAR FIELD — Parallax twinkling background
   ════════════════════════════════════════════════════════ */
function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 2,
      twinkle: 1 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: s.twinkle,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   💫 SHOOTING STARS — Diagonal light streaks
   ════════════════════════════════════════════════════════ */
function ShootingStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setStars(prev => [...prev, {
        id,
        x: Math.random() * 70,
        y: Math.random() * 30,
        angle: 20 + Math.random() * 25,
        length: 60 + Math.random() * 100,
      }]);
      setTimeout(() => setStars(prev => prev.filter(s => s.id !== id)), 1200);
    }, 4000 + Math.random() * 3000);
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
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.length}px`,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00f0ff, #a855f7, transparent)',
              transform: `rotate(${star.angle}deg)`,
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🎞 FILM STRIP — Decorative side film perforations
   ════════════════════════════════════════════════════════ */
function FilmStrip({ side }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 0.15, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`fixed top-0 bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} 
        w-6 pointer-events-none z-0 hidden lg:flex flex-col items-center justify-center gap-3`}
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderRight: side === 'left' ? '1px solid rgba(255,255,255,0.05)' : 'none',
        borderLeft: side === 'right' ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-sm"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📊 MEMORY STATS — Animated statistics panel
   ════════════════════════════════════════════════════════ */
function MemoryStats({ currentIndex, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="fixed top-6 right-6 z-20 hidden md:block"
    >
      <div
        className="p-3 rounded-xl space-y-2 min-w-[130px]"
        style={{
          background: 'rgba(15, 15, 35, 0.7)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[8px] terminal-text text-slate-500 uppercase tracking-wider">
            vault status
          </span>
        </div>

        {[
          { label: 'INDEX', value: String(currentIndex + 1).padStart(3, '0'), color: '#00f0ff' },
          { label: 'TOTAL', value: String(total).padStart(3, '0'), color: '#a855f7' },
          { label: 'SECTOR', value: `0x${(currentIndex * 42).toString(16).toUpperCase().padStart(4, '0')}`, color: '#f472b6' },
          { label: 'LOVE', value: '∞', color: '#fbbf24' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-[8px] terminal-text uppercase tracking-wider" style={{ color: stat.color }}>
              {stat.label}
            </span>
            <motion.span
              key={stat.value}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] terminal-text text-slate-400"
            >
              {stat.value}
            </motion.span>
          </div>
        ))}

        {/* Mini progress */}
        <div className="pt-1">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${((currentIndex + 1) / total) * 100}%`,
                background: 'linear-gradient(90deg, #f472b6, #a855f7, #00f0ff)',
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🎹 MINI TERMINAL — Embedded command display
   ════════════════════════════════════════════════════════ */
function MiniTerminal({ currentIndex, total }) {
  const [lines, setLines] = useState([]);
  const termRef = useRef(null);

  useEffect(() => {
    const newLine = {
      id: Date.now(),
      text: `> loaded memory_${String(currentIndex + 1).padStart(3, '0')}.jpg [${((currentIndex + 1) / total * 100).toFixed(0)}%]`,
      type: 'success',
    };
    setLines(prev => [...prev.slice(-6), newLine]);
  }, [currentIndex, total]);

  useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 left-6 z-20 hidden lg:block"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          width: 280,
          background: 'rgba(10, 10, 25, 0.85)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-1.5"
          style={{
            background: 'rgba(15, 15, 35, 0.8)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
          }}
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[8px] terminal-text text-slate-500 tracking-wider uppercase ml-1">
            memory-vault-terminal
          </span>
        </div>

        {/* Terminal content */}
        <div ref={termRef} className="p-2 max-h-[120px] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[9px] terminal-text text-green-400/80 py-0.5 flex items-start gap-1"
              >
                <span className="text-love-violet flex-shrink-0">{'>'}</span>
                <span>{line.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.span
            className="inline-block w-1.5 h-3 bg-love-cyan/80 ml-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   💕 HEART TRAIL — Mouse-following heart particles
   ════════════════════════════════════════════════════════ */
function HeartTrail() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      if (Math.random() > 0.85) {
        const id = Date.now() + Math.random();
        setHearts(prev => [...prev.slice(-8), {
          id,
          x: e.clientX,
          y: e.clientY,
          size: 6 + Math.random() * 10,
          color: ['#f472b6', '#a855f7', '#00f0ff', '#fbbf24'][Math.floor(Math.random() * 4)],
        }]);
        setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 1500);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.svg
            key={h.id}
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            className="absolute"
            style={{ left: h.x - h.size / 2, top: h.y - h.size / 2 }}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: -40,
              x: (Math.random() - 0.5) * 30,
              rotate: Math.random() * 60 - 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={h.color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🖼 IMAGE VIEWER — Full-screen image preview
   ════════════════════════════════════════════════════════ */
function ImageViewer({ image, caption, index, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        initial={{ scale: 0.5, rotateY: 90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, rotateY: -90 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full"
      >
        {/* Outer glow frame */}
        <motion.div
          className="absolute -inset-2 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 30px rgba(168,85,247,0.2), 0 0 60px rgba(244,114,182,0.1)',
              '0 0 50px rgba(168,85,247,0.3), 0 0 100px rgba(244,114,182,0.15)',
              '0 0 30px rgba(168,85,247,0.2), 0 0 60px rgba(244,114,182,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Image */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(168,85,247,0.3)' }}>
          <img
            src={image}
            alt={`Memory ${index + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain bg-black/50"
          />
        </div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          <p className="text-white/90 text-sm md:text-base font-light italic">
            &ldquo;{caption}&rdquo;
          </p>
          <p className="text-love-cyan/50 text-[10px] terminal-text mt-2">
            memory_{String(index + 1).padStart(3, '0')}.jpg — click anywhere to close
          </p>
        </motion.div>

        {/* Close button */}
        <motion.button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          whileHover={{ scale: 1.15, background: 'rgba(244,114,182,0.2)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🎚 TIMELINE SCRUBBER — Visual timeline navigation
   ════════════════════════════════════════════════════════ */
function TimelineScrubber({ currentIndex, total, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="w-full max-w-xl mx-auto mt-4 px-4"
    >
      <div className="relative">
        {/* Track */}
        <div
          className="h-1 rounded-full relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${((currentIndex + 1) / total) * 100}%`,
              background: 'linear-gradient(90deg, #f472b6, #a855f7, #00f0ff)',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          />
        </div>

        {/* Milestone markers */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          {Array.from({ length: Math.min(total, 10) }).map((_, i) => {
            const pos = (i / (Math.min(total, 10) - 1)) * 100;
            const idx = Math.floor((i / (Math.min(total, 10) - 1)) * (total - 1));
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={i}
                className="relative pointer-events-auto"
                style={{ left: `${pos}%` }}
                onClick={() => onNavigate(idx)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full -mt-0.5"
                  style={{
                    backgroundColor: isActive ? '#00f0ff' : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? '0 0 10px rgba(0,240,255,0.5)' : 'none',
                  }}
                  animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {isActive && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-[8px] terminal-text text-love-cyan px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}>
                      #{currentIndex + 1}
                    </span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[8px] terminal-text text-slate-600">memory_001</span>
        <span className="text-[8px] terminal-text text-slate-600">memory_{String(total).padStart(3, '0')}</span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🎴 3D CARD — Individual carousel card component
   ════════════════════════════════════════════════════════ */
function CarouselCard({ image, caption, index, offset, onClick, onDoubleClick, isCenter }) {
  const absOffset = Math.abs(offset);

  const cardVariants = {
    enter: (offset) => ({
      x: offset > 0 ? 300 : -300,
      opacity: 0,
      rotateY: offset > 0 ? -45 : 45,
      scale: 0.6,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 cursor-pointer"
      style={{
        width: isCenter ? '300px' : '260px',
        height: isCenter ? '400px' : '340px',
        marginLeft: isCenter ? '-150px' : '-130px',
        marginTop: isCenter ? '-200px' : '-170px',
        zIndex: 10 - absOffset,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        x: offset * (window.innerWidth > 768 ? 240 : 160),
        z: -absOffset * 200,
        rotateY: offset * -12,
        scale: 1 - absOffset * 0.18,
        opacity: Math.max(1 - absOffset * 0.35, 0.15),
        filter: `blur(${absOffset * 2.5}px)`,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 30,
        mass: 0.8,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      whileHover={isCenter ? {
        scale: 1.06,
        y: -8,
        transition: { duration: 0.25 },
      } : {}}
      whileTap={isCenter ? { scale: 0.98 } : {}}
    >
      {/* Card container */}
      <div className="w-full h-full rounded-2xl overflow-hidden relative group">
        {/* Outer glow for center card */}
        {isCenter && (
          <motion.div
            className="absolute -inset-1 rounded-2xl pointer-events-none z-0"
            animate={{
              boxShadow: [
                '0 0 25px rgba(168, 85, 247, 0.25), 0 15px 50px rgba(0, 0, 0, 0.5)',
                '0 0 40px rgba(168, 85, 247, 0.35), 0 15px 60px rgba(0, 0, 0, 0.5)',
                '0 0 25px rgba(168, 85, 247, 0.25), 0 15px 50px rgba(0, 0, 0, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Card border */}
        <div
          className="w-full h-full rounded-2xl overflow-hidden relative"
          style={{
            border: isCenter
              ? '2px solid rgba(168, 85, 247, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Image */}
          <img
            src={image}
            alt={`Memory ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            draggable={false}
          />

          {/* Gradient overlays */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isCenter
                ? 'linear-gradient(to top, rgba(10, 10, 20, 0.7) 0%, rgba(10, 10, 20, 0.1) 40%, transparent 60%)'
                : 'linear-gradient(to top, rgba(10, 10, 20, 0.8) 0%, rgba(10, 10, 20, 0.4) 100%)',
            }}
          />

          {/* Top reflection */}
          {isCenter && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
              }}
            />
          )}

          {/* Shimmer sweep on hover (center card) */}
          {isCenter && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 55%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
          )}

          {/* Memory index badge */}
          {isCenter && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="absolute top-3 left-3 z-10"
            >
              <div
                className="px-2 py-1 rounded-lg flex items-center gap-1.5"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[8px] terminal-text text-love-violet tracking-wider">
                  #{String(index + 1).padStart(3, '0')}
                </span>
              </div>
            </motion.div>
          )}

          {/* Favorite heart button */}
          {isCenter && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(244,114,182,0.3)',
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                confetti({
                  particleCount: 20,
                  spread: 40,
                  origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                  colors: ['#f472b6', '#a855f7', '#00f0ff'],
                  gravity: 0.8,
                  scalar: 0.7,
                });
              }}
            >
              <motion.svg
                width="12" height="12" viewBox="0 0 24 24"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#f472b6"
                />
              </motion.svg>
            </motion.button>
          )}

          {/* Caption area (center card only) */}
          {isCenter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-4 z-10"
              style={{
                background: 'linear-gradient(to top, rgba(5,5,15,0.95) 0%, rgba(5,5,15,0.6) 60%, transparent 100%)',
              }}
            >
              <p className="text-white/90 text-xs md:text-sm font-light leading-relaxed mb-1.5 italic"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                &ldquo;{caption}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="text-love-cyan/50 text-[9px] terminal-text flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  memory_{String(index + 1).padStart(3, '0')}.jpg
                </p>
                <motion.span
                  className="text-[8px] terminal-text text-love-pink/40 flex items-center gap-0.5"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#f472b6" opacity="0.5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  cherished
                </motion.span>
              </div>

              {/* Double-click hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="text-[7px] terminal-text text-slate-600 mt-1.5 text-center"
              >
                double-click to expand
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Reflection (center card only) */}
      {isCenter && (
        <motion.div
          className="w-full h-16 mt-1 rounded-b-2xl overflow-hidden opacity-20"
          style={{
            background: `linear-gradient(to bottom, rgba(168,85,247,0.1), transparent)`,
            transform: 'scaleY(-1)',
            filter: 'blur(4px)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
          }}
        >
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover object-bottom"
            draggable={false}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ⏯ PLAYBACK CONTROLS — Auto-play toggle + speed
   ════════════════════════════════════════════════════════ */
function PlaybackControls({ isPlaying, onToggle, speed, onSpeedChange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="flex items-center gap-3"
    >
      {/* Speed indicator */}
      <motion.button
        onClick={onSpeedChange}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-2 py-1 rounded-lg text-[9px] terminal-text transition-all"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: speed <= 2000 ? '#00f0ff' : speed <= 4000 ? '#a855f7' : '#f472b6',
        }}
      >
        {speed <= 2000 ? '2x' : speed <= 4000 ? '1x' : '0.5x'}
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(244,114,182,0.2))'
            : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isPlaying ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.1)'}`,
        }}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🔄 SWIPE HANDLER — Touch swipe detection
   ════════════════════════════════════════════════════════ */
function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) onSwipeLeft();
      else onSwipeRight();
    }
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

/* ═══════════════════════════════════════════════════════════════
   🚀 MAIN MEMORY CAROUSEL
   ═══════════════════════════════════════════════════════════════ */
export default function MemoryCarousel({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(4000);
  const [viewerImage, setViewerImage] = useState(null);
  const total = MEMORY_IMAGES.length;

  const navigate = useCallback((dir) => {
    setCurrentIndex((prev) => (prev + dir + total) % total);
  }, [total]);

  const goTo = useCallback((idx) => {
    setCurrentIndex(idx);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (viewerImage !== null) {
        if (e.key === 'Escape') setViewerImage(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'd') navigate(1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'a') navigate(-1);
      else if (e.key === 'Escape') onClose?.();
      else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, onClose, viewerImage]);

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => navigate(1), speed);
    return () => clearInterval(timer);
  }, [navigate, isPlaying, speed]);

  // Speed cycle
  const cycleSpeed = useCallback(() => {
    setSpeed(prev => {
      if (prev === 4000) return 2000;
      if (prev === 2000) return 6000;
      return 4000;
    });
  }, []);

  // Swipe handling
  const swipeHandlers = useSwipe(
    () => navigate(1),
    () => navigate(-1)
  );

  // Get visible cards (5 cards: -2, -1, 0, 1, 2)
  const getVisibleCards = () => {
    const cards = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (currentIndex + offset + total) % total;
      cards.push({ idx, offset });
    }
    return cards;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15, 15, 40, 0.97), rgba(5, 5, 15, 0.99))',
          backdropFilter: 'blur(12px)',
        }}
        {...swipeHandlers}
      >
        {/* Background effects */}
        <StarField />
        <AmbientParticles />
        <ShootingStars />
        <HeartTrail />
        <FilmStrip side="left" />
        <FilmStrip side="right" />

        {/* Stats panel */}
        <MemoryStats currentIndex={currentIndex} total={total} />

        {/* Mini terminal */}
        <MiniTerminal currentIndex={currentIndex} total={total} />

        {/* ═══ HEADER ═══ */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="text-center mb-4 md:mb-6 relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
            }}
          >
            <motion.svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="#a855f7" stroke="none" />
            </motion.svg>
            <span className="text-[9px] terminal-text text-love-violet tracking-widest uppercase">
              Memory Vault — Active
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-bold mb-1">
            <span className="gradient-text">Our Memories</span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm terminal-text flex items-center justify-center gap-2">
            <span>{currentIndex + 1}</span>
            <span className="text-love-violet">/</span>
            <span>{total}</span>
            <span className="text-slate-600 mx-1">•</span>
            <span className="text-love-pink/50 flex items-center gap-1">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#f472b6" opacity="0.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              for {HER_NAME}
            </span>
          </p>
        </motion.div>

        {/* ═══ 3D CAROUSEL ═══ */}
        <div
          className="relative w-full flex items-center justify-center z-10"
          style={{ perspective: '1400px', height: '420px' }}
        >
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <AnimatePresence mode="sync">
              {getVisibleCards().map(({ idx, offset }) => (
                <CarouselCard
                  key={`card-${idx}`}
                  image={MEMORY_IMAGES[idx]}
                  caption={MEMORY_CAPTIONS[idx % MEMORY_CAPTIONS.length]}
                  index={idx}
                  offset={offset}
                  isCenter={offset === 0}
                  onClick={() => {
                    if (offset > 0) navigate(1);
                    else if (offset < 0) navigate(-1);
                  }}
                  onDoubleClick={() => {
                    if (offset === 0) setViewerImage(idx);
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ═══ TIMELINE SCRUBBER ═══ */}
        <TimelineScrubber
          currentIndex={currentIndex}
          total={total}
          onNavigate={goTo}
        />

        {/* ═══ NAVIGATION CONTROLS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 md:gap-6 mt-4 z-10"
        >
          {/* Previous button */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.15, x: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full flex items-center justify-center
                       text-white/70 hover:text-love-cyan transition-all relative group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)' }}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>

          {/* Playback controls */}
          <PlaybackControls
            isPlaying={isPlaying}
            onToggle={() => setIsPlaying(p => !p)}
            speed={speed}
            onSpeedChange={cycleSpeed}
          />

          {/* Next button */}
          <motion.button
            onClick={() => navigate(1)}
            whileHover={{ scale: 1.15, x: 3 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full flex items-center justify-center
                       text-white/70 hover:text-love-cyan transition-all relative group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)' }}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </motion.div>

        {/* ═══ BOTTOM BAR ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex flex-col items-center gap-2 z-10"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-xl text-xs terminal-text relative overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, rgba(244,114,182,0.08), rgba(168,85,247,0.08))',
                border: '1px solid rgba(244,114,182,0.2)',
                borderRadius: '0.75rem',
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              close vault
              <kbd className="px-1 py-0.5 rounded text-[7px] ml-1"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                ESC
              </kbd>
            </span>
          </motion.button>

          {/* Keyboard hints */}
          <div className="flex items-center gap-3 text-[8px] terminal-text text-slate-600">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                ←→
              </kbd>
              navigate
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                SPACE
              </kbd>
              play/pause
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                2×click
              </kbd>
              expand
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ═══ FULL IMAGE VIEWER ═══ */}
      <AnimatePresence>
        {viewerImage !== null && (
          <ImageViewer
            image={MEMORY_IMAGES[viewerImage]}
            caption={MEMORY_CAPTIONS[viewerImage % MEMORY_CAPTIONS.length]}
            index={viewerImage}
            onClose={() => setViewerImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}