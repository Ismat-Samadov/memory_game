'use client';

import { Statistics as StatsType } from '@/types/game';
import { formatTime } from '@/utils/gameUtils';
import styles from './Statistics.module.css';

interface StatisticsProps {
  isOpen: boolean;
  onClose: () => void;
  stats: StatsType;
}

export default function Statistics({ isOpen, onClose, stats }: StatisticsProps) {
  if (!isOpen) return null;

  const winRate = stats.totalGames > 0 ? ((stats.totalWins / stats.totalGames) * 100).toFixed(1) : '0';
  const avgMovesPerGame = stats.totalGames > 0 ? (stats.totalMoves / stats.totalGames).toFixed(1) : '0';
  const avgTimePerGame = stats.totalGames > 0 ? Math.floor(stats.totalTime / stats.totalGames) : 0;

  const statCards = [
    { label: 'Total Games', value: stats.totalGames, icon: '🎮' },
    { label: 'Games Won', value: stats.totalWins, icon: '🏆' },
    { label: 'Win Rate', value: `${winRate}%`, icon: '📊' },
    { label: 'Best Score', value: stats.bestScore, icon: '⭐' },
    { label: 'Avg Score', value: stats.averageScore.toFixed(0), icon: '💯' },
    { label: 'Perfect Games', value: stats.perfectGames, icon: '🎯' },
    { label: 'Total Moves', value: stats.totalMoves, icon: '👆' },
    { label: 'Avg Moves/Game', value: avgMovesPerGame, icon: '📈' },
    { label: 'Total Time', value: formatTime(stats.totalTime), icon: '⏱️' },
    { label: 'Avg Time/Game', value: formatTime(avgTimePerGame), icon: '⏰' },
    { label: 'Hints Used', value: stats.hintsUsed, icon: '💡' },
  ];

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2 className={styles.title}>📊 Statistics</h2>

        <div className={styles.statsGrid}>
          {statCards.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
