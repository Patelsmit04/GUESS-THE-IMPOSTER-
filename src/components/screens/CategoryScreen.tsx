import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/useGame';
import { CATEGORIES } from '../../data/categories';
import type { Category } from '../../types/game';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Dices, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';

export const CategoryScreen: React.FC = () => {
  const { selectCategory, setPhase, category: currentCat } = useGame();
  const [selected, setSelected] = useState<Category | 'random'>(currentCat || CATEGORIES[0]);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Casual' | 'Clever' | 'Wild'>('All');

  const filteredCategories = CATEGORIES.filter(cat => {
    if (difficultyFilter === 'All') return true;
    return cat.difficulty === difficultyFilter;
  });

  const handleSelect = (cat: Category | 'random') => {
    setSelected(cat);
    sound.playClick();
  };

  const handleConfirm = () => {
    sound.playClick();
    selectCategory(selected);
  };

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4 select-none">
      {/* Title */}
      <div className="text-center mb-2.5 sm:mb-4">
        <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Choose Category
        </h2>
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-300">
          Pick the topic for this round, or let fate decide with Random!
        </p>

        {/* Difficulty Filter Chips */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {(['All', 'Casual', 'Clever', 'Wild'] as const).map(diff => (
            <button
              key={diff}
              type="button"
              onClick={() => {
                sound.playClick();
                setDifficultyFilter(diff);
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-[10px] sm:text-xs font-bold border transition-all cursor-pointer ${
                difficultyFilter === diff
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categories with constrained max-height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 mb-3 sm:mb-5 max-h-[54dvh] sm:max-h-[60dvh] overflow-y-auto pr-1">
        {/* Random / Surprise Me Card (always visible) */}
        {difficultyFilter === 'All' && (
          <motion.div
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('random')}
            className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              selected === 'random'
                ? 'bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 ring-3 ring-indigo-500/20'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Dices size={22} className="sm:w-6 sm:h-6" />
              </div>
              <Badge variant="glow" size="sm">
                Wildcard
              </Badge>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-black text-white mb-0.5 flex items-center gap-1.5">
                <span>Surprise Us!</span>
                <Sparkles size={14} className="text-amber-400" />
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                Randomly selects from all 12 categories for unpredictable fun!
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
              <span>All 192 words</span>
              <span className="font-semibold text-indigo-400">
                {selected === 'random' ? '✓ Selected' : 'Tap to Pick'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Filtered Category Cards */}
        {filteredCategories.map(cat => {
          const isSelected = selected !== 'random' && selected.id === cat.id;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(cat)}
              className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 ring-3 ring-indigo-500/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xl sm:text-2xl shadow-md">
                  {cat.icon}
                </div>
                <Badge
                  variant={
                    cat.difficulty === 'Casual'
                      ? 'success'
                      : cat.difficulty === 'Clever'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {cat.difficulty}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-white mb-0.5">
                  {cat.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span>{cat.words.length} secret words</span>
                <span className="font-semibold text-indigo-400">
                  {isSelected ? '✓ Selected' : 'Tap to Pick'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-auto flex items-center gap-2 sm:gap-3 pt-1">
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => setPhase('SETUP')}
          className="shrink-0"
        >
          Back
        </Button>

        <Button
          fullWidth
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={18} />}
          onClick={handleConfirm}
          className="py-3.5 text-base font-black"
        >
          Confirm & Deal Cards
        </Button>
      </div>
    </div>
  );
};
