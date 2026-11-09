import type { GameSettings, SessionStats } from '../types/game';

const SETTINGS_KEY = 'gti_game_settings';
const STATS_KEY = 'gti_session_stats';
const ROSTER_KEY = 'gti_player_roster';

export const storage = {
  loadSettings: (defaultSettings: GameSettings): GameSettings => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  },

  saveSettings: (settings: GameSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      //
    }
  },

  loadStats: (): SessionStats => {
    try {
      const data = localStorage.getItem(STATS_KEY);
      return data ? JSON.parse(data) : { totalRoundsPlayed: 0, crewWins: 0, imposterWins: 0 };
    } catch {
      return { totalRoundsPlayed: 0, crewWins: 0, imposterWins: 0 };
    }
  },

  saveStats: (stats: SessionStats) => {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch {
      //
    }
  },

  loadRoster: (): string[] | null => {
    try {
      const data = localStorage.getItem(ROSTER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveRoster: (names: string[]) => {
    try {
      localStorage.setItem(ROSTER_KEY, JSON.stringify(names));
    } catch {
      //
    }
  }
};
