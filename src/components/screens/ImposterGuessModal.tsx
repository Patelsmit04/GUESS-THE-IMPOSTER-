import React, { useState, useMemo } from 'react';
import { Modal } from '../common/Modal';
import { useGame } from '../../context/useGame';
import { Button } from '../common/Button';
import { Flame, Sparkles, HelpCircle } from 'lucide-react';
import { sound } from '../../services/sound';

interface ImposterGuessModalProps {
  isOpen: boolean;
  onResolved: () => void;
}

const shuffleArray = (list: string[]): string[] => {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ImposterGuessModal: React.FC<ImposterGuessModalProps> = ({
  isOpen,
  onResolved
}) => {
  const {
    secretWordItem,
    category,
    handleImposterGuess,
    players,
    roundResult
  } = useGame();

  const [selectedWord, setSelectedWord] = useState<string>('');
  const [customWord, setCustomWord] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const options = useMemo(() => {
    if (!secretWordItem) return [];
    return shuffleArray([secretWordItem.word, ...secretWordItem.decoys.slice(0, 5)]);
  }, [secretWordItem]);

  if (!secretWordItem || !category || !roundResult) return null;

  const imposterPlayer = players.find(p => p.id === roundResult.eliminatedPlayerId);

  const handleSubmit = (guess: string) => {
    if (!guess.trim()) return;
    setIsSubmitting(true);
    sound.playVoteSubmit();

    const isCorrect = handleImposterGuess(guess);
    setFeedback(
      isCorrect
        ? `Incredible! "${guess}" was correct! You stole the victory!`
        : `Wrong guess! You guessed "${guess}", but the word was "${secretWordItem.word}".`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      onResolved();
    }, 1800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      showCloseButton={false}
      maxWidth="md"
      title="Last Chance Redemption!"
    >
      <div className="space-y-3 sm:space-y-4 text-center select-none">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-3xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-3xl sm:text-4xl shadow-xs">
          <Flame className="text-amber-500" size={28} />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Can The Imposter Guess The Word?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            <strong className="text-slate-900">{imposterPlayer?.name || 'The Imposter'}</strong> was caught! If they can guess the secret word from the <span className="text-indigo-600 font-bold">{category.name}</span> category, they steal the victory!
          </p>
        </div>

        {/* Option Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1 max-h-[36dvh] overflow-y-auto px-0.5">
          {options.map(word => {
            const isSelected = selectedWord === word;

            return (
              <button
                key={word}
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setSelectedWord(word);
                  sound.playClick();
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all cursor-pointer min-h-[46px] flex items-center justify-center text-center truncate ${
                  isSelected
                    ? 'bg-amber-100 border-amber-500 text-amber-950 scale-102 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="truncate">{word}</span>
              </button>
            );
          })}
        </div>

        {/* Or Custom Input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            disabled={isSubmitting}
            value={customWord}
            autoCapitalize="words"
            autoComplete="off"
            spellCheck="false"
            onChange={e => {
              setCustomWord(e.target.value);
              setSelectedWord('');
            }}
            placeholder="Or type custom word guess..."
            className="flex-1 min-h-[44px] bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500"
          />
        </div>

        {feedback && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm leading-snug">
            {feedback}
          </div>
        )}

        <div className="pt-2">
          <Button
            fullWidth
            size="lg"
            variant="gold"
            disabled={(!selectedWord && !customWord.trim()) || isSubmitting}
            leftIcon={<Sparkles size={18} />}
            onClick={() => handleSubmit(selectedWord || customWord)}
          >
            Submit Final Guess
          </Button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              handleSubmit('SKIP_GUESS');
            }}
            className="min-h-[40px] text-xs text-slate-500 hover:text-slate-800 mt-1.5 cursor-pointer flex items-center justify-center gap-1 mx-auto font-medium"
          >
            <HelpCircle size={13} />
            <span>I give up, forfeit the guess</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
