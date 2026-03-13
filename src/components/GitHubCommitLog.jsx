// GitHubCommitLog.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { COMMIT_HISTORY, HER_NAME } from '../data/relationshipData';
import confetti from 'canvas-confetti';

/* ════════════════════════════════════════════════════════
   ✨ FLOATING CODE PARTICLES
   ════════════════════════════════════════════════════════ */
function CodeParticles() {
  const symbols = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      char: ['<', '/>', '{', '}', '♥', '()', '=>', '&&', '||', '++', '/*', '*/', '[]', '===', 'git', '♡'][Math.floor(Math.random() * 16)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 6,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 8,
      color: ['#f472b6', '#a855f7', '#00f0ff', '#3fb950', '#fbbf24', '#7c3aed'][Math.floor(Math.random() * 6)],
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-2xl">
      {symbols.map((s) => (
        <motion.span
          key={s.id}
          className="absolute terminal-text select-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, color: s.color, opacity: 0.06 }}
          animate={{
            y: [0, -60, -120, -60, 0], x: [0, 15, -10, 20, 0],
            opacity: [0, 0.1, 0.05, 0.08, 0], rotate: [0, 10, -5, 8, 0],
          }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          {s.char}
        </motion.span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🌿 BRANCH VISUALIZATION
   ════════════════════════════════════════════════════════ */
function BranchVisualization({ commitCount }) {
  const branches = useMemo(() => [
    { name: 'main', color: '#3fb950', commits: commitCount },
    { name: 'love', color: '#f472b6', commits: Math.floor(commitCount * 0.7) },
    { name: 'memories', color: '#a855f7', commits: Math.floor(commitCount * 0.4) },
  ], [commitCount]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-20"
    >
      <div className="p-3 rounded-xl min-w-[140px]"
        style={{ background: 'rgba(13,17,23,0.85)', border: '1px solid rgba(48,54,61,0.6)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-1.5 mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
          <span className="text-[8px] terminal-text text-[#8b949e] uppercase tracking-wider">branches</span>
        </div>
        {branches.map((b, i) => (
          <motion.div key={b.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }} className="flex items-center gap-2 py-1">
            <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: b.color, boxShadow: `0 0 6px ${b.color}60` }}
              animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
            <span className="text-[9px] terminal-text text-[#e6edf3] flex-1">{b.name}</span>
            <span className="text-[8px] terminal-text" style={{ color: b.color }}>{b.commits}</span>
          </motion.div>
        ))}
        <div className="mt-2 pt-2 flex items-end gap-[2px] h-6" style={{ borderTop: '1px solid rgba(48,54,61,0.4)' }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div key={i} className="w-[6px] rounded-sm"
              style={{ background: 'linear-gradient(to top, #3fb950, #a855f7)', opacity: 0.4 + Math.random() * 0.6 }}
              animate={{ height: [`${4 + Math.random() * 12}px`, `${6 + Math.random() * 16}px`, `${4 + Math.random() * 12}px`] }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.08 }} />
          ))}
        </div>
        <span className="text-[7px] terminal-text text-[#484f58] mt-1 block">activity</span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📊 NAME PIXEL MAP — Generate pixel art from name
   ════════════════════════════════════════════════════════ */
function getNamePixelMap(name) {
  const letterMaps = {
    S: [
      [0,1,1,1,0],
      [1,0,0,0,0],
      [0,1,1,0,0],
      [0,0,0,1,0],
      [1,0,0,1,0],
      [0,1,1,0,0],
    ],
    A: [
      [0,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
    ],
    M: [
      [1,0,0,0,1],
      [1,1,0,1,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    N: [
      [1,0,0,1,0],
      [1,1,0,1,0],
      [1,0,1,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
    ],
    T: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
    ],
    B: [
      [1,1,1,0,0],
      [1,0,0,1,0],
      [1,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,0,0],
    ],
    C: [
      [0,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [0,1,1,1,0],
    ],
    D: [
      [1,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,0,0],
    ],
    E: [
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,1,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
    ],
    F: [
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,1,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
    ],
    G: [
      [0,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,1,1,0],
      [1,0,0,1,0],
      [0,1,1,1,0],
    ],
    H: [
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
    ],
    I: [
      [1,1,1,0,0],
      [0,1,0,0,0],
      [0,1,0,0,0],
      [0,1,0,0,0],
      [0,1,0,0,0],
      [1,1,1,0,0],
    ],
    J: [
      [0,0,1,1,0],
      [0,0,0,1,0],
      [0,0,0,1,0],
      [0,0,0,1,0],
      [1,0,0,1,0],
      [0,1,1,0,0],
    ],
    K: [
      [1,0,0,1,0],
      [1,0,1,0,0],
      [1,1,0,0,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
    ],
    L: [
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
    ],
    O: [
      [0,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [0,1,1,0,0],
    ],
    P: [
      [1,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
    ],
    Q: [
      [0,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,1,0,0],
      [0,1,0,1,0],
    ],
    R: [
      [1,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,0,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
    ],
    U: [
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [0,1,1,0,0],
    ],
    V: [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,1,0,1,0],
      [0,0,1,0,0],
    ],
    W: [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,1,0,1],
      [1,0,1,0,1],
      [1,1,0,1,1],
      [1,0,0,0,1],
    ],
    X: [
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,1,0,1,0],
      [1,0,0,0,1],
    ],
    Y: [
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
    ],
    Z: [
      [1,1,1,1,1],
      [0,0,0,1,0],
      [0,0,1,0,0],
      [0,1,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1],
    ],
  };

  const rows = 6;
  const charWidth = 5;
  const gap = 1;
  const upperName = name.toUpperCase();
  const totalCols = upperName.length * (charWidth + gap) - gap;
  const grid = Array.from({ length: rows }, () => Array(totalCols).fill(0));

  upperName.split('').forEach((char, ci) => {
    const map = letterMaps[char];
    if (!map) return;
    const offsetX = ci * (charWidth + gap);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < charWidth; c++) {
        if (map[r] && map[r][c]) {
          grid[r][offsetX + c] = 1;
        }
      }
    }
  });

  return { grid, rows, cols: totalCols };
}

/* ════════════════════════════════════════════════════════
   📊 CONTRIBUTION GRID MODAL — Name spelled in grid
   ════════════════════════════════════════════════════════ */
function ContributionGridModal({ isOpen, onClose, commitCount }) {
  const [useLove, setUseLove] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  const nameToDisplay = HER_NAME || 'SAMANTA';
  const { grid, rows, cols } = useMemo(() => getNamePixelMap(nameToDisplay), [nameToDisplay]);

  const paddingCols = 3;
  const totalDisplayCols = cols + paddingCols * 2;
  const paddingRows = 2;
  const totalDisplayRows = rows + paddingRows * 2;

  const greenPalette = ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353'];
  const lovePalette = ['#0d1117', '#2a0a1e', '#5c1a3e', '#d63384', '#f472b6'];
  const palette = useLove ? lovePalette : greenPalette;
  const accentColor = useLove ? '#f472b6' : '#39d353';

  useEffect(() => {
    if (isOpen) {
      setIsRevealed(false);
      const timer = setTimeout(() => setIsRevealed(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const getCellLevel = useCallback((displayRow, displayCol) => {
    const gridRow = displayRow - paddingRows;
    const gridCol = displayCol - paddingCols;
    if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < cols && grid[gridRow][gridCol]) {
      return 3 + Math.floor(Math.random() * 2);
    }
    return 1;
  }, [grid, rows, cols, paddingRows, paddingCols]);

  const cellData = useMemo(() => {
    const data = [];
    for (let c = 0; c < totalDisplayCols; c++) {
      const column = [];
      for (let r = 0; r < totalDisplayRows; r++) {
        column.push({ level: getCellLevel(r, c), row: r, col: c });
      }
      data.push(column);
    }
    return data;
  }, [totalDisplayCols, totalDisplayRows, getCellLevel]);

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  const handleCellClick = useCallback((cell) => {
    const gridRow = cell.row - paddingRows;
    const gridCol = cell.col - paddingCols;
    if (gridRow >= 0 && gridRow < rows && gridCol >= 0 && gridCol < cols && grid[gridRow][gridCol]) {
      confetti({
        particleCount: 12,
        spread: 30,
        origin: { x: 0.5, y: 0.5 },
        colors: useLove ? ['#f472b6', '#a855f7', '#ec4899'] : ['#39d353', '#26a641', '#006d32'],
        gravity: 1,
        scalar: 0.7,
      });
    }
  }, [grid, rows, cols, paddingRows, paddingCols, useLove]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          {/* Ambient glows */}
          <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${useLove ? 'rgba(244,114,182,0.08)' : 'rgba(63,185,80,0.08)'}, transparent 70%)`,
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }} />

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(13, 17, 23, 0.98)',
              border: `1px solid ${useLove ? 'rgba(244,114,182,0.2)' : 'rgba(63,185,80,0.2)'}`,
              boxShadow: `0 0 60px ${useLove ? 'rgba(244,114,182,0.1)' : 'rgba(63,185,80,0.1)'}, 0 25px 80px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Top shimmer */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* ─── Header ─── */}
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: `1px solid rgba(48, 54, 61, 0.5)` }}>
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="8" y1="3" x2="8" y2="21" />
                    <line x1="16" y1="3" x2="16" y2="21" />
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </svg>
                </motion.div>
                <div>
                  <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-2">
                    Contribution Graph
                    <motion.span
                      className="text-[9px] px-2 py-0.5 rounded-full terminal-text"
                      style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {useLove ? '♥ love' : '● code'}
                    </motion.span>
                  </h2>
                  <p className="text-[9px] terminal-text text-[#484f58] mt-0.5">
                    {commitCount} contributions in the last year
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle palette */}
                <motion.button
                  onClick={() => setUseLove(p => !p)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="px-3 py-1.5 rounded-lg text-[10px] terminal-text font-medium transition-all"
                  style={{
                    background: `${accentColor}10`,
                    border: `1px solid ${accentColor}30`,
                    color: accentColor,
                  }}
                >
                  {useLove ? 'Show Green' : 'Show Love'}
                </motion.button>

                {/* Close */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(48,54,61,0.3)', border: '1px solid rgba(48,54,61,0.5)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* ─── Grid Area ─── */}
            <div className="px-5 py-6">
              {/* Name title above grid */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-5"
              >
                <p className="text-[10px] terminal-text text-[#484f58] tracking-[0.3em] uppercase mb-1">
                  Spelled with commits for
                </p>
                <motion.h3
                  className="text-xl md:text-2xl font-bold tracking-wider"
                  style={{
                    color: accentColor,
                    textShadow: `0 0 20px ${accentColor}40`,
                  }}
                  animate={{
                    textShadow: [
                      `0 0 20px ${accentColor}40`,
                      `0 0 35px ${accentColor}60`,
                      `0 0 20px ${accentColor}40`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {nameToDisplay.toUpperCase()}
                </motion.h3>
              </motion.div>

              {/* Scrollable grid container */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-0 min-w-min mx-auto w-fit">
                  {/* Day labels column */}
                  <div className="flex flex-col gap-[3px] mr-2 flex-shrink-0 pt-[2px]">
                    {dayLabels.slice(0, totalDisplayRows).map((label, i) => (
                      <div key={`label-${i}`} className="h-[14px] md:h-[16px] flex items-center justify-end">
                        <span className="text-[8px] terminal-text text-[#484f58] pr-1">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Grid columns */}
                  {cellData.map((column, colIdx) => (
                    <div key={`col-${colIdx}`} className="flex flex-col gap-[3px] flex-shrink-0">
                      {column.map((cell, rowIdx) => {
                        const isNameCell = cell.level >= 3;
                        const cellDelay = isRevealed
                          ? (isNameCell ? 0.4 + colIdx * 0.02 + rowIdx * 0.01 : 0.1 + (colIdx + rowIdx) * 0.003)
                          : 0;
                        const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;

                        return (
                          <motion.div
                            key={`cell-${colIdx}-${rowIdx}`}
                            className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-[3px] cursor-pointer relative"
                            style={{ backgroundColor: palette[Math.min(cell.level, palette.length - 1)] }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{
                              delay: cellDelay,
                              duration: isNameCell ? 0.3 : 0.15,
                              type: isNameCell ? 'spring' : 'tween',
                              stiffness: isNameCell ? 300 : undefined,
                            }}
                            whileHover={{
                              scale: 1.6,
                              zIndex: 20,
                              boxShadow: `0 0 12px ${accentColor}80`,
                            }}
                            onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => handleCellClick(cell)}
                          >
                            {/* Tooltip on hover */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5, scale: 0.8 }}
                                  animate={{ opacity: 1, y: -28, scale: 1 }}
                                  exit={{ opacity: 0, y: 5, scale: 0.8 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-30 px-2 py-1 rounded-md"
                                  style={{
                                    background: 'rgba(13, 17, 23, 0.95)',
                                    border: `1px solid ${accentColor}40`,
                                    boxShadow: `0 4px 12px rgba(0,0,0,0.5)`,
                                  }}
                                >
                                  <span className="text-[8px] terminal-text" style={{ color: accentColor }}>
                                    {isNameCell
                                      ? `♥ ${Math.floor(Math.random() * 20) + 5} love commits`
                                      : cell.level > 0
                                        ? `${Math.floor(Math.random() * 5) + 1} commits`
                                        : 'No commits'}
                                  </span>
                                  {/* Tooltip arrow */}
                                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-[4px] w-2 h-2 rotate-45"
                                    style={{ background: 'rgba(13, 17, 23, 0.95)', borderRight: `1px solid ${accentColor}40`, borderBottom: `1px solid ${accentColor}40` }} />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Inner glow for name cells */}
                            {isNameCell && isRevealed && (
                              <motion.div
                                className="absolute inset-0 rounded-[3px] pointer-events-none"
                                animate={{
                                  boxShadow: [
                                    `inset 0 0 4px ${accentColor}30`,
                                    `inset 0 0 8px ${accentColor}50`,
                                    `inset 0 0 4px ${accentColor}30`,
                                  ],
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: colIdx * 0.05 }}
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-between mt-4 px-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] terminal-text text-[#484f58]">
                    <a href="#" className="hover:text-[#8b949e] transition-colors">Learn how we count contributions</a>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] terminal-text text-[#484f58]">Less</span>
                  {palette.map((color, i) => (
                    <motion.div
                      key={i}
                      className="w-[12px] h-[12px] rounded-[2px]"
                      style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.04)' }}
                      whileHover={{ scale: 1.4 }}
                    />
                  ))}
                  <span className="text-[9px] terminal-text text-[#484f58]">More</span>
                </div>
              </motion.div>
            </div>

            {/* ─── Footer with love message ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderTop: `1px solid rgba(48, 54, 61, 0.4)`, background: 'rgba(22, 27, 34, 0.4)' }}
            >
              <div className="flex items-center gap-2">
                <motion.svg
                  width="12" height="12" viewBox="0 0 24 24" fill={accentColor}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
                <span className="text-[9px] terminal-text" style={{ color: `${accentColor}90` }}>
                  Every cell is a moment of love for {nameToDisplay}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.div className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }} />
                <span className="text-[8px] terminal-text text-[#484f58]">live</span>
              </div>
            </motion.div>

            {/* Bottom shimmer */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════
   📊 CONTRIBUTION GRAPH TRIGGER — In-page section
   ════════════════════════════════════════════════════════ */
function ContributionGraph({ commitCount, onOpenGrid }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="px-5 py-5"
      style={{ borderTop: '1px solid rgba(48, 54, 61, 0.4)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="8" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="16" y2="21" />
            <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
          </svg>
          <span className="text-[10px] terminal-text text-[#8b949e] tracking-wider uppercase">
            Love Contributions
          </span>
          <span className="text-[9px] terminal-text text-[#3fb950]">
            {commitCount} in the last year
          </span>
        </div>

        <motion.button
          onClick={onOpenGrid}
          whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(244,114,182,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-1.5 rounded-lg text-[10px] terminal-text font-medium flex items-center gap-2 transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(244,114,182,0.1), rgba(168,85,247,0.1))',
            border: '1px solid rgba(244,114,182,0.3)',
            color: '#f472b6',
          }}
        >
          <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="#f472b6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
          View {HER_NAME}&apos;s Grid
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🏷 COMMIT TAG
   ════════════════════════════════════════════════════════ */
function CommitTag({ tag }) {
  const tagConfig = {
    milestone: { bg: 'rgba(168,85,247,0.12)', color: '#a855f7', border: 'rgba(168,85,247,0.3)', icon: '★' },
    hotfix: { bg: 'rgba(248,81,73,0.12)', color: '#f85149', border: 'rgba(248,81,73,0.3)', icon: '!' },
    feature: { bg: 'rgba(63,185,80,0.12)', color: '#3fb950', border: 'rgba(63,185,80,0.3)', icon: '+' },
    release: { bg: 'rgba(0,240,255,0.12)', color: '#00f0ff', border: 'rgba(0,240,255,0.3)', icon: '◆' },
    love: { bg: 'rgba(244,114,182,0.12)', color: '#f472b6', border: 'rgba(244,114,182,0.3)', icon: '♥' },
  };
  const config = tagConfig[tag] || tagConfig.milestone;

  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
      whileHover={{ scale: 1.15 }}
      className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-medium terminal-text shrink-0 cursor-default"
      style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}
    >
      <span className="text-[8px]">{config.icon}</span>{tag}
    </motion.span>
  );
}

/* ════════════════════════════════════════════════════════
   📊 DIFF STATS
   ════════════════════════════════════════════════════════ */
function DiffStats({ additions, deletions }) {
  const total = additions + deletions;
  const blocks = 5;
  const addBlocks = Math.round((additions / total) * blocks);
  return (
    <div className="flex items-center gap-1.5 mt-1">
      <span className="text-[9px] terminal-text text-[#3fb950]">+{additions}</span>
      <span className="text-[9px] terminal-text text-[#f85149]">-{deletions}</span>
      <div className="flex gap-[2px] ml-1">
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div key={i} className="w-[8px] h-[8px] rounded-[1px]"
            style={{ backgroundColor: i < addBlocks ? '#3fb950' : '#f85149' }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i, type: 'spring' }} />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   🔍 COMMIT DETAIL PANEL
   ════════════════════════════════════════════════════════ */
function CommitDetail({ commit }) {
  const additions = Math.floor(Math.random() * 200) + 20;
  const deletions = Math.floor(Math.random() * 50) + 5;
  const files = useMemo(() => [
    { name: `src/love/${commit.hash.slice(0, 4)}.js`, status: 'modified', adds: Math.floor(additions * 0.4), dels: Math.floor(deletions * 0.3) },
    { name: `src/memories/moment.ts`, status: 'added', adds: Math.floor(additions * 0.35), dels: 0 },
    { name: `heart/core.rs`, status: 'modified', adds: Math.floor(additions * 0.25), dels: Math.floor(deletions * 0.7) },
  ], [commit.hash, additions, deletions]);

  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="overflow-hidden">
      <div className="mt-3 rounded-xl overflow-hidden"
        style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(48,54,61,0.5)' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(48,54,61,0.4)' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <motion.div className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f472b6, #a855f7)' }}
                animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-xs text-[#e6edf3] font-medium">{commit.author}</p>
                <p className="text-[9px] text-[#8b949e] terminal-text">committed {commit.date}</p>
              </div>
            </div>
            <span className="text-[9px] terminal-text px-2 py-0.5 rounded"
              style={{ background: 'rgba(48,54,61,0.5)', color: '#8b949e', fontFamily: 'monospace' }}>
              {commit.hash}
            </span>
          </div>
          {commit.detail && (
            <>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                className="text-sm text-love-cyan font-medium mb-1.5">{commit.detail.title}</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xs text-[#8b949e] leading-relaxed mb-2">{commit.detail.description}</motion.p>
              {commit.detail.note && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                  className="flex items-start gap-2 px-3 py-2 rounded-lg mb-2"
                  style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.15)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f472b6" className="mt-0.5 flex-shrink-0">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <p className="text-[11px] text-love-pink/80 italic leading-relaxed">&ldquo;{commit.detail.note}&rdquo;</p>
                </motion.div>
              )}
            </>
          )}
          <DiffStats additions={additions} deletions={deletions} />
        </div>
        <div className="px-4 py-2">
          <p className="text-[9px] terminal-text text-[#8b949e] mb-2 tracking-wider uppercase">{files.length} files changed</p>
          {files.map((file, i) => (
            <motion.div key={file.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 py-1.5 group"
              style={{ borderBottom: i < files.length - 1 ? '1px solid rgba(48,54,61,0.2)' : 'none' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke={file.status === 'added' ? '#3fb950' : '#e6edf3'} strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-[10px] terminal-text text-[#e6edf3] flex-1 group-hover:text-love-cyan transition-colors" style={{ fontFamily: 'monospace' }}>{file.name}</span>
              <span className="text-[8px] terminal-text text-[#3fb950]">+{file.adds}</span>
              {file.dels > 0 && <span className="text-[8px] terminal-text text-[#f85149]">-{file.dels}</span>}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="px-4 py-3 mx-4 mb-3 rounded-lg"
          style={{ background: 'rgba(22,27,34,0.8)', border: '1px solid rgba(48,54,61,0.3)', fontFamily: 'monospace' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[8px] text-[#484f58]">// preview</span>
          </div>
          {[
            { num: 42, text: `const love = new Love("${HER_NAME}");`, color: '#e6edf3', prefix: ' ' },
            { num: 43, text: `love.intensity = Infinity;`, color: '#3fb950', prefix: '+' },
            { num: 44, text: `love.duration = "forever";`, color: '#3fb950', prefix: '+' },
            { num: 45, text: `// TODO: never let go`, color: '#8b949e', prefix: ' ' },
          ].map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-0 text-[10px] leading-5"
              style={{ background: line.prefix === '+' ? 'rgba(63,185,80,0.08)' : 'transparent' }}>
              <span className="w-8 text-right text-[#484f58] pr-2 select-none flex-shrink-0">{line.num}</span>
              <span className={`w-3 text-center flex-shrink-0 ${line.prefix === '+' ? 'text-[#3fb950]' : 'text-transparent'}`}>{line.prefix}</span>
              <span style={{ color: line.color }}>{line.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🔎 SEARCH BAR
   ════════════════════════════════════════════════════════ */
function SearchBar({ value, onChange, resultCount }) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="px-5 py-3" style={{ borderBottom: '1px solid rgba(48,54,61,0.4)' }}>
      <div className="relative">
        <motion.div className="absolute -inset-[1px] rounded-lg pointer-events-none"
          animate={{ boxShadow: focused ? '0 0 0 2px rgba(168,85,247,0.4), 0 0 15px rgba(168,85,247,0.1)' : '0 0 0 0px transparent' }}
          transition={{ duration: 0.2 }} />
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(22,27,34,0.6)', border: '1px solid rgba(48,54,61,0.6)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={focused ? '#a855f7' : '#484f58'} strokeWidth="2" strokeLinecap="round" className="transition-colors flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Search commits..."
            className="flex-1 bg-transparent text-[12px] terminal-text text-[#e6edf3] placeholder-[#484f58] outline-none" />
          {value && (
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] terminal-text text-[#8b949e] flex-shrink-0">{resultCount} found</motion.span>
          )}
          {value && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => onChange('')}
              className="text-[#484f58] hover:text-[#8b949e] transition-colors flex-shrink-0"
              whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📈 STATS OVERVIEW
   ════════════════════════════════════════════════════════ */
function StatsOverview({ commits }) {
  const totalCommits = commits.length;
  const tagged = commits.filter(c => c.tag).length;
  const authors = [...new Set(commits.map(c => c.author))].length;
  const dates = [...new Set(commits.map(c => c.date))].length;
  const stats = [
    { label: 'Commits', value: totalCommits, color: '#3fb950', icon: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" /></svg>) },
    { label: 'Tagged', value: tagged, color: '#a855f7', icon: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>) },
    { label: 'Authors', value: authors, color: '#f472b6', icon: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>) },
    { label: 'Days', value: dates, color: '#00f0ff', icon: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>) },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
      className="px-5 py-3 flex items-center gap-4 overflow-x-auto" style={{ borderBottom: '1px solid rgba(48,54,61,0.4)' }}>
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }} whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-default flex-shrink-0"
          style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
          <span style={{ color: s.color }}>{s.icon}</span>
          <div className="flex flex-col">
            <motion.span className="text-xs font-bold terminal-text" style={{ color: s.color }}
              key={s.value} initial={{ scale: 1.3 }} animate={{ scale: 1 }}>{s.value}</motion.span>
            <span className="text-[7px] terminal-text text-[#484f58] uppercase tracking-wider">{s.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   🕐 COMMIT NODE
   ════════════════════════════════════════════════════════ */
function CommitNode({ commit, index, isExpanded, onToggle, isLast }) {
  const [isHovered, setIsHovered] = useState(false);
  const nodeColor = commit.tag
    ? commit.tag === 'hotfix' ? '#f85149' : commit.tag === 'love' ? '#f472b6' : '#a855f7'
    : '#3fb950';

  const reversedCommits = useMemo(() => COMMIT_HISTORY.slice().reverse(), []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.06, 2), duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
    >
      {(index === 0 || reversedCommits[index - 1]?.date !== commit.date) && (
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: Math.min(index * 0.06, 2) }}
          className="px-5 py-2.5 flex items-center gap-2"
          style={{ background: 'rgba(22,27,34,0.6)', borderBottom: '1px solid rgba(48,54,61,0.4)' }}>
          <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </motion.svg>
          <span className="text-xs font-semibold text-[#e6edf3]">
            Commits on {new Date(commit.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <motion.div className="flex-1 h-px ml-3"
            style={{ background: 'linear-gradient(90deg, rgba(48,54,61,0.6), transparent)' }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: Math.min(index * 0.06 + 0.2, 2.2), duration: 0.5 }} />
        </motion.div>
      )}

      <motion.div className="group px-5 py-3 flex items-start gap-3 cursor-pointer relative"
        style={{ borderBottom: '1px solid rgba(48,54,61,0.2)' }}
        onClick={onToggle}
        animate={{ backgroundColor: isHovered ? 'rgba(22,27,34,0.4)' : 'transparent' }}
        transition={{ duration: 0.2 }}>
        <motion.div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: nodeColor }}
          initial={{ scaleY: 0 }} animate={{ scaleY: isHovered || isExpanded ? 1 : 0 }} transition={{ duration: 0.2 }} />

        <div className="flex flex-col items-center pt-0.5 shrink-0 relative">
          {index > 0 && <div className="w-[2px] h-3 absolute -top-3" style={{ background: `linear-gradient(to bottom, rgba(48,54,61,0.3), ${nodeColor}40)` }} />}
          <motion.div className="relative" animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <motion.div className="w-3.5 h-3.5 rounded-full border-2 relative z-10"
              style={{ borderColor: nodeColor, background: isExpanded ? nodeColor : `${nodeColor}30` }}
              animate={commit.tag ? { boxShadow: [`0 0 0px ${nodeColor}00`, `0 0 8px ${nodeColor}60`, `0 0 0px ${nodeColor}00`] } : {}}
              transition={{ duration: 2, repeat: Infinity }} />
            {commit.tag && (
              <motion.div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${nodeColor}` }}
                animate={{ scale: [1, 2, 2], opacity: [0.4, 0, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            )}
          </motion.div>
          {!isLast && (
            <motion.div className="w-[2px] flex-1 mt-0.5 min-h-[20px]"
              style={{ background: `linear-gradient(to bottom, ${nodeColor}40, rgba(48,54,61,0.3))` }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ delay: Math.min(index * 0.06 + 0.1, 2.1), duration: 0.3 }} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <motion.p className="text-sm text-[#e6edf3] font-medium truncate transition-colors duration-200"
              style={{ color: isHovered || isExpanded ? '#00f0ff' : '#e6edf3' }}>{commit.message}</motion.p>
            {commit.tag && <CommitTag tag={commit.tag} />}
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8b949e] terminal-text flex-wrap">
            <div className="flex items-center gap-1">
              <motion.div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f472b6, #a855f7)' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </motion.div>
              <span className="text-love-violet font-medium">{commit.author}</span>
            </div>
            <span className="text-[#484f58]">•</span>
            <span>{commit.date}</span>
            <span className="text-[#484f58] ml-auto font-mono text-[10px] hidden sm:inline">{commit.hash}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="ml-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke={isExpanded ? '#00f0ff' : '#484f58'} strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
          <AnimatePresence>
            {isExpanded && <CommitDetail commit={commit} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   📜 SCROLL MARKERS
   ════════════════════════════════════════════════════════ */
function ScrollMarkers({ commits, containerRef }) {
  const [scrollPercent, setScrollPercent] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      if (max > 0) setScrollPercent((scrollTop / max) * 100);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <div className="absolute right-1 top-0 bottom-0 w-1.5 z-10 hidden md:block">
      <div className="h-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <motion.div className="w-full rounded-full"
          style={{ height: `${scrollPercent}%`, background: 'linear-gradient(to bottom, #3fb950, #a855f7, #f472b6)' }}
          transition={{ duration: 0.1 }} />
      </div>
      {commits.map((c, i) => c.tag ? (
        <motion.div key={c.hash} className="absolute right-0 w-1.5 h-1.5 rounded-full"
          style={{ top: `${(i / commits.length) * 100}%`, backgroundColor: c.tag === 'hotfix' ? '#f85149' : '#a855f7', boxShadow: `0 0 4px ${c.tag === 'hotfix' ? '#f85149' : '#a855f7'}` }}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.05 }} />
      ) : null)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   🚀 MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function GitHubCommitLog({ onClose }) {
  const [expandedHash, setExpandedHash] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContributionModal, setShowContributionModal] = useState(false);
  const scrollRef = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 80, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 80, damping: 25 });

  const reversedCommits = useMemo(() => COMMIT_HISTORY.slice().reverse(), []);
  const filteredCommits = useMemo(() => {
    if (!searchQuery.trim()) return reversedCommits;
    const q = searchQuery.toLowerCase();
    return reversedCommits.filter(c =>
      c.message.toLowerCase().includes(q) || c.author.toLowerCase().includes(q) ||
      c.hash.toLowerCase().includes(q) || (c.tag && c.tag.toLowerCase().includes(q)) || c.date.includes(q)
    );
  }, [searchQuery, reversedCommits]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (showContributionModal) setShowContributionModal(false);
        else if (expandedHash) setExpandedHash(null);
        else onClose?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, expandedHash, showContributionModal]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -4);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 4);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      style={{ background: 'rgba(5,5,15,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>

      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute w-[400px] h-[400px] rounded-full"
          style={{ top: '10%', left: '20%', background: 'radial-gradient(circle, rgba(63,185,80,0.06), transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute w-[300px] h-[300px] rounded-full"
          style={{ bottom: '20%', right: '15%', background: 'radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} />
      </div>

      <BranchVisualization commitCount={COMMIT_HISTORY.length} />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 22, stiffness: 150 }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1200, transformStyle: 'preserve-3d' }}
        className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl relative"
      >
        <motion.div className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0"
          animate={{ boxShadow: ['0 0 20px rgba(63,185,80,0.08), 0 0 40px rgba(168,85,247,0.05)', '0 0 30px rgba(63,185,80,0.12), 0 0 60px rgba(168,85,247,0.08)', '0 0 20px rgba(63,185,80,0.08), 0 0 40px rgba(168,85,247,0.05)'] }}
          transition={{ duration: 4, repeat: Infinity }} />

        <div className="relative rounded-2xl overflow-hidden"
          style={{ background: 'rgba(13,17,23,0.98)', border: '1px solid rgba(48,54,61,0.7)' }}>

          <CodeParticles />

          {/* Header */}
          <div className="px-5 py-3.5 flex items-center justify-between relative z-10"
            style={{ borderBottom: '1px solid rgba(48,54,61,0.6)', background: 'rgba(22,27,34,0.6)' }}>
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#e6edf3">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                  <span>love-story</span><span className="text-[#484f58]">/</span><span className="text-love-cyan">commits</span>
                </h3>
                <p className="text-[9px] terminal-text text-[#484f58] flex items-center gap-1.5 mt-0.5">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2" strokeLinecap="round">
                    <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
                  </svg>
                  <span className="text-[#3fb950]">main</span><span>•</span>
                  <span>{COMMIT_HISTORY.length} commits</span><span>•</span>
                  <span className="text-love-pink flex items-center gap-0.5">
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="#f472b6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    {HER_NAME}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button onClick={() => setShowContributionModal(true)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all"
                style={{ background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.3)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="16" y2="21" />
                  <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
                </svg>
                <span className="text-[10px] font-medium text-[#3fb950] terminal-text">Grid</span>
              </motion.button>
              <motion.button onClick={onClose} whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(48,54,61,0.3)', border: '1px solid rgba(48,54,61,0.5)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          <StatsOverview commits={COMMIT_HISTORY} />
          <SearchBar value={searchQuery} onChange={setSearchQuery} resultCount={filteredCommits.length} />

          <div ref={scrollRef} className="overflow-y-auto relative custom-scrollbar"
            style={{ maxHeight: 'calc(90vh - 280px)' }}>
            <ScrollMarkers commits={filteredCommits} containerRef={scrollRef} />
            {filteredCommits.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="1.5" strokeLinecap="round" className="mx-auto mb-3">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M8 11h6" />
                </svg>
                <p className="text-sm text-[#8b949e] terminal-text">No commits match &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-[10px] text-[#484f58] terminal-text mt-1">Try a different search term</p>
              </motion.div>
            ) : (
              filteredCommits.map((commit, i) => (
                <CommitNode key={commit.hash} commit={commit} index={i}
                  isExpanded={expandedHash === commit.hash}
                  isLast={i === filteredCommits.length - 1}
                  onToggle={() => setExpandedHash(expandedHash === commit.hash ? null : commit.hash)} />
              ))
            )}
            {filteredCommits.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: Math.min(filteredCommits.length * 0.06, 2) + 0.3 }}
                className="py-6 text-center">
                <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.15)' }}>
                  <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="#f472b6"
                    animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </motion.svg>
                  <span className="text-[10px] terminal-text text-love-pink">End of commit history — our story continues...</span>
                </motion.div>
              </motion.div>
            )}
          </div>

          <ContributionGraph commitCount={COMMIT_HISTORY.length} onOpenGrid={() => setShowContributionModal(true)} />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="px-5 py-2.5 flex items-center justify-between"
            style={{ background: 'rgba(22,27,34,0.4)', borderTop: '1px solid rgba(48,54,61,0.3)' }}>
            <div className="flex items-center gap-3 text-[8px] terminal-text text-[#484f58]">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded" style={{ background: 'rgba(48,54,61,0.4)', border: '1px solid rgba(48,54,61,0.5)' }}>ESC</kbd>close
              </span><span>•</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded" style={{ background: 'rgba(48,54,61,0.4)', border: '1px solid rgba(48,54,61,0.5)' }}>Click</kbd>expand
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <span className="text-[8px] terminal-text text-[#484f58]">synced with ♥</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ContributionGridModal
        isOpen={showContributionModal}
        onClose={() => setShowContributionModal(false)}
        commitCount={COMMIT_HISTORY.length}
      />
    </motion.div>
  );
}