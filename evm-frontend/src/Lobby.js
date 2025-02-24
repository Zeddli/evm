// src/Lobby.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend lobby server (adjust URL and port as needed)
const socket = io('http://localhost:3001');

function Lobby() {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    // On initial load, join the lobby. For demo, we use a simple name.
    socket.emit('join lobby', { name: 'Player-' + socket.id });

    // Listen for lobby updates
    socket.on('lobby update', (playersData) => {
      setPlayers(playersData);
    });

    // Listen for leaderboard updates
    socket.on('leaderboard update', (playersData) => {
      setPlayers(playersData);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('lobby update');
      socket.off('leaderboard update');
    };
  }, []);

  // Convert players object to array for rendering and sort by score descending
  const playersArray = Object.entries(players).map(([id, player]) => ({
    id,
    ...player,
  }));
  playersArray.sort((a, b) => b.score - a.score);

  return (
    <div>
      <h2>Lobby & Leaderboard</h2>
      <ul>
        {playersArray.map((player) => (
          <li key={player.id}>
            {player.name} - Score: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
