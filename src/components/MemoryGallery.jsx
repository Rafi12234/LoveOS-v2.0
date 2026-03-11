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

      {/* Memory cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {category?.memories.map((memory, i) => (
            <motion.button
              key={memory.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setSelectedMemory(memory)}
              className="glass-card glass-card-hover p-5 rounded-xl text-left
                         transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-love-violet/30"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{memory.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm mb-1">{memory.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {memory.description}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2 terminal-text">{memory.date}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
