// src/BattleArena.js
import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";
import BattleGameABI from "./BattleGameABI.json";

const contractAddress = "0x9Ee89d5882cEa559f5DE3068Ce5C1906a047EEe2"; // Replace with your real contract address

function BattleArena() {
  const [battleContract, setBattleContract] = useState(null);
  const [battleStatus, setBattleStatus] = useState("");

  useEffect(() => {
    async function initContract() {
      if (window.ethereum) {
        try {
          // Initialize provider using ethers v6 BrowserProvider
          const provider = new BrowserProvider(window.ethereum);
          // Override ENS-related methods to prevent errors on non-ENS networks
          provider.getEnsAddress = async () => null;
          provider.getResolver = async () => null;
          provider.resolveName = async (name) => name;

          const signer = await provider.getSigner();
          const contractInstance = new Contract(contractAddress, BattleGameABI, signer);
          setBattleContract(contractInstance);
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      } else {
        alert("MetaMask is not installed. Please install it to continue.");
      }
    }
    initContract();
  }, []);

  // Listen for battle result events from the contract
  useEffect(() => {
    if (!battleContract) return;
    const onBattleResult = (challenger, opponent, outcome, event) => {
      console.log("BattleResult event received:", challenger, opponent, outcome);
      setBattleStatus(`Battle result: ${outcome}`);
    };

    battleContract.on("BattleResult", onBattleResult);
    return () => {
      battleContract.off("BattleResult", onBattleResult);
    };
  }, [battleContract]);

  // Function to initiate a battle
  const initiateBattle = async () => {
    if (!battleContract) {
      alert("Battle contract not ready");
      return;
    }
    try {
      setBattleStatus("Battle initiated, waiting for outcome...");
      // For demonstration, using a dummy opponent address
      const tx = await battleContract.battle("0x000000000000000000000000000000000000dEaD");
      await tx.wait();
    } catch (error) {
      console.error("Error initiating battle:", error);
      setBattleStatus("Error initiating battle.");
    }
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>Battle Arena</h2>
      <button
        onClick={initiateBattle}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        Initiate Battle
      </button>
      <p>{battleStatus}</p>
    </div>
  );
}

export default BattleArena;
