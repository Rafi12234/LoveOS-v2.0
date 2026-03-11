import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'memories', label: 'Memories' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'letter', label: 'Letter' },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 glass-card border-b border-love-glow/10 rounded-none"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
      </div>
    </motion.nav>
  );
}
