// ไฟล์: math.mjs - สร้าง module แบบ ES6
export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// หรือ default export
export default function calculator(a, b, operation) {
    if (operation === 'add') return a + b;
    if (operation === 'multiply') return a * b;
}