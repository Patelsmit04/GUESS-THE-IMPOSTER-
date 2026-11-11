import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { AVATAR_OPTIONS } from '../../data/categories';
import { UserPlus, Trash2, Shuffle, ArrowRight, Settings, Clock, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { sound } from '../../services/sound';

export const SetupScreen: React.FC = () => {
  const {
    players,
    settings,
    addPlayer,
    removePlayer,
    updatePlayer,
    randomizePlayerNames,
    updateSettings,
    setPhase
  } = useGame();

  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].emoji);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newName.trim()) return;

    const success = addPlayer(newName.trim(), selectedAvatar);
    if (success) {
      setNewName('');
      setErrorMsg('');
      const nextIdx = (AVATAR_OPTIONS.findIndex(a => a.emoji === selectedAvatar) + 1) % AVATAR_OPTIONS.length;
      setSelectedAvatar(AVATAR_OPTIONS[nextIdx].emoji);
    } else {
      setErrorMsg('Name taken or invalid (3–10 players max)');
    }
  };

  const handleStartGame = () => {
    if (players.length < 3) {
      sound.playWrong();
      setErrorMsg('Add at least 3 players to start!');
      return;
    }
    sound.playClick();
    setPhase('CATEGORY_SELECT');
  };

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4 select-none">
      {/* Header Banner */}
      <div className="text-center mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Player Setup
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-300">
          Gather your crew around one phone. 3 to 10 players!
        </p>
      </div>

      {/* Input bar to add players */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-xl">
        <form onSubmit={handleAddPlayer} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Avatar selector popup trigger */}
            <button
              type="button"
              onClick={() => setEditingPlayerId(editingPlayerId === 'NEW' ? null : 'NEW')}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center text-xl sm:text-2xl hover:border-indigo-400 transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              title="Change avatar"
              aria-label="Change avatar"
            >
              {selectedAvatar}
            </button>

            <input
              type="text"
              value={newName}
              onChange={e => {
                setNewName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              maxLength={15}
              autoComplete="off"
              autoCapitalize="words"
              placeholder="Enter player name..."
              className="flex-1 min-w-0 bg-slate-800/80 border border-slate-700/80 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-slate-500 text-xs sm:text-sm md:text-base focus:outline-none focus:border-indigo-400 transition-colors"
            />

            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={!newName.trim() || players.length >= 10}
              leftIcon={<UserPlus size={16} />}
              className="shrink-0"
            >
              Add
            </Button>
          </div>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold text-rose-400 pl-1"
            >
              {errorMsg}
            </motion.p>
          )}

          {/* Quick random fill action */}
          <div className="flex items-center justify-between pt-0.5 text-[11px] sm:text-xs">
            <span className="text-slate-400 font-medium">
              Players: <strong className="text-white">{players.length}</strong> / 10
            </span>
            <button
              type="button"
              onClick={randomizePlayerNames}
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-colors"
            >
              <Shuffle size={12} />
              <span>Randomize Names</span>
            </button>
          </div>
        </form>

        {/* Avatar Drawer for new player or editing player */}
        <AnimatePresence>
          {editingPlayerId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-slate-800 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Pick an Avatar
                </span>
                <button
                  type="button"
                  onClick={() => setEditingPlayerId(null)}
                  className="text-xs text-indigo-400 hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map(opt => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      if (editingPlayerId === 'NEW') {
                        setSelectedAvatar(opt.emoji);
                      } else {
                        const target = players.find(p => p.id === editingPlayerId);
                        if (target) updatePlayer(target.id, target.name, opt.emoji);
                      }
                      sound.playClick();
                      setEditingPlayerId(null);
                    }}
                    className={`h-11 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                      (editingPlayerId === 'NEW' ? selectedAvatar === opt.emoji : false)
                        ? 'bg-indigo-600/30 border-indigo-400 scale-105'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {opt.emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Players List with max-height to ensure bottom button is always visible on short screens */}
      <div className="flex-1 max-h-[38dvh] sm:max-h-[44dvh] overflow-y-auto mb-3 sm:mb-4 pr-1">
        <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
          Roster ({players.length} Players)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <AnimatePresence initial={false}>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md group hover:border-slate-700 transition-colors"
              >
                <div
                  className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                  onClick={() => setEditingPlayerId(player.id)}
                  title="Click to change avatar"
                >
                  <Avatar emoji={player.avatar} size="sm" />
                  <div className="text-left min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white block truncate max-w-[130px] sm:max-w-[160px]">
                      {player.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Player #{index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {players.length > 3 && (
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="p-1.5 sm:p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
                      title="Remove player"
                      aria-label={`Remove ${player.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Advanced Match Options Toggle */}
      <div className="mb-3 sm:mb-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-2.5 sm:p-3.5">
        <button
          type="button"
          onClick={() => setShowAdvancedSettings(prev => !prev)}
          className="w-full flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider cursor-pointer"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Settings size={14} className="text-indigo-400" />
            <span>Match Rules & Timer</span>
          </div>
          <span className="text-indigo-400">
            {showAdvancedSettings ? 'Hide ▲' : 'Customize ▼'}
          </span>
        </button>

        <AnimatePresence>
          {showAdvancedSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3 mt-2.5 border-t border-slate-800 space-y-3 text-xs text-slate-300 overflow-hidden"
            >
              {/* Discussion timer setting */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <Clock size={13} className="text-cyan-400 shrink-0" />
                  <span className="truncate">Discussion Timer:</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {[0, 30, 60, 90].map(sec => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        updateSettings({ discussionTime: sec });
                        sound.playClick();
                      }}
                      className={`px-2 py-1 rounded-lg font-bold border transition-all cursor-pointer text-xs ${
                        settings.discussionTime === sec
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sec === 0 ? 'Off' : `${sec}s`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Imposter word guess redemption */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldAlert size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate">Imposter Can Guess Word:</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({ allowImposterGuess: !settings.allowImposterGuess });
                    sound.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer flex items-center gap-1 text-xs shrink-0 ${
                    settings.allowImposterGuess
                      ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}
                >
                  {settings.allowImposterGuess && <Check size={12} />}
                  <span>{settings.allowImposterGuess ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>

              {/* Total match rounds */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <Sparkles size={13} className="text-indigo-400 shrink-0" />
                  <span className="truncate">Rounds per Match:</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {[1, 3, 5].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        updateSettings({ totalRounds: r });
                        sound.playClick();
                      }}
                      className={`px-2 py-1 rounded-lg font-bold border transition-all cursor-pointer text-xs ${
                        settings.totalRounds === r
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {r} {r === 1 ? 'Round' : 'Rds'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-1">
        <Button
          fullWidth
          size="lg"
          variant="primary"
          disabled={players.length < 3}
          rightIcon={<ArrowRight size={18} />}
          onClick={handleStartGame}
          className="py-3.5 text-base font-black"
        >
          Select Category ({players.length} Ready)
        </Button>
      </div>
    </div>
  );
};
