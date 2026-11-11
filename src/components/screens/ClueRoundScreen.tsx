import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Mic, CheckCircle2, ArrowRight, RotateCw, Vote, MessageSquareQuote } from 'lucide-react';

export const ClueRoundScreen: React.FC = () => {
  const {
    players,
    currentRound,
    clueRoundCycle,
    category,
    currentClueSpeakerIndex,
    nextClueSpeaker,
    startAnotherClueRound,
    startDiscussion,
    startVoting
  } = useGame();

  const currentSpeaker = players[currentClueSpeakerIndex];
  const allCluesGiven = players.every(p => p.clueGiven) || (currentClueSpeakerIndex === players.length - 1 && currentSpeaker?.clueGiven);

  if (!currentSpeaker || !category) return null;

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-3 select-none">
      {/* Top Round Information */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-4 bg-white p-2.5 sm:p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl sm:text-2xl shrink-0">{category.icon}</span>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">
              Round {currentRound} • {category.name}
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 truncate block">
              Clue Cycle #{clueRoundCycle}
            </span>
          </div>
        </div>

        <Badge variant="glow" size="sm" className="shrink-0">
          Clue #{clueRoundCycle}
        </Badge>
      </div>

      {/* Main Speaker Spotlight OR All-Clues Decision Screen */}
      <div className="my-auto text-center py-2 sm:py-3">
        {allCluesGiven ? (
          /* Decision State: All players finished giving clues! */
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md flex flex-col items-center gap-3 sm:gap-4 relative overflow-hidden"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 text-2xl sm:text-3xl shadow-xs shrink-0">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-600 uppercase block mb-0.5">
                Clue Round {clueRoundCycle} Completed!
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 uppercase">
                What Would You Like To Do?
              </h2>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Everyone shared their clue! Do you need more hints to catch the Imposter, or are you ready to cast votes?
              </p>
            </div>

            <div className="w-full space-y-2.5 pt-1">
              <Button
                fullWidth
                size="lg"
                variant="primary"
                leftIcon={<RotateCw size={18} />}
                onClick={startAnotherClueRound}
                className="py-3.5 text-sm sm:text-base font-black"
              >
                Play Another Round of Clues (Round {clueRoundCycle + 1})
              </Button>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button
                  size="md"
                  variant="secondary"
                  leftIcon={<MessageSquareQuote size={16} className="text-indigo-600" />}
                  onClick={startDiscussion}
                >
                  Start Discussion
                </Button>

                <Button
                  size="md"
                  variant="danger"
                  leftIcon={<Vote size={16} />}
                  onClick={startVoting}
                >
                  Vote Now
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Speaker State */
          <div>
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-600 uppercase block mb-1">
              Speaker {currentClueSpeakerIndex + 1} of {players.length} • Cycle #{clueRoundCycle}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSpeaker.id}-${clueRoundCycle}`}
                initial={{ scale: 0.94, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: -8 }}
                transition={{ type: 'spring', damping: 22 }}
                className="p-4 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md flex flex-col items-center gap-2 sm:gap-3 relative overflow-hidden"
              >
                <Avatar emoji={currentSpeaker.avatar} size="lg" highlight pulse />

                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-0.5 truncate max-w-[240px] mx-auto">
                    {currentSpeaker.name}'s Turn to Speak
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Say ONE clue aloud to the room related to the secret word.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] sm:text-xs font-bold border border-indigo-200 mt-0.5">
                  <Mic size={13} className="animate-pulse text-indigo-600 shrink-0" />
                  <span>Speaking clue #{clueRoundCycle} to the table</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Player Speaking Turn Order Track */}
      <div className="mb-3 sm:mb-5">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
          <span>Clue Cycle #{clueRoundCycle} Checklist</span>
          <span>{players.filter(p => p.clueGiven).length} / {players.length} Done</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 max-h-[22dvh] overflow-y-auto pr-0.5">
          {players.map((p, idx) => {
            const isSpeakingNow = idx === currentClueSpeakerIndex && !allCluesGiven;
            const hasSpoken = p.clueGiven;

            return (
              <div
                key={p.id}
                className={`p-2 rounded-xl sm:rounded-2xl border transition-all flex items-center gap-2 min-w-0 ${
                  isSpeakingNow
                    ? 'bg-indigo-50 border-2 border-indigo-600 shadow-xs'
                    : hasSpoken
                    ? 'bg-slate-50 border-slate-200 text-slate-500'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="shrink-0">
                  <Avatar emoji={p.avatar} size="sm" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold block truncate">
                    {p.name}
                  </span>
                  <span className="text-[9px] text-slate-500 font-semibold block">
                    {isSpeakingNow ? 'Speaking' : hasSpoken ? 'Done ✓' : 'Waiting'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Done Clue CTA Button (only shown during active speaker turns) */}
      {!allCluesGiven && (
        <div className="mt-auto pt-1">
          <Button
            fullWidth
            size="lg"
            variant="primary"
            rightIcon={<ArrowRight size={18} />}
            onClick={nextClueSpeaker}
            className="py-3.5 text-base font-black"
          >
            I Gave My Clue — Next Player
          </Button>
        </div>
      )}
    </div>
  );
};
