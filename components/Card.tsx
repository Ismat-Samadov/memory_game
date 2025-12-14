'use client';

import { Card as CardType } from '@/types/game';
import { ThemeColors } from '@/utils/themes';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
  theme: ThemeColors;
}

export default function Card({ card, onClick, disabled, theme }: CardProps) {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick();
    }
  };

  const isFlipped = card.isFlipped || card.isMatched;

  return (
    <div
      className={`
        w-full aspect-square cursor-pointer
        transition-all duration-300 ease-out
        ${!isFlipped && !disabled ? 'hover:scale-110 hover:-translate-y-1' : ''}
        active:scale-95 relative select-none group
      `}
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`
          relative w-full h-full transition-all duration-700
          ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          filter: card.isMatched ? 'brightness(1.2)' : 'none'
        }}
      >
        {/* Card Front - Enhanced */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            rounded-3xl text-white font-bold
            text-5xl md:text-6xl
            border-4 border-white/30
            transition-all duration-300
            ${card.isMatched ? 'opacity-0' : 'opacity-100'}
            ${!isFlipped && !disabled ? 'group-hover:border-white/50' : ''}
          `}
          style={{
            background: theme.cardFront,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">?</span>

          {/* Gradient overlay on hover */}
          <div
            className={`
              absolute inset-0 rounded-3xl
              bg-gradient-to-br from-white/20 via-transparent to-transparent
              opacity-0 transition-opacity duration-300
              ${!isFlipped && !disabled ? 'group-hover:opacity-100' : ''}
            `}
          />

          {/* Animated shine effect */}
          <div
            className={`
              absolute inset-0 rounded-3xl overflow-hidden
              ${!isFlipped && !disabled ? 'group-hover:animate-[shine_1.5s_ease-in-out]' : ''}
            `}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
          </div>
        </div>

        {/* Card Back - Enhanced */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            rounded-3xl text-white font-extrabold
            text-5xl md:text-6xl
            border-4 transition-all duration-300
            ${card.isMatched ? 'border-cyan-300/80 animate-[glow_2s_ease-in-out_infinite]' : 'border-white/40'}
          `}
          style={{
            background: card.isMatched ? theme.cardMatched : theme.cardBack,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: card.isMatched
              ? '0 0 40px rgba(79, 172, 254, 0.8), 0 0 80px rgba(79, 172, 254, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.5), 0 15px 40px rgba(0, 0, 0, 0.3)'
              : '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <span className="relative z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{card.value}</span>

          {/* Shimmer effect */}
          {card.isMatched && (
            <>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-300/20 via-transparent to-blue-500/20" />
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(100%); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(79, 172, 254, 0.6),
                        0 0 80px rgba(79, 172, 254, 0.3),
                        inset 0 2px 8px rgba(255, 255, 255, 0.5),
                        0 15px 40px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 60px rgba(79, 172, 254, 0.9),
                        0 0 120px rgba(79, 172, 254, 0.5),
                        inset 0 2px 8px rgba(255, 255, 255, 0.7),
                        0 15px 40px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </div>
  );
}
