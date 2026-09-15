import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Move } from 'lucide-react';

interface DraggableGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'moss';
  dragBounds?: { top?: number; left?: number; right?: number; bottom?: number };
  dragElastic?: number;
  initialRotation?: number;
}

export const DraggableGlassCard: React.FC<DraggableGlassCardProps> = ({
  children,
  className = '',
  glowColor = 'moss',
  dragBounds = { top: -120, left: -140, right: 140, bottom: 120 },
  dragElastic = 0.35,
  initialRotation = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isDragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xNorm = (x / rect.width - 0.5) * 2;
    const yNorm = (y / rect.height - 0.5) * 2;

    setTilt({
      x: -yNorm * 9,
      y: xNorm * 9,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      opacity: 0.32
    });
  };

  const handleMouseLeave = () => {
    setTilt(prev => ({ ...prev, x: 0, y: 0, opacity: 0 }));
  };

  const glowBorder = glowColor === 'amber'
    ? 'border-[#f59e0b]/25 hover:border-[#f59e0b]/50 shadow-[0_15px_35px_rgba(0,0,0,0.7)]'
    : 'border-[#84cc16]/25 hover:border-[#84cc16]/50 shadow-[0_15px_35px_rgba(0,0,0,0.7)]';

  return (
    <motion.div
      ref={cardRef}
      drag={!shouldReduceMotion}
      dragConstraints={dragBounds}
      dragElastic={dragElastic}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ rotate: initialRotation }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileDrag={{
        scale: 1.06,
        zIndex: 50,
        rotate: initialRotation + (initialRotation >= 0 ? 3 : -3),
        boxShadow: glowColor === 'amber'
          ? '0 30px 60px -10px rgba(0,0,0,0.9), 0 0 35px rgba(217, 119, 6, 0.35)'
          : '0 30px 60px -10px rgba(0,0,0,0.9), 0 0 35px rgba(132, 204, 22, 0.35)'
      }}
      style={{
        transformStyle: 'preserve-3d',
        transform: (!shouldReduceMotion && !isDragging)
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className={`relative select-none overflow-hidden rounded-2xl glass-panel ${glowBorder} ${className}`}
    >
      {/* Dynamic Specular Glare */}
      {!shouldReduceMotion && !isDragging && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{
            opacity: tilt.opacity,
            background: `radial-gradient(circle 260px at ${tilt.glareX}% ${tilt.glareY}%, rgba(254, 243, 199, 0.3), transparent 70%)`
          }}
        />
      )}

      {/* Tactile Grab Indicator Pill */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-900/60 border border-stone-700/40 text-[10px] uppercase font-mono tracking-wider text-stone-300 backdrop-blur-md opacity-70 hover:opacity-100 transition-opacity pointer-events-none">
        <Move className="w-3 h-3 text-[#84cc16]" />
        <span>Drag</span>
      </div>

      <div 
        className="relative z-0 h-full p-5"
        style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(12px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
};
