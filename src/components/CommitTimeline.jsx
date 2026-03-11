import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMIT_HISTORY } from '../data/relationshipData';
import { formatDate } from '../utils/formatDate';

export default function CommitTimeline() {
  const [expandedHash, setExpandedHash] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-0 relative"
    >
      {/* Vertical connecting line */}
      <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-love-cyan/40 via-love-violet/30 to-love-pink/40" />
    </motion.div>
  );
}
