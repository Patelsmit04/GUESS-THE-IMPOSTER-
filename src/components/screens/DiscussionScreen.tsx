import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Clock, Play, Pause, Plus, Vote, MessageCircle } from 'lucide-react';
import { sound } from '../../services/sound';

export const DiscussionScreen: React.FC = () => {
  const {
    players,
    currentRound,
    category,
    discussionSecondsRemaining,
    isDiscussionRunning,
    tickDiscussion,
    pauseDiscussion,
    resumeDiscussion,
    updateSettings,
    startVoting
  } = useGame();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isDiscussionRunning && discussionSecondsRemaining > 0) {
      interval = setInterval(() => {
        tickDiscussion();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDiscussionRunning, discussionSecondsRemaining, tickDiscussion]);

  // Spacebar hotkey to toggle pause/resume timer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ') {
        e.preventDefault();
        if (isDiscussionRunning) {
          pauseDiscussion();
        } else {
          resumeDiscussion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDiscussionRunning, pauseDiscussion, resumeDiscussion]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAdd30s = () => {
    sound.playClick();
    updateSettings({
      discussionTime: discussionSecondsRemaining + 30
    });
  };

  const isUrgent = discussionSecondsRemaining <= 10 && discussionSecondsRemaining > 0;

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-3 select-none">
      {/* Title */}
      <div className="text-center mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-400 uppercase block mb-0.5 truncate">
          Round {currentRound} • {category?.name}
        </span>
        <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Discussion Time
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-300">
          Debate clues! Who hesitated? Whose clue sounded out of place?
        </p>
      </div>

      {/* Timer Circular Widget - Responsive for small screens */}
      <div className="my-auto flex flex-col items-center justify-center py-2 sm:py-3">
        <motion.div
          animate={isUrgent ? { scale: [1, 1.04, 1] } : undefined}
          transition={isUrgent ? { repeat: Infinity, duration: 1 } : undefined}
          className={`relative w-36 h-36 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-colors duration-300 ${
            isUrgent
              ? 'bg-rose-950/40 border-rose-500 shadow-rose-600/30 ring-4 sm:ring-8 ring-rose-500/20'
              : 'bg-slate-900 border-indigo-500/50 shadow-indigo-500/20 ring-2 sm:ring-4 ring-indigo-500/10'
          }`}
        >
          <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase mb-0.5">
            <Clock size={13} className={isUrgent ? 'text-rose-400 animate-spin' : 'text-indigo-400'} />
            <span className={isUrgent ? 'text-rose-400' : 'text-indigo-300'}>
              {discussionSecondsRemaining === 0 ? "Time's Up!" : 'Remaining'}
            </span>
          </div>

          <div
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter ${
              isUrgent ? 'text-rose-400 animate-pulse' : 'text-white'
            }`}
          >
            {formatTime(discussionSecondsRemaining)}
          </div>

          {/* Quick controls inside timer */}
          <div className="flex items-center gap-1.5 mt-1 sm:mt-2">
            {isDiscussionRunning ? (
              <button
                onClick={() => {
                  sound.playClick();
                  pauseDiscussion();
                }}
                className="p-1 sm:p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer text-xs"
                title="Pause timer (Space)"
                aria-label="Pause timer"
              >
                <Pause size={13} />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  resumeDiscussion();
                }}
                className="p-1 sm:p-1.5 rounded-lg bg-indigo-600 text-white border border-indigo-400 cursor-pointer text-xs"
                title="Resume timer (Space)"
                aria-label="Resume timer"
              >
                <Play size={13} />
              </button>
            )}

            <button
              onClick={handleAdd30s}
              className="px-2 py-0.5 sm:py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[10px] sm:text-xs font-bold cursor-pointer flex items-center gap-1"
              title="Add 30 seconds"
            >
              <Plus size={11} />
              <span>30s</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Players Circle/Grid during discussion */}
      <div className="mb-3 sm:mb-5">
        <div className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Suspects in the room ({players.length})
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 max-h-[18dvh] overflow-y-auto px-1">
          {players.map(p => (
            <div key={p.id} className="flex flex-col items-center min-w-0">
              <Avatar emoji={p.avatar} size="sm" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-200 mt-0.5 max-w-[65px] truncate text-center">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto space-y-1.5 pt-1">
        <Button
          fullWidth
          size="xl"
          variant="primary"
          leftIcon={<Vote size={20} />}
          onClick={startVoting}
          className="shadow-indigo-600/40 text-base sm:text-lg font-black py-3.5 sm:py-4"
        >
          Ready to Vote
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
          <MessageCircle size={12} className="text-indigo-400 shrink-0" />
          <span>Everyone casts their secret ballot one by one</span>
        </div>
      </div>
    </div>
  );
};
