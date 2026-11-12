import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type {
  GamePhase,
  Player,
  Category,
  WordItem,
  GameSettings,
  RoundResult,
  SessionStats
} from '../types/game';
import { CATEGORIES, AVATAR_OPTIONS, DEFAULT_PLAYER_NAMES } from '../data/categories';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { GameContext } from './GameContextDef';
import { calculateRoundScores, tallyVotes } from '../utils/gameLogic';

const createPlayerId = () => `p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

const pickRandomCategory = (): Category => {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
};

const pickRandomWord = (cat: Category): WordItem => {
  return cat.words[Math.floor(Math.random() * cat.words.length)];
};

const pickRandomImposterIndices = (totalPlayers: number, numImposters: number): Set<number> => {
  const indices = Array.from({ length: totalPlayers }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return new Set(indices.slice(0, numImposters));
};

const getShuffledPlayerNames = (): string[] => {
  const list = [...DEFAULT_PLAYER_NAMES];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const DEFAULT_SETTINGS: GameSettings = {
  playerCount: 4,
  imposterCount: 1,
  discussionTime: 60,
  soundEnabled: true,
  hapticsEnabled: true,
  privateVoting: true,
  totalRounds: 3
};

const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p-1',
    name: 'Alex',
    avatar: '🦊',
    color: 'from-orange-500 to-amber-500',
    role: 'CREW',
    score: 0,
    roundScore: 0,
    clueGiven: false,
    hasVoted: false,
    votedForId: null,
    votedForIds: [],
    votesReceived: 0,
    isEliminated: false
  },
  {
    id: 'p-2',
    name: 'Jordan',
    avatar: '🤖',
    color: 'from-cyan-500 to-blue-500',
    role: 'CREW',
    score: 0,
    roundScore: 0,
    clueGiven: false,
    hasVoted: false,
    votedForId: null,
    votedForIds: [],
    votesReceived: 0,
    isEliminated: false
  },
  {
    id: 'p-3',
    name: 'Taylor',
    avatar: '🦁',
    color: 'from-yellow-500 to-orange-500',
    role: 'CREW',
    score: 0,
    roundScore: 0,
    clueGiven: false,
    hasVoted: false,
    votedForId: null,
    votedForIds: [],
    votesReceived: 0,
    isEliminated: false
  },
  {
    id: 'p-4',
    name: 'Morgan',
    avatar: '🥷',
    color: 'from-indigo-500 to-purple-500',
    role: 'CREW',
    score: 0,
    roundScore: 0,
    clueGiven: false,
    hasVoted: false,
    votedForId: null,
    votedForIds: [],
    votesReceived: 0,
    isEliminated: false
  }
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<GamePhase>('HOME');
  const [settings, setSettings] = useState<GameSettings>(() => storage.loadSettings(DEFAULT_SETTINGS));
  const [sessionStats, setSessionStats] = useState<SessionStats>(() => storage.loadStats());
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [clueRoundCycle, setClueRoundCycle] = useState<number>(1);
  const [category, setCategory] = useState<Category | null>(CATEGORIES[0]);
  const [secretWordItem, setSecretWordItem] = useState<WordItem | null>(null);

  const [currentHandoffIndex, setCurrentHandoffIndex] = useState<number>(0);
  const [currentClueSpeakerIndex, setCurrentClueSpeakerIndex] = useState<number>(0);
  const [currentVoterIndex, setCurrentVoterIndex] = useState<number>(0);

  const [discussionSecondsRemaining, setDiscussionSecondsRemaining] = useState<number>(60);
  const [isDiscussionRunning, setIsDiscussionRunning] = useState<boolean>(false);

  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [isRestartConfirmOpen, setIsRestartConfirmOpen] = useState<boolean>(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const finalizedRounds = useRef<Set<number>>(new Set());

  // Sync sound settings with sound engine
  useEffect(() => {
    sound.setSoundEnabled(settings.soundEnabled);
    sound.setHapticsEnabled(settings.hapticsEnabled);
  }, [settings.soundEnabled, settings.hapticsEnabled]);

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      storage.saveSettings(updated);
      return updated;
    });
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
    sound.playClick();
  };

  const toggleHaptics = () => {
    updateSettings({ hapticsEnabled: !settings.hapticsEnabled });
    sound.playClick();
  };

  const addPlayer = (name: string, avatar?: string): boolean => {
    const trimmed = name.trim();
    if (!trimmed || players.length >= 20) return false;

    // Check duplicate
    if (players.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      sound.playWrong();
      return false;
    }

    const availableAvatar = avatar || AVATAR_OPTIONS[players.length % AVATAR_OPTIONS.length].emoji;
    const newPlayer: Player = {
      id: createPlayerId(),
      name: trimmed,
      avatar: availableAvatar,
      color: 'from-indigo-500 to-purple-500',
      role: 'CREW',
      score: 0,
      roundScore: 0,
      clueGiven: false,
      hasVoted: false,
      votedForId: null,
      votedForIds: [],
      votesReceived: 0,
      isEliminated: false
    };

    setPlayers(prev => [...prev, newPlayer]);
    sound.playClick();
    return true;
  };

  const removePlayer = (id: string) => {
    if (players.length <= 3) return; // Minimum 3 players for social deduction
    setPlayers(prev => prev.filter(p => p.id !== id));
    sound.playClick();
  };

  const updatePlayer = (id: string, name: string, avatar: string) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, name: name.trim() || p.name, avatar } : p))
    );
  };

  const randomizePlayerNames = () => {
    const shuffledNames = getShuffledPlayerNames();
    setPlayers(prev =>
      prev.map((p, idx) => ({
        ...p,
        name: shuffledNames[idx] || `Player ${idx + 1}`,
        avatar: AVATAR_OPTIONS[idx % AVATAR_OPTIONS.length].emoji
      }))
    );
    sound.playClick();
  };

  const selectCategory = (cat: Category | 'random') => {
    let chosen: Category;
    if (cat === 'random') {
      chosen = pickRandomCategory();
    } else {
      chosen = cat;
    }
    setCategory(chosen);
    startNewRoundWithCategory(chosen);
  };

  const startNewRoundWithCategory = (cat: Category) => {
    // Pick random word
    const randomWord = pickRandomWord(cat);
    setSecretWordItem(randomWord);

    // Assign roles randomly
    const totalPlayers = players.length;
    const numImposters = Math.max(1, Math.min(settings.imposterCount, totalPlayers - 1));

    // Pick imposter indices randomly
    const imposterIndices = pickRandomImposterIndices(totalPlayers, numImposters);

    // Reset player round states
    setPlayers(prev =>
      prev.map((player, idx) => ({
        ...player,
        role: imposterIndices.has(idx) ? 'IMPOSTER' : 'CREW',
        roundScore: 0,
        clueGiven: false,
        hasVoted: false,
        votedForId: null,
        votedForIds: [],
        votesReceived: 0,
        isEliminated: false
      }))
    );

    setCurrentHandoffIndex(0);
    setCurrentClueSpeakerIndex(0);
    setCurrentVoterIndex(0);
    setClueRoundCycle(1);
    setRoundResult(null);
    setDiscussionSecondsRemaining(settings.discussionTime || 60);
    setIsDiscussionRunning(false);

    setPhase('HANDOFF');
  };

  const startNewRound = () => {
    if (!category) {
      setPhase('CATEGORY_SELECT');
      return;
    }
    startNewRoundWithCategory(category);
  };

  const nextHandoff = () => {
    if (currentHandoffIndex + 1 < players.length) {
      setCurrentHandoffIndex(prev => prev + 1);
      setPhase('HANDOFF');
    } else {
      // All players have reviewed their cards!
      setCurrentClueSpeakerIndex(0);
      setClueRoundCycle(1);
      setPhase('CLUE_ROUND');
    }
  };

  const nextClueSpeaker = () => {
    setPlayers(prev =>
      prev.map((p, idx) => (idx === currentClueSpeakerIndex ? { ...p, clueGiven: true } : p))
    );

    if (currentClueSpeakerIndex + 1 < players.length) {
      setCurrentClueSpeakerIndex(prev => prev + 1);
      sound.playClick();
    }
  };

  const startAnotherClueRound = () => {
    sound.playClick();
    setClueRoundCycle(prev => prev + 1);
    // Reset all players clueGiven status for new clue cycle
    setPlayers(prev =>
      prev.map(p => ({
        ...p,
        clueGiven: false
      }))
    );
    setCurrentClueSpeakerIndex(0);
  };

  const startDiscussion = () => {
    sound.playClick();
    setDiscussionSecondsRemaining(settings.discussionTime || 60);
    setIsDiscussionRunning(settings.discussionTime > 0);
    setPhase('DISCUSSION');
  };

  const tickDiscussion = () => {
    setDiscussionSecondsRemaining(prev => {
      if (prev <= 1) {
        setIsDiscussionRunning(false);
        sound.playTimerTick(true);
        return 0;
      }
      if (prev <= 6) {
        sound.playTimerTick(true);
      } else if (prev % 15 === 0) {
        sound.playTimerTick(false);
      }
      return prev - 1;
    });
  };

  const pauseDiscussion = () => {
    setIsDiscussionRunning(false);
  };

  const resumeDiscussion = () => {
    if (discussionSecondsRemaining > 0) {
      setIsDiscussionRunning(true);
    }
  };

  const startVoting = () => {
    sound.playClick();
    setIsDiscussionRunning(false);
    // Reset vote state
    setPlayers(prev =>
      prev.map(p => ({
        ...p,
        hasVoted: false,
        votedForId: null,
        votedForIds: [],
        votesReceived: 0
      }))
    );
    setCurrentVoterIndex(0);
    setPhase('VOTING');
  };

  const submitVote = (voterId: string, targetIds: string | string[]) => {
    sound.playVoteSubmit();

    const targets = [...new Set(Array.isArray(targetIds) ? targetIds : [targetIds])];

    setPlayers(prev => {
      const voter = prev.find(p => p.id === voterId);
      if (!voter || voter.hasVoted) return prev;

      const nextPlayers = prev.map(p => {
        if (p.id === voterId) {
          return {
            ...p,
            hasVoted: true,
            votedForId: targets[0] || null,
            votedForIds: targets
          };
        }
        return p;
      });

      if (currentVoterIndex + 1 < nextPlayers.length) {
        setCurrentVoterIndex(idx => idx + 1);
      } else {
        resolveVoteOutcomeWithPlayers(nextPlayers);
      }

      return nextPlayers;
    });
  };

  const resolveVoteOutcomeWithPlayers = (currentPlayersList: Player[]) => {
    const requiredVotes = Math.max(1, Math.min(settings.imposterCount, currentPlayersList.length - 1));
    const voteCounts = tallyVotes(currentPlayersList, requiredVotes);

    // Update votes received
    const updatedPlayers = currentPlayersList.map(p => ({
      ...p,
      votesReceived: voteCounts[p.id] || 0
    }));

    // Find highest voted
    let maxVotes = 0;
    let highestVotedPlayers: Player[] = [];

    updatedPlayers.forEach(p => {
      if (p.votesReceived > maxVotes) {
        maxVotes = p.votesReceived;
        highestVotedPlayers = [p];
      } else if (p.votesReceived === maxVotes && maxVotes > 0) {
        highestVotedPlayers.push(p);
      }
    });

    const isTie = highestVotedPlayers.length !== 1 || maxVotes === 0;
    const eliminated = isTie ? null : highestVotedPlayers[0];

    const allImposters = updatedPlayers.filter(p => p.role === 'IMPOSTER');
    const imposterIds = allImposters.map(p => p.id);
    const imposterCaught = eliminated !== null && eliminated.role === 'IMPOSTER';

    const caughtImposters = imposterCaught && eliminated ? [eliminated.id] : [];
    const remainingImposters = imposterIds.filter(id => id !== eliminated?.id);

    const isCrewWin = imposterCaught && remainingImposters.length === 0;

    const updatedPlayersWithElimination = updatedPlayers.map(p => ({
      ...p,
      isEliminated: eliminated ? p.id === eliminated.id : false
    }));
    setPlayers(updatedPlayersWithElimination);

    let reason = '';
    if (isTie) {
      reason = imposterIds.length > 1
        ? `A tie vote! The ${imposterIds.length} Imposters slipped away in the confusion!`
        : 'A tie vote! The Imposter escaped in the confusion!';
    } else if (imposterCaught && eliminated) {
      if (remainingImposters.length === 0) {
        reason = imposterIds.length > 1
          ? `The table caught ${eliminated.name}, eliminating the final Imposter! Full Crew victory!`
          : `The crew correctly identified ${eliminated.name} as the Imposter!`;
      } else {
        reason = `The table exposed ${eliminated.name} as an Imposter! However, ${remainingImposters.length} Imposter(s) remain at large!`;
      }
    } else {
      reason = `${eliminated?.name || 'An innocent'} was wrongfully accused! The Imposter team survives!`;
    }

    const initialResult: RoundResult = {
      roundNumber: currentRound,
      winner: isCrewWin ? 'CREW' : 'IMPOSTER',
      secretWord: secretWordItem?.word || '',
      categoryName: category?.name || '',
      imposterIds,
      eliminatedPlayerId: eliminated?.id || null,
      eliminatedPlayerIds: eliminated ? [eliminated.id] : [],
      totalImposters: imposterIds.length,
      caughtImposters,
      remainingImposters,
      votesSummary: voteCounts,
      reason
    };

    setRoundResult(initialResult);

    setPhase('VOTE_REVEAL');
  };

  const resolveVoteOutcome = () => {
    resolveVoteOutcomeWithPlayers(players);
  };

  const finalizeRound = () => {
    if (!roundResult || finalizedRounds.current.has(roundResult.roundNumber)) return;
    finalizedRounds.current.add(roundResult.roundNumber);

    const updated = calculateRoundScores(players, roundResult);
    const isCrewWin = roundResult.winner === 'CREW';

    setPlayers(updated);

    // Update session stats
    setSessionStats(prev => {
      const stats: SessionStats = {
        totalRoundsPlayed: prev.totalRoundsPlayed + 1,
        crewWins: prev.crewWins + (isCrewWin ? 1 : 0),
        imposterWins: prev.imposterWins + (isCrewWin ? 0 : 1)
      };
      storage.saveStats(stats);
      return stats;
    });
  };

  const proceedToScorecard = () => {
    setPhase('SCORECARD');
  };

  // User requirement 2: Play next round (accumulating scores, pick category, continue match)
  const proceedToNextRound = () => {
    sound.playClick();
    setCurrentRound(prev => prev + 1);
    setPhase('CATEGORY_SELECT');
  };

  // User requirement 2: Finish match and view tournament champion summary
  const finishGameSummary = () => {
    sound.playClick();
    setPhase('FINAL_SUMMARY');
  };

  const resetEntireGame = () => {
    finalizedRounds.current.clear();
    setCurrentRound(1);
    setClueRoundCycle(1);
    setPlayers(prev =>
      prev.map(p => ({
        ...p,
        score: 0,
        roundScore: 0,
        role: 'CREW',
        clueGiven: false,
        hasVoted: false,
        votedForId: null,
        votedForIds: [],
        votesReceived: 0,
        isEliminated: false
      }))
    );
    setRoundResult(null);
    setPhase('SETUP');
  };

  return (
    <GameContext.Provider
      value={{
        phase,
        players,
        currentRound,
        clueRoundCycle,
        category,
        secretWordItem,
        currentHandoffIndex,
        currentClueSpeakerIndex,
        currentVoterIndex,
        discussionSecondsRemaining,
        isDiscussionRunning,
        settings,
        roundResult,
        sessionStats,
        isRestartConfirmOpen,
        isHowToPlayOpen,

        setPhase,
        updateSettings,
        addPlayer,
        removePlayer,
        updatePlayer,
        randomizePlayerNames,
        selectCategory,
        startNewRound,
        nextHandoff,
        nextClueSpeaker,
        startAnotherClueRound,
        startDiscussion,
        tickDiscussion,
        pauseDiscussion,
        resumeDiscussion,
        startVoting,
        submitVote,
        resolveVoteOutcome,
        finalizeRound,
        proceedToScorecard,
        proceedToNextRound,
        finishGameSummary,
        resetEntireGame,
        toggleSound,
        toggleHaptics,
        setIsRestartConfirmOpen,
        setIsHowToPlayOpen
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
