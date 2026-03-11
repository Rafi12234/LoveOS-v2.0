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
    </div>
  );
}
