const express = require('express');
const cors = require('cors');
const path = require('path');

// TODO: import foodRoutes จาก './routes/foods'
const foodRoutes = require('./routes/foods');
// TODO: import logger middleware จาก './middleware/logger'
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// TODO: ใช้ logger middleware
app.use(logger);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs'
        }
    });
});

// TODO: ใช้ foodRoutes สำหรับ '/api/foods'
app.use('/api/foods', foodRoutes);

// TODO: สร้าง route GET /api/docs
// ส่งข้อมูล API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        success: true,
        message: 'Food API Documentation',
        version: '1.0.0',
        endpoints: {
            listFoods: {
                method: 'GET',
                url: '/api/foods',
                query: {
                    search: 'ค้นหาจากชื่อ/คำอธิบาย',
                    category: 'กรองตามประเภท',
                    maxSpicy: 'กรองระดับความเผ็ด (ตัวเลข)',
                    vegetarian: 'true/false',
                    available: 'true/false',
                    maxPrice: 'ราคาสูงสุด'
                }
            },
            foodById: {
                method: 'GET',
                url: '/api/foods/:id'
            },
            foodsByCategory: {
                method: 'GET',
                url: '/api/foods/category/:category'
            },
            randomFood: {
                method: 'GET',
                url: '/api/foods/random'
            },
            stats: {
                method: 'GET',
                url: '/api/stats'
            }
        }
    });
});

// TODO: สร้าง route GET /api/stats  
// ส่งสถิติต่างๆ เช่น จำนวนเมนูทั้งหมด, จำนวนแต่ละหมวด, etc.
app.get('/api/stats', (req, res) => {
    try {
        const foods = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/foods.json'), 'utf8'));

        // รวมสถิติ
        const totalFoods = foods.length;

        const categories = {};
        foods.forEach(f => {
            categories[f.category] = (categories[f.category] || 0) + 1;
        });

        const avgPrice = foods.reduce((sum, f) => sum + f.price, 0) / totalFoods;

        const spicyLevels = {};
        foods.forEach(f => {
            spicyLevels[f.spicyLevel] = (spicyLevels[f.spicyLevel] || 0) + 1;
        });

        const stats = {
            totalFoods,
            categories,
            averagePrice: avgPrice.toFixed(2),
            spicyLevels,
            vegetarian: foods.filter(f => f.vegetarian).length,
            available: foods.filter(f => f.available).length
        };

        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error calculating stats' });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});