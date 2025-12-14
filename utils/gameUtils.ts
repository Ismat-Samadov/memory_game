import { Card, Difficulty } from '@/types/game';

// Card values using emojis
const allCardValues = [
  '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰',
  '🎬', '🎤', '🎧', '🎹', '🎺', '🎻', '🎼', '🎵',
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'
];

/**
 * Get grid configuration based on difficulty
 */
export const getDifficultyConfig = (difficulty: Difficulty) => {
  const configs = {
    easy: { pairs: 6, columns: 3 },     // 12 cards (3x4 grid)
    medium: { pairs: 8, columns: 4 },   // 16 cards (4x4 grid)
    hard: { pairs: 12, columns: 4 }     // 24 cards (4x6 grid)
  };
  return configs[difficulty];
};

/**
 * Creates a shuffled deck of cards based on difficulty
 * Each card appears twice to create matching pairs
 */
export const createDeck = (difficulty: Difficulty = 'medium'): Card[] => {
  const { pairs } = getDifficultyConfig(difficulty);
  const deck: Card[] = [];
  const selectedValues = allCardValues.slice(0, pairs);

  // Create pairs of cards
  selectedValues.forEach((value, index) => {
    deck.push({
      id: index * 2,
      value,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: index * 2 + 1,
      value,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Shuffle the deck
  return shuffleArray(deck);
};

/**
 * Fisher-Yates shuffle algorithm
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
