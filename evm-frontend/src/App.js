// src/App.js
import React from "react";
import WalletConnect from "./WalletConnect";
import Lobby from "./Lobby";
import BattleArena from "./BattleArena";
import Chat from "./Chat";
import BattleRequest from "./BattleRequest";
import GameModeVoting from "./GameModeVoting";
import Inventory from "./Inventory";
import TaskDashboard from "./TaskDashboard";
import SocialFeed from "./SocialFeed";

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
        <TaskDashboard />
        <SocialFeed/>
      </header>
    </div>
  );
}

export default App;
