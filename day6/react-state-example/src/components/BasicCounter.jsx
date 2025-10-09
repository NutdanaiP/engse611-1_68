import React, { useState } from 'react';

function BasicCounter() {
  const [count, setCount] = useState(100);

  return (
    <div className="card">
      <h2 className="title">ตัวนับพื้นฐาน (useState)</h2>
      
      {/* แสดงค่า count */}
      <div className="value">
        {count}
      </div>
      
      {/* ปุ่มควบคุม */}
      <div className="btn-group">
        <button 
          onClick={() => setCount(count - 1)}
          className="btn btn-minus"
        >
          ลด (-1)
        </button>
        <button 
          onClick={() => setCount(0)}
          className="btn btn-reset"
        >
          รีเซ็ต
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="btn btn-plus"
        >
          เพิ่ม (+1)
        </button>
        <button 
          onClick={() => setCount(count + 5)}
          className="btn btn-plus5"
        >
          +5
        </button>
        <button 
          onClick={() => setCount(count + 10)}
          className="btn btn-plus10"
        >
          +10
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="state">
        <p className="state-label">
          <strong>State:</strong> count = {count}
        </p>
        <p className="state-desc">
          คลิกปุ่ม → setCount() → Re-render → แสดงค่าใหม่
        </p>
      </div>
    </div>
  );
}

export default BasicCounter;