import { motion } from 'framer-motion';

export default function SectionCard({ icon, title, description, onClick, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card glass-card-hover p-6 text-left w-full cursor-pointer
                 transition-all duration-300 group focus:outline-none
                 focus:ring-2 focus:ring-love-violet/40 rounded-2xl"
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-love-cyan transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-love-violet opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Open</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  );
}
