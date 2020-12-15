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

问题：
这样的闭包会有内存泄漏？尽可能的避免内存泄漏  尽可能提高性能

科里化   目的返回一部分行为

# 响应式原理

-在使用vue的时候，赋值属性获取属性都是直接使用的vue实例
-设置属性值的时候，页面需要相应、
-在vue中使用了defineRective(target, key, value, enumerable)用这个函数的闭包存储变量

```
Object.defineProperty('对象'， '设置什么样的属性'，{
    writeable，
    configable，
    enumerable， // 控制属性是否可枚举，是不是可以被for-in取出来
    set，// 赋值触发
    get
});

```

# vue源代码中处理push,pop,unshift,shift,reverse,sort,splice处理响应式化

怎样实现ne?

1. 在改变数据的时候发出通知
2. vue 2中的缺陷，数组发生变化通过设置length没法通知  在vue3中使用proxy解决了
3. 加进去的元素也是响应式的

技巧
如果一个函数已经定义了，要扩展器功能？

1. 定一个临时的函数名存储函数
2. 重新定义原来的函数
3. 定义其扩展功能
4. 调用临时的那个函数

这个就是在函数的基础上增加额外的操作：===》 函数的拦截

function func() {
console.log('原来函数');
}
// 1.
let _tmpe = func();
// 2
func = function () {
// 4.
_tmpe();
// 3.
console.log('新增功能');
}
、

扩展数组的方法
--- 不能直接修改prototype
--- 只修改要进行数组响应式化的方法

# 响应式原理

# 发布订阅式

代理方法，就是将app.data映射搭配app上 引入proxy(target,src, prop) 完成映射
之前处理的reactify需要改写 提供一个Observe方法，在方法中对属性进行处理
可以将这个方法封装到initData方法中
目的：解耦，让各个模块之间没有紧密联系  每个组件都有自己的处理方式

现在的处理办法  属性在更新的时候调用mountComponent方法  mountComponent更新的是什么

实际上更新的全部页面 -》 当前虚拟dom对应的页面
vue实际上以组件为单位进行判断，以节点为你单位进行更新。

- 如果代码中没有自定义组件，那么在比较算法的时候，我们会将全部的模板 对应的虚拟dom进行比较
- 如果代码中有自定义组件，那么在比较算法的时候，就会判断更新的是拿一些组件中的属性，只会判断更新数据的组件，其他组件不会更新
- 小结

  1. 一定要有一个中间的容器，用来存储剋被触发的东西，形式不限于函数 vue中是对象
  2. 需要一个方法，可以往容器中传入东西
  3. 需要一个方法，可以将容器中东西取出来**使用** （函数调用，对象方法的调用）

vue 模型 一个全局的Watcher

页面中的变更（diff）是一组件为单位

- 如果页面中只有一种组件（Vue实例），不会有性能损失、
- 但是如果页面中有多个组件(多watcher的一种情况), 第一次有多个组件的watcher存入到全局watcher中。
  - 如果修改了局部的数据(例如其中一个组件的数据)
  - 表示只会对该组件进行diff算法，也就是说只会重新生成该组件的抽象语法树
  - 只会访问该组件的watcher
  - 也就表示再次往全局存储的只有该组件watcher

第一次存储watcher是全部存到全局watcher中 ，diff算法渲染完后，就释放watcher中所有
每次更新 只存储改变的watcher  更新渲染完后，释放该watcher

# watcher 实现

1. 先考虑修改后的刷新(响应式核心算法)
2. 在考虑依赖收集( 优化 提高性能)

原理  在vue中提供一个构造函数Watcher
Watcher 会提供一些方法

  -get() 用来进行计算或执行处理函数()  触发this.mountComponent()
  -update() 公共外部方法,该方法会触发内部的run()
  -run() 触发运行的 用来判断内部一部运行还是同步运行等（vue中采用二次提交），这个方法会调用内部的get()方法
  -cleanupDep()  简单理解为清楚队列的
问题：页面的渲染是watcher中的get方法

我们的watcher实例有一个属性vm, 表示就是当前的vue实例

缺少Watcher与Dep代码

dep

- 在响应式方法中new Dep()
- 在get方法中进行依赖收集dep.depend();
- 在set方法中进行派发更新dep.notify();

vue中每一个组件都是自治的  所以就会有很多watcher

依赖收集和派发更新

- 多个组件的属性在第一次渲染的时候都会访问到，只要访问到就会进行依赖收集
- 假设修改了其中一个，就会进行派发更新，派发更新就会到依赖收集查到收集到了什么，收集到什么就更新什么

所谓的依赖收集 就是当前的watcher什么属性被访问了，那么在这个watcher计算或渲染页面的时候就会就会将这写收集到的属性进行更新
(有可能在vue中赋值的时候get和set都会调用)

如何将属性与当前watcher关联起来？？？
**vue局部更新  可以说就是子组件的更新 因为每一个组件都一个watcher**
互相引用在数据结构中为**双向链表**
注 --》渲染时候：： 我们在访问对象属性的时候(get),我们的渲染watcher就在全局中 ---对应3
将属性与watcher相关联，就是将当前渲染watcher存储到属性相关的dep中
同时将当前dep存储到全局watcher中，就是说dep与watcher互相引用的关系
- 属性引用了当前的渲染watcher，属性知道是谁渲染了他
- watcher引用了访问的属性(dep)，当前watcher知道渲染了什么属性

- 在全局设置一个targetStack(watcher栈，简单理解为watcher数组，把一个操作中需要使用的watcher都存储起来)
- 在watcher调用get方法的时候，就会将当前watcher放到全局中，在get调用结束的时候，将这个全局watcher移除，也就是那个watcher调用(更新)就把那个watcher方法全局中 ---注：watcher中的个体方法是进行计算和渲染页面 在上面watcher原理中---
  提供两个方法怕pushTarget和popTarget来实现对targetStack的处理
- （页面在渲染(执行this.mountComponent方法)但是时候就是在执行watcher中get()方法）在每一个属性中都有一个Dep对象


# Dep与watcher 属性之间操作

看图片


# vue 源代码

src 下文件夹

compiler  遍历

- 用字符串做模板
- 在遍历文件夹中存放的是对模板字符串的解析的算法，抽象语法树，优化等。
-

core

- 核心，vue构造函数，以及生命周期等方法的部分

platforms 平台

- 针对运行的环境(设备)，有不同的实现
- 也是vue入口

serve  服务端

- 主要是将vue用在服务端处理的代码

sfc 单文件组件

shared 公共工具，方法


1. vue源码
  1. Observe文件夹各个文件的作用
    1. array.js 创建含有 重写数组方法，让所有的响应式数据继承该数据
    2. dep.js Dep类
    3. index.js Observe类，Observe的工厂函数
    4. scheduler.js vue中任务调度工具，watcher执行的核心
    5. traverse.js 递归遍历响应式数据，目的是触发依赖收集
       技巧 对数组去重
       let arr = [1,2,3,3,3,3];
       一般方法 遍历数组  存数据  返回存储数据 indexOf 隐含循环
       利用集合Set
       let _set = {}
       逻辑中断
       1. arr.forEach(item => _set[item] || (_set[item] = true))
        Object.keys( _set )
       2. let _newArr = []
      arr.forEach(item => _set[item] || (_set[item] = true,_newArr.push(item)))

      终极  就是如何去判同  查考vue中loseEqua在shared工具文件中 

    6. watcher.js  watcher核心类
  2. watch和computed
  3. 简单的说明一下patch