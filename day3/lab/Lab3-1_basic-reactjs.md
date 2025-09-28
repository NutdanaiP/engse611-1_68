# Lab 3.1: ทำความรู้จักกับ React.js และ JSX
## Personal Profile Component

**เวลา:** 30 นาที  
**เป้าหมาย:** สร้าง Component แสดงโปรไฟล์ส่วนตัวแบบ Interactive  
**เทคนิคที่ใช้:** JSX, Props, Conditional Rendering, Lists, Event Handling

---

## Part 1: Follow Along (15 นาที)
### ทำตามทีละขั้นตอน - ได้โครงสร้างพื้นฐาน 70%

### ขั้นตอนที่ 1: สร้างโปรเจค React ด้วย Vite
```bash
# เปิด Terminal หรือ Command Prompt
npm create vite@latest personal-profile-lab -- --template react
cd personal-profile-lab
npm install
npm run dev
```

**ทำไมใช้ Vite แทน Create React App?**

#### 🚀 **ข้อดีของ Vite:**
1. **เร็วกว่ามาก** - Hot Module Replacement (HMR) ใน 0.1 วินาที
2. **ขนาดเล็กกว่า** - โปรเจคเบา ไฟล์น้อย
3. **Build เร็วกว่า** - ใช้ esbuild แทน Webpack  
4. **ทันสมัย** - รองรับ ES modules แบบ native
5. **เป็นมาตรฐานใหม่** - Vue, React, Svelte ใช้กันแล้ว

#### ⏱️ **เปรียบเทียบเวลา:**
- **Create React App:** Start ~30 วินาที, Hot reload ~2 วินาที
- **Vite:** Start ~3 วินาที, Hot reload ~0.1 วินาที

**อธิบาย:**
- `npm create vite@latest` สร้างโปรเจค Vite + React ใหม่
- `npm install` ติดตั้ง dependencies
- `npm run dev` รันโปรเจคที่ localhost:5173

**ผลลัพธ์:** เบราว์เซอร์เปิดที่ http://localhost:5173 แสดงหน้า Vite + React logo

---

### ขั้นตอนที่ 2: ลบไฟล์ที่ไม่ใช้และเตรียมโครงสร้าง
```bash
# ลบไฟล์ที่ไม่ต้องใช้
rm src/App.css src/index.css
```

**แก้ไขไฟล์ `src/main.jsx`:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

### ขั้นตอนที่ 3: สร้างไฟล์ CSS พื้นฐาน
**สร้างไฟล์:** `src/ProfileCard.css`

```css
/* ProfileCard.css - พื้นฐาน นักศึกษาจะปรับปรุงเพิ่มเติม */
.profile-card {
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Arial', sans-serif;
  position: relative;
}

.profile-header {
  text-align: center;
  margin-bottom: 25px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 15px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #667eea;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.profile-name {
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.student-id {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
  font-size: 14px;
}

.profile-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.info-item {
  background: rgba(255, 255, 255, 0.15);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.info-label {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  font-size: 18px;
  font-weight: bold;
}

.profile-section {
  margin: 20px 0;
}

.profile-section h3 {
  font-size: 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.hobby-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hobby-item:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.25);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.contact-button {
  width: 100%;
  padding: 12px;
  background: #fff;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.contact-button:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 600px) {
  .profile-card {
    margin: 10px;
    padding: 20px;
  }
  
  .profile-info {
    grid-template-columns: 1fr;
  }
  
  .skills {
    grid-template-columns: 1fr 1fr;
  }
}

/* ส่วนที่นักศึกษาจะต้องเพิ่มเติม:
- Theme toggle button styles
- Social media links styles  
- Achievement badges styles
- Animation keyframes
- Dark mode variant styles
*/
```

---

### ขั้นตอนที่ 4: สร้าง ProfileCard Component (โครงสร้างพื้นฐาน)
**สร้างไฟล์:** `src/ProfileCard.jsx`

