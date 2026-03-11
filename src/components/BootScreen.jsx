import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { BOOT_MESSAGES } from '../data/relationshipData';

export default function BootScreen({ onComplete }) {
  const { displayedLines, isComplete } = useTypewriter(BOOT_MESSAGES, 35, 500);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a14] px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Subtle glow behind text */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </motion.div>
  );
}
