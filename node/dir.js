/**
 * 读取目录
 */

const fs = require('fs');
/**
 * 参数 
 * 路径
 * 回调函数 err 错误 file 文件名称数组
 * readdirSync 同步
 */
fs.readdir('./file', function(err, file) {

    if (err) {
        console.log(err);
    } else {
        console.log(file);
    }

});

/**
 * 删除目录
 * 参数
 * 路径
 * 回调函数  err 错误
 * rmdirSync 同步
 * 回收站找不到
 */
fs.rmdir(path, function(err) {
    if (err) {
        console.log(err)
    }
})