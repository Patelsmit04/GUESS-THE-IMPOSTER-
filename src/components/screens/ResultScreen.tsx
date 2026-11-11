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
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 select-none text-center">
      {/* Confetti celebration launcher */}
      <ConfettiLauncher type={isCrewWin ? 'crew' : 'imposter'} />

      {/* Main Victory Card Presentation */}
      <div className="my-auto py-1 sm:py-2">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          className={`p-4 sm:p-6 md:p-8 rounded-3xl border-2 shadow-md relative overflow-hidden bg-white ${
            isCrewWin
              ? 'border-emerald-300'
              : 'border-rose-300'
          }`}
        >
          {/* Top Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4 shadow-xs">
            {isCrewWin ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600">
                <Trophy size={36} className="sm:w-10 sm:h-10" />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600">
                <Flame size={36} className="sm:w-10 sm:h-10" />
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

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-2">
            {isCrewWin ? 'Crew Victory!' : 'Imposter Wins!'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed px-1">
            {roundResult.reason}
          </p>

          {/* Secret Word Reveal Box */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-sm mx-auto shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
              Category: {roundResult.categoryName}
            </span>
            <span className="text-xs text-indigo-600 font-semibold block mb-0.5">
              Secret Word Was
            </span>
            <span className="text-xl sm:text-3xl font-black text-slate-900 uppercase tracking-wider">
              {roundResult.secretWord}
            </span>
          </div>

          {/* Winning Players Spotlight */}
          <div className="border-t border-slate-100 pt-3 sm:pt-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 sm:mb-3">
              {isCrewWin ? 'Victorious Crew (+100 Pts)' : 'Victorious Imposter (+200 Pts)'}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-h-[22dvh] overflow-y-auto px-1 py-1">
              {(isCrewWin ? crewPlayers : imposterPlayers).map(winner => (
                <div key={winner.id} className="flex flex-col items-center min-w-[55px] max-w-[80px]">
                  <Avatar emoji={winner.avatar} size="md" highlight pulse />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 mt-1 truncate max-w-full">
                    {winner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Action */}
      <div className="mt-auto pt-2 pb-safe">
        <Button
          fullWidth
          size="xl"
          variant="primary"
          rightIcon={<ArrowRight size={22} />}
          onClick={proceedToScorecard}
          className="text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          View Round Scorecard
        </Button>
      </div>
    </div>
  );
};
