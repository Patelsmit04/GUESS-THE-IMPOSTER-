import React, { useState } from 'react';
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

  const currentVoter = players[currentVoterIndex];
  if (!currentVoter) return null;

  const isPrivate = settings.privateVoting;

  const handleSelectTarget = (targetId: string) => {
    setSelectedTargetId(targetId);
    sound.playClick();
  };

  const handleConfirmVote = () => {
    if (!selectedTargetId) return;
    submitVote(currentVoter.id, selectedTargetId);
    setSelectedTargetId(null);
    setIsVoterReady(false);
  };

  // If private voting is on and this voter hasn't confirmed they are looking at the screen alone:
  if (isPrivate && !isVoterReady) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full px-4 py-8 select-none text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 shadow-xl"
        >
          <Vote size={38} />
        </motion.div>

        <span className="text-xs font-black tracking-widest text-indigo-400 uppercase block mb-1">
          Secret Ballot #{currentVoterIndex + 1} of {players.length}
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Pass Phone To
        </h2>

        <div className="my-5 p-5 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center gap-3">
          <Avatar emoji={currentVoter.avatar} size="xl" highlight pulse />
          <span className="text-2xl sm:text-3xl font-black text-white">
            {currentVoter.name}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs mb-8">
          <EyeOff size={14} className="text-amber-400" />
          <span>Keep your vote secret from other players</span>
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
            className="py-4 font-black"
          >
            I'm {currentVoter.name}, Cast My Vote
          </Button>
        </div>
      </div>
    );
  }

  // Active voting ballot UI
  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 mb-1 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <Shield size={14} />
          <span>Voter: {currentVoter.name}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Who Is The Imposter?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Select the player you suspect of bluffing this round.
        </p>
      </div>

      {/* Suspects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 overflow-y-auto pr-1">
        <AnimatePresence>
          {players.map(suspect => {
            const isSelected = selectedTargetId === suspect.id;
            const isSelf = suspect.id === currentVoter.id;

            return (
              <motion.div
                key={suspect.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectTarget(suspect.id)}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between relative shadow-lg ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500 shadow-rose-600/30 ring-4 ring-rose-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5">
                    <CheckCircle2 size={20} className="text-rose-400" />
                  </div>
                )}

                <Avatar emoji={suspect.avatar} size="lg" highlight={isSelected} />

                <div className="mt-2 text-center">
                  <span className="text-sm sm:text-base font-black text-white block truncate max-w-[120px]">
                    {suspect.name}
                  </span>
                  {isSelf && (
                    <span className="text-[10px] text-slate-400 font-semibold">
                      (You)
                    </span>
                  )}
                </div>

                <div className="mt-3 w-full">
                  <Badge
                    variant={isSelected ? 'danger' : 'neutral'}
                    size="sm"
                    className="w-full justify-center"
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
      <div className="mt-auto pt-2">
        <Button
          fullWidth
          size="xl"
          variant="danger"
          disabled={!selectedTargetId}
          leftIcon={<Vote size={22} />}
          onClick={handleConfirmVote}
          className="shadow-rose-600/40 text-lg font-black py-4"
        >
          {selectedTargetId ? 'Lock In Vote' : 'Select a Suspect'}
        </Button>
      </div>
    </div>
  );
};

