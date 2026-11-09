import confetti from 'canvas-confetti';

export const fireConfetti = (type: 'crew' | 'imposter' | 'trophy' = 'crew') => {
  if (typeof window === 'undefined') return;

  if (type === 'crew') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#10b981', '#38bdf8', '#fbbf24', '#ffffff']
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#10b981', '#38bdf8']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#10b981', '#38bdf8']
      });
    }, 250);
  } else if (type === 'imposter') {
    confetti({
      particleCount: 85,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#ffffff']
    });
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 60,
        origin: { x: 0.1 },
        colors: ['#ef4444', '#f59e0b', '#8b5cf6']
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 60,
        origin: { x: 0.9 },
        colors: ['#ef4444', '#f59e0b', '#8b5cf6']
      });
    }, 200);
  } else {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
};
