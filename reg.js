//去首尾空格
{
  let str = " ymsadas  ";
  let res = str.replace(/(^\s+)|(\s+$)/g, "");
  console.log(res);
  console.log(res + "yms");
}
//_转驼峰命名
{
  let s = "a_text_hello";
  let res = s.replace(/_[a-z]/g, (match) => {
    // console.log(match);
    return match.slice(1).toLocaleUpperCase();
  });
  console.log(res);
}
//匹配某个字母是否存在于字符串
{
  let reg = /a/;
  console.log(reg.test("apple"));
  let reg1 = /world/;
  console.log(reg1.test("hello world"));
}
// match返回匹配的结果
{
  let reg = /hello/gi;
  let str = "hello world。 Hello, in a new world";
  console.log(str.match(reg));
}
{
  let reg = new RegExp("^\\[aehyok\\]");
  //   console.log(reg.test("[aehyok]123")); // true
  reg.test("[aeh1k]123"); // false
}
//字符匹配的次数
{
  let reg = /abc{2,5}d/g;
  console.log(reg.test("abcccccd"));
  //   ? === {0,1}
  //   + === {1,} 一次或多次
  //   * === {0,} 0次或多次
}
//匹配位置 ^ 以..开头 $ 以..结尾
{
  //  查看字符串中是否有单词开始abc
  let reg = /\babc/;
  //  查看字符串中是否有单词结束为abc
  let reg1 = /abc\b/;
}
{
  //匹配单词的中间部分
  //   \B 既不能匹配某个单词开头部分，也不能匹配结尾部分
  let reg = /\Babc/;
  reg.test("hello abcdef"); // false
  reg.test("hello world zabcd"); // true
}
{
  // \d === [0-9] 是匹配一位数字
  // \D === [^0-9] 是匹配除数字意外的任意字符
  //  . 除了换行符以外的任何字符串 /./s s允许.匹配换行符
  // \w === [0-9a-zA-z_] 匹配字母加数字加下划线
  // \W === [^0-9a-zA-Z_] 匹配非单词字符下划线
  // \s 匹配空白符和  \S 匹配非空白符
}
//身份证
{
  let id = "130183200102030019";
  let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9]|x|X/;
  // console.log(reg.test(id));
}
//根据身份证获取出生年月日
{
  let id = "130183200102030019";

  function getBirthdayFromIdCard(idCard) {
    var birthday = "";
    birthday = idCard.substr(6, 8);
    let res = birthday.replace(/(.{4})(.{2})/, ($1, $2, $3) => {
      return $2 + "-" + $3 + "-";
    });
    return res;
  }
  // console.log(getBirthdayFromIdCard(id));
}
//手机号验证(第二位不能是2和4其他都可以)
{
  const reg = /^1(3|[5-9])\d{9}$/;
  // console.log(reg.test(13832184656));
}
//用户名正则，4到16位（字母，数字，下划线，减号）
{
  let reg = /[A-Za-z\d_-]{4,16}/;
  console.log(reg.test("asd_--_-das153"), "用户名");
}
//密码强度正则 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
{
  let reg = /.*(?=.{6})(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*? ]).*$/;
  // console.log(reg.test("1inFopush#"));
}
//邮箱
{
  let reg = /([A-Za-z\d_\.-])+\@([A-Za-z\d_\.-])+\.([A-Za-z]{2,4})$/;
  console.log(reg.test("yyyyyyms@163.com"), "邮箱");
}
//qq号 (5-14位)
{
  let reg = /^[1-9]\d{4,10}$/;
  console.log(reg.test(1045349215), "qq号");
}
//微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
{
  let reg = /^[A-Za-z]([-_a-zA-Z\d]{5,9})$/;
  console.log(reg.test("ymsaaaaaaaaaaaaaaaaaaa"), "微信号");
}
//至少输入n个数字
{
  let reg = /^\d{3,}$/;
  // console.log(reg.test(2333));
}
//只能由字母组成
{
  let reg = /[a-z]+$/i;
  // console.log(reg.test("asd1"));
}
//带两位小数点的正数或负数
{
  const reg = /^(\-)?\d+(\.\d{1,2})?$/;
  // console.log(reg.test("11.11"));
}
