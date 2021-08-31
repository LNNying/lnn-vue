/**
 * node 特点
 * 事件驱动
 * 非阻塞I/O模型(异步)
 * 轻量和高效
 */
// 引入http请求
let http = require('http'); 
// 创建http  并监听端口8888
http.createServer((req, res) => {
    console.log(req);
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://localhost:8081/');