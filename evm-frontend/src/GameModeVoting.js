// src/GameModeVoting.js
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to your backend server (update URL if needed)
const socket = io("http://localhost:3000");

// Define available game modes
const gameModes = ["Deathmatch", "Team Battle", "Survival", "Capture the Flag"];

function GameModeVoting() {
  const [votes, setVotes] = useState({});
  const [selectedMode, setSelectedMode] = useState("");
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  // Listen for voting updates from the server
  useEffect(() => {
    socket.on("vote update", (updatedVotes) => {
      setVotes(updatedVotes);
    });
    return () => {
      socket.off("vote update");
    };
  }, []);

  // Function to submit a vote
  const submitVote = (mode) => {
    setSelectedMode(mode);
    socket.emit("submit vote", { mode });
    setVoteSubmitted(true);
  };

  // Calculate total votes for percentage display
  const totalVotes = Object.values(votes).reduce((acc, count) => acc + count, 0);

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Vote for Next Game Mode</h2>
      <div>
        {gameModes.map((mode) => (
          <button
            key={mode}
            onClick={() => submitVote(mode)}
            disabled={voteSubmitted}
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: selectedMode === mode ? "#4CAF50" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {mode}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h3>Voting Results:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {gameModes.map((mode) => {
            const count = votes[mode] || 0;
            const percentage = totalVotes ? ((count / totalVotes) * 100).toFixed(1) : 0;
            return (
              <li key={mode} style={{ marginBottom: "0.5rem" }}>
                {mode}: {count} votes ({percentage}%)
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default GameModeVoting;
