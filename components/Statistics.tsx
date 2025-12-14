'use client';

import { Statistics as StatsType } from '@/types/game';
import { formatTime } from '@/utils/gameUtils';

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
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[2000] animate-[fadeIn_0.3s_ease-in-out]"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[850px] max-h-[90vh] overflow-y-auto p-12 rounded-[32px] border-2 border-white/30 animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)] sm:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 2 6px rgba(255, 255, 255, 0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 rounded-[32px] opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top left, rgba(138, 116, 249, 0.3), transparent 50%), radial-gradient(circle at bottom right, rgba(79, 172, 254, 0.3), transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />

        <button
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/15 border-2 border-white/30 text-white text-3xl rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:rotate-180 hover:scale-110 leading-none backdrop-blur-sm"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-white text-3xl mb-[30px] text-center sm:text-2xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          📊 Statistics
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] mb-[30px] sm:grid-cols-2 sm:gap-2.5">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white/10 border-2 border-white/20 rounded-2xl p-5 text-center transition-all duration-300 before:absolute before:inset-0 before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] before:opacity-0 before:transition-opacity before:duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:before:opacity-100 sm:p-[15px]"
              style={{
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div
                className="absolute inset-0 -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                }}
              />
              <div className="text-3xl mb-2.5 sm:text-2xl">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-white mb-2 sm:text-2xl" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
                {stat.value}
              </div>
              <div className="text-[0.85rem] text-white/80 uppercase tracking-wider font-semibold sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full p-3 bg-white/20 border-2 border-white/30 text-white rounded-xl cursor-pointer transition-all duration-300 text-base font-semibold uppercase tracking-wider hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          onClick={onClose}
        >
          Close
        </button>
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
