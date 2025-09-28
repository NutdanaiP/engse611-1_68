# วันที่ 3: เริ่มต้นกับ React.js
## หัวข้อที่ 3: State Management เบื้องต้น
### สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์

---

## สไลด์ 1: ยินดีต้อนรับสู่โลก Interactive! 🎮

### เมื่อกี้เราเรียนรู้แล้ว:
✅ **React Components** - สร้างชิ้นส่วน UI  
✅ **Props** - ส่งข้อมูลระหว่าง Components  
✅ **JSX** - HTML ใน JavaScript  
✅ **Component Composition** - ประกอบ Components เข้าด้วยกัน

### แต่ยังขาดอะไร? 🤔
❓ **ข้อมูลที่เปลี่ยนแปลงได้** - ตัวเลข, สถานะ, การกรอกข้อมูล  
❓ **การตอบสนองผู้ใช้** - คลิกแล้วเกิดอะไรขึ้น  
❓ **หน่วยความจำของ Component** - จำข้อมูลไว้ได้  

### วันนี้เราจะเรียนรู้:
🔥 **State** - หน่วยความจำของ Component  
⚡ **useState Hook** - เก็บและเปลี่ยนข้อมูล  
🎯 **Event Handling** - จัดการการคลิก การพิมพ์  
🚀 **Interactive Components** - Components ที่ตอบสนอง  

### เป้าหมายวันนี้:
*"จาก Static Components → Interactive Applications!"*

**เตรียมพร้อมสำหรับการผจญภัย! 🎉**

---

## สไลด์ 2: State คืออะไร? 🧠

### เปรียบเทียบกับชีวิตจริง:

#### 🧑‍💼 **คนเราก็มี "State" เหมือนกัน:**
- **อารมณ์:** เศร้า → มีความสุข → โกรธ
- **ความหิว:** หิว → อิ่ม → หิวอีก  
- **แบตเตอรี่มือถือ:** 100% → 50% → 10% → 0%
- **เงินในกระเป๋า:** 1000 บาท → 500 บาท → 0 บาท

#### 🖥️ **Component ก็มี "State" เช่นกัน:**
```jsx
// ตัวนับ: 0 → 1 → 2 → 3...
// ฟอร์ม: ว่าง → มีข้อมูล → ส่งแล้ว
// สีพื้นหลัง: แดง → ฟ้า → เขียว
// โหมด: เข้ม → สว่าง
```

### State คือ:
💭 **ความจำระยะสั้น** ของ Component  
🔄 **ข้อมูลที่เปลี่ยนแปลงได้**  
⚡ **ทริกเกอร์การ Re-render** - อัพเดทหน้าจอ  
📦 **ข้อมูลส่วนตัว** ของแต่ละ Component  

### คำถามสำคัญ: 
*"ถ้า Component ไม่มี State จะเปรียบเสมือนอะไร?"*

**เหมือนหุ่นขี้ผึ้ง - สวยแต่ไม่ตอบสนอง!** 🤖

---

## สไลด์ 3: Props vs State - ความแตกต่าง 🆚

### **Props = ของขวัญที่ได้รับ 🎁**
```jsx
function Greeting({ name, age }) {
    // name และ age มาจากข้างนอก
    // ไม่สามารถเปลี่ยนได้
    return <h1>สวัสดี {name} อายุ {age} ปี</h1>;
}

// การใช้งาน
<Greeting name="สมชาย" age={20} />
```

### **State = ของส่วนตัวของเรา 💰**
```jsx
function Counter() {
    const [count, setCount] = useState(0); // ของเราเอง เปลี่ยนได้!
    
    return (
        <div>
            <p>คะแนน: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                เพิ่มคะแนน
            </button>
        </div>
    );
}
```

### **เปรียบเทียบ:**

| Props | State |
|-------|-------|
| 📨 **ได้รับจากข้างนอก** | 💭 **เก็บไว้ข้างใน** |
| 🔒 **อ่านอย่างเดียว** | ✏️ **เปลี่ยนแปลงได้** |
| 👨‍👩‍👧‍👦 **แชร์ข้อมูล** | 🔒 **ข้อมูลส่วนตัว** |
| ⬇️ **Parent → Child** | 🏠 **อยู่ใน Component** |

### ตัวอย่างในชีวิตจริง:
- **Props:** ของขวัญวันเกิด (รับมาจากผู้อื่น)
- **State:** เงินในกระเป๋า (ของเราเอง ใช้ได้)

---

## สไลด์ 4: useState Hook - เวทมนตร์แห่ง State 🪄

### **Syntax พื้นฐาน:**
```jsx
import React, { useState } from 'react';

function MyComponent() {
    const [state, setState] = useState(initialValue);
    //     ↑         ↑            ↑
    //   ค่าปัจจุบัน  ฟังก์ชันเปลี่ยน  ค่าเริ่มต้น
    
    return <div>State: {state}</div>;
}
```

### **ตัวอย่างจริง:**
```jsx
function LikeButton() {
    const [likes, setLikes] = useState(0);
    //     ↑         ↑
    //   ตัวแปรเก็บค่า  ฟังก์ชันเปลี่ยนค่า
    
    const handleClick = () => {
        setLikes(likes + 1); // เพิ่มค่า likes ขึ้น 1
    };
    
    return (
        <div>
            <p>👍 ถูกใจ: {likes} ครั้ง</p>
            <button onClick={handleClick}>
                กดไลค์
            </button>
        </div>
    );
}
```

