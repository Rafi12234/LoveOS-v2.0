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
    </motion.div>
  );
}
