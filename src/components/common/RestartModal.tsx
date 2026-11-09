import React from 'react';
import { Modal } from './Modal';
import { useGame } from '../../context/useGame';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export const RestartModal: React.FC = () => {
  const {
    isRestartConfirmOpen,
    setIsRestartConfirmOpen,
    setPhase,
    resetEntireGame
  } = useGame();

  const handleReturnHome = () => {
    setIsRestartConfirmOpen(false);
    setPhase('HOME');
  };

  const handleRestartNewRound = () => {
    setIsRestartConfirmOpen(false);
    resetEntireGame();
  };

  return (
    <Modal
      isOpen={isRestartConfirmOpen}
      onClose={() => setIsRestartConfirmOpen(false)}
      title="Exit Current Game?"
      maxWidth="sm"
    >
      <div className="space-y-4 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <AlertTriangle size={28} />
        </div>

        <div>
          <h4 className="text-base font-bold text-white mb-1">
            Leave current match?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300">
            Progress in this active round will be discarded. What would you like to do?
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <Button fullWidth variant="danger" size="md" onClick={handleRestartNewRound}>
            Start New Game
          </Button>

          <Button fullWidth variant="secondary" size="md" onClick={handleReturnHome}>
            Return to Main Menu
          </Button>

          <Button fullWidth variant="ghost" size="sm" onClick={() => setIsRestartConfirmOpen(false)}>
            Continue Playing
          </Button>
        </div>
      </div>
    </Modal>
  );
};

