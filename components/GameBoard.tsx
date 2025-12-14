'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card as CardType, GameStats, Difficulty, Theme, BestScore, GameMode, LeaderboardEntry, Statistics as StatsType } from '@/types/game';
import { createDeck, formatTime, getDifficultyConfig } from '@/utils/gameUtils';
import { calculateScore } from '@/utils/scoreUtils';
import { getTheme } from '@/utils/themes';
import Card from './Card';
import Settings from './Settings';
import Confetti from './Confetti';
import Leaderboard from './Leaderboard';
import Statistics from './Statistics';
import styles from './GameBoard.module.css';

export default function GameBoard() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    time: 0,
    matchedPairs: 0,
    streak: 0,
    maxStreak: 0,
    hintsUsed: 0,
    score: 0
  });
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [theme, setTheme] = useState<Theme>('purple');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  const [bestScore, setBestScore] = useState<BestScore | null>(null);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  const { pairs, columns } = getDifficultyConfig(difficulty);
  const currentTheme = getTheme(theme);

  // Load settings and data
  useEffect(() => {
    const savedDifficulty = localStorage.getItem('difficulty') as Difficulty;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedSound = localStorage.getItem('soundEnabled');
    const savedMode = localStorage.getItem('gameMode') as GameMode;
    const savedBestScore = localStorage.getItem(`bestScore_${difficulty}_${gameMode}`);

    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedTheme) setTheme(savedTheme);
    if (savedSound) setSoundEnabled(savedSound === 'true');
    if (savedMode) setGameMode(savedMode);
    if (savedBestScore) setBestScore(JSON.parse(savedBestScore));
  }, [difficulty, gameMode]);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, [difficulty, gameMode]);

  // Timer
  useEffect(() => {
    if (stats.matchedPairs === 0 || gameWon || isPaused) return;

    const timer = setInterval(() => {
      setStats(prev => ({ ...prev, time: prev.time + 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [stats.matchedPairs, gameWon, isPaused]);

  // Check for win condition
  useEffect(() => {
    if (stats.matchedPairs === pairs && stats.matchedPairs > 0) {
      const finalScore = calculateScore(
        stats.moves,
        stats.time,
        difficulty,
        stats.maxStreak,
        stats.hintsUsed,
        pairs,
        gameMode
      );
      setStats(prev => ({ ...prev, score: finalScore }));
      setGameWon(true);
      setShowConfetti(true);
      checkBestScore(finalScore);
      saveToLeaderboard(finalScore);
      updateStatistics(finalScore, true);
      if (soundEnabled) playSound('win');

      // Hide confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [stats.matchedPairs, pairs]);

  // Apply theme
  useEffect(() => {
    document.body.style.background = currentTheme.gradient;
  }, [currentTheme]);

  const checkBestScore = (score: number) => {
    const currentScore: BestScore = {
      moves: stats.moves,
      time: stats.time,
      difficulty,
      mode: gameMode,
      score,
      playerName: 'Player',
      date: new Date().toISOString()
    };
    const savedBestScore = localStorage.getItem(`bestScore_${difficulty}_${gameMode}`);

    if (!savedBestScore || score > (JSON.parse(savedBestScore).score || 0)) {
      localStorage.setItem(`bestScore_${difficulty}_${gameMode}`, JSON.stringify(currentScore));
      setBestScore(currentScore);
      setShowNewRecord(true);
    }
  };

  const saveToLeaderboard = (score: number) => {
    const leaderboard: LeaderboardEntry[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const newEntry: LeaderboardEntry = {
      rank: 0,
      playerName: 'Player',
      score,
      moves: stats.moves,
      time: stats.time,
      difficulty,
      mode: gameMode,
      date: new Date().toISOString()
    };

    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.forEach((entry, index) => entry.rank = index + 1);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 50)));
  };

  const updateStatistics = (score: number, won: boolean) => {
    const currentStats: StatsType = JSON.parse(localStorage.getItem('statistics') || JSON.stringify({
      totalGames: 0,
      totalWins: 0,
      totalMoves: 0,
      totalTime: 0,
      bestScore: 0,
      averageScore: 0,
      perfectGames: 0,
      hintsUsed: 0
    }));

    currentStats.totalGames += 1;
    if (won) currentStats.totalWins += 1;
    currentStats.totalMoves += stats.moves;
    currentStats.totalTime += stats.time;
    currentStats.bestScore = Math.max(currentStats.bestScore, score);
    currentStats.averageScore = ((currentStats.averageScore * (currentStats.totalGames - 1)) + score) / currentStats.totalGames;
    if (stats.moves === pairs) currentStats.perfectGames += 1;
    currentStats.hintsUsed += stats.hintsUsed;

    localStorage.setItem('statistics', JSON.stringify(currentStats));
  };

  const playSound = (type: 'flip' | 'match' | 'win' | 'hint') => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = { flip: 440, match: 660, win: 880, hint: 550 };
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
    setStats({ moves: 0, time: 0, matchedPairs: 0, streak: 0, maxStreak: 0, hintsUsed: 0, score: 0 });
    setIsChecking(false);
    setGameWon(false);
    setShowNewRecord(false);
    setIsPaused(false);
    setHintsRemaining(3);
    setShowConfetti(false);
  }, [difficulty]);

  const useHint = () => {
    if (hintsRemaining <= 0 || isPaused) return;

    playSound('hint');
    setHintsRemaining(prev => prev - 1);
    setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));

    // Show all unmatched cards for 2 seconds
    const unmatchedCards = cards.filter(c => !c.isMatched);
    setCards(prev => prev.map(card => !card.isMatched ? { ...card, isFlipped: true } : card));

    setTimeout(() => {
      setCards(prev => prev.map(card =>
        !card.isMatched && !flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
      ));
    }, 2000);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleCardClick = useCallback((cardId: number) => {
    if (isChecking || flippedCards.length >= 2 || isPaused) return;

    setFlippedCards(prev => [...prev, cardId]);
    playSound('flip');

    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (flippedCards.length === 1) {
      setIsChecking(true);
      setStats(prev => ({ ...prev, moves: prev.moves + 1 }));

      const firstCard = cards.find(c => c.id === flippedCards[0]);
      const secondCard = cards.find(c => c.id === cardId);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        playSound('match');
        const newStreak = stats.streak + 1;
        setStats(prev => ({
          ...prev,
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak)
        }));

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
        setStats(prev => ({ ...prev, streak: 0 }));
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
  }, [cards, flippedCards, isChecking, soundEnabled, isPaused, stats.streak]);

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

  const handleModeChange = (newMode: GameMode) => {
    setGameMode(newMode);
    localStorage.setItem('gameMode', newMode);
    setSettingsOpen(false);
  };

  const getLeaderboardData = (): LeaderboardEntry[] => {
    return JSON.parse(localStorage.getItem('leaderboard') || '[]');
  };

  const getStatisticsData = (): StatsType => {
    return JSON.parse(localStorage.getItem('statistics') || JSON.stringify({
      totalGames: 0,
      totalWins: 0,
      totalMoves: 0,
      totalTime: 0,
      bestScore: 0,
      averageScore: 0,
      perfectGames: 0,
      hintsUsed: 0
    }));
  };

  return (
    <div className={styles.container}>
      {showConfetti && <Confetti />}

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

        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => setLeaderboardOpen(true)}>
            🏆 Leaderboard
          </button>
          <button className={styles.controlBtn} onClick={() => setStatisticsOpen(true)}>
            📊 Stats
          </button>
          <button className={styles.controlBtn} onClick={togglePause} disabled={gameWon}>
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            className={styles.controlBtn}
            onClick={useHint}
            disabled={hintsRemaining === 0 || isPaused || gameWon}
          >
            💡 Hint ({hintsRemaining})
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
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Streak</span>
            <span className={styles.statValue}>🔥 {stats.streak}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Score</span>
            <span className={styles.statValue}>{stats.score}</span>
          </div>
        </div>

        {bestScore && (
          <div className={styles.bestScore}>
            🏆 Best: {bestScore.score} points
          </div>
        )}

        <button className={styles.resetButton} onClick={resetGame}>
          New Game
        </button>
      </div>

      {isPaused && (
        <div className={styles.pausedOverlay}>
          <div className={styles.pausedMessage}>
            <h2>⏸️ Game Paused</h2>
            <p>Click Resume to continue</p>
          </div>
        </div>
      )}

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
            disabled={isChecking || isPaused}
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
              <p>Score: {stats.score} points</p>
              <p>Time: {formatTime(stats.time)}</p>
              <p>Moves: {stats.moves}</p>
              <p>Max Streak: {stats.maxStreak}</p>
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

      <Leaderboard
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        entries={getLeaderboardData()}
      />

      <Statistics
        isOpen={statisticsOpen}
        onClose={() => setStatisticsOpen(false)}
        stats={getStatisticsData()}
      />
    </div>
  );
}
