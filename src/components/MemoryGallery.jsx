import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORY_CATEGORIES } from '../data/relationshipData';

export default function MemoryGallery() {
  const [activeCategory, setActiveCategory] = useState(MEMORY_CATEGORIES[0].name);
  const [selectedMemory, setSelectedMemory] = useState(null);

  const category = MEMORY_CATEGORIES.find(c => c.name === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {MEMORY_CATEGORIES.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
              activeCategory === cat.name
                ? 'bg-love-violet/20 text-love-violet border border-love-violet/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            <span className="mr-1.5">{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
