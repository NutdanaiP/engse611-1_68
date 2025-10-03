// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ name
    // - ต้องมีค่า
    // - ต้องเป็น string
    // - ความยาวอย่างน้อย 2 ตัวอักษร
    // - ไม่เกิน 100 ตัวอักษร
    if (!name) {
        errors.push('Name is required');
    } else if (typeof name !== 'string') {
        errors.push('Name must be a string');
    } else if (name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    } else if (name.trim().length > 100) {
        errors.push('Name must not exceed 100 characters');
    } 
    
    // TODO: ตรวจสอบ email
    // - ต้องมีค่า  
    // - ต้องเป็น email format ที่ถูกต้อง
    // - ใช้ regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }  
    
    // TODO: ตรวจสอบ subject
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 5 ตัวอักษร
    // - ไม่เกิน 200 ตัวอักษร
    if (!subject) {
        errors.push('Subject is required');
    } else if (subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    } else if (subject.trim().length > 200) {
        errors.push('Subject must not exceed 200 characters');
    }  
    
    // TODO: ตรวจสอบ message
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 10 ตัวอักษร
    // - ไม่เกิน 1000 ตัวอักษร
    if (!message) {
        errors.push('Message is required');
    } else if (message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    } else if (message.trim().length > 1000) {
        errors.push('Message must not exceed 1000 characters');
    }  
    
    // TODO: ตรวจสอบ phone (optional)
    // - ถ้ามีค่า ต้องเป็นเบอร์โทรที่ถูกต้อง
    // - ใช้ regex: /^[0-9]{9,10}$/
    const phoneRegex = /^[0-9]{9,10}$/;
    if (phone && !phoneRegex.test(phone.trim())) {
        errors.push('Invalid phone number format (9-10 digits required)');
    }   
    
    // TODO: ตรวจสอบ company (optional)
    // - ถ้ามีค่า ต้องไม่เกิน 100 ตัวอักษร
    if (company && company.trim().length > 100) {
        errors.push('Company name must not exceed 100 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
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

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];
    
    // TODO: ตรวจสอบ rating
    // - ต้องมีค่า
    // - ต้องเป็นตัวเลข 1-5
    if (rating === undefined || rating === null) {
        errors.push('Rating is required');
    } else if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        errors.push('Rating must be an integer between 1 and 5');
    }   
    
    // TODO: ตรวจสอบ comment
    // - ต้องมีค่า
    // - ความยาวอย่างน้อย 5 ตัวอักษร
    // - ไม่เกิน 500 ตัวอักษร
    if (!comment) {
        errors.push('Comment is required');
    } else if (comment.trim().length < 5) {
        errors.push('Comment must be at least 5 characters long');
    } else if (comment.trim().length > 500) {
        errors.push('Comment must not exceed 500 characters');
    }
    
    // TODO: ตรวจสอบ email (optional)
    // - ถ้ามีค่า ต้องเป็น email format ที่ถูกต้อง
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    req.body.comment = req.body.comment.trim();
    if (email) req.body.email = req.body.email.trim().toLowerCase();

    next();
};

module.exports = {
    validateContact,
    validateFeedback
};