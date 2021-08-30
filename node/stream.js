/**
 * 文件流(大量数据  )
 */

const fs = require('fs');
/**
 * 1  创建写入流
 * 参数
 * 文件路径
 * 可选的配置操作
 * 返回写入流对象
 */
let fw = fs.createWriteStream('./file/stream.txt', {flag: 'w', encoding: 'utf-8'});

console.log(fw);

/**
 * 2.监听事件
 */
fw.on('open', function() {
    console.log('文件打开事件');
});

fw.on('ready', function() {
    console.log('文件写入事件');
})

fw.on('close', function() {
    console.log('文件关闭事件')
});

/**
 * 3、文件流入
 */
fw.write('文件写入内容', function(err) {
    if (err) {
        console.log('文件写入错误' + err);
    } else {
        console.log('文件写入成功');
    }
});

// 最终结束事件
fw.end(function() {
    console.log('文件写入结束');
});


/**
 * 流出读取
 * 参数
 * 路径
 * 配置项
 */
let fr = fs.createReadStream('./file/file2.txt', {flag: 'r', encoding: 'uft-8'});

/**
 * 监听事件
 */
fr.on('open', function() {
    console.log('打开读取文件');
});

fr.on('close', function() {
    console.log('关闭读取事件流');
});

/**
 * 对于大文件
 * 监听数据每一批流入完成
 */
fr.on('data', function(chunk) {
    console.log(chunk);
});

/**
 * 管道
 * 读出的内容直接写入文件
 */

fr.pipe(fw);