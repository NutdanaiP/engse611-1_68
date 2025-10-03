// middleware/logger.js
const fs = require('fs');
const path = require('path');

// สร้าง path สำหรับเก็บ log file
const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'server.log');

// ถ้ายังไม่มีโฟลเดอร์ logs ให้สร้างขึ้นมา
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

// Middleware function
const logger = (req, res, next) => {
    const now = new Date();
    const log = `[${now.toLocaleString()}] ${req.method} ${req.originalUrl} from ${req.ip}\n`;

    // แสดง log บน console
    process.stdout.write(log);

    // บันทึก log ลงไฟล์
    fs.appendFile(LOG_FILE, log, (err) => {
        if (err) console.error('Error writing log:', err);
    });

    next();
};

module.exports = logger;
