import React, { useState } from 'react';

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('pink');

  const colors = [
    { name: 'ฟ้า', value: 'blue' },
    { name: 'เขียว', value: 'green' },
    { name: 'ชมพู', value: 'pink' },
    { name: 'เหลือง', value: 'yellow' },
    { name: 'ม่วง', value: 'purple' },
    { name: 'ส้ม', value: 'orange' },
    { name: 'น้ำตาล', value: 'brown' },
    { name: 'เทา', value: 'gray' },
  ];

  const currentColor = colors.find(color => color.value === selectedColor);

  return (
    <div className="card">
      <h2 className="title">เปลี่ยนสีพื้นหลัง (State + UI)</h2>
      {/* พื้นที่แสดงสีที่เลือก */}
      <div className={`color-preview color-${currentColor?.value}`}> 
        <div className="color-icon">🎨</div>
        <div className="color-selected">สีที่เลือก: {currentColor?.name}</div>
      </div>
      {/* ปุ่มเลือกสี */}
      <div className="color-section">
        <p className="color-label">เลือกสีที่ต้องการ:</p>
        <div className="color-btn-group">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`color-btn color-btn-${color.value}${selectedColor === color.value ? ' color-btn-active' : ''}`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
      {/* ปุ่มสุ่มสี */}
      <div className="color-random-group">
        <button
          onClick={() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setSelectedColor(randomColor.value);
          }}
          className="color-btn color-btn-random"
        >
          🎲 สุ่มสี
        </button>
      </div>
      {/* แสดงข้อมูล State */}
      <div className="state">
        <p className="state-label">
          <strong>State:</strong> selectedColor = "{selectedColor}"
        </p>
        <p className="state-label">
          <strong>CSS Class:</strong> color-{currentColor?.value}
        </p>
        <p className="state-desc">
          คลิกสี → setSelectedColor() → เปลี่ยน className
        </p>
      </div>
    </div>
  );
}

export default ColorPicker;