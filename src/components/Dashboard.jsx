import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HER_NAME, ANNIVERSARY_DATE, RELATIONSHIP_START } from '../data/relationshipData';
import { useCountdown, useElapsedTime } from '../hooks/useCountdown';
import confetti from 'canvas-confetti';
import TerminalPanel from './TerminalPanel';
import Footer from './Footer';

export default function Dashboard() {
  const countdown = useCountdown(ANNIVERSARY_DATE);
  const elapsed = useElapsedTime(RELATIONSHIP_START);
  const terminalRef = useRef(null);
  const [anniversaryReached, setAnniversaryReached] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const confettiFired = useRef(false);

  // Scroll to top on mount / refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fireCelebration = useCallback(() => {
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ['#f472b6', '#a855f7', '#00f0ff', '#7c3aed', '#ec4899', '#fbbf24'];
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  // Detect anniversary reached
  useEffect(() => {
    if (countdown.isPast && !confettiFired.current) {
      confettiFired.current = true;
      setAnniversaryReached(true);
      setShowSurprise(true);
      fireCelebration();
    }
  }, [countdown.isPast, fireCelebration]);

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
            <svg width={14 + (i % 4) * 6} height={14 + (i % 4) * 6} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
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
              className="inline-block"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="url(#heartDivider)" />
                <defs>
                  <linearGradient id="heartDivider" x1="2" y1="3" x2="22" y2="21">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.span>
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

                  {/* Sparkle particles (SVG stars) */}
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

                  {/* Celebration icon — party popper SVG */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: [0, 1.3, 1], rotate: [-30, 10, 0] }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="mb-4 inline-flex items-center justify-center"
                  >
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Confetti pieces */}
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
                      {/* Heart center */}
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="url(#heartGrad)" />
                      <defs>
                        <linearGradient id="heartGrad" x1="2" y1="3" x2="22" y2="21">
                          <stop offset="0%" stopColor="#f472b6" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#00f0ff" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* Title with stagger */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-2xl md:text-3xl font-bold gradient-text mb-3"
                  >
                    Happy 2nd Anniversary!
                  </motion.h2>

                  {/* Decorative line */}
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

                  {/* Icon row replacing emojis */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                    className="mt-5 flex items-center justify-center gap-4"
                  >
                    {/* Heart icon */}
                    <motion.svg animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0, ease: 'easeInOut' }}
                      width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#f472b6" />
                    </motion.svg>
                    {/* Star icon */}
                    <motion.svg animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.2, ease: 'easeInOut' }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6L12 2z"
                        fill="#fbbf24" />
                    </motion.svg>
                    {/* Infinity icon */}
                    <motion.svg animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: 'easeInOut' }}
                      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4z" />
                    </motion.svg>
                    {/* Sparkle icon */}
                    <motion.svg animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
                        fill="#00f0ff" />
                    </motion.svg>
                    {/* Rose/flower icon */}
                    <motion.svg animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21c-4-4-8-6.5-8-10.5a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4-4 6.5-8 10.5z" fill="rgba(244, 114, 182, 0.15)" />
                      <path d="M12 3v10" stroke="#4ade80" strokeWidth="1.5" />
                      <path d="M9 7c-2-1-3 0-3 2" stroke="#4ade80" strokeWidth="1.2" />
                      <path d="M15 7c2-1 3 0 3 2" stroke="#4ade80" strokeWidth="1.2" />
                    </motion.svg>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    onClick={() => setShowSurprise(false)}
                    className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs terminal-text
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

          {/* Anniversary countdown (if upcoming) or celebration */}
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
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl mt-2"
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
                It&apos;s our 2nd Anniversary!
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
            className="mt-8 flex items-center justify-center gap-4 text-[10px] terminal-text text-slate-600"
          >
            <span>PID: 1432</span>
            <span>•</span>
            <span>MEM: {elapsed.years * 365 + elapsed.months * 30 + elapsed.days} memories cached</span>
            <span>•</span>
            <span className="text-green-400/70 inline-flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#4ade80">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              heartbeat: stable
            </span>
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
