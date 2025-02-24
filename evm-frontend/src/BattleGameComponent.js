// src/BattleGameComponent.js
import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { io } from 'socket.io-client';
import BattleGameABI from './BattleGameABI.json';

// Replace with your deployed contract address
const contractAddress = "0x9Ee89d5882cEa559f5DE3068Ce5C1906a047EEe2";
// Create a separate socket for battle events/score updates
const battleSocket = io('http://localhost:3001');

function BattleGameComponent() {
  const [contract, setContract] = useState(null);
  const [battleEvent, setBattleEvent] = useState(null);

  useEffect(() => {
    async function initContract() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        // Override ENS resolution methods if needed:
        provider.getEnsAddress = async () => null;
        provider.getResolver = async () => null;
        provider.resolveName = async (name) => name;
        const signer = await provider.getSigner();
        const battleContract = new Contract(contractAddress, BattleGameABI, signer);
        setContract(battleContract);
      }
    }
    initContract();
  }, []);

  // Listen for the BattleResult event and update the leaderboard score
  useEffect(() => {
    if (!contract) return;
    const onBattleResult = (challenger, opponent, outcome, event) => {
      console.log("BattleResult event:", challenger, opponent, outcome);
      setBattleEvent({ challenger, opponent, outcome });
      // For demo: if the outcome includes "Wins!", add 10 points.
      const scoreUpdate = outcome.includes("Wins!") ? 10 : 0;
      // Emit update score event for the current player
      battleSocket.emit('update score', { score: scoreUpdate });
    };

    contract.on("BattleResult", onBattleResult);
    return () => {
      contract.off("BattleResult", onBattleResult);
    };
  }, [contract]);

  return (
    <div>
      <h2>Battle Game</h2>
      <button
        onClick={async () => {
          if (!contract) {
            alert("Contract not ready!");
            return;
          }
          try {
            // For demo, using a dummy opponent address
            const tx = await contract.battle("0x000000000000000000000000000000000000dEaD");
            await tx.wait();
          } catch (error) {
            console.error("Error initiating battle:", error);
          }
        }}
      >
        Initiate Battle
      </button>
      {battleEvent && (
        <div>
          <h3>Battle Result</h3>
          <p>Challenger: {battleEvent.challenger}</p>
          <p>Opponent: {battleEvent.opponent}</p>
          <p>Outcome: {battleEvent.outcome}</p>
        </div>
      )}
    </div>
  );
}

export default BattleGameComponent;
