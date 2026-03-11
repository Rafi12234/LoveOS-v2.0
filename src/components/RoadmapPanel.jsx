import { motion } from 'framer-motion';
import { ROADMAP_ITEMS, ROADMAP_CHECKLIST } from '../data/relationshipData';

const STATUS_STYLES = {
  'in-progress': { bg: 'bg-love-cyan/15', text: 'text-love-cyan', label: 'In Progress' },
  'planned': { bg: 'bg-love-violet/15', text: 'text-love-violet', label: 'Planned' },
  'completed': { bg: 'bg-green-500/15', text: 'text-green-400', label: 'Completed' },
  'always': { bg: 'bg-love-pink/15', text: 'text-love-pink', label: '∞ Always' },
};

export default function RoadmapPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Roadmap items */}
      <div className="space-y-3">
        {ROADMAP_ITEMS.map((item, i) => {
          const style = STATUS_STYLES[item.status] || STATUS_STYLES.planned;
          return (
            <motion.div
              key={item.version}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card glass-card-hover p-4 md:p-5 rounded-xl flex items-start gap-4
                         transition-all duration-300"
            >
              {/* Version badge */}
              <div className="shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center
                              border border-white/10">
                <span className="terminal-text text-sm font-bold gradient-text">
                  {item.version}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress checklist */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 rounded-xl"
      >
        <h4 className="text-sm font-semibold text-slate-300 mb-4 terminal-text">
          {'>'} Relationship Progress
        </h4>
        <div className="space-y-3">
          {ROADMAP_CHECKLIST.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs
                ${item.done
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-slate-600 border border-white/10'
                }`}
              >
                {item.done ? '✓' : ''}
              </div>
              <span className={`text-sm ${item.done ? 'text-slate-300' : 'text-slate-500'}`}>
                {item.label}
              </span>
              {item.done && (
                <span className="ml-auto text-[10px] text-green-400/60 terminal-text">
                  SHIPPED
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
