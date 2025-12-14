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
        w-full aspect-square perspective-1000 cursor-pointer
        transition-transform duration-300 ease-out
        ${!isFlipped && !disabled ? 'hover:scale-105' : ''}
        active:scale-95 relative select-none
      `}
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-600
          ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Front */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            rounded-2xl text-white font-bold
            text-5xl md:text-6xl shadow-lg
            border-2 border-white/20
            ${card.isMatched ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            background: theme.cardFront,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <span className="relative z-10">?</span>
          <div
            className={`
              absolute inset-0 bg-gradient-radial from-white/30 to-transparent
              opacity-0 transition-opacity duration-300
              ${!isFlipped ? 'group-hover:opacity-100' : ''}
            `}
          />
        </div>

        {/* Card Back */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            rounded-2xl text-white font-bold
            text-4xl md:text-5xl shadow-lg
            border-2 border-white/20
            ${card.isMatched ? 'animate-pulse-soft' : ''}
          `}
          style={{
            background: card.isMatched ? theme.cardMatched : theme.cardBack,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: card.isMatched
              ? '0 0 20px rgba(79, 172, 254, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
              : '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <span className="relative z-10">{card.value}</span>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
          />
        </div>
      </div>
    </div>
  );
}
