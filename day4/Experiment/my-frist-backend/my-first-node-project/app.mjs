// ไฟล์: app.mjs - ใช้ module แบบ ES6  
import { add, multiply } from './math.mjs';
import calculator from './math.mjs';

console.log(add(5, 3));
console.log(calculator(4, 2, 'multiply'));