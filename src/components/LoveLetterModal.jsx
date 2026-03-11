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
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
