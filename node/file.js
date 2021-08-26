/**
 * no的读取文件也有异步和童虎
 */
const fs = require('fs');
const { StringDecoder } = require('string_decoder');

/**
 * 打开
 * 同步 openSync  同步打开
 * 参数
 * 路径
 * 打开方式  默认以r（读的形式打开）
 * model 一般不用
 * 返回在内存中的标识  打开的第几个窗口 
 */

let fd = fs.openSync('./file/file1.txt', 'r');

console.log(fd);

/**
 * 同步读取
 * readSync
 * 参数
 * open打开的标识
 * buffer缓冲池
 * buffer写入的偏移量
 * 读取指定长度字节
 * 开始读取的位置
 * 用Buffer.alloc 替代Buffer 
 */

let buffer = new Buffer.alloc(8);

let file1 = fs.readSync(fd, buffer, 0, 8, null);

console.log(file1);

/**
 * readFileSync  封装
 * 没有设置编码 默认返回缓冲区
 */

let file2 = fs.readFileSync('./file/file1.txt', {flag: 'r', encoding: 'utf-8'});
console.log(file2);

/**
 * 异步读取
 * 返回的数九中有一个空白结束符
 */
fs.readFile('./file/file1.txt', {flag: 'r', encoding: 'utf-8'}, function(err, data) {
    /**
     * 读取回调函数
     * err 错误
     * data 数据
     */
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});


/**
 * 写入  异步  覆盖  路径没有该文件 就会创建一个文件
 * writeFile
 * 参数
 * 路径
 * 写入数据
 * 配置
 * flag: 'w' 写入的模式 w覆盖写入  a追加写入
 * encoding 编码
 * 回调函数 err 
 */
fs.writeFile('./file/file2.txt', '写入', {flag:'w', encoding: 'utf-8'}, function(err) {
    if (err) {
        console.log('写入失败');
    } else {
        console.log('写入成功');
    }
});


/**
 * unlink  删除
 * 参数
 * 路径
 * 回调函数  无参数
 */

fs.unlink('./file/file2.txt', function() {
    console.log('成功删除');
});

/**
 * Buffer 以16进制显示2进制数据
 * 
 * 解决问题
 * 1、解决数组不能进行二进制数据操作
 * 2、js数组不想Java等语言效率高
 * Buffer 会砸死内存中开辟固定大小的内存空间
 */
// 转换为buffer
let buf = Buffer.from('hello world')
// buffer转换为string
buf.toString();

// 开辟空的buffer
let emptyBuf = new Buffer.alloc(9);
emptyBuf[1] = 0;
console.log(emptyBuf);

// 与上面的区别： 存储的数据不同
let buf2 = Buffer.allocUnsafe(9);