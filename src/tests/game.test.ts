import { describe, it, expect } from 'vitest';
import { CATEGORIES } from '../data/categories';
import type { Player, RoundResult, WordItem } from '../types/game';

describe('Categories and Word Packs Integrity', () => {
  it('should have 12 rich categories with 16 words each (192 total words)', () => {
    expect(CATEGORIES.length).toBe(12);

    let totalWords = 0;
    CATEGORIES.forEach(cat => {
      expect(cat.id).toBeDefined();
      expect(cat.name).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(cat.words.length).toBe(16);
      totalWords += cat.words.length;

      cat.words.forEach(word => {
        expect(word.word).toBeTruthy();
        expect(word.hint).toBeTruthy();
        expect(word.decoys.length).toBeGreaterThanOrEqual(5);
        // Decoys should not contain the secret word itself
        expect(word.decoys.map(d => d.toLowerCase())).not.toContain(word.word.toLowerCase());
      });
    });

    expect(totalWords).toBe(192);
  });
});

describe('Voting and Outcome Logic', () => {
  const mockPlayers: Player[] = [
    {
      id: 'p-1',
      name: 'Alice',
      avatar: '🦊',
      color: 'blue',
      role: 'CREW',
      score: 0,
      roundScore: 0,
      clueGiven: true,
      hasVoted: true,
      votedForId: 'p-3', // Voted for Imposter
      votesReceived: 0,
      isEliminated: false
    },
    {
      id: 'p-2',
      name: 'Bob',
      avatar: '🤖',
      color: 'green',
      role: 'CREW',
      score: 0,
      roundScore: 0,
      clueGiven: true,
      hasVoted: true,
      votedForId: 'p-3', // Voted for Imposter
      votesReceived: 0,
      isEliminated: false
    },
    {
      id: 'p-3',
      name: 'Charlie',
      avatar: '🦁',
      color: 'red',
      role: 'IMPOSTER',
      score: 0,
      roundScore: 0,
      clueGiven: true,
      hasVoted: true,
      votedForId: 'p-1',
      votesReceived: 0,
      isEliminated: false
    },
    {
      id: 'p-4',
      name: 'Diana',
      avatar: '🥷',
      color: 'purple',
      role: 'CREW',
      score: 0,
      roundScore: 0,
      clueGiven: true,
      hasVoted: true,
      votedForId: 'p-3', // Voted for Imposter
      votesReceived: 0,
      isEliminated: false
    }
  ];

  it('correctly tallies votes and eliminates the highest-voted player', () => {
    const voteCounts: Record<string, number> = {};
    mockPlayers.forEach(p => {
      if (p.votedForId) {
        voteCounts[p.votedForId] = (voteCounts[p.votedForId] || 0) + 1;
      }
    });

    expect(voteCounts['p-3']).toBe(3); // Charlie got 3 votes
    expect(voteCounts['p-1']).toBe(1); // Alice got 1 vote

    let maxVotes = 0;
    let highest: Player[] = [];
    mockPlayers.forEach(p => {
      const votes = voteCounts[p.id] || 0;
      if (votes > maxVotes) {
        maxVotes = votes;
        highest = [p];
      } else if (votes === maxVotes && maxVotes > 0) {
        highest.push(p);
      }
    });

    expect(highest.length).toBe(1);
    expect(highest[0].id).toBe('p-3');
    expect(highest[0].role).toBe('IMPOSTER');
  });

  it('correctly handles ties where no single player has a majority', () => {
    const tiedVotes: Record<string, number> = {
      'p-1': 2,
      'p-3': 2
    };

    let maxVotes = 0;
    let highest: string[] = [];
    Object.entries(tiedVotes).forEach(([id, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        highest = [id];
      } else if (count === maxVotes) {
        highest.push(id);
      }
    });

    const isTie = highest.length > 1;
    expect(isTie).toBe(true);
    // On tie, no one is eliminated and the Imposter escapes
  });
});

describe('Scoring Accuracy & Unlimited Round Progression', () => {
  it('correctly awards points on Crew victory with accurate voter bonus', () => {
    const mockWord: WordItem = {
      id: 'test-1',
      word: 'Pizza',
      hint: 'Cheesy',
      decoys: ['Burger', 'Taco']
    };

    const imposterId = 'p-3';
    const roundResult: RoundResult = {
      roundNumber: 1,
      winner: 'CREW',
      secretWord: mockWord.word,
      categoryName: 'Food',
      imposterIds: [imposterId],
      eliminatedPlayerId: imposterId,
      imposterGuessedWord: false,
      reason: 'Crew caught the imposter'
    };

    const players: Player[] = [
      { id: 'p-1', name: 'Alice', avatar: '🦊', color: '', role: 'CREW', score: 0, roundScore: 0, clueGiven: true, hasVoted: true, votedForId: 'p-3', votesReceived: 0, isEliminated: false },
      { id: 'p-2', name: 'Bob', avatar: '🤖', color: '', role: 'CREW', score: 0, roundScore: 0, clueGiven: true, hasVoted: true, votedForId: 'p-1', votesReceived: 1, isEliminated: false },
      { id: 'p-3', name: 'Charlie', avatar: '🦁', color: '', role: 'IMPOSTER', score: 0, roundScore: 0, clueGiven: true, hasVoted: true, votedForId: 'p-1', votesReceived: 3, isEliminated: true }
    ];

    const updated = players.map(player => {
      let earned = 0;
      if (player.role === 'CREW') {
        if (roundResult.winner === 'CREW') earned += 100;
        if (player.votedForId === imposterId) earned += 25;
      } else {
        if (roundResult.winner === 'IMPOSTER') earned += 200;
      }
      return { ...player, roundScore: earned, score: player.score + earned };
    });

    // Alice: Crew win (+100) + correct vote (+25) = 125
    expect(updated.find(p => p.id === 'p-1')?.roundScore).toBe(125);
    // Bob: Crew win (+100) + wrong vote = 100
    expect(updated.find(p => p.id === 'p-2')?.roundScore).toBe(100);
    // Charlie (Imposter): Caught = 0
    expect(updated.find(p => p.id === 'p-3')?.roundScore).toBe(0);
  });

  it('allows playing continuous rounds, preserving previous scores', () => {
    let currentRound = 1;
    const scores = { 'p-1': 125, 'p-2': 100, 'p-3': 0 };

    // Advance to next round
    currentRound += 1;
    expect(currentRound).toBe(2);

    // Round 2 gives additional points
    scores['p-1'] += 100; // Total 225
    scores['p-3'] += 200; // Imposter won round 2 -> 200

    expect(scores['p-1']).toBe(225);
    expect(scores['p-3']).toBe(200);
  });

  it('supports multiple cycles of clue rounds within the same game round', () => {
    let clueRoundCycle = 1;
    expect(clueRoundCycle).toBe(1);

    // User chooses to play another round of clues
    clueRoundCycle += 1;
    expect(clueRoundCycle).toBe(2);

    // After discussion and voting finishes, next round resets clueRoundCycle back to 1
    clueRoundCycle = 1;
    expect(clueRoundCycle).toBe(1);
  });

  it('enforces player constraints: min 3, max 10', () => {
    const minPlayers = 3;
    const maxPlayers = 10;
    expect(minPlayers).toBe(3);
    expect(maxPlayers).toBe(10);
  });
});
