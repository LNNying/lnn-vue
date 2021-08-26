/**
 * node 导入与导出
 * exports === module.exports 但是系统还是去找module.exports 所以exports = {} 不会覆盖之前定义的内容 
 * 所以单个exports只能.设置属性  但是module.exports 可以单个属性或多个属性(对象) ---地址值
 * exports是module.exports的引用
 * 
 * es6中export区分
 * 导入 require
 */

exports.a = 1;