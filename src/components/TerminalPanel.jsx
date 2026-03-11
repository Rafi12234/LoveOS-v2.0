import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMINAL_COMMANDS, QUICK_COMMANDS, HER_NAME, ANNIVERSARY_DATE } from '../data/relationshipData';
import { useCountdown } from '../hooks/useCountdown';
import confetti from 'canvas-confetti';
import MemoryCarousel from './MemoryCarousel';
import GitHubCommitLog from './GitHubCommitLog';
import LoveLetterModal from './LoveLetterModal';

export default function TerminalPanel() {
  const [history, setHistory] = useState([
    { type: 'system', text: `LoveOS v2.0 Terminal — Welcome, ${HER_NAME}` },
    { type: 'system', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(null); // 'MemoryCarousel' | 'GitHubCommitLog' | 'LoveLetter' | null
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const time = useCountdown(ANNIVERSARY_DATE);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const fireConfetti = useCallback(() => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ['#a855f7', '#f472b6', '#00f0ff'] });
  }, []);

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed || isProcessing) return;

    // Add input to history immediately
    setHistory(prev => [...prev, { type: 'input', text: trimmed }]);
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);
    setInput('');

    if (trimmed === 'clear') {
      setTimeout(() => {
        setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
      }, 400);
      return;
    }

    // Show processing indicator
    setIsProcessing(true);

    // Simulate ~1 second delay like real CMD
    const delay = 600 + Math.random() * 600; // 600-1200ms

    setTimeout(() => {
      const command = TERMINAL_COMMANDS[trimmed];
      if (command) {
        setHistory(prev => {
          const newHistory = [...prev];
          command.output.forEach(line => {
            newHistory.push({ type: 'output', text: line });
          });
          return newHistory;
        });

        // Handle component overlays
        if (command.component === 'MemoryCarousel') {
          setTimeout(() => setActiveOverlay('MemoryCarousel'), 300);
        } else if (command.component === 'GitHubCommitLog') {
          setTimeout(() => setActiveOverlay('GitHubCommitLog'), 300);
        } else if (command.component === 'StatusDisplay') {
          // Render status inline
          const stats = [];
          if (time.isPast) {
            stats.push(
              '',
              '┌── System Status ─────────────────────────┐',
              `│  Anniversary: ${ANNIVERSARY_DATE}                │`,
              `│  Years of love: ${time.years}                       │`,
              `│  Days together: ${time.totalDays.toLocaleString().padEnd(24)}│`,
              `│  Hours of happiness: ${time.totalHours.toLocaleString().padEnd(19)}│`,
              `│  Minutes of love: ${time.totalMinutes.toLocaleString().padEnd(22)}│`,
              '│  System health: ❤ EXCELLENT              │',
              '│  Uptime: 100%                             │',
              '└───────────────────────────────────────────┘',
            );
          } else {
            stats.push(
              '',
              '┌── System Status ─────────────────────────┐',
              `│  Next Anniversary: ${ANNIVERSARY_DATE}           │`,
              `│  Countdown: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s       │`,
              '│  System health: ❤ EXCELLENT              │',
              '│  Uptime: 100%                             │',
              '└───────────────────────────────────────────┘',
            );
          }
          setHistory(prev => [
            ...prev,
            ...stats.map(line => ({ type: 'output', text: line })),
          ]);
        }

        // Handle actions
        if (command.action === 'openLoveLetter') {
          setTimeout(() => setActiveOverlay('LoveLetter'), 300);
        } else if (command.action === 'celebrateHugs') {
          fireConfetti();
        }
      } else {
        setHistory(prev => [
          ...prev,
          {
            type: 'error',
            text: `Command not found: "${trimmed}". Type "help" for available commands.`,
          },
        ]);
      }
      setIsProcessing(false);
    }, delay);
  }, [isProcessing, time, fireConfetti]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl overflow-hidden flex flex-col w-full"
        style={{ height: 'calc(100vh - 160px)', minHeight: '400px' }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="ml-2 terminal-text text-xs text-slate-500">loveos@terminal ~ $</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="terminal-text text-[10px] text-slate-600">connected</span>
          </div>
        </div>

        {/* Output area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-1 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="terminal-text text-sm leading-relaxed">
              {line.type === 'input' ? (
                <div className="flex gap-2">
                  <span className="text-love-cyan shrink-0">❯</span>
                  <span className="text-white">{line.text}</span>
                </div>
              ) : line.type === 'error' ? (
                <span className="text-red-400">{line.text}</span>
              ) : line.type === 'system' ? (
                <span className="text-love-violet">{line.text}</span>
              ) : (
                <span className="text-slate-300 whitespace-pre">{line.text}</span>
              )}
            </div>
          ))}

          {/* Processing indicator */}
          {isProcessing && (
            <div className="flex gap-2 items-center terminal-text text-sm">
              <span className="text-love-violet">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⠋ Processing...
                </motion.span>
              </span>
            </div>
          )}

          {/* Active input line */}
          {!isProcessing && (
            <div className="flex gap-2 items-center terminal-text text-sm">
              <span className="text-love-cyan shrink-0">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-love-cyan"
                autoFocus
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className="w-2 h-4 bg-love-cyan cursor-blink" />
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick commands */}
        <div className="px-4 py-3 border-t border-white/5 flex flex-wrap gap-2">
          {QUICK_COMMANDS.map(cmd => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              disabled={isProcessing}
              className="px-3 py-1 rounded-lg text-xs terminal-text
                         bg-white/5 text-slate-400 hover:text-love-cyan
                         hover:bg-love-cyan/10 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cmd}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overlays */}
      <AnimatePresence>
        {activeOverlay === 'MemoryCarousel' && (
          <MemoryCarousel onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'GitHubCommitLog' && (
          <GitHubCommitLog onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'LoveLetter' && (
          <LoveLetterModal
            isOpen={true}
            onClose={() => setActiveOverlay(null)}
            onReveal={fireConfetti}
          />
        )}
      </AnimatePresence>
    </>
  );
}
