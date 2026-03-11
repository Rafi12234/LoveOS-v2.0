import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(lines, speed = 40, lineDelay = 600) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    // Empty line — push immediately and move to next
    if (currentLine === '') {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, '']);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay / 2);
      return () => clearTimeout(timer);
    }

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev];
          if (updated.length <= currentLineIndex) {
            updated.push(currentLine.charAt(0));
          } else {
            updated[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          }
          return updated;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    // Line complete, move to next after delay
    const timer = setTimeout(() => {
      setCurrentLineIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }, lineDelay);
    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, lines, speed, lineDelay]);

  const reset = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsComplete(false);
  }, []);

  return { displayedLines, isComplete, reset };
}
