// const say = require("./a");
// const obj = {
//   name: "yms",
//   author: "yms",
// };
// console.log("我是b文件");
// console.log("打印a模块", say);
// setTimeout(() => {
//   console.log("异步打印a模块", say);
// }, 0);
// module.exports = function (params) {
//   return obj;
// };
const a = require("./a");
module.exports = function (params) {
  console.log(a.name);
};
