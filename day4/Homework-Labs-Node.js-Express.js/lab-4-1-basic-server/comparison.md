# เปรียบเทียบ HTTP Server vs Express Server

## 1. ความง่ายในการเขียนโค้ด

**HTTP Server**
- Routing = ต้องเขียนเงื่อนไขเอง เช่น `if (pathname === '/students')` 
- Middleware = ไม่มีในตัว ต้องเขียนเอง
- Response = ต้องตั้ง header และ status code เอง
**Express Server**
- Routing = ใช้ `app.get('/students', ...)` ได้เลย
- Middleware = มี middleware เช่น `express.json()`
- Response = ใช้ `res.json()` และ `res.status()` ได้สะดวก

## 2. ความสามารถในการขยาย

- **HTTP Server**: เหมาะสำหรับงานขนาดเล็กหรือเรียนรู้พื้นฐาน Node.js
- **Express Server**: รองรับการสร้าง REST API, ใช้งานร่วมกับ database, และมี ecosystem ที่ใหญ่

## 3. การจัดการ Error และ 404

- HTTP Server ต้องเขียนเงื่อนไขตรวจสอบ path และส่ง status 404 ด้วยตัวเอง
- Express มี middleware สำหรับจัดการ error และ 404 ได้ง่าย เช่น `app.use((req, res) => res.status(404).json(...))`

## 4. ประสิทธิภาพ

- HTTP Server เบาและเร็วกว่า เพราะไม่มี overhead
- Express มี overhead แต่แลกกับความสะดวกและความสามารถที่มากกว่า

## 5. ความนิยมและการใช้งานจริง

- Express เป็นหนึ่งใน framework ที่นิยมที่สุดใน Node.js
- HTTP Server มักใช้ในงานเบื้องต้น หรือเพื่อเข้าใจการทำงานของ Node.js

## 6. ตัวอย่างการใช้งาน

**กรณี**
- สร้าง REST API สำหรับระบบจริง
**แนะนำใช้**
- Express
**กรณี**
- สร้าง server เพื่อเรียนรู้พื้นฐาน
**แนะนำใช้**
- HTTP Server
**กรณี**
- ต้องการใช้ middleware เช่น auth, logging
**แนะนำใช้**
- Express
**กรณี**
- ต้องการควบคุมทุกอย่างเอง
**แนะนำใช้**
- HTTP Server

## สรุป

Express จะช่วยให้การพัฒนาเว็บเซิร์ฟเวอร์ง่ายขึ้นมาก เหมาะกับงานจริงที่ต้องการความยืดหยุ่นและขยายได้ ส่วน HTTP Server เหมาะกับการเรียนรู้โครงสร้างพื้นฐานของ Node.js และการเข้าใจการทำงานของ request/response