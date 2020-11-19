# lnn-vue
自定义vue框架

函数柯里化
【函数式编程】 https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/
【维基百科】   https://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96

概念
1。科里化  一个函数原本有很多个参数，只传一个参数，生成一个新函数，又新函数接收剩下的参数来运行得到结构。
2。偏函数  一个函数原本有很多个参数，传一部分参数，生成一个新函数，又新函数接收剩下的参数来运行得到结构。
3。高阶函数  一个函数的参数是个函数，该函数对参数这个函数进行加工，得到一个函数，这个函数是高阶函数。


为什么使用科里化？
为了提升性能，使用科里化可以缓存一部分功能。
如
1. 判断元素
Vue本质是使用HTML的字符串为欸模板，将字符串的模板转换为AST(抽象语法树) 在转换为虚拟dom
3个过程
模板-》AST  ---最消耗性能  对字符串进行解析
AST-》虚拟dom  
虚拟dom -》真实dom
列子
let s = '1 + 2 * (3 + 4)' 字符串进行解析运算
一般会将这个表达式转换为'波兰式'表达式，然后使用栈结构来运算

在vue中每一个标签可是真正的html标签，也可以是自定义组件，怎么区分？？？
在vue的源码中将所有可用的html标签已经存起来了
只考虑几个标签
let tag = 'div,p,span,img,ul,li'.split(,);
顶一个方法 判断标签是否为内置的标签  是返回true  不是返回false (注意标签名的大小写)

如果有6个内置标签，组件中有10个标签需要判断，就需要循环60次

vue里的处理方式：

function makeMap(keys) {
    let set = {};
    keys.forEach(key => {
        set[key]: true
    });
    return function (tagName) {
        return !!set[tagName.toLowerCase()]; // 双!!转为Boolean值 如undefined转为false
    }
}

let isHTMLTag = makeMap(tags); // 返回一个函数  这样就避免循环  与闭包的区别

2. 虚拟dom的render方法

思考：vue项目 模板转换为抽象语法树需要执行几次？？
--页面一开始加载渲染
--每一个属性发生变化，页面的渲染
--watch，computed 等等发生变化的页面渲染

以前写的代码  每次需要渲染的时候模板就需要解析一次(简化了解析方法，性能差)
vue中模板不变，只修改虚拟dom
render 的作用 将虚拟dom转换为真正的dom加到页面中
--优化：虚拟dom可以降级理解为抽象语法树(AST)
--项目运行的时候模板是不变，也就是AST不变的

代码优化： 将虚拟dom存取俩，生成一个函数，函数只需要传入数据，就可以得到真正的dom


