import React, { useState } from 'react';

function VotingSystem() {
  const options = ['A', 'B', 'C', 'D'];
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [selected, setSelected] = useState(null);

  const vote = () => {
    if (selected !== null) {
      const newVotes = [...votes];
      newVotes[selected]++;
      setVotes(newVotes);
    }
  };

  return (
    <div className="card voting-card">
      <h2 className="title voting-title">ระบบโหวต (Voting System)</h2>
      <div className="voting-options">
        {options.map((opt, idx) => (
          <button
            key={opt}
            onClick={() => setSelected(idx)}
            className={`btn voting-option-btn ${selected === idx ? 'voting-option-active' : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="btn-group voting-btn-group">
        <button
          onClick={vote}
          disabled={selected === null}
          className={`btn voting-vote-btn ${selected !== null ? '' : 'btn-disabled'}`}
        >
          โหวต
        </button>
      </div>
      <div className="result-box voting-result-box">
        <h3 className="result-title voting-result-title">ผลโหวต:</h3>
        <ul className="result-list voting-result-list">
          {options.map((opt, idx) => (
            <li key={opt} className="result-item voting-result-item">
              {opt}: <span className="result-value voting-result-value">{votes[idx]}</span> คะแนน
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VotingSystem;
