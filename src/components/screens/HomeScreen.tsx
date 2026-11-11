import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Button } from '../common/Button';
import { Play, HelpCircle, Trophy, Sparkles, Users, Flame } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setPhase, sessionStats, setIsHowToPlayOpen } = useGame();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-3 sm:py-6 max-w-xl mx-auto w-full select-none text-center">
      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 shadow-inner"
      >
        <Sparkles size={13} className="text-indigo-400 animate-spin" />
        <span>Ultimate Pass & Play Social Game</span>
      </motion.div>

      {/* Main Hero Card presentation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative mb-5 sm:mb-8"
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-rose-500/20 rounded-3xl blur-2xl -z-10 pointer-events-none" />

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
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2.5 sm:mb-3 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/40 flex items-center justify-center text-4xl sm:text-6xl shadow-2xl shadow-indigo-500/20"
          >
            🎭
          </motion.div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none mb-2 sm:mb-3">
          Guess The <br />
          <span className="bg-gradient-to-r from-rose-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            Imposter
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-sm sm:max-w-md mx-auto leading-relaxed px-1">
          One secret word. One sneaky imposter. Give clever clues, spot the bluffs, and vote out the deceiver before it's too late!
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8"
      >
        <Button
          fullWidth
          size="xl"
          variant="primary"
          leftIcon={<Play fill="currentColor" size={20} />}
          onClick={() => setPhase('SETUP')}
          className="shadow-indigo-600/40 text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          Start Party Game
        </Button>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <Button
            size="lg"
            variant="secondary"
            leftIcon={<HelpCircle size={16} className="text-indigo-400" />}
            onClick={() => setIsHowToPlayOpen(true)}
          >
            How to Play
          </Button>

          <Button
            size="lg"
            variant="glass"
            leftIcon={<Users size={16} className="text-rose-400" />}
            onClick={() => setPhase('SETUP')}
          >
            Player Setup
          </Button>
        </div>
      </motion.div>

      {/* Session Stats bar if any rounds played */}
      {sessionStats.totalRoundsPlayed > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-around text-center shadow-lg"
        >
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Rounds
            </span>
            <span className="text-base sm:text-lg font-black text-white">
              {sessionStats.totalRoundsPlayed}
            </span>
          </div>

          <div className="w-px h-7 bg-slate-800" />

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Trophy size={11} /> Crew Wins
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-300">
              {sessionStats.crewWins}
            </span>
          </div>

          <div className="w-px h-7 bg-slate-800" />

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold text-rose-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Flame size={11} /> Imposter Wins
            </span>
            <span className="text-base sm:text-lg font-black text-rose-300">
              {sessionStats.imposterWins}
            </span>
          </div>
        </motion.div>
      )}

      {/* Footer Info */}
      <div className="mt-4 sm:mt-6 text-[11px] sm:text-xs text-slate-400 flex items-center gap-2">
        <span>No internet needed</span>
        <span>•</span>
        <span>Pass 1 phone</span>
        <span>•</span>
        <span>3–10 Players</span>
      </div>
    </div>
  );
};
