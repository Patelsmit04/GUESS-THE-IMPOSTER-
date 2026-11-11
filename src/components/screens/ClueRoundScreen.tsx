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
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none">
      {/* Top Round Information */}
      <div className="flex items-center justify-between mb-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Match Round {currentRound} • {category.name}
            </span>
            <span className="text-sm font-black text-white">
              Clue Cycle #{clueRoundCycle}
            </span>
          </div>
        </div>

        <Badge variant="glow" size="sm">
          Clue Round {clueRoundCycle}
        </Badge>
      </div>

      {/* Main Speaker Spotlight OR All-Clues Decision Screen */}
      <div className="my-auto text-center py-4">
        {allCluesGiven ? (
          /* Decision State: All players finished giving clues! */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 sm:p-7 rounded-3xl bg-slate-900 border-2 border-indigo-500/50 shadow-2xl flex flex-col items-center gap-4 relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border-2 border-indigo-500/40 flex items-center justify-center text-indigo-400 text-3xl shadow-lg">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs font-black tracking-widest text-indigo-400 uppercase block mb-1">
                Clue Round {clueRoundCycle} Completed!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                What Would You Like To Do?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                Everyone has shared their clue! Do you need more hints to catch the Imposter, or are you ready to cast votes?
              </p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <Button
                fullWidth
                size="lg"
                variant="primary"
                leftIcon={<RotateCw size={20} />}
                onClick={startAnotherClueRound}
                className="py-4 text-base font-black shadow-indigo-600/30"
              >
                Play Another Round of Clues (Round {clueRoundCycle + 1})
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="md"
                  variant="secondary"
                  leftIcon={<MessageSquareQuote size={18} className="text-indigo-400" />}
                  onClick={startDiscussion}
                >
                  Start Discussion
                </Button>

                <Button
                  size="md"
                  variant="danger"
                  leftIcon={<Vote size={18} />}
                  onClick={startVoting}
                >
                  Go to Voting Now
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Speaker State */
          <div>
            <span className="text-xs font-black tracking-widest text-indigo-400 uppercase block mb-2">
              Speaker {currentClueSpeakerIndex + 1} of {players.length} • Cycle #{clueRoundCycle}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSpeaker.id}-${clueRoundCycle}`}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -10 }}
                transition={{ type: 'spring', damping: 20 }}
                className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center gap-3 relative overflow-hidden"
              >
                <div className="absolute -top-12 -left-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <Avatar emoji={currentSpeaker.avatar} size="xl" highlight pulse />

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
                    {currentSpeaker.name}'s Turn to Speak
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Say ONE clue aloud to the room related to the secret word.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40 mt-1">
                  <Mic size={14} className="animate-pulse text-indigo-400" />
                  <span>Speaking clue #{clueRoundCycle} to the table</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Player Speaking Turn Order Track */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          <span>Clue Cycle #{clueRoundCycle} Checklist</span>
          <span>{players.filter(p => p.clueGiven).length} / {players.length} Spoken</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {players.map((p, idx) => {
            const isSpeakingNow = idx === currentClueSpeakerIndex && !allCluesGiven;
            const hasSpoken = p.clueGiven;

            return (
              <div
                key={p.id}
                className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2.5 ${
                  isSpeakingNow
                    ? 'bg-indigo-900/30 border-indigo-400 ring-2 ring-indigo-500/30 shadow-md'
                    : hasSpoken
                    ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-80'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <span className="text-lg">{p.avatar}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isSpeakingNow ? 'Speaking' : hasSpoken ? 'Done' : 'Waiting'}
                  </span>
                </div>
                {hasSpoken && (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Controls (when still in active speaker rotation) */}
      {!allCluesGiven && (
        <div className="space-y-2 mt-auto">
          <Button
            fullWidth
            size="lg"
            variant="primary"
            rightIcon={<ArrowRight size={20} />}
            onClick={nextClueSpeaker}
          >
            {currentClueSpeakerIndex === players.length - 1
              ? 'Finish Clue Cycle — Choose Next Action'
              : 'Done Speaking — Next Player'}
          </Button>

          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              onClick={startVoting}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              <Vote size={13} />
              <span>We already know! Go to Voting</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
