import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { sound } from '../../services/sound';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'gold' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  playClickSound?: boolean;
  debounceMs?: number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  playClickSound = true,
  debounceMs = 350,
  onClick,
  disabled,
  className = '',
  ...props
}) => {
  const lastClickRef = useRef<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const now = Date.now();
    if (now - lastClickRef.current < debounceMs) {
      e.preventDefault();
      return;
    }
    lastClickRef.current = now;

    if (playClickSound) {
      sound.playClick();
      sound.triggerHaptic('light');
    }
    if (onClick) onClick(e);
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-bold tracking-wide rounded-2xl transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[42px]',
    md: 'text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 gap-2 min-h-[46px]',
    lg: 'text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 gap-2.5 min-h-[50px] sm:min-h-[54px]',
    xl: 'text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 gap-3 min-h-[54px] sm:min-h-[60px]'
  };

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm border border-indigo-700/20 active:translate-y-0.5',
    secondary: 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 shadow-sm active:translate-y-0.5',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm border border-rose-700/20 active:translate-y-0.5',
    gold: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-sm border border-amber-600/20 active:translate-y-0.5',
    ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200',
    glass: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200 shadow-sm'
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.015 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
