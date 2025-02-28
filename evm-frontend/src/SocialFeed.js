// src/SocialFeed.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend server for real-time events
const socket = io("http://localhost:3000");

function SocialFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // Listener for battle results
    socket.on("battle result", (data) => {
      setFeed(prev => [...prev, { type: "Battle", data, timestamp: new Date() }]);
    });

    // Listener for NFT rewards
    socket.on("nft reward", (data) => {
      setFeed(prev => [...prev, { type: "NFT Reward", data, timestamp: new Date() }]);
    });

    // Listener for chat messages
    socket.on("chat message", (msg) => {
      setFeed(prev => [...prev, { type: "Chat", data: msg, timestamp: new Date() }]);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("battle result");
      socket.off("nft reward");
      socket.off("chat message");
    };
  }, []);

  // Format timestamp nicely
  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Social Feed</h2>
      {feed.length === 0 ? (
        <p>No events yet...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {feed.map((item, index) => (
            <li key={index} style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
              <small>{formatTimestamp(item.timestamp)}</small>
              <div>
                <strong>{item.type}:</strong>{" "}
                {typeof item.data === "object" ? JSON.stringify(item.data) : item.data}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SocialFeed;
