import React, { useState } from 'react';

function NumberGuessing() {
  const [target, setTarget] = useState(50);
  const [guess, setGuess] = useState('25');
  const [message, setMessage] = useState('ลองทายดู!');
  const [tries, setTries] = useState(3);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage('กรุณาใส่ตัวเลข');
      return;
    }
    setTries(tries + 1);
    if (num === target) {
      setMessage(`ถูกต้อง! (${num}) ใช้ไป ${tries + 1} ครั้ง`);
    } else if (num < target) {
      setMessage('มากกว่านี้');
    } else {
      setMessage('น้อยกว่านี้');
    }
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setTries(0);
  };

  return (
    <div className="card number-guessing-card">
      <h2 className="title number-guessing-title">เกมทายตัวเลข (1-100)</h2>
      <div className="input-group">
        <input
          type="number"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          className="input number-guessing-input"
          placeholder="กรอกตัวเลข"
        />
        <button
          onClick={handleGuess}
          className="btn btn-accent number-guessing-btn"
        >
          ทาย
        </button>
      </div>
      <div className="message number-guessing-message">{message}</div>
      <div className="btn-group">
        <button
          onClick={resetGame}
          className="btn btn-secondary number-guessing-reset"
        >
          เริ่มใหม่
        </button>
      </div>
      <div className="tries-info number-guessing-tries">จำนวนครั้งที่ทาย: {tries}</div>
    </div>
  );
}

export default NumberGuessing;
