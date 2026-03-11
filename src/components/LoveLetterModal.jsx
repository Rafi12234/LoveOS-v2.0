import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_LETTER } from '../data/relationshipData';

export default function LoveLetterModal({ isOpen, onClose, onReveal }) {
  const [decrypting, setDecrypting] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDecrypting(true);
      setRevealed(false);
      const timer = setTimeout(() => {
        setDecrypting(false);
        setRevealed(true);
        onReveal?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onReveal]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5, 5, 15, 0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-2xl p-8 md:p-10"
            style={{
              background: 'linear-gradient(145deg, rgba(15, 15, 40, 0.95), rgba(20, 10, 30, 0.95))',
              border: '1px solid rgba(244, 114, 182, 0.2)',
              boxShadow: '0 0 60px rgba(168, 85, 247, 0.15), 0 0 120px rgba(244, 114, 182, 0.08)',
            }}
          >
            {/* Soft glow behind */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(244, 114, 182, 0.3), transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            <AnimatePresence mode="wait">
              {decrypting ? (
                <motion.div
                  key="decrypt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="inline-block mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-10 h-10 rounded-full border-2 border-love-pink/40 border-t-love-pink"
                    />
                  </div>
                  <p className="terminal-text text-sm text-love-pink animate-pulse">
                    Decrypting private message...
                  </p>
                  <p className="terminal-text text-xs text-slate-500 mt-2">
                    Authorization: ❤ granted
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  {/* Greeting */}
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-light text-love-pink mb-8 text-glow-pink"
                  >
                    {LOVE_LETTER.greeting}
                  </motion.h2>

                  {/* Letter body */}
                  <div className="space-y-5">
                    {LOVE_LETTER.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                        className="text-slate-300 text-sm md:text-base leading-relaxed font-light"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>

                  {/* Closing */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + LOVE_LETTER.paragraphs.length * 0.15 + 0.2 }}
                    className="mt-10 text-right"
                  >
                    <p className="text-slate-400 text-sm italic">{LOVE_LETTER.closing}</p>
                    <p className="text-love-pink font-medium mt-1 text-glow-pink">
                      {LOVE_LETTER.signature}
                    </p>
                  </motion.div>

                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={onClose}
                    className="mt-8 w-full py-3 rounded-xl text-sm text-white
                               bg-love-pink/15 hover:bg-love-pink/25 border border-love-pink/20
                               transition-colors focus:outline-none focus:ring-2 focus:ring-love-pink/40"
                  >
                    Close with Love
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
