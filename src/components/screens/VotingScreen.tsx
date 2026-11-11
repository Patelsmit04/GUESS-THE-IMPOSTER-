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

  const requiredVotes = settings.imposterCount || 1;
  const [selectedTargetIds, setSelectedTargetIds] = useState<string[]>([]);
  const [isVoterReady, setIsVoterReady] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentVoter = players[currentVoterIndex];
  const isPrivate = settings.privateVoting;

  const handleToggleTarget = useCallback((targetId: string) => {
    if (!currentVoter) return;
    if (targetId === currentVoter.id) {
      sound.playWrong();
      return; // Cannot vote for yourself
    }

    setSelectedTargetIds(prev => {
      const index = prev.indexOf(targetId);
      if (index !== -1) {
        // Deselecting: remove and re-index cleanly
        sound.playClick();
        return prev.filter(id => id !== targetId);
      } else {
        // Selecting:
        if (prev.length >= requiredVotes) {
          sound.playWrong();
          return prev; // Reached limit
        }
        sound.playClick();
        return [...prev, targetId];
      }
    });
  }, [currentVoter, requiredVotes]);

  const handleConfirmVote = useCallback(() => {
    if (selectedTargetIds.length !== requiredVotes || isSubmitting || !currentVoter) return;
    setIsSubmitting(true);
    submitVote(currentVoter.id, selectedTargetIds);
    setSelectedTargetIds([]);
    setIsVoterReady(false);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 200);
  }, [selectedTargetIds, requiredVotes, isSubmitting, currentVoter, submitVote]);

  // Keyboard shortcut listener: numbers 1-9 toggle suspect 1-9; Enter confirms
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= players.length) {
        handleToggleTarget(players[num - 1].id);
      } else if (e.key === 'Enter') {
        if (!isVoterReady && isPrivate) {
          sound.playClick();
          setIsVoterReady(true);
        } else if (selectedTargetIds.length === requiredVotes) {
          handleConfirmVote();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [players, isVoterReady, isPrivate, selectedTargetIds, requiredVotes, handleToggleTarget, handleConfirmVote]);

  if (!currentVoter) return null;

  // If private voting is on and this voter hasn't confirmed they are looking at the screen alone:
  if (isPrivate && !isVoterReady) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-3 sm:px-4 py-2 sm:py-6 select-none text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 mb-3 sm:mb-5 shadow-xs shrink-0"
        >
          <Vote size={32} className="sm:w-9 sm:h-9" />
        </motion.div>

        <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-600 uppercase block mb-1">
          Secret Ballot #{currentVoterIndex + 1} of {players.length}
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight mb-1">
          Pass Phone To
        </h2>

        <div className="my-3 sm:my-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col items-center gap-2 sm:gap-3 w-full">
          <Avatar emoji={currentVoter.avatar} size="lg" highlight pulse />
          <span className="text-xl sm:text-3xl font-black text-slate-900 truncate max-w-[220px]">
            {currentVoter.name}
          </span>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            You have {requiredVotes} {requiredVotes === 1 ? 'vote' : 'votes'} to cast
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] sm:text-xs mb-5 sm:mb-7">
          <EyeOff size={13} className="text-amber-500 shrink-0" />
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
            I'm {currentVoter.name}, Cast My Ballot
          </Button>
        </div>
      </div>
    );
  }

  const votesRemaining = requiredVotes - selectedTargetIds.length;
  const isBallotComplete = selectedTargetIds.length === requiredVotes;

  // Active voting ballot UI
  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-3 select-none">
      {/* Header */}
      <div className="text-center mb-2.5 sm:mb-3">
        <div className="inline-flex items-center gap-1.5 mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600">
          <Shield size={13} />
          <span>Voter: {currentVoter.name}</span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
          {requiredVotes > 1 ? 'Who Are The Imposters?' : 'Who Is The Imposter?'}
        </h2>

        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600">
          {requiredVotes > 1
            ? `Select exactly ${requiredVotes} different players you suspect of being Imposters.`
            : 'Select the player you suspect of bluffing this round.'}
        </p>

        {/* Live Vote Counter */}
        <div className="inline-flex items-center gap-2 mt-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all bg-white shadow-xs">
          <span className="text-slate-600">Votes selected:</span>
          <span className={`px-2 py-0.5 rounded-md font-black ${
            isBallotComplete
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
          }`}>
            {selectedTargetIds.length} / {requiredVotes}
          </span>
          {isBallotComplete && (
            <span className="text-emerald-600 font-bold flex items-center gap-0.5 text-[11px]">
              <CheckCircle2 size={13} /> Ready!
            </span>
          )}
        </div>
      </div>

      {/* Suspects Grid with responsive columns for up to 20 players */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5 mb-3 sm:mb-4 max-h-[48dvh] sm:max-h-[54dvh] overflow-y-auto pr-0.5">
        <AnimatePresence>
          {players.map((suspect, idx) => {
            const selectionIndex = selectedTargetIds.indexOf(suspect.id);
            const isSelected = selectionIndex !== -1;
            const selectionOrder = isSelected ? selectionIndex + 1 : null;
            const isSelf = suspect.id === currentVoter.id;

            return (
              <motion.div
                key={suspect.id}
                whileHover={isSelf ? undefined : { scale: 1.015 }}
                whileTap={isSelf ? undefined : { scale: 0.98 }}
                onClick={() => handleToggleTarget(suspect.id)}
                className={`p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 transition-all flex flex-col items-center justify-between relative shadow-xs ${
                  isSelf
                    ? 'opacity-40 bg-slate-50 border-slate-200 cursor-not-allowed'
                    : isSelected
                    ? 'bg-rose-50/80 border-rose-600 shadow-sm cursor-pointer scale-102'
                    : 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer'
                }`}
              >
                {/* Hotkey number indicator */}
                <span className="absolute top-2 left-2.5 text-[10px] font-black text-slate-400">
                  #{idx + 1}
                </span>

                {/* Numbered selection badge indicating vote order (1, 2, 3, 4) */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 flex items-center gap-1"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      {selectionOrder}
                    </span>
                  </motion.div>
                )}

                <Avatar emoji={suspect.avatar} size="md" highlight={isSelected} />

                <div className="mt-1.5 text-center min-w-0 w-full">
                  <span className="text-xs sm:text-sm font-black text-slate-900 block truncate px-1">
                    {suspect.name}
                  </span>
                  {isSelf && (
                    <span className="text-[9px] text-slate-500 font-semibold block">
                      (Cannot vote self)
                    </span>
                  )}
                </div>

                <div className="mt-2 w-full">
                  <Badge
                    variant={isSelected ? 'danger' : 'neutral'}
                    size="sm"
                    className="w-full justify-center text-[10px] py-0.5"
                  >
                    {isSelected
                      ? `Vote #${selectionOrder}`
                      : isSelf
                      ? 'You'
                      : 'Select'}
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
          disabled={!isBallotComplete || isSubmitting}
          leftIcon={<Vote size={20} />}
          onClick={handleConfirmVote}
          className="text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          {isBallotComplete
            ? `Lock In Ballot (${requiredVotes} ${requiredVotes === 1 ? 'Vote' : 'Votes'})`
            : `Select ${votesRemaining} More Suspect${votesRemaining > 1 ? 's' : ''}`
          }
        </Button>
      </div>
    </div>
  );
};
