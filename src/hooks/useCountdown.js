import { useState, useEffect } from 'react';

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate + 'T00:00:00');
  const start = new Date(targetDate + 'T00:00:00');
  const diff = target.getTime() - now.getTime();

  // If in the future, show countdown
  if (diff > 0) {
    return {
      isPast: false,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  // If today or past, show stats
  const elapsed = now.getTime() - start.getTime();
  const totalDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(elapsed / (1000 * 60 * 60));
  const totalMinutes = Math.floor(elapsed / (1000 * 60));

  return {
    isPast: true,
    totalDays,
    totalHours,
    totalMinutes,
    years: Math.floor(totalDays / 365),
  };
}
