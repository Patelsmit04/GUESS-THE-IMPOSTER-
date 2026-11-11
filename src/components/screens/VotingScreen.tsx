import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Vote, CheckCircle2, Shield, ArrowRight, EyeOff } from 'lucide-react';
import { sound } from '../../services/sound';

export const VotingScreen: React.FC = () => {
  const {
    players,
    currentVoterIndex,
    submitVote,
    settings
  } = useGame();

  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [isVoterReady, setIsVoterReady] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentVoter = players[currentVoterIndex];

  const isPrivate = settings.privateVoting;

  const handleSelectTarget = useCallback((targetId: string) => {
    setSelectedTargetId(targetId);
    sound.playClick();
  }, []);

  const handleConfirmVote = useCallback(() => {
    if (!selectedTargetId || isSubmitting || !currentVoter) return;
    setIsSubmitting(true);
    submitVote(currentVoter.id, selectedTargetId);
    setSelectedTargetId(null);
    setIsVoterReady(false);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 200);
  }, [selectedTargetId, isSubmitting, currentVoter, submitVote]);

  // Keyboard shortcut listener: numbers 1-9 select suspect 1-9; Enter confirms
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= players.length) {
        handleSelectTarget(players[num - 1].id);
      } else if (e.key === 'Enter') {
        if (!isVoterReady && isPrivate) {
          sound.playClick();
          setIsVoterReady(true);
        } else if (selectedTargetId) {
          handleConfirmVote();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [players, isVoterReady, isPrivate, selectedTargetId, handleSelectTarget, handleConfirmVote]);

  if (!currentVoter) return null;

  // If private voting is on and this voter hasn't confirmed they are looking at the screen alone:
  if (isPrivate && !isVoterReady) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-3 sm:px-4 py-3 sm:py-6 select-none text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 sm:mb-5 shadow-xl shrink-0"
        >
          <Vote size={32} className="sm:w-9 sm:h-9" />
        </motion.div>

        <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-400 uppercase block mb-1">
          Secret Ballot #{currentVoterIndex + 1} of {players.length}
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-1">
          Pass Phone To
        </h2>

        <div className="my-3 sm:my-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center gap-2 sm:gap-3 w-full">
          <Avatar emoji={currentVoter.avatar} size="lg" highlight pulse />
          <span className="text-xl sm:text-3xl font-black text-white truncate max-w-[220px]">
            {currentVoter.name}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-[11px] sm:text-xs mb-5 sm:mb-7">
          <EyeOff size={13} className="text-amber-400 shrink-0" />
          <span>Keep your vote secret from others</span>
        </div>

        <div className="w-full max-w-sm">
          <Button
            fullWidth
            size="xl"
            variant="primary"
            rightIcon={<ArrowRight size={20} />}
            onClick={() => {
              sound.playClick();
              setIsVoterReady(true);
            }}
            className="py-3.5 sm:py-4 font-black text-base sm:text-lg"
          >
            I'm {currentVoter.name}, Cast My Vote
          </Button>
        </div>
      </div>
    );
  }

  // Active voting ballot UI
  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-3 select-none">
      {/* Header */}
      <div className="text-center mb-2.5 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-400">
          <Shield size={13} />
          <span>Voter: {currentVoter.name}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Who Is The Imposter?
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-300">
          Select the player you suspect of bluffing this round.
        </p>
      </div>

      {/* Suspects Grid with responsive max-height */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 max-h-[50dvh] sm:max-h-[56dvh] overflow-y-auto pr-0.5">
        <AnimatePresence>
          {players.map((suspect, idx) => {
            const isSelected = selectedTargetId === suspect.id;
            const isSelf = suspect.id === currentVoter.id;

            return (
              <motion.div
                key={suspect.id}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectTarget(suspect.id)}
                className={`p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between relative shadow-lg ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500 shadow-rose-600/30 ring-3 ring-rose-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Number indicator for hotkey */}
                <span className="absolute top-2 left-2.5 text-[10px] font-black text-slate-500">
                  #{idx + 1}
                </span>

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 size={18} className="text-rose-400" />
                  </div>
                )}

                <Avatar emoji={suspect.avatar} size="md" highlight={isSelected} />

                <div className="mt-1.5 text-center min-w-0 w-full">
                  <span className="text-xs sm:text-sm md:text-base font-black text-white block truncate px-1">
                    {suspect.name}
                  </span>
                  {isSelf && (
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold block">
                      (You)
                    </span>
                  )}
                </div>

                <div className="mt-2 w-full">
                  <Badge
                    variant={isSelected ? 'danger' : 'neutral'}
                    size="sm"
                    className="w-full justify-center text-[10px] py-0.5"
                  >
                    {isSelected ? 'Suspect Picked' : 'Accuse'}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Confirm vote action */}
      <div className="mt-auto pt-1">
        <Button
          fullWidth
          size="xl"
          variant="danger"
          disabled={!selectedTargetId || isSubmitting}
          leftIcon={<Vote size={20} />}
          onClick={handleConfirmVote}
          className="shadow-rose-600/40 text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          {selectedTargetId ? 'Lock In Vote' : 'Select a Suspect'}
        </Button>
      </div>
    </div>
  );
};
