const url = require('url');

const url_str = new URL('https://example.com/users?page=1&limit=10');

const myUrl = new URL(url_str);

console.log(myUrl.hostname);      
console.log(myUrl.pathname);      
console.log(myUrl.searchParams.get('page'));
console.log(myUrl.searchParams.get('limit'));