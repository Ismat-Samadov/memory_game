import { Theme } from '@/types/game';

export interface ThemeColors {
  name: string;
  gradient: string;
  accent: string;
  cardFront: string;
  cardBack: string;
  cardMatched: string;
}

export const themes: Record<Theme, ThemeColors> = {
  purple: {
    name: 'Purple Dream',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accent: '#667eea',
    cardFront: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBack: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cardMatched: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  ocean: {
    name: 'Ocean Breeze',
    gradient: 'linear-gradient(135deg, #0083B0 0%, #00B4DB 100%)',
    accent: '#0083B0',
    cardFront: 'linear-gradient(135deg, #0083B0 0%, #00B4DB 100%)',
    cardBack: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
    cardMatched: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)'
  },
  sunset: {
    name: 'Sunset Glow',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    accent: '#FF6B6B',
    cardFront: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    cardBack: 'linear-gradient(135deg, #FFA07A 0%, #FF6347 100%)',
    cardMatched: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
  },
  forest: {
    name: 'Forest Fresh',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    accent: '#11998e',
    cardFront: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    cardBack: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    cardMatched: 'linear-gradient(135deg, #52c234 0%, #61ff00 100%)'
  },
  galaxy: {
    name: 'Cosmic Galaxy',
    gradient: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
    accent: '#2C3E50',
    cardFront: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
    cardBack: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
    cardMatched: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
};

export const getTheme = (theme: Theme): ThemeColors => {
  return themes[theme];
};
