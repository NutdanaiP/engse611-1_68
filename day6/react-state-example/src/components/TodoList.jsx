import React, { useState } from 'react';

function TodoList() {
  // State เก็บรายการงาน (Array of Objects)
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียน React.js', completed: false, category: 'เรียน' },
    { id: 2, text: 'ทำการบ้าน HTML', completed: true, category: 'การบ้าน' },
    { id: 3, text: 'ดู YouTube CSS', completed: false, category: 'พักผ่อน' }
  ]);

  // State เก็บข้อความใหม่
  const [newTodo, setNewTodo] = useState('');
  // State เก็บ category ใหม่
  const [newCategory, setNewCategory] = useState('เรียน');

  // ฟังก์ชันเพิ่มงานใหม่
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, { 
        id: newId, 
        text: newTodo.trim(), 
        completed: false,
        category: newCategory
      }]);
      setNewTodo('');
      setNewCategory('เรียน');
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
    <div className="card todo-card">
      <h2 className="title todo-title">รายการงาน (Array State)</h2>

      {/* สถิติ */}
      <div className="stats-box todo-stats-box">
        <div className="stats-grid todo-stats-grid">
          <div>
            <div className="stats-value todo-stats-value-all">{totalCount}</div>
            <div className="stats-label todo-stats-label">งานทั้งหมด</div>
          </div>
          <div>
            <div className="stats-value todo-stats-value-done">{completedCount}</div>
            <div className="stats-label todo-stats-label">เสร็จแล้ว</div>
          </div>
          <div>
            <div className="stats-value todo-stats-value-undone">{totalCount - completedCount}</div>
            <div className="stats-label todo-stats-label">ยังไม่เสร็จ</div>
          </div>
        </div>
      </div>
      
      {/* ฟอร์มเพิ่มงาน */}
      <div className="form-box todo-form-box">
        <div className="form-row todo-form-row">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="เพิ่มงานใหม่..."
            className="input todo-input"
          />
          <button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className={`btn todo-btn-add ${newTodo.trim() ? '' : 'btn-disabled'}`}
          >
            เพิ่ม
          </button>
        </div>
        <div className="form-row todo-form-row">
          <label className="form-label todo-form-label">หมวดหมู่:</label>
          <select
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            className="input todo-select"
          >
            <option value="เรียน">เรียน</option>
            <option value="การบ้าน">การบ้าน</option>
            <option value="พักผ่อน">พักผ่อน</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
        </div>
      </div>
      
      {/* รายการงาน */}
      <div className="todo-list">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'todo-item-done' : 'todo-item-undone'}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'todo-text-done' : 'todo-text-undone'}`}> 
              {todo.text}
              <span className="todo-category">{todo.category}</span>
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="todo-btn-delete"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

      {/* แสดงข้อมูล State */}
      <div className="state-box todo-state-box">
        <p className="state-label todo-state-label">
          <strong>Array State:</strong> todos.length = {todos.length}
        </p>
        <p className="state-desc todo-state-desc">
          เพิ่ม → [...todos, newItem] | ลบ → filter() | แก้ไข → map()
        </p>
      </div>
    </div>
  );
}

export default TodoList;