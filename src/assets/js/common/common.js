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

// 截取某个字符串中某个字符的前或者后的字符,如果传入字符是1，就返回前面的字符，传入字符是其他就返回后面的
export function getStr(string, str,) {
    let index = string.lastIndexOf(str); //查找最后一个str出现的位置
    let ss = string.slice(index, string.length); // 截取从当前位置到最后一个字符的所有字符返回
    return ss;
}

export function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (var i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}