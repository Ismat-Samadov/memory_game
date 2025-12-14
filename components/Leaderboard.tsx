'use client';

import { LeaderboardEntry } from '@/types/game';
import { formatTime } from '@/utils/gameUtils';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ isOpen, onClose, entries }: LeaderboardProps) {
  if (!isOpen) return null;

  const sortedEntries = [...entries].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[2000] animate-[fadeIn_0.3s_ease-in-out]"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[750px] max-h-[90vh] overflow-y-auto p-12 rounded-[32px] border-2 border-white/30 animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)] sm:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 2px 6px rgba(255, 255, 255, 0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 rounded-[32px] opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(138, 116, 249, 0.3), transparent 50%), radial-gradient(circle at bottom left, rgba(79, 172, 254, 0.3), transparent 50%)',
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
          🏆 Leaderboard
        </h2>

        {sortedEntries.length === 0 ? (
          <div className="text-center py-[60px] px-5 text-white/70 text-lg">
            <p className="my-2.5">No scores yet!</p>
            <p className="my-2.5">Complete a game to get on the leaderboard.</p>
          </div>
        ) : (
          <div className="mb-5">
            <div className="grid grid-cols-[60px_1fr_80px_80px_80px] gap-2.5 p-3 items-center bg-white/10 rounded-xl font-bold text-white text-sm uppercase tracking-wider mb-2.5 sm:grid-cols-[50px_1fr_60px_60px_70px] sm:gap-1 sm:p-2.5 sm:text-xs">
              <div className="text-center text-xl sm:text-base">Rank</div>
              <div className="font-semibold">Player</div>
              <div className="text-center">Score</div>
              <div className="text-center">Moves</div>
              <div className="text-center">Time</div>
            </div>

            {sortedEntries.map((entry, index) => (
              <div
                key={index}
                className={`grid grid-cols-[60px_1fr_80px_80px_80px] gap-2.5 p-3 items-center bg-white/5 rounded-xl mb-2 text-white transition-all duration-300 border-2 border-transparent hover:bg-white/10 hover:border-white/30 hover:translate-x-1 sm:grid-cols-[50px_1fr_60px_60px_70px] sm:gap-1 sm:p-2.5 sm:text-[0.85rem] ${
                  index < 3 ? 'bg-[rgba(255,215,0,0.15)] border-[rgba(255,215,0,0.3)] hover:bg-[rgba(255,215,0,0.25)] hover:border-[rgba(255,215,0,0.5)]' : ''
                }`}
              >
                <div className="text-center text-xl font-bold sm:text-base">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="font-semibold">{entry.playerName}</div>
                <div className="text-center font-bold text-[#4facfe]">{entry.score}</div>
                <div className="text-center font-medium">{entry.moves}</div>
                <div className="text-center font-medium">{formatTime(entry.time)}</div>
              </div>
            ))}
          </div>
        )}

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
