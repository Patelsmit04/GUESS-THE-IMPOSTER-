import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ShieldCheck, Flame, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sound } from '../../services/sound';

export const SecretRevealScreen: React.FC = () => {
  const {
    players,
    currentHandoffIndex,
    category,
    secretWordItem,
    nextHandoff
  } = useGame();

  const [isFlipped, setIsFlipped] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const currentPlayer = players[currentHandoffIndex];
  const isImposter = currentPlayer?.role === 'IMPOSTER';
  const isLastPlayer = currentHandoffIndex === players.length - 1;

  const handleFlipCard = useCallback(() => {
    if (isFlipped || isAdvancing) return;
    setIsFlipped(true);
    setHasInteracted(true);
    sound.playCardFlip();

    setTimeout(() => {
      if (isImposter) {
        sound.playSecretRevealImposter();
      } else {
        sound.playSecretRevealCrew();
      }
    }, 200);
  }, [isFlipped, isAdvancing, isImposter]);

  const handleContinue = useCallback(() => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    sound.playClick();
    setIsFlipped(false);

    setTimeout(() => {
      nextHandoff();
    }, 150);
  }, [isAdvancing, nextHandoff]);

  // Keyboard shortcut listener (Space or Enter to flip or advance)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isFlipped) {
          handleFlipCard();
        } else if (hasInteracted) {
          handleContinue();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, hasInteracted, handleFlipCard, handleContinue]);

  if (!currentPlayer || !secretWordItem || !category) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-2 sm:px-4 py-2 sm:py-3 select-none text-center">
      {/* Player Header greeting */}
      <div className="mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-600 uppercase block mb-0.5">
          Confidential Dossier
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 truncate max-w-[260px] mx-auto">
          {currentPlayer.name}'s Secret Card
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-600">
          {!isFlipped
            ? 'Tap card to reveal role (keep hidden from others)'
            : 'Memorize your role, then hide this card!'}
        </p>
      </div>

      {/* 3D Flip Card Container */}
      <div className="w-full max-w-[340px] sm:max-w-sm h-[320px] sm:h-[390px] max-h-[52dvh] sm:max-h-[56dvh] perspective-1000 mb-3 sm:mb-5 cursor-pointer">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, type: 'spring', damping: 20 }}
          className="w-full h-full relative transform-style-3d"
          onClick={handleFlipCard}
        >
          {/* Card Front (Face Down) */}
          <div className="absolute inset-0 backface-hidden w-full h-full rounded-3xl bg-white border-2 border-slate-300 p-4 sm:p-5 flex flex-col items-center justify-between shadow-md">
            <div className="w-full flex items-center justify-between">
              <span className="text-xl sm:text-2xl">{currentPlayer.avatar}</span>
              <Badge variant="neutral" size="sm">
                Confidential
              </Badge>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-3xl sm:text-4xl mb-2 sm:mb-3 shadow-xs"
              >
                ❓
              </motion.div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wider mb-0.5">
                Tap to Flip
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Reveals your confidential identity
              </p>
            </div>

            <div className="w-full py-1.5 sm:py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] sm:text-xs font-semibold">
              Tap anywhere on card to flip
            </div>
          </div>

          {/* Card Back (Face Up - Revealed Role) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-md border-2 overflow-hidden bg-white">
            {/* Role specific theme */}
            {isImposter ? (
              <>
                {/* Imposter Styling */}
                <div className="w-full flex items-center justify-between border-b border-rose-100 pb-2">
                  <div className="flex items-center gap-1.5 text-rose-600 text-xs font-black uppercase">
                    <Flame size={16} />
                    <span>Secret Role</span>
                  </div>
                  <Badge variant="danger" size="sm">
                    Imposter
                  </Badge>
                </div>

                <div className="my-auto flex flex-col items-center w-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-2xl sm:text-3xl mb-1.5 sm:mb-2 shadow-xs">
                    🎭
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-rose-600 tracking-tight uppercase mb-0.5">
                    You Are The Imposter!
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 mb-2 sm:mb-3 max-w-[240px]">
                    You do NOT know the secret word. Bluff your way through!
                  </p>

                  <div className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-left">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      Category
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5 truncate">
                      <span>{category.icon}</span>
                      <span className="truncate">{category.name}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[10px] sm:text-xs font-semibold">
                  🤫 Listen carefully to others' clues and blend in!
                </div>
              </>
            ) : (
              <>
                {/* Crew Member Styling */}
                <div className="w-full flex items-center justify-between border-b border-emerald-100 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black uppercase">
                    <ShieldCheck size={16} />
                    <span>Crew Member</span>
                  </div>
                  <Badge variant="success" size="sm">
                    Innocent
                  </Badge>
                </div>

                <div className="my-auto flex flex-col items-center w-full">
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 truncate max-w-full">
                    Category: {category.name}
                  </div>

                  <div className="my-1.5 sm:my-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-xs max-w-full">
                    <span className="text-[9px] sm:text-[10px] font-black text-emerald-700 tracking-widest uppercase block mb-0.5">
                      Secret Word
                    </span>
                    <h3 className="text-xl sm:text-3xl font-black text-emerald-950 tracking-tight uppercase break-words">
                      {secretWordItem.word}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 max-w-[240px] leading-relaxed line-clamp-2">
                    Hint: {secretWordItem.hint}
                  </p>
                </div>

                <div className="w-full p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-semibold">
                  🔍 Give a subtle clue. Don't make it too obvious!
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Continue Action */}
      <div className="w-full max-w-sm">
        {hasInteracted ? (
          <Button
            fullWidth
            size="lg"
            variant="primary"
            rightIcon={isLastPlayer ? <Sparkles size={18} /> : <ArrowRight size={18} />}
            onClick={handleContinue}
            disabled={isAdvancing}
            className="py-3.5 sm:py-4 font-black text-sm sm:text-base"
          >
            {isLastPlayer ? 'All Set — Start Clue Round' : 'Hide Card & Pass Next'}
          </Button>
        ) : (
          <div className="text-xs text-slate-500 py-2.5 flex items-center justify-center gap-1">
            <Check size={14} className="text-indigo-600" />
            <span>Tap card to unlock your role</span>
          </div>
        )}
      </div>
    </div>
  );
};
