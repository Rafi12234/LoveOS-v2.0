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

        {/* Compact countdown/stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-center justify-center gap-4 text-xs terminal-text"
        >
          {time.isPast ? (
            <>
              <span className="text-love-pink">{time.years}y</span>
              <span className="text-slate-600">•</span>
              <span className="text-love-violet">{formatNumber(time.totalDays)} days</span>
              <span className="text-slate-600">•</span>
              <span className="text-love-cyan">{formatNumber(time.totalHours)} hours</span>
              <span className="text-slate-600">•</span>
              <span className="text-green-400">❤ together</span>
            </>
          ) : (
            <>
              <span className="text-love-cyan">{time.days}d</span>
              <span className="text-love-violet">{time.hours}h</span>
              <span className="text-love-pink">{time.minutes}m</span>
              <span className="text-white">{time.seconds}s</span>
              <span className="text-slate-600">until anniversary</span>
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
