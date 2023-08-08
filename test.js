let arr = [1, 2, 5, 6, 6];
let res = arr[arr.length - 1];
// console.log(res);

// console.log( new Date() instanceof Object );
// console.log( typeof new Array());
// console.log( typeof new Function() );
let str = "yms";
// console.log(str.toString());
{
  let str = "n_i ha+ohh-h";
  let res = str.split(/[_+-]|\s/);
  // console.log(res);
}
{
  let obj = {
    a: [1, 2, 3],
  };
  let obj1 = {
    a: [1, 2, 3],
  };
  let a = [1, 2, 3];
  Object.defineProperty(a, "a", {
    // value:[1,2,4],
    set() {
      console.log("obj发生变化");
    },
    get() {
      console.log("obj被获取");
    },
  });
  // const name = new Proxy(obj1.a,{
  //     set(){
  //         console.log('a发生变化');
  //     },
  //     get(){
  //         console.log('a被获取');
  //     }
  // });
  // console.log(name[0]);
  // let a = name
  // console.log(a);
  // name[0] = []
}
{
  function Debounce(timeout, fn) {
    let timer = null;
    return function (params) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, timeout);
    };
  }
}
{
  let str = "5";
  let res = str.split(".");
  // console.log(res);
}
{
  let arr = [1, 2, 3];
  let test = [];
  for (let i = 0; i < arr.length; i++) {
    Object.defineProperty(test, i, {
      value: arr[i],
      // get(){
      //     return arr[i];
      // }
    });
  }

  arr[0] = 0;
  // console.log(test);
}
{
  function f1(params) {
    let a = 1;
    function f2(params) {
      console.log(a);
    }
    return f2;
  }

  const fn = f1();

  function test(fn) {
    let a = 2;
    fn();
  }
  // test(fn)
}
{
  // for (let i = 0; i < 10; i++) {
  //     (function (j) {
  //         setTimeout(() => {
  //             console.log(j);
  //         }, 1000);
  //     })(i)
  // }
}
{
  const obj = {
    a: 1,
    b: {
      c: 1,
    },
  };

  const newobj = Object.assign(obj);
  newobj.b.c = 2;
  // console.log(obj);
}
{
  const obj = {
    value: 10,
    test: 1,
  };
  // console.log({...obj});
  const arr = [1, 2, 3, 0];
  // let foo = { ...arr };
  // console.log(foo);
  let res = arr.sort((a, b) => a - b);
  // console.log(arr === res);
}
{
  const arr = new Array(5);
  arr.map((item) => {
    return item + 1;
  });
  // console.log(arr[0]);
}
{
  const p = new Promise((resolve, reject) => {
    resolve("ok");
    throw new Error("test");
  });
  p.then((res) => {
    return 1;
  })
    .then((res) => {
      // console.log(res);s
    })
    .catch((err) => {
      // console.log(err,'11');
    });
}
{
  const arr = [{ a: 1 }, { b: 2 }, { c: 3 }];
  arr.forEach((element) => {
    if (element.a) {
      element.a = 0;
    }
  });
  // console.log(arr);
}
//拷贝数组
{
  const arr = [1, 2, 3];
  const res = arr.concat();
  // const res =  Object.assign({},obj)
  arr[0] = 0;
  // console.log(res);

  const res1 = arr.slice();
  arr[0] = 1;
  // console.log(res1);
}
{
  // console.log(2=== true);
  // console.log(!!'1');
}
{
  let arr = [1, 2, 5];
  let obj = {
    a: 1,
    b: 2,
    c: 3,
  };
}
{
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      console.log(1);
    }
    getName() {
      return this.name;
    }
    getAge() {
      return this.age;
    }
  }
  class Student extends Person {
    constructor(name) {
      super();
      console.log(name);
    }
  }
  // let stu1 = new Student('有鱼');
  // console.log(stu1.getName());// 我覆盖了父级的方法,有鱼
  // console.log(stu1.getAge());//2
}
//10进制转
{
  let a = 255;
  // console.log(a.toString(16));
  // console.log(parseInt('AF', 16));
}
{
  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  const lydia = new Person("Lydia", "Hallie");
  const sarah = Person("Sarah", "Smith");
  // console.log(lydia);
  // console.log(sarah);
}
{
  const obj = {
    a: "one",
    b: "two",
    a: "three",
  };
  // console.log(obj);
}
{
  const person = { name: "Lydia" };
  function sayHi(age) {
    console.log(`${this.name} is ${age}`);
  }
  // sayHi.call(person,21)
  // sayHi.bind(person,21)
}
{
  const set = new Set();
  set.add("abc");
  set.add("acb");
  set.add("abc");
  // console.log(set);
}
{
  const map = new Map();
  const s = Symbol("1");
  map.set(s, "yms");
  map.set(s, "jwd");
  // console.log(map);
  const set = new Set();
  set.add(s);
  set.add(s);
  // console.log(set);
}
{
  let arr = [{ a: 1 }, { b: 2 }, { c: 2 }];
  // console.log(arr.slice(-1)[0]);
  // console.log(arr.splice(-1,1));
  // console.log(arr.at(-1));
}
{
  let arr = [{ a: 1 }, { b: 2 }, { c: 2 }];
  function testFn(params) {
    params[0].a = 0;
  }
  const test = [...arr];
  testFn(test);
  // console.log(arr);
  // console.log(test);
}
{
  let obj = {
    id: "1",
    name: "zhangsan",
    child: {
      a: 1,
    },
  };
  let br = { ...obj };
  function test(params) {
    params.child.a = 2;
  }
  // br.child.a = 2
  test(br);
  //    console.log(obj);
}
{
  // let i = 0
  // function test() {
  //     console.log(i++);
  // }
  // setInterval(() => {
  //     test(i)
  // }, 1000);
}
{
  //findLast   findLastIndex
  let arr = [1, 8, 2, 3, 4, 8, 6];
  // console.log(arr.findIndex(n => n === 8));
}
{
  const obj = {
    a: function name(params) {
      console.log(1);
    },
    b: undefined,
    c: null,
    d: /\w/,
    e: NaN,
    f: new Date(),
  };
  // console.log(JSON.parse(JSON.stringify(obj)));
}
{
  //static
  class test {
    testFn() {
      console.log("666");
    }
  }
  const name = new test();
  // name.testFn();
}
{
  //es5 的构造函数上的方法 就是 static 静态方法

  let Animal = function (type) {
    this.type = type;
  };
  Animal.eat = function (params) {
    console.log("666");
  };
  Animal.prototype.walk = function (params) {
    Animal.eat();
  };
  // const cat = new Animal("cat");
  // cat.walk();
}
{
  // function test(params) {
  //   let b = 2;
  //   let a = () => {
  //     console.log(this);
  //   };
  // }
  class test {
    constructor() {}
    a = () => {
      console.log(this);
    };
  }
  // console.log(test);
  // const test1 = new test();
  // console.log(test1);
  // test1.b = 1;
  // test1.a();
}
{
  // console.log(typeof new Function());
  const set = new Set();
  const symbol = Symbol();
  set.add(NaN);
  set.add(NaN);
  // console.log(set);
}
{
  // ?????
  const res = [1, 2, 3].map(parseInt);
  // console.log(res);
}
//千分位
{
  let num = "1234567890";
  function test(num) {
    // num.toString().replace(/(\d)(?=(\d{3})+$)/g);
    let reg = /(\d)(?=(\d{3})+$)/g;
    let res = num.replace(reg, ($1) => {
      return $1 + ",";
    });
    console.log(res);
  }
  function test1(num) {
    let str = num + "";
    return str
      .split("")
      .reverse()
      .reduce((pre, cur, index) => {
        return (index % 3 ? cur : cur + ",") + pre;
      });
  }
  // console.log(test1(num));
}
{
  //catch
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功");
    }, 1000);
  });
  // p.then(res)
  //   .then(
  //     (res) => {
  //       console.log(res);
  //       return res;
  //     },
  //     (err) => {
  //       console.log(err);
  //       return err;
  //     }
  //   )
  //   .finally(() => {
  //     console.log(1111);
  //   });
}
{
  //Etag 是由Last-Modified 和 connect-length的十六进制组合成的
  // console.log(new Date(parseInt("5dde6f80", 16) * 1000));
}
{
  class Father {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    running() {
      console.log(this.name + "在跑步");
    }
  }
  class Son extends Father {
    constructor(name, age) {
      super();
      this.name = name;
    }
  }
  //只需要一个extends 关键字即可轻松实现继承父类中的constructor属性
  //!!!注意：在子类（派生类）的构造函数中使用this或者返回默认对象之前，必须先通过super调用父类的构造函数！

  // super的使用位置有三个：

  // 子类的构造函数
  // 实例方法
  // 静态方法
  const p1 = new Son("yms", 20);
  // console.log(p1);
  // p1.running();s
}
{
  var a = 1;
  function fa() {
    a = 2;
    // console.log("a1:", a); //2
  }
  fa(); //2
  setTimeout(() => {
    let a = 3;
    // console.log("a2:", this); //1
    // console.log("a3:", a); //3
  }, 0);
  Promise.resolve().then(() => {
    // console.log("a4:", a); //2
  });
}
{
  // console.log(!undefined);
}
{
  let arr = [1, "a", 2, "c", 4, 3];
  // console.log(arr.sort());
}
{
  //劫持数组方法
  const arrProto = Array.prototype;
  const newProto = Object.create(arrProto);
  Object.defineProperty(newProto, "push", {
    value: function (params) {
      function test(params) {
        console.log(11111);
      }
      return test;
    },
    configurable: true,
    writable: true,
    enumerable: true,
  });
  let test = [1, 2, 3];
  test.__proto__ = newProto;
  // test.push()();
}

