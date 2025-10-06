import React, { useState, useEffect } from 'react';

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiResult, setApiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ถ้าช่องค้นหาว่างเปล่า ก็ไม่ต้องทำอะไร
    if (searchTerm.trim() === '') {
      setApiResult('');
      return;
    }

    setIsLoading(true);

    // 1. ตั้งเวลา (timer) ที่จะทำงานในอีก 500ms
    const delayDebounceFn = setTimeout(() => {
      console.log(`Searching for: ${searchTerm}`);
      // สมมติว่านี่คือการเรียก API
      setApiResult(`Results for "${searchTerm}"`);
      setIsLoading(false);
    }, 500); // รอ 500 มิลลิวินาที

    // 2. ⭐️ Cleanup Function ที่สำคัญที่สุด ⭐️
    // ฟังก์ชันนี้จะทำงานทุกครั้งที่ searchTerm เปลี่ยน (ก่อนที่ effect ใหม่จะรัน)
    // หรือเมื่อ component unmount
    return () => {
      clearTimeout(delayDebounceFn);
    };
    
  }, [searchTerm]); // 3. Effect นี้จะทำงานใหม่ทุกครั้งที่ searchTerm เปลี่ยน

  return (
    <div>
      <h2>Lab 3.1: Debounced Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search here..."
      />
      {isLoading && <p>Searching...</p>}
      {!isLoading && apiResult && <p>{apiResult}</p>}
    </div>
  );
}

export default DebouncedSearch;