### **กฎสำคัญของ useState:**
1. **เรียกใน Component เท่านั้น** - ไม่ใช่ในฟังก์ชันธรรมดา
2. **เรียกที่ระดับบนสุด** - ไม่ใช่ใน if, loop หรือ nested functions
3. **ใช้ Destructuring** - `[value, setter]` เสมอ
4. **Naming Convention:** `[thing, setThing]`

### **ตัวอย่าง Naming:**
```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isVisible, setIsVisible] = useState(false);
const [users, setUsers] = useState([]);
```

---

## สไลด์ 5: ประเภทข้อมูลใน State 📊

### **1. Number State:**
```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>ตัวนับ: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>รีเซ็ต</button>
        </div>
    );
}
```

### **2. String State:**
```jsx
function NameInput() {
    const [name, setName] = useState('');
    
    return (
        <div>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="กรอกชื่อของคุณ"
            />
            <p>สวัสดี {name || 'ท่านผู้มีเกียรติ'}!</p>
        </div>
    );
}
```

### **3. Boolean State:**
```jsx
function ToggleButton() {
    const [isOn, setIsOn] = useState(false);
    
    return (
        <div>
            <p>สถานะ: {isOn ? '🟢 เปิด' : '🔴 ปิด'}</p>
            <button onClick={() => setIsOn(!isOn)}>
                {isOn ? 'ปิด' : 'เปิด'}
            </button>
        </div>
    );
}
```

### **4. Array State:**
```jsx
function TodoList() {
    const [todos, setTodos] = useState(['เรียน React', 'ทำการบ้าน']);
    
    const addTodo = () => {
        const newTodo = prompt('เพิ่มงานใหม่:');
        if (newTodo) {
            setTodos([...todos, newTodo]); // Spread operator
        }
    };
    
    return (
        <div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
            <button onClick={addTodo}>เพิ่มงาน</button>
        </div>
    );
}
```

### **5. Object State:**
```jsx
function UserProfile() {
    const [user, setUser] = useState({
        name: 'สมชาย',
        age: 25,
        city: 'กรุงเทพ'
    });
    
    const updateAge = () => {
        setUser({
            ...user,        // คัดลอกข้อมูลเดิม
            age: user.age + 1  // เปลี่ยนแค่อายุ
        });
    };
    
    return (
        <div>
            <p>{user.name} อายุ {user.age} ปี อาศัยที่ {user.city}</p>
            <button onClick={updateAge}>เพิ่มอายุ</button>
        </div>
    );
}
```

---

## สไลด์ 6: Event Handling ใน React 🎯

### **Event คืออะไร?**
Event = **เหตุการณ์** ที่เกิดขึ้นบนหน้าเว็บ
- 👆 **คลิก** ปุ่ม
- ⌨️ **พิมพ์** ข้อความ  
- 📝 **ส่ง** ฟอร์ม
- 🖱️ **เลื่อน** เมาส์

### **การจัดการ Events:**
```jsx
function EventExample() {
    const [message, setMessage] = useState('');
    
    // Event Handler Functions
    const handleClick = () => {
        setMessage('คุณคลิกปุ่ม!');
    };
    
    const handleMouseOver = () => {
        setMessage('เมาส์อยู่บนปุ่ม');
    };
    
    const handleMouseOut = () => {
        setMessage('เมาส์ออกจากปุ่ม');
    };
    
    return (
        <div>
            <p>ข้อความ: {message}</p>
            <button 
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                ลองชี้และคลิก
            </button>
        </div>
    );
}
```

### **Event แบบ Inline:**
```jsx
function InlineEvents() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>คะแนน: {count}</p>
            {/* Inline event handlers */}
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
            <button onClick={() => setCount(count + 10)}>
                +10
            </button>
            <button onClick={() => setCount(0)}>
                รีเซ็ต
            </button>
        </div>
    );
}
```

### **Event Object:**
```jsx
function FormExample() {
    const [inputValue, setInputValue] = useState('');
    
    const handleInputChange = (event) => {
        // event.target = element ที่เกิด event
        // event.target.value = ค่าที่พิมพ์
        setInputValue(event.target.value);
    };
    
    return (
        <div>
            <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <p>คุณพิมพ์: {inputValue}</p>
        </div>
    );
}
```

---

## สไลด์ 7: Forms และ Controlled Components 📝

### **Controlled vs Uncontrolled Components:**

#### **❌ Uncontrolled (ไม่แนะนำ):**
```jsx
function UncontrolledForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // ต้องไปดึงค่าจาก DOM
        const formData = new FormData(e.target);
        console.log(formData.get('username'));
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" />
            <button type="submit">ส่ง</button>
        </form>
    );
}
```

#### **✅ Controlled (แนะนำ):**
```jsx
function ControlledForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // ข้อมูลอยู่ใน state แล้ว!
        console.log({ username, email, message });
        
        // ตรวจสอบข้อมูล
        if (!username.trim()) {
            alert('กรุณากรอกชื่อผู้ใช้');
            return;
        }
        
        // ส่งข้อมูล...
        alert('ส่งข้อมูลสำเร็จ!');
        
        // ล้างฟอร์ม
        setUsername('');
        setEmail('');
        setMessage('');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ชื่อผู้ใช้:</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            
            <div>
                <label>อีเมล:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>
                <label>ข้อความ:</label>
                <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            
            <button type="submit">ส่งข้อมูล</button>
        </form>
    );
}
```

### **ประโยชน์ของ Controlled Components:**
✅ **ตรวจสอบข้อมูลได้ทันที** - Real-time validation  
✅ **ควบคุมการแสดงผลได้** - แสดงข้อมูลที่ไหนก็ได้  
✅ **จัดการข้อมูลง่าย** - อยู่ใน state แล้ว  
✅ **Reset ได้ง่าย** - แค่เปลี่ยน state

