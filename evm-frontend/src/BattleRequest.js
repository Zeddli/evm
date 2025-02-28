// src/BattleRequest.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BrowserProvider, ethers } from 'ethers';
import BattleGameABI from './BattleGameABI.json';

// Replace with your deployed contract address
const contractAddress = "0x9Ee89d5882cEa559f5DE3068Ce5C1906a047EEe2";
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
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          
          // Initialize provider
          const provider = new BrowserProvider(window.ethereum);
          // Override ENS methods if needed
          provider.getEnsAddress = async () => null;
          provider.getResolver = async () => null;
          provider.resolveName = async (name) => name;
          
          // Get signer
          const signer = await provider.getSigner();
          const battleContract = new ethers.Contract(contractAddress, BattleGameABI, signer);
          // Proceed with your logic (e.g., setting state, calling functions)
          console.log("Wallet connected:", await signer.getAddress());
        } catch (error) {
          if (error.code === -32002) {
            alert("A wallet connection request is already pending. Please check your MetaMask window.");
          } else if (error.code === 4001) {
            alert("Connection request was rejected. Please try again.");
          } else {
            console.error("Error connecting wallet:", error);
          }
        }
      } else {
        alert("MetaMask is not installed. Please install MetaMask.");
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
    <div style={{ padding: "1rem", textAlign: "center" }}>
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
