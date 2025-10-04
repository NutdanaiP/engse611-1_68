// middleware/validation.js
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    // ตรวจสอบ name
    if (!name) {
        errors.push('ต้องกรอกชื่อ');
    } else if (typeof name !== 'string') {
        errors.push('ชื่อต้องเป็น string');
    } else if (name.trim().length < 2) {
        errors.push('ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร');
    } else if (name.trim().length > 100) {
        errors.push('ชื่อต้องไม่เกิน 100 ตัวอักษร');
    }

    // ตรวจสอบ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('ต้องกรอกอีเมล');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('รูปแบบอีเมลไม่ถูกต้อง');
    }

    // ตรวจสอบ subject
    if (!subject) {
        errors.push('ต้องกรอกหัวข้อ');
    } else if (subject.trim().length < 5) {
        errors.push('หัวข้อต้องมีความยาวอย่างน้อย 5 ตัวอักษร');
    } else if (subject.trim().length > 200) {
        errors.push('หัวข้อต้องไม่เกิน 200 ตัวอักษร');
    }

    // ตรวจสอบ message
    if (!message) {
        errors.push('ต้องกรอกข้อความ');
    } else if (message.trim().length < 10) {
        errors.push('ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
    } else if (message.trim().length > 1000) {
        errors.push('ข้อความต้องไม่เกิน 1000 ตัวอักษร');
    }

    // ตรวจสอบ phone (optional)
    const phoneRegex = /^[0-9]{9,10}$/;
    if (phone && !phoneRegex.test(phone.trim())) {
        errors.push('เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก');
    }

    // ตรวจสอบ company (optional)
    if (company && company.trim().length > 100) {
        errors.push('ชื่อบริษัทต้องไม่เกิน 100 ตัวอักษร');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'การตรวจสอบข้อมูลล้มเหลว',
            errors: errors
        });
    }

    // Sanitize data
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim().toLowerCase();
    req.body.subject = req.body.subject.trim();
    req.body.message = req.body.message.trim();
    if (phone) req.body.phone = req.body.phone.trim();
    if (company) req.body.company = req.body.company.trim();

    next();
};

const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    // ตรวจสอบ rating
    const rateNum = parseInt(rating);
    if (!rating) {
        errors.push('ต้องกรอกคะแนน');
    } else if (isNaN(rateNum) || rateNum < 1 || rateNum > 5) {
        errors.push('คะแนนต้องเป็นตัวเลขระหว่าง 1-5');
    }

    // ตรวจสอบ comment
    if (!comment) {
        errors.push('ต้องกรอกความคิดเห็น');
    } else if (comment.trim().length < 5) {
        errors.push('ความคิดเห็นต้องมีความยาวอย่างน้อย 5 ตัวอักษร');
    } else if (comment.trim().length > 500) {
        errors.push('ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร');
    }

    // ตรวจสอบ email (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.trim())) {
        errors.push('รูปแบบอีเมลไม่ถูกต้อง');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'การตรวจสอบข้อมูลล้มเหลว',
            errors: errors
        });
    }

    // Sanitize data
    req.body.rating = rateNum;
    req.body.comment = req.body.comment.trim();
    if (email) req.body.email = req.body.email.trim().toLowerCase();

    next();
};

module.exports = {
    validateContact,
    validateFeedback
};