// 引入http请求
let http = require('http'); 
// 创建http  并监听端口8888
http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');