---

## สไลด์ 8: Lifting State Up - ยกเก็บข้อมูลขึ้นไป 📤

### **ปัญหา: Component ต้องการแชร์ข้อมูล**

#### **❌ ปัญหา: State แยกกัน**
```jsx
// Component A มี state ของตัวเอง
function ComponentA() {
    const [count, setCount] = useState(0);
    return <div>A: {count} <button onClick={() => setCount(count + 1)}>+</button></div>;
}

// Component B มี state ของตัวเอง
function ComponentB() {
    const [count, setCount] = useState(0);
    return <div>B: {count} <button onClick={() => setCount(count + 1)}>+</button></div>;
}

// ปัญหา: count ของ A และ B ไม่เชื่อมกัน!
```

#### **✅ แก้ไข: ยก State ขึ้นไป Parent**
```jsx
function Parent() {
    const [sharedCount, setSharedCount] = useState(0);
    
    return (
        <div>
            <h2>Count ที่แชร์กัน: {sharedCount}</h2>
            <ComponentA count={sharedCount} setCount={setSharedCount} />
            <ComponentB count={sharedCount} setCount={setSharedCount} />
        </div>
    );
}

function ComponentA({ count, setCount }) {
    return (
        <div>
            A: {count} 
            <button onClick={() => setCount(count + 1)}>A เพิ่ม</button>
        </div>
    );
}

function ComponentB({ count, setCount }) {
    return (
        <div>
            B: {count} 
            <button onClick={() => setCount(count + 2)}>B เพิ่ม 2</button>
        </div>
    );
}
```

### **หลักการ Lifting State Up:**
1. **หา Common Parent** - หา Component แม่ที่ครอบทั้งสอง
2. **ย้าย State ขึ้นไป** - จาก children ไป parent
3. **ส่ง Props ลงมา** - ส่งทั้งค่าและฟังก์ชันเปลี่ยนค่า
4. **เชื่อมโยงกัน** - ทุก Component ใช้ข้อมูลเดียวกัน

### **ตัวอย่างในชีวิตจริง:**
💰 **เงินในครอบครัว** - เก็บที่พ่อแม่ (parent) ลูกๆ (children) ขอเมื่อต้องการ

---

## สไลด์ 9: ตัวอย่างจริง - Shopping Cart 🛒

### **การทำงานของตะกร้าสินค้า:**
```jsx
function ShoppingApp() {
    // State หลักของแอป
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    // ฟังก์ชันเพิ่มสินค้าในตะกร้า
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            // มีอยู่แล้ว เพิ่มจำนวน
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // ไม่มี เพิ่มใหม่
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        
        // อัพเดทราคารวม
        setTotalPrice(totalPrice + product.price);
    };
    
    // ฟังก์ชันลบสินค้าจากตะกร้า
    const removeFromCart = (productId) => {
        const itemToRemove = cartItems.find(item => item.id === productId);
        
        setCartItems(cartItems.filter(item => item.id !== productId));
        setTotalPrice(totalPrice - (itemToRemove.price * itemToRemove.quantity));
    };
    
    return (
        <div className="shopping-app">
            <Header cartCount={cartItems.length} totalPrice={totalPrice} />
            <ProductList onAddToCart={addToCart} />
            <Cart 
                items={cartItems} 
                onRemoveFromCart={removeFromCart}
                totalPrice={totalPrice}
            />
        </div>
    );
}

function Header({ cartCount, totalPrice }) {
    return (
        <header>
            <h1>🛍️ ร้านค้าออนไลน์</h1>
            <div className="cart-info">
                🛒 {cartCount} รายการ | ฿{totalPrice.toLocaleString()}
            </div>
        </header>
    );
}

function ProductList({ onAddToCart }) {
    const products = [
        { id: 1, name: 'เสื้อยืด', price: 299 },
        { id: 2, name: 'กางเกงยีนส์', price: 890 },
        { id: 3, name: 'รองเท้าผ้าใบ', price: 1590 }
    ];
    
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>฿{product.price}</p>
                    <button onClick={() => onAddToCart(product)}>
                        ใส่ตะกร้า
                    </button>
                </div>
            ))}
        </div>
    );
}

function Cart({ items, onRemoveFromCart, totalPrice }) {
    if (items.length === 0) {
        return <div className="cart">ตะกร้าว่าง</div>;
    }
    
    return (
        <div className="cart">
            <h2>🛒 ตะกร้าสินค้า</h2>
            {items.map(item => (
                <div key={item.id} className="cart-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>฿{(item.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => onRemoveFromCart(item.id)}>
                        ลบ
                    </button>
                </div>
            ))}
            <div className="cart-total">
                <strong>รวม: ฿{totalPrice.toLocaleString()}</strong>
            </div>
        </div>
    );
}
```

### **จุดสำคัญ:**
🎯 **State อยู่ที่ ShoppingApp** - Component ระดับสูงสุด  
📤 **ส่ง Props ลงไป** - เพื่อแสดงข้อมูล  
📞 **ส่ง Functions ลงไป** - เพื่อเปลี่ยนแปลง State  
🔄 **Components สื่อสารกัน** - ผ่าน Parent Component

---

## สไลด์ 10: State Updates และ React Re-rendering 🔄

### **เมื่อไหร่ React จะ Re-render?**

