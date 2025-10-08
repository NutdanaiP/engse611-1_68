/**
 * ฟังก์ชันช่วยตรวจสอบอักขระ/แพทเทิร์นที่อาจเป็นอันตราย
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
    // parseInt จะคืน NaN ถ้าไม่สามารถแปลงเป็นตัวเลขได้
    errors.push('รหัสร้านต้องเป็นตัวเลข');
  } else if (parseInt(restaurantId) <= 0) {
    errors.push('รหัสร้านต้องมากกว่า 0');
  }

  // ----------------------------------------
  // TODO 1: ตรวจสอบ userName
  // ต้องไม่ว่าง (หลัง trim)
  // ความยาว 2-50 ตัวอักษร
  // ไม่ควรมีแพทเทิร์นที่อาจเป็นอันตราย
  // ----------------------------------------
  if (!userName || !String(userName).trim()) {
    errors.push('กรุณากรอกชื่อ');
  } else {
    const nameTrim = String(userName).trim();
    if (nameTrim.length < 2) {
      errors.push('ชื่อต้องมีอย่างน้อย 2 ตัวอักษร');
    } else if (nameTrim.length > 50) {
      errors.push('ชื่อต้องไม่เกิน 50 ตัวอักษร');
    } else if (hasDangerousCharacters(nameTrim)) {
      // ถ้าพบแพทเทิร์นอันตราย ให้แจ้งเตือนและไม่อนุญาต
      errors.push('ชื่อมีอักขระที่ไม่อนุญาต');
    }
  }

  // ----------------------------------------
  // TODO 2: ตรวจสอบ rating
  // - ต้องระบุ (ไม่เป็น undefined/null/empty string)
  // - ต้องเป็นตัวเลขเต็ม และอยู่ในช่วง 1-5
  // ----------------------------------------
  if (rating === undefined || rating === null || String(rating).trim() === '') {
    // เช็คทั้ง undefined, null และสตริงว่าง (กรณีส่งจากฟอร์ม)
    errors.push('กรุณาเลือกคะแนน');
  } else {
    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      errors.push('คะแนนต้องอยู่ระหว่าง 1-5');
    }
  }

  // ----------------------------------------
  // TODO 3: ตรวจสอบ comment
  // - ต้องไม่ว่าง (หลัง trim)
  // - ความยาว 10-500 ตัวอักษร
  // - ห้ามมีแพทเทิร์นที่อันตราย
  // ----------------------------------------
  if (!comment || !String(comment).trim()) {
    errors.push('กรุณากรอกความคิดเห็น');
  } else {
    const commentTrim = String(comment).trim();
    if (commentTrim.length < 10) {
      errors.push('ความคิดเห็นต้องมีอย่างน้อย 10 ตัวอักษร');
    } else if (commentTrim.length > 500) {
      errors.push('ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร');
    } else if (hasDangerousCharacters(commentTrim)) {
      errors.push('ความคิดเห็นมีอักขระที่ไม่อนุญาต');
    }
  }

  // ----------------------------------------
  // ตรวจสอบว่ามี error หรือไม่ ถ้ามี error ให้ตอบกลับทันที (400 Bad Request)
  // ----------------------------------------
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'ข้อมูลไม่ถูกต้อง',
      errors: errors
    });
  }

  // ถ้าผ่านทุกข้อ ให้ไปยัง handler ถัดไป
  next();
};

module.exports = {
  validateReview
};