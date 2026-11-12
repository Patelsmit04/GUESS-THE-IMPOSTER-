import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { AVATAR_OPTIONS } from '../../data/categories';
import { UserPlus, Trash2, Shuffle, ArrowRight, Settings, Clock, Sparkles, Flame, Users } from 'lucide-react';
import { sound } from '../../services/sound';

const IMPOSTER_OPTIONS = [
  {
    count: 1,
    title: '1 Imposter',
    subtitle: 'Classic mode',
    minPlayers: 3,
    badge: 'Classic'
  },
  {
    count: 2,
    title: '2 Imposters',
    subtitle: 'Double trouble',
    minPlayers: 5,
    badge: 'Co-op Bluff'
  },
  {
    count: 3,
    title: '3 Imposters',
    subtitle: 'Triple threat',
    minPlayers: 7,
    badge: 'High Suspicion'
  },
  {
    count: 4,
    title: '4 Imposters',
    subtitle: 'Maximum chaos',
    minPlayers: 9,
    badge: 'Total Mayhem'
  }
];

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

  const currentImposterOption = IMPOSTER_OPTIONS.find(opt => opt.count === settings.imposterCount) || IMPOSTER_OPTIONS[0];
  const minRequiredPlayers = currentImposterOption.minPlayers;
  const isPlayerCountValid = players.length >= minRequiredPlayers;

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
      setErrorMsg('Name taken or invalid (3–20 players max)');
    }
  };

  const handleSelectImposters = (count: number) => {
    sound.playClick();
    updateSettings({ imposterCount: count });
  };

  const handleStartGame = () => {
    if (players.length < minRequiredPlayers) {
      sound.playWrong();
      setErrorMsg(`Need at least ${minRequiredPlayers} players for ${settings.imposterCount} Imposter(s)! Currently have ${players.length}.`);
      return;
    }
    sound.playClick();
    setPhase('CATEGORY_SELECT');
  };

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4 select-none">
      {/* Header Banner */}
      <div className="text-center mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
          Player Setup
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600">
          Gather your crew around one phone. 3 to 20 players!
        </p>
      </div>

      {/* Input bar to add players */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm">
        <form onSubmit={handleAddPlayer} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Avatar selector popup trigger */}
            <button
              type="button"
              onClick={() => setEditingPlayerId(editingPlayerId === 'NEW' ? null : 'NEW')}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 border-2 border-slate-300 flex items-center justify-center text-xl sm:text-2xl hover:border-indigo-500 transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
              className="flex-1 min-w-0 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 placeholder-slate-400 text-xs sm:text-sm md:text-base focus:outline-none focus:bg-white focus:border-indigo-600 transition-colors"
            />

            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={!newName.trim() || players.length >= 20}
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
              className="text-[11px] font-bold text-rose-600 pl-1"
            >
              {errorMsg}
            </motion.p>
          )}

          {/* Quick random fill action */}
          <div className="flex items-center justify-between pt-0.5 text-[11px] sm:text-xs">
            <span className="text-slate-500 font-medium">
              Players: <strong className="text-slate-900">{players.length}</strong> / 20
            </span>
            <button
              type="button"
              onClick={randomizePlayerNames}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition-colors"
            >
              <Shuffle size={12} />
              <span>Randomize Names</span>
            </button>
          </div>
        </form>

        {/* Avatar Drawer */}
        <AnimatePresence>
          {editingPlayerId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pick an Avatar
                </span>
                <button
                  type="button"
                  onClick={() => setEditingPlayerId(null)}
                  className="text-xs text-indigo-600 hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-0.5">
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
                        ? 'bg-indigo-50 border-indigo-600 scale-105'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
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

      {/* Number of Imposters Selector */}
      <div className="mb-3 sm:mb-4 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Flame size={16} className="text-rose-600" />
            <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
              Number of Imposters
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            {settings.imposterCount} {settings.imposterCount === 1 ? 'Vote / Player' : 'Votes / Player'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {IMPOSTER_OPTIONS.map(opt => {
            const isSelected = settings.imposterCount === opt.count;
            const meetsMin = players.length >= opt.minPlayers;

            return (
              <motion.button
                key={opt.count}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectImposters(opt.count)}
                className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-rose-50/70 border-rose-500 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-xs sm:text-sm font-black ${
                    isSelected ? 'text-rose-700' : 'text-slate-800'
                  }`}>
                    {opt.title}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 font-medium block mb-1.5 leading-tight">
                  {opt.subtitle}
                </span>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[9px] font-bold">
                  <span className={meetsMin ? 'text-slate-500' : 'text-amber-600 font-semibold'}>
                    Min {opt.minPlayers}p
                  </span>
                  <span className={isSelected ? 'text-rose-600' : 'text-slate-400'}>
                    {opt.count} {opt.count === 1 ? 'Vote' : 'Votes'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {!isPlayerCountValid && (
          <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-semibold flex items-center gap-1.5">
            <Users size={14} className="shrink-0 text-amber-600" />
            <span>
              {settings.imposterCount} Imposters mode requires at least <strong>{minRequiredPlayers} players</strong> (currently {players.length}). Add more players or pick fewer imposters!
            </span>
          </div>
        )}
      </div>

      {/* Players Roster List */}
      <div className="flex-1 max-h-[32dvh] sm:max-h-[38dvh] overflow-y-auto mb-3 sm:mb-4 pr-1">
        <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
          Roster ({players.length} Players)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <AnimatePresence initial={false}>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs group hover:border-slate-300 transition-colors"
              >
                <div
                  className="flex items-center gap-2 min-w-0 cursor-pointer"
                  onClick={() => setEditingPlayerId(player.id)}
                  title="Click to change avatar"
                >
                  <Avatar emoji={player.avatar} size="sm" />
                  <div className="text-left min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate max-w-[110px] sm:max-w-[140px]">
                      {player.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Player #{index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {players.length > 3 && (
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
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
      <div className="mb-3 sm:mb-4 bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 shadow-xs">
        <button
          type="button"
          onClick={() => setShowAdvancedSettings(prev => !prev)}
          className="w-full flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Settings size={14} className="text-indigo-600" />
            <span>Match Rules & Timer</span>
          </div>
          <span className="text-indigo-600">
            {showAdvancedSettings ? 'Hide ▲' : 'Customize ▼'}
          </span>
        </button>

        <AnimatePresence>
          {showAdvancedSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3 mt-2.5 border-t border-slate-200 space-y-3 text-xs text-slate-600 overflow-hidden"
            >
              {/* Discussion timer setting */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <Clock size={13} className="text-cyan-600 shrink-0" />
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
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {sec === 0 ? 'Off' : `${sec}s`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total match rounds */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 truncate">
                  <Sparkles size={13} className="text-indigo-600 shrink-0" />
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
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
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
          disabled={!isPlayerCountValid}
          rightIcon={<ArrowRight size={18} />}
          onClick={handleStartGame}
          className="py-3.5 text-base font-black"
        >
          {isPlayerCountValid
            ? `Select Category (${players.length} Ready • ${settings.imposterCount} ${settings.imposterCount === 1 ? 'Imposter' : 'Imposters'})`
            : `Need ${minRequiredPlayers} Players for ${settings.imposterCount} Imposters (${players.length}/${minRequiredPlayers})`
          }
        </Button>
      </div>
    </div>
  );
};
