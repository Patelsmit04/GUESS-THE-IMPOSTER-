import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  emoji: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  highlight?: boolean;
  pulse?: boolean;
  isEliminated?: boolean;
  score?: number;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  emoji,
  name,
  size = 'md',
  highlight = false,
  pulse = false,
  isEliminated = false,
  score,
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl',
    md: 'w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl',
    xl: 'w-20 h-20 sm:w-28 sm:h-28 text-4xl sm:text-5xl',
    '2xl': 'w-24 h-24 sm:w-32 sm:h-32 text-5xl sm:text-6xl'
  };

  return (
    <div className={`flex flex-col items-center gap-1 min-w-0 max-w-full ${className}`} onClick={onClick}>
      <motion.div
        animate={pulse ? { scale: [1, 1.06, 1] } : undefined}
        transition={pulse ? { repeat: Infinity, duration: 1.8 } : undefined}
        className={`relative ${sizeMap[size]} shrink-0 rounded-2xl flex items-center justify-center select-none shadow-xs transition-all
          ${highlight
            ? 'bg-indigo-50 border-2 border-indigo-600 shadow-sm'
            : 'bg-white border-2 border-slate-200 shadow-xs'
          }
          ${isEliminated ? 'opacity-40 grayscale' : ''}
          ${onClick ? 'cursor-pointer hover:border-indigo-400 transition-colors' : ''}
        `}
      >
        <span>{emoji}</span>

        {isEliminated && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl">
            <span className="text-rose-600 font-extrabold text-xl sm:text-2xl">✕</span>
          </div>
        )}

        {score !== undefined && (
          <span className="absolute -bottom-1.5 -right-1 px-1.5 py-0.2 bg-amber-400 text-slate-900 font-black text-[10px] sm:text-[11px] rounded-full border border-amber-300 shadow-xs">
            {score}
          </span>
        )}
      </motion.div>

      {name && (
        <span className={`text-[11px] sm:text-xs md:text-sm font-semibold truncate max-w-[85px] sm:max-w-[100px] text-center ${
          highlight ? 'text-indigo-600 font-bold' : isEliminated ? 'text-slate-400 line-through' : 'text-slate-800'
        }`}>
          {name}
        </span>
      )}
    </div>
  );
};
