const express = require('express');
const router = express.Router();
const { validateFeedback } = require('../middleware/validation');
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');

// POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
    try {
        const result = await appendToJsonFile('feedback.json', req.body);
        if (result) {
            res.status(201).json({
                success: true,
                message: 'บันทึกความคิดเห็นสำเร็จ',
                data: result
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'เกิดข้อผิดพลาดในการบันทึกความคิดเห็น'
            });
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดใน POST /api/feedback:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์'
        });
    }
});

// GET /api/feedback/stats - ดึงสถิติความคิดเห็น
router.get('/stats', async (req, res) => {
    try {
        const feedback = await readJsonFile('feedback.json');
        
        // คำนวณสถิติ
        const totalFeedback = feedback.length;
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        
        feedback.forEach(item => {
            if (item.rating >= 1 && item.rating <= 5) {
                ratingDistribution[item.rating]++;
            }
        });

        res.json({
            success: true,
            message: 'ดึงสถิติความคิดเห็นสำเร็จ',
            stats: {
                totalFeedback,
                ratingDistribution
            }
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดใน GET /api/feedback/stats:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
        });
    }
});

module.exports = router;