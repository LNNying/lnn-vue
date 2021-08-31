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
    delete: function() {}
}

const events = require('events');
// 创建事件对象
const emitEvent = events.EventEmitter();

emitEvent.on('hello', function() {
    console.log(232)
});
emitEvent.on('hello', function() {
    console.log(2332)
});
emitEvent.on('hello', function() {
    console.log(2332)
});
