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

  return null;
}
