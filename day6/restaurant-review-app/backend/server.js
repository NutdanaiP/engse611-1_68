const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Routes แยกไฟล์สำหรับจัดการ restaurants และ reviews
const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');

// ฟังก์ชันช่วยอ่านไฟล์ JSON (backend/utils/fileManager.js)
const { readJsonFile } = require('./utils/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - ข้อมูลพื้นฐานของ API
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Restaurant Review API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

// ลงทะเบียน routes ย่อย
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// GET /api/stats - ดึงสถิติทั้งหมดของระบบ
app.get('/api/stats', async (req, res) => {
  try {
    // อ่านข้อมูลจากไฟล์ JSON (helpers จะคืนค่า [] หากไฟล์ไม่พบหรือมีปัญหา)
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');

    // จำนวนร้านทั้งหมด และจำนวนรีวิวทั้งหมด
    const totalRestaurants = Array.isArray(restaurants) ? restaurants.length : 0;
    const totalReviews = Array.isArray(reviews) ? reviews.length : 0;

    // จัดกลุ่มรีวิวตาม restaurantId ให้ค้นหาได้รวดเร็ว
    // reviewsByRestaurant จะมีรูปแบบ: { [restaurantId]: [review, review, ...] }
    const reviewsByRestaurant = {};
    if (Array.isArray(reviews)) {
      reviews.forEach(r => {
        const rid = r.restaurantId;
        if (!reviewsByRestaurant[rid]) reviewsByRestaurant[rid] = [];
        reviewsByRestaurant[rid].push(r);
      });
    }

    // คำนวณ average rating ของแต่ละร้าน แล้วรวมค่าเฉลี่ยเหล่านี้เพื่อหา averageRating ของระบบ
    // sumOfRestaurantAverages ใช้เก็บผลรวมของค่าเฉลี่ยร้าน (ปัดทศนิยม 1 ตำแหน่งก่อนนำไปรวม)
    let sumOfRestaurantAverages = 0;

    const restaurantsWithStats = (Array.isArray(restaurants) ? restaurants : []).map(r => {
      // หารีวิวของร้านนี้ ถ้าไม่มีจะได้ []
      const rReviews = reviewsByRestaurant[r.id] || [];
      const count = rReviews.length;

      // คำนวณค่าเฉลี่ยของร้าน (หากไม่มีรีวิวให้เป็น 0)
      const avg = count === 0 ? 0 : (rReviews.reduce((s, it) => s + (parseFloat(it.rating) || 0), 0) / count);
      const avgRounded = Math.round(avg * 10) / 10; // ปัดทศนิยม 1 ตำแหน่ง

      // เติมเข้าไปเพื่อใช้คำนวณค่าเฉลี่ยรวมของระบบ
      sumOfRestaurantAverages += avgRounded;

      // คืนข้อมูลสรุปสำหรับแต่ละร้าน (ไม่แก้ไขข้อมูลต้นฉบับ)
      return {
        id: r.id,
        name: r.name,
        averageRating: avgRounded,
        totalReviews: count
      };
    });

    // ค่าเฉลี่ยของคะแนนร้านทั้งหมด (ถ้าไม่มีร้านให้เป็น 0)
    const averageRating = totalRestaurants === 0 ? 0 : Math.round((sumOfRestaurantAverages / totalRestaurants) * 10) / 10;

    // topRatedRestaurants: ร้าน 5 อันดับแรกที่มี rating สูงสุด
    // ถ้า averageRating เท่ากันจะใช้ totalReviews เป็นตัวตัดสิน (ร้านที่มีรีวิวมากกว่ามีลำดับดีกว่า)
    const topRatedRestaurants = restaurantsWithStats
      .slice()
      .sort((a, b) => {
        if (b.averageRating !== a.averageRating) return b.averageRating - a.averageRating;
        return b.totalReviews - a.totalReviews;
      })
      .slice(0, 5);

    // ส่งข้อมูลกลับในรูปแบบ: { success: true, data: {...} }
    res.json({
      success: true,
      data: {
        totalRestaurants,
        totalReviews,
        averageRating,
        topRatedRestaurants
      }
    });

  } catch (error) {
    // จับข้อผิดพลาดและส่งข้อความที่เข้าใจได้ (log รายละเอียดไว้ที่ console)
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
    });
  }
});

// 404 Handler - ไม่พบ endpoint
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error Handler - จัดการข้อผิดพลาดของ Express
// ในโหมด development จะส่ง error.message กลับให้ด้วย เพื่อช่วย debug
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});