var foo = null;
function foo(params) {
  console.log("foo3");
}
// console.log(foo);
{
  let arr = [
    { name: "云牧", age: 28 },
    { name: "许嵩", age: 30 },
  ];
  arr.forEach((item) => {
    item.age = 0;
  });
  // console.log(arr);
}
{
  // new Promise((res, rej) => {
  //   res(1);
  // })
  //   .then((v) => {
  //     console.log(v);
  //     throw new Error("error");
  //   })
  //   .then(() => {
  //     console.log(2);
  //   })
  //   .catch(() => {
  //     console.log(3);
  //   })
  //   .then(() => {
  //     console.log(4);
  //   });
}
{
  async function test(params) {
    let res = await 123;
    console.log(res);
    // return new Promise((resolve, reject) => {
    //   reject("错误");
    // });
  }
  // test()
  //   .then((res) => {
  //     console.log(res, "res");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}
{
  // function A() {}
  // const a = new A();
  // console.log(a.constructor === A); //A
  // console.log(Object.prototype.__proto__); //Objext
  // console.log(a.__proto__ === A.prototype); //A.prototype
  // console.log(A.prototype.constructor === A); //A
}
{
  let value = 21;
  function get() {
    console.log(typeof value);
    var value = "john";
  }
  // get();
}
//判断某个对象中是否是某个属性
{
  function hasProperty(obj, key) {
    // console.log(obj[key]);

    console.log(Object.keys(obj));
    return Object.hasOwnProperty(obj, key);
    // console.log(key in obj);
  }
  // const obj = {
  //   a: 1,
  // };
  a === 1 && a === 2 && a === 3;
  // Object.defineProperty(obj, "c", {
  //   value: 2,
  //   enumerable: false,
  // });
  // console.log(hasProperty(obj, "c"));
  // console.log(obj.c);
}
{
  let obj = {
    a: 1,
    b: 2,
  };
  // const { x, y } = obj;
  // console.log(...obj);
  let obj1 = { ...obj };
  // console.log(obj1);
}
{
  // console.log(__filename);
  const path = require("path");
  // console.log(path.join(__dirname, "a", "test.js"));
  // console.log(path.resolve(__dirname, "a"));
}
{
  let data = new Date();
  data = new RegExp(/\d/);
  data = function (params) {
    console.log(111);
  };
  data = undefined;
  // let res = JSON.parse(JSON.stringify(data));
  // console.log(res);
}
{
  let str = "<template>？？？</template>";
  // console.log(typeof str);
  // console.log(typeof JSON.stringify(str));
}
{
  let str = "尹";
  // console.log(str.charCodeAt().toString());
  let res = Buffer.from(str).toString("base64");
  // console.log(res);
}
{
  function test(params) {
    let a = 1;
    console.log(this, "this");
  }
  // test();
}
function _new(fn, ...args) {
  if (typeof fn !== "function") return;
  let obj = Object.create(fn.prototype);
  let res = fn.apply(obj, args);

  return;
}
{
  let reg = /\d/;
  let res = JSON.parse(JSON.stringify(reg));
  // console.log(res);
}
{
  // let p1 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("p1完成");
  //   }, 2000);
  // }).then((res) => {
  //   console.log(res);
  //   return 1;
  // });
  // let p2 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("p2完成");
  //   }, 1000);
  // })
  //   .then((res) => {
  //     console.log(res);
  //     return 2;
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  // let tasks = [p1, p2];
  // let race = Promise.race(tasks);
  // setTimeout(() => {
  //   console.log(race);
  // }, 3000);
}

// 2.使用正则表达式从一个字符串里取出数字
{
  let str = "as3d21fa32s1df";
  let reg = /\d+/g;
  let res = str.match(reg);

  // console.log(res);
}
// 4.使用js的闭包实现一个计数器函数，每次调用时+1
{
  let num = 0;
  function count() {
    console.log(num++);
  }
  // count();
  // count();
  // count();
  // count();
}
// 5.实现一个函数，使得给定一个字符串，将字符串中每一个单词的首字母大写
{
  let str = "hello my name is yinmengsong";
  function test(str) {
    let arr = str.split(" ");
    let res = arr.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    return res.join(" ");
  }
  // console.log(test(str));
}
{
  //正则 里面的单词首字母大写
  let str = "hello my name is yinmengsong";
  function test(str) {
    let reg = /\b\w/g;
    let res = str.replace(reg, ($1) => {
      return $1.toUpperCase();
    });
    console.log(res);
  }
  // test(str);
}
{
  // JSON.parse
  let obj = [1, 2, 3];
  // console.log(JSON.stringify(obj));
  // let str = { a: 1 };
  // console.log(JSON.parse(str));
}
// 7.实现一个函数，将js对象里值为null undefined 的属性去除
{
  let obj = {
    a: 1,
    b: 2,
    c: {
      a: null,
      b: undefined,
      c: {
        a: 1,
        b: undefined,
        d: null,
      },
    },
  };
  function test(obj) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (obj[key] === null || obj[key] === undefined) {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          test(obj[key]);
        }
      }
    }
  }
  // test(obj);
  // console.log(obj);
}
{
  function test(params) {
    console.log(this);
    setTimeout(() => {
      console.log(this);
    }, 2000);
  }
  let obj = {
    a: 1,
    name: "yms",
    age: 18,
  };
  // test();
}
//多个数组取交集
{
  let arr1 = [1, 2, 3, 4, 5];
  let arr2 = [2, 3, 4];
  let arr3 = [3, 4];
  function intersection(arrs) {
    return arrs.reduce((pre, cur) => {
      return pre.filter((item) => {
        return cur.includes(item);
      });
    });
  }
  // console.log(intersection([arr1, arr2, arr3]));
}
// 10进制转n进制
{
  let a = 255;
  // console.log(a.toString(16));
}
//n进制转10进制
{
  let a = 1010;
  // console.log(parseInt(a, 2));
}
//重新加载当前页面
{
  // location.reload();
}
//滚动到页面顶部
{
  // window.scrollTo(0, 0)
}
//将一个元素顺滑的滚动到可视区域的起点
{
  // document.body.scrollIntoView({
  //   behavior: "smooth",
  //   block: "start", //end 回到底部
  // });
}
//重定向
{
  // location.href = '666'
}
// {
//   async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
//   }

