import React, { useState } from 'react';

function SimpleCalculator() {
  // Multiple States ทำงานร่วมกัน
  const [number1, setNumber1] = useState('10');
  const [number2, setNumber2] = useState('20');
  const [operator, setOperator] = useState('*');
  const [result, setResult] = useState(200);
  const [history, setHistory] = useState([]);

  // ฟังก์ชันคำนวณ
  const calculate = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    let calcResult;
    let calculation;

    if (operator === '√') {
      if (number1 === '') {
        alert('กรุณาใส่ตัวเลขที่ 1 สำหรับ √');
        return;
      }
      if (num1 < 0) {
        alert('ไม่สามารถหารากที่สองของจำนวนติดลบได้');
        return;
      }
      calcResult = Math.sqrt(num1);
      calculation = `√${num1} = ${calcResult}`;
    } else if (operator === '%') {
      if (number1 === '' || number2 === '') {
        alert('กรุณาใส่ตัวเลขทั้งสองสำหรับ %');
        return;
      }
      calcResult = (num1 * num2) / 100;
      calculation = `${num1} % ${num2} = ${calcResult}`;
    } else {
      if (isNaN(num1) || isNaN(num2)) {
        alert('กรุณาใส่ตัวเลขที่ถูกต้อง');
        return;
      }
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
      calculation = `${num1} ${operator} ${num2} = ${calcResult}`;
    }

    setResult(calcResult);
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
    <div className="card calculator-card">
      <h2 className="title calculator-title">เครื่องคิดเลข (Multiple States)</h2>

      {/* Input Fields */}
      <div className="input-group calculator-input-group">
        <input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="ตัวเลขที่ 1"
          className="input calculator-input"
        />

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="input calculator-select"
        >
          <option value="+">+ บวก</option>
          <option value="-">- ลบ</option>
          <option value="*">× คูณ</option>
          <option value="/">÷ หาร</option>
          <option value="%">% เปอร์เซ็นต์</option>
          <option value="√">√ รากที่สอง</option>
        </select>

        {/* input ตัวเลขที่ 2 จะซ่อนเมื่อเลือก √ */}
        {operator !== '√' && (
          <input
            type="number"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            placeholder="ตัวเลขที่ 2"
            className="input calculator-input"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="btn-group calculator-btn-group">
        <button
          onClick={calculate}
          disabled={
            operator === '√'
              ? !number1
              : !(number1 && number2)
          }
          className={`btn calculator-btn-calc ${
            (operator === '√' ? number1 : number1 && number2)
              ? ''
              : 'btn-disabled'
          }`}
        >
          คำนวณ
        </button>

        <button
          onClick={clear}
          className="btn calculator-btn-clear"
        >
          ล้าง
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="result-box calculator-result-box">
          <div className="text-center">
            <div className="result-label calculator-result-label">ผลลัพธ์:</div>
            <div className="result-value calculator-result-value">
              {result.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="history-box calculator-history-box">
          <div className="history-header calculator-history-header">
            <h3 className="history-title calculator-history-title">ประวัติการคำนวณ:</h3>
            <button
              onClick={clearHistory}
              className="history-clear calculator-history-clear"
            >
              ล้างประวัติ
            </button>
          </div>
          <div className="history-list calculator-history-list">
            {history.map((calc, index) => (
              <div key={index} className="history-item calculator-history-item">
                {calc}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Debug Info */}
      <div className="state-box calculator-state-box">
        <p className="state-label calculator-state-label">
          <strong>States:</strong>
        </p>
        <ul className="state-list calculator-state-list">
          <li>number1 = "{number1}"</li>
          <li>number2 = "{number2}"</li>
          <li>operator = "{operator}"</li>
          <li>result = {result}</li>
          <li>history.length = {history.length}</li>
        </ul>
        <p className="state-desc calculator-state-desc">
          หลาย States ทำงานร่วมกัน + Validation + History
        </p>
      </div>
    </div>
  );
}

export default SimpleCalculator;