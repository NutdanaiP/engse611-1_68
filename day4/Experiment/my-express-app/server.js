const express = require('express');
const app = express();
const PORT = 3000;

// สร้าง Route สำหรับหน้าแรก
app.get('/', (req, res) => {
    res.send('<h1>🎉 สวัสดี Express.js!</h1>');
});

app.get('/', (req, res) => {
    res.send('<h1>เกี่นวกับเรา</h1>');
});


app.get('/users/:id', (req, res) => {
    const userId = req.params.id; // ดึงค่า id จาก URL
    res.send(`ดูข้อมูลผู้ใช้ ID: ${userId}`);
});

app.get('/search', (req, res) => {
    const keyword = req.query.q;      // 'react'
    const page = req.query.page;    // '1'
    res.send(`ค้นหาด้วยคำว่า: ${keyword} ที่หน้า ${page}`);
});

// เริ่มต้นให้เซิร์ฟเวอร์ทำงาน
app.listen(PORT, () => {
    console.log(`🚀 Server is running...`);
});