import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'moss' | 'amber' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  variant = 'moss',
  size = 'md',
  className = '',
  id,
  type = 'button',
  disabled = false
}) => {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 font-semibold'
  }[size];

  const variantClasses = {
    moss: 'glass-btn',
    amber: 'glass-btn glass-btn-amber',
    ghost: 'glass-btn glass-btn-ghost'
  }[variant];

  const baseContent = (
    <motion.div
      whileHover={shouldReduceMotion || disabled ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion || disabled ? {} : { scale: 0.97 }}
      className={`inline-flex items-center justify-center font-display tracking-wide ${variantClasses} ${sizeClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a 
        href={href}
        id={id}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className="inline-block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0b] rounded-xl"
        onClick={onClick}
      >
        {baseContent}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block bg-transparent border-0 p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84cc16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0b] rounded-xl"
    >
      {baseContent}
    </button>
  );
};
