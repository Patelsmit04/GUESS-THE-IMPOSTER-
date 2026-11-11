import React from 'react';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/useGame';
import { Header } from './components/common/Header';
import { HowToPlayModal } from './components/common/HowToPlayModal';
import { RestartModal } from './components/common/RestartModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { SetupScreen } from './components/screens/SetupScreen';
import { CategoryScreen } from './components/screens/CategoryScreen';
import { HandoffScreen } from './components/screens/HandoffScreen';
import { SecretRevealScreen } from './components/screens/SecretRevealScreen';
import { ClueRoundScreen } from './components/screens/ClueRoundScreen';
import { DiscussionScreen } from './components/screens/DiscussionScreen';
import { VotingScreen } from './components/screens/VotingScreen';
import { VoteRevealScreen } from './components/screens/VoteRevealScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { ScorecardScreen } from './components/screens/ScorecardScreen';
import { FinalSummaryScreen } from './components/screens/FinalSummaryScreen';
import { motion, AnimatePresence } from 'framer-motion';

const GameShell: React.FC = () => {
  const { phase } = useGame();

  const renderCurrentScreen = () => {
    switch (phase) {
      case 'HOME':
        return <HomeScreen key="home" />;
      case 'SETUP':
        return <SetupScreen key="setup" />;
      case 'CATEGORY_SELECT':
        return <CategoryScreen key="category" />;
      case 'HANDOFF':
        return <HandoffScreen key="handoff" />;
      case 'SECRET_REVEAL':
        return <SecretRevealScreen key="secret" />;
      case 'CLUE_ROUND':
        return <ClueRoundScreen key="clue" />;
      case 'DISCUSSION':
        return <DiscussionScreen key="discussion" />;
      case 'VOTING':
        return <VotingScreen key="voting" />;
      case 'VOTE_REVEAL':
        return <VoteRevealScreen key="reveal" />;
      case 'RESULT':
        return <ResultScreen key="result" />;
      case 'SCORECARD':
        return <ScorecardScreen key="scorecard" />;
      case 'FINAL_SUMMARY':
        return <FinalSummaryScreen key="final" />;
      default:
        return <HomeScreen key="default" />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0B0E1B] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#0B0E1B] to-[#070913] text-slate-100 flex flex-col justify-between relative overflow-x-hidden pt-safe pb-safe px-safe">
      {/* Background ambient decorative shapes */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Top Header */}
      <Header />

      {/* Dynamic Screen Content with Animated View Switcher */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10 px-2 sm:px-4 py-1 sm:py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col items-center justify-center"
          >
            {renderCurrentScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals */}
      <HowToPlayModal />
      <RestartModal />
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  );
}

export default App;
