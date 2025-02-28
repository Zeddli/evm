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
        const address = await signer.getAddress();
        setAccount(address);
  
        // Proceed with your initialization logic (e.g., setting state)
        console.log("Wallet connected:", await signer.getAddress());
      } catch (error) {
        // Handle rejection (error code 4001) or any other error
        if (error.code === 4001) {
          // User rejected the connection
          alert("Connection request was rejected. Please try again if you wish to connect your wallet.");
        } else if (error.code === -32002) {
          
          alert("A connection request is already pending. Please check your MetaMask window.");
        } 
        else {
          console.error("Error connecting wallet:", error);
        }
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect your wallet.");
    }
  }


  return (
    <div className="wallet-connect" style={{ padding: '1rem', textAlign: 'center' }}>
      {!account ? (
        <>
          <h2>Welcome to SocialFi Arena</h2>
          <p>Connect your wallet to start battling and earning NFT rewards!</p>
          <button onClick={connectWallet} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            Connect Wallet
          </button>
        </>
      ) : (
        <p>Connected: {account}</p>
      )}
    </div>
  );
}

export default WalletConnect;
