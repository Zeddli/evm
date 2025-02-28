// src/Inventory.js
import React, { useState, useEffect } from 'react';

// Dummy NFT data for demonstration
const dummyNFTs = [
  { id: 1, name: "Sword of Valor", description: "A legendary sword.", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Shield of Courage", description: "A sturdy shield.", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Helmet of Wisdom", description: "A helmet that grants insight.", image: "https://via.placeholder.com/100" },
];

function Inventory() {
  const [nfts, setNfts] = useState([]);

  // Simulate fetching NFT assets (replace with actual blockchain calls in production)
  useEffect(() => {
    // Here, you might call your backend or a blockchain API to fetch the user's NFTs
    setTimeout(() => {
      setNfts(dummyNFTs);
    }, 500); // Simulated delay
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Your Inventory</h2>
      {nfts.length === 0 ? (
        <p>Loading assets...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {nfts.map((nft) => (
            <div key={nft.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "0.5rem", width: "calc(50% - 1rem)" }}>
              <img src={nft.image} alt={nft.name} style={{ width: "100%", borderRadius: "4px" }} />
              <h3 style={{ fontSize: "1rem" }}>{nft.name}</h3>
              <p style={{ fontSize: "0.8rem" }}>{nft.description}</p>
              <button style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", marginRight: "0.5rem" }}>View</button>
              <button style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>Trade</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;
