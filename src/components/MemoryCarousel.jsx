import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORY_IMAGES, MEMORY_CAPTIONS } from '../data/relationshipData';

export default function MemoryCarousel({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = MEMORY_IMAGES.length;

  const navigate = useCallback((dir) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
      else if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, onClose]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => navigate(1), 4000);
    return () => clearInterval(timer);
  }, [navigate]);

  const getVisibleCards = () => {
    const cards = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (currentIndex + offset + total) % total;
      cards.push({ idx, offset });
    }
    return cards;
  };

  const getCardStyle = (offset) => {
    const absOffset = Math.abs(offset);
    const zIndex = 10 - absOffset;
    const scale = 1 - absOffset * 0.15;
    const translateX = offset * 220;
    const translateZ = -absOffset * 150;
    const rotateY = offset * -15;
    const opacity = 1 - absOffset * 0.3;
    const blur = absOffset * 2;

    return {
      zIndex,
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(opacity, 0.2),
      filter: `blur(${blur}px)`,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(5, 5, 15, 0.92)', backdropFilter: 'blur(10px)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-light gradient-text mb-2">
          Our Memory Vault
        </h2>
        <p className="text-slate-500 text-sm terminal-text">
          {currentIndex + 1} / {total} memories loaded
        </p>
      </motion.div>

      {/* 3D Carousel */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ perspective: '1200px', height: '400px' }}
      >
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {getVisibleCards().map(({ idx, offset }) => (
            <motion.div
              key={idx}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                ...getCardStyle(offset),
                width: '280px',
                height: '360px',
                marginLeft: '-140px',
                marginTop: '-180px',
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onClick={() => {
                if (offset > 0) navigate(1);
                else if (offset < 0) navigate(-1);
              }}
              whileHover={offset === 0 ? { scale: 1.05 } : {}}
            >
              {/* Card */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden relative"
                style={{
                  border: offset === 0
                    ? '2px solid rgba(168, 85, 247, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: offset === 0
                    ? '0 0 40px rgba(168, 85, 247, 0.2), 0 20px 60px rgba(0, 0, 0, 0.5)'
                    : '0 10px 30px rgba(0, 0, 0, 0.3)',
                }}
              >
                <img
                  src={MEMORY_IMAGES[idx]}
                  alt={`Memory ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: offset === 0
                      ? 'linear-gradient(to top, rgba(10, 10, 20, 0.4) 0%, transparent 50%)'
                      : 'linear-gradient(to top, rgba(10, 10, 20, 0.6) 0%, rgba(10, 10, 20, 0.2) 100%)',
                  }}
                />
                {/* Caption on center card */}
                {offset === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: 'linear-gradient(to top, rgba(5,5,15,0.9) 0%, rgba(5,5,15,0.5) 60%, transparent 100%)' }}
                  >
                    <p className="text-white/90 text-xs md:text-sm font-medium leading-relaxed mb-1"
                       style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                      "{MEMORY_CAPTIONS[idx % MEMORY_CAPTIONS.length]}"
                    </p>
                    <p className="text-love-cyan/60 text-[10px] terminal-text">
                      memory_{String(idx + 1).padStart(3, '0')}.jpg
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5
                     flex items-center justify-center text-white/70 hover:text-love-cyan
                     hover:border-love-cyan/30 hover:bg-love-cyan/10 transition-all"
        >
          ←
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {Array.from({ length: Math.min(total, 20) }, (_, i) => {
            const step = Math.floor(total / 20);
            const dotIdx = i * step;
            const isActive = Math.abs(currentIndex - dotIdx) < step;
            return (
              <button
                key={i}
                onClick={() => {
                  setDirection(dotIdx > currentIndex ? 1 : -1);
                  setCurrentIndex(dotIdx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-love-cyan w-4'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={() => navigate(1)}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5
                     flex items-center justify-center text-white/70 hover:text-love-cyan
                     hover:border-love-cyan/30 hover:bg-love-cyan/10 transition-all"
        >
          →
        </button>
      </div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onClose}
        className="mt-6 px-6 py-2 rounded-lg text-sm terminal-text
                   text-slate-400 hover:text-love-cyan border border-white/10
                   hover:border-love-cyan/30 bg-white/5 hover:bg-love-cyan/10
                   transition-all"
      >
        close (esc)
      </motion.button>

      {/* Keyboard hint */}
      <p className="text-slate-600 text-xs mt-4 terminal-text">
        ← → arrow keys to navigate
      </p>
    </motion.div>
  );
}
