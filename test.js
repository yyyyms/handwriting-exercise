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
  let foo = { ...arr };
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
  console.log(test);
  const test1 = new test();
  console.log(test1);
  // test1.b = 1;
  // test1.a();
}
