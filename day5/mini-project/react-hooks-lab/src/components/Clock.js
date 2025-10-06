import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Effect: เริ่มต้นการทำงานของ interval
    const timerId = setInterval(() => {
      setTime(new Date());
      console.log('Tick');
    }, 1000);

    // ⭐️ Cleanup Function ⭐️
    // ฟังก์ชันนี้จะถูกเรียกเมื่อ Component กำลังจะ unmount
    return () => {
      clearInterval(timerId);
      console.log('Clock component unmounted. Timer stopped.');
    };
  }, []); // [] -> ทำงานครั้งเดียวตอน mount และ cleanup ตอน unmount

  return (
    <div>
      <h2>Lab 2.2: Cleanup with Timer</h2>
      <p>Current time: {time.toLocaleTimeString()}</p>
    </div>
  );
}

export default Clock;