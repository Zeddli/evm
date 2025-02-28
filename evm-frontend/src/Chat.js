// src/Chat.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Connect to your backend server (adjust the URL if needed)
const socket = io('http://localhost:3000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on('chat message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });
    // Clean up the listener on component unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      // Emit the chat message to the backend
      socket.emit('chat message', message);
      // Optionally add your own message locally
      setChat((prevChat) => [...prevChat, message]);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>Chat Room</h2>
      <ul>
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendChat}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
