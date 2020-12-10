class Dep {
    constructor() {
        // 存储与当前dep相关的watcher 知道要渲染什么属性的watcher
        this.subs = [];
    }

    // 添加一个watcher
    addSubs(sub) {

    }
    // 移除一个watcher
    removeSubs(sub) {

    }
    // 将当前Dep当前watcher(暂时渲染watcher) 关联起来
    depend() {

    }
    // 触发与之相关联的watcher的update方法，起到更新作用
    notify() {
        // 在真实vue中式依次触发this.subs中的watcher的update()方法  就是将dep中subs依次取出来，调用update
        if (Dep.target) {
            Dep.target.update();
        }
    }

}
// 全局的容器存储渲染watcher
Dep.target = null; // watcher