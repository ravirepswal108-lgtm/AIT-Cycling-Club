import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TiltGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'moss' | 'neutral';
  onClick?: () => void;
}

export const TiltGlassCard: React.FC<TiltGlassCardProps> = ({
  children,
  className = '',
  glowColor = 'moss',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize -1 to 1
    const xNorm = (x / rect.width - 0.5) * 2;
    const yNorm = (y / rect.height - 0.5) * 2;

    // Subtle 3D tilt angles (max 8 degrees)
    setRotateX(-yNorm * 7);
    setRotateY(xNorm * 7);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const glowBorder = {
    moss: 'hover:border-[#84cc16]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(132,204,22,0.15)]',
    amber: 'hover:border-[#d97706]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(217,119,6,0.18)]',
    neutral: 'hover:border-stone-400/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
  }[glowColor];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transform: shouldReduceMotion ? 'none' : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, box-shadow 0.25s'
      }}
      className={`relative overflow-hidden rounded-2xl glass-panel transition-all duration-300 ${glowBorder} ${className}`}
    >
      {/* Specular Glare Reflection Layer */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(254, 243, 199, 0.28), transparent 70%)`
          }}
        />
      )}

      {/* Card Content with 3D Pop depth */}
      <div 
        className="relative z-0 h-full"
        style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(15px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
};
