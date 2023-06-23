// console.log("我是a文件");
// exports.say = function (params) {
//   const getMes = require("./b");
//   const message = getMes();
//   console.log(message);
// };
// exports.name = "yms";
// exports.author = "asd";
// exports.say = function (params) {
//   console.log(666);
// };
// module.exports = {
//   name: "yms",
// };
// let a = 1;
// module.exports = a; // 导出函数

// module.exports = [1, 2, 3]; // 导出数组

// module.exports = function () {}; //导出方法
export const name = "alien";
export default function sayhello(params) {
  console.log("hello");
}
