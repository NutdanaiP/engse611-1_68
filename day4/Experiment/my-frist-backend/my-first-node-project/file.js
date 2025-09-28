const fs = require('fs');

// อ่านไฟล์
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        return;
    }
    console.log('เนื้อหาไฟล์:', data);
});

// เขียนไฟล์
fs.writeFile('output.txt', 'สวัสดี Node.js!', (err) => {
    if (err) {
        console.error('เขียนไฟล์ไม่ได้:', err);
        return;
    }
    console.log('เขียนไฟล์สำเร็จ!');
});

// แบบ synchronous (blocking)
const data = fs.readFileSync('data.txt', 'utf8');
console.log(data);