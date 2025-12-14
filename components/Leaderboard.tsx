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
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[2000] animate-[fadeIn_0.3s_ease-in-out]"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-[700px] max-h-[90vh] overflow-y-auto p-10 rounded-3xl border-2 border-white/20 animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)] sm:p-[30px_20px]"
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
