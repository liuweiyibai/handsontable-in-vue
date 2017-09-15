export function MathRound(len) {
  var num = "";
  for (var i = 0; i < len; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num
};

// 获取某个字符串中某个字符前面的字符和 后面的字符         
export function getStr(string, str) {
  let str_before = string.split(str)[0],
    str_after = string.split(str)[1],
    objStr = {
      before: str_before,
      after: str_after
    };
  return objStr;
};