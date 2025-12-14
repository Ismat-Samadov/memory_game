import { Difficulty, GameMode } from '@/types/game';

/**
 * Calculate score based on game performance
 * Higher score for: fewer moves, less time, higher difficulty, streaks
 */
export const calculateScore = (
  moves: number,
  time: number,
  difficulty: Difficulty,
  maxStreak: number,
  hintsUsed: number,
  totalPairs: number,
  mode: GameMode
): number => {
  // Base score starts at 10000
  let score = 10000;

  // Deduct points for moves (more moves = lower score)
  const movesPenalty = moves * 50;
  score -= movesPenalty;

  // Deduct points for time (1 point per second)
  score -= time;

  // Deduct points for hints used
  score -= hintsUsed * 200;

  // Bonus for difficulty
  const difficultyBonus = {
    easy: 0,
    medium: 1000,
    hard: 2500
  };
  score += difficultyBonus[difficulty];

  // Bonus for streaks
  const streakBonus = maxStreak * 100;
  score += streakBonus;

  // Perfect game bonus (no wrong moves)
  const isPerfect = moves === totalPairs;
  if (isPerfect) {
    score += 2000;
  }

  // Fast completion bonus (under certain time thresholds)
  const timeBonus = getTimeBonus(time, totalPairs);
  score += timeBonus;

  // Game mode multiplier
  const modeMultiplier = {
    classic: 1,
    timed: 1.5,
    limitedMoves: 1.3
  };
  score = Math.floor(score * modeMultiplier[mode]);

  // Ensure score is not negative
  return Math.max(score, 0);
};

const getTimeBonus = (time: number, pairs: number): number => {
  const avgTimePerPair = time / pairs;

  if (avgTimePerPair < 3) return 1500;  // Very fast
  if (avgTimePerPair < 5) return 1000;  // Fast
  if (avgTimePerPair < 8) return 500;   // Good
  return 0;
};

/**
 * Get performance rating based on score
 */
export const getPerformanceRating = (score: number): string => {
  if (score >= 12000) return 'Legendary';
  if (score >= 10000) return 'Master';
  if (score >= 8000) return 'Expert';
  if (score >= 6000) return 'Advanced';
  if (score >= 4000) return 'Intermediate';
  if (score >= 2000) return 'Beginner';
  return 'Novice';
};

/**
 * Get star rating (1-5) based on score
 */
export const getStarRating = (score: number): number => {
  if (score >= 12000) return 5;
  if (score >= 9000) return 4;
  if (score >= 6000) return 3;
  if (score >= 3000) return 2;
  return 1;
};