```jsx
import React from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
    // ฟังก์ชันสำหรับแสดง Avatar (ตัวอักษรแรกของชื่อ)
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    // ฟังก์ชันจัดการเมื่อคลิกปุ่ม Contact
    const handleContactClick = () => {
        alert(`สวัสดี! ติดต่อ ${profile.name} ที่อีเมล ${profile.email}`);
    };

    // ฟังก์ชันจัดการเมื่อคลิกที่ skill
    const handleSkillClick = (skill) => {
        alert(`${profile.name} มีความเชี่ยวชาญใน ${skill}!`);
    };

    // TODO: นักศึกษาจะเพิ่ม state และ functions เพิ่มเติมในส่วน Challenge

    return (
        <div className="profile-card">
            {/* ส่วนหัว - รูปและชื่อ */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {getInitials(profile.name)}
                </div>
                <h1 className="profile-name">{profile.name}</h1>
                <div className="student-id">{profile.studentId}</div>
            </div>

            {/* ข้อมูลพื้นฐาน */}
            <div className="profile-info">
                <div className="info-item">
                    <div className="info-label">สาขา</div>
                    <div className="info-value">{profile.major}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">ชั้นปี</div>
                    <div className="info-value">{profile.year}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">อายุ</div>
                    <div className="info-value">{profile.age} ปี</div>
                </div>
                <div className="info-item">
                    <div className="info-label">เกรด</div>
                    <div className="info-value">
                        {profile.gpa.toFixed(2)}
                        {profile.gpa >= 3.5 && ' 🌟'}
                    </div>
                </div>
            </div>

            {/* งานอดิเรก */}
            <div className="profile-section">
                <h3>🎯 งานอดิเรก</h3>
                <ul className="hobbies-list">
                    {profile.hobbies.map((hobby, index) => (
                        <li key={index} className="hobby-item">
                            {hobby}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ทักษะ */}
            <div className="profile-section">
                <h3>💻 ทักษะ</h3>
                <div className="skills">
                    {profile.skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="skill-tag"
                            onClick={() => handleSkillClick(skill)}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* TODO: นักศึกษาจะเพิ่ม sections เพิ่มเติมใน Challenge */}

            {/* ปุ่ม Contact */}
            <button 
                className="contact-button"
                onClick={handleContactClick}
            >
                📧 ติดต่อ {profile.name}
            </button>
        </div>
    );
}

export default ProfileCard;
```

---

### ขั้นตอนที่ 5: แก้ไข App Component
**แก้ไขไฟล์:** `src/App.jsx`

```jsx
import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
    // ข้อมูลโปรไฟล์ตัวอย่าง
    const sampleProfile = {
        name: "สมชาย ใจดี",
        studentId: "66130500001",
        major: "วิศวกรรมซอฟต์แวร์",
        year: 3,
        age: 21,
        gpa: 3.75,
        email: "somchai.jaidee@student.university.ac.th",
        hobbies: [
            "เขียนโค้ด",
            "เล่นเกม",
            "ดูหนัง",
            "ฟังเพลง",
            "อ่านหนังสือ"
        ],
        skills: [
            "JavaScript",
            "React.js",
            "HTML/CSS",
            "Python",
            "Git",
            "Node.js"
        ],
        // TODO: นักศึกษาจะเพิ่ม fields เพิ่มเติมใน Challenge
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(45deg, #f0f2f5 0%, #e8eaf6 100%)',
            padding: '20px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ 
                    color: '#333', 
                    fontSize: '32px',
                    margin: '20px 0'
                }}>
                    🎓 Personal Profile Card
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Lab 3.1 - ทำความรู้จักกับ React.js และ JSX
                </p>
            </div>
            
            <ProfileCard profile={sampleProfile} />
        </div>
    );
}

export default App;
```

---

### ขั้นตอนที่ 6: ทดสอบพื้นฐาน
```bash
# ตรวจสอบว่าทุกอย่างทำงานได้
npm run dev
```

**ตรวจสอบผลลัพธ์:**
1. ✅ โปรไฟล์การ์ดแสดงข้อมูลครบ
2. ✅ Avatar แสดงตัวอักษรแรก
3. ✅ คลิกที่ทักษะแสดง alert
4. ✅ คลิกปุ่ม Contact แสดงอีเมล
5. ✅ Responsive design ใช้งานได้

**✨ ขณะนี้เรามี ProfileCard พื้นฐานแล้ว! ต่อไปเป็นเวลาทำ Challenge!**

---

## Part 2: Challenge Time! (15 นาที)
### 🔥 งานที่นักศึกษาต้องทำเองให้สำเร็จ

### 🎯 **Challenge 1: เพิ่มข้อมูลส่วนตัวและ Social Links (5 นาที)**

**สิ่งที่ต้องทำ:**
1. **เปลี่ยนข้อมูลเป็นของตัวเอง** ในไฟล์ `App.jsx`
2. **เพิ่ม field `socialLinks`** ในข้อมูล profile
3. **แสดง Social Links** ใน ProfileCard component

**คำใบ้:**

