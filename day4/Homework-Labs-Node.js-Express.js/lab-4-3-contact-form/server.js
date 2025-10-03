const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs').promises;

// TODO: import routes
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
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

// TODO: ใช้ contactRoutes สำหรับ '/api/contact'
app.use('/api/contact', contactRoutes);
// TODO: ใช้ feedbackRoutes สำหรับ '/api/feedback'
app.use('/api/feedback', feedbackRoutes);

// TODO: สร้าง route GET /api/status
// ส่งสถานะของ API และจำนวนข้อมูลที่เก็บไว้
// API status
app.get('/api/status', async (req, res) => {
    try {
        // อ่านข้อมูล contacts และ feedback
        const contactsData = await fs.readFile(path.join(__dirname, 'data', 'contacts.json'), 'utf8');
        const feedbackData = await fs.readFile(path.join(__dirname, 'data', 'feedback.json'), 'utf8');
        
        const contacts = JSON.parse(contactsData);
        const feedback = JSON.parse(feedbackData);
        
        // API timestamp เขตเวลา GMT+7
        const date = new Date();
        const offset = 7 * 60; // GMT+7 ในหน่วยนาที
        const localDate = new Date(date.getTime() + offset * 60 * 1000);
        const timestamp = localDate.toISOString().replace();
        
        res.json({
            success: true,
            status: 'API is running',
            timestamp: timestamp,
            stats: {
                contactsCount: Array.isArray(contacts) ? contacts.length : 0,
                feedbackCount: Array.isArray(feedback) ? feedback.length : 0
            }
        });
    } catch (error) {
        console.error('Error reading data files:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving API status'
        });
    }
});

// API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Contact Form API Documentation',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': {
                description: 'Submit contact form',
                requiredFields: ['name', 'email', 'subject', 'message'],
                optionalFields: ['phone', 'company']
            },
            'GET /api/contact': {
                description: 'Get all contact submissions (admin)',
                parameters: {
                    page: 'Page number (default: 1)',
                    limit: 'Items per page (default: 10)'
                }
            },
            'POST /api/feedback': {
                description: 'Submit feedback',
                requiredFields: ['rating', 'comment'],
                optionalFields: ['email']
            },
            'GET /api/feedback/stats': {
                description: 'Get feedback statistics'
            }
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Contact Form API running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});