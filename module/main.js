// const a = require("./a");
// const b = require("./b");
// console.log(a);
// a.name = "yyyyms";
// const b = require("./b");
// b();
setTimeout(() => {
  const res = import("./a");
  res.then((res) => {
    console.log(res);
  });
}, 0);