#### **✅ สิ่งที่ทำให้ Re-render:**
```jsx
function MyComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('สมชาย');
    
    console.log('Component rendered!'); // จะ log เมื่อ render
    
    return (
        <div>
            <p>Count: {count}, Name: {name}</p>
            
            {/* เมื่อคลิกปุ่มเหล่านี้ จะ re-render */}
            <button onClick={() => setCount(count + 1)}>เพิ่ม Count</button>
            <button onClick={() => setName('สมศรี')}>เปลี่ยนชื่อ</button>
            
            {/* ปุ่มนี้ไม่ทำให้ re-render เพราะค่าเดิม */}
            <button onClick={() => setCount(count)}>Count เดิม</button>
        </div>
    );
}
```

### **State Updates เป็น Asynchronous:**
```jsx
function AsyncExample() {
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
        console.log('ก่อนเปลี่ยน:', count);
        
        setCount(count + 1);
        
        console.log('หลังเปลี่ยน:', count); // ยังเป็นค่าเดิม!
        
        // ถ้าต้องการค่าใหม่ ใช้ callback
        setCount(prevCount => {
            console.log('ค่าใหม่:', prevCount + 1);
            return prevCount + 1;
        });
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>คลิก</button>
        </div>
    );
}
```

### **Multiple State Updates:**
```jsx
function MultipleUpdates() {
    const [count, setCount] = useState(0);
    
    const handleTripleClick = () => {
        // ❌ วิธีผิด: จะเพิ่มแค่ 1 เท่านั้น
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        
        // ✅ วิธีถูก: ใช้ functional update
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleTripleClick}>เพิ่ม 3</button>
        </div>
    );
}
```

### **Best Practices:**
1. **ใช้ Functional Updates** เมื่อต้องการค่าล่าสุด
2. **อย่าพึ่งพา State ทันที** หลังจาก setState
3. **Batch Updates** - React จะรวม setState หลายๆ ตัว
4. **ใช้ useEffect** ถ้าต้องการทำอะไรหลัง State เปลี่ยน

---

## สไลด์ 11: Common Mistakes และ Debugging 🐛

### **ข้อผิดพลาดที่เจอบ่อย:**

#### **1. ❌ Direct State Mutation:**
```jsx
function TodoList() {
    const [todos, setTodos] = useState(['งานแรก']);
    
    const addTodo = () => {
        // ❌ ผิด: เปลี่ยน array โดยตรง
        todos.push('งานใหม่');
        setTodos(todos);
        
        // ✅ ถูก: สร้าง array ใหม่
        setTodos([...todos, 'งานใหม่']);
    };
    
    return (
        <div>
            {todos.map((todo, index) => <div key={index}>{todo}</div>)}
            <button onClick={addTodo}>เพิ่มงาน</button>
        </div>
    );
}
```

#### **2. ❌ การใช้ Objects ใน State:**
```jsx
function UserProfile() {
    const [user, setUser] = useState({
        name: 'สมชาย',
        age: 25,
        city: 'กรุงเทพ'
    });
    
    const updateAge = () => {
        // ❌ ผิด: เปลี่ยน object โดยตรง
        user.age = user.age + 1;
        setUser(user);
        
        // ✅ ถูก: สร้าง object ใหม่
        setUser({
            ...user,
            age: user.age + 1
        });
        
        // ✅ หรือใช้ functional update
        setUser(prevUser => ({
            ...prevUser,
            age: prevUser.age + 1
        }));
    };
    
    return (
        <div>
            <p>{user.name} อายุ {user.age} ปี</p>
            <button onClick={updateAge}>เพิ่มอายุ</button>
        </div>
    );
}
```

#### **3. ❌ Infinite Re-render Loop:**
```jsx
function ProblematicComponent() {
    const [count, setCount] = useState(0);
    
    // ❌ ผิด: เรียก setState ใน render
    setCount(count + 1); // จะทำให้ re-render ไม่สิ้นสุด!
    
    // ✅ ถูก: เรียกใน event handler
    const handleClick = () => {
        setCount(count + 1);
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>เพิ่ม</button>
        </div>
    );
}
```

#### **4. ❌ Missing Key ใน Lists:**
```jsx
function ItemList() {
    const [items, setItems] = useState(['item1', 'item2']);
    
    return (
        <div>
            {items.map(item => (
                // ❌ ผิด: ไม่มี key หรือใช้ index
                <div key={Math.random()}>{item}</div>
                
                // ✅ ถูก: ใช้ unique key
                // <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}
```

### **วิธี Debug:**
```jsx
function DebugComponent() {
    const [count, setCount] = useState(0);
    
    // 1. ใช้ console.log ดู State
    console.log('Current count:', count);
    
    // 2. ใช้ React DevTools
    // ติดตั้ง React Developer Tools Extension
    
    // 3. ตรวจสอบ Event Handler
    const handleClick = () => {
        console.log('Button clicked, count before:', count);
        setCount(count + 1);
        console.log('Button clicked, count after setState:', count); // ยังเป็นค่าเดิม
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>คลิก</button>
        </div>
    );
}
```

---

## สไลด์ 12: Performance และ Optimization 🚀

### **เมื่อไหร่ควร Optimize?**

