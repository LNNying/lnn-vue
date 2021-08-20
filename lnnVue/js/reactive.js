export const reactive = function (originData, targetData) {
    Object.keys(originData).forEach(item => {
        let _value = originData[item];
        if (Array.isArray(_value)) {
            _value.forEach(val => {
                if (typeof val === 'object' && val !== null) {
                    reactify(val);
                } else {
                    defineReactive(targetData, item, true);
                }
            })
        } else {
            defineReactive(targetData, item, true)
        }
    })
};


export const defineReactive = function (data, key, enumerable) {
    let _value = data[key];
    if (typeof _value === "object" && _value !== null && !Array.isArray(_value)) {
        reactive(data);
    }
    Object.defineProperty(data, key, {
        enumerable: enumerable,
        configurable: true,
        get() {
            return _value;
        },
        set(newVal) {
            data[key] = newVal;
        }
    })
};
