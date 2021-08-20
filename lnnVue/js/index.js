/***
 * 模板解析  compile 主要在于render  生成抽象语法树(ast) 结合数据生成虚拟dom
 * 实现数据双向绑定  数据代理到this中
 * 实现发布订阅
 * 更新视图
 * 模拟处理v-model
 * 发布订阅模式
 */

import {compileTemplate, bindTemplateData} from '../js/complie.js';
import {reactive} from './reactive.js';
import {render} from './render.js'
class LYVue {
    constructor(option) {
        this._el = option.el;
        this._data = option.data;
        this.$el= document.querySelector(this._el);
        this._vNode = null;
        this.init();
    }
    init() {
        // 生成ast
        let _astNode = compileTemplate(this.$el);
        // 绑定数据
        this._vNode = bindTemplateData(_astNode, this._data);
        // 生成响应式数据
        reactive(this._data, this);
        // 渲染
        render(this._vNode, this.$el);
    }
}

export default LYVue;
