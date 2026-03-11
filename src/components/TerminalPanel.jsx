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

  return null;
}
