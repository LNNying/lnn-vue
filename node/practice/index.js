function strucRevetData(code, data, msg) {
    return {
        code,
        data,
        msg
    }
}

const fs = require('fs');
const path = require('path');

/**
 * 读取数据
 * @param path 路径
 * @param option 配置参数
 * @param function 回调函数
 * @returns 返回读取到的数据
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

/**
 * 写入数据
 * @param path 路径
 * @param content 写入内容
 * @param option 配置参数
 * @param function 回调函数
 * @returns 返回最终提示信息
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

/**
 * 删除文件
 * @param path 路径
 * @param function 回调函数
 * @returns 返回最终提示信息
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
 * @returns stats 操作对象
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

/**
 * 写入流  主要用于写入数据过大
 * @param path
 * @param option
 * @return fw 操作对象
 * on绑定事件 open 打开文件 ready 准备写入文件 close 关闭写入流
 * 自身时间 write 写入流  end 结束流
 */
function inputFileStream(path, option) {
    return new Promise((resolve, reject) => {
        try {
            const fw = fs.createWriteStream(path, option);
            resolve(fw);
        }catch (e) {
            reject(e);
        }
    });
}

/**
 *
 * @param path 路径
 * @param option 配置
 * @return  读取流
 * on 绑定事件 open 打开文件 close 关闭读取流 data 读取到文件
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

/**
 * 连接路径片段
 * @param list 路径片段数组
 * @return {string | *}
 */
function joinPath(list) {
    if (!Array.isArray(list)) throw Error('入参不是数组');
    return path.join(...list);
}

/**
 * 规范路径
 * 将路径中多余的 . 或 / 清除
 * @param paths 路径
 */
function normalizePath(paths) {
    return path.normalize(paths);
}

/**
 * 判断路径是否为绝对路径
 * @param paths 路径
 * @return  返回Boolean
 */
function isAbsolute(paths) {
    return path.isAbsolute(paths);
}

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

/**
 * 检测目录是否存在
 * exists 异步操作已被弃用
 * @param path 路径
 * @return Boolean
 */
function isExistDir(path) {
    return fs.existsSync(path)
}

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

module.exports = {
    readFile,
    writeFile,
    appendFile,
    statFile,
    deleteFile,
    openFile,
    inputFileStream,
    outputFileStream,
    createDir,
    readDir,
    isExistDir,
    renameDir,
    getFilePath,
    joinPath,
    normalizePath,
    isAbsolute,
    pathParse
};