**ขั้นตอนที่ 1:** แก้ไข `src/App.jsx`
```jsx
const myProfile = {
    name: "ชื่อจริงของคุณ",
    studentId: "รหัสนักศึกษาของคุณ", 
    major: "สาขาของคุณ",
    year: /* ชั้นปีของคุณ */,
    age: /* อายุของคุณ */,
    gpa: /* เกรดของคุณ */,
    email: "อีเมลของคุณ",
    hobbies: [
        // เพิ่มงานอดิเรกของคุณ 5 อย่าง
    ],
    skills: [
        // เพิ่มทักษะของคุณ 4-6 อย่าง
    ],
    socialLinks: [
        { platform: "GitHub", url: "https://github.com/yourusername" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
        { platform: "Instagram", url: "https://instagram.com/yourusername" },
        // เพิ่มเติมตามต้องการ
    ]
};
```

**ขั้นตอนที่ 2:** เพิ่มใน `src/ProfileCard.jsx` หลัง skills section
```jsx
{/* Social Links - นักศึกษาเพิ่มเอง */}
{profile.socialLinks && profile.socialLinks.length > 0 && (
    <div className="profile-section">
        <h3>🌐 Social Media</h3>
        <div className="social-links">
            {/* TODO: ใช้ .map() แสดงรายการ social links */}
        </div>
    </div>
)}
```

**ขั้นตอนที่ 3:** เพิ่ม CSS ในไฟล์ `src/ProfileCard.css`
```css
.social-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.social-link {
    /* TODO: นักศึกษาเขียน styles เอง */
}
```

---

### 🎯 **Challenge 2: เพิ่ม Theme Toggle และ Achievement Badges (5 นาที)**

**สิ่งที่ต้องทำ:**
1. **เพิ่ม useState** สำหรับจัดการ dark/light mode
2. **เพิ่มปุ่ม toggle** ใน header
3. **เพิ่ม achievement badges** ตาม GPA และ skills

**คำใบ้:**

**ขั้นตอนที่ 1:** เพิ่ม import และ state ใน `ProfileCard.jsx`
```jsx
import React, { useState } from 'react';

function ProfileCard({ profile }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleTheme = () => {
        // TODO: นักศึกษาเขียนฟังก์ชัน toggle เอง
    };
    
    // TODO: เพิ่ม className conditionally
    const cardClassName = `profile-card ${/* เงื่อนไข dark mode */}`;
```

**ขั้นตอนที่ 2:** เพิ่มปุ่ม toggle ใน header
```jsx
<div className="profile-header">
    {/* TODO: เพิ่มปุ่ม theme toggle */}
    <button 
        className="theme-toggle"
        onClick={toggleTheme}
    >
        {/* แสดง emoji ตาม mode */}
    </button>
    
    <div className="profile-avatar">
        {getInitials(profile.name)}
    </div>
    {/* ... rest of header ... */}
</div>
```

**ขั้นตอนที่ 3:** เพิ่ม Achievement Badges
```jsx
{/* Achievement Badges - หลัง info section */}
<div className="profile-section">
    <h3>🏆 Achievements</h3>
    <div className="achievements">
        {/* TODO: เพิ่มเงื่อนไขแสดง badges */}
        {profile.gpa >= 3.5 && (
            <span className="achievement-badge">
                🌟 เกียรตินิยม
            </span>
        )}
        {profile.skills.length >= 5 && (
            <span className="achievement-badge">
                💪 Multi-skilled
            </span>
        )}
        {/* เพิ่ม achievement เงื่อนไขอื่นๆ */}
    </div>
</div>
```

**ขั้นตอนที่ 4:** เพิ่ม CSS ที่จำเป็น
```css
.theme-toggle {
    position: absolute;
    top: 15px;
    right: 15px;
    /* TODO: นักศึกษาเขียน styles เอง */
}

.profile-card.dark-mode {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    /* TODO: เพิ่ม styles สำหรับ dark mode */
}

.achievements {
    /* TODO: เขียน layout สำหรับ achievement badges */
}

.achievement-badge {
    /* TODO: เขียน styles สำหรับ badges */
}
```

---

### 🎯 **Challenge 3: เพิ่ม Interactive Features (5 นาที)**

**สิ่งที่ต้องทำ:**
1. **เพิ่ม view count** ที่เพิ่มขึ้นเมื่อคลิกที่การ์ด
2. **เพิ่ม favorite hobbies** ที่คลิกเพื่อ highlight ได้
3. **เพิ่ม contact form** แทน alert

**คำใบ้:**

