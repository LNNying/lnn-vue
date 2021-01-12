
let Vue;

class Store {
    constructor(options) {
        // 实现响应式
        this.vm = new Vue({
            data: {
                state: options.state
            }
        });
        let getters = options.getters || {};
        this.getters = {}; // 当前实例
        Object.keys(getters).forEach(getName => {
            // 在当前getter添加
            Object.defineProperties(this.getters, getName, {
                get() {
                    return getters[getName](this.state);
                }
            });
        });

        let mutations = options.mutations || {};
        this.mutations = {};
        Object.keys(mutations).forEach(getMuName => {
            // 在mu中定义方法
            this.mutations[getMuName] = payload => {
                // 底层自己定义的方法
                mutations[getMuName](this.state, payload);
            }
        });

        let actions = options.actions || {};
        this.actions = {};
        Object.keys(actions).forEach(getActionName => {
            // 底层自己定义的方法  最好对照代码看
            this.actions[getActionName] = (payload) => {
                actions[getActionName](tihs, payload);
            }
        })
    }
    // 就是给state属性添加一个get方法
    get state() {
        return this.vm.state;
    }
    // 定义commit 方法 调用层 调用方法  同步
    // 通过将commit定义成箭头函数 韩村this指针
    // 普通函数 在调用action时将this结构  commit中this会丢失
    commit = (method, payload) => {
        this.mutations[method](payload);
    }
    // 定义action 分发方法dispatch  异步
    dispatch(method, paoload) {
        this.actions[method](paoload);
    }
}
/**
 * 跟组件都是 new Vue实例
 * 第一个子组件是 id="app"
 * @param {}} v 
 */

// 必须要有一个install方法  通过vue.use将vue实例传进来  插件固定写法
const install = (v) => {
    console.log(v); // v=Vue
    Vue = v;
    Vue.mixin({ // 通过全局混入在每一个组将 上添加$store
        beforeCreate() {
            console.log(this.$options); // Vue实例上所有组件参数
            if (this.$options && this.$options.store) { // 查看根节点上是否应用store
                this.$store = this.$options.store; // 赋值到根节点
            } else { // 不是根节点  就找父节点的
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
};


export default {
    install,
    Store
}