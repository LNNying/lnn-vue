/**
 * 输入输出
 */

let readline = require("readline");

/**
 * 创建接口实例
 * process 进程
 */

let r1 = readline.createInterface({
    output: process.stdout, 
    input: process.stdin
});

/**
 * 提问
 */
r1.question('吃饭？', function(answer) {
    console.log('答复为：' + answer);
    r1.close();
});

/**
 * 结束进程
 */
r1.on('close', function() {
    process.exit(0);
});