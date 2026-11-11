import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Play, Trophy, RotateCcw, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';

export const ScorecardScreen: React.FC = () => {
  const {
    players,
    currentRound,
    proceedToNextRound,
    finishGameSummary,
    resetEntireGame
  } = useGame();

  useEffect(() => {
    sound.playScoreUp();
  }, []);

  // Sort players by total score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 select-none">
      {/* Title */}
      <div className="text-center mb-3 sm:mb-5">
        <Badge variant="glow" size="sm" className="mb-1">
          Round {currentRound} Complete
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Scoreboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Points awarded for catching the imposter, successful bluffs, and accurate votes!
        </p>
      </div>

      {/* Scoreboard Table / Cards */}
      <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6 overflow-y-auto pr-1 max-h-[48dvh] sm:max-h-[54dvh]">
        {sortedPlayers.map((player, rank) => {
          const isLeader = rank === 0 && player.score > 0;
          const isImposter = player.role === 'IMPOSTER';

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rank * 0.08 }}
              className={`p-2.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between shadow-lg transition-all ${
                isLeader
                  ? 'bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-amber-400/70 shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Rank & Avatar */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 mr-2">
                <div className="w-6 sm:w-7 text-center font-black text-xs sm:text-sm text-slate-400 flex-shrink-0">
                  {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                </div>

                <div className="flex-shrink-0">
                  <Avatar emoji={player.avatar} size="sm" />
                </div>

                <div className="text-left min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-base font-bold text-white truncate max-w-[110px] sm:max-w-[200px]">
                      {player.name}
                    </span>
                    {isLeader && (
                      <span className="flex-shrink-0 px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 text-[9px] sm:text-[10px] font-black border border-amber-400/30">
                        Leader
                      </span>
                    )}
                  </div>

                  {/* Role in this round */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {isImposter ? (
                      <span className="text-[10px] sm:text-[11px] font-bold text-rose-400 flex items-center gap-0.5">
                        <Flame size={11} /> Imposter
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <ShieldCheck size={11} /> Crew
                      </span>
                    )}
                    <span className="text-slate-500 text-[10px]">•</span>
                    <span className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                      +{player.roundScore} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Points */}
              <div className="text-right flex-shrink-0">
                <span className="text-lg sm:text-2xl font-black text-white block">
                  {player.score}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions: Option to play more rounds or conclude and view final standings */}
      <div className="mt-auto space-y-2 sm:space-y-3 pt-2 pb-safe">
        <Button
          fullWidth
          size="lg"
          variant="primary"
          leftIcon={<Play size={20} fill="currentColor" />}
          rightIcon={<Sparkles size={18} />}
          onClick={proceedToNextRound}
          className="shadow-indigo-600/40 text-sm sm:text-base font-black py-3.5 sm:py-4"
        >
          Continue to Next Round (Round {currentRound + 1})
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <Button
            size="md"
            variant="gold"
            leftIcon={<Trophy size={18} />}
            onClick={finishGameSummary}
          >
            End Game & View Winner
          </Button>

          <Button
            size="md"
            variant="secondary"
            leftIcon={<RotateCcw size={16} />}
            onClick={resetEntireGame}
          >
            Reset Scores
          </Button>
        </div>
      </div>
    </div>
  );
};
