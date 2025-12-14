'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card as CardType, GameStats } from '@/types/game';
import { createDeck, formatTime } from '@/utils/gameUtils';
import Card from './Card';
import styles from './GameBoard.module.css';

export default function GameBoard() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    time: 0,
    matchedPairs: 0,
  });
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Timer
  useEffect(() => {
    if (stats.matchedPairs === 0 || gameWon) return;

    const timer = setInterval(() => {
      setStats(prev => ({ ...prev, time: prev.time + 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [stats.matchedPairs, gameWon]);

  // Check for win condition
  useEffect(() => {
    if (stats.matchedPairs === 8 && stats.matchedPairs > 0) {
      setGameWon(true);
    }
  }, [stats.matchedPairs]);

  const resetGame = useCallback(() => {
    setCards(createDeck());
    setFlippedCards([]);
    setStats({ moves: 0, time: 0, matchedPairs: 0 });
    setIsChecking(false);
    setGameWon(false);
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    if (isChecking || flippedCards.length >= 2) return;

    setFlippedCards(prev => [...prev, cardId]);

    // Update card state
    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    // If this is the second card flipped
    if (flippedCards.length === 1) {
      setIsChecking(true);
      setStats(prev => ({ ...prev, moves: prev.moves + 1 }));

      const firstCard = cards.find(c => c.id === flippedCards[0]);
      const secondCard = cards.find(c => c.id === cardId);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setStats(prev => ({ ...prev, matchedPairs: prev.matchedPairs + 1 }));
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard?.id || card.id === secondCard?.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [cards, flippedCards, isChecking]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Memory Game</h1>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Time</span>
            <span className={styles.statValue}>{formatTime(stats.time)}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Moves</span>
            <span className={styles.statValue}>{stats.moves}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Pairs</span>
            <span className={styles.statValue}>{stats.matchedPairs}/8</span>
          </div>
        </div>

        <button className={styles.resetButton} onClick={resetGame}>
          New Game
        </button>
      </div>

      <div className={styles.gameBoard}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
            disabled={isChecking}
          />
        ))}
      </div>

      {gameWon && (
        <div className={styles.winModal}>
          <div className={styles.winContent}>
            <h2 className={styles.winTitle}>🎉 You Won! 🎉</h2>
            <div className={styles.winStats}>
              <p>Time: {formatTime(stats.time)}</p>
              <p>Moves: {stats.moves}</p>
            </div>
            <button className={styles.playAgainButton} onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
