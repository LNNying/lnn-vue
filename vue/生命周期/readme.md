#0. new Vue  new 构造实例的过程  会执行_init()初始化方法

#1. beforeCreated 之前做了什么

    也会进行数据的相应的格式化  如 props: ['data'] => data: {type: null}

    initLifecycle(vm): 确认组件（也是vue实例）的父子关系
    InitEvents(vm): 将父组件的自定义事件传递给子组件  主要作用是将父组件在使用v-on 或者 @ 注册自定义事件添加到子组件的事件中心中。
    initRender(vm): 提供将render 函数转为vnode的方法
    beforeCreate: 执行组件的 beforeCreate 钩子函数


#2. created 之前做了什么

    initInjections(vm): 让子组件inject的项可以访问到正确的值。  初始化inject数据  之所以先执行 是因为子组件中会用到参数
    initState(vm): 将组件定义的状态挂载到this下。 状态包括： props, method, data, watch, computed
    initProvide (vm): 初始化父组件提供的provide依赖。  初始化provide数据
    created： 执行组件的 created 钩子函数。

    注意：method中的方法不能为空箭头函数，因为箭头函数的中this在定义的时候就已经固定,而vue中this是vue实例vm
