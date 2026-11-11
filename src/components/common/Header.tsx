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
    <header className="w-full max-w-4xl mx-auto px-2.5 sm:px-4 py-2 sm:py-3.5 flex items-center justify-between z-30 select-none">
      {/* Brand logo / Title */}
      <div
        onClick={() => {
          if (phase === 'HOME') return;
          setIsRestartConfirmOpen(true);
        }}
        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group min-w-0"
        role="button"
        tabIndex={0}
        aria-label="Guess The Imposter Home"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (phase !== 'HOME') setIsRestartConfirmOpen(true);
          }
        }}
      >
        <span className="text-xl sm:text-2xl md:text-3xl shrink-0 transform group-hover:rotate-12 transition-transform">
          🎭
        </span>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase text-slate-900 truncate">
            <span className="hidden xs:inline">Guess The </span>
            <span className="text-rose-600">Imposter</span>
          </span>
          {isPlaying && (
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wide uppercase truncate">
              Round {currentRound}
            </span>
          )}
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Haptics toggle */}
        <button
          onClick={toggleHaptics}
          title={settings.hapticsEnabled ? 'Haptics enabled' : 'Haptics muted'}
          aria-label="Toggle haptic vibration"
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            settings.hapticsEnabled
              ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
          }`}
        >
          <Smartphone size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          title={settings.soundEnabled ? 'Sound enabled' : 'Sound muted'}
          aria-label="Toggle sound effects"
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            settings.soundEnabled
              ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
          }`}
        >
          {settings.soundEnabled ? (
            <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />
          ) : (
            <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" />
          )}
        </button>

        {/* How to play modal trigger */}
        <button
          onClick={() => {
            sound.playClick();
            setIsHowToPlayOpen(true);
          }}
          title="Game Rules & Guide"
          aria-label="Game rules and guide"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <HelpCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
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
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        )}
      </div>
    </header>
  );
};
