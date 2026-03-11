import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from './components/BootScreen';
import Dashboard from './components/Dashboard';
import BackgroundEffects from './components/BackgroundEffects';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="text-white text-center pt-20 text-4xl">LoveOS v2.0</h1>
    </div>
  );
}
