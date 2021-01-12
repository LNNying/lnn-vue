vue 3中diff算法优化  添加 pathFlag  来标记{{}}模板属性  进行双向绑定  

patchFlag 枚举 如图片

hiostStatic  静态提升  不需要更变的属性只创建一次


vite 



按序导入



组合化API

vue2中数据与业务逻辑分开不利于维护与管理  比如 data中数据  与methods中的方法

vue3中提出组合API ：

提供setUp函数是组合API的入口函数

如何定义监听变量

ref 行数只能监听基本数据类型

reactive监听对象类型

setUp中最后返回数据 return{变量或方法}
