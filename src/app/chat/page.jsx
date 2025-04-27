'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import './page.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `**AlgaeAdvisor** here! I can help with information about algae blooms, marine safety, and beach conditions.`
    }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    'What are algae blooms?',
    'What causes them?',
    'Are they dangerous?',
    'Where are blooms happening?'
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing animation (dots: . .. ...)
  useEffect(() => {
    if (!isTyping) {
      setTypingDots('');
      return;
    }
    const interval = setInterval(() => {
      setTypingDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isTyping]);

  const sendMessage = async (overrideText) => {
    const text = overrideText ?? input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsTyping(true);
    setSuggestions([]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      let { reply: rawReply, suggestions: rawSug } = data;

      let parsedReply = rawReply;
      let parsedSug = Array.isArray(rawSug) ? rawSug : [];
      if (typeof rawReply === 'string' && rawReply.trim().startsWith('{')) {
        try {
          const obj = JSON.parse(rawReply);
          parsedReply = obj.reply;
          parsedSug = Array.isArray(obj.suggestions) ? obj.suggestions : parsedSug;
        } catch (_) {
          // keep rawReply if parse fails
        }
      }

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: parsedReply }
      ]);
      setSuggestions(parsedSug);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'AlgaeAdvisor is unavailable.' }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') sendMessage();
  };

  const windowClass =
    messages.length > 1
      ? 'chat-window expanded'
      : 'chat-window initial';

  return (
    <main className="chat-page">
      <Navbar />

      <header className="chat-title">
        <h1>AlgaeAdvisor</h1>
      </header>

      <section className={windowClass}>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            </div>
          ))}

          {isTyping && (
            <div className="shimmer-wrapper">
              <div className="shimmer"></div>
              <p className="chat-typing">AlgaeAdvisor is typing{typingDots}</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="suggestion-btn"
                onClick={() => setInput(s)} // instead of sending immediately!
                title={s}
              >
                {s.length > 40 ? s.slice(0, 40) + '…' : s}
              </button>
            ))}
          </div>
        )}
      </section>

      <footer className="chat-footer">
        <Input
          className="chat-input"
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="chat-send" onClick={() => sendMessage()}>
          Send
        </Button>
      </footer>
    </main>
  );
}
