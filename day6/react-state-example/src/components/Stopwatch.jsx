import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="card stopwatch-card">
      <h2 className="title stopwatch-title">นาฬิกาจับเวลา (Stopwatch)</h2>
      <div className="stopwatch-time">{time}s</div>
      <div className="btn-group stopwatch-btn-group">
        <button onClick={start} className="btn btn-success stopwatch-btn-start">เริ่ม</button>
        <button onClick={stop} className="btn btn-warning stopwatch-btn-stop">หยุด</button>
        <button onClick={reset} className="btn btn-secondary stopwatch-btn-reset">รีเซ็ต</button>
      </div>
    </div>
  );
}

export default Stopwatch;
