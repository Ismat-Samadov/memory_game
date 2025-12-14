'use client';

import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'star';
  rotation: number;
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d',
      '#6bcf7f', '#ff85a2', '#a29bfe', '#fd79a8',
      '#fdcb6e', '#00b894'
    ];
    const confettiPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 80; i++) {
      const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'square', 'star'];
      confettiPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360
      });
    }

    setPieces(confettiPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute -top-4 ${
            piece.shape === 'circle' ? 'rounded-full' :
            piece.shape === 'square' ? 'rounded-sm' : ''
          }`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `confettiFall${piece.id} ${piece.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${piece.delay}s forwards`,
            transform: `rotate(${piece.rotation}deg)`,
            boxShadow: `0 0 ${piece.size}px ${piece.color}`,
            clipPath: piece.shape === 'star' ?
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
              'none'
          }}
        />
      ))}
      <style jsx>{`
        ${pieces.map((piece) => `
          @keyframes confettiFall${piece.id} {
            0% {
              top: -10px;
              opacity: 1;
              transform: translateX(0) translateY(0) rotateZ(${piece.rotation}deg) scale(1);
            }
            50% {
              opacity: 1;
            }
            100% {
              top: 105vh;
              opacity: 0;
              transform: translateX(${(Math.random() - 0.5) * 200}px) translateY(50px) rotateZ(${piece.rotation + 720}deg) scale(0.5);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
}
