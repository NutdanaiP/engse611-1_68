const express = require('express');
const router = express.Router();
const { readJsonFile } = require('../utils/fileManager');

// ========================================
// GET /api/restaurants - ดึงรายการร้านทั้งหมด (พร้อม filtering)
// ========================================
router.get('/', async (req, res) => {
  try {
    let restaurants = await readJsonFile('restaurants.json');
    const { search, category, minRating, priceRange } = req.query;
    
    // TODO 1: กรองตามชื่อ (search)
    if (search) {
      const searchLower = String(search).toLowerCase();
      restaurants = restaurants.filter(r =>
        (r.name && r.name.toLowerCase().includes(searchLower)) ||
        (r.description && r.description.toLowerCase().includes(searchLower))
      );
    }

    // TODO 2: กรองตามหมวดหมู่ (category)
    if (category) {
      const cat = String(category).toLowerCase();
      restaurants = restaurants.filter(r => r.category && r.category.toLowerCase() === cat);
    }

    // TODO 3: กรองตาม rating ขั้นต่ำ (minRating)
    if (minRating) {
      const min = parseFloat(minRating);
      if (!isNaN(min)) {
        restaurants = restaurants.filter(r => (parseFloat(r.averageRating) || 0) >= min);
      }
    }

    // TODO 4: กรองตามช่วงราคา (priceRange)
    if (priceRange) {
      const pr = parseInt(priceRange, 10);
      if (!isNaN(pr)) {
        restaurants = restaurants.filter(r => parseInt(r.priceRange, 10) === pr);
      }
    }
    
    // ตอบกลับผลลัพธ์ของการค้นหา/กรอง
    // รูปแบบการตอบกลับ
    res.json({
      success: true,
      data: restaurants,                   // อาเรย์ร้านที่ผ่านการกรอง
      total: restaurants.length,           // จำนวนรายการที่ตอบกลับ
      filters: {                           // ค่าพารามิเตอร์ที่ใช้กรอง (หรือ null) คอมเมนต์นี้ช่วยให้ frontend รู้ว่าจะได้รับข้อมูลอะไรเพื่อนำไปแสดงหรือทำ paging/summary
        search: search || null,
        category: category || null,
        minRating: minRating || null,
        priceRange: priceRange || null
      }
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน'
    });
  }
});

// ========================================
// GET /api/restaurants/:id - ดึงข้อมูลร้านตาม ID พร้อมรีวิว
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // อ่านไฟล์ restaurants และ reviews
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');

    const restaurant = (restaurants || []).find(r => String(r.id) === String(id) || r.id === parseInt(id, 10));
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'ไม่พบร้านอาหารนี้' });
    }

    const restaurantId = parseInt(id, 10);
    const restaurantReviews = (reviews || []).filter(rv => parseInt(rv.restaurantId, 10) === restaurantId);

    // เรียงรีวิวจากใหม่สุดไปหาเก่าสุด
    restaurantReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: {
        ...restaurant,
        reviews: restaurantReviews
      }
    });
    
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน'
    });
  }
});

module.exports = router;