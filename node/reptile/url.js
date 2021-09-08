/**
 * url 用于对网址路径进行解析
 */
const url = require('url');

const httpUrl = 'https://fanyi.baidu.com/translate?aldtype=16047&query=%E7%88%AC%E8%99%AB&keyfrom=baidu&smartresult=dict&lang=auto2zh#zh/en/%E7%88%AC%E8%99%AB';

/**
 * parse
 * 将路径拆分解析成对象
 */

const urlObj = url.parse(httpUrl);
console.log(urlObj);

/**
 * resolve 重新合并成新路径
 */
const resolveURL= url.resolve(httpUrl, '&name=1');
console.log(resolveURL);
