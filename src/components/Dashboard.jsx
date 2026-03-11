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

        {/* Countdown */}
        <div className="mb-10">
          <CountdownCard />
        </div>

        {/* Section cards grid — shown when on dashboard */}
        <AnimatePresence mode="wait">
          {activeSection === 'dashboard' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {Object.entries(SECTIONS).map(([key, val], i) => (
                  <SectionCard
                    key={key}
                    icon={val.icon}
                    title={val.title}
                    description={val.description}
                    onClick={() => navigateTo(key)}
                    delay={0.1 + i * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="section"
              ref={sectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back button */}
              <button
                onClick={() => setActiveSection('dashboard')}
                className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors
                           focus:outline-none focus:ring-2 focus:ring-love-violet/30 rounded-lg px-2 py-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>

              {/* Section title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {SECTIONS[activeSection]?.icon}{' '}
                {SECTIONS[activeSection]?.title || activeSection}
              </h2>

              {/* Active section content */}
              {activeSection === 'terminal' && (
                <TerminalPanel onAction={handleTerminalAction} />
              )}
              {activeSection === 'timeline' && <CommitTimeline />}
              {activeSection === 'memories' && <MemoryGallery />}
              {activeSection === 'roadmap' && <RoadmapPanel />}
              {activeSection === 'stats' && <CountdownCard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Love letter modal */}
      <LoveLetterModal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
        onReveal={handleLetterReveal}
      />
    </div>
  );
}

// Elegant confetti burst
function fireConfetti() {
  const defaults = {
    spread: 100,
    ticks: 80,
    gravity: 0.8,
    decay: 0.92,
    startVelocity: 25,
    colors: ['#a855f7', '#f472b6', '#00f0ff', '#7c3aed', '#6366f1'],
  };

  confetti({ ...defaults, particleCount: 40, origin: { x: 0.3, y: 0.6 } });
  confetti({ ...defaults, particleCount: 40, origin: { x: 0.7, y: 0.6 } });

  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.5, y: 0.5 }, spread: 120 });
  }, 200);
}
