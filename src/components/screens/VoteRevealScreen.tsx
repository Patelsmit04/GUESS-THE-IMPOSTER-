import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ImposterGuessModal } from './ImposterGuessModal';
import { ShieldAlert, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { sound } from '../../services/sound';

export const VoteRevealScreen: React.FC = () => {
  const {
    players,
    roundResult,
    settings,
    setPhase
  } = useGame();

  const [revealStep, setRevealStep] = useState<'TALLY' | 'ACCUSED' | 'FLIPPED'>('TALLY');
  const [showGuessModal, setShowGuessModal] = useState<boolean>(false);

  useEffect(() => {
    // Stage 1 -> Drumroll sound
    sound.playDrumroll(() => {
      setRevealStep('ACCUSED');
    });
  }, []);

  if (!roundResult) return null;

  const eliminatedPlayer = players.find(p => p.id === roundResult.eliminatedPlayerId);
  const isImposterEliminated = eliminatedPlayer?.role === 'IMPOSTER';

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
    // If imposter was eliminated and guess word is allowed
    if (isImposterEliminated && settings.allowImposterGuess && !roundResult.imposterGuessedWord) {
      setShowGuessModal(true);
    } else {
      setPhase('RESULT');
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none">
      {/* Title */}
      <div className="text-center mb-4">
        <Badge variant="danger" size="sm" className="mb-1">
          Elimination Ceremony
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          {revealStep === 'TALLY'
            ? 'Counting The Votes...'
            : revealStep === 'ACCUSED'
            ? 'The Table Has Decided!'
            : 'Truth Revealed!'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {revealStep === 'TALLY'
            ? 'Listening to the room...'
            : eliminatedPlayer
            ? `${eliminatedPlayer.name} received the most accusations.`
            : 'A tie! No consensus reached!'}
        </p>
      </div>

      {/* Main Dramatic Presentation */}
      <div className="my-auto flex flex-col items-center justify-center py-2">
        <AnimatePresence mode="wait">
          {eliminatedPlayer ? (
            <motion.div
              key={revealStep}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="w-full max-w-sm"
            >
              {revealStep !== 'FLIPPED' ? (
                /* Card Front - Accused Suspect */
                <div className="p-6 rounded-3xl bg-slate-900 border-2 border-rose-500/50 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <Badge variant="danger" size="sm">
                      {eliminatedPlayer.votesReceived} Votes
                    </Badge>
                  </div>

                  <Avatar emoji={eliminatedPlayer.avatar} size="2xl" highlight pulse />

                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-1">
                    {eliminatedPlayer.name}
                  </h3>

                  <p className="text-xs text-rose-300 font-semibold mb-4">
                    Most voted suspect this round
                  </p>

                  <Button
                    fullWidth
                    size="lg"
                    variant="danger"
                    leftIcon={<ShieldAlert size={18} />}
                    onClick={handleFlipCard}
                    className="py-3.5 font-black shadow-rose-600/30"
                  >
                    Reveal True Identity
                  </Button>
                </div>
              ) : (
                /* Card Back - Revealed Truth */
                <motion.div
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-3xl border-2 shadow-2xl flex flex-col items-center text-center relative overflow-hidden ${
                    isImposterEliminated
                      ? 'bg-gradient-to-b from-rose-950 to-slate-900 border-rose-500 shadow-rose-600/30'
                      : 'bg-gradient-to-b from-slate-900 to-indigo-950/80 border-indigo-500/60 shadow-indigo-600/20'
                  }`}
                >
                  <div className="w-18 h-18 rounded-3xl flex items-center justify-center text-4xl mb-3 shadow-lg">
                    {isImposterEliminated ? (
                      <div className="w-18 h-18 rounded-2xl bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center text-rose-400">
                        <Flame size={40} />
                      </div>
                    ) : (
                      <div className="w-18 h-18 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <ShieldCheck size={40} />
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-black tracking-widest uppercase mb-1">
                    {isImposterEliminated ? (
                      <span className="text-rose-400">Guilty as Charged!</span>
                    ) : (
                      <span className="text-indigo-400">Wrongfully Accused!</span>
                    )}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {eliminatedPlayer.name} was {isImposterEliminated ? 'THE IMPOSTER!' : 'CREW!'}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                    {isImposterEliminated
                      ? 'The Crew saw through the deception and caught the Imposter red-handed!'
                      : 'Tragedy! An innocent crew member was voted out, allowing the real Imposter to slip away!'}
                  </p>

                  <Button
                    fullWidth
                    size="lg"
                    variant={isImposterEliminated ? 'primary' : 'secondary'}
                    rightIcon={<ArrowRight size={20} />}
                    onClick={handleProceed}
                    className="py-3.5 font-black"
                  >
                    {isImposterEliminated && settings.allowImposterGuess
                      ? 'Imposter Last Chance Guess'
                      : 'See Round Results'}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Tie situation */
            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/40 text-center max-w-sm">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 flex items-center justify-center text-3xl mb-3 text-amber-400">
                ⚖️
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase">
                Tie Vote!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5">
                The crew could not agree on who to eliminate. In the chaos, the Imposter evades justice!
              </p>
              <Button
                fullWidth
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={20} />}
                onClick={() => setPhase('RESULT')}
              >
                View Match Result
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Vote Breakdown Grid */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
          Complete Vote Breakdown
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {players.map(p => (
            <div
              key={p.id}
              className={`p-2.5 rounded-2xl border flex items-center justify-between text-xs ${
                p.id === eliminatedPlayer?.id
                  ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span>{p.avatar}</span>
                <span className="truncate">{p.name}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[11px] font-black shrink-0">
                {p.votesReceived} {p.votesReceived === 1 ? 'vote' : 'votes'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Imposter Guess Modal if triggered */}
      <ImposterGuessModal
        isOpen={showGuessModal}
        onResolved={() => {
          setShowGuessModal(false);
          setPhase('RESULT');
        }}
      />
    </div>
  );
};
