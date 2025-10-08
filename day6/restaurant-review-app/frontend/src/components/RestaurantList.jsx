import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import { getRestaurants } from '../services/api';

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: '',
    priceRange: '',
    sort: '' // '' | 'rating' | 'name' | 'reviews'
  });

  // 1. useEffect เพื่อ fetch ข้อมูลเมื่อ filters เปลี่ยน
  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 2. เรียก getRestaurants พร้อม filters
      // แยกการเรียก API กับการเรียงลำดับบน client:
      // - API จะรับ filters ที่เป็นเงื่อนไขการกรอง (search/category/minRating/priceRange)
      // - การเรียง (sort) จะทำที่ client เพื่อความรวดเร็ว (ข้อมูลไม่ใหญ่มาก)
      const { sort, ...apiFilters } = filters;
      const result = await getRestaurants(apiFilters);

      // 3. ตั้งค่า state (จาก API)
      let items = result.data || [];

      // 4. ถ้ามี sort ให้ทำ client-side sorting (rating/name/reviews)
      if (sort) {
        if (sort === 'rating') {
          items = items.slice().sort((a, b) => (parseFloat(b.averageRating) || 0) - (parseFloat(a.averageRating) || 0));
        } else if (sort === 'name') {
          items = items.slice().sort((a, b) => String(a.name).localeCompare(String(b.name)));
        } else if (sort === 'reviews') {
          items = items.slice().sort((a, b) => (parseInt(b.totalReviews, 10) || 0) - (parseInt(a.totalReviews, 10) || 0));
        }
      }

      setRestaurants(items);
      
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 4. handleSearch
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  // 5. handleFilterChange
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // เพิ่ม helper สำหรับล้าง filters ทั้งหมด (รวม sort)
  const clearFilters = () => {
    setFilters({ search: '', category: '', minRating: '', priceRange: '', sort: '' });
  };

  return (
    <div className="restaurant-list-container">
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} />
      
      {loading && <div className="loading">กำลังโหลด...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <>
          {restaurants.length === 0 ? (
            <p className="no-results">ไม่พบร้านอาหารที่ค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ</p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={onSelectRestaurant}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantList;