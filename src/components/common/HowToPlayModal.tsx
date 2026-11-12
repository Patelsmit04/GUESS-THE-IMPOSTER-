import React from 'react';
import { Modal } from './Modal';
import { useGame } from '../../context/useGame';
import { Button } from './Button';
import { Eye, ShieldAlert, Users, Award, HelpCircle } from 'lucide-react';

export const HowToPlayModal: React.FC = () => {
  const { isHowToPlayOpen, setIsHowToPlayOpen } = useGame();

  const rules = [
    {
      icon: <Eye className="text-cyan-400" size={24} />,
      title: '1. Secret Cards',
      description: 'Pass the device around. Crew members receive the Secret Word. The Imposter only knows the Category (or an undercover decoy)!'
    },
    {
      icon: <Users className="text-indigo-400" size={24} />,
      title: '2. Clue Round',
      description: 'Take turns giving ONE subtle clue related to the secret word. Be careful: if your clue is too obvious, the Imposter learns the word. If too vague, you look guilty!'
    },
    {
      icon: <ShieldAlert className="text-amber-400" size={24} />,
      title: '3. Discussion & Voting',
      description: 'Discuss the clues and question suspicious answers. Cast your secret vote for who you think is bluffing!'
    },
    {
      icon: <Award className="text-emerald-400" size={24} />,
      title: '4. Catch the Imposter & Win',
      description: 'If the Crew eliminates all Imposters, the Crew wins. Otherwise, the Imposters survive and win the round!'
    }
  ];

  return (
    <Modal
      isOpen={isHowToPlayOpen}
      onClose={() => setIsHowToPlayOpen(false)}
      title="How To Play"
      maxWidth="md"
    >
      <div className="space-y-3.5">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200"
          >
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
              {rule.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-0.5">{rule.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {rule.description}
              </p>
            </div>
          </div>
        ))}

        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center gap-2 text-indigo-800 text-xs font-medium">
          <HelpCircle size={16} className="shrink-0 text-indigo-600" />
          <span>Tip: Local Pass & Play requires only ONE phone or tablet for the whole party!</span>
        </div>

        <div className="pt-1">
          <Button fullWidth variant="primary" size="md" onClick={() => setIsHowToPlayOpen(false)}>
            Got it, Let's Play!
          </Button>
        </div>
      </div>
    </Modal>
  );
};

