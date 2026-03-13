// LoveLetterModal.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { LOVE_LETTER, HER_NAME } from '../data/relationshipData';
import confetti from 'canvas-confetti';

/* ════════════════════════════════════════════════════════
   ✨ FLOATING HEARTS — Background heart particles
   ════════════════════════════════════════════════════════ */
function FloatingHearts() {
  const hearts = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 14,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      opacity: 0.03 + Math.random() * 0.08,
      color: ['#f472b6', '#a855f7', '#ec4899', '#7c3aed'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
      {hearts.map((h) => (
        <motion.svg
          key={h.id}
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          className="absolute"
          style={{ left: `${h.x}%`, top: `${h.y}%`, opacity: h.opacity }}
          animate={{
            y: [0, -60, -120],
            x: [0, Math.random() * 30 - 15, Math.random() * 20 - 10],
            rotate: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            opacity: [0, h.opacity * 3, 0],
            scale: [0.3, 1, 0.5],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'easeOut',
          }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={h.color}
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🌟 SPARKLE FIELD — Twinkling star particles
   ════════════════════════════════════════════════════════ */
function SparkleField() {
  const sparkles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      color: ['#fbbf24', '#f472b6', '#00f0ff', '#a855f7', '#ffffff'][Math.floor(Math.random() * 5)],
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
      {sparkles.map((s) => (
        <motion.svg
          key={s.id}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
            fill={s.color}
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🔐 DECRYPTION ANIMATION — Matrix-style character scramble
   ════════════════════════════════════════════════════════ */
function DecryptionText({ text, isDecrypted, delay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const chars = '♥♡❤❥✦✧★☆♦◇⬥⬦▲△●○⊕⊗';
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!isDecrypted) {
      // Show scrambled text
      const scramble = () => {
        setDisplayText(
          text
            .split('')
            .map((c) => (c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
            .join('')
        );
        frameRef.current = requestAnimationFrame(scramble);
      };
      const timeout = setTimeout(() => {
        frameRef.current = requestAnimationFrame(scramble);
      }, delay);
      return () => {
        clearTimeout(timeout);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    } else {
      // Reveal character by character
      let i = 0;
      startTimeRef.current = Date.now();
      const reveal = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const charsToReveal = Math.floor(elapsed / 20);
        if (charsToReveal >= text.length) {
          setDisplayText(text);
          return;
        }
        setDisplayText(
          text
            .split('')
            .map((c, idx) => {
              if (idx <= charsToReveal) return c;
              if (c === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        frameRef.current = requestAnimationFrame(reveal);
      };
      const timeout = setTimeout(() => {
        frameRef.current = requestAnimationFrame(reveal);
      }, delay);
      return () => {
        clearTimeout(timeout);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }
  }, [isDecrypted, text, delay, chars]);

  return <span>{displayText || text.replace(/./g, '·')}</span>;
}

/* ════════════════════════════════════════════════════════
   🎵 SOUND WAVE — Decorative audio wave
   ════════════════════════════════════════════════════════ */
function SoundWave() {
  return (
    <div className="flex items-center justify-center gap-[2px] h-6 my-4">
      {Array.from({ length: 32 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            background: `linear-gradient(to top, #f472b6, #a855f7)`,
          }}
          animate={{
            height: [
              `${3 + Math.random() * 5}px`,
              `${10 + Math.random() * 14}px`,
              `${3 + Math.random() * 8}px`,
            ],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🌊 WAVE DIVIDER — Animated SVG wave separator
   ════════════════════════════════════════════════════════ */
function WaveDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="my-6 relative h-8 w-full overflow-hidden"
    >
      <svg viewBox="0 0 400 30" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#f472b6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,15 Q50,5 100,15 T200,15 T300,15 T400,15"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          animate={{
            d: [
              'M0,15 Q50,5 100,15 T200,15 T300,15 T400,15',
              'M0,15 Q50,25 100,15 T200,15 T300,15 T400,15',
              'M0,15 Q50,5 100,15 T200,15 T300,15 T400,15',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,15 Q50,25 100,15 T200,15 T300,15 T400,15"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          animate={{
            d: [
              'M0,15 Q50,25 100,15 T200,15 T300,15 T400,15',
              'M0,15 Q50,5 100,15 T200,15 T300,15 T400,15',
              'M0,15 Q50,25 100,15 T200,15 T300,15 T400,15',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Center sparkle */}
        <motion.circle
          cx="200" cy="15" r="2"
          fill="#fbbf24"
          animate={{
            opacity: [0.3, 1, 0.3],
            r: [1.5, 3, 1.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🔒 LOCK ANIMATION — Unlocking padlock
   ════════════════════════════════════════════════════════ */
function LockAnimation({ unlocked }) {
  return (
    <motion.div className="relative inline-flex items-center justify-center mb-6">
      {/* Pulse rings behind lock */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ border: `1px solid rgba(244, 114, 182, ${0.2 - i * 0.05})` }}
          animate={
            unlocked
              ? { width: [40, 80 + i * 30], height: [40, 80 + i * 30], opacity: [0.4, 0] }
              : { width: [50 + i * 15, 60 + i * 15], height: [50 + i * 15, 60 + i * 15], opacity: [0.2, 0.1] }
          }
          transition={{
            duration: unlocked ? 1.5 : 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}

      <motion.div
        animate={unlocked ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : { scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          {/* Lock body */}
          <motion.rect
            x="3" y="11" width="18" height="11" rx="2"
            stroke="#f472b6"
            strokeWidth="1.5"
            fill="rgba(244,114,182,0.1)"
            animate={unlocked ? { fill: 'rgba(74,222,128,0.15)', stroke: '#4ade80' } : {}}
          />
          {/* Lock shackle */}
          <motion.path
            d="M7 11V7a5 5 0 0 1 10 0v4"
            stroke="#f472b6"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={
              unlocked
                ? { d: 'M7 11V7a5 5 0 0 1 10 0v1', stroke: '#4ade80', y: -3 }
                : { y: [0, -1, 0] }
            }
            transition={unlocked ? { duration: 0.5 } : { duration: 2, repeat: Infinity }}
          />
          {/* Keyhole / heart */}
          <motion.path
            d="M12 18.35l-0.72-0.66C9.2 15.68 8 14.64 8 13.25 8 12.01 9.01 11 10.25 11c.7 0 1.36.33 1.75.85.39-.52 1.05-.85 1.75-.85C14.99 11 16 12.01 16 13.25c0 1.39-1.2 2.43-3.28 4.44L12 18.35z"
            fill="#f472b6"
            animate={unlocked ? { fill: '#4ade80', scale: 1.3 } : { scale: [1, 1.1, 1] }}
            transition={unlocked ? { duration: 0.3 } : { duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📜 SCROLL INDICATOR — Reading progress
   ════════════════════════════════════════════════════════ */
function ScrollProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        setProgress((scrollTop / maxScroll) * 100);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute top-0 right-0 bottom-0 w-1 z-20 rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <motion.div
        className="w-full rounded-full"
        style={{
          height: `${progress}%`,
          background: 'linear-gradient(to bottom, #f472b6, #a855f7, #00f0ff)',
          boxShadow: '0 0 8px rgba(244,114,182,0.5)',
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   💝 INTERACTIVE HEART BUTTON — Tap to burst hearts
   ════════════════════════════════════════════════════════ */
function HeartBurstButton() {
  const [bursts, setBursts] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const id = Date.now();
    setBursts((prev) => [...prev, { id, x, y }]);

    confetti({
      particleCount: 15,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#f472b6', '#a855f7', '#00f0ff', '#fbbf24'],
      gravity: 0.8,
      scalar: 0.8,
    });

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1000);
  }, []);

  return (
    <motion.div
      className="relative inline-flex items-center justify-center cursor-pointer my-4"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#burstHeartGrad)"
        />
        <defs>
          <linearGradient id="burstHeartGrad" x1="2" y1="3" x2="22" y2="21">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Burst particles */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div key={burst.id} className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.svg
                key={i}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                className="absolute"
                style={{
                  left: `${burst.x * 100}%`,
                  top: `${burst.y * 100}%`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 6) * Math.PI * 2) * 40,
                  y: Math.sin((i / 6) * Math.PI * 2) * 40,
                  scale: [0, 1, 0],
                  opacity: [1, 0.8, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={['#f472b6', '#a855f7', '#00f0ff', '#fbbf24', '#ec4899', '#7c3aed'][i]}
                />
              </motion.svg>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-5 text-[8px] terminal-text text-love-pink/50 whitespace-nowrap"
      >
        tap for love
      </motion.p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ✉ ENVELOPE ANIMATION — Opening envelope
   ════════════════════════════════════════════════════════ */
function EnvelopeAnimation({ onOpened }) {
  const [stage, setStage] = useState(0); // 0: sealed, 1: opening, 2: opened

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => {
      setStage(2);
      onOpened?.();
    }, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onOpened]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 150 }}
    >
      <div className="relative w-32 h-24 mb-6">
        {/* Envelope body */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(168,85,247,0.15))',
            border: '1px solid rgba(244,114,182,0.3)',
          }}
        >
          {/* Letter peeking out */}
          <motion.div
            className="absolute left-2 right-2 bottom-1 rounded-sm"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            animate={
              stage >= 1
                ? { top: [-2, -40], height: [20, 60] }
                : { top: 20, height: 20 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Letter lines */}
            <div className="p-2 space-y-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[2px] rounded-full"
                  style={{
                    width: `${70 - i * 15}%`,
                    background: `rgba(244,114,182,${0.3 - i * 0.08})`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={stage >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Envelope flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 origin-top"
          style={{
            background: 'linear-gradient(180deg, rgba(168,85,247,0.2), rgba(244,114,182,0.15))',
            borderTop: '1px solid rgba(168,85,247,0.3)',
            borderLeft: '1px solid rgba(168,85,247,0.15)',
            borderRight: '1px solid rgba(168,85,247,0.15)',
            borderRadius: '8px 8px 0 0',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          }}
          animate={
            stage >= 1
              ? { rotateX: 180, opacity: 0.5 }
              : { rotateX: 0 }
          }
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Seal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={stage >= 1 ? { scale: 0, rotate: 180, opacity: 0 } : { scale: [1, 1.1, 1] }}
          transition={stage >= 1 ? { duration: 0.4 } : { duration: 2, repeat: Infinity }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #f472b6, #a855f7)',
              boxShadow: '0 0 15px rgba(244,114,182,0.5)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Status text */}
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.p
            key="sealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[11px] terminal-text text-love-pink/60"
          >
            Opening sealed letter...
          </motion.p>
        )}
        {stage === 1 && (
          <motion.p
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[11px] terminal-text text-love-violet"
          >
            Unfolding with care...
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ⌨ TYPING INDICATOR — "Writing with love" animation
   ════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-2 mb-4"
    >
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(244,114,182,0.08)',
          border: '1px solid rgba(244,114,182,0.15)',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
        <span className="text-[9px] terminal-text text-love-pink/70 tracking-wider">
          written with love
        </span>
        <motion.span className="flex gap-0.5 ml-1">
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="w-1 h-1 rounded-full bg-love-pink/60"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: d * 0.12 }}
            />
          ))}
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📊 DECRYPTION PROGRESS — Hacking-style progress
   ════════════════════════════════════════════════════════ */
function DecryptionProgress({ progress }) {
  const hexValues = useMemo(() =>
    Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')
    ), []);

  const [currentHex, setCurrentHex] = useState(hexValues);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHex(
        Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')
        )
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-xs mx-auto mt-4"
    >
      {/* Hex stream */}
      <div className="flex items-center justify-center gap-1 mb-3 overflow-hidden">
        {currentHex.map((hex, i) => (
          <motion.span
            key={i}
            className="text-[8px] terminal-text"
            style={{
              color: i < Math.floor((progress / 100) * 8) ? '#4ade80' : 'rgba(168,85,247,0.4)',
            }}
          >
            {hex}
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          className="h-full rounded-full relative"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #f472b6, #a855f7, #00f0ff)',
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[8px] terminal-text text-slate-600">
          AES-256-LOVE
        </span>
        <span className="text-[8px] terminal-text text-love-cyan">
          {Math.round(progress)}%
        </span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📝 LETTER PARAGRAPH — Individual animated paragraph
   ════════════════════════════════════════════════════════ */
function LetterParagraph({ text, index, isRevealed }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={
        isRevealed
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 20, filter: 'blur(8px)' }
      }
      transition={{ delay: 0.3 + index * 0.2, duration: 0.7, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
        style={{
          background: 'linear-gradient(to bottom, #f472b6, #a855f7)',
        }}
        initial={{ scaleY: 0 }}
        animate={isHovered ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.p
        className="text-slate-300 text-sm md:text-base leading-[1.85] font-light pl-0 
                   group-hover:pl-4 transition-all duration-300 group-hover:text-slate-200"
        animate={isHovered ? { x: 0 } : { x: 0 }}
      >
        {isRevealed ? (
          <DecryptionText text={text} isDecrypted={isRevealed} delay={300 + index * 200} />
        ) : (
          text.replace(/./g, '·')
        )}
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   💌 MAIN LOVE LETTER MODAL
   ═══════════════════════════════════════════════════════════════ */
export default function LoveLetterModal({ isOpen, onClose, onReveal }) {
  const [stage, setStage] = useState('envelope'); // envelope, decrypting, revealed
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const scrollContainerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (isOpen) {
      setStage('envelope');
      setDecryptProgress(0);
      setRevealed(false);
    }
  }, [isOpen]);

  // Envelope → Decrypting transition
  const handleEnvelopeOpened = useCallback(() => {
    setStage('decrypting');
    // Animate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStage('revealed');
          setRevealed(true);
          onReveal?.();
          // Fire celebration
          confetti({
            particleCount: 60,
            spread: 80,
            origin: { x: 0.5, y: 0.4 },
            colors: ['#f472b6', '#a855f7', '#00f0ff', '#fbbf24', '#ec4899'],
          });
        }, 500);
      }
      setDecryptProgress(Math.min(progress, 100));
    }, 150);
  }, [onReveal]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // 3D tilt on mouse move
  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(y * -8);
      rotateY.set(x * 8);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
          style={{
            background: 'rgba(5, 5, 15, 0.9)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={onClose}
        >
          {/* Background ambient particles */}
          <div className="fixed inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#f472b6', '#a855f7', '#00f0ff'][i % 3],
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Main modal card */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 50, rotateX: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50, rotateX: -15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
            className="relative max-w-lg w-full max-h-[88vh] rounded-2xl overflow-hidden"
          >
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-1 rounded-2xl pointer-events-none z-0"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(244,114,182,0.15), 0 0 60px rgba(168,85,247,0.1)',
                  '0 0 50px rgba(244,114,182,0.25), 0 0 100px rgba(168,85,247,0.15)',
                  '0 0 30px rgba(244,114,182,0.15), 0 0 60px rgba(168,85,247,0.1)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Inner container */}
            <div
              ref={scrollContainerRef}
              className="relative overflow-y-auto max-h-[88vh] custom-scrollbar"
              style={{
                background:
                  'linear-gradient(145deg, rgba(15, 15, 40, 0.97), rgba(20, 10, 30, 0.97))',
                border: '1px solid rgba(244, 114, 182, 0.2)',
                borderRadius: '1rem',
              }}
            >
              {/* Scroll progress indicator */}
              {stage === 'revealed' && <ScrollProgress containerRef={scrollContainerRef} />}

              {/* Background effects */}
              <FloatingHearts />
              {stage === 'revealed' && <SparkleField />}

              {/* Top shimmer sweep */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(244,114,182,0.05), transparent)',
                }}
              />

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-love-pink/20 rounded-tl-lg pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-love-violet/20 rounded-tr-lg pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-love-violet/20 rounded-bl-lg pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-love-pink/20 rounded-br-lg pointer-events-none z-10" />

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                onClick={onClose}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center
                           group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{
                  background: 'rgba(244,114,182,0.15)',
                  borderColor: 'rgba(244,114,182,0.3)',
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-slate-400 group-hover:text-love-pink transition-colors"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Content area */}
              <div className="relative z-10 p-6 md:p-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                  </svg>
                  <span className="text-[10px] terminal-text text-slate-500 tracking-widest uppercase">
                    encrypted love letter
                  </span>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="h-px mb-6"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(244,114,182,0.3), rgba(168,85,247,0.3), transparent)',
                  }}
                />

                {/* Stage: Envelope */}
                <AnimatePresence mode="wait">
                  {stage === 'envelope' && (
                    <motion.div
                      key="envelope"
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <EnvelopeAnimation onOpened={handleEnvelopeOpened} />
                    </motion.div>
                  )}

                  {/* Stage: Decrypting */}
                  {stage === 'decrypting' && (
                    <motion.div
                      key="decrypting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <LockAnimation unlocked={decryptProgress >= 100} />

                      <motion.p
                        className="terminal-text text-sm text-love-pink mb-1"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Decrypting private message...
                      </motion.p>
                      <p className="terminal-text text-[10px] text-slate-500 mb-4 flex items-center justify-center gap-1.5">
                        Encryption: AES-256-LOVE
                        <span className="inline-flex items-center gap-0.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#4ade80">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="text-green-400/70">authorized</span>
                        </span>
                      </p>

                      <DecryptionProgress progress={decryptProgress} />

                      <SoundWave />

                      {/* Scanning text blocks */}
                      <div className="mt-4 space-y-2 max-w-xs mx-auto">
                        {LOVE_LETTER.paragraphs.slice(0, 3).map((p, i) => (
                          <motion.div
                            key={i}
                            className="text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: decryptProgress > i * 30 ? 1 : 0 }}
                          >
                            <div className="flex gap-1 flex-wrap">
                              {p.slice(0, 40).split('').map((char, j) => (
                                <motion.span
                                  key={j}
                                  className="text-[8px] terminal-text"
                                  style={{
                                    color:
                                      decryptProgress > i * 30 + (j / 40) * 30
                                        ? 'rgba(168,85,247,0.4)'
                                        : 'rgba(100,100,100,0.2)',
                                  }}
                                >
                                  {decryptProgress > i * 30 + (j / 40) * 30
                                    ? char
                                    : String.fromCharCode(
                                        0x2580 + Math.floor(Math.random() * 30)
                                      )}
                                </motion.span>
                              ))}
                              <span className="text-[8px] text-slate-600">...</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Stage: Revealed */}
                  {stage === 'revealed' && (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      {/* Typing indicator */}
                      <TypingIndicator />

                      {/* Greeting */}
                      <motion.h2
                        initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-2xl md:text-3xl font-light text-love-pink mb-2 text-glow-pink"
                      >
                        {LOVE_LETTER.greeting}
                      </motion.h2>

                      {/* "For her" subtitle */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] terminal-text text-slate-500 tracking-widest uppercase mb-6"
                      >
                        — a message from the heart, for{' '}
                        <span className="text-love-violet">{HER_NAME}</span>
                      </motion.p>

                      <WaveDivider />

                      {/* Letter body paragraphs */}
                      <div className="space-y-5">
                        {LOVE_LETTER.paragraphs.map((p, i) => (
                          <LetterParagraph
                            key={i}
                            text={p}
                            index={i}
                            isRevealed={revealed}
                          />
                        ))}
                      </div>

                      <WaveDivider />

                      {/* Interactive heart */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: 0.3 + LOVE_LETTER.paragraphs.length * 0.2 + 0.5,
                        }}
                        className="flex justify-center"
                      >
                        <HeartBurstButton />
                      </motion.div>

                      {/* Closing */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + LOVE_LETTER.paragraphs.length * 0.2 + 0.3,
                          duration: 0.6,
                        }}
                        className="mt-6 text-right"
                      >
                        <p className="text-slate-400 text-sm italic font-light">
                          {LOVE_LETTER.closing}
                        </p>
                        <motion.p
                          className="text-love-pink font-medium mt-1.5 text-glow-pink text-base"
                          animate={{
                            textShadow: [
                              '0 0 10px rgba(244,114,182,0.3)',
                              '0 0 20px rgba(244,114,182,0.5)',
                              '0 0 10px rgba(244,114,182,0.3)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {LOVE_LETTER.signature}
                        </motion.p>

                        {/* Signature heart */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay:
                              0.3 + LOVE_LETTER.paragraphs.length * 0.2 + 0.8,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          className="inline-flex mt-2"
                        >
                          <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              fill="url(#sigHeartGrad)"
                            />
                            <defs>
                              <linearGradient
                                id="sigHeartGrad"
                                x1="2"
                                y1="3"
                                x2="22"
                                y2="21"
                              >
                                <stop offset="0%" stopColor="#f472b6" />
                                <stop offset="100%" stopColor="#a855f7" />
                              </linearGradient>
                            </defs>
                          </motion.svg>
                        </motion.div>
                      </motion.div>

                      {/* Timestamp */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: 0.3 + LOVE_LETTER.paragraphs.length * 0.2 + 1,
                        }}
                        className="mt-6 pt-4 flex items-center justify-between"
                        style={{
                          borderTop: '1px solid rgba(244,114,182,0.1)',
                        }}
                      >
                        <span className="text-[8px] terminal-text text-slate-600 flex items-center gap-1.5">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                            />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          end-to-end encrypted
                        </span>
                        <span className="text-[8px] terminal-text text-slate-600">
                          sealed with ♥
                        </span>
                      </motion.div>

                      {/* Close button */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + LOVE_LETTER.paragraphs.length * 0.2 + 1.2,
                        }}
                        onClick={onClose}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-6 w-full py-3.5 rounded-xl text-sm text-white
                                   relative overflow-hidden group focus:outline-none"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(168,85,247,0.12))',
                          border: '1px solid rgba(244,114,182,0.2)',
                        }}
                      >
                        {/* Button shimmer */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 55%, transparent 60%)',
                          }}
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        />

                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              fill="#f472b6"
                            />
                          </svg>
                          Close with Love
                        </span>
                      </motion.button>

                      {/* ESC hint */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay:
                            0.3 + LOVE_LETTER.paragraphs.length * 0.2 + 1.5,
                        }}
                        className="mt-3 flex items-center justify-center gap-1.5"
                      >
                        <kbd
                          className="px-1.5 py-0.5 rounded text-[8px] terminal-text text-slate-600"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          ESC
                        </kbd>
                        <span className="text-[8px] terminal-text text-slate-600">
                          to close
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}