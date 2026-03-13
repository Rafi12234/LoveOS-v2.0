import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from './components/BootScreen';
import Dashboard from './components/Dashboard';
import BackgroundEffects from './components/BackgroundEffects';
import HeartTrailCursor from './components/HeartTrailCursor';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <HeartTrailCursor />
      <div className="scanline-overlay" />

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootScreen key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}
