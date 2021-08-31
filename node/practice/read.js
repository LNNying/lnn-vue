/**
 * 注意
 * read.js  测试开发版本
 * index.js  正式调用版本
 * 同步后面都加Sync
 */
/**
 * node 与 浏览器的导出引入不同
 *
 * 导出
 * node 使用commonjs中  module.exports === exports
 * 浏览器为ES6 export/export default
 *
 * 引入
 * node require
 * 浏览器为ES6 import require
 *
 * __dirname 获取当前的工作目录
 *
 * path.sep 获取当前的系统中路径之间的分隔符 windows是\ Linux/macOS是 /
 * path.delimiter 获取当前系统中多个路径之间的分隔符 windows是 ; Linux/macOS是 :
 */
const fs = require('fs');
const path = require('path');

function strucRevetData(code, data, msg) {
    return {
        code,
        data,
        msg
    }
}

/**
 * 读取数据
 * @param path 路径
 * @param option 配置参数
 * @param function 回调函数
 * @returns {Promise<any>}
 */
function readFile(path, option) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(path, option, (err, data) => {
                if (!err) {
                    resolve(strucRevetData(200, data, 'success'));
                } else {
                    reject(strucRevetData(400, null, err));
                }
            });
        } catch (e) {
            reject(strucRevetData(400, null, e));
        }
    });
}

async function testReadFile() {
    let data = await readFile('../file/file1.txt', {
        flag: 'r',
        encoding: 'utf-8'
    });
    console.log(data);
}

// testReadFile();

/**
 * 写入数据
 * @param path 路径
 * @param content 写入内容
 * @param option 配置参数
 * @param function 回调函数
 * @returns {Promise<any>}
 */
function writeFile(path, content, option) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(path, content, option, err => {
                if (!err) {
                    resolve(strucRevetData(200, null, 'success'));
                } else {
                    reject(strucRevetData(400, null, err));
                }
            });
        } catch (e) {
            reject(strucRevetData(400, null, e));
        }
    });
}

async function testWriteFile() {
    let result = await writeFile('../file/testFile.txt', '这是测试写入函数是否成功', {
        flag: 'a',
        encoding: 'utf-8'
    });
    console.log(result);
}

// testWriteFile();

/**
 * 追加文件
 * @param path 路径
 * @param content 追加内容
 * @return 返回最终提示信息
 * 没有该文件 新建文件
 */
function appendFile(path, content) {
    return new Promise((resolve, reject) => {
        try {
            fs.appendFile(path, content, err => {
                if (!err) {
                    resolve(strucRevetData(200, null, 'success'));
                } else {
                    reject(strucRevetData(400, null, err));
                }
            })
        } catch (e) {
            reject(strucRevetData(400, null, e));
        }
    });
}

async function testAppendFile() {
    const result = await appendFile('../file/appendFile.txt', '这是一个追加文件内容的测试');
    console.log(result);
}
// testAppendFile();

/**
 * 删除文件
 * @param path 路径
 * @param function 回调函数
 * @returns {Promise<any>}
 */
function deleteFile(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.unlink(path, () => {
                resolve(strucRevetData(200, null, 'success'));
            });
        } catch (e) {
            reject(strucRevetData(400, null, e))
        }
    });
}

async function testUnlink() {
    let result = await deleteFile('../file/testFile.txt');
    console.log(result);
}

// testUnlink();

/**
 * 打开文件
 * @param path 路径
 * @param flag
 * r+ 打开文件用于读写。
 * w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
 * a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
 * a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
 * @returns {Promise<any>}
 * 返回一个非负数的整数 其实是一个id  每一个文件在文件系统中都自己的id
 * fs.close 调用关闭文件描述符
 */
function openFile(path, flag) {
    return new Promise((resolve, reject) => {
       try {
           fs.open(path, flag, (err, fd) => {
               if (!err) {
                   resolve(strucRevetData(200, fd, 'success'));
               } else {
                   reject(strucRevetData(400, null, err));
               }
           })
       } catch (e) {
           reject(strucRevetData(400, null, e));
       }
    });
}
async function testOpenFile() {
    let result = await openFile('../file/file2.txt', 'r');
    console.log(result);
}
// testOpenFile();

