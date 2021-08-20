class Vnode {
    constructor(option) {
        // 标签名  大写标签
        this.tag = option.tag;
        // 标签属性
        this.data = option.data;
        // 值
        this.text = option.text;
        // 标签类型
        this.type = option.type;
        // 子集
        this.children = []
    }
    appendChild(node) {
        this.children.push(node);
    }
}


export default Vnode;
