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
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 select-none">
      {/* Title */}
      <div className="text-center mb-4">
        <span className="text-xs font-black tracking-widest text-indigo-400 uppercase block mb-1">
          Round {currentRound} • {category?.name}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Discussion Time
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Debate everyone's clues! Who hesitated? Whose clue sounded out of place?
        </p>
      </div>

      {/* Timer Circular Widget */}
      <div className="my-auto flex flex-col items-center justify-center py-4">
        <motion.div
          animate={isUrgent ? { scale: [1, 1.05, 1] } : undefined}
          transition={isUrgent ? { repeat: Infinity, duration: 1 } : undefined}
          className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-colors duration-300 ${
            isUrgent
              ? 'bg-rose-950/40 border-rose-500 shadow-rose-600/30 ring-8 ring-rose-500/20'
              : 'bg-slate-900 border-indigo-500/50 shadow-indigo-500/20 ring-4 ring-indigo-500/10'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase mb-1">
            <Clock size={15} className={isUrgent ? 'text-rose-400 animate-spin' : 'text-indigo-400'} />
            <span className={isUrgent ? 'text-rose-400' : 'text-indigo-300'}>
              {discussionSecondsRemaining === 0 ? "Time's Up!" : 'Time Remaining'}
            </span>
          </div>

          <div
            className={`text-4xl sm:text-5xl font-black tracking-tighter ${
              isUrgent ? 'text-rose-400 animate-pulse' : 'text-white'
            }`}
          >
            {formatTime(discussionSecondsRemaining)}
          </div>

          {/* Quick controls inside timer */}
          <div className="flex items-center gap-2 mt-2">
            {isDiscussionRunning ? (
              <button
                onClick={() => {
                  sound.playClick();
                  pauseDiscussion();
                }}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                title="Pause timer"
                aria-label="Pause timer"
              >
                <Pause size={14} />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  resumeDiscussion();
                }}
                className="p-1.5 rounded-lg bg-indigo-600 text-white border border-indigo-400 cursor-pointer"
                title="Resume timer"
                aria-label="Resume timer"
              >
                <Play size={14} />
              </button>
            )}

            <button
              onClick={handleAdd30s}
              className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold cursor-pointer flex items-center gap-1"
              title="Add 30 seconds"
            >
              <Plus size={12} />
              <span>30s</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Players Circle/Grid during discussion */}
      <div className="mb-6">
        <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Suspects in the room
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {players.map(p => (
            <div key={p.id} className="flex flex-col items-center">
              <Avatar emoji={p.avatar} size="md" />
              <span className="text-xs font-bold text-slate-200 mt-1 max-w-[70px] truncate text-center">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto space-y-2">
        <Button
          fullWidth
          size="xl"
          variant="primary"
          leftIcon={<Vote size={22} />}
          onClick={startVoting}
          className="shadow-indigo-600/40 text-lg font-black py-4"
        >
          Ready to Vote
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <MessageCircle size={13} className="text-indigo-400" />
          <span>Everyone must cast their vote in secret</span>
        </div>
      </div>
    </div>
  );
};

