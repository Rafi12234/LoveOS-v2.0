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

export function useElapsedTime(startDate) {
  const [elapsed, setElapsed] = useState(calculateElapsed(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateElapsed(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return elapsed;
}

function calculateTimeLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate + 'T00:00:00');
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
  const elapsed = now.getTime() - target.getTime();
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

function calculateElapsed(startDate) {
  const now = new Date();
  const start = new Date(startDate + 'T00:00:00');

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}
