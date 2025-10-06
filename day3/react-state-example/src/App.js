import React, { useState } from 'react';
import './App.css';

// Import ตัวอย่างทั้งหมด
import BasicCounter from './components/BasicCounter';
import NameChanger from './components/NameChanger';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import SimpleCalculator from './components/SimpleCalculator';
import CounterGame from './components/CounterGame';
import VotingSystem from './components/VotingSystem';
import NumberGuessing from './components/NumberGuessing';
import Stopwatch from './components/Stopwatch';
import SimpleChat from './components/SimpleChat';

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
    },
    {
      id: 'vote',
      title: '7. ระบบโหวต',
      description: 'Voting System',
      component: <VotingSystem />
    },
    {
      id: 'guess',
      title: '8. เกมทายตัวเลข',
      description: 'Number Guessing Game',
      component: <NumberGuessing />
    },
    {
      id: 'stopwatch',
      title: '9. นาฬิกาจับเวลา',
      description: 'Stopwatch',
      component: <Stopwatch />
    },
    {
      id: 'chat',
      title: '10. ระบบแชท',
      description: 'Simple Chat',
      component: <SimpleChat />
    }
  ];

  return (
    <div className="app-bg">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-container">
          <h1 className="app-title">
            🎓 React State Management Examples
          </h1>
          <p className="app-desc">
            ตัวอย่างประกอบการเรียน - หัวข้อที่ 3: State Management เบื้องต้น
          </p>
        </div>
      </header>

      <div className="app-main-container">
        {/* Example Selection Bar - now at the top, horizontal single line */}
        <div className="example-bar example-bar-top">
          <span className="example-bar-label">เลือกตัวอย่าง:</span>
          <div className="example-btn-group example-btn-row">
            {examples.map(example => (
              <button
                key={example.id}
                onClick={() => setActiveExample(example.id)}
                className={`example-btn${activeExample === example.id ? ' example-btn-active' : ''}`}
              >
                <div className="font-medium">{example.title}</div>
                <div className="text-sm opacity-75">{example.description}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="app-content-col">
          <div className="app-content-box">
            {examples.find(ex => ex.id === activeExample)?.component}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;