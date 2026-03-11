import { motion } from 'framer-motion';
import { ROADMAP_ITEMS, ROADMAP_CHECKLIST } from '../data/relationshipData';

const STATUS_STYLES = {
  'in-progress': { bg: 'bg-love-cyan/15', text: 'text-love-cyan', label: 'In Progress' },
  'planned': { bg: 'bg-love-violet/15', text: 'text-love-violet', label: 'Planned' },
  'completed': { bg: 'bg-green-500/15', text: 'text-green-400', label: 'Completed' },
  'always': { bg: 'bg-love-pink/15', text: 'text-love-pink', label: '∞ Always' },
};

export default function RoadmapPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
    </motion.div>
  );
}
