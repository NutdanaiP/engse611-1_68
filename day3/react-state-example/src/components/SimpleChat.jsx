import React, { useState, useRef, useEffect } from 'react';

function SimpleChat() {
  const [messages, setMessages] = useState(['Hello!']);
  const [input, setInput] = useState('สวัสดี');
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input.trim()]);
      setInput('');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="card chat-card flex-col" style={{ height: 400 }}>
      <h2 className="title chat-title">ระบบแชท (Simple Chat)</h2>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <span className="chat-bubble">{msg}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-group">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="input chat-input"
          placeholder="พิมพ์ข้อความ..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="btn btn-accent chat-send-btn"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}

export default SimpleChat;
