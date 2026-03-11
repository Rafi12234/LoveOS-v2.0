import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TERMINAL_COMMANDS, QUICK_COMMANDS, HER_NAME } from '../data/relationshipData';

export default function TerminalPanel({ onAction }) {
  const [history, setHistory] = useState([
    { type: 'system', text: `LoveOS v2.0 Terminal — Welcome, ${HER_NAME}` },
    { type: 'system', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: trimmed }];

    if (trimmed === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
      setInput('');
      setCmdHistory(prev => [trimmed, ...prev]);
      setHistoryIdx(-1);
      return;
    }

    const command = TERMINAL_COMMANDS[trimmed];
    if (command) {
      command.output.forEach(line => {
        newHistory.push({ type: 'output', text: line });
      });
      if (command.action) {
        onAction(command.action);
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${trimmed}". Type "help" for available commands.`,
      });
    }

    setHistory(newHistory);
    setInput('');
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col"
      style={{ maxHeight: '70vh' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 terminal-text text-xs text-slate-500">loveos@terminal ~ $</span>
      </div>

      {/* Output area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-1 min-h-[300px] cursor-text"
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

        {/* Active input line */}
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
        <div ref={endRef} />
      </div>

      {/* Quick commands */}
      <div className="px-4 py-3 border-t border-white/5 flex flex-wrap gap-2">
        {QUICK_COMMANDS.map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-3 py-1 rounded-lg text-xs terminal-text
                       bg-white/5 text-slate-400 hover:text-love-cyan
                       hover:bg-love-cyan/10 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
