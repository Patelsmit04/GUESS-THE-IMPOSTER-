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
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-indigo-600 uppercase block mb-0.5 truncate">
          Round {currentRound} • {category?.name}
        </span>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
          Discussion Time
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600">
          Debate clues! Who hesitated? Whose clue sounded out of place?
        </p>
      </div>

      {/* Timer Circular Widget */}
      <div className="my-auto flex flex-col items-center justify-center py-2 sm:py-3">
        <motion.div
          animate={isUrgent ? { scale: [1, 1.04, 1] } : undefined}
          transition={isUrgent ? { repeat: Infinity, duration: 1 } : undefined}
          className={`relative w-36 h-36 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center border-4 shadow-md transition-colors duration-300 ${
            isUrgent
              ? 'bg-rose-50 border-rose-500'
              : 'bg-white border-indigo-600'
          }`}
        >
          <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase mb-0.5">
            <Clock size={13} className={isUrgent ? 'text-rose-600 animate-spin' : 'text-indigo-600'} />
            <span className={isUrgent ? 'text-rose-600' : 'text-indigo-700'}>
              {discussionSecondsRemaining === 0 ? "Time's Up!" : 'Remaining'}
            </span>
          </div>

          <div className={`text-4xl sm:text-6xl font-black tracking-tight tabular-nums ${
            isUrgent ? 'text-rose-600' : 'text-slate-900'
          }`}>
            {formatTime(discussionSecondsRemaining)}
          </div>

          <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">
            Press Space to pause
          </span>
        </motion.div>

        {/* Timer quick controls */}
        <div className="flex items-center gap-2 mt-3 sm:mt-4">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (isDiscussionRunning) {
                pauseDiscussion();
              } else {
                resumeDiscussion();
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            {isDiscussionRunning ? (
              <>
                <Pause size={14} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleAdd30s}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
          >
            <Plus size={14} />
            <span>+30s</span>
          </button>
        </div>
      </div>

      {/* Suspects in this round */}
      <div className="mb-3 sm:mb-4 bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 shadow-xs">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
          <span className="flex items-center gap-1">
            <MessageCircle size={13} />
            <span>Suspects Under Questioning</span>
          </span>
          <span>{players.length} Players</span>
        </div>

        <div className="flex items-center justify-start gap-2 sm:gap-3 overflow-x-auto pb-1 px-1">
          {players.map(p => (
            <div key={p.id} className="flex flex-col items-center shrink-0">
              <Avatar emoji={p.avatar} size="sm" />
              <span className="text-[11px] font-bold text-slate-700 mt-1 truncate max-w-[65px] text-center">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Advance to Voting */}
      <div className="mt-auto pt-1">
        <Button
          fullWidth
          size="xl"
          variant="danger"
          leftIcon={<Vote size={20} />}
          onClick={startVoting}
          className="py-3.5 sm:py-4 text-base sm:text-lg font-black"
        >
          Proceed to Voting Ballot
        </Button>
      </div>
    </div>
  );
};
