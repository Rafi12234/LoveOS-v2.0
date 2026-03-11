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

      {/* Boot text */}
      <div className="relative w-full max-w-2xl terminal-text text-sm md:text-base">
        {displayedLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`py-0.5 ${
              line.includes('Perfect Match') || line.includes('Boot successful')
                ? 'text-green-400'
                : line.includes('Welcome')
                  ? 'text-love-cyan text-glow-cyan text-lg md:text-xl mt-2'
                  : 'text-slate-400'
            }`}
          >
            {line.includes('Welcome') ? (
              <span className="font-semibold">{line}</span>
            ) : line ? (
              <>
                <span className="text-love-violet mr-2">{'>'}</span>
                {line}
              </>
            ) : (
              <br />
            )}
          </motion.div>
        ))}

        {/* Blinking cursor */}
        {!isComplete && (
          <span className="inline-block w-2.5 h-5 bg-love-cyan cursor-blink ml-1 align-middle" />
        )}
      </div>
    </motion.div>
  );
}
