// src/Lobby.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend server (update the URL if needed)
const socket = io("http://localhost:3000");

function Lobby() {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    // When the component mounts, emit a join event with player data
    // For demonstration, using a default name; in a full game, this would come from your wallet or user profile.
    socket.emit('join lobby', { name: "Player_" + socket.id });

    // Listen for lobby updates from the server
    socket.on('lobby update', (playersData) => {
      console.log("Lobby updated:", playersData);
      setPlayers(playersData);
    });

    // Optionally, listen for leaderboard updates (if sent separately)
    socket.on('leaderboard update', (playersData) => {
      setPlayers(playersData);
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('lobby update');
      socket.off('leaderboard update');
    };
  }, []);

  // Convert players object into an array and sort by score (highest first)
  const playersArray = Object.entries(players).map(([id, data]) => ({
    id,
    name: data.name,
    score: data.score || 0,
  }));
  playersArray.sort((a, b) => b.score - a.score);

  return (
    <div className="lobby-container" style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Lobby & Leaderboard</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {playersArray.map((player) => (
          <li key={player.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ccc',
            padding: '0.5rem 0'
          }}>
            <span>{player.name}</span>
            <span>Score: {player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
