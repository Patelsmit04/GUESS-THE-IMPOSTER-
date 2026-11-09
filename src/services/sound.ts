class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private hapticsEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setHapticsEnabled(enabled: boolean) {
    this.hapticsEnabled = enabled;
  }

  public isHapticsEnabled(): boolean {
    return this.hapticsEnabled;
  }

  public triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' = 'light') {
    if (!this.hapticsEnabled || typeof window === 'undefined' || !navigator.vibrate) return;
    try {
      switch (type) {
        case 'light':
          navigator.vibrate(15);
          break;
        case 'medium':
          navigator.vibrate(35);
          break;
        case 'heavy':
          navigator.vibrate(60);
          break;
        case 'success':
          navigator.vibrate([20, 50, 40]);
          break;
        case 'warning':
          navigator.vibrate([40, 60, 40, 60, 40]);
          break;
      }
    } catch {
      // Ignore vibration errors on unsupported platforms
    }
  }

  // Tactical click / button press
  public playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio playback safety catch
    }
  }

  // 3D Card flip swoosh
  public playCardFlip() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
      this.triggerHaptic('light');
    } catch {
      //
    }
  }

  // Crew member reveal - radiant, warm arpeggio
  public playSecretRevealCrew() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
      this.triggerHaptic('success');
    } catch {
      //
    }
  }

  // Imposter reveal - suspenseful deep sting with sinister tritone
  public playSecretRevealImposter() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const oscBass = ctx.createOscillator();
      const gainBass = ctx.createGain();
      oscBass.type = 'sawtooth';
      oscBass.frequency.setValueAtTime(110, ctx.currentTime);
      oscBass.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.6);

      gainBass.gain.setValueAtTime(0.25, ctx.currentTime);
      gainBass.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      // Lowpass filter for smooth rumble
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);

      oscBass.connect(filter);
      filter.connect(gainBass);
      gainBass.connect(ctx.destination);

      oscBass.start();
      oscBass.stop(ctx.currentTime + 0.6);

      // Eerie tritone stab
      const oscTension = ctx.createOscillator();
      const gainTension = ctx.createGain();
      oscTension.type = 'sine';
      oscTension.frequency.setValueAtTime(466.16, ctx.currentTime + 0.05); // Bb4
      gainTension.gain.setValueAtTime(0.18, ctx.currentTime + 0.05);
      gainTension.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

      oscTension.connect(gainTension);
      gainTension.connect(ctx.destination);

      oscTension.start(ctx.currentTime + 0.05);
      oscTension.stop(ctx.currentTime + 0.55);

      this.triggerHaptic('heavy');
    } catch {
      //
    }
  }

  // Timer tick
  public playTimerTick(urgent: boolean = false) {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = urgent ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(urgent ? 880 : 500, ctx.currentTime);

      gain.gain.setValueAtTime(urgent ? 0.12 : 0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (urgent ? 0.08 : 0.04));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);

      if (urgent) this.triggerHaptic('light');
    } catch {
      //
    }
  }

  // Vote submit / ballot lock
  public playVoteSubmit() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
      this.triggerHaptic('medium');
    } catch {
      //
    }
  }

  // Drumroll suspense build
  public playDrumroll(onComplete?: () => void) {
    if (!this.soundEnabled) {
      if (onComplete) setTimeout(onComplete, 1200);
      return;
    }
    const ctx = this.initContext();
    if (!ctx) {
      if (onComplete) setTimeout(onComplete, 1200);
      return;
    }

    try {
      const totalHits = 14;
      for (let i = 0; i < totalHits; i++) {
        // Accelerating curve
        const t = (i / totalHits);
        const delay = (t * t) * 1.1; // quadratic acceleration up to 1.1s

        setTimeout(() => {
          try {
            if (!this.soundEnabled) return;
            const currentCtx = this.initContext();
            if (!currentCtx) return;

            const osc = currentCtx.createOscillator();
            const gain = currentCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140 + i * 8, currentCtx.currentTime);

            const vol = 0.05 + (i / totalHits) * 0.15;
            gain.gain.setValueAtTime(vol, currentCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, currentCtx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(currentCtx.destination);
            osc.start();
            osc.stop(currentCtx.currentTime + 0.06);
            if (i % 2 === 0) this.triggerHaptic('light');
          } catch {
            //
          }
        }, delay * 1000);
      }

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1250);
    } catch {
      if (onComplete) onComplete();
    }
  }

  // Crew Victory Fanfare
  public playCrewWin() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const chords = [
        { freq: 523.25, time: 0.0, dur: 0.15 }, // C5
        { freq: 659.25, time: 0.15, dur: 0.15 }, // E5
        { freq: 783.99, time: 0.3, dur: 0.15 }, // G5
        { freq: 1046.5, time: 0.45, dur: 0.6 } // C6
      ];

      chords.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

        gain.gain.setValueAtTime(0, ctx.currentTime + time);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + dur);
      });
      this.triggerHaptic('success');
    } catch {
      //
    }
  }

  // Imposter Victory Fanfare - mischievous chromatic phrase
  public playImposterWin() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [
        { freq: 392.00, time: 0.0, dur: 0.14 }, // G4
        { freq: 415.30, time: 0.14, dur: 0.14 }, // Ab4
        { freq: 392.00, time: 0.28, dur: 0.14 }, // G4
        { freq: 329.63, time: 0.42, dur: 0.5 } // E4
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

        // Lowpass filter to give rich brassy game-show sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, ctx.currentTime + time);

        gain.gain.setValueAtTime(0, ctx.currentTime + time);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + dur);
      });
      this.triggerHaptic('heavy');
    } catch {
      //
    }
  }

  // Score points increment
  public playScoreUp() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      this.triggerHaptic('light');
    } catch {
      //
    }
  }

  // Buzzer / error
  public playWrong() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
      this.triggerHaptic('warning');
    } catch {
      //
    }
  }
}

export const sound = new SoundEngine();

