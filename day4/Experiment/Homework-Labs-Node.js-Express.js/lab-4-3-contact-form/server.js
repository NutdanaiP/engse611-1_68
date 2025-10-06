const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

// import routes
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');
const { getFileStats } = require('./middleware/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: 'ส่งคำขอมากเกินไป โปรดลองใหม่ภายหลัง'
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Apply rate limiting to API routes
app.use('/api', limiter);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ใช้ contactRoutes และ feedbackRoutes
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

// GET /api/status - ส่งสถานะ API และจำนวนข้อมูล
app.get('/api/status', async (req, res) => {
    try {
        const stats = await getFileStats();
        res.json({
            success: true,
            message: 'API กำลังทำงานปกติ',
            timestamp: new Date().toISOString(),
            stats: {
                contacts: stats.contacts,
                feedback: stats.feedback
            }
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดใน GET /api/status:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงสถานะ API'
        });
    }
});

// API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'เอกสาร Contact Form API',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': {
                description: 'ส่งฟอร์มติดต่อ',
                requiredFields: ['name', 'email', 'subject', 'message'],
                optionalFields: ['phone', 'company']
            },
            'GET /api/contact': {
                description: 'ดึงข้อมูลการติดต่อทั้งหมด (สำหรับผู้ดูแล)',
                parameters: {
                    page: 'หมายเลขหน้า (ค่าเริ่มต้น: 1)',
                    limit: 'จำนวนรายการต่อหน้า (ค่าเริ่มต้น: 10)'
                }
            },
            'POST /api/feedback': {
                description: 'ส่งความคิดเห็น',
                requiredFields: ['rating', 'comment'],
                optionalFields: ['email']
            },
            'GET /api/feedback/stats': {
                description: 'ดึงสถิติความคิดเห็น'
            },
            'GET /api/status': {
                description: 'ดึงสถานะ API และจำนวนข้อมูล'
            }
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'ไม่พบ endpoint ที่ร้องขอ'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Contact Form API รันอยู่ที่ http://localhost:${PORT}`);
    console.log(`📖 เอกสาร API: http://localhost:${PORT}/api/docs`);
});