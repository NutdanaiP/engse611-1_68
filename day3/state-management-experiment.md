# 📖 คู่มือ React State Management Examples
## สำหรับการเรียน ENGSE611 - หัวข้อที่ 3: State Management เบื้องต้น

---

## 🎯 จุดประสงค์ของ Project นี้

### เป้าหมายการเรียนรู้:
1. **เข้าใจ useState Hook** - การเก็บและเปลี่ยนแปลงข้อมูลใน React
2. **เข้าใจ Re-rendering** - การอัพเดทหน้าจอเมื่อ State เปลี่ยน
3. **การจัดการ State หลายประเภท** - ตัวเลข, ข้อความ, Array, Object
4. **State กับ User Interaction** - การตอบสนองต่อการคลิก, พิมพ์
5. **Best Practices** - การเขียน State ที่ดี

---

## 📁 โครงสร้าง Project และไฟล์

### 1. ไฟล์ package.json
```json
{
  "name": "react-state-examples",
  "version": "1.0.0",
  "description": "ตัวอย่าง State Management สำหรับ ENGSE611",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0"
  }
}
```

**จุดประสงค์:** กำหนด dependencies และ scripts สำหรับ project

---

### 2. ไฟล์ src/index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**จุดประสงค์:** Entry point ของ React app, เชื่อม App component กับ DOM

---

### 3. ไฟล์ src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

**จุดประสงค์:** Global CSS, เพิ่ม Tailwind CSS และ styling พื้นฐาน

---

