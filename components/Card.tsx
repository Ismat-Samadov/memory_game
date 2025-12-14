'use client';

import { Card as CardType } from '@/types/game';
import styles from './Card.module.css';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

export default function Card({ card, onClick, disabled }: CardProps) {
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
        <div className={styles.cardFront}>?</div>
        <div className={styles.cardBack}>{card.value}</div>
      </div>
    </div>
  );
}
