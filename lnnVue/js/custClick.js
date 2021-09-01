const isValid = /\{\{(.+?)\}\}/;
class Nyvue {
    constructor(option) {
        const {el, data, methods} = option;
        this._el = el;
        this._$el = document.querySelector(this._el);
        this._data = data;
        this._methods = methods;
        this.eventPool = new Map();
        this.domPool = new Map();

        this.init();
    }

    init() {
        this.reactive(this._data);
        this.initDom(this._$el);
        this.bindMethod(this.eventPool);
    }

    reactive(data) {
        let _this = this;
        Object.keys(data).forEach(key => {
           Object.defineProperty(this, key, {
               get() {
                   return data[key];
               },
               set(newVal) {
                   data[key] = newVal;
                   _this.updateDom(key);
               }
           });
        });
    }

    initDom(dom) {
        let nodeType = dom.nodeType;
        if (nodeType === 1) {
            let click = dom.getAttribute('@click');
            if (click) {
                this.eventPool.set(dom, this._methods[click]);
            }
        } else if (nodeType === 3) {
            let value = dom.nodeValue;
            if (isValid.test(value)) {
                let key = value.match(isValid)[1].trim();
                this.domPool.set(key, dom.parentNode);
                dom.parentNode.innerText = this._data[key];
            }
        }
        dom.childNodes && (dom.childNodes.forEach(child => {
            this.initDom(child);
        }));
    }

    bindMethod(events) {
        for (let [k, v] of events) {
            k.addEventListener('click', v.bind(this), false)
        }
    }

    updateDom(key) {
        this.domPool.get(key).innerText = this._data[key];
    }
}




export default Nyvue;
