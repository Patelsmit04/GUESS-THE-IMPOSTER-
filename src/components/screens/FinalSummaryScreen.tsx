import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ConfettiLauncher } from '../common/Confetti';
import { Trophy, RotateCcw, Users, Flame, ShieldCheck } from 'lucide-react';
import { sound } from '../../services/sound';

export const FinalSummaryScreen: React.FC = () => {
  const {
    players,
    sessionStats,
    resetEntireGame,
    setPhase
  } = useGame();

  useEffect(() => {
    sound.playCrewWin();
  }, []);

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const champion = sorted[0];
  const runnerUp = sorted[1];
  const thirdPlace = sorted[2];

  const handleRematch = () => {
    sound.playClick();
    resetEntireGame();
  };

  const handleNewSession = () => {
    sound.playClick();
    setPhase('HOME');
  };

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 select-none text-center">
      {/* Trophy Shower Confetti */}
      <ConfettiLauncher type="trophy" />

      {/* Header */}
      <div className="mb-2 sm:mb-4">
        <Badge variant="glow" size="md" className="mb-1.5">
          Match Championship
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Final Tournament Results
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          All rounds complete! Bow down to the master of deception and deduction!
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="my-auto py-1 sm:py-2">
        <div className="flex items-end justify-center gap-1.5 sm:gap-4 mb-4 sm:mb-6">
          {/* 2nd Place */}
          {runnerUp && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 min-w-0 max-w-[95px] sm:max-w-[130px] flex flex-col items-center"
            >
              <Avatar emoji={runnerUp.avatar} size="md" />
              <span className="text-[11px] sm:text-xs font-bold text-white mt-1 truncate max-w-full px-0.5">
                {runnerUp.name}
              </span>
              <span className="text-[10px] sm:text-xs font-black text-slate-300">{runnerUp.score} pts</span>
              <div className="w-full h-14 sm:h-20 rounded-t-2xl bg-gradient-to-t from-slate-900 to-slate-800 border-t-2 border-slate-500/50 flex items-center justify-center text-sm sm:text-lg font-black text-slate-400 mt-1.5 shadow-lg">
                🥈 2nd
              </div>
            </motion.div>
          )}

          {/* 1st Place Champion */}
          {champion && (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', damping: 15 }}
              className="flex-1 min-w-0 max-w-[110px] sm:max-w-[150px] flex flex-col items-center z-10"
            >
              <div className="relative">
                <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 text-xl sm:text-2xl animate-bounce">
                  👑
                </div>
                <Avatar emoji={champion.avatar} size="lg" highlight pulse />
              </div>
              <span className="text-xs sm:text-sm font-black text-amber-300 mt-1 truncate max-w-full px-0.5">
                {champion.name}
              </span>
              <span className="text-xs sm:text-sm font-black text-white">{champion.score} pts</span>
              <div className="w-full h-20 sm:h-28 rounded-t-2xl bg-gradient-to-t from-amber-950 via-slate-900 to-amber-900/60 border-t-2 border-amber-400 flex flex-col items-center justify-center text-sm sm:text-xl font-black text-amber-400 mt-1.5 shadow-2xl shadow-amber-500/20">
                <Trophy size={20} className="sm:w-6 sm:h-6 text-amber-400 mb-0.5" />
                <span className="text-xs sm:text-base">1st MVP</span>
              </div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {thirdPlace && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 min-w-0 max-w-[95px] sm:max-w-[130px] flex flex-col items-center"
            >
              <Avatar emoji={thirdPlace.avatar} size="md" />
              <span className="text-[11px] sm:text-xs font-bold text-white mt-1 truncate max-w-full px-0.5">
                {thirdPlace.name}
              </span>
              <span className="text-[10px] sm:text-xs font-black text-slate-300">{thirdPlace.score} pts</span>
              <div className="w-full h-11 sm:h-14 rounded-t-2xl bg-gradient-to-t from-slate-900 to-amber-950/40 border-t-2 border-amber-700/50 flex items-center justify-center text-xs sm:text-lg font-black text-amber-600 mt-1.5 shadow-lg">
                🥉 3rd
              </div>
            </motion.div>
          )}
        </div>

        {/* Match Statistics Summary */}
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-around text-center mb-3 sm:mb-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Rounds
            </span>
            <span className="text-base sm:text-lg font-black text-white">
              {sessionStats.totalRoundsPlayed}
            </span>
          </div>

          <div className="w-px h-7 sm:h-8 bg-slate-800" />

          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Crew Wins
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-300">
              {sessionStats.crewWins}
            </span>
          </div>

          <div className="w-px h-7 sm:h-8 bg-slate-800" />

          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Flame size={12} /> Imposter Wins
            </span>
            <span className="text-base sm:text-lg font-black text-rose-300">
              {sessionStats.imposterWins}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto space-y-2 sm:space-y-2.5 pt-2 pb-safe">
        <Button
          fullWidth
          size="lg"
          variant="primary"
          leftIcon={<RotateCcw size={20} />}
          onClick={handleRematch}
          className="shadow-indigo-600/40 text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          Play Again (Rematch)
        </Button>

        <Button
          fullWidth
          size="md"
          variant="secondary"
          leftIcon={<Users size={18} />}
          onClick={handleNewSession}
        >
          New Game / Change Players
        </Button>
      </div>
    </div>
  );
};
