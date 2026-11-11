import { createContext } from 'react';
import type {
  GamePhase,
  Player,
  Category,
  WordItem,
  GameSettings,
  RoundResult,
  SessionStats
} from '../types/game';

export interface GameContextType {
  phase: GamePhase;
  players: Player[];
  currentRound: number;
  clueRoundCycle: number;
  category: Category | null;
  secretWordItem: WordItem | null;
  currentHandoffIndex: number;
  currentClueSpeakerIndex: number;
  currentVoterIndex: number;
  discussionSecondsRemaining: number;
  isDiscussionRunning: boolean;
  settings: GameSettings;
  roundResult: RoundResult | null;
  sessionStats: SessionStats;
  isRestartConfirmOpen: boolean;
  isHowToPlayOpen: boolean;
  isImposterGuessOpen: boolean;

  // Actions
  setPhase: (phase: GamePhase) => void;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  addPlayer: (name: string, avatar?: string) => boolean;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, name: string, avatar: string) => void;
  randomizePlayerNames: () => void;
  selectCategory: (category: Category | 'random') => void;
  startNewRound: () => void;
  nextHandoff: () => void;
  nextClueSpeaker: () => void;
  startAnotherClueRound: () => void;
  startDiscussion: () => void;
  tickDiscussion: () => void;
  pauseDiscussion: () => void;
  resumeDiscussion: () => void;
  startVoting: () => void;
  submitVote: (voterId: string, targetId: string) => void;
  resolveVoteOutcome: () => void;
  handleImposterGuess: (guessWord: string) => boolean;
  proceedToScorecard: () => void;
  proceedToNextRound: () => void;
  finishGameSummary: () => void;
  resetEntireGame: () => void;
  toggleSound: () => void;
  toggleHaptics: () => void;
  setIsRestartConfirmOpen: (open: boolean) => void;
  setIsHowToPlayOpen: (open: boolean) => void;
  setIsImposterGuessOpen: (open: boolean) => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);
