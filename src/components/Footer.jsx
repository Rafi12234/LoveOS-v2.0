import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="text-center py-8 mt-12 border-t border-white/5"
    >
      <p className="text-xs text-slate-500 font-light">
        Built with love, code, and countless beautiful memories.
      </p>
      <p className="text-[10px] text-slate-600 mt-2 terminal-text">
        LoveOS v2.0 &copy; {new Date().getFullYear()} — All hearts reserved.
      </p>
    </motion.footer>
  );
}
