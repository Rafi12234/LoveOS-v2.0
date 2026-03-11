import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HER_NAME, ANNIVERSARY_DATE, RELATIONSHIP_START } from '../data/relationshipData';
import { useCountdown, useElapsedTime } from '../hooks/useCountdown';
import TerminalPanel from './TerminalPanel';
import Footer from './Footer';

export default function Dashboard() {
  const countdown = useCountdown(ANNIVERSARY_DATE);
  const elapsed = useElapsedTime(RELATIONSHIP_START);
  const terminalRef = useRef(null);

  // Scroll to top on mount / refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col relative z-10"
    >
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated radial rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${(i + 1) * 220}px`,
                height: `${(i + 1) * 220}px`,
                border: `1px solid rgba(168, 85, 247, ${0.08 - i * 0.015})`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 40 + i * 15, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-love-pink/20 pointer-events-none select-none"
            style={{
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontSize: `${14 + (i % 4) * 6}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.35, 0.15],
              rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            ♥
          </motion.div>
        ))}

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

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-3"
          >
            <span className="gradient-text">LoveOS</span>
            <span className="text-slate-600 font-light ml-2">v2.0</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-400 text-base md:text-lg mb-3 terminal-text"
          >
            A digital universe built with love — for{' '}
            <span className="text-love-pink text-glow-pink font-medium">{HER_NAME}</span>
          </motion.p>

          {/* Pulsing heart divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block text-2xl"
            >
              💖
            </motion.span>
          </motion.div>

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

          {/* Anniversary countdown (if upcoming) */}
          {!countdown.isPast && (
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
                className="text-sm"
              >
                🎉
              </motion.span>
              <span className="text-xs terminal-text text-slate-400">
                Anniversary in{' '}
                <span className="text-love-pink font-bold">{countdown.days}d </span>
                <span className="text-love-violet font-bold">{countdown.hours}h </span>
                <span className="text-love-cyan font-bold">{countdown.minutes}m </span>
                <span className="text-white font-bold">{countdown.seconds}s</span>
              </span>
            </motion.div>
          )}

          {/* Status line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-4 text-[10px] terminal-text text-slate-600"
          >
            <span>PID: 1432</span>
            <span>•</span>
            <span>MEM: {elapsed.years * 365 + elapsed.months * 30 + elapsed.days} memories cached</span>
            <span>•</span>
            <span className="text-green-400/70">♥ heartbeat: stable</span>
          </motion.div>
        </div>

        {/* Scroll-down indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          onClick={() => terminalRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer
                     group z-10"
        >
          <span className="text-[10px] terminal-text text-slate-500 tracking-widest uppercase
                          group-hover:text-love-cyan transition-colors">
            open terminal
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

      {/* ═══ TERMINAL SECTION ═══ */}
      <section ref={terminalRef} className="px-4 md:px-8 py-10">
        <div className="max-w-5xl mx-auto w-full" style={{ minHeight: '70vh' }}>
          <TerminalPanel />
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}

/* ─── Time Counter Unit ─── */
function TimeUnit({ value, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 150 }}
      className="flex flex-col items-center min-w-[56px] md:min-w-[72px] py-3 px-2 md:px-3 rounded-xl
                 relative overflow-hidden group"
      style={{
        background: 'rgba(15, 15, 35, 0.6)',
        border: `1px solid ${color}22`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ boxShadow: `inset 0 0 30px ${color}15` }}
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

function Separator() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-px h-8 bg-gradient-to-b from-transparent via-love-violet/40 to-transparent mx-1"
    />
  );
}
