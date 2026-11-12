# 🎭 Guess The Imposter

An exceptionally polished, entertaining, and responsive social deduction party game built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

Designed for family game nights, party gatherings, and casual play — only requiring **one device** passed around the table!

---

## 🌟 Features & Highlights

- **100% Pass & Play Local Multiplayer**: Zero account setup, zero network requirements, runs seamlessly on any phone, tablet, or desktop browser.
- **Privacy-Guaranteed Secret Handoff**: Dedicated handoff shields prevent screen leaks before each player views their confidential identity.
- **Interactive 3D Card Reveal**: Tactile vertical card flip with distinct sound synthesis and visual feedback for Crew vs. Imposter.
- **Zero-Dependency Web Audio Sound Engine**: Built-in Web Audio API synthesizer for clicks, flips, stings, timer ticks, drumrolls, and victory fanfares without external audio file loading lag.
- **Haptic Vibration Feedback**: Integrated with the Web Vibration API for tactile button presses, flips, and suspense builds (with graceful desktop fallback).
- **Gamified Turn-Based Clue Phase**: Interactive speaker spotlight and checklist tracking who has given their clue.
- **Suspenseful Discussion & Voting**:
  - Configurable discussion countdown timer with warning pulse and auditory ticks.
  - Secret ballot mode allowing each player to vote in complete privacy.
- **Dramatic Game-Show Vote Reveal**: Suspenseful drumroll, accusation spotlight, and dramatic role flip.
- **Dynamic Scoreboard & Podium**: Tracks cumulative scores, correct voter bonuses (+25 pts), round rankings, and crowning match champions.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended, tested on Node v25)
- npm (v9+)

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run test suite
npm test

# Build production bundle
npm run build
```

---

## 🎮 How To Play

1. **Setup Players**: Add 3 to 10 players, customize avatars, or hit "Randomize Names".
2. **Pick a Category**: Choose from curated packs like *Food & Treats*, *Wild Animals*, *Movies & Heroes*, *Cosmos & Magic*, or *Surprise Us (Random)*.
3. **Pass & Reveal**: Pass the device to each player. Crew members discover the Secret Word; the Imposter only knows the Category!
4. **Give Clues**: Each player takes turns speaking one subtle clue. Too obvious, and the Imposter learns the secret. Too vague, and you look suspicious!
5. **Debate & Vote**: Discuss suspicious clues and cast your secret vote on the device.
6. **Reveal & Score**: Catch the Imposter to earn points, or watch the Imposter sneak away with the win!

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Transitions**: [Framer Motion](https://motion.dev/)
- **Celebrations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Synthesizer**: Web Audio API oscillator/gain envelope engine
