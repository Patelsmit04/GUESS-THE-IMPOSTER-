import React, { useEffect } from 'react';
import { fireConfetti } from '../../utils/confetti';

interface ConfettiEffectProps {
  type?: 'crew' | 'imposter' | 'trophy';
}

export const ConfettiLauncher: React.FC<ConfettiEffectProps> = ({ type = 'crew' }) => {
  useEffect(() => {
    fireConfetti(type);
  }, [type]);

  return null;
};
