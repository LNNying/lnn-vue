/**
 * 任意两个数据判断是否相等
 * 先判断数据类型
 * 在判断对象，数组，日期
 * 在比较对象时  先判断key长度 如果相同 判断每一key对应的value是否相同
 * @param a
 * @param b
 * @returns {boolean}
 */
function looseEquip(a, b) {
    // 基本数据类型一样
    if (a === b) {
        return true;
    }
    // 判断数据是否为对象类型
    let dataA = isObject(a);
    let dataB = isObject(b);

    if (dataA && dataB) {
        try {
            // 判断是否为数组
            let arrayA = Array.isArray(a);
            let arrayB = Array.isArray(b);
            if (arrayA && arrayB) {
                // 数组类型
                return a.length === b.length && a.every((item, index) => {
                    return looseEqual(item, b[index]);
                })
            } else if (a instanceof Date && b instanceof Date) {
                // 日期类型
                return a.getTime() === b.getTime();
            } else if (!arrayA && !arrayB) {
                // 都不是数组类型
                let keyA = Object.keys(a);
                let keyB = Object.keys(b);
                return keyA.length === keyB.length && keyA.every(key => {
                    return looseEqual(a[key], b[key]);
                })
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    } else if (!dataA && !dataB) {
        // 是基本数据类型  统一转化为字符串进行比较
        return String(dataA) === String(dataB);
    } else {
        // 数据类型都不一样
        return false
    }
}

function  isObject(data) {
    return data !== null && typeof data === 'object'
}