//   async function async2() {
//     console.log("async2");
//   }

//   console.log("script start");

//   setTimeout(function () {
//     console.log("setTimeout");
//   }, 0);

//   async1();

//   new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
//   }).then(function () {
//     console.log("promise2");
//   });

//   console.log("script end");
// }
// {
//   setTimeout(() => {
//     console.log(1);
//   }, 0);

//   new Promise((resolve) => {
//     console.log(2);
//     resolve();
//     console.log(3);
//   }).then(() => {
//     console.log(4);
//   });

//   const promise2 = new Promise(async (resolve) => {
//     console.log(await resolve(5));
//     console.log(6);
//   });

//   async function test() {
//     console.log(7);
//     console.log(await promise2);
//     console.log(8);
//   }

//   test();
//   console.log(9);
// }
{
  // async function test(params) {
  //   return await new Promise((resolve, reject) => {
  //     resolve(5);
  //   });
  //   // do...
  // }
  // test().then((res) => {
  //   console.log(res);
  // });
}
{
  const o = (function () {
    const obj = {
      a: "a",
      b: "b",
    };
    return {
      get(c) {
        return obj[c];
      },
    };
  })();

  o.get("this");

  // 下面是答案
  // Object.defineProperty(Object.prototype, "this", {
  //   get() {
  //     return this;
  //   },
  // });
}
{
  ["1", "2", "3"].map(parseInt);
}
//用promise实现每个一秒输出一个1
// 如果输入1 2 3 ...呢
//1.借助async
{
  async function test(params) {
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(i);
          console.log(i);
        }, 1000);
      });
    }
  }
  // test();
}
//2.then里面递归
{
  function test(i) {
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 1000);
    });
    p.then((res) => {
      console.log(res);
      test(i + 1);
    });
  }
  // test(1);
}
//3.巧妙利用then链式调用
// {
//   let promise = Promise.resolve();
//   for (let i = 0; i < 5; i++) {
//     promise = promise.then((res) => {
//       console.log(res);
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve(i);
//         }, 1000);
//       });
//     });
//   }
// }
{
  // console.log([] == ![]);
  // console.log([] == []);
  [] == false;
  // console.log([].valueOf());
}
{
  async function test(params) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(111);
      }, 5000);
    });
    console.log(123);
  }
  // test();
}
{
  let a = {
    id: 1,
    valueOf() {
      return this.id++;
    },
  };
  // console.log(a == 1 && a == 2 && a == 3);
}
{
  // async function test(params) {
  //   let p = null;
  //   try {
  //     p = await new Promise((resolve, reject) => {
  //       resolve(1);
  //       // reject(1111);
  //     });
  //   } catch (error) {}
  //   console.log(123);
  //   return p;
  // }
  // test().then((res) => {
  //   console.log(res);
  // });
}
{
  // console.log(0.1 + 0.2);
}
{
  let reg = /(.)(?=\d{3})/; //先行断言
  let reg1 = /(?<![a-z])\d/g; //反向查找
  // console.log(reg1.exec("aaaab123"));
  let str = "aaaab12ab3";
  let reg2 = /([a-z])(?=\d)/g;
  // console.log(reg2.exec(str));
  // // console.log(str.search(reg1));
  // console.log(str.split(/(\d)/));
  // console.log(str.split(/\d/));
}
{
  // console.log((0 + 5) >> 1);
}
{
  let obj = {
    a: 1,
    b: 2,
    c: 3,
  };
  // console.log(JSON.stringify(obj, ["a", "b"]));
  // console.log(
  //   JSON.stringify(obj, (key, value) => {
  //     if (key === "c") {
  //       return /\d/;
  //     }
  //     return value;
  //   })
  // );
}
{
  // let a = 2;
  // function test(params) {
  //   let a = 1;
  //   return function b(params) {
  //     console.log(a);
  //   };
  // }
  // let fn = test();
  // fn();
}

