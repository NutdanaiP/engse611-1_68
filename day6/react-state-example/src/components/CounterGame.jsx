import React, { useState, useEffect } from 'react';

function CounterGame() {
  // Game States
  const [score, setScore] = useState(50);
  const [level, setLevel] = useState(2);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(100);
  const [multiplier, setMultiplier] = useState(2);
  const [clickStreak, setClickStreak] = useState(5);

  // Power-Up states
  const [powerUps, setPowerUps] = useState({
    doublePoints: false,
    extraTimeUsed: false,
    instantBonusUsed: false,
  });
  const [powerUpTimer, setPowerUpTimer] = useState(0);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // ฟังก์ชันเริ่มเกม
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setMultiplier(1);
    setClickStreak(0);
    setIsGameActive(true);
    setPowerUps({
      doublePoints: false,
      extraTimeUsed: false,
      instantBonusUsed: false,
    });
    setPowerUpTimer(0);
  };

  // ฟังก์ชันเพิ่มคะแนน
  const addScore = (points) => {
    if (!isGameActive) return;

    const actualPoints = points * multiplier;
    const newScore = score + actualPoints;
    const newStreak = clickStreak + 1;
    
    setScore(newScore);
    setClickStreak(newStreak);

    // เลเวลอัพ
    const newLevel = Math.floor(newScore / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setMultiplier(1 + (newLevel - 1) * 0.5);
    }

    // Streak bonus
    if (newStreak % 10 === 0) {
      setScore(prev => prev + 50); // Bonus!
    }

    // อัพเดท High Score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  // จบเกม
  const endGame = () => {
    setIsGameActive(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  // ⚡ Power-Up: Double Points
  const activateDoublePoints = () => {
    if (!isGameActive || powerUps.doublePoints) return;
    setPowerUps(prev => ({ ...prev, doublePoints: true }));
    setPowerUpTimer(10);
    setMultiplier(prev => prev * 2); // คูณคะแนนเพิ่ม

    const timer = setInterval(() => {
      setPowerUpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPowerUps(p => ({ ...p, doublePoints: false }));
          setMultiplier(prev => prev / 2); // คืนค่าปกติ
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ⏳ Power-Up: Extra Time
  const useExtraTime = () => {
    if (!isGameActive || powerUps.extraTimeUsed) return;
    setTimeLeft(prev => prev + 10);
    setPowerUps(prev => ({ ...prev, extraTimeUsed: true }));
  };

  // 💥 Power-Up: Instant Bonus
  const useInstantBonus = () => {
    if (!isGameActive || powerUps.instantBonusUsed) return;
    setScore(prev => prev + 100);
    setPowerUps(prev => ({ ...prev, instantBonusUsed: true }));
  };

  return (
    <div className="card">
      <h2 className="title">🎮 เกมนับคะแนน (Power-Up Edition)</h2>

      {/* Game Stats */}
      <div className="stats-grid">
        <div className="stats-box stats-score">
          <div className="stats-value">{score}</div>
          <div className="stats-label">คะแนน</div>
        </div>
        <div className="stats-box stats-highscore">
          <div className="stats-value">{highScore}</div>
          <div className="stats-label">คะแนนสูงสุด</div>
        </div>
        <div className="stats-box stats-level">
          <div className="stats-value">Lv.{level}</div>
          <div className="stats-label">เลเวล</div>
        </div>
        <div className="stats-box stats-time">
          <div className="stats-value">{timeLeft}s</div>
          <div className="stats-label">เวลาเหลือ</div>
        </div>
      </div>

      {/* Multiplier & Streak */}
      <div className="stats-grid">
        <div className="stats-box stats-multiplier">
          <div className="stats-value">×{multiplier.toFixed(1)}</div>
          <div className="stats-label">ตัวคูณ</div>
        </div>
        <div className="stats-box stats-streak">
          <div className="stats-value">{clickStreak}</div>
          <div className="stats-label">คลิกต่อเนื่อง</div>
        </div>
      </div>

      {/* Game Controls */}
      {!isGameActive ? (
        <div className="center-group">
          <button
            onClick={startGame}
            className="btn btn-start"
          >
            🎮 เริ่มเกม
          </button>
          {score > 0 && (
            <div className="result-box">
              <p className="result-title">เกมจบแล้ว!</p>
              <p>คะแนนรวม: <span className="result-score">{score}</span></p>
              <p>เลเวลสูงสุด: <span className="result-level">{level}</span></p>
            </div>
          )}
        </div>
      ) : (
        <div className="game-controls">
          <div className="btn-group">
            <button
              onClick={() => addScore(1)}
              className="btn btn-plus"
            >
              +1 คะแนน
            </button>
            <button
              onClick={() => addScore(5)}
              className="btn btn-blue"
            >
              +5 คะแนน
            </button>
          </div>
          <button
            onClick={() => addScore(10)}
            className="btn btn-red btn-block"
          >
            +10 คะแนน (โบนัส!)
          </button>

          {/* Power-Up Controls */}
          <div className="btn-group powerup-group">
            <button
              onClick={activateDoublePoints}
              disabled={powerUps.doublePoints}
              className={`btn btn-yellow${powerUps.doublePoints ? ' btn-disabled' : ''}`}
            >
              ⚡ Double Points
              {powerUps.doublePoints && ` (${powerUpTimer}s)`}
            </button>
            <button
              onClick={useExtraTime}
              disabled={powerUps.extraTimeUsed}
              className={`btn btn-blue${powerUps.extraTimeUsed ? ' btn-disabled' : ''}`}
            >
              ⏳ +10s
            </button>
            <button
              onClick={useInstantBonus}
              disabled={powerUps.instantBonusUsed}
              className={`btn btn-green${powerUps.instantBonusUsed ? ' btn-disabled' : ''}`}
            >
              💥 +100
            </button>
          </div>

          <button
            onClick={endGame}
            className="btn btn-gray btn-block"
          >
            หยุดเกม
          </button>
        </div>
      )}

      {/* Game Rules */}
      <div className="info-box">
        <h3 className="info-title">📖 กติกา:</h3>
        <ul className="info-list">
          <li>• คลิกปุ่มเพื่อเก็บคะแนนภายใน 30 วินาที</li>
          <li>• ทุก 100 คะแนน = เลเวลอัพ + ตัวคูณเพิ่ม</li>
          <li>• คลิกต่อเนื่อง 10 ครั้ง = โบนัส 50 คะแนน</li>
          <li>• ใช้ Power-Up เพื่อเพิ่มความสนุก!</li>
        </ul>
      </div>

      {/* Debug Info */}
      <div className="debug-box">
        <p className="debug-title">🔧 Debug Info:</p>
        <div className="debug-grid">
          <div>score: {score}</div>
          <div>level: {level}</div>
          <div>timeLeft: {timeLeft}</div>
          <div>isGameActive: {isGameActive.toString()}</div>
          <div>multiplier: {multiplier}</div>
          <div>clickStreak: {clickStreak}</div>
          <div>powerUps: {JSON.stringify(powerUps)}</div>
          <div>powerUpTimer: {powerUpTimer}</div>
        </div>
      </div>
    </div>
  );
}

export default CounterGame;
