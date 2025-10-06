import React, { useState } from 'react';

function NameChanger() {
  const [name, setName] = useState('Hello World');

  return (
    <div className="card">
      <h2 className="title">การเปลี่ยนข้อความ (Text State)</h2>
      {/* Input Field */}
      <div className="input-group">
        <label className="input-label">พิมพ์ชื่อของคุณ:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          className="input"
        />
      </div>
      {/* แสดงผลการทักทาย */}
      <div className="greet-box">
        <h3 className="greet-title">
          {name ? (
            <span className="greet-active">สวัสดี {name}! 👋</span>
          ) : (
            <span className="greet-placeholder">กรุณาพิมพ์ชื่อของคุณ...</span>
          )}
        </h3>
      </div>
      {/* ปุ่มล้างข้อมูล */}
      <div className="btn-group">
        <button
          onClick={() => setName('')}
          disabled={!name}
          className={`btn btn-clear${name ? '' : ' btn-disabled'}`}
        >
          ล้างชื่อ
        </button>
      </div>
      {/* แสดงข้อมูล State */}
      <div className="state">
        <p className="state-label">
          <strong>State:</strong> name = "{name}"
        </p>
        <p className="state-label">
          <strong>ความยาว:</strong> {name.length} ตัวอักษร
        </p>
        <p className="state-label">
          <strong>จำนวนคำ:</strong> {name.trim() ? name.trim().split(/\s+/).length : 0} คำ
        </p>
        <p className="state-desc">
          พิมพ์ → onChange → setName() → Re-render
        </p>
      </div>
    </div>
  );
}

export default NameChanger;