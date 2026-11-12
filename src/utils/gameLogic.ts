import type { Player, RoundResult } from '../types/game';

export const tallyVotes = (players: Player[], requiredVotes: number): Record<string, number> => {
  const eligibleIds = new Set(players.map(player => player.id));
  const voteCounts: Record<string, number> = {};

  players.forEach(player => {
    if (!player.hasVoted) return;

    const targets = (player.votedForIds && player.votedForIds.length > 0
      ? player.votedForIds
      : player.votedForId
        ? [player.votedForId]
        : [])
      .filter((targetId, index, allTargets) =>
        targetId !== 'SKIP' &&
        targetId !== player.id &&
        eligibleIds.has(targetId) &&
        allTargets.indexOf(targetId) === index
      );

    if (targets.length !== requiredVotes) return;
    targets.forEach(targetId => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });
  });

  return voteCounts;
};

export const calculateRoundScores = (players: Player[], result: RoundResult): Player[] => {
  const isCrewWin = result.winner === 'CREW';
  const imposterIdSet = new Set(result.imposterIds);

  return players.map(player => {
    const targets = player.votedForIds && player.votedForIds.length > 0
      ? player.votedForIds
      : player.votedForId
        ? [player.votedForId]
        : [];
    let earned = 0;

    if (player.role === 'CREW') {
      if (isCrewWin) earned += 100;
      earned += targets.filter(targetId => imposterIdSet.has(targetId)).length * 25;
    } else if (!isCrewWin) {
      earned += 200;
    }

    return {
      ...player,
      roundScore: earned,
      score: player.score + earned
    };
  });
};
