import { Card } from '@/types/game';

// Card values using emojis
const cardValues = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰'];

/**
 * Creates a shuffled deck of cards
 * Each card appears twice to create matching pairs
 */
export const createDeck = (): Card[] => {
  const deck: Card[] = [];

  // Create pairs of cards
  cardValues.forEach((value, index) => {
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
