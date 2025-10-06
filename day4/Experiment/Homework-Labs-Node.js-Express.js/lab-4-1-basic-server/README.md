# Lab 4.1: Basic Server (HTTP vs Express)

## โครงสร้างโปรเจกต์
lab-4-1-basic-server/
├── package.json
├── README.md
├── http-server.js          ← ให้โครงสร้าง 70%
├── express-server.js       ← ให้โครงสร้าง 70%
└── comparison.md           ← นักศึกษาเขียนเอง

*** HTTP Server ***

## วิธีติดตั้ง
- npm install

## วิธีรัน HTTP Server
1. รัน HTTP Server
- npm run start:http
- npm run dev:http      (nodemon)

*** Server จะทำงานที่ ***
- http://localhost:3000

---------------------------------------------------

*** Express Server ***

## วิธีติดตั้ง
- npm init -y
- npm install express
- npm install --save-dev nodemon

## วิธีรัน Express Server
1. รัน HTTP Server
- npm run start:express
- npm run dev:express      (nodemon)

*** Server จะทำงานที่ ***
- http://localhost:3001

---------------------------------------------------

*** Endpoints ที่สามารถทดสอบได้ ***
HTTP Server (http://localhost:3000)
- GET / -> ข้อความต้อนรับและรายการ endpoints
- GET /students -> รายชื่อนักศึกษาทั้งหมด
- GET /students/:id -> ข้อมูลนักศึกษาตาม ID (เช่น /students/1)
- GET /students/major/:major -> กรองตามสาขา (เช่น /students/major/วิศวกรรม)

Express Server (http://localhost:3001)
- GET / -> ข้อความต้อนรับและรายการ endpoints
- GET /students -> รายชื่อนักศึกษาทั้งหมด
- GET /students/:id -> ข้อมูลนักศึกษาตาม ID
- GET /students/major/:major -> กรองตามสาขา
- GET /stats -> สถิติ เช่น จำนวนนักศึกษารวม และจำนวนตามสาขา

## วิธีทดสอบ
1. ทดสอบผ่าน Browser
*** ทดสอบ HTTP Server ***
- http://localhost:3000
- http://localhost:3000/students
- http://localhost:3000/students/1
- http://localhost:3000/students/major/วิทยาการคอมพิวเตอร์

*** ทดสอบ Express Server ***
- http://localhost:3001
- http://localhost:3001/students
- http://localhost:3001/students/1
- http://localhost:3001/students/major/วิทยาการคอมพิวเตอร์
- http://localhost:3001/stats

2. ทดสอบผ่าน curl (ใน Terminal)
*** ทดสอบ HTTP Server ***
- curl http://localhost:3000
- curl http://localhost:3000/students
- curl http://localhost:3000/students/1
- curl http://localhost:3000/students/major/วิทยาการคอมพิวเตอร์

*** ทดสอบ Express Server ***
- curl http://localhost:3001
- curl http://localhost:3001/students
- curl http://localhost:3001/students/1
- curl http://localhost:3001/students/major/วิทยาการคอมพิวเตอร์
- curl http://localhost:3001/stats