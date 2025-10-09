function FilterPanel({ onFilterChange, filters, theme, onToggleTheme }) {
  const categories = [
    'ทั้งหมด', 
    'อาหารไทย', 
    'อาหารญี่ปุ่น', 
    'อาหารอิตาเลียน', 
    'อาหารจีน', 
    'ฟาสต์ฟู้ด'
  ];

  // ฟังก์ชันจัดการการเปลี่ยนหมวดหมู่
  const handleCategoryChange = (category) => {
    onFilterChange({ 
      category: category === 'ทั้งหมด' ? '' : category 
    });
  };

  // ========================================
  // TODO 1: เพิ่มฟังก์ชัน handleRatingChange
  // ========================================
  // รับ parameter minRating
  // เรียก onFilterChange({ minRating: minRating || '' })
  const handleRatingChange = (minRating) => {
    onFilterChange({ minRating: minRating || '' });
  };

  // ========================================
  // TODO 2: เพิ่มฟังก์ชัน handlePriceChange
  // ========================================
  // รับ parameter priceRange
  // เรียก onFilterChange({ priceRange: priceRange || '' })
  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange: priceRange || '' });
  };

  /**
   * ฟังก์ชันสำหรับเปลี่ยนการเรียงลำดับ
   * ส่งค่า sort กลับไปยัง parent ผ่าน onFilterChange
   * ค่าที่รองรับ: '' (ค่าเริ่มต้น), 'rating', 'name', 'reviews'
   */
  const handleSortChange = (sortKey) => {
    onFilterChange({ sort: sortKey || '' });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>หมวดหมู่:</label>
        <select 
          value={filters.category || 'ทั้งหมด'}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>เรียงตาม:</label>
        <select
          value={filters.sort || ''}
          onChange={(e) => handleSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="">ค่าเริ่มต้น</option>
          <option value="rating">คะแนนสูงสุด</option>
          <option value="name">ชื่อ (A → Z)</option>
          <option value="reviews">จำนวนรีวิว (มาก → น้อย)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>คะแนนขั้นต่ำ:</label>
        <select 
          value={filters.minRating || ''}
          onChange={(e) => handleRatingChange(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="4">4 ดาวขึ้นไป ⭐⭐⭐⭐</option>
          <option value="3">3 ดาวขึ้นไป ⭐⭐⭐</option>
          <option value="2">2 ดาวขึ้นไป ⭐⭐</option>
        </select>
      </div>

      <div className="filter-group">
        <label>ช่วงราคา:</label>
        <select 
          value={filters.priceRange || ''}
          onChange={(e) => handlePriceChange(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="1">฿ (ไม่เกิน 100)</option>
          <option value="2">฿฿ (100-300)</option>
          <option value="3">฿฿฿ (มากกว่า 300)</option>
        </select>
      </div>

      <div className="filter-group theme-group">
        <button className="theme-toggle-filter" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;