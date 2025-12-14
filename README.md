# 🎮 Memory Card Game

A beautiful and engaging card-matching memory game built with Next.js 14 and TypeScript. Test your memory by matching pairs of cards in the fewest moves possible!

![Memory Game](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)

## ✨ Features

- **🎨 Beautiful UI/UX**: Modern gradient design with glass-morphism effects
- **✅ 3D Card Animations**: Smooth flip animations with perspective transforms
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **👆 Touch-Optimized**: Perfect touch interactions for mobile gameplay
- **⚡ Real-time Stats**: Track your moves, time, and matched pairs
- **🎯 Win Detection**: Celebration modal when you complete the game
- **🌟 Visual Effects**:
  - Shimmer effects on cards
  - Glow animations on matches
  - Floating title animation
  - Animated background particles
  - Glass-morphism UI elements
- **♿ Accessible**: Keyboard navigation and focus states
- **🚀 PWA Ready**: Installable as a mobile app

## 🎮 How to Play

1. Click on any card to reveal it
2. Click on another card to find its match
3. If the cards match, they stay revealed with a glow effect
4. If they don't match, they flip back after a short delay
5. Remember the positions and match all pairs!
6. Try to complete the game in the fewest moves and shortest time

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS Modules with advanced animations
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📂 Project Structure

```
memory_game/
├── app/
│   ├── icon.svg              # Favicon
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles & animations
├── components/
│   ├── Card.tsx              # Card component
│   ├── Card.module.css       # Card styles
│   ├── GameBoard.tsx         # Game logic & board
│   └── GameBoard.module.css  # Board styles
├── types/
│   └── game.ts               # TypeScript interfaces
├── utils/
│   └── gameUtils.ts          # Helper functions
├── public/
│   ├── favicon.svg           # SVG favicon
│   └── manifest.json         # PWA manifest
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd memory_game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Change Card Values

Edit the `cardValues` array in `utils/gameUtils.ts`:

```typescript
const cardValues = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎲', '🎰'];
```

### Modify Colors

Update the gradient colors in:
- `app/globals.css` - Background gradient
- `components/Card.module.css` - Card gradients
- `components/GameBoard.module.css` - UI elements

### Adjust Grid Size

Change the grid layout in `components/GameBoard.module.css`:

```css
.gameBoard {
  grid-template-columns: repeat(4, 1fr); /* Change 4 to desired columns */
}
```

And update the card pairs in `utils/gameUtils.ts` accordingly.

## 📱 Mobile Support

The game is fully optimized for mobile devices with:
- Responsive breakpoints (768px, 640px, 480px, 380px)
- Touch-friendly tap targets
- Adaptive font sizes
- Optimized animations for mobile performance
- PWA support for installation on home screen

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=<your-repo-url>)

### Manual Deployment

```bash
npm run build
npm run start
```

## 🎯 Game Features Breakdown

### Card Component
- 3D flip animation using CSS transforms
- Hover effects with elevation
- Match detection with glow animation
- Shimmer effect on card backs
- Touch-optimized interactions

### Game Logic
- Fisher-Yates shuffle algorithm for randomization
- State management for flipped and matched cards
- Move counter
- Timer that starts on first move
- Win detection and celebration

### Visual Effects
- Gradient backgrounds with animations
- Floating particles effect
- Glass-morphism UI elements
- Custom scrollbar styling
- Smooth transitions and cubic-bezier easing

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Created with ❤️ using Next.js and TypeScript

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Emoji icons for card symbols
- CSS animations inspired by modern design trends

---

**Enjoy the game and challenge your memory!** 🧠✨
