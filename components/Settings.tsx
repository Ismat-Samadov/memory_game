'use client';

import { Difficulty, Theme } from '@/types/game';
import { themes } from '@/utils/themes';
import styles from './Settings.module.css';

interface SettingsProps {
  difficulty: Difficulty;
  theme: Theme;
  soundEnabled: boolean;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onThemeChange: (theme: Theme) => void;
  onSoundToggle: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({
  difficulty,
  theme,
  soundEnabled,
  onDifficultyChange,
  onThemeChange,
  onSoundToggle,
  isOpen,
  onClose
}: SettingsProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2 className={styles.title}>Settings</h2>

        {/* Difficulty */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Difficulty</h3>
          <div className={styles.buttonGroup}>
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
              <button
                key={diff}
                className={`${styles.button} ${difficulty === diff ? styles.active : ''}`}
                onClick={() => onDifficultyChange(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
          <p className={styles.description}>
            {difficulty === 'easy' && 'Easy: 3x4 grid (12 cards)'}
            {difficulty === 'medium' && 'Medium: 4x4 grid (16 cards)'}
            {difficulty === 'hard' && 'Hard: 4x6 grid (24 cards)'}
          </p>
        </div>

        {/* Theme */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Background Theme</h3>
          <div className={styles.themeGrid}>
            {(Object.keys(themes) as Theme[]).map((themeKey) => (
              <button
                key={themeKey}
                className={`${styles.themeButton} ${theme === themeKey ? styles.activeTheme : ''}`}
                onClick={() => onThemeChange(themeKey)}
                style={{ background: themes[themeKey].gradient }}
              >
                {themes[themeKey].name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Sound Effects</h3>
          <button
            className={`${styles.toggleButton} ${soundEnabled ? styles.active : ''}`}
            onClick={onSoundToggle}
          >
            {soundEnabled ? '🔊 ON' : '🔇 OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}
