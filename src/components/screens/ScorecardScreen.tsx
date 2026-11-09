import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ArrowRight, RotateCcw, Flame, ShieldCheck } from 'lucide-react';
import { sound } from '../../services/sound';

export const ScorecardScreen: React.FC = () => {
  const {
    players,
    currentRound,
    settings,
    proceedToNextRoundOrSummary,
    resetEntireGame
  } = useGame();

  useEffect(() => {
    sound.playScoreUp();
  }, []);

  // Sort players by total score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const isFinalRound = currentRound >= settings.totalRounds;

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none">
      {/* Title */}
      <div className="text-center mb-5">
        <Badge variant="glow" size="sm" className="mb-1">
          Round {currentRound} of {settings.totalRounds} Complete
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Scoreboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Points awarded for catching the imposter, successful bluffs, and accurate votes!
        </p>
      </div>

      {/* Scoreboard Table / Cards */}
      <div className="space-y-2.5 mb-6 overflow-y-auto pr-1">
        {sortedPlayers.map((player, rank) => {
          const isLeader = rank === 0 && player.score > 0;
          const isImposter = player.role === 'IMPOSTER';

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rank * 0.08 }}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between shadow-lg transition-all ${
                isLeader
                  ? 'bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-amber-400/70 shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Rank & Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-7 text-center font-black text-sm text-slate-400">
                  {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                </div>

                <Avatar emoji={player.avatar} size="sm" />

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {player.name}
                    </span>
                    {isLeader && (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black border border-amber-400/30">
                        Leader
                      </span>
                    )}
                  </div>

                  {/* Role in this round */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {isImposter ? (
                      <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                        <Flame size={12} /> Imposter
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck size={12} /> Crew
                      </span>
                    )}
                    <span className="text-slate-400 text-[10px]">•</span>
                    <span className="text-[11px] text-slate-300">
                      +{player.roundScore} this round
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Points */}
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-white block">
                  {player.score}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Pts
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-2 pt-2">
        <Button
          fullWidth
          size="lg"
          variant="primary"
          rightIcon={<ArrowRight size={20} />}
          onClick={proceedToNextRoundOrSummary}
          className="shadow-indigo-600/40 text-base font-black py-4"
        >
          {isFinalRound ? 'View Final Tournament Results 🏆' : `Start Round ${currentRound + 1}`}
        </Button>

        <div className="flex items-center justify-center">
          <button
            onClick={resetEntireGame}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1 cursor-pointer flex items-center gap-1"
          >
            <RotateCcw size={12} />
            <span>Restart Match from Round 1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
