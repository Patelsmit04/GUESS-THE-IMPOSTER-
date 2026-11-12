import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ShieldAlert, ShieldCheck, Flame, ArrowRight, FastForward } from 'lucide-react';
import { sound } from '../../services/sound';

export const VoteRevealScreen: React.FC = () => {
  const {
    players,
    roundResult,
    setPhase,
    finalizeRound
  } = useGame();

  const [revealStep, setRevealStep] = useState<'TALLY' | 'ACCUSED' | 'FLIPPED'>('TALLY');

  useEffect(() => {
    // Stage 1 -> Drumroll sound
    sound.playDrumroll(() => {
      setRevealStep(prev => prev === 'TALLY' ? 'ACCUSED' : prev);
    });
  }, []);

  if (!roundResult) return null;

  const eliminatedPlayer = players.find(p => p.id === roundResult.eliminatedPlayerId);
  const voteCounts = roundResult.votesSummary;
  const hasValidVoteSummary = !!voteCounts && players.every(player => Number.isInteger(voteCounts[player.id]) && voteCounts[player.id] >= 0);
  const isImposterEliminated = eliminatedPlayer?.role === 'IMPOSTER';

  const handleSkipDrumroll = () => {
    if (revealStep === 'TALLY') {
      sound.playClick();
      setRevealStep('ACCUSED');
    }
  };

  const handleFlipCard = () => {
    sound.playCardFlip();
    setRevealStep('FLIPPED');

    setTimeout(() => {
      if (isImposterEliminated) {
        sound.playSecretRevealImposter();
      } else {
        sound.playWrong();
      }
    }, 200);
  };

  const handleProceed = () => {
    finalizeRound();
    setPhase('RESULT');
  };

  if (!hasValidVoteSummary) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 text-center">
        <div className="max-w-md rounded-3xl border-2 border-rose-200 bg-white p-6 shadow-md">
          <h2 className="text-xl font-black uppercase text-slate-900">Vote results unavailable</h2>
          <p className="mt-2 text-sm text-slate-600">
            The completed ballots could not be verified. No elimination result was displayed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-3 select-none">
      {/* Title */}
      <div className="text-center mb-2.5 sm:mb-4">
        <Badge variant="danger" size="sm" className="mb-0.5">
          Elimination Ceremony
        </Badge>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
          {revealStep === 'TALLY'
            ? 'Counting The Votes...'
            : revealStep === 'ACCUSED'
            ? 'The Table Has Decided!'
            : 'Truth Revealed!'}
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600">
          {revealStep === 'TALLY'
            ? 'Tallying accusations from all players...'
            : eliminatedPlayer
            ? `${eliminatedPlayer.name} received the most votes.`
            : 'A tie! No consensus reached!'}
        </p>

        {revealStep === 'TALLY' && (
          <button
            onClick={handleSkipDrumroll}
            className="mt-1.5 text-[10px] sm:text-xs text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer font-semibold"
          >
            <FastForward size={12} />
            <span>Skip build-up</span>
          </button>
        )}
      </div>

      {/* Main Dramatic Presentation */}
      <div className="my-auto flex flex-col items-center justify-center py-1 sm:py-2">
        <AnimatePresence mode="wait">
          {eliminatedPlayer ? (
            <motion.div
              key={revealStep}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 22 }}
              className="w-full max-w-[340px] sm:max-w-sm"
            >
              {revealStep !== 'FLIPPED' ? (
                /* Card Front - Accused Suspect */
                <div className="p-4 sm:p-6 rounded-3xl bg-white border-2 border-rose-300 shadow-md flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                    <Badge variant="danger" size="sm">
                      {voteCounts[eliminatedPlayer.id]} Votes
                    </Badge>
                  </div>

                  <Avatar emoji={eliminatedPlayer.avatar} size="xl" highlight pulse />

                  <h3 className="text-xl sm:text-3xl font-black text-slate-900 mt-2 sm:mt-3 mb-0.5 truncate max-w-[220px]">
                    {eliminatedPlayer.name}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-rose-600 font-semibold mb-3 sm:mb-4">
                    Most voted suspect this round
                  </p>

                  <Button
                    fullWidth
                    size="lg"
                    variant="danger"
                    leftIcon={<ShieldAlert size={16} />}
                    onClick={handleFlipCard}
                    className="py-3 sm:py-3.5 font-black text-sm sm:text-base"
                  >
                    Reveal True Identity
                  </Button>
                </div>
              ) : (
                /* Card Back - Revealed Truth */
                <motion.div
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className={`p-4 sm:p-6 rounded-3xl border-2 shadow-md flex flex-col items-center text-center relative overflow-hidden bg-white ${
                    isImposterEliminated
                      ? 'border-rose-400'
                      : 'border-indigo-400'
                  }`}
                >
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-2 sm:mb-3 shadow-xs">
                    {isImposterEliminated ? (
                      <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600">
                        <Flame size={32} className="sm:w-10 sm:h-10" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600">
                        <ShieldCheck size={32} className="sm:w-10 sm:h-10" />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase mb-0.5">
                    {isImposterEliminated ? (
                      <span className="text-rose-600">Guilty as Charged!</span>
                    ) : (
                      <span className="text-indigo-600">Wrongfully Accused!</span>
                    )}
                  </span>

                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 mb-1.5 truncate max-w-[240px]">
                    {eliminatedPlayer.name} was {isImposterEliminated ? 'AN IMPOSTER!' : 'CREW!'}
                  </h3>

                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {roundResult.reason}
                  </p>

                  <Button
                    fullWidth
                    size="lg"
                    variant={isImposterEliminated ? 'primary' : 'secondary'}
                    rightIcon={<ArrowRight size={18} />}
                    onClick={handleProceed}
                    className="py-3 sm:py-3.5 font-black text-sm sm:text-base"
                  >
                    See Round Results
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Tie Result Presentation */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md flex flex-col items-center text-center max-w-[340px] sm:max-w-sm"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-2xl sm:text-3xl text-amber-600 mb-3 shadow-xs">
                🤝
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                Deadlocked Vote!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                No single player held a majority. Without a clear consensus, no one is eliminated and the Imposter team survives!
              </p>
              <Button
                fullWidth
                variant="primary"
                size="lg"
                onClick={() => {
                  finalizeRound();
                  setPhase('RESULT');
                }}
              >
                View Round Outcome
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vote Breakdown Summary Table */}
      <div className="mt-auto mb-1 bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 shadow-xs max-h-[22dvh] overflow-y-auto">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
          <span>Accusations Breakdown</span>
          <span>{players.length} Players</span>
        </div>

        <div className="space-y-1">
          {[...players]
            .sort((a, b) => voteCounts[b.id] - voteCounts[a.id])
            .map(p => (
              <div
                key={p.id}
                className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl ${
                  p.id === eliminatedPlayer?.id
                    ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200'
                    : 'bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span>{p.avatar}</span>
                  <span className="truncate">{p.name}</span>
                </div>
                <span className="font-black shrink-0">
                  {voteCounts[p.id]} {voteCounts[p.id] === 1 ? 'vote' : 'votes'}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