**ขั้นตอนที่ 1:** เพิ่ม states เพิ่มเติม
```jsx
const [viewCount, setViewCount] = useState(0);
const [favoriteHobbies, setFavoriteHobbies] = useState([]);
const [showContactForm, setShowContactForm] = useState(false);
```

**ขั้นตอนที่ 2:** เพิ่มฟังก์ชันต่างๆ
```jsx
const handleCardClick = () => {
    // TODO: เพิ่ม view count
};

const toggleFavoriteHobby = (hobby) => {
    // TODO: เพิ่ม/ลบ hobby จาก favorites
};

const handleContactClick = () => {
    // TODO: แสดง contact form แทน alert
};
```

**ขั้นตอนที่ 3:** แก้ไข JSX
```jsx
<div className={cardClassName} onClick={handleCardClick}>
    {/* เพิ่ม view counter */}
    <div className="view-counter">
        👁️ Views: {viewCount}
    </div>
    
    {/* แก้ไข hobbies list */}
    <ul className="hobbies-list">
        {profile.hobbies.map((hobby, index) => (
            <li 
                key={index} 
                className={`hobby-item ${favoriteHobbies.includes(hobby) ? 'favorite' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteHobby(hobby);
                }}
            >
                {hobby} {favoriteHobbies.includes(hobby) && '💖'}
            </li>
        ))}
    </ul>
    
    {/* Contact Form */}
    {showContactForm && (
        <div className="contact-form">
            {/* TODO: สร้าง simple form */}
        </div>
    )}
</div>
```

---

## 🏆 **เกณฑ์การประเมินผล:**

### **ระดับพื้นฐาน (70%):**
- ✅ ทำ Challenge 1 สำเร็จ (เปลี่ยนข้อมูลส่วนตัว + Social Links)
- ✅ แสดงข้อมูลครบถ้วนและถูกต้อง

### **ระดับดี (80%):**  
- ✅ Challenge 1 + 2 สำเร็จ
- ✅ Theme toggle ทำงานได้
- ✅ Achievement badges แสดงตามเงื่อนไข

### **ระดับดีเยี่ยม (90-100%):**
- ✅ ทำครบทั้ง 3 Challenges
- ✅ Interactive features ทำงานได้ถูกต้อง
- ✅ UI/UX สวยงาม มี animations
- ✅ Code เขียนได้สะอาดและมี comments

---

## 🎓 **สิ่งที่นักศึกษาจะได้เรียนรู้:**

### **จากการทำ Challenge:**
- **useState Hook** - จัดการ state เบื้องต้น  
- **Event Handling** - onClick, stopPropagation
- **Conditional Rendering** - แสดงเนื้อหาตามเงื่อนไข
- **Array Methods** - map, includes, filter
- **CSS Classes** - จัดการ className แบบ dynamic
- **Component Thinking** - แยกหน้าที่ของแต่ละส่วน

### **Skills ที่ต้องใช้:**
- **JavaScript ES6** - Destructuring, Arrow functions, Template literals
- **React Concepts** - Components, Props, useState
- **CSS Skills** - Flexbox, Grid, Transitions, Responsive design
- **Problem Solving** - Debug และแก้ไขปัญหา

### **การแบ่งเวลาที่แนะนำ:**
- **Challenge 1:** 5 นาที (พื้นฐาน - ต้องทำได้ทุกคน)
- **Challenge 2:** 5 นาที (ปานกลาง - ใช้ useState) 
- **Challenge 3:** 5 นาที (ค่อนข้างยาก - สำหรับคนที่เก่ง)

---

## 🎯 **ผลลัพธ์ที่คาดหวัง:**

เมื่อเสร็จแล้วจะได้ ProfileCard ที่:
1. ✅ แสดงข้อมูลส่วนตัวจริง
2. ✅ Social media links ที่คลิกได้
3. ✅ Dark/Light mode toggle
4. ✅ Achievement badges ตาม performance
5. ✅ Interactive elements หลากหลาย
6. ✅ Responsive design สำหรับมือถือ

## 🚀 **Next Steps:**
พร้อมสำหรับ **Lab 3.2: Components & Props** ที่จะเจาะลึกการส่งข้อมูลและสร้าง reusable components มากขึ้น!

---

**⏰ เวลาที่ใช้จริง: 15 นาที Follow + 15 นาที Challenge = 30 นาที**  
**🎯 ความยาก: เหมาะสำหรับมือใหม่ + ท้าทายพอดี**  
**💡 Tips: อย่าลืม console.log เพื่อ debug และใช้ React DevTools ดู state!**