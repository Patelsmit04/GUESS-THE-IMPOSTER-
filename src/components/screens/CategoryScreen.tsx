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

  const handleSelect = (cat: Category | 'random') => {
    setSelected(cat);
    sound.playClick();
  };

  const handleConfirm = () => {
    sound.playClick();
    selectCategory(selected);
  };

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-4 select-none">
      {/* Title */}
      <div className="text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Choose Category
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Pick the topic for this round, or let fate decide with Random!
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-6 overflow-y-auto pr-1">
        {/* Random / Surprise Me Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('random')}
          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
            selected === 'random'
              ? 'bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-500/20'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Dices size={26} />
            </div>
            <Badge variant="glow" size="sm">
              Wildcard
            </Badge>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-black text-white mb-1 flex items-center gap-1.5">
              <span>Surprise Us!</span>
              <Sparkles size={16} className="text-amber-400" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Randomly picks from any category for unpredictable fun!
            </p>
          </div>
        </motion.div>

        {/* Category List */}
        {CATEGORIES.map(cat => {
          const isSelected = selected !== 'random' && selected.id === cat.id;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(cat)}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-500/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-2xl shadow-md">
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
                <h3 className="text-base sm:text-lg font-black text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
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
      <div className="mt-auto flex items-center gap-3 pt-2">
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => setPhase('SETUP')}
        >
          Back
        </Button>

        <Button
          fullWidth
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={20} />}
          onClick={handleConfirm}
        >
          Confirm & Deal Cards
        </Button>
      </div>
    </div>
  );
};
