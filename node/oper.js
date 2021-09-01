/**
 * 操作系统
 */
const os = require('os');

/**
 * 查看cpu
 */
const cpu = os.cpus();
// console.log(cpu);

/**
 * 查看内存信息
 */
const totalmem = os.totalmem();
// console.log(totalmem);

/**
 * 查看系统架构
 */
const arch = os.arch();
// console.log(arch);

/**
 * 查看剩余内存大小
 */
const free = os.freemem();
console.log(free);
