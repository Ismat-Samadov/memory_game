'use client';

import { LeaderboardEntry } from '@/types/game';
import { formatTime } from '@/utils/gameUtils';
import styles from './Leaderboard.module.css';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ isOpen, onClose, entries }: LeaderboardProps) {
  if (!isOpen) return null;

  const sortedEntries = [...entries].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2 className={styles.title}>🏆 Leaderboard</h2>

        {sortedEntries.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No scores yet!</p>
            <p>Complete a game to get on the leaderboard.</p>
          </div>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.rankCol}>Rank</div>
              <div className={styles.nameCol}>Player</div>
              <div className={styles.scoreCol}>Score</div>
              <div className={styles.movesCol}>Moves</div>
              <div className={styles.timeCol}>Time</div>
            </div>

            {sortedEntries.map((entry, index) => (
              <div
                key={index}
                className={`${styles.tableRow} ${index < 3 ? styles.topThree : ''}`}
              >
                <div className={styles.rankCol}>
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className={styles.nameCol}>{entry.playerName}</div>
                <div className={styles.scoreCol}>{entry.score}</div>
                <div className={styles.movesCol}>{entry.moves}</div>
                <div className={styles.timeCol}>{formatTime(entry.time)}</div>
              </div>
            ))}
          </div>
        )}

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