#### **ปัญหา: Re-render ที่ไม่จำเป็น**
```jsx
function Parent() {
    const [parentCount, setParentCount] = useState(0);
    const [childData, setChildData] = useState('ข้อมูลเด็ก');
    
    return (
        <div>
            <button onClick={() => setParentCount(parentCount + 1)}>
                Parent Count: {parentCount}
            </button>
            
            {/* Child จะ re-render ทุกครั้งที่ Parent re-render 
                แม้ childData ไม่เปลี่ยน! */}
            <ExpensiveChild data={childData} />
        </div>
    );
}

function ExpensiveChild({ data }) {
    console.log('ExpensiveChild rendered!'); // จะ log ทุกครั้ง
    
    // การคำนวณที่หนัก
    const expensiveCalculation = () => {
        console.log('Doing expensive calculation...');
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        return result;
    };
    
    return (
        <div>
            <p>Child Data: {data}</p>
            <p>Expensive Result: {expensiveCalculation()}</p>
        </div>
    );
}
```

#### **แก้ไข: ใช้ React.memo**
```jsx
import React, { memo } from 'react';

// Wrap Component ด้วย memo
const OptimizedChild = memo(function ExpensiveChild({ data }) {
    console.log('OptimizedChild rendered!'); // จะ log เฉพาะเมื่อ data เปลี่ยน
    
    const expensiveCalculation = () => {
        console.log('Doing expensive calculation...');
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += i;
        }
        return result;
    };
    
    return (
        <div>
            <p>Child Data: {data}</p>
            <p>Expensive Result: {expensiveCalculation()}</p>
        </div>
    );
});
```

### **เมื่อไหร่ควรใช้ Optimization:**
✅ **Component ที่คำนวณหนัก**  
✅ **Component ที่ render บ่อย**  
✅ **List ที่มีข้อมูลเยอะ**  

❌ **Component เล็กๆ ธรรมดา**  
❌ **Props เปลี่ยนบ่อย**  

### **Golden Rule:**
*"Premature optimization is the root of all evil"*  
**ทำให้ work ก่อน แล้วค่อย optimize!**

---

## สไลด์ 13: State Patterns ที่ใช้บ่อย 🎨

### **1. Toggle Pattern (เปิด/ปิด):**
```jsx
function ToggleExample() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    return (
        <div className={isDarkMode ? 'dark' : 'light'}>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'ซ่อน' : 'แสดง'} รายละเอียด
            </button>
            
            {isVisible && (
                <div className="details">
                    <p>นี่คือรายละเอียดที่ซ่อนอยู่</p>
                </div>
            )}
            
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด'}
            </button>
        </div>
    );
}
```

### **2. List Management Pattern:**
```jsx
function ListManager() {
    const [items, setItems] = useState(['รายการแรก']);
    const [newItem, setNewItem] = useState('');
    
    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem]);
            setNewItem(''); // ล้าง input
        }
    };
    
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    
    const editItem = (index, newValue) => {
        setItems(items.map((item, i) => 
            i === index ? newValue : item
        ));
    };
    
    return (
        <div>
            <div className="add-item">
                <input 
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="เพิ่มรายการใหม่"
                />
                <button onClick={addItem}>เพิ่ม</button>
            </div>
            
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <span>{item}</span>
                        <button onClick={() => removeItem(index)}>ลบ</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

### **3. Form State Pattern:**
```jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
        
        // ล้าง error เมื่อผู้ใช้เริ่มพิมพ์
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'กรุณากรอกชื่อ';
        }
        
        if (!formData.email.includes('@')) {
            newErrors.email = 'อีเมลไม่ถูกต้อง';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            // ส่งข้อมูล
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('ส่งข้อมูลสำเร็จ!');
            
            // รีเซ็ตฟอร์ม
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            alert('เกิดข้อผิดพลาด!');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type="text"
                    placeholder="ชื่อ"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            
            <div>
                <input 
                    type="email"
                    placeholder="อีเมล"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <div>
                <textarea 
                    placeholder="ข้อความ"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                />
            </div>
            
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
            </button>
        </form>
    );
}
```

---

## สไลด์ 14: State vs Props - เมื่อไหร่ใช้อะไร? 🤔

### **Decision Tree:**

#### **ใช้ State เมื่อ:**
✅ **ข้อมูลเปลี่ยนแปลงได้** ภายใน Component  
✅ **ผู้ใช้โต้ตอบ** - คลิก, พิมพ์, เลือก  
✅ **ข้อมูลชั่วคราว** - form input, toggle states  
✅ **คำนวณใหม่** - counter, timer, calculations  

#### **ใช้ Props เมื่อ:**
✅ **ข้อมูลมาจากข้างนอก** - parent component  
✅ **ข้อมูลคงที่** - configuration, labels  
✅ **แชร์ข้อมูล** - ส่งจาก parent ไป children หลายตัว  
✅ **Reusable Component** - เปลี่ยน behavior ผ่าน props  

### **ตัวอย่างเปรียบเทียบ:**

#### **Counter Component:**
```jsx
// ใช้ State - เพราะ count เปลี่ยนแปลงใน Component นี้
function Counter() {
    const [count, setCount] = useState(0); // State!
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}
```

#### **Display Component:**
```jsx
// ใช้ Props - เพราะข้อมูลมาจากข้างนอก
function ScoreDisplay({ playerName, score, level }) { // Props!
    return (
        <div>
            <h2>{playerName}</h2>
            <p>Score: {score}</p>
            <p>Level: {level}</p>
        </div>
    );
}
```

#### **Mixed Example:**
```jsx
function GameComponent() {
    // State - เพราะเปลี่ยนแปลงใน Component นี้
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    
    // Props - ส่งลงไปให้ child components
    return (
        <div>
            <ScoreDisplay 
                playerName="สมชาย"  // Props - ข้อมูลคงที่
                score={score}       // Props - แต่มาจาก State
                level={level}       // Props - แต่มาจาก State
            />
            <GameControls 
                onScoreChange={setScore}  // Props - function
                onLevelUp={setLevel}      // Props - function
            />
        </div>
    );
}
```

### **แนวคิด:**
🏠 **State = ของส่วนตัวในบ้าน**  
📬 **Props = จดหมายที่ส่งมาจากข้างนอก**

---

## สไลด์ 15: Multiple States และการจัดการ 📊

### **หลายๆ State ใน Component เดียว:**
```jsx
function UserDashboard() {
    // States ต่างๆ ที่เกี่ยวข้องกัน
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [settings, setSettings] = useState({
        theme: 'light',
        language: 'th',
        notifications: true
    });
    
    // ฟังก์ชันโหลดข้อมูลผู้ใช้
    const loadUserData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // จำลองการเรียก API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const userData = {
                name: 'สมชาย ใจดี',
                email: 'somchai@email.com',
                avatar: 'avatar.jpg'
            };
            
            setUser(userData);
            setNotifications([
                'ยินดีต้อนรับกลับมา!',
                'คุณมีข้อความใหม่ 3 ข้อความ'
            ]);
        } catch (err) {
            setError('ไม่สามารถโหลดข้อมูลได้');
        } finally {
            setIsLoading(false);
        }
    };
    
    // เริ่มโหลดข้อมูลเมื่อ component ถูกสร้าง
    React.useEffect(() => {
        loadUserData();
    }, []);
    
    // แสดง Loading State
    if (isLoading) {
        return <div className="loading">กำลังโหลด...</div>;
    }
    
    // แสดง Error State
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={loadUserData}>ลองใหม่</button>
            </div>
        );
    }
    
    // แสดงข้อมูลปกติ
    return (
        <div className={`dashboard ${settings.theme}`}>
            {/* User Info */}
            <div className="user-info">
                <img src={user?.avatar} alt={user?.name} />
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
            </div>
            
            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="notifications">
                    <h3>การแจ้งเตือน</h3>
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification">
                            {notification}
                        </div>
                    ))}
                </div>
            )}
            
            {/* Settings */}
            <div className="settings">
                <h3>การตั้งค่า</h3>
                <label>
                    ธีม:
                    <select 
                        value={settings.theme}
                        onChange={(e) => setSettings({
                            ...settings,
                            theme: e.target.value
                        })}
                    >
                        <option value="light">สว่าง</option>
                        <option value="dark">มืด</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
