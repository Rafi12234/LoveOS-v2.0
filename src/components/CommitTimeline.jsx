import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMIT_HISTORY } from '../data/relationshipData';
import { formatDate } from '../utils/formatDate';

export default function CommitTimeline() {
  const [expandedHash, setExpandedHash] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-0 relative"
    >
      {/* Vertical connecting line */}
      <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-love-cyan/40 via-love-violet/30 to-love-pink/40" />

      {COMMIT_HISTORY.map((commit, i) => {
        const isExpanded = expandedHash === commit.hash;

        return (
          <motion.div
            key={commit.hash}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative pl-12 md:pl-14 pb-6"
          >
            {/* Dot */}
            <div className={`absolute left-2.5 md:left-3.5 top-1.5 w-4 h-4 rounded-full border-2 z-10
              ${commit.tag
                ? 'border-love-pink bg-love-pink/30 shadow-glow-pink'
                : 'border-love-cyan bg-love-cyan/20 shadow-glow-cyan'
              }`}
            />

            {/* Commit card */}
            <button
              onClick={() => setExpandedHash(isExpanded ? null : commit.hash)}
              className="w-full text-left glass-card glass-card-hover p-4 md:p-5 rounded-xl
                         transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-love-violet/30"
            >
              {/* Header row */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="terminal-text text-xs text-yellow-400/70">
                  {commit.hash}
                </span>
                {commit.tag && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium terminal-text
                    ${commit.tag === 'v2.0'
                      ? 'bg-love-pink/20 text-love-pink'
                      : commit.tag === 'v1.0'
                        ? 'bg-green-500/20 text-green-400'
                        : commit.tag === 'milestone'
                          ? 'bg-love-violet/20 text-love-violet'
                          : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {commit.tag}
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto">
                  {formatDate(commit.date)}
                </span>
              </div>

              {/* Commit message */}
              <p className="terminal-text text-sm text-white font-medium">
                {commit.message}
              </p>
              <p className="text-xs text-slate-500 mt-1 terminal-text">
                Author: {commit.author}
              </p>

              {/* Expand indicator */}
              <div className="mt-2 flex items-center gap-1 text-[11px] text-love-violet/60">
                <motion.span
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▶
                </motion.span>
                <span>{isExpanded ? 'collapse' : 'show details'}</span>
              </div>
            </button>

            {/* Expanded detail */}
            <AnimatePresence>
              {isExpanded && commit.detail && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 ml-1 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <h4 className="text-love-cyan font-semibold mb-2">
                      {commit.detail.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      {commit.detail.description}
                    </p>
                    {commit.detail.note && (
                      <p className="text-xs text-love-pink/70 italic border-l-2 border-love-pink/30 pl-3">
                        {commit.detail.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
