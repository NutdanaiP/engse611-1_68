import React, { useState } from 'react';

function NameForm() {
  const [name, setName] = useState(''); // State สำหรับเก็บชื่อที่พิมพ์

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h2>Lab 1.2: Input Form</h2>
      <input
        type="text"
        value={name} // 1. ผูก value ของ input เข้ากับ state
        onChange={handleChange} // 2. เมื่อมีการเปลี่ยนแปลง ให้เรียก handleChange
        placeholder="Enter your name"
      />
      {/* 3. แสดงผลแบบ real-time */}
      {name && <p>Hello, {name}!</p>}
    </div>
  );
}

export default NameForm;