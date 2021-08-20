
class LYVue {
    constructor(option) {
        let {el, data, methods} = option;
        this.$el = document.querySelector(el);
        this.data = data;
        this.methods = methods;
        this.eventPool = new Map();
        this.showPool = new Map();

        this.init();
    }

    init() {
        this.reactive();
        this.initAttrs(this.$el);
        this.initDom(null);
        this.initEvent(this.eventPool);
    }

    reactive() {
        let _this = this;
        for (let key in this.data) {
            Object.defineProperty(this, key, {
                get() {
                    return _this.data[key]
                },
                set(newVal) {
                    _this.data[key] = newVal;
                    _this.updateDom(key);
                }
            })
        }
    }

    initAttrs(dom) {
        let nodeType = dom.nodeType;
        if (nodeType === 1) {
            let ifNode = dom.getAttribute('v-if');
            let showNode = dom.getAttribute('v-show');
            let eventNode = dom.getAttribute('@click');
            let _opt = null;
            if (ifNode) {
                _opt = {
                    type: 'if',
                    show: this.data[ifNode],
                    key: ifNode
                }
            }
            if (showNode) {
                _opt = {
                    type: 'show',
                    show: this.data[showNode],
                    key: showNode
                }
            }
            if (_opt) {
                this.showPool.set(dom, _opt);
            }

            if (eventNode) {
                this.eventPool.set(dom, this.methods[eventNode]);
            }
        }
        dom.childNodes && (
            dom.childNodes.forEach(item => {
                this.initAttrs(item);
            })
        )
    }

    initDom(data) {
        this.updateDom(data);
    }

    updateDom(data) {
        this.showPool.forEach((v, k) => {
            switch (v.type) {
                case 'if':
                    if (!data) {
                        v.commot = document.createComment('v-if');
                        !v.show && k.parentNode.replaceChild(v.commot, k);
                    } else if (v.key === data) {
                       v.show ? k.parentNode.replaceChild(v.commot, k) : v.commot.parentNode.replaceChild(k, v.commot);
                       v.show = !v.show;
                    }
                    break;
                case 'show':
                    if (!data) {
                        !v.show && (k.style.display = 'none');
                    } else if (v.key === data) {
                        v.show ? k.style.display = 'none' : k.style.display = 'block';
                        v.show = !v.show;
                    }
                    break;
                default:
                    break;
            }
        });
    }

    initEvent(event) {
        event.forEach((v, k) => {
           k.addEventListener('click', v.bind(this), false)
        });
    }
}








export default LYVue;
