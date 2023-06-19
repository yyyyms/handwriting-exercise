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
  let res = JSON.parse(JSON.stringify(data));
  // console.log(res);
}
