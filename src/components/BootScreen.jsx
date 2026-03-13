// BootScreen.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { BOOT_MESSAGES, HER_NAME } from '../data/relationshipData';

/* ════════════════════════════════════════════════════════
   ✨ MATRIX RAIN — Digital rain effect
   ════════════════════════════════════════════════════════ */
function MatrixRain() {
  const columns = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i / 30) * 100,
      chars: Array.from({ length: 8 + Math.floor(Math.random() * 12) }, () =>
        String.fromCharCode(0x2600 + Math.floor(Math.random() * 100))
      ),
      speed: 3 + Math.random() * 7,
      delay: Math.random() * 5,
      opacity: 0.03 + Math.random() * 0.08,
      fontSize: 10 + Math.random() * 4,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 flex flex-col items-center"
          style={{
            left: `${col.x}%`,
            opacity: col.opacity,
            fontSize: col.fontSize,
          }}
          initial={{ y: '-100%' }}
          animate={{ y: '120vh' }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            delay: col.delay,
            ease: 'linear',
          }}
        >
          {col.chars.map((char, j) => (
            <span
              key={j}
              className="terminal-text leading-tight"
              style={{
                color: j === 0 ? '#00f0ff' : j < 3 ? '#a855f7' : '#f472b6',
                opacity: 1 - j * 0.08,
                textShadow: j === 0 ? '0 0 8px #00f0ff' : 'none',
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   💫 PARTICLE NEBULA — Floating cosmic particles
   ════════════════════════════════════════════════════════ */
function ParticleNebula() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      duration: 8 + Math.random() * 20,
      delay: Math.random() * 8,
      color: ['#f472b6', '#a855f7', '#00f0ff', '#7c3aed', '#ec4899', '#6366f1'][
        Math.floor(Math.random() * 6)
      ],
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
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
            boxShadow: `0 0 ${p.size * 6}px ${p.color}`,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * -80, Math.random() * -40, 0],
            opacity: [0, 0.9, 0.5, 0],
            scale: [0, 1.5, 0.8, 0],
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
   🌀 PULSE RINGS — Expanding concentric circles
   ════════════════════════════════════════════════════════ */
function PulseRings({ active }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            border: `1px solid rgba(168, 85, 247, ${0.15 - i * 0.025})`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{
            width: [0, 300 + i * 150],
            height: [0, 300 + i * 150],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🔮 DNA HELIX — Double helix side decoration
   ════════════════════════════════════════════════════════ */
function DNAHelix({ side }) {
  const dots = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      y: i * 5,
      offset: Math.sin(i * 0.8) * 15,
      size: 2 + Math.abs(Math.sin(i * 0.8)) * 3,
      color: i % 2 === 0 ? '#f472b6' : '#a855f7',
    })), []);

  return (
    <div
      className={`fixed top-0 bottom-0 ${side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} 
        flex flex-col items-center justify-center pointer-events-none z-0 opacity-20 hidden lg:flex`}
    >
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {dots.map((dot) => (
          <motion.div key={dot.id} className="relative" style={{ marginBottom: 4 }}>
            <motion.div
              className="absolute rounded-full"
              style={{
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
                boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
                left: side === 'left' ? dot.offset : -dot.offset,
              }}
              animate={{
                left: side === 'left'
                  ? [dot.offset, -dot.offset, dot.offset]
                  : [-dot.offset, dot.offset, -dot.offset],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: dot.id * 0.15,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: dot.size * 0.6,
                height: dot.size * 0.6,
                backgroundColor: dot.color === '#f472b6' ? '#a855f7' : '#00f0ff',
                boxShadow: `0 0 ${dot.size * 2}px ${dot.color === '#f472b6' ? '#a855f7' : '#00f0ff'}`,
                left: side === 'left' ? -dot.offset : dot.offset,
              }}
              animate={{
                left: side === 'left'
                  ? [-dot.offset, dot.offset, -dot.offset]
                  : [dot.offset, -dot.offset, dot.offset],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: dot.id * 0.15,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   📊 BOOT PROGRESS BAR — Animated loading bar
   ════════════════════════════════════════════════════════ */
function BootProgressBar({ progress, phase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-md mt-8"
    >
      {/* Phase text */}
      <div className="flex items-center justify-between mb-2">
        <motion.span
          key={phase}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] terminal-text text-slate-500 tracking-wider uppercase"
        >
          {phase}
        </motion.span>
        <span className="text-[10px] terminal-text text-love-cyan">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Bar container */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{
          background: 'rgba(15, 15, 35, 0.8)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
        }}
      >
        {/* Fill */}
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: 'linear-gradient(90deg, #f472b6, #a855f7, #00f0ff)',
            width: `${progress}%`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Glow at tip */}
        <motion.div
          className="absolute top-0 bottom-0 w-4 rounded-full"
          style={{
            left: `calc(${progress}% - 8px)`,
            background: 'radial-gradient(circle, rgba(0,240,255,0.8), transparent)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Sub-info */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[8px] terminal-text text-slate-600">
          PID: 0x{Math.floor(progress * 42).toString(16).toUpperCase().padStart(4, '0')}
        </span>
        <span className="text-[8px] terminal-text text-slate-600">
          MEM: {(progress * 0.84).toFixed(1)}MB / 84.0MB
        </span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   💕 HEART LOADER — Pulsing heart animation
   ════════════════════════════════════════════════════════ */
function HeartLoader({ isComplete }) {
  return (
    <motion.div
      className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        animate={
          isComplete
            ? { scale: [1, 1.4, 1], fill: '#4ade80' }
            : { scale: [1, 1.3, 1] }
        }
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={isComplete ? '#4ade80' : '#f472b6'}
        />
      </motion.svg>
      <div className="flex items-center gap-1.5">
        <span
          className={`text-[10px] terminal-text tracking-widest uppercase ${
            isComplete ? 'text-green-400' : 'text-love-pink'
          }`}
        >
          {isComplete ? 'SYSTEM READY' : 'BOOTING'}
        </span>
        {!isComplete && (
          <motion.span
            className="flex gap-0.5"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="w-1 h-1 rounded-full bg-love-pink"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: d * 0.15,
                }}
              />
            ))}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ⚡ SYSTEM STATS PANEL — Live boot statistics
   ════════════════════════════════════════════════════════ */
function SystemStats({ progress, isComplete }) {
  const [stats, setStats] = useState({
    cpu: 0,
    mem: 0,
    threads: 0,
    love: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.min(100, Math.floor(progress * 0.8 + Math.random() * 20)),
        mem: Math.min(100, Math.floor(progress * 0.6 + Math.random() * 15)),
        threads: Math.min(64, Math.floor(progress * 0.5 + Math.random() * 10)),
        love: Math.min(100, Math.floor(progress * 1.1)),
      });
    }, 300);
    return () => clearInterval(interval);
  }, [progress]);

  const bars = [
    { label: 'CPU', value: stats.cpu, color: '#00f0ff' },
    { label: 'MEM', value: stats.mem, color: '#a855f7' },
    { label: 'THR', value: stats.threads, color: '#fbbf24', max: 64 },
    {
      label: 'LOVE',
      value: stats.love,
      color: '#f472b6',
      special: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed top-8 right-4 md:right-8 z-10 hidden md:block"
    >
      <div
        className="p-3 rounded-xl space-y-2 min-w-[140px]"
        style={{
          background: 'rgba(15, 15, 35, 0.6)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isComplete ? '#4ade80' : '#f472b6' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[8px] terminal-text text-slate-500 uppercase tracking-wider">
            sys monitor
          </span>
        </div>

        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex items-center justify-between mb-0.5">
              <span
                className="text-[8px] terminal-text uppercase tracking-wider"
                style={{ color: bar.color }}
              >
                {bar.label}
              </span>
              <span className="text-[8px] terminal-text text-slate-500">
                {bar.value}
                {bar.max ? `/${bar.max}` : '%'}
              </span>
            </div>
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: bar.special
                    ? `linear-gradient(90deg, ${bar.color}, #a855f7)`
                    : bar.color,
                  width: `${bar.max ? (bar.value / bar.max) * 100 : bar.value}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🔑 BINARY STREAM — Side binary decoration
   ════════════════════════════════════════════════════════ */
function BinaryStream({ side }) {
  const [bits, setBits] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBits((prev) => {
        const newBits = [
          ...prev,
          {
            id: Date.now() + Math.random(),
            value: Math.random() > 0.5 ? '1' : '0',
            x: Math.random() * 30,
          },
        ];
        return newBits.slice(-15);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-0 bottom-0 ${
        side === 'left' ? 'left-2' : 'right-2'
      } w-8 pointer-events-none z-0 overflow-hidden opacity-10 hidden sm:block`}
    >
      <AnimatePresence>
        {bits.map((bit) => (
          <motion.span
            key={bit.id}
            className="absolute terminal-text text-love-cyan"
            style={{
              left: bit.x,
              fontSize: '9px',
            }}
            initial={{ top: '-5%', opacity: 0.8 }}
            animate={{ top: '105%', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'linear' }}
          >
            {bit.value}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🌟 BOOT COMPLETE CELEBRATION — Final reveal
   ════════════════════════════════════════════════════════ */
function BootCelebration({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center mt-10 relative"
    >
      {/* Success ring burst */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            border: '1px solid rgba(74, 222, 128, 0.3)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{
            width: [0, 120 + i * 60],
            height: [0, 120 + i * 60],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Checkmark icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-4 relative"
      >
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(168,85,247,0.15))',
            border: '2px solid rgba(74,222,128,0.4)',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(74,222,128,0.2)',
              '0 0 40px rgba(74,222,128,0.4)',
              '0 0 20px rgba(74,222,128,0.2)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.path
              d="M20 6L9 17l-5-5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Ready text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-green-400 text-sm terminal-text mb-1 tracking-wider"
      >
        ALL SYSTEMS OPERATIONAL
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-slate-500 text-[10px] terminal-text mb-6 tracking-widest uppercase"
      >
        Love kernel loaded successfully
      </motion.p>

      {/* Enter button */}
      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
        onClick={onComplete}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-10 py-4 rounded-2xl font-medium text-white
                   overflow-hidden group focus:outline-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(244,114,182,0.2))',
          border: '1px solid rgba(244,114,182,0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Button inner glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(168,85,247,0.15))',
          }}
        />
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
          }}
          animate={{ x: ['-200%', '200%'] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
        />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-love-pink/40 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-love-violet/40 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-love-violet/40 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-love-pink/40 rounded-br-2xl" />

        <span className="relative z-10 flex items-center gap-3">
          {/* Heart icon */}
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#btnHeartGrad)"
            />
            <defs>
              <linearGradient
                id="btnHeartGrad"
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
          <span className="text-sm tracking-wide">Enter LoveOS</span>
          {/* Arrow icon */}
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </span>
      </motion.button>

      {/* Keyboard hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 flex items-center gap-2"
      >
        <kbd
          className="px-2 py-0.5 rounded text-[9px] terminal-text text-slate-500"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Enter
        </kbd>
        <span className="text-[9px] terminal-text text-slate-600">
          or click to continue
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🖥 TERMINAL WINDOW FRAME — Boot terminal wrapper
   ════════════════════════════════════════════════════════ */
function TerminalFrame({ children, isComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      className="relative w-full max-w-2xl"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isComplete
            ? [
                '0 0 20px rgba(74,222,128,0.1), 0 0 40px rgba(74,222,128,0.05)',
                '0 0 30px rgba(74,222,128,0.2), 0 0 60px rgba(74,222,128,0.1)',
                '0 0 20px rgba(74,222,128,0.1), 0 0 40px rgba(74,222,128,0.05)',
              ]
            : [
                '0 0 20px rgba(168,85,247,0.1), 0 0 40px rgba(168,85,247,0.05)',
                '0 0 30px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.1)',
                '0 0 20px rgba(168,85,247,0.1), 0 0 40px rgba(168,85,247,0.05)',
              ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Terminal window */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 10, 25, 0.85)',
          border: `1px solid ${isComplete ? 'rgba(74,222,128,0.2)' : 'rgba(168,85,247,0.2)'}`,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background: 'rgba(15, 15, 35, 0.8)',
            borderBottom: `1px solid ${
              isComplete
                ? 'rgba(74,222,128,0.15)'
                : 'rgba(168,85,247,0.15)'
            }`,
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500/80"
              whileHover={{ scale: 1.3 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500/80"
              whileHover={{ scale: 1.3 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isComplete
                  ? 'rgba(74,222,128,0.8)'
                  : 'rgba(74,222,128,0.5)',
              }}
              whileHover={{ scale: 1.3 }}
              animate={
                isComplete ? { scale: [1, 1.2, 1] } : {}
              }
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Title */}
          <div className="flex items-center gap-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isComplete ? '#4ade80' : '#a855f7'}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span
              className={`text-[10px] terminal-text tracking-wider uppercase ${
                isComplete ? 'text-green-400/70' : 'text-slate-500'
              }`}
            >
              loveos-boot — {isComplete ? 'complete' : 'initializing'}
            </span>
          </div>

          {/* Right side indicator */}
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: isComplete ? '#4ade80' : '#f472b6',
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[8px] terminal-text text-slate-600">
              {isComplete ? 'READY' : 'BUSY'}
            </span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-5 md:p-6 min-h-[350px] max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🌊 CURSOR GLOW — Mouse follower effect
   ════════════════════════════════════════════════════════ */
function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        width: 300,
        height: 300,
        marginLeft: -150,
        marginTop: -150,
        background:
          'radial-gradient(circle, rgba(168,85,247,0.08), rgba(244,114,182,0.04), transparent 70%)',
        filter: 'blur(30px)',
      }}
    />
  );
}

/* ════════════════════════════════════════════════════════
   🚀 MAIN BOOT SCREEN
   ════════════════════════════════════════════════════════ */
export default function BootScreen({ onComplete }) {
  const { displayedLines, isComplete } = useTypewriter(BOOT_MESSAGES, 30, 400);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('Initializing love kernel...');
  const terminalEndRef = useRef(null);

  // Calculate progress based on displayed lines
  useEffect(() => {
    const totalLines = BOOT_MESSAGES.length;
    const currentProgress = (displayedLines.length / totalLines) * 100;
    setProgress(Math.min(currentProgress, isComplete ? 100 : currentProgress));

    // Update phase text
    if (currentProgress < 20) setPhase('Loading love modules...');
    else if (currentProgress < 40) setPhase('Initializing heart protocol...');
    else if (currentProgress < 60) setPhase('Syncing memories...');
    else if (currentProgress < 80) setPhase('Calibrating emotions...');
    else if (currentProgress < 95) setPhase('Final preparations...');
    else setPhase('Boot complete ♥');
  }, [displayedLines.length, isComplete]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedLines]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' && isComplete) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isComplete, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 md:px-6"
      style={{ background: '#0a0a14' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
    >
      {/* Background effects */}
      <MatrixRain />
      <ParticleNebula />
      <CursorGlow />
      <DNAHelix side="left" />
      <DNAHelix side="right" />
      <BinaryStream side="left" />
      <BinaryStream side="right" />
      <PulseRings active={!isComplete} />

      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Background glow blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.2), rgba(0, 240, 255, 0.1), transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(244, 114, 182, 0.25), transparent 70%)',
          filter: 'blur(80px)',
          top: '30%',
          right: '20%',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Heart loader at top */}
      <HeartLoader isComplete={isComplete} />

      {/* System stats panel (right side) */}
      <SystemStats progress={progress} isComplete={isComplete} />

      {/* Version badge (left side) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-8 left-4 md:left-8 z-10 hidden md:flex items-center gap-2"
      >
        <div
          className="px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(15, 15, 35, 0.6)',
            border: '1px solid rgba(168, 85, 247, 0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span className="text-[9px] terminal-text text-love-violet tracking-widest uppercase">
            LoveOS v2.0
          </span>
        </div>
      </motion.div>

      {/* Main terminal frame */}
      <TerminalFrame isComplete={isComplete}>
        {/* Boot lines */}
        {displayedLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`py-[3px] flex items-start gap-0 text-sm md:text-[13px] leading-relaxed ${
              line.includes('Perfect Match') || line.includes('Boot successful')
                ? 'text-green-400'
                : line.includes('Welcome')
                  ? 'text-love-cyan text-glow-cyan text-base md:text-lg mt-3'
                  : line.includes('ERROR') || line.includes('FAIL')
                    ? 'text-red-400'
                    : line.includes('WARNING')
                      ? 'text-yellow-400'
                      : 'text-slate-400'
            }`}
          >
            {line.includes('Welcome') ? (
              <motion.span
                className="font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {line}
              </motion.span>
            ) : line.includes('Perfect Match') ||
              line.includes('Boot successful') ? (
              <span className="flex items-center gap-2">
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <path d="M20 6L9 17l-5-5" />
                </motion.svg>
                {line}
              </span>
            ) : line ? (
              <>
                <span className="text-love-violet mr-2 select-none flex-shrink-0">
                  {'>'}
                </span>
                <span>{line}</span>
              </>
            ) : (
              <br />
            )}
          </motion.div>
        ))}

        {/* Blinking cursor */}
        {!isComplete && (
          <motion.span
            className="inline-block w-2 h-4 bg-love-cyan ml-4 mt-1 rounded-[1px]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}

        {/* Auto-scroll anchor */}
        <div ref={terminalEndRef} />
      </TerminalFrame>

      {/* Progress bar */}
      <BootProgressBar progress={progress} phase={phase} />

      {/* Boot celebration + enter button */}
      <AnimatePresence>
        {isComplete && <BootCelebration onComplete={onComplete} />}
      </AnimatePresence>

      {/* Bottom loading hint */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 flex flex-col items-center gap-2"
        >
          <motion.div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-love-violet/50"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
          <p className="text-[10px] text-slate-600 terminal-text tracking-widest uppercase">
            Preparing your universe
          </p>
        </motion.div>
      )}

      {/* Bottom gradient fade */}
      <div
        className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to top, #0a0a14, transparent)',
        }}
      />
    </motion.div>
  );
}