/**
 * 获取文件属性
 * @param path 路径
 * @param function 回调函数
 *    @param err 错误
 *    @param stats 包含文件属性对象
 *      stats.isDirectory() 是否为目录
 *      stats.isFile() 是否为文件
 *      stats.isSymbolicLink() 判断符号是否为连接
 *      stats.size 文件大小(kb)
 * @returns stats
 */
function statFile(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(path, (err, stats) => {
                if (!err) {
                    resolve(strucRevetData(200, stats, 'success'));
                } else {
                    reject(strucRevetData(400, null, err));
                }
            });
        } catch (e) {
            reject(strucRevetData(400, null, e));
        }
    });
}

async function testStat() {
    let result = await statFile('../file/file2.txt');
    console.log(result);
}
// testStat();

/**
 * 写入流  主要用于写入数据过大
 * @param path
 * @param option
 */
function inputFileStream(path, option) {
    return new Promise((resolve, reject) => {
        try {
            const fw = fs.createWriteStream(path, option);
            resolve(fw);
        } catch (e) {
            reject(e);
        }
    });
}
async function testFileInput() {
    let ws = await inputFileStream('../file/inputFile.txt', {
        flag: 'a',
        encoding: 'utf-8'
    });
    // 三个监听事件
    ws.on('open', () => {
        console.log('打开文件');
    });
    ws.on('ready', () => {
        console.log('准备写入流');
    });
    ws.on('close', () => {
        console.log('关闭写入流')
    });

    ws.write('测试写入流数据', err => {
        if (!err) {
            console.log('写入成功');
            // 关闭写入流
            ws.end();
        } else {
            console.log(err);
        }
    });
}

// testFileInput();

/**
 *
 * @param path 路径
 * @param option 配置
 * @return  读取流
 */
function outputFileStream(path, option) {
    return new Promise((resolve, reject) => {
        try {
            const fr = fs.createReadStream(path, option);
            resolve(fr);
        } catch (e) {
            reject(e);
        }
    });
}

async function testOutputFileStrea() {
    let wr = await outputFileStream('../file/file1.txt', {
        flag: 'r',
        encoding: 'utf-8'
    });

    wr.on('open', () => {
        console.log('打开文件');
    });
    wr.on('close', () => {
        console.log('关闭读取流');
    });
    // 读取到数据 固定读取数据量大小 一段一段的读取
    wr.on('data', (chunk) => {
        console.log(chunk);
    })
}
// testOutputFileStrea();

/**
 * 获取文件相关目录
 * @param paths 路径
 * @param option
 *    @param flag dir 文件夹 file 完整文件名 ext 文件后缀
 *    @param noExt 只在flag为file时才生效 获取无后缀文件名
 * @return 返回获取到的相关信息
 */
function getFilePath(paths, option) {
    let result = null;
    switch (option.flag) {
        case 'dir':
            result = path.dirname(paths);
            break;
        case 'file':
            if (option.noExt) {
                result = path.basename(paths, path.extname(paths));
            } else {
                result = path.basename(paths);
            }
            break;
        case 'ext':
            result = path.extname(paths);
            break;
        default:
            throw Error('类型错误：' + flag);
            break;
    }
    return result;
}
function testPath() {
    const dirName = getFilePath('../file/file1.txt', {
        flag: 'file',
        noExt: true
    });
    console.log(dirName);
}
// testPath();

/**
 * 连接路径片段
 * @param list 路径片段数组
 * @return {string | *}
 */
function joinPath(list) {
    if (!Array.isArray(list)) throw Error('入参不是数组');
    return path.join(...list);
}
function testJoinPath() {
    console.log(joinPath(['/file', 'file1.txt']));
}
// testJoinPath();

