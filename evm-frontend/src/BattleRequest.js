// src/BattleRequest.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BrowserProvider, ethers } from 'ethers';
import BattleGameABI from './BattleGameABI.json';

// Replace with your deployed contract address
const contractAddress = "0xD58d513f4fD304Ad85296C6AB53A07C82c20a4Cf";
const socket = io('http://localhost:3000');

function BattleRequest() {
  const [request, setRequest] = useState('');
  const [battleRequests, setBattleRequests] = useState([]);

  // Setup provider and contract instance
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Initialize ethers and contract when wallet is connected
    async function initContract() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        provider.getEnsAddress = async () => null;
        provider.getResolver = async () => null;
        provider.resolveName = async (name) => name;
        const signer = await provider.getSigner();
        const battleContract = new ethers.Contract(contractAddress, BattleGameABI, signer);
        setContract(battleContract);
      }
    }
    initContract();
  }, []);

  useEffect(() => {
    socket.on('battle request', (data) => {
      setBattleRequests(prev => [...prev, data]);
    });
    return () => {
      socket.off('battle request');
    };
  }, []);

  const sendBattleRequest = (e) => {
    e.preventDefault();
    if (request.trim() !== '') {
      // For demo, we include sender info and message
      const data = { from: "Player1", opponent: "0xOpponentAddress", message: request };
      socket.emit('battle request', data);
      setBattleRequests(prev => [...prev, data]);
      setRequest('');
    }
  };

  // When a battle request is accepted, call the contract's challengeBattle function
  const acceptBattle = async (req) => {
    if (!contract) {
      alert("Contract not initialized yet.");
      return;
    }
    try {
      const tx = await contract.challengeBattle(req.opponent);
      await tx.wait();
      alert("Battle initiated!");
    } catch (error) {
      console.error("Battle request failed:", error);
      alert("Battle request failed.");
    }
  };

  return (
    <div>
      <h2>Battle Requests</h2>
      <ul>
        {battleRequests.map((req, index) => (
          <li key={index}>
            <strong>{req.from}:</strong> {req.message}
            {/* Button to accept the battle request */}
            <button onClick={() => acceptBattle(req)}>Accept Battle</button>
          </li>
        ))}
      </ul>
      <form onSubmit={sendBattleRequest}>
        <input
          type="text"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Enter battle request message..."
        />
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
}

export default BattleRequest;
