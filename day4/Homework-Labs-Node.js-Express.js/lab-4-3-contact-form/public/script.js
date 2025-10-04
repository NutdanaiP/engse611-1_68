// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');
const statusMessages = document.getElementById('statusMessages');
const apiResults = document.getElementById('apiResults');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
    setupEventListeners();
    initializeTheme();
});

// เริ่มต้น theme จาก localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

function initializeForms() {
    // Update rating display
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
    });
}

function setupEventListeners() {
    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitContactForm();
    });

    // Feedback form submission
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitFeedbackForm();
    });

    // Real-time validation
    const contactInputs = contactForm.querySelectorAll('input, textarea');
    contactInputs.forEach(input => {
        input.addEventListener('input', () => {
            const { isValid, message } = validateField(input.name, input.value);
            updateFieldStatus(input, isValid, message);
        });
    });

    const feedbackInputs = feedbackForm.querySelectorAll('input, textarea');
    feedbackInputs.forEach(input => {
        input.addEventListener('input', () => {
            const { isValid, message } = validateField(input.name, input.value);
            updateFieldStatus(input, isValid, message);
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// ฟังก์ชัน validateField
function validateField(fieldName, value) {
    switch (fieldName) {
        case 'name':
            if (!value) return { isValid: false, message: 'ต้องกรอกชื่อ' };
            if (value.trim().length < 2) return { isValid: false, message: 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร' };
            if (value.trim().length > 100) return { isValid: false, message: 'ชื่อต้องไม่เกิน 100 ตัวอักษร' };
            return { isValid: true, message: '' };

        case 'email':
            if (!value && document.activeElement.id !== 'feedbackEmail') return { isValid: false, message: 'ต้องกรอกอีเมล' };
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value.trim())) return { isValid: false, message: 'รูปแบบอีเมลไม่ถูกต้อง' };
            return { isValid: true, message: '' };

        case 'subject':
            if (!value) return { isValid: false, message: 'ต้องกรอกหัวข้อ' };
            if (value.trim().length < 5) return { isValid: false, message: 'หัวข้อต้องมีความยาวอย่างน้อย 5 ตัวอักษร' };
            if (value.trim().length > 200) return { isValid: false, message: 'หัวข้อต้องไม่เกิน 200 ตัวอักษร' };
            return { isValid: true, message: '' };

        case 'message':
            if (!value) return { isValid: false, message: 'ต้องกรอกข้อความ' };
            if (value.trim().length < 10) return { isValid: false, message: 'ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร' };
            if (value.trim().length > 1000) return { isValid: false, message: 'ข้อความต้องไม่เกิน 1000 ตัวอักษร' };
            return { isValid: true, message: '' };

        case 'phone':
            if (!value) return { isValid: true, message: '' };
            const phoneRegex = /^[0-9]{9,10}$/;
            if (!phoneRegex.test(value.trim())) return { isValid: false, message: 'เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก' };
            return { isValid: true, message: '' };

        case 'company':
            if (!value) return { isValid: true, message: '' };
            if (value.trim().length > 100) return { isValid: false, message: 'ชื่อบริษัทต้องไม่เกิน 100 ตัวอักษร' };
            return { isValid: true, message: '' };

        case 'rating':
            const rateNum = parseInt(value);
            if (!value) return { isValid: false, message: 'ต้องเลือกคะแนน' };
            if (isNaN(rateNum) || rateNum < 1 || rateNum > 5) return { isValid: false, message: 'คะแนนต้องอยู่ระหว่าง 1-5' };
            return { isValid: true, message: '' };

        case 'comment':
            if (!value) return { isValid: false, message: 'ต้องกรอกความคิดเห็น' };
            if (value.trim().length < 5) return { isValid: false, message: 'ความคิดเห็นต้องมีความยาวอย่างน้อย 5 ตัวอักษร' };
            if (value.trim().length > 500) return { isValid: false, message: 'ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร' };
            return { isValid: true, message: '' };

        default:
            return { isValid: true, message: '' };
    }
}

// อัปเดตสถานะ field
function updateFieldStatus(input, isValid, message) {
    const errorDiv = document.getElementById(`${input.id}Error`);
    errorDiv.textContent = message;
    errorDiv.style.color = isValid ? '' : 'var(--error-color)';
    input.style.borderColor = isValid ? '' : 'var(--input-invalid-border)';
    input.classList.remove(isValid ? 'invalid' : 'valid');
    input.classList.add(isValid ? 'valid' : 'invalid');
}

async function submitContactForm() {
    if (isSubmitting) return;
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // ตรวจสอบ client-side validation
    for (const [key, value] of Object.entries(data)) {
        const { isValid, message } = validateField(key, value);
        if (!isValid) {
            showStatusMessage(`🔸 ${message}`, 'error');
            updateFieldStatus(document.getElementsByName(key)[0], isValid, message);
            return;
        }
    }
    
    try {
        isSubmitting = true;
        updateSubmitButton('contactSubmit', 'กำลังส่ง...', true);
        
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatusMessage('✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
            contactForm.reset();
            contactForm.querySelectorAll('.error').forEach(div => div.textContent = '');
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid', 'invalid');
                input.style.borderColor = '';
            });
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) {
                displayValidationErrors(result.errors);
            }
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('contactSubmit', 'ส่งข้อความ', false);
    }
}

async function submitFeedbackForm() {
    if (isSubmitting) return;
    
    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);
    
    // ตรวจสอบ client-side validation
    for (const [key, value] of Object.entries(data)) {
        const { isValid, message } = validateField(key, value);
        if (!isValid) {
            showStatusMessage(`🔸 ${message}`, 'error');
            updateFieldStatus(document.getElementsByName(key)[0], isValid, message);
            return;
        }
    }
    
    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);
        
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatusMessage('✅ ส่งความคิดเห็นสำเร็จ! ขอบคุณสำหรับความคิดเห็น', 'success');
            feedbackForm.reset();
            ratingValue.textContent = '3';
            feedbackForm.querySelectorAll('.error').forEach(div => div.textContent = '');
            feedbackForm.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid', 'invalid');
                input.style.borderColor = '';
            });
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) {
                displayValidationErrors(result.errors);
            }
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

function showStatusMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;
    
    statusMessages.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
    const button = document.getElementById(buttonId);
    button.textContent = text;
    button.disabled = disabled;
}

function displayValidationErrors(errors) {
    errors.forEach(error => {
        showStatusMessage(`🔸 ${error}`, 'error');
    });
}

// API Testing Functions
async function loadContacts() {
    try {
        apiResults.textContent = 'กำลังโหลดข้อมูลติดต่อ...';
        const response = await fetch('/api/contact');
        const result = await response.json();
        
        if (result.success) {
            apiResults.innerHTML = `
                <h3>ข้อมูลติดต่อ</h3>
                <p>จำนวนทั้งหมด: ${result.pagination.totalItems}</p>
                <p>หน้า: ${result.pagination.currentPage}/${result.pagination.totalPages}</p>
                <pre>${JSON.stringify(result.data, null, 2)}</pre>
            `;
        } else {
            apiResults.textContent = `เกิดข้อผิดพลาด: ${result.message}`;
        }
    } catch (error) {
        apiResults.textContent = 'เกิดข้อผิดพลาดในการโหลดข้อมูลติดต่อ: ' + error.message;
    }
}

async function loadFeedbackStats() {
    try {
        apiResults.textContent = 'กำลังโหลดสถิติความคิดเห็น...';
        const response = await fetch('/api/feedback/stats');
        const result = await response.json();
        
        if (result.success) {
            apiResults.innerHTML = `
                <h3>สถิติความคิดเห็น</h3>
                <p>จำนวนความคิดเห็นทั้งหมด: ${result.stats.totalFeedback}</p>
                <p>การกระจายคะแนน:</p>
                <ul>
                    <li>5 ดาว: ${result.stats.ratingDistribution[5]}</li>
                    <li>4 ดาว: ${result.stats.ratingDistribution[4]}</li>
                    <li>3 ดาว: ${result.stats.ratingDistribution[3]}</li>
                    <li>2 ดาว: ${result.stats.ratingDistribution[2]}</li>
                    <li>1 ดาว: ${result.stats.ratingDistribution[1]}</li>
                </ul>
            `;
        } else {
            apiResults.textContent = `เกิดข้อผิดพลาด: ${result.message}`;
        }
    } catch (error) {
        apiResults.textContent = 'เกิดข้อผิดพลาดในการโหลดสถิติความคิดเห็น: ' + error.message;
    }
}

async function loadAPIStatus() {
    try {
        apiResults.textContent = 'กำลังโหลดสถานะ API...';
        const response = await fetch('/api/status');
        const result = await response.json();
        
        if (result.success) {
            apiResults.innerHTML = `
                <h3>สถานะ API</h3>
                <pre>${JSON.stringify(result, null, 2)}</pre>
            `;
        } else {
            apiResults.textContent = `เกิดข้อผิดพลาด: ${result.message}`;
        }
    } catch (error) {
        apiResults.textContent = 'เกิดข้อผิดพลาดในการโหลดสถานะ API: ' + error.message;
    }
}

async function loadAPIDocs() {
    try {
        apiResults.textContent = 'กำลังโหลดเอกสาร API...';
        const response = await fetch('/api/docs');
        const result = await response.json();
        
        apiResults.innerHTML = `
            <h3>เอกสาร API</h3>
            <pre>${JSON.stringify(result, null, 2)}</pre>
        `;
    } catch (error) {
        apiResults.textContent = 'เกิดข้อผิดพลาดในการโหลดเอกสาร API: ' + error.message;
    }
}