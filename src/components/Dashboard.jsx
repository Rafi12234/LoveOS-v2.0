import { motion } from 'framer-motion';
import { HER_NAME, ANNIVERSARY_DATE } from '../data/relationshipData';
import { useCountdown } from '../hooks/useCountdown';
import { formatNumber } from '../utils/formatDate';
import TerminalPanel from './TerminalPanel';
import Footer from './Footer';

export default function Dashboard() {
  const time = useCountdown(ANNIVERSARY_DATE);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col px-4 md:px-8 py-6 relative z-10"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-light gradient-text mb-2">
          LoveOS v2.0
        </h1>
        <p className="text-slate-500 text-sm terminal-text">
          A digital universe built with love — for {HER_NAME}
        </p>

        {/* Animated Stats Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 md:gap-4
                     px-6 py-3 rounded-2xl relative overflow-hidden"
          style={{
            background: 'rgba(15, 15, 35, 0.5)',
            border: '1px solid rgba(99, 102, 241, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Animated glow behind */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 15px rgba(168, 85, 247, 0.05) inset',
                '0 0 25px rgba(0, 240, 255, 0.08) inset',
                '0 0 15px rgba(244, 114, 182, 0.05) inset',
                '0 0 15px rgba(168, 85, 247, 0.05) inset',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {time.isPast ? (
            <>
              <StatBadge
                value={`${time.years}`}
                label="years"
                color="text-love-pink"
                glow="rgba(244, 114, 182, 0.4)"
                delay={0.6}
              />
              <Separator />
              <StatBadge
                value={formatNumber(time.totalDays)}
                label="days"
                color="text-love-violet"
                glow="rgba(168, 85, 247, 0.4)"
                delay={0.7}
              />
              <Separator />
              <StatBadge
                value={formatNumber(time.totalHours)}
                label="hours"
                color="text-love-cyan"
                glow="rgba(0, 240, 255, 0.4)"
                delay={0.8}
              />
              <Separator />
              <StatBadge
                value={formatNumber(time.totalMinutes)}
                label="minutes"
                color="text-love-purple"
                glow="rgba(124, 58, 237, 0.4)"
                delay={0.9}
              />
              <Separator />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="text-sm"
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block"
                >
                  ❤️
                </motion.span>
                <span className="text-green-400 text-xs terminal-text ml-1">together</span>
              </motion.span>
            </>
          ) : (
            <>
              <CountdownUnit value={time.days} label="days" color="text-love-cyan" delay={0.6} />
              <span className="text-slate-600 text-xl font-light">:</span>
              <CountdownUnit value={time.hours} label="hrs" color="text-love-violet" delay={0.7} />
              <span className="text-slate-600 text-xl font-light">:</span>
              <CountdownUnit value={time.minutes} label="min" color="text-love-pink" delay={0.8} />
              <span className="text-slate-600 text-xl font-light">:</span>
              <CountdownUnit value={time.seconds} label="sec" color="text-white" delay={0.9} />
              <div className="w-full text-center mt-1">
                <span className="text-slate-500 text-[10px] terminal-text tracking-widest uppercase">
                  until our anniversary
                </span>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Terminal — full width, full height */}
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <TerminalPanel />
      </div>

      <Footer />
    </motion.div>
  );
}

function StatBadge({ value, label, color, glow, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center"
    >
      <span
        className={`text-lg md:text-xl font-bold terminal-text ${color}`}
        style={{ textShadow: `0 0 12px ${glow}` }}
      >
        {value}
      </span>
      <span className="text-[10px] text-slate-500 terminal-text uppercase tracking-wider mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}

function CountdownUnit({ value, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center min-w-[40px]"
    >
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-2xl md:text-3xl font-bold terminal-text ${color}`}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-[10px] text-slate-500 terminal-text uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
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
