'use client';

import { Card as CardType } from '@/types/game';
import { ThemeColors } from '@/utils/themes';
import styles from './Card.module.css';

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

  return (
    <div
      className={`${styles.card} ${card.isFlipped || card.isMatched ? styles.flipped : ''} ${
        card.isMatched ? styles.matched : ''
      }`}
      onClick={handleClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront} style={{ background: theme.cardFront }}>
          ?
        </div>
        <div
          className={styles.cardBack}
          style={{ background: card.isMatched ? theme.cardMatched : theme.cardBack }}
        >
          {card.value}
        </div>
      </div>
    </div>
  );
}
