import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Mic, CheckCircle2, ArrowRight, MessageSquareQuote, ShieldAlert } from 'lucide-react';

export const ClueRoundScreen: React.FC = () => {
  const {
    players,
    currentRound,
    category,
    currentClueSpeakerIndex,
    nextClueSpeaker,
    startDiscussion
  } = useGame();

  const currentSpeaker = players[currentClueSpeakerIndex];
  const isLastSpeaker = currentClueSpeakerIndex === players.length - 1;

  if (!currentSpeaker || !category) return null;

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none">
      {/* Top Round Information */}
      <div className="flex items-center justify-between mb-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Round {currentRound} Category
            </span>
            <span className="text-sm font-black text-white">
              {category.name}
            </span>
          </div>
        </div>

        <Badge variant="glow" size="sm">
          Clue Phase
        </Badge>
      </div>

      {/* Main Speaker Spotlight */}
      <div className="my-auto text-center py-4">
        <span className="text-xs font-black tracking-widest text-indigo-400 uppercase block mb-2">
          Speaker {currentClueSpeakerIndex + 1} of {players.length}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpeaker.id}
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 20 }}
            className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center gap-3 relative overflow-hidden"
          >
            {/* Soft backdrop glow */}
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
              <span>Speaking to the table</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Player Speaking Turn Order Track */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          <span>Turn Order Checklist</span>
          <span>{players.filter(p => p.clueGiven).length} / {players.length} Done</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {players.map((p, idx) => {
            const isSpeakingNow = idx === currentClueSpeakerIndex;
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

      {/* Bottom Action Controls */}
      <div className="space-y-2 mt-auto">
        <Button
          fullWidth
          size="lg"
          variant="primary"
          rightIcon={isLastSpeaker ? <MessageSquareQuote size={20} /> : <ArrowRight size={20} />}
          onClick={nextClueSpeaker}
        >
          {isLastSpeaker ? 'Finish Clues & Start Discussion' : `Done Speaking — Next Player`}
        </Button>

        <div className="flex items-center justify-center">
          <button
            onClick={startDiscussion}
            className="text-xs font-bold text-slate-400 hover:text-white transition-colors py-1 cursor-pointer flex items-center gap-1"
          >
            <ShieldAlert size={13} className="text-amber-400" />
            <span>Skip straight to Discussion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

