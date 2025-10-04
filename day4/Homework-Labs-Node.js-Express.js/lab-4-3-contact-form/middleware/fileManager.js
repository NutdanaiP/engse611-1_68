const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// สร้างโฟลเดอร์ data ถ้าไม่มี
const ensureDataDir = async () => {
    try {
        await fs.access(DATA_DIR);
    } catch (error) {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
};

// อ่านข้อมูลจากไฟล์
const readJsonFile = async (filename) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // ถ้าไฟล์ไม่มี ให้ return array ว่าง
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error('เกิดข้อผิดพลาดในการอ่านไฟล์:', error);
        return [];
    }
};

// เขียนข้อมูลลงไฟล์
const writeJsonFile = async (filename, data) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', error);
        return false;
    }
};

// เพิ่มข้อมูลใหม่ลงไฟล์
const appendToJsonFile = async (filename, newData) => {
    try {
        const existingData = await readJsonFile(filename);
        
        // เพิ่ม ID และ timestamp ให้ข้อมูลใหม่
        const dataWithId = {
            id: Date.now(), // ใช้ timestamp ปัจจุบันเป็น ID
            ...newData,
            createdAt: new Date().toISOString() // เพิ่ม timestamp ในรูปแบบ ISO
        };
        
        existingData.push(dataWithId);
        await writeJsonFile(filename, existingData);
        return dataWithId;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลลงไฟล์:', error);
        return null;
    }
};

// สร้างฟังก์ชัน getFileStats
// ส่งกลับจำนวนข้อมูลในแต่ละไฟล์
const getFileStats = async () => {
    try {
        const contacts = await readJsonFile('contacts.json');
        const feedback = await readJsonFile('feedback.json');
        
        return {
            contacts: contacts.length,
            feedback: feedback.length
        };
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงสถิติไฟล์:', error);
        return {
            contacts: 0,
            feedback: 0
        };
    }
};

module.exports = {
    readJsonFile,
    writeJsonFile,
    appendToJsonFile,
    getFileStats // export ฟังก์ชันใหม่
};