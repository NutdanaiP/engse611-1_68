const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// POST /api/contact - บันทึกข้อมูลติดต่อ
router.post('/', validateContact, async (req, res) => {
    try {
        const result = await appendToJsonFile('contacts.json', req.body);
        if (result) {
            res.status(201).json({
                success: true,
                message: 'บันทึกข้อมูลติดต่อสำเร็จ',
                data: result
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
            });
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดใน POST /api/contact:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์'
        });
    }
});

// GET /api/contact - ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
    try {
        const contacts = await readJsonFile('contacts.json');
        
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // คำนวณข้อมูลสำหรับหน้า
        const totalItems = contacts.length;
        const totalPages = Math.ceil(totalItems / limit);
        const paginatedContacts = contacts.slice(startIndex, endIndex);

        res.json({
            success: true,
            message: 'ดึงข้อมูลติดต่อสำเร็จ',
            data: paginatedContacts,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                limit: limit
            }
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดใน GET /api/contact:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
        });
    }
});

module.exports = router;