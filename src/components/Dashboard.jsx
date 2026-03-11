import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import { DASHBOARD_SUBTITLE, DEDICATION, SECTIONS, HER_NAME } from '../data/relationshipData';
import Navbar from './Navbar';
import SectionCard from './SectionCard';
import CountdownCard from './CountdownCard';
import TerminalPanel from './TerminalPanel';
import CommitTimeline from './CommitTimeline';
import MemoryGallery from './MemoryGallery';
import RoadmapPanel from './RoadmapPanel';
import LoveLetterModal from './LoveLetterModal';
import Footer from './Footer';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [letterOpen, setLetterOpen] = useState(false);
  const sectionRef = useRef(null);

  const navigateTo = useCallback((id) => {
    if (id === 'letter') {
      setLetterOpen(true);
      return;
    }
    setActiveSection(id);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleTerminalAction = useCallback((action) => {
    switch (action) {
      case 'openTimeline':
        setActiveSection('timeline');
        break;
      case 'openMemories':
        setActiveSection('memories');
        break;
      case 'openLoveLetter':
        setLetterOpen(true);
        break;
      case 'celebrateHugs':
        fireConfetti();
        break;
    }
  }, []);

  const handleLetterReveal = useCallback(() => {
    fireConfetti();
  }, []);

  return (
    <div className="relative z-10 min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-3">
            LoveOS v2.0
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light">
            {DASHBOARD_SUBTITLE}
          </p>
          <p className="text-slate-500 text-xs mt-2 terminal-text">
            {DEDICATION}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
