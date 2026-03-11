import { useMemo } from 'react';
import { motion } from 'framer-motion';

const BLOBS = [
  { color: 'rgba(99, 102, 241, 0.15)', size: 500, x: '10%', y: '20%', delay: 0 },
  { color: 'rgba(168, 85, 247, 0.12)', size: 400, x: '70%', y: '10%', delay: 2 },
  { color: 'rgba(244, 114, 182, 0.1)', size: 350, x: '80%', y: '60%', delay: 4 },
  { color: 'rgba(0, 240, 255, 0.08)', size: 300, x: '20%', y: '70%', delay: 1 },
  { color: 'rgba(124, 58, 237, 0.1)', size: 450, x: '50%', y: '40%', delay: 3 },
];

export default function BackgroundEffects() {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Gradient blobs */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: blob.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Star particles */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white/40"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Faint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
