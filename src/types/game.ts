export type PlayerRole = 'CREW' | 'IMPOSTER';

export type GamePhase =
  | 'HOME'
  | 'SETUP'
  | 'CATEGORY_SELECT'
  | 'HANDOFF'
  | 'SECRET_REVEAL'
  | 'CLUE_ROUND'
  | 'DISCUSSION'
  | 'VOTING'
  | 'VOTE_REVEAL'
  | 'RESULT'
  | 'SCORECARD'
  | 'FINAL_SUMMARY';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  role: PlayerRole;
  score: number;
  roundScore: number;
  clueGiven: boolean;
  hasVoted: boolean;
  votedForId?: string | null;
  votedForIds?: string[];
  votesReceived: number;
  isEliminated: boolean;
}

export interface WordItem {
  id: string;
  word: string;
  hint: string;
  alternateWord?: string;
  decoys: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'Casual' | 'Clever' | 'Wild';
  accentColor: string;
  words: WordItem[];
}

export interface GameSettings {
  playerCount: number;
  imposterCount: number;
  discussionTime: number; // in seconds (0 = untimed)
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  privateVoting: boolean;
  totalRounds: number;
}

export interface RoundResult {
  roundNumber: number;
  winner: 'CREW' | 'IMPOSTER';
  secretWord: string;
  categoryName: string;
  imposterIds: string[];
  eliminatedPlayerId: string | null;
  eliminatedPlayerIds?: string[];
  totalImposters?: number;
  caughtImposters?: string[];
  remainingImposters?: string[];
  votesSummary?: Record<string, number>;
  reason: string;
}

export interface SessionStats {
  totalRoundsPlayed: number;
  crewWins: number;
  imposterWins: number;
}

