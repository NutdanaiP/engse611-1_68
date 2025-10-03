# Lab 4.2: ทำ API ส่งข้อมูลรายการอาหาร

## โครงสร้างโปรเจกต์
lab-4-2-food-api/
├── package.json
├── README.md
├── server.js               ← ให้โครงสร้าง 70%
├── data/
│   └── foods.json          ← ให้ข้อมูลตัวอย่าง
├── routes/
│   └── foods.js           ← ให้โครงสร้าง 70%
├── middleware/
│   └── logger.js          ← นักศึกษาสร้างเอง
└── public/
    └── index.html         ← ให้ HTML พื้นฐาน

## วิธีติดตั้ง

1. เปิด terminal
- cd path/to/lab-4-2-food-api

2. ติดตั้ง dependencies
- npm install

3. รัน server
- npx nodemon server.js

4. เปิดเบราว์เซอร์ที่
- http://localhost:3000

*** ทดสอบทุก endpoints หน้าเบราว์เซอร์***

## วิธีทดสอบ ทดสอบผ่าน Browser และ curl
1. ทดสอบผ่าน Browser เช่น
- http://localhost:3000
- http://localhost:3000/api/foods
- http://localhost:3000/api/foods/2
- http://localhost:3000/api/docs
- http://localhost:3000/api/stats

2. ทดสอบผ่าน curl (ใน Terminal)
- curl http://localhost:3000/api/foods
- curl http://localhost:3000/api/foods?category=แกง&maxSpicy=3"
- curl http://localhost:3000/api/foods/2
- curl http://localhost:3000/api/foods/random
- curl http://localhost:3000/api/docs
- curl http://localhost:3000/api/stats

