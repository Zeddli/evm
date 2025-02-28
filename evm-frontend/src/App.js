// src/App.js
import React from 'react';
import WalletConnect from './WalletConnect';
// Import additional components later (e.g., Lobby, Battle, Chat, etc.)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WalletConnect />
        {/* Future components: <Lobby />, <BattleArena />, <Chat /> */}
      </header>
    </div>
  );
}

export default App;
