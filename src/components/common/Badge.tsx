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
    primary: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    glow: 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
  };

  return (
    <span className={`inline-flex items-center tracking-wide uppercase select-none ${sizeMap[size]} ${variantMap[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

