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
    sm: 'w-10 h-10 text-xl',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-28 h-28 text-5xl',
    '2xl': 'w-36 h-36 text-6xl'
  };

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`} onClick={onClick}>
      <motion.div
        animate={pulse ? { scale: [1, 1.08, 1] } : undefined}
        transition={pulse ? { repeat: Infinity, duration: 1.8 } : undefined}
        className={`relative ${sizeMap[size]} rounded-2xl flex items-center justify-center select-none shadow-md
          ${highlight
            ? 'bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border-2 border-indigo-400 shadow-indigo-500/30 shadow-lg ring-4 ring-indigo-500/20'
            : 'bg-slate-800/90 border border-slate-700/80 shadow-black/30'
          }
          ${isEliminated ? 'opacity-40 grayscale' : ''}
          ${onClick ? 'cursor-pointer hover:border-indigo-400 transition-colors' : ''}
        `}
      >
        <span>{emoji}</span>

        {isEliminated && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
            <span className="text-rose-500 font-extrabold text-2xl">✕</span>
          </div>
        )}

        {score !== undefined && (
          <span className="absolute -bottom-2 -right-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[11px] rounded-full border border-amber-300 shadow-sm">
            {score}
          </span>
        )}
      </motion.div>

      {name && (
        <span className={`text-xs md:text-sm font-semibold truncate max-w-[90px] text-center ${
          highlight ? 'text-indigo-300 font-bold' : isEliminated ? 'text-slate-500 line-through' : 'text-slate-200'
        }`}>
          {name}
        </span>
      )}
    </div>
  );
};

