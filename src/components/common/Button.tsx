import React from 'react';
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
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  playClickSound = true,
  onClick,
  disabled,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (playClickSound) {
      sound.playClick();
      sound.triggerHaptic('light');
    }
    if (onClick) onClick(e);
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-bold tracking-wide rounded-2xl transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-5 py-3 gap-2 min-h-[46px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[52px]',
    xl: 'text-lg px-8 py-4 gap-3 min-h-[60px]'
  };

  const variantStyles = {
    primary: 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 border-t border-indigo-400 hover:from-indigo-400 hover:to-indigo-500 active:translate-y-0.5 active:shadow-indigo-600/10',
    secondary: 'bg-slate-800 text-slate-100 border border-slate-700/80 hover:bg-slate-700/80 active:bg-slate-900 active:translate-y-0.5 shadow-md shadow-black/20',
    danger: 'bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-600/30 border-t border-rose-400 hover:from-rose-400 hover:to-rose-500 active:translate-y-0.5 active:shadow-rose-600/10',
    gold: 'bg-gradient-to-b from-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/30 border-t border-yellow-200 hover:from-amber-300 hover:to-yellow-400 active:translate-y-0.5',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60 active:bg-slate-800',
    glass: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/15 active:bg-white/5 shadow-lg'
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
