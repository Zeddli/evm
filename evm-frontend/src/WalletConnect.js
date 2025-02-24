import React, { useState } from "react";
import { BrowserProvider } from "ethers";

function WalletConnect() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        // Request account access from MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        // Initialize provider and disable ENS lookups if necessary
        const provider = new BrowserProvider(window.ethereum);
        provider.getEnsAddress = async () => null;
        provider.getResolver = async () => null;
        provider.resolveName = async (name) => name;
  
        const signer = await provider.getSigner();
        // Proceed with your initialization logic (e.g., setting state)
        console.log("Wallet connected:", await signer.getAddress());
      } catch (error) {
        // Handle rejection (error code 4001) or any other error
        if (error.code === 4001) {
          // User rejected the connection
          alert("Connection request was rejected. Please try again if you wish to connect your wallet.");
        } else {
          console.error("Error connecting wallet:", error);
        }
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect your wallet.");
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected: {account}</p>}
    </div>
  );
}

export default WalletConnect;
