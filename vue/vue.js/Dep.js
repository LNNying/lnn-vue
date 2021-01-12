class Dep {
    constructor() {
        // 存储与当前dep相关的watcher 知道要渲染什么属性的watcher
        this.subs = [];
    }

    // 添加一个watcher
    addSubs(sub) {
        this.subs.push(sub);
    }
    // 移除一个watcher
    removeSubs(sub) {
        for (let i = this.subs.length - 1; i >= 0; i--) {
            if (sub === this.subs[i]) {
                this.subs.splice(i, 1);
            }
        }
    }
    // 将当前Dep当前watcher(暂时渲染watcher) 关联起来
    depend() {
        // 依赖收集
        if (Dep.target) {
            // 将当前的watcher关联到当前的Dep
            this.addSubs(Dep.target);

            Dep.target.addDep(this);
        }

    }
    // 触发与之相关联的watcher的update方法，起到更新作用
    notify() {
        // 在真实vue中式依次触发this.subs中的watcher的update()方法  就是将dep中subs依次取出来，调用update
        // if (Dep.target) {
            // Dep.target.update();
        // }
        // 此时deps已经关联到watcher
        let deps = this.subs.slice();
        deps.forEach(watcher => {
            watcher.update();
        })
    }

}
// 全局的容器存储渲染watcher
Dep.target = null; // watcher

let targetStack = [];

/** 将当前操作的watcher存储到全局watcher中 */
function pushTarget (target) {
    Dep.target = target;
    targetStack.unshift(target); // vue中源代码中用是push
}

/** 将当前watcher剔除 */
function popTarget() {
    Dep.target = targetStack.shift(); // vue中用pop()  最后为undefined
}

/**
 *  在watcher调用get方法的时候，调用pushtarget(this)
 *  在watcher的get方法结束的时候调用popTarget()
 *  这样当前的watcher就是全局watcher
 * 
 *  
 */