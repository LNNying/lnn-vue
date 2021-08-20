const isValid = /\{\{(.+?)\}\}/;
class Mvvm {
    constructor(option) {
        this._el = option.el;
        this.$el = document.querySelector(this._el);
        this._data = option.data;
        this.domPool = {};
        this.data = {};
        this.init();
    }

    init() {
        this.reactive(this._data);
        this.compilerDom(this.$el);
        this.bindInputEvent();
    }
    reactive(data) {
        let _this = this;
        Object.keys(data).forEach(item => {
            Object.defineProperty(this.data, item, {
                get() {
                    return data[item];
                },
                set(newVal) {
                    data[item] = newVal;
                    _this.updateDom(item, newVal);
                }
            })
        })
    }

    compilerDom(template) {
        let nodeType = template.nodeType;
        if (nodeType == 1) {
            let childNodes = template.childNodes;
            if (childNodes) {
                childNodes.forEach(item => {
                    this.compilerDom(item)
                })
            }
        } else if (nodeType === 3) {
            let _valueFlag = template.nodeValue;
            if (isValid.test(_valueFlag)) {
                let _value = _valueFlag.match(isValid)[1].trim();
                let parentNode = template.parentNode;
                this.domPool[_value] = parentNode;
                parentNode.innerHTML = this.data[_value];
            }
        }
    }

    bindInputEvent() {
        let inputs = this.$el.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('keyup', this.keyUpEvent.bind(this, input), false)
        })

    }

    keyUpEvent(input) {
        let vModel = input.getAttribute('v-model');
        if (vModel) {
            this.data[vModel] = input.value;
        }
    }

    updateDom(key, value) {
        if (Object.keys(this.domPool).length) {
            this.domPool[key].innerHTML = value;
        }
    }

}






export default Mvvm;
