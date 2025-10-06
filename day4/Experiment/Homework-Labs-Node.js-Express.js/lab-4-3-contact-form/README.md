# Lab 4.3: รับข้อมูลจาก Form และบันทึกในไฟล์

## โครงสร้างโปรเจกต์
lab-4-3-contact-form/
├── package.json
├── README.md
├── server.js               ← ให้โครงสร้าง 70%
├── data/
│   ├── contacts.json       ← นักศึกษาสร้างเอง
│   └── feedback.json       ← นักศึกษาสร้างเอง
├── middleware/
│   ├── validation.js       ← ให้โครงสร้าง 70%
│   └── fileManager.js      ← ให้โครงสร้าง 70%
├── routes/
│   ├── contact.js          ← นักศึกษาสร้างเอง
│   └── feedback.js         ← นักศึกษาสร้างเอง
└── public/
    ├── index.html          ← ให้ HTML form
    ├── style.css           ← ให้ CSS พื้นฐาน
    └── script.js           ← ให้โครงสร้าง 70%

## วิธีติดตั้ง

1. เปิด terminal
- cd path/to/lab-4-3-contact-form

2. ติดตั้ง dependencies
- npm install

3. รัน server
- npm run dev

4. ทดสอบผ่าน Browser:
- เปิด http://localhost:3000
- กรอกฟอร์มทั้งสอง
- ทดสอบ validation แบบต่างๆ
- ใช้ปุ่ม API testing

5. ทดสอบด้วย curl:
# ทดสอบ Contact API
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ทดสอบ นามสกุล",
    "email": "test@email.com",
    "subject": "ทดสอบระบบ",
    "message": "นี่คือข้อความทดสอบระบบ"
  }'

# ทดสอบ Feedback API
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "ระบบใช้งานง่ายมาก"
  }'

# ดูข้อมูลที่บันทึก
curl http://localhost:3000/api/contact
curl http://localhost:3000/api/feedback/stats