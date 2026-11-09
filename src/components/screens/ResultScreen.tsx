import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ConfettiLauncher } from '../common/Confetti';
import { Trophy, Flame, ArrowRight } from 'lucide-react';
import { sound } from '../../services/sound';

export const ResultScreen: React.FC = () => {
  const {
    roundResult,
    players,
    proceedToScorecard
  } = useGame();

  useEffect(() => {
    if (roundResult) {
      if (roundResult.winner === 'CREW') {
        sound.playCrewWin();
      } else {
        sound.playImposterWin();
      }
    }
  }, [roundResult]);

  if (!roundResult) return null;

  const isCrewWin = roundResult.winner === 'CREW';
  const imposterPlayers = players.filter(p => roundResult.imposterIds.includes(p.id));
  const crewPlayers = players.filter(p => !roundResult.imposterIds.includes(p.id));

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none text-center">
      {/* Confetti celebration launcher */}
      <ConfettiLauncher type={isCrewWin ? 'crew' : 'imposter'} />

      {/* Main Victory Card Presentation */}
      <div className="my-auto py-2">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl relative overflow-hidden ${
            isCrewWin
              ? 'bg-gradient-to-b from-indigo-950/80 via-slate-900 to-emerald-950/30 border-emerald-500/50 shadow-emerald-600/20'
              : 'bg-gradient-to-b from-slate-900 via-rose-950/50 to-slate-900 border-rose-500/50 shadow-rose-600/20'
          }`}
        >
          {/* Top Emblem */}
          <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-xl">
            {isCrewWin ? (
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Trophy size={42} />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center text-rose-400">
                <Flame size={42} />
              </div>
            )}
          </div>

          <Badge
            variant={isCrewWin ? 'success' : 'danger'}
            size="md"
            className="mb-2"
          >
            Round {roundResult.roundNumber} Outcome
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-2">
            {isCrewWin ? 'Crew Victory!' : 'Imposter Wins!'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            {roundResult.reason}
          </p>

          {/* Secret Word Reveal Box */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center max-w-sm mx-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Category: {roundResult.categoryName}
            </span>
            <span className="text-xs text-indigo-400 font-semibold block mb-0.5">
              Secret Word Was
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              {roundResult.secretWord}
            </span>
          </div>

          {/* Winning Players Spotlight */}
          <div className="border-t border-slate-800/80 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              {isCrewWin ? 'Victorious Crew (+100 Pts)' : 'Victorious Imposter (+200 Pts)'}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {(isCrewWin ? crewPlayers : imposterPlayers).map(winner => (
                <div key={winner.id} className="flex flex-col items-center">
                  <Avatar emoji={winner.avatar} size="lg" highlight pulse />
                  <span className="text-xs font-bold text-white mt-1">
                    {winner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Action */}
      <div className="mt-auto pt-2">
        <Button
          fullWidth
          size="xl"
          variant="primary"
          rightIcon={<ArrowRight size={22} />}
          onClick={proceedToScorecard}
          className="shadow-indigo-600/40 text-lg font-black py-4"
        >
          View Round Scorecard
        </Button>
      </div>
    </div>
  );
};
