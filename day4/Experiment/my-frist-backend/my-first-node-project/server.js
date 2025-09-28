const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    
    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    if (pathname === '/') {
        res.end('<h1>Home</h1><a href="/about">About Us</a>');
    } else if (pathname === '/about') {
        res.end('<h1>About Us</h1><a href="/">back</a>');
    } else if (pathname === '/Test') {
        res.end('<h1>Test</h1><a href="/">back</a>');
    }else {
        res.writeHead(404);
        res.end('<h1>Pang not found 😢</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});