### 4. ไฟล์ src/App.js - Main Component
```jsx
import React, { useState } from 'react';
import './App.css';

// Import ตัวอย่างทั้งหมด
import BasicCounter from './components/BasicCounter';
import NameChanger from './components/NameChanger';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import SimpleCalculator from './components/SimpleCalculator';
import CounterGame from './components/CounterGame';

function App() {
  // State สำหรับเลือกตัวอย่างที่จะแสดง
  const [activeExample, setActiveExample] = useState('counter');

  // ข้อมูลตัวอย่างทั้งหมด
  const examples = [
    {
      id: 'counter',
      title: '1. ตัวนับพื้นฐาน',
      description: 'เรียนรู้ useState เบื้องต้น',
      component: <BasicCounter />
    },
    {
      id: 'name',
      title: '2. การเปลี่ยนชื่อ',
      description: 'State กับ text input',
      component: <NameChanger />
    },
    {
      id: 'color',
      title: '3. เปลี่ยนสีพื้นหลัง',
      description: 'State เปลี่ยน UI',
      component: <ColorPicker />
    },
    {
      id: 'todo',
      title: '4. รายการงาน',
      description: 'Array State Management',
      component: <TodoList />
    },
    {
      id: 'calculator',
      title: '5. เครื่องคิดเลข',
      description: 'Multiple States',
      component: <SimpleCalculator />
    },
    {
      id: 'game',
      title: '6. เกมนับคะแนน',
      description: 'Complex State Logic',
      component: <CounterGame />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            🎓 React State Management Examples
          </h1>
          <p className="text-center text-gray-600 mt-2">
            ตัวอย่างประกอบการเรียน - หัวข้อที่ 3: State Management เบื้องต้น
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4">เลือกตัวอย่าง:</h3>
              {examples.map(example => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={`w-full text-left p-3 mb-2 rounded-lg transition-all ${
                    activeExample === example.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{example.title}</div>
                  <div className="text-sm opacity-75">{example.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {examples.find(ex => ex.id === activeExample)?.component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

**จุดประสงค์:** 
- เป็น Main Component ที่รวมตัวอย่างทั้งหมด
- ใช้ State เพื่อเลือกแสดงตัวอย่างต่างๆ
- แสดงการใช้ Navigation กับ State

---

## 🧮 Components ตัวอย่าง

### 1. src/components/BasicCounter.jsx
```jsx
import React, { useState } from 'react';

function BasicCounter() {
  // State เก็บค่าตัวเลข
  const [count, setCount] = useState(0);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        ตัวนับพื้นฐาน (useState)
      </h2>
      
      {/* แสดงค่า count */}
      <div className="text-6xl font-bold mb-8 text-gray-800">
        {count}
      </div>
      
      {/* ปุ่มควบคุม */}
      <div className="space-x-4 mb-6">
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          ลด (-1)
        </button>
        
        <button 
          onClick={() => setCount(0)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          รีเซ็ต
        </button>
        
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          เพิ่ม (+1)
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>State:</strong> count = {count}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          คลิกปุ่ม → setCount() → Re-render → แสดงค่าใหม่
        </p>
      </div>
    </div>
  );
}

export default BasicCounter;
```

**จุดประสงค์การเรียนรู้:**
- **useState เบื้องต้น**: การประกาศและใช้ state
- **State Update**: การเปลี่ยนแปลงค่า state ด้วย setter function
- **Re-rendering**: เข้าใจว่าเมื่อ state เปลี่ยน component จะ render ใหม่
- **Event Handling**: การจัดการ onClick event

**การทำงาน:**
1. `useState(0)` - สร้าง state ชื่อ count ค่าเริ่มต้น 0
2. `setCount(count + 1)` - เพิ่มค่า count
3. React จะ re-render component เมื่อ state เปลี่ยน
4. หน้าจอแสดงค่าใหม่ทันที

---

### 2. src/components/NameChanger.jsx
```jsx
import React, { useState } from 'react';

function NameChanger() {
  // State เก็บชื่อที่ผู้ใช้พิมพ์
  const [name, setName] = useState('');

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">
        การเปลี่ยนข้อความ (Text State)
      </h2>
      
      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          พิมพ์ชื่อของคุณ:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      {/* แสดงผลการทักทาย */}
      <div className="text-center bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-2xl font-bold">
          {name ? (
            <span className="text-purple-600">สวัสดี {name}! 👋</span>
          ) : (
            <span className="text-gray-400">กรุณาพิมพ์ชื่อของคุณ...</span>
          )}
        </h3>
      </div>
      
      {/* ปุ่มล้างข้อมูล */}
      <div className="text-center mb-6">
        <button
          onClick={() => setName('')}
          disabled={!name}
          className={`px-4 py-2 rounded-lg font-medium ${
            name 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ล้างชื่อ
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>State:</strong> name = "{name}"
        </p>
        <p className="text-sm">
          <strong>ความยาว:</strong> {name.length} ตัวอักษร
        </p>
        <p className="text-xs text-gray-600 mt-1">
          พิมพ์ → onChange → setName() → Re-render
        </p>
      </div>
    </div>
  );
}

export default NameChanger;
```

**จุดประสงค์การเรียนรู้:**
- **Text Input State**: การจัดการ string ใน state
- **Controlled Components**: input ที่ค่าถูกควบคุมโดย React
- **onChange Event**: การอัพเดท state เมื่อผู้ใช้พิมพ์
- **Conditional Rendering**: แสดงเนื้อหาต่างกันตาม state

**การทำงาน:**
1. `value={name}` - ค่าใน input มาจาก state
2. `onChange={(e) => setName(e.target.value)}` - อัพเดท state เมื่อพิมพ์
3. Conditional rendering แสดงข้อความต่างกันตามค่า name
4. Button disabled เมื่อ name ว่าง

---

### 3. src/components/ColorPicker.jsx
```jsx
import React, { useState } from 'react';

function ColorPicker() {
  // State เก็บสีที่เลือก
  const [selectedColor, setSelectedColor] = useState('blue');

  // ข้อมูลสีที่ใช้ได้
  const colors = [
    { name: 'ฟ้า', value: 'blue', bg: 'bg-blue-100', button: 'bg-blue-500' },
    { name: 'เขียว', value: 'green', bg: 'bg-green-100', button: 'bg-green-500' },
    { name: 'ชมพู', value: 'pink', bg: 'bg-pink-100', button: 'bg-pink-500' },
    { name: 'เหลือง', value: 'yellow', bg: 'bg-yellow-100', button: 'bg-yellow-500' },
    { name: 'ม่วง', value: 'purple', bg: 'bg-purple-100', button: 'bg-purple-500' },
  ];

  // หาข้อมูลสีปัจจุบัน
  const currentColor = colors.find(color => color.value === selectedColor);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
        เปลี่ยนสีพื้นหลัง (State + UI)
      </h2>
      
      {/* พื้นที่แสดงสีที่เลือก */}
      <div className={`${currentColor?.bg} border-2 border-gray-300 rounded-lg p-8 mb-6 text-center transition-all duration-300`}>
        <div className="text-3xl mb-2">🎨</div>
        <div className="text-xl font-bold text-gray-800">
          สีที่เลือก: {currentColor?.name}
        </div>
      </div>
      
      {/* ปุ่มเลือกสี */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">เลือกสีที่ต้องการ:</p>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`${color.button} hover:opacity-80 text-white px-4 py-2 rounded-lg font-medium transition-all ${
                selectedColor === color.value ? 'ring-2 ring-gray-400 scale-105' : ''
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* ปุ่มสุ่มสี */}
      <div className="text-center mb-6">
        <button
          onClick={() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setSelectedColor(randomColor.value);
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          🎲 สุ่มสี
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>State:</strong> selectedColor = "{selectedColor}"
        </p>
        <p className="text-sm">
          <strong>CSS Class:</strong> {currentColor?.bg}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          คลิกสี → setSelectedColor() → เปลี่ยน className
        </p>
      </div>
    </div>
  );
}

export default ColorPicker;
```

**จุดประสงค์การเรียนรู้:**
- **State เปลี่ยน UI**: การใช้ state ควบคุม appearance
- **Dynamic CSS Classes**: เปลี่ยน className ตาม state
- **Array Methods**: การใช้ find(), map() กับข้อมูล
- **Random Selection**: การสุ่มค่าและอัพเดท state

**การทำงาน:**
1. `selectedColor` state เก็บชื่อสีปัจจุบัน
2. `colors.find()` หาข้อมูลสีที่ตรงกับ state
3. `${currentColor?.bg}` เปลี่ยน CSS class ตาม state
4. `Math.random()` สุ่มสีและอัพเดท state

---

### 4. src/components/TodoList.jsx
```jsx
import React, { useState } from 'react';

function TodoList() {
  // State เก็บรายการงาน (Array of Objects)
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียน React.js', completed: false },
    { id: 2, text: 'ทำการบ้าน HTML', completed: true },
    { id: 3, text: 'ดู YouTube CSS', completed: false }
  ]);

  // State เก็บข้อความใหม่
  const [newTodo, setNewTodo] = useState('');

  // ฟังก์ชันเพิ่มงานใหม่
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, { 
        id: newId, 
        text: newTodo.trim(), 
        completed: false 
      }]);
      setNewTodo('');
    }
  };

  // ฟังก์ชันลบงาน
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // ฟังก์ชันเปลี่ยนสถานะงาน
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // คำนวณสถิติ
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
        รายการงาน (Array State)
      </h2>

      {/* สถิติ */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-gray-600">งานทั้งหมด</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">เสร็จแล้ว</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</div>
            <div className="text-sm text-gray-600">ยังไม่เสร็จ</div>
          </div>
        </div>
      </div>
      
      {/* ฟอร์มเพิ่มงาน */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="เพิ่มงานใหม่..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={addTodo}
          disabled={!newTodo.trim()}
          className={`px-4 py-3 rounded-lg font-medium ${
            newTodo.trim()
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          เพิ่ม
        </button>
      </div>
      
      {/* รายการงาน */}
      <div className="space-y-2 mb-6">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>Array State:</strong> todos.length = {todos.length}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          เพิ่ม → [...todos, newItem] | ลบ → filter() | แก้ไข → map()
        </p>
      </div>
    </div>
  );
}

export default TodoList;
```

**จุดประสงค์การเรียนรู้:**
- **Array State Management**: การจัดการ array ใน state
- **CRUD Operations**: Create, Read, Update, Delete
- **Array Methods**: filter(), map(), spread operator
- **Object Updates**: การแก้ไข object ใน array
- **Computed Values**: การคำนวณค่าจาก state

**การทำงาน:**
1. `todos` เป็น array ของ objects
2. `setTodos([...todos, newItem])` เพิ่ม item ใหม่
3. `todos.filter()` ลบ item ที่ไม่ต้องการ
4. `todos.map()` แก้ไข item ที่เลือก
5. คำนวณสถิติจาก state

---

### 5. src/components/SimpleCalculator.jsx
```jsx
import React, { useState } from 'react';

function SimpleCalculator() {
  // Multiple States ทำงานร่วมกัน
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // ฟังก์ชันคำนวณ
  const calculate = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    
    if (isNaN(num1) || isNaN(num2)) {
      alert('กรุณาใส่ตัวเลขที่ถูกต้อง');
      return;
    }

    let calcResult;
    switch (operator) {
      case '+':
        calcResult = num1 + num2;
        break;
      case '-':
        calcResult = num1 - num2;
        break;
      case '*':
        calcResult = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          alert('ไม่สามารถหารด้วย 0 ได้');
          return;
        }
        calcResult = num1 / num2;
        break;
      default:
        return;
    }

    setResult(calcResult);
    
    // เพิ่มลงประวัติ
    const calculation = `${num1} ${operator} ${num2} = ${calcResult}`;
    setHistory([calculation, ...history.slice(0, 4)]); // เก็บแค่ 5 รายการล่าสุด
  };

  // ฟังก์ชันล้างข้อมูล
  const clear = () => {
    setNumber1('');
    setNumber2('');
    setOperator('+');
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
        เครื่องคิดเลข (Multiple States)
      </h2>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="ตัวเลขที่ 1"
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl"
        />

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl"
        >
          <option value="+">+ บวก</option>
          <option value="-">- ลบ</option>
          <option value="*">× คูณ</option>
          <option value="/">÷ หาร</option>
        </select>

        <input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          placeholder="ตัวเลขที่ 2"
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={calculate}
          disabled={!number1 || !number2}
          className={`py-3 rounded-lg font-bold text-xl ${
            number1 && number2
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          คำนวณ
        </button>

        <button
          onClick={clear}
          className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-bold text-xl"
        >
          ล้าง
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">ผลลัพธ์:</div>
            <div className="text-3xl font-bold text-green-600">
              {result.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-800">ประวัติการคำนวณ:</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-700"
            >
              ล้างประวัติ
            </button>
          </div>
          <div className="space-y-1">
            {history.map((calc, index) => (
              <div key={index} className="text-sm text-blue-700 font-mono">
                {calc}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Debug Info */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>States:</strong>
        </p>
        <ul className="text-xs text-gray-600 mt-1 space-y-1">
          <li>number1 = "{number1}"</li>
          <li>number2 = "{number2}"</li>
          <li>operator = "{operator}"</li>
          <li>result = {result}</li>
          <li>history.length = {history.length}</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          หลาย States ทำงานร่วมกัน + Validation + History
        </p>
      </div>
    </div>
  );
}

export default SimpleCalculator;
```

**จุดประสงค์การเรียนรู้:**
- **Multiple States**: การจัดการหลาย state พร้อมกัน
- **State Dependencies**: state ที่ขึ้นกับ state อื่น
- **Input Validation**: การตรวจสอบข้อมูลก่อนประมวลผล
- **Conditional Rendering**: แสดงผลตามเงื่อนไข
- **Array State History**: เก็บประวัติการทำงาน

**การทำงาน:**
1. 5 states ทำงานร่วมกัน: number1, number2, operator, result, history
2. Validation ตรวจสอบข้อมูลก่อนคำนวณ
3. `switch` statement ประมวลผลตาม operator
4. History array เก็บประวัติการคำนวณ
5. Conditional rendering แสดงผลเมื่อมีข้อมูล

---

### 6. src/components/CounterGame.jsx
```jsx
import React, { useState, useEffect } from 'react';

function CounterGame() {
  // Game States
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [clickStreak, setClickStreak] = useState(0);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // ฟังก์ชันเริ่มเกม
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setMultiplier(1);
    setClickStreak(0);
    setIsGameActive(true);
  };

  // ฟังก์ชันเพิ่มคะแนน
  const addScore = (points) => {
    if (!isGameActive) return;

    const newScore = score + (points * multiplier);
    const newStreak = clickStreak + 1;
    
    setScore(newScore);
    setClickStreak(newStreak);

    // เลเวลอัพ
    const newLevel = Math.floor(newScore / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setMultiplier(1 + (newLevel - 1) * 0.5);
    }

    // Streak bonus
    if (newStreak % 10 === 0) {
      setScore(prev => prev + 50); // Bonus!
    }

    // อัพเดท High Score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  // จบเกม
  const endGame = () => {
    setIsGameActive(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">
        เกมนับคะแนน (Complex State Logic)
      </h2>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-gray-600">คะแนน</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{highScore}</div>
          <div className="text-sm text-gray-600">คะแนนสูงสุด</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">Lv.{level}</div>
          <div className="text-sm text-gray-600">เลเวล</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{timeLeft}s</div>
          <div className="text-sm text-gray-600">เวลาเหลือ</div>
        </div>
      </div>

      {/* Multiplier & Streak */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-yellow-600">×{multiplier.toFixed(1)}</div>
          <div className="text-xs text-gray-600">ตัวคูณ</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-red-600">{clickStreak}</div>
          <div className="text-xs text-gray-600">คลิกต่อเนื่อง</div>
        </div>
      </div>

      {/* Game Controls */}
      {!isGameActive ? (
        <div className="text-center mb-6">
          <button
            onClick={startGame}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-xl"
          >
            🎮 เริ่มเกม
          </button>
          {score > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-bold">เกมจบแล้ว!</p>
              <p>คะแนนรวม: <span className="text-purple-600 font-bold">{score}</span></p>
              <p>เลเวลสูงสุด: <span className="text-green-600 font-bold">{level}</span></p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => addScore(1)}
              className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg"
            >
              +1 คะแนน
            </button>
            <button
              onClick={() => addScore(5)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold text-lg"
            >
              +5 คะแนน
            </button>
          </div>
          <button
            onClick={() => addScore(10)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-bold text-lg"
          >
            +10 คะแนน (โบนัส!)
          </button>
          <button
            onClick={endGame}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
          >
            หยุดเกม
          </button>
        </div>
      )}

      {/* Game Rules */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-2">📖 กติกา:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• คลิกปุ่มเพื่อเก็บคะแนนภายใน 30 วินาที</li>
          <li>• ทุก 100 คะแนน = เลเวลอัพ + ตัวคูณเพิ่ม</li>
          <li>• คลิกต่อเนื่อง 10 ครั้ง = โบนัส 50 คะแนน</li>
          <li>• พยายามทำคะแนนสูงสุด!</li>
        </ul>
      </div>

      {/* State Debug Info */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm font-bold mb-2">🔧 Complex States:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>score: {score}</div>
          <div>level: {level}</div>
          <div>timeLeft: {timeLeft}</div>
          <div>isGameActive: {isGameActive.toString()}</div>
          <div>multiplier: {multiplier}</div>
          <div>clickStreak: {clickStreak}</div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Timer + Conditions + State Machine + useEffect
        </p>
      </div>
    </div>
  );
}

export default CounterGame;
```

**จุดประสงค์การเรียนรู้:**
- **Complex State Logic**: การจัดการ state ที่ซับซ้อน
- **useEffect Hook**: การทำงานกับ side effects
- **Timer Management**: การจัดการเวลาด้วย setInterval
- **State Dependencies**: state ที่เกี่ยวข้องกัน
- **Game Logic**: เงื่อนไข level up, bonus, scoring
- **Cleanup Functions**: การล้าง timer เมื่อ component unmount

**การทำงาน:**
1. 7 states ทำงานร่วมกันสร้างเกม
2. `useEffect` จัดการ timer countdown
3. State dependencies: score → level → multiplier
4. Conditional logic สำหรับ bonus และ level up
5. Cleanup function ป้องกัน memory leaks

---

## 🎓 สรุปแนวคิดการเรียนรู้

### 1. ระดับเริ่มต้น (BasicCounter, NameChanger)
- **useState เบื้องต้น**: การประกาศและใช้งาน
- **Re-rendering**: เข้าใจการอัพเดทหน้าจอ
- **Event Handling**: onClick, onChange
- **Controlled Components**: input ที่ควบคุมด้วย React

### 2. ระดับกลาง (ColorPicker, TodoList)
- **State เปลี่ยน UI**: การใช้ state ควบคุม appearance
- **Array State**: การจัดการ list ของข้อมูล
- **CRUD Operations**: Create, Read, Update, Delete
- **Computed Values**: การคำนวณจาก state

### 3. ระดับสูง (SimpleCalculator, CounterGame)
- **Multiple States**: การจัดการหลาย state พร้อมกัน
- **State Dependencies**: state ที่ขึ้นอยู่กับ state อื่น
- **useEffect**: การทำงานกับ side effects
- **Complex Logic**: เงื่อนไข, validation, state machines

---

## 🔧 การติดตั้งและรัน Project

### 1. สร้าง Project
```bash
npx create-react-app react-state-examples
cd react-state-examples
```

### 2. ติดตั้ง Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Copy ไฟล์ทั้งหมด
- Copy code จากคู่มือนี้แล้ววางในไฟล์ตามโครงสร้าง
- สร้างโฟลเดอร์ `src/components/`
- วาง components ทั้งหมดในโฟลเดอร์นี้

### 4. รัน Project
```bash
npm start
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## 📚 กิจกรรมเสริมสำหรับนักเรียน

### 1. แก้ไขและทดลอง
- เปลี่ยนค่าเริ่มต้นของ state
- เพิ่มปุ่มใหม่ในแต่ละตัวอย่าง
- เปลี่ยนสีและ styling

### 2. ความท้าทาย
- **BasicCounter**: เพิ่มปุ่ม +5, +10
- **NameChanger**: เพิ่มการนับจำนวนคำ
- **ColorPicker**: เพิ่มสีใหม่
- **TodoList**: เพิ่มระบบ category
- **Calculator**: เพิ่มการคำนวณ % และ √
- **CounterGame**: เพิ่มระบบ power-ups

### 3. สร้างใหม่
- ระบบโหวต (Voting System)
- เกมทายตัวเลข (Number Guessing)
- นาฬิกาจับเวลา (Stopwatch)
- ระบบแชท (Simple Chat)

---

## 💡 เคล็ดลับสำหรับครูผู้สอน

### 1. การสอนที่มีประสิทธิภาพ
- **เริ่มจากตัวอย่างง่าย** ไปหายาก
- **ใช้ console.log()** แสดง state changes
- **ให้นักเรียนลองพิมพ์** ไม่ใช่แค่ copy-paste
- **อธิบายทีละขั้นตอน** ไม่รีบ

### 2. การตรวจสอบความเข้าใจ
- ถามว่า "เกิดอะไรขึ้นเมื่อคลิกปุ่มนี้?"
- ให้ทาย state value หลังจากการกระทำ
- ให้อธิบาย re-rendering process
- ทำแบบทดสอบสั้นๆ

### 3. การแก้ไขปัญหา
- **เปิด Developer Tools** ดู console errors
- **ตรวจสอบ state values** ด้วย React DevTools
- **อธิบาย common mistakes** เช่น state mutation
- **ให้ debug ร่วมกัน** แทนการแก้ให้

---

## 🎯 ผลลัพธ์ที่คาดหวัง

เมื่อเรียนจบนักเรียนจะสามารถ:

✅ **เข้าใจ useState** และใช้งานได้อย่างถูกต้อง  
✅ **จัดการ state หลายประเภท** ตัวเลข, ข้อความ, array, object  
✅ **สร้าง interactive components** ที่ตอบสนองผู้ใช้  
✅ **เข้าใจ re-rendering** และ component lifecycle  
✅ **เขียน React apps** เบื้องต้นได้ด้วยตัวเอง  
✅ **แก้ไขปัญหา** state-related bugs พื้นฐาน  

---

**🎉 พร้อมสร้างแล้ว! ขอให้สนุกกับการเรียน React State Management! 🚀**