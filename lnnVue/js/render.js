export const render = function (vNode, el) {
    let nodeTemplate = getDomNode(vNode);
    updateDom(el, nodeTemplate);
};

export const getDomNode = function (vNode) {
    if (vNode.type == 1) {
        let _node = document.createElement(vNode.tag);
        let attrs = vNode.data;
        Object.keys(attrs).forEach(item => {
            let name = item;
            let value = attrs[item];
            _node.setAttribute(name, value);
        });
        let child = vNode.children;
        child.forEach(item => {
            _node.appendChild(getDomNode(item));
        });
        return _node;
    } else if (vNode.type == 3) {
        return document.createTextNode(vNode.text);
    }
};

export const updateDom = function (el, template) {
    el.parentNode.replaceChild(template, el);
};
