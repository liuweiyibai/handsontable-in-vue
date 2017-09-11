// 用来判断数组中否含有某个元素，返回索引和布尔值
export function contains(needle, array) {
    let len = array.length,
        obj = {
            index: -1,
            bool: false
        };
    for (let i = 0; i < len; i++) {
        if (needle === array[i]) {
            obj.index = i,
            obj.bool = true;
            return obj
        } else {
            return obj;
        }
    }
}
