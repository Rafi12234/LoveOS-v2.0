import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { ANNIVERSARY_DATE, RELATIONSHIP_START } from '../data/relationshipData';
import { formatNumber } from '../utils/formatDate';

export default function CountdownCard() {
  const time = useCountdown(ANNIVERSARY_DATE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-6 md:p-8 rounded-2xl"
    >
      {time.isPast ? <PastStats time={time} /> : <FutureCountdown time={time} />}
    </motion.div>
  );
}

function FutureCountdown({ time }) {
  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <div className="text-center">
      <p className="text-love-violet text-sm font-medium terminal-text mb-1">
        Release Date: Anniversary v2.0
      </p>
      <p className="text-slate-400 text-xs mb-6">Launching in</p>
      <div className="flex justify-center gap-4 md:gap-6">
        {units.map(unit => (
          <div key={unit.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white text-glow-cyan terminal-text">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-500 mt-1">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PastStats({ time }) {
  const stats = [
    { value: `${time.years}`, label: 'years of love' },
    { value: formatNumber(time.totalDays), label: 'days' },
    { value: formatNumber(time.totalHours), label: 'hours' },
    { value: formatNumber(time.totalMinutes), label: 'minutes' },
  ];

  return (
    <div className="text-center">
      <p className="text-love-pink text-sm font-medium terminal-text mb-1">
        Anniversary v2.0 — Launched
      </p>
      <p className="text-slate-400 text-xs mb-6">Time since our story began</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text terminal-text">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-slate-300 text-sm italic"
      >
        ...and countless reasons to love you
      </motion.p>
    </div>
  );
}
