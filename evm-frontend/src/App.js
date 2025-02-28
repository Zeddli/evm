// src/App.js
import React from "react";
import WalletConnect from "./WalletConnect";
import Lobby from "./Lobby";
import BattleArena from "./BattleArena";
import Chat from "./Chat";
import BattleRequest from "./BattleRequest";
import GameModeVoting from "./GameModeVoting";
import Inventory from "./Inventory";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WalletConnect />
        <Lobby />
        <BattleArena />
        <BattleRequest />
        <Chat />
        <GameModeVoting />
        <Inventory />
      </header>
    </div>
  );
}

export default App;
