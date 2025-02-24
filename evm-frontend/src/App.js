// src/App.js
import React from 'react';
import WalletConnect from './WalletConnect';
import BattleGameComponent from './BattleGameComponent';
import Chat from './Chat';
import BattleRequest from './BattleRequest';
import Lobby from './Lobby';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SocialFi Game</h1>
        <WalletConnect />
        <BattleGameComponent />
        <BattleRequest />
        <Chat />
        <Lobby />
      </header>
    </div>
  );
}

export default App;
