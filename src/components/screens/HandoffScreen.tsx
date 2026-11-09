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
    <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full px-4 py-8 select-none text-center">
      {/* Privacy Shield Icon with gentle pulsing glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative mb-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/10">
          <Shield size={40} />
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <span className="text-xs font-black tracking-widest text-indigo-400 uppercase block mb-2">
          Player {currentHandoffIndex + 1} of {players.length}
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Pass Phone To
        </h2>

        {/* Current Player Card Focus */}
        <div className="my-5 p-5 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center gap-3">
          <Avatar emoji={currentPlayer.avatar} size="xl" highlight pulse />
          <span className="text-2xl sm:text-3xl font-black text-white">
            {currentPlayer.name}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs">
          <EyeOff size={14} className="text-amber-400" />
          <span>Keep your screen tilted away from others</span>
        </div>
      </motion.div>

      {/* I am ready button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <Button
          fullWidth
          size="xl"
          variant="primary"
          rightIcon={<ArrowRight size={22} />}
          onClick={handleReady}
          className="py-4 text-lg font-black shadow-indigo-600/30"
        >
          I'm {currentPlayer.name}, Show My Card
        </Button>
      </motion.div>
    </div>
  );
};