// {
//   var foo = 1;
//   function foo(params) {
//     console.log(111);
//   }
//   // console.log(foo);
// }
{
  let fn = (...rest) => {
    console.log(rest);
    console.log(arguments);
  };
  // fn(1, 2, 3);
}
{
  let arr = [1, 3, 5, 4, 2];
  let a = arr.sort((a, b) => a - b);
  a[0] = 0;
  // console.log(arr);
}
{
  let obj = [
    {
      name: "1",
      age: 1,
    },
    {
      name: "2",
      age: 2,
    },
    {
      name: "3",
      age: 3,
    },
    {
      name: "4",
      age: 4,
    },
  ];
  let proxy = new Proxy(obj, {
    get(obj, key) {
      return obj[key];
    },
    set(obj, key, newValue) {
      console.log(newValue);
      obj[key] = newValue;
    },
  });
  // console.log(proxy);
  // proxy.push({});
}
{
  // console.log(1);
  // new Promise((resolve, reject) => {
  //   console.log(2);
  //   resolve(3);
  // }).then((res) => {
  //   console.log(res);
  //   setTimeout(() => {
  //     console.log(6);
  //   });
  // });
  // setTimeout(() => {
  //   console.log(4);
  //   // new Promise((resolve, reject) => {
  //   //   resolve(5);
  //   // }).then((res) => {
  //   //   console.log(res);
  //   // });
  // });
}
// {
//   // console.log(NaN == NaN);
//   let a = 3.2;
//   console.log(a >> 1);
// }
{
  let a = {
    a: 1,
  };
  // console.log(undefined == null);
  // console.log();
  // console.log(typeof [].valueOf());
  // console.log([] == ![]);
  // console.log([].toString());
  // console.log(Number(""));
  // console.log([] == false);
}
{
  // ==
  let a = {
    i: 0,
  };
  // a.valueOf = function (params) {
  //   return this;
  // };
  // console.log(Number(null));

  // a.toString = function (params) {
  //   return this.i++;
  // };
  // console.log(a == 0 && a == 1 && a == 2);
  // console.log(Object.is("1", "1"));
}
{
  var _a = 0;
  Object.defineProperty(this, "a", {
    get() {
      return _a++;
    },
  });
  // console.log(a);
  // console.log(a);
  // console.log(a);
}
{
  // let a = "20";
  // let b = "21";
  // if (a > b) {
  //   console.log(1);
  // } else if (b > a) {
  //   console.log(2);
  // } else {
  //   console.log("相等");
  // }
  // console.log();
}
{
  let a = +1;
  // console.log("1" + a);
}
{
  // console.log(a == 1 && a == 2 && a == 3);
}
{
  // let arr = [];
  // arr[2] = 0;
}
{
  // var i;
  // for (i = 0; i < 3; i++) {
  //   setTimeout(() => {
  //     console.log(this.i);
  //   });
  // }
  // for (var i = 0; i < 3; i++) {
  //   var i = 6;
  //   setTimeout(() => {
  //     console.log(i);
  //   });
  // }
}
{
  function Foo() {
    Foo.a = function () {
      console.log(1);
    };
    this.a = function () {
      console.log(2);
    };
  }

  Foo.prototype.a = function () {
    console.log(3);
  };
  Foo.a = function () {
    console.log(4);
  };
  // Foo.a(); //4
  // let obj = new Foo();
  // obj.a(); //2
  // Foo.a(); //1
}
{
  var obj = {
    foo() {
      this.a = 111111;
    },
    fun() {
      console.log(this.a);
    },
  };
  obj.foo();
  //obj.a = 111111
  // setTimeout(obj.fun, 0);
  //undefined
}
//输出顺序题
{
  // {
  //   setTimeout(() => {
  //     console.log(1);
  //   }, 0);
  //   new Promise((resolve) => {
  //     console.log(2);
  //     resolve();
  //     console.log(3);
  //   }).then(() => {
  //     console.log(4);
  //   });
  //   const promise2 = new Promise(async (resolve) => {
  //     console.log(await resolve(5));
  //     console.log(6);
  //   });
  //   async function test() {
  //     console.log(7);
  //     console.log(await promise2);
  //     console.log(8);
  //   }
  //   test();
  //   console.log(9);
  // }
  // 2 3 7  9  4 undefined 6 5 8  1
}
{
  // const promise2 = new Promise(async (resolve) => {
  //   console.log(await resolve(5));
  //   console.log(6);
  // });
  // async function test() {
  //   console.log(7);
  //   console.log(promise2);
  //   console.log(await promise2);
  //   console.log(8);
  // }
  // test();
}
// {
//   async function example() {
//     console.log(3);
//     let result = await 1;
//     console.log(result);
//     return 2;
//   }
//   let p = example();
//   console.log(p);
//   p.then((res) => {
//     console.log(res);
//   });
// }
// {
//   let res = await getDate()
//   console.log(res);
//   == getDate().then((res)=>{
//     console.log();
//   })
// }
// {
//   var myObj = {
//     name: "极客时间",
//     showThis: function () {
//       console.log(this); //myOjb
//       var self = this; //self = obj
//       function bar() {
//         self.name = "极客邦";
//       }
//       bar();
//     },
//   };
//   myObj.showThis();
// }
{
  // function maxCropYield(cropField) {
  //   let rowIncrease = cropField.map((row) => row.reduce((a, b) => a + b, 0));
  //   let colIncrease = cropField[0].map((_, i) => cropField.reduce((a, b) => a + b[i], 0));

  //   let maxRowIncrease = Math.max(...rowIncrease);
  //   let maxColIncrease = Math.max(...colIncrease);

  //   let totalYield = rowIncrease.reduce((a, b) => a + b, 0) + maxRowIncrease + maxColIncrease;

  //   return totalYield;
  // }
  let cropField = [
    [2, 3, 1, 4],
    [1, 2, 0, 3],
    [4, 2, 1, 7],
    [3, 1, 4, 2],
  ];
  // console.log(maxCropYield(cropField));
}
// {
//   function maxCropYield(cropField) {
//     let rowIncrease = cropField.map((row) => row.reduce((a, b) => a + b, 0));
//     let colIncrease = cropField[0].map((_, i) => cropField.reduce((a, b) => a + b[i], 0));

