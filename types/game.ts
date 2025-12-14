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
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Theme = 'purple' | 'ocean' | 'sunset' | 'forest' | 'galaxy';

export interface BestScore {
  moves: number;
  time: number;
  difficulty: Difficulty;
}

export interface GameSettings {
  difficulty: Difficulty;
  theme: Theme;
  soundEnabled: boolean;
}
