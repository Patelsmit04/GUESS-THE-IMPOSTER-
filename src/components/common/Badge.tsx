import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'success' | 'warning' | 'neutral' | 'glow';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = ''
}) => {
  const sizeMap = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-semibold rounded-lg',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold rounded-xl'
  };

  const variantMap = {
    primary: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40',
    danger: 'bg-rose-500/20 text-rose-300 border border-rose-500/40',
    success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
    glow: 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-200 border border-indigo-400/50 shadow-sm shadow-indigo-500/20'
  };

  return (
    <span className={`inline-flex items-center tracking-wide uppercase select-none ${sizeMap[size]} ${variantMap[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

