# 组件的构建思路

双向数据绑定 绑定数据 @input

v-bind 特殊功能对象展开  转化为键值对
$attr: 特性集
如 <input v-bind="$attr"/> 父级 placeholder="aa" 转化为子组件 :placeholder="placeholder"

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


.sync 与 this.$emit('update:value', e.target.value)

- ⽗组件传递的属性⼦组件想修改
- 所以sync修饰符的控制能⼒都在⽗级，事件名称也相对固定update:x



v-model 则是:value 与 @input的语法糖  与this.$emit('input', e.target.value)连用

- 场景：v-model通常⽤于表单控件，它有默认⾏为，同时属性名和事件名均可在⼦组件定义
- 习惯上表单元素⽤v-model

Form

<div>
  <slot></slot>
</div>
provide() { // 当前传的是form实例
  return {
    form: this
  };
}
props: {
  rules: {
    Object
  },
  model: {
    Object,
    require: true
  }
},
data() {
  return{
    error: {}
  }
},
methods: {
// 全局校验
  validate(callback) {
    const tasks = this.$children.fliter(item=>item.prop).map(item => item.validate());
    Promise.all(tasks).then(() => callback(true)).catch(()=> callback(flase))
}}

FormItem

- input 留一个slot
- label和error
- 校验
- <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
  import Schema from async-vlaidator;
  inject: ['form'], // 用于校验  注入的key
  props: {
    label: {
      String
    },
    prop: {
  String
  }
  },
  data() {
    return{
      error: {}
    }
  },
  methods: {
   validate() {
    let value = this.form.model[this.prop];
    let rule = this.form.rules[this.prop];
    const schema = new Schema({[this.prop]: rule});
    return schema.validate({[this.prop]:value},errors => {
    if (errors) {
   this.error = errors[0].message;
  } else {
    this.error = '';
  }
  })
  }
  },
  mounted() {
    this.$on('validate',() => {
      this.validate();
  })
  }

  }
  },


在formItem中注册监听检验事件

所以formItem上的key是用来获取rule和modal数据的  校验返回的是promise

方法 步骤：

- 1. 现获取数据和规则
  2. 创建校验规则

element中用async-validator做校验 -- npm i async-validator

methods: {

validate() {

let value = this.form.model[this.prop];

let rule = this.form.rules[this.prop];


}

},

mounted() {

this.￥on('validate',()=> this.validate())

}
