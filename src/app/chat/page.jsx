// src/app/chat/page.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './page.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `**MarineBot** here! I can help with information about algae blooms, marine safety, and beach conditions.

For example, you can ask:
- **What are algae blooms?**
- **What causes them?**
- **Are they dangerous?**
- **Where are blooms happening?**

What would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const { reply } = await res.json();
      setMessages(prev => [...prev, { sender: 'bot', text: reply || "MarineBot didn't reply." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'MarineBot is unavailable.' }]);
    } finally {
      setIsTyping(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <header className="chat-header">🌊 MarineBot</header>
      <main className="chat-main">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}> {msg.text} </ReactMarkdown>
          </div>
        ))}
        {isTyping && <div className="chat-typing">MarineBot is typing…</div>}
        <div ref={chatEndRef} />
      </main>
      <footer className="chat-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send" onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
}
