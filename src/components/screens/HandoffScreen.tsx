import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Shield, EyeOff, ArrowRight } from 'lucide-react';
import { sound } from '../../services/sound';

export const HandoffScreen: React.FC = () => {
  const { players, currentHandoffIndex, setPhase } = useGame();
  const currentPlayer = players[currentHandoffIndex];

  if (!currentPlayer) return null;

  const handleReady = () => {
    sound.playClick();
    setPhase('SECRET_REVEAL');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-3 sm:px-4 py-2 sm:py-6 select-none text-center">
      {/* Privacy Shield Icon */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 22 }}
        className="relative mb-3 sm:mb-5 shrink-0"
      >
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
          <Shield size={32} className="sm:w-9 sm:h-9" />
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 sm:mb-6 w-full"
      >
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-600 uppercase block mb-1">
          Player {currentHandoffIndex + 1} of {players.length}
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight mb-1">
          Pass Phone To
        </h2>

        {/* Current Player Card Focus */}
        <div className="my-3 sm:my-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col items-center gap-2 sm:gap-3">
          <Avatar emoji={currentPlayer.avatar} size="lg" highlight pulse />
          <span className="text-xl sm:text-3xl font-black text-slate-900 truncate max-w-[220px]">
            {currentPlayer.name}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] sm:text-xs">
          <EyeOff size={13} className="text-amber-500 shrink-0" />
          <span>Keep screen tilted away from others</span>
        </div>
      </motion.div>

      {/* I am ready button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full max-w-sm"
      >
        <Button
          fullWidth
          size="xl"
          variant="primary"
          rightIcon={<ArrowRight size={20} />}
          onClick={handleReady}
          className="py-3.5 sm:py-4 text-base sm:text-lg font-black"
        >
          I'm {currentPlayer.name}, Show My Card
        </Button>
      </motion.div>
    </div>
  );
};
