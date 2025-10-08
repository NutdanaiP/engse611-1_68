const express = require('express');
const router = express.Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileManager');
const { validateReview } = require('../middleware/validation');

// ========================================
// GET /api/reviews/:restaurantId - ดึงรีวิวทั้งหมดของร้านนั้น
// คำอธิบาย:
// อ่านไฟล์ reviews.json
// กรองเฉพาะรีวิวที่มี restaurantId ตรงกับพารามิเตอร์
// แปลงค่า restaurantId เป็นตัวเลขด้วย parseInt เพื่อให้เปรียบเทียบตรงกัน
// เรียงรีวิวจากใหม่ -> เก่า (ใช้ createdAt)
// คืนค่ารายการรีวิวและจำนวนทั้งหมด
// ========================================
router.get('/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await readJsonFile('reviews.json');

    // แปลงพารามิเตอร์เป็นตัวเลขเพื่อเปรียบเทียบอย่างมั่นใจ
    const restaurantIdNum = parseInt(restaurantId, 10);

    // กรองรีวิวเฉพาะร้านนี้ (กรณีไฟล์ว่างจะได้ [])
    const restaurantReviews = (reviews || []).filter(r => parseInt(r.restaurantId, 10) === restaurantIdNum);

    // เรียงจากใหม่สุดไปหาเก่าสุด (createdAt เป็น ISO timestamp)
    restaurantReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // ตอบกลับผลลัพธ์ (frontend จะได้ array ของรีวิวและจำนวนรวม)
    res.json({
      success: true,
      data: restaurantReviews,
      total: restaurantReviews.length
    });
  } catch (error) {
    // log ข้อผิดพลาดเชิงเทคนิคไว้ที่ console เพื่อดีบัก
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงรีวิว'
    });
  }
});

// ========================================
// POST /api/reviews - เพิ่มรีวิวใหม่
// อธิบายการทำงาน:
// validateReview middleware ได้ตรวจความถูกต้องของ payload แล้ว (ชื่อ, rating, comment)
// อ่าน reviews.json และ restaurants.json ปัจจุบัน
// ตรวจสอบว่า restaurantId มีอยู่จริงในรายการร้าน
// สร้างวัตถุรีวิวใหม่ (กำหนด id ด้วย Date.now(), บันทึก createdAt)
// เพิ่มรีวิวเข้าไฟล์ reviews.json และเขียนกลับไป
// คำนวณ averageRating ใหม่ของร้านนั้น และอัพเดท restaurants.json
// ตอบกลับข้อมูลรีวิวใหม่และสรุปสถานะของร้าน (averageRating, totalReviews)
// หมายเหตุสำคัญ:
// - ใช้ parseInt/parseFloat ในการแปลงชนิดข้อมูลก่อนคำนวณ
// - visitDate ถ้าไม่ถูกส่งเข้ามาจะใช้วันที่ปัจจุบัน (YYYY-MM-DD)
// - การคำนวณ averageRating จะปัดทศนิยม 1 ตำแหน่งก่อนเก็บ
// ========================================
router.post('/', validateReview, async (req, res) => {
  try {
    const { restaurantId, userName, rating, comment, visitDate } = req.body;

    // อ่านข้อมูลปัจจุบันจากไฟล์ (helpers คืน [] หากไฟล์ว่างหรือไม่พบ)
    const reviews = await readJsonFile('reviews.json');
    const restaurants = await readJsonFile('restaurants.json');

    // ตรวจสอบว่า restaurant ID มีอยู่จริงไหม (แปลงเป็นตัวเลขก่อนเทียบ)
    const restaurant = (restaurants || []).find(r => r.id === parseInt(restaurantId, 10));
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบร้านอาหารนี้'
      });
    }

    // สร้างอ็อบเจ็กต์รีวิวใหม่
    // id ใช้ Date.now() เพื่อให้ได้ค่า unique แบบง่ายๆ
    // restaurantId, rating แปลงเป็นตัวเลข
    // userName/comment ตัดช่องว่างข้างหน้าข้างหลัง
    // visitDate ถ้าไม่ส่งมาให้ใช้วันที่ปัจจุบัน (รูปแบบ YYYY-MM-DD)
    const newReview = {
      id: Date.now(),
      restaurantId: parseInt(restaurantId, 10),
      userName: String(userName).trim(),
      rating: parseInt(rating, 10),
      comment: comment ? String(comment).trim() : '',
      visitDate: visitDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    // เพิ่มรีวิวเข้าไปในอาเรย์และบันทึกไฟล์
    reviews.push(newReview);
    await writeJsonFile('reviews.json', reviews);

    // คำนวณสรุปสถิติของร้านจากรีวิวทั้งหมดที่มี (รวมถึงรีวิวที่เพิ่งเพิ่ม)
    const restaurantReviews = reviews.filter(r => parseInt(r.restaurantId, 10) === parseInt(restaurantId, 10));
    const totalRating = restaurantReviews.reduce((sum, r) => sum + (parseInt(r.rating, 10) || 0), 0);
    const newAverageRating = restaurantReviews.length === 0 ? 0 : totalRating / restaurantReviews.length;

    // หา index ของร้านในอาเรย์ restaurants เพื่ออัพเดทค่า
    const restaurantIndex = restaurants.findIndex(r => r.id === parseInt(restaurantId, 10));
    if (restaurantIndex !== -1) {
      // ปัดทศนิยม 1 ตำแหน่งก่อนเก็บ (เช่น 4.25 -> 4.3)
      restaurants[restaurantIndex].averageRating = Math.round(newAverageRating * 10) / 10;
      restaurants[restaurantIndex].totalReviews = restaurantReviews.length;
      await writeJsonFile('restaurants.json', restaurants);
    }

    // ส่งผลลัพธ์กลับให้ client (frontend) พร้อมรายละเอียดรีวิวใหม่และสรุปสถานะร้าน
    res.status(201).json({
      success: true,
      message: 'เพิ่มรีวิวสำเร็จ',
      data: newReview,
      restaurant: {
        id: restaurants[restaurantIndex].id,
        name: restaurants[restaurantIndex].name,
        averageRating: restaurants[restaurantIndex].averageRating,
        totalReviews: restaurants[restaurantIndex].totalReviews
      }
    });
  } catch (error) {
    // บันทึกข้อผิดพลาดและตอบกลับเป็น 500
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเพิ่มรีวิว'
    });
  }
});

module.exports = router;