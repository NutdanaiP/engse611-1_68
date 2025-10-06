import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
//ส้มตำ
  // TODO: เพิ่ม debounce เพื่อไม่ให้ search ทุกครั้งที่พิมพ์
  // ใช้ useEffect + setTimeout

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ค้นหาร้านอาหาร..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">🔍 ค้นหา</button>
    </form>
  );
}

export default SearchBar;