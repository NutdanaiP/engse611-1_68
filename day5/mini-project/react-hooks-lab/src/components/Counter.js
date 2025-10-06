import React, { useState } from 'react'; // 1. Import useState

function Counter() {
  // 2. ประกาศ state ชื่อ count และฟังก์ชันสำหรับอัปเดตชื่อ setCount
  //    ค่าเริ่มต้นของ count คือ 0
  const [count, setCount] = useState(0);

  // 3. สร้างฟังก์ชันเพื่อจัดการการคลิก
  const handleIncrement = () => {
    // 4. เรียกใช้ setCount เพื่ออัปเดตค่า count
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Lab 1.1: Simple Counter</h2>
      {/* 5. แสดงค่า count จาก state */}
      <p>You clicked {count} times</p>
      {/* 6. เรียกใช้ handleIncrement เมื่อมีการคลิกปุ่ม */}
      <button onClick={handleIncrement}>Click me</button>
    </div>
  );
}

export default Counter;
