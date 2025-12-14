'use client';

import { Difficulty, Theme } from '@/types/game';
import { themes } from '@/utils/themes';

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
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[2000] animate-[fadeIn_0.3s_ease-in-out]"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto p-10 rounded-3xl border-2 border-white/20 animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)] sm:p-[30px_20px]"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 3px rgba(255, 255, 255, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-[15px] right-[15px] w-10 h-10 flex items-center justify-center bg-white/20 border-2 border-white/30 text-white text-3xl rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30 hover:rotate-90 leading-none"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-white text-3xl mb-[30px] sm:text-2xl sm:mb-5" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          Settings
        </h2>

        {/* Difficulty */}
        <div className="mb-[30px]">
          <h3 className="text-white text-lg mb-[15px] uppercase tracking-wide opacity-90">
            Difficulty
          </h3>
          <div className="flex gap-2.5 flex-wrap sm:flex-col">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
              <button
                key={diff}
                className={`flex-1 min-w-[100px] p-3 bg-white/10 border-2 border-white/30 text-white rounded-xl cursor-pointer transition-all duration-300 text-base font-semibold capitalize hover:bg-white/20 hover:-translate-y-0.5 sm:min-w-full ${
                  difficulty === diff ? 'bg-white/30 border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''
                }`}
                onClick={() => onDifficultyChange(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-white/80 text-sm mt-2.5 italic">
            {difficulty === 'easy' && 'Easy: 3x4 grid (12 cards)'}
            {difficulty === 'medium' && 'Medium: 4x4 grid (16 cards)'}
            {difficulty === 'hard' && 'Hard: 4x6 grid (24 cards)'}
          </p>
        </div>

        {/* Theme */}
        <div className="mb-[30px]">
          <h3 className="text-white text-lg mb-[15px] uppercase tracking-wide opacity-90">
            Background Theme
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 sm:grid-cols-1">
            {(Object.keys(themes) as Theme[]).map((themeKey) => (
              <button
                key={themeKey}
                className={`relative overflow-hidden p-5 border-2 border-white/30 text-white rounded-xl cursor-pointer transition-all duration-300 text-sm font-semibold before:absolute before:inset-0 before:bg-black/20 before:opacity-0 before:transition-opacity before:duration-300 hover:scale-105 hover:border-white/60 hover:before:opacity-100 ${
                  theme === themeKey ? 'border-white border-[3px] shadow-[0_0_30px_rgba(255,255,255,0.5)] after:content-["✓"] after:absolute after:top-1 after:right-2 after:text-xl after:text-white' : ''
                }`}
                onClick={() => onThemeChange(themeKey)}
                style={{
                  background: themes[themeKey].gradient,
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                <span className="relative z-10">{themes[themeKey].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sound */}
        <div className="mb-[30px]">
          <h3 className="text-white text-lg mb-[15px] uppercase tracking-wide opacity-90">
            Sound Effects
          </h3>
          <button
            className={`p-3 px-[30px] bg-white/10 border-2 border-white/30 text-white rounded-xl cursor-pointer transition-all duration-300 text-lg font-semibold hover:bg-white/20 hover:-translate-y-0.5 ${
              soundEnabled ? 'bg-[rgba(76,175,80,0.4)] border-[rgba(76,175,80,0.8)] shadow-[0_0_20px_rgba(76,175,80,0.4)]' : ''
            }`}
            onClick={onSoundToggle}
          >
            {soundEnabled ? '🔊 ON' : '🔇 OFF'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
