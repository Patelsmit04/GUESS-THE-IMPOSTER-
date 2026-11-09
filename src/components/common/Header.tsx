import React from 'react';
import { useGame } from '../../context/useGame';
import { Volume2, VolumeX, HelpCircle, RotateCcw, Smartphone } from 'lucide-react';
import { sound } from '../../services/sound';

export const Header: React.FC = () => {
  const {
    phase,
    currentRound,
    settings,
    toggleSound,
    toggleHaptics,
    setIsHowToPlayOpen,
    setIsRestartConfirmOpen
  } = useGame();

  const isPlaying = phase !== 'HOME' && phase !== 'SETUP' && phase !== 'FINAL_SUMMARY';

  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between z-30 select-none">
      {/* Brand logo / Title */}
      <div
        onClick={() => {
          if (phase === 'HOME') return;
          setIsRestartConfirmOpen(true);
        }}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <span className="text-2xl sm:text-3xl transform group-hover:rotate-12 transition-transform">
          🎭
        </span>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black tracking-wider uppercase bg-gradient-to-r from-indigo-400 via-purple-300 to-rose-400 bg-clip-text text-transparent">
            Guess The Imposter
          </span>
          {isPlaying && (
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
              Round {currentRound} of {settings.totalRounds}
            </span>
          )}
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Haptics toggle */}
        <button
          onClick={toggleHaptics}
          title={settings.hapticsEnabled ? 'Haptics enabled' : 'Haptics muted'}
          aria-label="Toggle haptic vibration"
          className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
            settings.hapticsEnabled
              ? 'bg-slate-800/80 border-slate-700 text-indigo-400 hover:text-indigo-300'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
          }`}
        >
          <Smartphone size={18} />
        </button>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          title={settings.soundEnabled ? 'Sound enabled' : 'Sound muted'}
          aria-label="Toggle sound effects"
          className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
            settings.soundEnabled
              ? 'bg-slate-800/80 border-slate-700 text-indigo-400 hover:text-indigo-300'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
          }`}
        >
          {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* How to play modal trigger */}
        <button
          onClick={() => {
            sound.playClick();
            setIsHowToPlayOpen(true);
          }}
          title="Game Rules & Guide"
          aria-label="Game rules and guide"
          className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <HelpCircle size={18} />
        </button>

        {/* In-game quit/restart button */}
        {isPlaying && (
          <button
            onClick={() => {
              sound.playClick();
              setIsRestartConfirmOpen(true);
            }}
            title="Exit / Restart Game"
            aria-label="Exit or restart game"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <RotateCcw size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

