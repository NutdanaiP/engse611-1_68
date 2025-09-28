const express = require('express');
const app = express();

// Middleware 1: Logger
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString('th-TH');
    console.log(`📅 ${timestamp} - ${req.method} ${req.url}`);
    next(); // สำคัญมาก! ต้องเรียก next()
});

// Middleware 2: ตรวจสอบเวลา
app.use((req, res, next) => {
    const hour = new Date().getHours();
    req.timeOfDay = hour < 12 ? 'เช้า' : hour < 18 ? 'บ่าย' : 'เย็น';
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send(`<h1>สวัสดี${req.timeOfDay}! 👋</h1>`);
});

app.get('/time', (req, res) => {
    res.send(`<h1>ตอนนี้เป็นช่วง${req.timeOfDay}</h1>`);
});

app.listen(3000, () => {
    console.log('🚀 Server: http://localhost:3000');
});

