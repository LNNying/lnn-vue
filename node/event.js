/**
 * node 事件驱动
 * 订阅事件 一个事件 处理不同的逻辑
 * 分离有循序的执行接下来的方法
 */

let eventPool = {
    pool: {}, // 订阅事件池  事件队列
    on: function(eventName, event) { // 收集事件
        if (this.pool[eventName]) {
            this.pool[eventName].push(event);
        } else {
            this.pool[eventName] = [];
            this.pool[eventName].push(event);
        }
    },
    emit: function(eventName, eventMsg) { // 出发事件
        if (this.pool[eventName]) {
            this.pool[eventName].forEach(event => {
                event(eventMsg);
            })
        }
    },
    remove: function(eventName, event) {
        const events = this.pool[eventName];
        if (events) {
            events.forEach((item, index) => {
                if (item === event) {
                    events.splice(index, 1);
                }
            })
        }
    }
};

/**
 * 引入事件模块
 * on 注册事件
 * emit 触发事件
 * off \ removeListener 移除注册事件 参数 事件名 事件注册和移除时应该是定义在外面的表达式形式的(应该判断的是函数的地址值)
 */
const EventEmitter = require('events');
// 创建事件对象
const emitEvent = new EventEmitter();
const doing = function() {
    console.log(1)
};

emitEvent.on('hello', doing);
emitEvent.on('hello', function() {
    console.log(2)
});
emitEvent.on('hello', function() {
    console.log(3)
});

emitEvent.removeListener('hello', doing);
emitEvent.emit('hello');
console.log(emitEvent);

