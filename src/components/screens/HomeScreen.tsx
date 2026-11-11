import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Button } from '../common/Button';
import { Play, HelpCircle, Sparkles, Users } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setPhase, setIsHowToPlayOpen } = useGame();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-8 max-w-xl mx-auto w-full select-none text-center">
      {/* Subtle Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 shadow-xs"
      >
        <Sparkles size={13} className="text-indigo-600" />
        <span>Ultimate Pass & Play Social Game</span>
      </motion.div>

      {/* Main Hero presentation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative mb-6 sm:mb-8"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{
              rotate: [0, 2, -2, 0],
              y: [0, -5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut'
            }}
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 rounded-3xl bg-white border-2 border-slate-200 flex items-center justify-center text-4xl sm:text-6xl shadow-md text-slate-800"
          >
            🎭
          </motion.div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 uppercase leading-none mb-2 sm:mb-3">
          Guess The <br />
          <span className="text-rose-600">
            Imposter
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-sm sm:max-w-md mx-auto leading-relaxed px-1">
          One secret word. One sneaky imposter. Give clever clues, spot the bluffs, and vote out the deceiver before it's too late!
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full space-y-2.5 sm:space-y-3.5"
      >
        <Button
          fullWidth
          size="xl"
          variant="primary"
          leftIcon={<Play fill="currentColor" size={20} />}
          onClick={() => setPhase('SETUP')}
          className="text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          Start Party Game
        </Button>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <Button
            size="lg"
            variant="secondary"
            leftIcon={<HelpCircle size={16} className="text-indigo-600" />}
            onClick={() => setIsHowToPlayOpen(true)}
          >
            How to Play
          </Button>

          <Button
            size="lg"
            variant="secondary"
            leftIcon={<Users size={16} className="text-rose-600" />}
            onClick={() => setPhase('SETUP')}
          >
            Player Setup
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
