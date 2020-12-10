/**
 * Watcher 观察者 用于发射更新的行为
 */
class Watcher {
    /**
     * 
     * @param {Object} vm vue实例
     * @param {String | Function} expOrfn 如果是渲染watcher 传入的就是渲染函数  如果是计算watcher 传入的就是路径表达式
     * getter 就是前面this.mountComponent方法中mount渲染函数
     */
    constructor(vm, expOrfn) {
        this.vm = vm;
        this.getter = expOrfn;
        this.deps = []; // 依赖项
        this.depIds = {}; // 是一个Set类型，用于保证依赖项的唯一性

        // 一开始就需要渲染  真实vue中 this.lazy ? undefined : this.get()
        this.get();
    }

    /**计算 触发getter() */
    get () {
        this.getter.call(this.vm, this.vm); // 在这里解决上下文问题
    }

    /**
     * 执行，并判断是否懒加载 还是同步执行，还是异步执行
     * 只考虑异步执行(简化的式同步执行)
     */
    run() {
        this.get();
        // 真正vue中式调用的是queueWatcher，来触发nextTick进行异步执行的
    }

    /**对外公开的函数 用于在属性发生变化的时候触发的接口 */
    update() {
        this.run();
    }
    /** 清空依赖队列 */
    cleanupDep() {
        
    }
}