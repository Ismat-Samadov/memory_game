'use client';

import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: 'circle' | 'square';
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#6bcf7f', '#ff85a2'];
    const confettiPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 50; i++) {
      confettiPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: i % 3 === 0 ? 8 : i % 5 === 0 ? 12 : 10,
        shape: i % 2 === 0 ? 'circle' : 'square'
      });
    }

    setPieces(confettiPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute w-${piece.size/4} h-${piece.size/4} -top-4 ${piece.shape === 'circle' ? 'rounded-full' : ''}`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            top: -10px;
            opacity: 1;
            transform: translateX(0) rotateZ(0deg);
          }
          100% {
            top: 100vh;
            opacity: 0;
            transform: translateX(calc(-50px + ${Math.random() * 100}px)) rotateZ(720deg);
          }
        }
      `}</style>
    </div>
  );
}
