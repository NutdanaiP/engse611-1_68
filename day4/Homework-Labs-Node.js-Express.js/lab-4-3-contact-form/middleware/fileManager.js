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
        if (error.code === 'ENOENT') {
            // TODO: ถ้าไฟล์ไม่มี ให้ return array ว่าง []
            return [];
        }
        console.error('Error reading file:', error);
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
        console.error('Error writing file:', error);
        return false;
    }
};

// เพิ่มข้อมูลใหม่ลงไฟล์
const appendToJsonFile = async (filename, newData) => {
    try {
        const existingData = await readJsonFile(filename);
        
        // ID จาก timestamp เพื่อป้องกันการซ้ำ
        const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // timestamp ในเขตเวลา GMT+7
        const date = new Date();
        const offset = 7 * 60; // GMT+7 ในหน่วยนาที
        const localDate = new Date(date.getTime() + offset * 60 * 1000);
        const createdAt = localDate.toISOString().replace();

        // TODO: เพิ่ม ID และ timestamp ให้ข้อมูลใหม่
        const dataWithId = {
            id: uniqueId,
            ...newData,
            createdAt: createdAt
        };
        
        existingData.push(dataWithId);
        await writeJsonFile(filename, existingData);
        return dataWithId;
    } catch (error) {
        console.error('Error appending to file:', error);
        return null;
    }
};

// TODO: สร้างฟังก์ชัน getFileStats
// ส่งกลับจำนวนข้อมูลในแต่ละไฟล์
const getFileStats = async () => {
    try {
        const contacts = await readJsonFile('contacts.json');
        const feedback = await readJsonFile('feedback.json');
        
        return {
            success: true,
            stats: {
                contactsCount: Array.isArray(contacts) ? contacts.length : 0,
                feedbackCount: Array.isArray(feedback) ? feedback.length : 0
            }
        };
        
    } catch (error) {
        console.error('Error getting file stats:', error);
        return {
            success: false,
            message: 'Error retrieving file statistics'
        };
    }
};

module.exports = {
    readJsonFile,
    writeJsonFile,
    appendToJsonFile,
    getFileStats
};