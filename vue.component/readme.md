# 组件的构建思路
双向数据绑定 绑定数据 @input

<Input :value="value" @input="oninput"/>
value 是v-model 传进来的
props: {
    value: {
        String
    }
}
oninput(e) {
this.$emit('input', e.target.value)
}

v-model是语法糖  是:value="value"和@input="value=$event"的缩写  原理主要在编译器

.sync
<Input :value.sync="value" @input="oninput"/>
oninput(e) {
this.$emit('input', e.target.value)
this.$emit('update:value', e.target.value) // 双绑定
}

.sync 与 v-model 的区别
- .sync 与 this.$emit('update:value', e.target.value)
  - ⽗组件传递的属性⼦组件想修改
  - 所以sync修饰符的控制能⼒都在⽗级，事件名称也相对固定update:x
- v-model 则是:value 与 @input的语法糖  与this.$emit('input', e.target.value)连用
  - 场景：v-model通常⽤于表单控件，它有默认⾏为，同时属性名和事件名均可在⼦组件定义
  - 习惯上表单元素⽤v-model