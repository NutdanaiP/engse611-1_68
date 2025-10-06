// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' },
    { id: 'clock', name: 'นาฬิกา' },
    { id: 'Gun', name: 'ปืน BB Gun' },
    { id: 'Brand name bags', name: 'กระเป๋าแบรนด์' },
    { id: 'notebook', name: 'โน๊ตบุ๊ค' },


];

// ข้อมูลสินค้าพื้นฐาน - นักศึกษาจะเพิ่มเติมใน Challenge
export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 50000,
        discount: 8,
        image: 'https://images.pexels.com/photos/18525574/pexels-photo-18525574.jpeg',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้า',
        category: 'clothing',
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1601136610007-1ecf5706c908?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fCVFMCVCOSU4MCVFMCVCOCVBQSVFMCVCOCVCNyVFMCVCOSU4OSVFMCVCOCVBRCVFMCVCOCVBMiVFMCVCOCVCNyVFMCVCOCU5NCVFMCVCOCU5QyVFMCVCOSU4OSVFMCVCOCVCMiVFMCVCOCU5RCVFMCVCOSU4OSVFMCVCOCVCMiVFMCVCOCVBMnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 4.2
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: 'https://plus.unsplash.com/premium_vector-1711645651692-7e95fef3244f?w=352&dpr=2&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    {
        id: 4,
        name: 'นาฬิกา',
        category: 'clock',
        price: 3500,
        originalPrice: 5000,
        discount: 30,        
        image: 'https://images.unsplash.com/photo-1672291859257-3d195c6c3df8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFMCVCOCU5OSVFMCVCOCVCMiVFMCVCOCVBQyVFMCVCOCVCNCVFMCVCOCU4MSVFMCVCOCVCMnxlbnwwfHwwfHx8MA%3D%3D',
        description: 'นาฬิกายืมเพื่อนเท่ๆ',
        inStock: true,
        rating: 3.5
    },
    {
        id: 5,
        name: 'ปืน BB Gun',
        category: 'Gun',
        price: 1500,
        originalPrice: 1800,
        discount: 17,        
        image: 'https://images.unsplash.com/photo-1747504859037-fe4936bf527a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUUwJUI4JTlCJUUwJUI4JUI3JUUwJUI4JTk5JTIwQkIlMjBHdW58ZW58MHx8MHx8fDA%3D',
        description: 'BB Gun ราคาถูก',
        inStock: true,
        rating: 2.6
    },
    {
        id: 6,
        name: 'กระเป๋าแบรนด์',
        category: 'Brand name bags',
        price: 12000,
        originalPrice: 15000,
        discount: 20,        
        image: 'https://images.unsplash.com/photo-1677773239794-e499bc6fce0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fCVFMCVCOCU4MSVFMCVCOCVBMyVFMCVCOCVCMCVFMCVCOSU4MCVFMCVCOCU5QiVFMCVCOSU4QiVFMCVCOCVCMiVFMCVCOSU4MSVFMCVCOCU5QSVFMCVCOCVBMyVFMCVCOCU5OSVFMCVCOCU5NCVFMCVCOSU4Q3xlbnwwfHwwfHx8MA%3D%3D',
        description: 'กระเป๋าแบรนด์แท้ 100%',
        inStock: true,
        rating: 5
    },
    {
        id: 7,
        name: 'โน๊ตบุ๊ค',
        category: 'notebook',
        price: 28000,
        originalPrice: 32000,
        discount: 12,        
        image: 'https://media.istockphoto.com/id/1394988455/photo/laptop-with-a-blank-screen-on-a-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=wnMXtkO-bzfpMqbGoES1rQB0XkzJe64-q7_a53a81Ow=',
        description: 'โน๊ตบุ๊คตัวแรง',
        inStock: true,
        rating: 4.2
    }
];