export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  time: number;
  matchedPairs: number;
  streak: number;
  maxStreak: number;
  hintsUsed: number;
  score: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Theme = 'purple' | 'ocean' | 'sunset' | 'forest' | 'galaxy';

export type GameMode = 'classic' | 'timed' | 'limitedMoves';

export interface BestScore {
  moves: number;
  time: number;
  difficulty: Difficulty;
  mode: GameMode;
  score: number;
  playerName?: string;
  date: string;
}

export interface GameSettings {
  difficulty: Difficulty;
  theme: Theme;
  soundEnabled: boolean;
  mode: GameMode;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  moves: number;
  time: number;
  difficulty: Difficulty;
  mode: GameMode;
  date: string;
}

export interface Statistics {
  totalGames: number;
  totalWins: number;
  totalMoves: number;
  totalTime: number;
  bestScore: number;
  averageScore: number;
  perfectGames: number;
  hintsUsed: number;
}
