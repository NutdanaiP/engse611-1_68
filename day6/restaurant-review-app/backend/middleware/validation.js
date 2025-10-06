/**
 * ฟังก์ชันช่วยตรวจสอบอักขระพิเศษที่อันตราย
 */
const hasDangerousCharacters = (str) => {
  const dangerousPatterns = /<script|<iframe|javascript:|onerror=|onclick=/i;
  return dangerousPatterns.test(str);
};

/**
 * Middleware สำหรับตรวจสอบข้อมูลรีวิวก่อนบันทึก
 */
const validateReview = (req, res, next) => {
  const { restaurantId, userName, rating, comment } = req.body;
  const errors = [];
  
  // ========================================
  // ตัวอย่างที่ให้: ตรวจสอบ restaurantId (ครบ 100%)
  // ========================================
  if (!restaurantId) {
    errors.push('กรุณาระบุรหัสร้านอาหาร');
  } else if (isNaN(parseInt(restaurantId))) {
    errors.push('รหัสร้านต้องเป็นตัวเลข');
  } else if (parseInt(restaurantId) <= 0) {
    errors.push('รหัสร้านต้องมากกว่า 0');
  }
  
  // ========================================
  // TODO 1: ตรวจสอบ userName
  // ========================================
  // เงื่อนไข:
  // - ต้องมีค่า (ไม่ว่างเปล่า)
  // - ความยาว 2-50 ตัวอักษร (หลัง trim())
  // - ไม่มีอักขระพิเศษที่อันตราย (ใช้ hasDangerousCharacters)
  //
  // ตัวอย่าง error messages:
  // - 'กรุณากรอกชื่อ'
  // - 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'
  // - 'ชื่อต้องไม่เกิน 50 ตัวอักษร'
  // - 'ชื่อมีอักขระที่ไม่อนุญาต'
  //
  // คำใบ้:
  // if (!userName || !userName.trim()) {
  //   errors.push('กรุณากรอกชื่อ');
  // } else if (userName.trim().length < 2) {
  //   errors.push('ชื่อต้องมีอย่างน้อย 2 ตัวอักษร');
  // } ...
  
  // ========================================
  // TODO 2: ตรวจสอบ rating
  // ========================================
  // เงื่อนไข:
  // - ต้องมีค่า
  // - ต้องเป็นตัวเลข
  // - ต้องอยู่ระหว่าง 1-5
  //
  // คำใบ้:
  // const ratingNum = parseInt(rating);
  // if (!rating) {
  //   errors.push('กรุณาเลือกคะแนน');
  // } else if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
  //   errors.push('คะแนนต้องอยู่ระหว่าง 1-5');
  // }
  
  // ========================================
  // TODO 3: ตรวจสอบ comment
  // ========================================
  // เงื่อนไข:
  // - ต้องมีค่า
  // - ความยาว 10-500 ตัวอักษร (หลัง trim())
  // - ไม่มีอักขระพิเศษที่อันตราย
  //
  // ตัวอย่าง error messages:
  // - 'กรุณากรอกความคิดเห็น'
  // - 'ความคิดเห็นต้องมีอย่างน้อย 10 ตัวอักษร'
  // - 'ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร'
  // - 'ความคิดเห็นมีอักขระที่ไม่อนุญาต'
  
  // ตรวจสอบว่ามี error หรือไม่
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'ข้อมูลไม่ถูกต้อง',
      errors: errors
    });
  }
  
  next();
};

module.exports = {
  validateReview
};