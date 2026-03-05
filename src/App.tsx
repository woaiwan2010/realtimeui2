import React, { useState } from 'react';
import Ribbon from './components/Ribbon';
import Sidebar from './components/Sidebar';
import Viewport from './components/Viewport';
import Properties from './components/Properties';
import BottomPanel from './components/BottomPanel';
import WelcomeModal from './components/WelcomeModal';
import { AppMode } from './types';

export default function App() {
  const [mode, setMode] = useState<AppMode>('instant');
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-200 font-sans overflow-hidden">
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      
      {/* Top Header / Ribbon */}
      <Ribbon mode={mode} setMode={setMode} />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Operation Tree */}
        <Sidebar mode={mode} />

        {/* Center - Viewport */}
        <div className="flex flex-col flex-1 border-x border-zinc-800">
          <Viewport mode={mode} />
          <BottomPanel />
        </div>

        {/* Right Sidebar - Properties */}
        <Properties mode={mode} />
      </div>
    </div>
  );
}