/**
 * 创建一个绝对路径
 * 在工作目录的基础上追加后面的路径信息
 * / 反斜杠不能随便加 否则会获取绝对路径如 path.resolve('/foo/bar', '/tmp/file/'); 结果为 D:\tmp\file 重置到根目录
 * 解析和规范化都不会检查路径是否存在。 其只是根据获得的信息来计算路径。
 * @param args
 */
function getRelativePath(args) {
    if (Array.isArray(args)) {
        return path.resolve(args[0], args[1]);
    }
    return path.resolve(args);
}
// console.log(getRelativePath(['/map', 'file1.txt']));

// console.log(path.resolve('/foo/bar', '/tmp/file/'));

/**
 * 规范路径
 * 将路径中多余的 . 或 / 清除
 * @param paths 路径
 */
function normalizePath(paths) {
    return path.normalize(paths);
}
// console.log(normalizePath('/sdf/../sd//sd/test..txt'));

function isAccess(path) {
    return fs.access(path, fs.constants.R_OK | fs.constants.W_OK);
}

// console.log(isAccess('../file/file1.txt'));

/**
 * 创建目标目录
 * @param path 路径
 * @return 返回最终提示结果
 */
function createDir(path) {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(path)) {
                fs.mkdir(path, err => {
                    if (!err) {
                        resolve(strucRevetData(200, null, 'success'));
                    } else {
                        reject(strucRevetData(400, null, err));
                    }
                });
            }
        } catch (e) {
            reject(strucRevetData(400, null, e));
        }
    });
}
async function testCreateDir() {
    let result = await createDir('../file/mkdir');
    console.log(result);
}
// testCreateDir();

/**
 * 获取目录下 所有内容文件名数组
 * @param path 路径
 * @return 返回指定目录下的文件名数组
 */
function readDir(path) {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(path)) {
                fs.readdir(path, (err, data) => {
                    if (!err) {
                        resolve(strucRevetData(200, data, 'success'));
                    } else {
                        reject(strucRevetData(400, null, err));
                    }
                });
            }
        } catch (e) {
            reject(strucRevetData(400, null, e));
        }
    });
}
async function testReadDir() {
    let result = await readDir('../file');
    console.log(result);
}
// testReadDir();

/**
 * 检测目录是否存在
 * exists 异步操作已被弃用
 * @param path 路径
 * @return Boolean
 */
function isExistDir(path) {
    return fs.existsSync(path)
}
function testIsExistDir() {
    let result = isExistDir('../file');
    console.log(result);
}
// testIsExistDir();

/**
 * 重命名文件夹或文件名
 * @param oldPath 旧路径
 * @param newPath 新路径
 * @return 最终返回提示信息
 */
function renameDir(oldPath, newPath) {
    return new Promise((resolve, reject) => {
       try {
           fs.rename(oldPath, newPath, err => {
               if (!err) {
                   resolve(strucRevetData(200, null, 'success'));
               } else {
                   reject(strucRevetData(400, null, err));
               }
           })
       } catch (e) {
           reject(strucRevetData(400, null, e));
       }
    });
}
async function testRenameDir() {
    let result = await renameDir('../file/file2.txt', '../file/file3.txt');
    console.log(result);
}
// testRenameDir();

// console.log(path.delimiter);

/**
 * 判断路径是否为绝对路径
 * @param paths 路径
 * @return  返回Boolean
 */
function isAbsolute(paths) {
    return path.isAbsolute(paths);
}
// console.log(isAbsolute('../file/file1.txt'));

/**
 * 将路径解析为对象 不会判断该路径是否存在
 * @param paths 路径
 * @return 返回解析结果对象
 *      root: 根路径。
 *      dir: 从根路径开始的文件夹路径。
 *      base: 文件名 + 扩展名
 *      name: 文件名
 *      ext: 文件扩展名
 */
function pathParse(paths) {
    return path.parse(paths);
}
// console.log(pathParse('../file/file1.txt'));
