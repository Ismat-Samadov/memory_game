'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card as CardType, GameStats, Difficulty, Theme, BestScore } from '@/types/game';
import { createDeck, formatTime, getDifficultyConfig } from '@/utils/gameUtils';
import { getTheme } from '@/utils/themes';
import Card from './Card';
import Settings from './Settings';
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
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [theme, setTheme] = useState<Theme>('purple');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bestScore, setBestScore] = useState<BestScore | null>(null);
  const [showNewRecord, setShowNewRecord] = useState(false);

  const { pairs, columns } = getDifficultyConfig(difficulty);
  const currentTheme = getTheme(theme);

  // Load settings from localStorage
  useEffect(() => {
    const savedDifficulty = localStorage.getItem('difficulty') as Difficulty;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedSound = localStorage.getItem('soundEnabled');
    const savedBestScore = localStorage.getItem(`bestScore_${difficulty}`);

    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedTheme) setTheme(savedTheme);
    if (savedSound) setSoundEnabled(savedSound === 'true');
    if (savedBestScore) setBestScore(JSON.parse(savedBestScore));
  }, [difficulty]);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, [difficulty]);

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
    if (stats.matchedPairs === pairs && stats.matchedPairs > 0) {
      setGameWon(true);
      checkBestScore();
      if (soundEnabled) playSound('win');
    }
  }, [stats.matchedPairs, pairs]);

  // Apply theme
  useEffect(() => {
    document.body.style.background = currentTheme.gradient;
  }, [currentTheme]);

  const checkBestScore = () => {
    const currentScore = { moves: stats.moves, time: stats.time, difficulty };
    const savedBestScore = localStorage.getItem(`bestScore_${difficulty}`);

    if (!savedBestScore) {
      localStorage.setItem(`bestScore_${difficulty}`, JSON.stringify(currentScore));
      setBestScore(currentScore);
      setShowNewRecord(true);
    } else {
      const best: BestScore = JSON.parse(savedBestScore);
      if (stats.moves < best.moves || (stats.moves === best.moves && stats.time < best.time)) {
        localStorage.setItem(`bestScore_${difficulty}`, JSON.stringify(currentScore));
        setBestScore(currentScore);
        setShowNewRecord(true);
      }
    }
  };

  const playSound = (type: 'flip' | 'match' | 'win') => {
    if (!soundEnabled) return;
    // Simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = { flip: 440, match: 660, win: 880 };
    oscillator.frequency.value = frequencies[type];
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const resetGame = useCallback(() => {
    setCards(createDeck(difficulty));
    setFlippedCards([]);
    setStats({ moves: 0, time: 0, matchedPairs: 0 });
    setIsChecking(false);
    setGameWon(false);
    setShowNewRecord(false);
  }, [difficulty]);

  const handleCardClick = useCallback((cardId: number) => {
    if (isChecking || flippedCards.length >= 2) return;

    setFlippedCards(prev => [...prev, cardId]);
    playSound('flip');

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
        playSound('match');
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
  }, [cards, flippedCards, isChecking, soundEnabled]);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    localStorage.setItem('difficulty', newDifficulty);
    setSettingsOpen(false);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('soundEnabled', String(newValue));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Memory Game</h1>
          <button
            className={styles.settingsButton}
            onClick={() => setSettingsOpen(true)}
            title="Settings"
          >
            ⚙️
          </button>
        </div>

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
            <span className={styles.statValue}>{stats.matchedPairs}/{pairs}</span>
          </div>
        </div>

        {bestScore && (
          <div className={styles.bestScore}>
            🏆 Best: {bestScore.moves} moves in {formatTime(bestScore.time)}
          </div>
        )}

        <button className={styles.resetButton} onClick={resetGame}>
          New Game
        </button>
      </div>

      <div
        className={styles.gameBoard}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
            disabled={isChecking}
            theme={currentTheme}
          />
        ))}
      </div>

      {gameWon && (
        <div className={styles.winModal}>
          <div className={styles.winContent}>
            <h2 className={styles.winTitle}>
              {showNewRecord ? '🏆 New Record! 🏆' : '🎉 You Won! 🎉'}
            </h2>
            <div className={styles.winStats}>
              <p>Time: {formatTime(stats.time)}</p>
              <p>Moves: {stats.moves}</p>
              <p>Difficulty: {difficulty.toUpperCase()}</p>
            </div>
            <button className={styles.playAgainButton} onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}

      <Settings
        difficulty={difficulty}
        theme={theme}
        soundEnabled={soundEnabled}
        onDifficultyChange={handleDifficultyChange}
        onThemeChange={handleThemeChange}
        onSoundToggle={handleSoundToggle}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
