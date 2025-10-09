const API_URL = 'http://localhost:3000/api';

/**
 * ฟังก์ชันสำหรับดึงรายการร้านอาหารทั้งหมด พร้อม filtering
 * @param {Object} filters - ตัวกรอง { search, category, minRating, priceRange }
 * @returns {Promise} - ข้อมูลร้านอาหาร
 */
export const getRestaurants = async (filters = {}) => {
  try {
    // สร้าง query string จาก filters
    const queryParams = new URLSearchParams();
    if (filters.search !== undefined && filters.search !== null && String(filters.search).trim() !== '') {
      queryParams.append('search', String(filters.search).trim());
    }
    if (filters.category !== undefined && filters.category !== null && String(filters.category).trim() !== '') {
      queryParams.append('category', String(filters.category).trim());
    }
    if (filters.minRating !== undefined && filters.minRating !== null && String(filters.minRating).trim() !== '') {
      queryParams.append('minRating', String(filters.minRating));
    }
    if (filters.priceRange !== undefined && filters.priceRange !== null && String(filters.priceRange).trim() !== '') {
      queryParams.append('priceRange', String(filters.priceRange));
    }

    // สร้าง URL พร้อม query string
    const queryString = queryParams.toString();
    const url = `${API_URL}/restaurants${queryString ? `?${queryString}` : ''}`;

    // fetch ข้อมูล
    const response = await fetch(url);

    // ตรวจสอบ response
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    // แปลง response เป็น JSON และ return
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ฟังก์ชันสำหรับดึงข้อมูลร้านอาหารตาม ID พร้อมรีวิว
 * @param {number} id - รหัสร้าน
 * @returns {Promise} - ข้อมูลร้านและรีวิว
 */
export const getRestaurantById = async (id) => {
  try {
    // เติมโค้ดตามตัวอย่าง getRestaurants
    if (id === undefined || id === null) throw new Error('Missing id');
    const url = `${API_URL}/restaurants/${encodeURIComponent(id)}`;
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error((err && err.message) || 'Failed to fetch restaurant');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ฟังก์ชันสำหรับเพิ่มรีวิวใหม่
 * @param {Object} reviewData - ข้อมูลรีวิว
 * @returns {Promise} - ผลลัพธ์การเพิ่มรีวิว
 */
export const addReview = async (reviewData) => {
  try {
    // เขียน POST request
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    // ตรวจสอบ response
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message = (errorData && (errorData.message || (errorData.errors && errorData.errors.join(', ')))) || 'Failed to add review';
      throw new Error(message);
    }
    // return ข้อมูล JSON
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};