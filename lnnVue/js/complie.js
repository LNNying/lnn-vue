import _Vnode from './_vNode.js';
import {getDataByPath} from './util.js'

const isVaild = /\{\{(.+?)\}\}/;

export const compileTemplate = function (template) {
    let nodeType = template.nodeType;
    let _vNode = null;
    if (nodeType === 1) {
        let _tag = template.nodeName;
        let _attrList = template.attributes;
        let _attrs = {};
        for (let i = 0, len = _attrList.length; i < len; i++) {
            let item = _attrList[i];
            _attrs[item.nodeName] = item.nodeValue;
        }
        _vNode = new _Vnode({
            tag: _tag,
            data: _attrs,
            text: undefined,
            type: nodeType
        });

        if (template.childNodes.length) {
            template.childNodes.forEach(item => {
                _vNode.appendChild(compileTemplate(item));
            });
        }

    } else if (nodeType === 3) {
        _vNode = new _Vnode({
            tag: undefined,
            data: undefined,
            text: template.nodeValue,
            type: nodeType
        });
    }
    return _vNode;
};

export const bindTemplateData = function (node, data) {
    let _node = null;
    if (node.type == 1) {
        _node = new _Vnode({
            tag: node.tag,
            data: node.data,
            type: node.type,
            text: node.text
        });
        if (node.children.length) {
            node.children.forEach(item => {
                _node.appendChild(bindTemplateData(item, data));
            })
        }
    } else if (node.type == 3) {
        let _value;
        _value = node.text.replace(isVaild, (m, g) => { // m匹配到数据  g匹配到的值
            let _g = g.trim();
            return getDataByPath(data, _g);
        });
        _node = new _Vnode({
            tag: node.tag,
            data: node.data,
            type: node.type,
            text: _value
        })
    }
    return _node;
};

// 模拟input中v-model双向绑定
function bindInput() {
    
}
