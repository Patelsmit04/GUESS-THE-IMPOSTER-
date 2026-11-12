import type { Player, RoundResult } from '../types/game';

const getBallotTargets = (player: Player, eligibleIds: Set<string>, requiredVotes: number): string[] => {
  const targets = (player.votedForIds && player.votedForIds.length > 0
    ? player.votedForIds
    : player.votedForId
      ? [player.votedForId]
      : []);

  const validTargets = targets.filter((targetId, index, allTargets) =>
    targetId !== 'SKIP' &&
    targetId !== player.id &&
    eligibleIds.has(targetId) &&
    allTargets.indexOf(targetId) === index
  );

  return validTargets.length === requiredVotes ? validTargets : [];
};

export const tallyVotes = (players: Player[], requiredVotes: number): Record<string, number> => {
  const eligibleIds = new Set(players.map(player => player.id));
  const voteCounts: Record<string, number> = {};

  players.forEach(player => {
    if (!player.hasVoted) return;

    const targets = getBallotTargets(player, eligibleIds, requiredVotes);
    targets.forEach(targetId => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });
  });

  return voteCounts;
};

export interface VoteAggregation {
  voteCounts: Record<string, number>;
  highestVotedPlayerIds: string[];
  maxVotes: number;
}

export const aggregateVotes = (players: Player[], requiredVotes: number): VoteAggregation => {
  const voteCounts = Object.fromEntries(players.map(player => [player.id, 0]));
  const sparseCounts = tallyVotes(players, requiredVotes);

  Object.entries(sparseCounts).forEach(([playerId, count]) => {
    voteCounts[playerId] = count;
  });

  const maxVotes = Math.max(0, ...Object.values(voteCounts));
  const highestVotedPlayerIds = maxVotes > 0
    ? players.filter(player => voteCounts[player.id] === maxVotes).map(player => player.id)
    : [];

  return { voteCounts, highestVotedPlayerIds, maxVotes };
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