```

### **เคล็ดลับการจัดการ Multiple States:**
1. **แยก State ตาม Concern** - user data, UI state, form data
2. **ใช้ Object สำหรับข้อมูลเกี่ยวข้อง** - settings object
3. **State Machines** - loading → success → error
4. **Custom Hooks** (ขั้นสูง) - แยก logic ออกไป

---

## สไลด์ 16: Lab 3.3 Preview - Counter Game 🎮

### **เตรียมตัวสำหรับ Lab สุดท้าย!**

#### **สิ่งที่จะทำใน Lab 3.3:**
```jsx
// ตัวอย่างของเกมนับคะแนนที่จะสร้าง
function CounterGame() {
    // หลายๆ States ทำงานร่วมกัน
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameActive, setIsGameActive] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    
    // ฟังก์ชันเริ่มเกม
    const startGame = () => {
        setIsGameActive(true);
        setScore(0);
        setLevel(1);
        setTimeLeft(30);
        setMultiplier(1);
    };
    
    // ฟังก์ชันเพิ่มคะแนน
    const addScore = (points) => {
        const newScore = score + (points * multiplier);
        setScore(newScore);
        
        // เช็คเลเวลอัพ
        if (newScore > level * 100) {
            setLevel(level + 1);
            setMultiplier(multiplier + 0.5);
        }
        
        // อัพเดท High Score
        if (newScore > highScore) {
            setHighScore(newScore);
        }
    };
    
    return (
        <div className="counter-game">
            <GameStats 
                score={score}
                level={level}
                timeLeft={timeLeft}
                highScore={highScore}
                multiplier={multiplier}
            />
            
            <GameControls 
                isGameActive={isGameActive}
                onStart={startGame}
                onAddScore={addScore}
            />
            
            <GameTimer 
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                isActive={isGameActive}
                onTimeUp={() => setIsGameActive(false)}
            />
        </div>
    );
}
```

### **ทักษะที่จะได้เรียนรู้:**
🎯 **Multiple State Management** - จัดการหลายๆ state พร้อมกัน  
⏱️ **Timer Logic** - setInterval และ useEffect  
🎮 **Game Logic** - คะแนน, เลเวล, multiplier  
📊 **Real-time Updates** - อัพเดทข้อมูลทุกวินาที  
🏆 **Local Storage** - บันทึก high score  

### **Components ที่จะสร้าง:**
- **GameStats** - แสดงสถิติเกม
- **GameControls** - ปุ่มควบคุมเกม  
- **GameTimer** - นับเวลาถอยหลัง
- **ScoreButton** - ปุ่มเพิ่มคะแนน
- **HighScoreBoard** - แสดงคะแนนสูงสุด

---

## สไลด์ 17: State Best Practices 💎

### **1. Keep State Minimal และ DRY:**
```jsx
// ❌ Redundant State
function UserComponent() {
    const [firstName, setFirstName] = useState('สมชาย');
    const [lastName, setLastName] = useState('ใจดี');
    const [fullName, setFullName] = useState('สมชาย ใจดี'); // ไม่จำเป็น!
    
    return <div>{fullName}</div>;
}

