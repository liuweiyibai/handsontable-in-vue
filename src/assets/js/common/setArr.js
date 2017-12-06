const setArr = function (arr) {
    let newArr = [];
    if (arr.length > 0) {
        for (let i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][i + 1]);
        }
        return newArr;
    }
};
export default setArr;