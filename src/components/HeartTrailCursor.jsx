// HeartTrailCursor.jsx - Global heart trail effect on mouse cursor
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeartTrailCursor() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      if (Math.random() > 0.85) {
        const id = Date.now() + Math.random();
        setHearts(prev => [...prev.slice(-8), {
          id,
          x: e.clientX,
          y: e.clientY,
          size: 6 + Math.random() * 10,
          color: ['#f472b6', '#a855f7', '#00f0ff', '#fbbf24'][Math.floor(Math.random() * 4)],
        }]);
        setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 1500);
      }
    };
    
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.svg
            key={h.id}
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            className="absolute"
            style={{ left: h.x - h.size / 2, top: h.y - h.size / 2 }}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: -40,
              x: (Math.random() - 0.5) * 30,
              rotate: Math.random() * 60 - 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={h.color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}