// ✅ Computed State
function UserComponent() {
    const [firstName, setFirstName] = useState('สมชาย');
    const [lastName, setLastName] = useState('ใจดี');
    
    // คำนวณจาก state ที่มี
    const fullName = `${firstName} ${lastName}`;
    
    return <div>{fullName}</div>;
}
```

### **2. State Structure ที่ดี:**
```jsx
// ❌ Flat Structure
function TodoApp() {
    const [todoTexts, setTodoTexts] = useState(['งานแรก']);
    const [todoCompleted, setTodoCompleted] = useState([false]);
    const [todoIds, setTodoIds] = useState([1]);
    // ยาก maintain และ sync!
}

// ✅ Normalized Structure
function TodoApp() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'งานแรก', completed: false }
    ]);
    // ง่าย maintain และ sync!
}
```

### **3. State Updates Pattern:**
```jsx
function ShoppingCart() {
    const [items, setItems] = useState([]);
    
    // ✅ ใช้ Functional Updates
    const addItem = (newItem) => {
        setItems(prevItems => [...prevItems, newItem]);
    };
    
    const removeItem = (itemId) => {
        setItems(prevItems => 
            prevItems.filter(item => item.id !== itemId)
        );
    };
    
    const updateItemQuantity = (itemId, newQuantity) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId 
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };
    
    return (
        // JSX...
    );
}
```

### **4. State Organization:**
```jsx
// ✅ แยก State ตามหน้าที่
function ComplexComponent() {
    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Data State  
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    
    // Error State
    const [errors, setErrors] = useState({});
    
    // ...
}
```

### **5. When to Lift State Up:**
```jsx
// เมื่อ 2+ components ต้องการข้อมูลเดียวกัน
function App() {
    const [currentUser, setCurrentUser] = useState(null);
    
    return (
        <div>
            {/* Header ต้องการ user เพื่อแสดงชื่อ */}
            <Header user={currentUser} />
            
            {/* Profile ต้องการ user เพื่อแสดงข้อมูล */}
            <Profile user={currentUser} />
            
            {/* Settings ต้องการ user เพื่อแก้ไข */}
            <Settings user={currentUser} onUserUpdate={setCurrentUser} />
        </div>
    );
}
```

---

## สไลด์ 18: Common Use Cases - ใช้ State ทำอะไรได้บ้าง? 🛠️

### **1. Form Handling:**
```jsx
function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await login(credentials);
            // redirect to dashboard
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                })}
            />
            <button disabled={isSubmitting}>
                {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
        </form>
    );
}
```

### **2. Real-time Search:**
```jsx
function SearchableList({ items }) {
    const [searchQuery, setSearchQuery] = useState('');
    
    // กรองข้อมูลตาม search query
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div>
            <input 
                type="text"
                placeholder="ค้นหา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="search-results">
                {filteredItems.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
            
            {filteredItems.length === 0 && searchQuery && (
                <p>ไม่พบข้อมูลสำหรับ "{searchQuery}"</p>
            )}
        </div>
    );
}
```

### **3. Modal/Dialog Management:**
```jsx
function ModalExample() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    
    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };
    
    return (
        <div>
            <button onClick={() => openModal('ข้อความในโมดัล')}>
                เปิดโมดัล
            </button>
            
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <p>{modalContent}</p>
                        <button onClick={closeModal}>ปิด</button>
                    </div>
                </div>
            )}
        </div>
    );
}
```

### **4. Theme Management:**
```jsx
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prevTheme => 
            prevTheme === 'light' ? 'dark' : 'light'
        );
    };
    
    return (
        <div className={`app-container ${theme}`}>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
                {theme === 'light' ? 'โหมดมืด' : 'โหมดสว่าง'}
            </button>
            <div className="content">
                {children}
            </div>
        </div>
    );
}
```

### **5. Loading States:**
```jsx
function DataFetcher() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <button onClick={fetchData} disabled={isLoading}>
                โหลดข้อมูล
            </button>
            
            {isLoading && <div>กำลังโหลด...</div>}
            {error && <div className="error">{error}</div>}
            {data && <div className="data">{JSON.stringify(data)}</div>}
        </div>
    );
}
```

---

## สไลด์ 19: State vs Local Storage - เก็บข้อมูลที่ไหน? 💾

### **เปรียบเทียบ State กับ Local Storage:**

| State | Local Storage |
|-------|---------------|
| 💭 **ในหน่วยความจำ** | 💾 **ในเบราว์เซอร์** |
| ⚡ **หายเมื่อรีเฟรช** | 🔒 **คงอยู่เมื่อรีเฟรช** |
| 🚀 **เร็ว** | 🐌 **ช้ากว่า** |
| 🔄 **อัพเดท UI อัตโนมัติ** | ✋ **ต้องอัพเดท UI เอง** |

### **เมื่อไหร่ใช้อะไร?**

#### **ใช้ State เมื่อ:**
✅ **ข้อมูลชั่วคราว** - form input, current page  
✅ **UI interactions** - modal open/close, hover states  
✅ **คำนวณแบบ real-time** - search results, counters  
✅ **ความเร็วสำคัญ** - animations, frequent updates  

#### **ใช้ Local Storage เมื่อ:**
✅ **ข้อมูลถาวร** - user preferences, high scores  
✅ **Cross-session data** - shopping cart, saved drafts  
✅ **Settings** - theme, language, layout preferences  
✅ **Offline data** - cached content  

### **การใช้งานร่วมกัน:**
```jsx
function PersistentCounter() {
    // โหลดค่าเริ่มต้นจาก localStorage
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem('counter');
        return saved ? parseInt(saved) : 0;
    });
    
    // อัพเดท localStorage เมื่อ state เปลี่ยน
    const updateCount = (newCount) => {
        setCount(newCount);
        localStorage.setItem('counter', newCount.toString());
    };
    
    return (
        <div>
            <p>Counter: {count}</p>
            <button onClick={() => updateCount(count + 1)}>+</button>
            <button onClick={() => updateCount(count - 1)}>-</button>
            <button onClick={() => updateCount(0)}>Reset</button>
            <p><small>ค่านี้จะถูกบันทึกแม้รีเฟรชหน้า</small></p>
        </div>
    );
}
```

### **Custom Hook สำหรับ Persistent State:**
```jsx
// Hook ที่ใช้ State + localStorage ร่วมกัน
function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    });
    
    const setStoredValue = (newValue) => {
        setValue(newValue);
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    };
    
    return [value, setStoredValue];
}

