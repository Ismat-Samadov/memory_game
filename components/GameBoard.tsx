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
    <div className="max-w-[800px] mx-auto p-5 sm:p-[15px]">
      {showConfetti && <Confetti />}

      <div className="text-center mb-[30px]">
        <div className="flex items-center justify-center gap-[15px] mb-5 relative">
          <h1
            className="text-white font-extrabold tracking-wide my-0 animate-[titleFloat_3s_ease-in-out_infinite]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          >
            Memory Game
          </h1>
          <button
            className="bg-white/20 border-2 border-white/30 text-white text-[1.8rem] w-[50px] h-[50px] rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center animate-[rotate_20s_linear_infinite] hover:bg-white/30 hover:scale-110 hover:animate-[rotate_2s_linear_infinite]"
            onClick={() => setSettingsOpen(true)}
            title="Settings"
            style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
          >
            ⚙️
          </button>
        </div>

        <div className="flex justify-center gap-2.5 mb-5 flex-wrap">
          <button
            className="bg-white/15 backdrop-blur-[10px] border-2 border-white/30 text-white py-2 px-4 rounded-[20px] cursor-pointer transition-all duration-300 text-sm font-semibold tracking-wide hover:bg-white/25 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setLeaderboardOpen(true)}
          >
            🏆 Leaderboard
          </button>
          <button
            className="bg-white/15 backdrop-blur-[10px] border-2 border-white/30 text-white py-2 px-4 rounded-[20px] cursor-pointer transition-all duration-300 text-sm font-semibold tracking-wide hover:bg-white/25 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setStatisticsOpen(true)}
          >
            📊 Stats
          </button>
          <button
            className="bg-white/15 backdrop-blur-[10px] border-2 border-white/30 text-white py-2 px-4 rounded-[20px] cursor-pointer transition-all duration-300 text-sm font-semibold tracking-wide hover:bg-white/25 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={togglePause}
            disabled={gameWon}
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            className="bg-white/15 backdrop-blur-[10px] border-2 border-white/30 text-white py-2 px-4 rounded-[20px] cursor-pointer transition-all duration-300 text-sm font-semibold tracking-wide hover:bg-white/25 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={useHint}
            disabled={hintsRemaining === 0 || isPaused || gameWon}
          >
            💡 Hint ({hintsRemaining})
          </button>
        </div>

        <div className="flex justify-center gap-5 mb-5 flex-wrap sm:gap-3">
          <div
            className="relative overflow-hidden bg-white/20 backdrop-blur-[10px] py-3 px-6 rounded-2xl flex flex-col items-center gap-1 min-w-[100px] border border-white/30 transition-all duration-300 before:absolute before:content-[''] before:top-0 before:left-[-100%] before:w-full before:h-full before:animate-[statShimmer_3s_infinite] hover:-translate-y-0.5 sm:py-2.5 sm:px-[18px] sm:min-w-[90px] xs:py-2 xs:px-3 xs:min-w-[75px]"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-sm text-white/80 uppercase tracking-wide sm:text-xs xs:text-[0.7rem]">Time</span>
            <span className="text-2xl font-bold text-white sm:text-xl xs:text-lg">{formatTime(stats.time)}</span>
          </div>
          <div
            className="relative overflow-hidden bg-white/20 backdrop-blur-[10px] py-3 px-6 rounded-2xl flex flex-col items-center gap-1 min-w-[100px] border border-white/30 transition-all duration-300 before:absolute before:content-[''] before:top-0 before:left-[-100%] before:w-full before:h-full before:animate-[statShimmer_3s_infinite] hover:-translate-y-0.5 sm:py-2.5 sm:px-[18px] sm:min-w-[90px] xs:py-2 xs:px-3 xs:min-w-[75px]"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-sm text-white/80 uppercase tracking-wide sm:text-xs xs:text-[0.7rem]">Moves</span>
            <span className="text-2xl font-bold text-white sm:text-xl xs:text-lg">{stats.moves}</span>
          </div>
          <div
            className="relative overflow-hidden bg-white/20 backdrop-blur-[10px] py-3 px-6 rounded-2xl flex flex-col items-center gap-1 min-w-[100px] border border-white/30 transition-all duration-300 before:absolute before:content-[''] before:top-0 before:left-[-100%] before:w-full before:h-full before:animate-[statShimmer_3s_infinite] hover:-translate-y-0.5 sm:py-2.5 sm:px-[18px] sm:min-w-[90px] xs:py-2 xs:px-3 xs:min-w-[75px]"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-sm text-white/80 uppercase tracking-wide sm:text-xs xs:text-[0.7rem]">Pairs</span>
            <span className="text-2xl font-bold text-white sm:text-xl xs:text-lg">{stats.matchedPairs}/{pairs}</span>
          </div>
          <div
            className="relative overflow-hidden bg-white/20 backdrop-blur-[10px] py-3 px-6 rounded-2xl flex flex-col items-center gap-1 min-w-[100px] border border-white/30 transition-all duration-300 before:absolute before:content-[''] before:top-0 before:left-[-100%] before:w-full before:h-full before:animate-[statShimmer_3s_infinite] hover:-translate-y-0.5 sm:py-2.5 sm:px-[18px] sm:min-w-[90px] xs:py-2 xs:px-3 xs:min-w-[75px]"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-sm text-white/80 uppercase tracking-wide sm:text-xs xs:text-[0.7rem]">Streak</span>
            <span className="text-2xl font-bold text-white sm:text-xl xs:text-lg">🔥 {stats.streak}</span>
          </div>
          <div
            className="relative overflow-hidden bg-white/20 backdrop-blur-[10px] py-3 px-6 rounded-2xl flex flex-col items-center gap-1 min-w-[100px] border border-white/30 transition-all duration-300 before:absolute before:content-[''] before:top-0 before:left-[-100%] before:w-full before:h-full before:animate-[statShimmer_3s_infinite] hover:-translate-y-0.5 sm:py-2.5 sm:px-[18px] sm:min-w-[90px] xs:py-2 xs:px-3 xs:min-w-[75px]"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-sm text-white/80 uppercase tracking-wide sm:text-xs xs:text-[0.7rem]">Score</span>
            <span className="text-2xl font-bold text-white sm:text-xl xs:text-lg">{stats.score}</span>
          </div>
        </div>

        {bestScore && (
          <div
            className="bg-[rgba(255,215,0,0.2)] border-2 border-[rgba(255,215,0,0.4)] text-[#FFD700] py-2 px-5 rounded-[20px] mb-[15px] font-semibold animate-[pulse_2s_ease-in-out_infinite]"
            style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
          >
            🏆 Best: {bestScore.score} points
          </div>
        )}

        <button
          className="relative overflow-hidden bg-white/25 backdrop-blur-[10px] text-white border-2 border-white/50 py-3 px-8 text-base font-bold rounded-[30px] cursor-pointer transition-all duration-300 uppercase tracking-[1.5px] before:absolute before:content-[''] before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:bg-white/30 before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-[0.6s] hover:bg-white/35 hover:border-white/90 hover:-translate-y-1 hover:scale-[1.02] hover:before:w-[300px] hover:before:h-[300px] active:-translate-y-0 active:scale-[0.98] sm:py-2.5 sm:px-7 sm:text-[0.95rem] xs:py-2 xs:px-6 xs:text-[0.85rem]"
          onClick={resetGame}
          style={{
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
          }}
        >
          <span className="relative z-10">New Game</span>
        </button>
      </div>

      {isPaused && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-[10px] flex items-center justify-center z-[500] animate-[fadeIn_0.3s_ease-in-out]"
        >
          <div className="bg-white/10 border-2 border-white/30 p-10 rounded-3xl text-center text-white">
            <h2 className="text-[2.5rem] mb-2.5" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>⏸️ Game Paused</h2>
            <p className="text-xl opacity-90">Click Resume to continue</p>
          </div>
        </div>
      )}

      <div
        className="grid gap-[15px] max-w-[600px] mx-auto p-5 bg-white/10 backdrop-blur-[5px] rounded-[20px] border border-white/20 md:gap-3 md:p-[15px] sm:gap-2.5 sm:p-3 xs:gap-2 xs:p-2"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
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
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[1000] animate-[fadeIn_0.4s_ease-in-out]"
        >
          <div
            className="relative overflow-hidden text-center p-[50px_40px] rounded-[30px] border-2 border-white/30 max-w-[90%] animate-[slideInBounce_0.7s_cubic-bezier(0.34,1.56,0.64,1)] before:absolute before:content-[''] before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] before:animate-[rotateGlow_10s_linear_infinite] sm:p-[35px_25px]"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(102, 126, 234, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3)'
            }}
          >
            <div
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-[rotateGlow_10s_linear_infinite]"
              style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}
            />
            <h2
              className="relative z-10 text-white mb-5 font-extrabold animate-[titlePulse_1.5s_ease-in-out_infinite]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 255, 255, 0.5)'
              }}
            >
              {showNewRecord ? '🏆 New Record! 🏆' : '🎉 You Won! 🎉'}
            </h2>
            <div className="relative z-10 text-white text-xl mb-[30px] sm:text-lg">
              <p className="my-2.5 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>Score: {stats.score} points</p>
              <p className="my-2.5 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>Time: {formatTime(stats.time)}</p>
              <p className="my-2.5 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>Moves: {stats.moves}</p>
              <p className="my-2.5 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>Max Streak: {stats.maxStreak}</p>
              <p className="my-2.5 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>Difficulty: {difficulty.toUpperCase()}</p>
            </div>
            <button
              className="relative z-10 overflow-hidden bg-white text-[#667eea] border-none py-[15px] px-10 text-lg font-bold rounded-[30px] cursor-pointer transition-all duration-300 uppercase tracking-[1.5px] shadow-[0_4px_15px_rgba(0,0,0,0.3)] before:absolute before:content-[''] before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:bg-[rgba(102,126,234,0.2)] before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-[0.6s] hover:scale-[1.08] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:before:w-[300px] hover:before:h-[300px] active:scale-100 active:translate-y-0 active:shadow-[0_4px_10px_rgba(0,0,0,0.3)] sm:py-3 sm:px-8 sm:text-base"
              onClick={resetGame}
            >
              <span className="relative z-10">Play Again</span>
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

      <style jsx>{`
        @keyframes titleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
        }
        @keyframes statShimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInBounce {
          0% { transform: translateY(-100px) scale(0.8); opacity: 0; }
          60% { transform: translateY(10px) scale(1.05); opacity: 1; }
          80% { transform: translateY(-5px) scale(0.98); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @media (max-width: 380px) {
          .xs\\:gap-2 { gap: 8px; }
          .xs\\:p-2 { padding: 8px; }
        }
      `}</style>
    </div>
  );
}
