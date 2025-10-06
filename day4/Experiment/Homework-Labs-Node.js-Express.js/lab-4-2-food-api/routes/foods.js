const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();

        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;
        
        // TODO: เพิ่ม query parameters สำหรับ filtering:
        // - search: ค้นหาจากชื่อหรือคำอธิบาย
        if (search) {
            const s = search.toLowerCase();
            foods = foods.filter(f => 
                f.name.toLowerCase().includes(s) ||
                (f.description && f.description.toLowerCase().includes(s))
            );
        }        
        // - category: กรองตามประเภทอาหาร
        if (category) {
            foods = foods.filter(f => f.category.toLowerCase() === category.toLowerCase());
        }        
        // - maxSpicy: กรองระดับความเผ็ดไม่เกินที่กำหนด
        if (maxSpicy) {
            const spicyLevel = parseInt(maxSpicy, 10);
            if (!isNaN(spicyLevel)) {
                foods = foods.filter(f => f.spicyLevel !== undefined && f.spicyLevel <= spicyLevel);
            }
        }        
        // - vegetarian: กรองอาหารมังสวิรัติ (true/false)
        if (vegetarian) {
            const veg = vegetarian.toLowerCase() === 'true';
            foods = foods.filter(f => f.vegetarian === veg);
        }        
        // - available: กรองอาหารที่พร้อมเสิร์ฟ (true/false)
        if (available) {
            const avail = available.toLowerCase() === 'true';
            foods = foods.filter(f => f.available === avail);
        }        
        // - maxPrice: กรองราคาไม่เกินที่กำหนด
        if (maxPrice) {
            const price = parseFloat(maxPrice);
            if (!isNaN(price)) {
                foods = foods.filter(f => f.price !== undefined && f.price <= price);
            }
        }        
        
        // TODO: ทำ filtering logic ตาม query parameters
        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// TODO: GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const food = foods.find(f => f.id === parseInt(req.params.id));

    if (!food) {
        return res.status(404).json({ success: false, message: 'Food not found' });
    }

    res.json({ success: true, data: food });
});

// TODO: GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const category = req.params.category.toLowerCase();

    const filtered = foods.filter(f => f.category.toLowerCase() === category);

    if (filtered.length === 0) {
        return res.status(404).json({ success: false, message: 'No foods found in this category' });
    }

    res.json({ success: true, total: filtered.length, data: filtered });
});

// TODO: GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
    const foods = loadFoods();

    if (foods.length === 0) {
        return res.status(404).json({ success: false, message: 'No foods available' });
    }

    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    res.json({ success: true, data: randomFood });
});

module.exports = router;