// การใช้งาน
function Settings() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [language, setLanguage] = useLocalStorage('language', 'th');
    
    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme ({theme})
            </button>
            <button onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}>
                Toggle Language ({language})
            </button>
        </div>
    );
}
```

---

## สไลด์ 20: สรุปและเตรียมตัวต่อ 🎓

### **สิ่งที่เราได้เรียนรู้ในหัวข้อนี้:**

#### **State Fundamentals:**
✅ **useState Hook** - เก็บและเปลี่ยนแปลงข้อมูล  
✅ **State Types** - number, string, boolean, array, object  
✅ **Event Handling** - onClick, onChange, onSubmit  
✅ **Controlled Components** - form inputs ที่ควบคุมด้วย state  

#### **Advanced Concepts:**
✅ **Lifting State Up** - แชร์ข้อมูลระหว่าง components  
✅ **Multiple States** - จัดการหลาย states ใน component เดียว  
✅ **State Patterns** - toggle, list management, form handling  
✅ **Performance** - เมื่อไหร่ควร optimize  

#### **Best Practices:**
✅ **Immutable Updates** - ไม่เปลี่ยน state โดยตรง  
✅ **Functional Updates** - ใช้ prevState เมื่อจำเป็น  
✅ **State Organization** - แยกตามหน้าที่ความรับผิดชอบ  
✅ **Common Mistakes** - และวิธีหลีกเลี่ยง  

### **การเปลี่ยนแปลงที่เกิดขึ้น:**
**เมื่อเช้า:** Components ที่แสดงข้อมูลคงที่  
**ตอนนี้:** Interactive Applications ที่ตอบสนองผู้ใช้!  

### **ทักษะที่พัฒนาขึ้น:**
🎮 **Interactive Thinking** - คิดในแง่การโต้ตอบ  
🧠 **State Management** - จัดการข้อมูลที่เปลี่ยนแปลง  
🔄 **Event-driven Programming** - การเขียนโปรแกรมแบบ event  
🎯 **User Experience** - ใส่ใจประสบการณ์ผู้ใช้  

### **ตัวอย่างโปรเจคที่ทำได้แล้ว:**
- 🎮 **เกมง่ายๆ** - Snake, Tic-tac-toe, Memory Game  
- 📝 **แอป Todo List** - เพิ่ม ลบ แก้ไขงาน  
- 🛒 **Shopping Cart** - เพิ่มสินค้า คำนวณราคา  
- 📊 **Dashboard** - แสดงข้อมูลแบบ real-time  
- 🎨 **Drawing App** - วาดรูปด้วย canvas  

### **Lab 3.3 กำลังรอ:**
🎯 **Counter Game** - เกมนับคะแนนแบบ interactive  
⏱️ **Timer System** - นับเวลาถอยหลัง  
🏆 **High Score** - บันทึกคะแนนสูงสุด  
🎮 **Game States** - เริ่ม เล่น จบ  
📊 **Real-time Stats** - แสดงสถิติขณะเล่น  

### **ความพร้อมสำหรับขั้นต่อไป:**
📚 **Node.js & Backend** - สร้างเซิร์ฟเวอร์  
🌐 **API Integration** - เชื่อมต่อกับ backend  
🔄 **Data Flow** - การไหลของข้อมูลในแอปใหญ่  
🚀 **Full-stack Applications** - แอปที่สมบูรณ์  

### **คำถามสำคัญก่อนไปต่อ:**
*"คุณสามารถสร้าง Component ที่ตอบสนองผู้ใช้ได้แล้วหรือยัง?"*  
*"คุณเข้าใจการทำงานของ State และ Props แล้วหรือยัง?"*  
*"คุณพร้อมที่จะสร้างแอปพลิเคชันจริงแล้วหรือยัง?"*

**ถ้าคำตอบคือใช่ ยินดีด้วย! คุณพร้อมเป็น Full-stack Developer แล้ว! 🚀**

### **เป้าหมายสุดท้าย:**
*"จาก Static Web Pages → Interactive React Applications!"*

---

## พักเบรก 15 นาที ☕

### **เตรียมพร้อมสำหรับ Lab 3.3:**
🎮 **Counter Game** ที่ใช้ทุกเทคนิคที่เรียนมา  
⚡ **useState** สำหรับ score, level, timer  
🎯 **Event Handling** สำหรับการควบคุมเกม  
🔄 **Multiple States** ทำงานร่วมกัน  
📊 **Real-time Updates** แสดงข้อมูลทุกวินาที  

### **หลังจากนี้:**
🌟 **Node.js** - JavaScript บนเซิร์ฟเวอร์  
📡 **API Development** - สร้าง backend  
🔗 **Frontend-Backend Integration** - เชื่อมต่อทุกอย่าง  

**มาสร้างเกมกันเถอะ! 🎉**