import React, { useEffect, useState } from 'react';
import { EVENT_TIMESTAMP } from '../../config/constants';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const difference = EVENT_TIMESTAMP - Date.now();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPast: false
  };
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {timeUnits.map((unit) => (
          <motion.div
            key={unit.label}
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative overflow-hidden rounded-2xl glass-panel-amber p-4 sm:p-5 md:p-6 text-center border border-[#d97706]/30 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(254,243,199,0.25)]"
          >
            {/* Top glass highlight strip */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Value Display */}
            <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#fef3c7] drop-shadow-[0_4px_12px_rgba(217,119,6,0.3)] tabular-nums">
              {pad(unit.value)}
            </div>

            {/* Unit Label */}
            <div className="mt-1 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#d97706]">
              {unit.label}
            </div>

            {/* Subtle glow dot */}
            <div className="absolute bottom-2.5 right-3 w-1.5 h-1.5 rounded-full bg-[#84cc16] opacity-75 animate-pulse" />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-400">
        <span className="inline-block w-2 h-2 rounded-full bg-[#84cc16] animate-ping" />
        <span>Target: 30 December 2026, 06:00 AM IST · AIT Campus, Dighi Hills, Pune</span>
      </div>
    </div>
  );
};