//     let maxRowIndex = rowIncrease.indexOf(Math.max(...rowIncrease));
//     let maxColIndex = colIncrease.indexOf(Math.max(...colIncrease));

//     let totalYield = rowIncrease.reduce((a, b) => a + b, 0) + Math.max(...colIncrease) + Math.max(...rowIncrease);

//     if (maxRowIndex !== -1 && maxColIndex !== -1) {
//       totalYield -= cropField[maxRowIndex][maxColIndex];
//     }

//     return totalYield;
//   }

//   let cropField = [
//     [2, 3, 1, 4],
//     [1, 2, 0, 3],
//     [4, 2, 1, 7],
//     [3, 1, 4, 2],
//   ];

//   console.log(maxCropYield(cropField)); // 输出 63
// }
{
  class Solution {
    /* Write Code Here */
    calculateMaxTotalYie(cropField) {
      let row = cropField.map((row) =>
        row.reduce((a, b) => {
          return a + b;
        }, 0)
      );
      let col = cropField[0].map((k, i) => cropField.reduce((a, b) => a + b[i], 0));

      let maxRow = row.indexOf(Math.max(...row));
      let maxCol = col.indexOf(Math.max(...col));

      let totalYield = row.reduce((a, b) => a + b, 0) + Math.max(...col) + Math.max(...row);
      if (maxRow !== -1 && maxCol !== -1) {
        totalYield -= cropField[maxRow][maxCol];
      }
      return totalYield;
    }
  }
  let res;

  // let cropField_rows = readInt();
  // let cropField_cols = readInt();

  // let cropField = Array();
  // for (let cropField_i = 0; cropField_i < cropField_rows; cropField_i++) {
  //   cropField[cropField_i] = new Array();
  //   for (let cropField_j = 0; cropField_j < cropField_cols; cropField_j++) {
  //     cropField[cropField_i][cropField_j] = readInt();
  //   }
  // }

  let acmSolution = new Solution();
  let cropField = [
    [2, 3, 1, 4],
    [1, 2, 0, 3],
    [4, 2, 1, 7],
    [3, 1, 4, 2],
  ];
  res = acmSolution.calculateMaxTotalYie(cropField);
  // console.log(res);
}
{
  class Queue {
    constructor() {
      this.queue = [];
    }
    add(fn) {
      this.queue.push(fn);
    }
    run() {
      setInterval(async () => {
        if (this.queue.length) {
          let p = this.queue.shift()();
          if (p === undefined) {
            this.run();
          } else if (p instanceof Promise) {
            console.log(await p);
            this.run();
          }
        }
      }, 1000);
    }
  }
  let queue = new Queue();
  let fn1 = () => {
    console.log("同步任务执行");
  };
  let fn2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("异步任务执行");
      }, 1000);
    });
  };
  // queue.run();
  // queue.add(fn2);
  // queue.add(fn1);
}
{
  console.log(Number(undefined));
}
