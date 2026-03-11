import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMIT_HISTORY } from '../data/relationshipData';

export default function GitHubCommitLog({ onClose }) {
  const [expandedHash, setExpandedHash] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 5, 15, 0.92)', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl"
        style={{
          background: 'rgba(13, 17, 23, 0.98)',
          border: '1px solid rgba(48, 54, 61, 0.8)',
        }}
      >
        {/* GitHub-style header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(48, 54, 61, 0.8)' }}
        >
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e">
              <path d="M1.643 3.143.427 1.927A.25.25 0 0 1 .604 1.5h2.792a.25.25 0 0 1 .177.427L2.357 3.143a.25.25 0 0 1-.354 0M6.5 2.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM6.5 6.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM6.5 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM1.5 13.25a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z"/>
            </svg>
            <h3 className="text-sm font-semibold text-[#e6edf3]">
              Commits on <span className="text-love-cyan">main</span>
            </h3>
            <span className="text-xs text-[#8b949e] terminal-text">
              {COMMIT_HISTORY.length} commits
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Commit list */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 60px)' }}>
          {COMMIT_HISTORY.slice().reverse().map((commit, i) => (
            <motion.div
              key={commit.hash}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Date separator */}
              {(i === 0 || COMMIT_HISTORY.slice().reverse()[i - 1]?.date !== commit.date) && (
                <div
                  className="px-5 py-2 text-xs font-semibold text-[#e6edf3] flex items-center gap-2"
                  style={{
                    background: 'rgba(22, 27, 34, 0.8)',
                    borderBottom: '1px solid rgba(48, 54, 61, 0.5)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
                    <path fillRule="evenodd" d="M4.72.22a.75.75 0 0 1 1.06 0l1 1a.75.75 0 0 1-1.06 1.06l-1-1a.75.75 0 0 1 0-1.06m6.56 0a.75.75 0 0 1 0 1.06l-1 1a.75.75 0 1 1-1.06-1.06l1-1a.75.75 0 0 1 1.06 0M.22 4.72a.75.75 0 0 1 1.06 0l1 1a.75.75 0 0 1-1.06 1.06l-1-1a.75.75 0 0 1 0-1.06"/>
                  </svg>
                  Commits on {new Date(commit.date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}

              {/* Commit row */}
              <div
                className="group px-5 py-3 flex items-start gap-3 cursor-pointer hover:bg-[#161b22]/60 transition-colors"
                style={{ borderBottom: '1px solid rgba(48, 54, 61, 0.3)' }}
                onClick={() => setExpandedHash(expandedHash === commit.hash ? null : commit.hash)}
              >
                {/* Commit graph line */}
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <div
                    className="w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: commit.tag
                        ? '#a855f7'
                        : '#3fb950',
                      background: commit.tag
                        ? 'rgba(168, 85, 247, 0.3)'
                        : 'rgba(63, 185, 80, 0.3)',
                    }}
                  />
                  {i < COMMIT_HISTORY.length - 1 && (
                    <div className="w-0.5 h-8 bg-[#30363d] mt-1" />
                  )}
                </div>

                {/* Commit info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-[#e6edf3] font-medium truncate group-hover:text-love-cyan transition-colors">
                      {commit.message}
                    </p>
                    {commit.tag && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold terminal-text shrink-0"
                        style={{
                          background: commit.tag === 'hotfix'
                            ? 'rgba(248, 81, 73, 0.15)'
                            : 'rgba(168, 85, 247, 0.15)',
                          color: commit.tag === 'hotfix' ? '#f85149' : '#a855f7',
                          border: `1px solid ${commit.tag === 'hotfix' ? 'rgba(248, 81, 73, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`,
                        }}
                      >
                        {commit.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#8b949e] terminal-text">
                    <span className="text-love-violet font-medium">{commit.author}</span>
                    <span>committed on {commit.date}</span>
                    <span className="text-[#6e7681] ml-auto font-mono">{commit.hash}</span>
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {expandedHash === commit.hash && commit.detail && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mt-3 p-4 rounded-lg text-sm"
                          style={{
                            background: 'rgba(22, 27, 34, 0.6)',
                            border: '1px solid rgba(48, 54, 61, 0.5)',
                          }}
                        >
                          <p className="text-love-cyan font-medium mb-2">{commit.detail.title}</p>
                          <p className="text-[#8b949e] mb-2 leading-relaxed">{commit.detail.description}</p>
                          <p className="text-slate-500 italic text-xs">"{commit.detail.note}"</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
