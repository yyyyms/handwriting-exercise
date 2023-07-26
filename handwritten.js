//手写Promise
class Mypromise {
  constructor(executor) {
    // console.log(this);
    //初始化值
    this.initValue();
    //初始化this指向
    this.initBind();
    //执行传进来的函数
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  initValue() {
    this.PromiseResult = null; //终值
    this.PromiseState = "pending"; //状态
    this.resolveCallbacks = []; //成功回调的函数数组
    this.rejectCallbacks = [];
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    //如果执行resolve,状态变为fulfilled
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    //终值为传来的值
    this.PromiseResult = value;
    while (this.resolveCallbacks.length) {
      this.resolveCallbacks.shift().onFulfilled(this.PromiseResult);
    }
  }
  reject(value) {
    // console.log(this);
    if (this.PromiseState !== "pending") return;

    this.PromiseState = "rejected";
    this.PromiseResult = value;
    while (this.rejectCallbacks.length) {
      this.rejectCallbacks.shift().onRejected(this.PromiseResult);
    }
  }
  then(onFulfilled, onRejected) {
    //接收两个回调
    //确保参数是函数
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    return new Mypromise((resolve, reject) => {
      if (this.PromiseState === "fulfilled") {
        setTimeout(() => {
          try {
            let res = onFulfilled(this.PromiseResult);
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.PromiseState === "rejected") {
        setTimeout(() => {
          try {
            let res = onRejected(this.PromiseResult);
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.PromiseState === "pending") {
        setTimeout(() => {
          // let res =  onFulfilled(this.PromiseResult)

          this.resolveCallbacks.push({
            onFulfilled: (value) => {
              try {
                let res = onFulfilled(value);
                resolve(res);
              } catch (error) {
                onRejected(error);
              }
            },
          });
          this.rejectCallbacks.push({
            onRejected: (value) => {
              try {
                let res = onRejected(value);
                resolve(res);
              } catch (error) {
                onRejected(error);
              }
            },
          });
        });
      }
    });
  }
}

// const p = new Mypromise((resolve, reject) => {
//     setTimeout(() => {
//         reject('2秒后失败')

//     }, 1000);
//     // resolve('第一次成功')

// });
// p.then(res => {
//     console.log(1);
//     return '第二次'
// }, err => {
//     console.log(err);
//     return '第二次'
// }).then(res => console.log(res), err => console.log(err))

//手写promise.all
//1.接收可迭代对象 2.传入的可以是promise 也可以是普通数据 3.可迭代对象的promise是并行执行
//4.保持输入输出数组的顺序 5.传入数组中只要有一个是reject，立即返回reject
// 6.所有数据resolve之后返回结果

function myPromiseAll(iterable) {
  const result = [];
  //可迭代对象转换为数组
  const promises = Array.from(iterable);
  let count = 0; //定义一个计数器判断是否所有都执行完
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          result[i] = res;
          count++;
          if (count == promises.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    }
  });
}
//手写Promise.any
function MypromiseAny(iterable) {
  let errors = [];
  return new Promise((resolve, reject) => {
    let count = 0;
    const promises = Array.from(iterable);
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          // result[i] = res
          resolve(res);
        })
        .catch((err) => {
          count++;
          errors.push(err);
          if (count === promises.length) {
            reject(new AggregateError(errors));
          }
        });
    }
  });
}
//手写promise.race
function myPromiseRace(iterable) {
  let promises = Array.from(iterable);
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
// const p1 = new Promise((resolve, reject) => {
//     resolve('1')
// })
// const p2 = new Promise((resolve, reject) => {
//     reject('2')
// })
// const p3 = 3
// myPromiseAll([p1, p2, p3]).then(res =>{
//     console.log(res);
// } )

//

const arr = [1, [2, [3, [4, 5]]], 6];
//es6 flat方法扁平数组
// console.log(arr.flat(Infinity));

//用栈实现数组扁平
function stack(arr) {
  let res = [];
  let stack = [...arr];
  while (stack.length) {
    let first = stack.shift();
    if (Array.isArray(first)) {
      stack.unshift(...first);
    } else {
      res.push(first);
    }
  }
  return res;
}
// console.log(stack(arr));
//利用join 或 tostring 扁平化
arr
  .toString()
  .split(",")
  .map((item) => +item);

//使用正则
JSON.stringify(arr)
  .replace(/\[|\]/g, "")
  .split(",")
  .map((item) => +item);

//用reduce 结合递归
function flatten(arr) {
  arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
// flatten(arr)

let a = {
  name: "yms",
};
function b(a) {
  a.age = 12;
  a = {
    num: 1,
  };
  return a;
}
var a1 = b(a);
// console.log(a,a1);

// a.age = 10
// let a1 = a
// a1.age = 18
// a1 = {
//     num:1
// }
//手写寄生组合式继承
function inheritPrototype(Sub, Sup) {
  let prototype = Object.create(Sup.prototype);
  prototype.constrctor = Sub;
  Sub.prototype = prototype;
}

function Sup(name, age) {
  this.color = ["red", "green", "blue"];
  this.name = name;
  this.age = age;
}
Sup.prototype.sayname = function () {
  console.log(this.name);
};

function Sub(name, age) {
  Sup.call(this, name);
  this.age = age;
}
inheritPrototype(Sup, Sub);
Sub.prototype.sayage = function () {
  console.log(this.age);
};
var instance1 = new Sub("xyc", 23);
var instance2 = new Sub("lxy", 23);
instance1.color.push("2"); // ["red", "blue", "green", "2"]
instance2.color.push("3"); // ["red", "blue", "green", "3"]
// console.log(instance1);
// console.log(instance2);
// console.log(Sub);
// instance1.sayage()
// instance1.sayname()
{
  const arr = [
    { a: 1, b: "g", c: false, d: "355" },
    { a: 2, b: "s", c: true, d: "854" },
    { a: 3, b: "g", c: false, d: "685" },
    { a: 4, b: "e", c: false, d: "158" },
    { a: 5, b: "g", c: true, d: "444" },
  ];
  const res = arr.findIndex((item) => {
    item.a === 5;
  });
  // console.log(res);
}
//浅拷贝 深拷贝
{
  const obj = {
    name: "yms",
    obj: {
      name: "json",
    },
  };
  const newObj = Object.assign({}, obj);
  obj.name = "jwd";
  // console.log(newObj);
  // console.log(obj.obj == newObj.obj);
  //Object.assign  slice 和 concat  Array.from 扩展运算符 都是浅拷贝
}
//手写深拷贝 对对象内部进行深拷贝，支持 Array、Date、RegExp、DOM
function deepClone(params) {
  //如果不是对象则退出(停止递归)
  if (typeof params !== "object") return params;
  //深拷贝初始值:对象/数组
  let newObj = params instanceof Array ? [] : {};
  // 使用for in 循环对象属性（包括原型链上的属性）
  for (const i in params) {
    //只访问对象自身属性
    if (params.hasOwnProperty(i)) {
      //当前属性还未存在于新对象中
      if (!(i in newObj)) {
        if (params[i] instanceof Date) {
          // 判断日期类型

          newObj[i] = new Date(params[i].getTime());
        } else if (params[i] instanceof RegExp) {
          // 判断正则类型

          newObj[i] = new RegExp(params[i]);
        } else if (typeof params[i] === "object" && params[i].nodeType === 1) {
          // 判断 DOM 元素节点

          let domEle = document.getElementsByTagName(params[i].nodeName)[0];

          newObj[i] = domEle.cloneNode(true);
        } else {
          // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝

          newObj[i] = typeof params[i] === "object" ? deepClone(params[i]) : params[i];
        }
      }
    }
  }
  return newObj;
}
const date = new Date();

// console.log(obj);

//手写发布订阅
{
  class EventEmit {
    constructor() {
      this.event = {};
    }
    on(type, callback) {
      if (!this.event[type]) {
        this.event[type] = [callback];
      } else {
        this.event[type].push(callback);
      }
    }
    emit(type, ...params) {
      if (this.event[type]) {
        this.event[type].forEach((cb) => {
          cb(...params);
        });
      } else {
        return;
      }
    }
    off(type, callback) {
      if (this.event[type]) {
        this.event[type] = this.event[type].filter((item) => item !== callback);
      } else {
        return;
      }
    }
    once(type, callback) {
      let fn = () => {
        callback();
        this.off(type, fn);
      };
      this.on(type, fn);
    }
  }
  const ev = new EventEmit(arguments);
  const fun1 = (str) => {
    console.log(str);
  };
  // ev.on('say', fun1);
  // console.log(ev);
  // ev.emit('say', 'visa');
  // ev.off('say', fun1);
  // ev.once('say', fun1)
  // console.log(ev);
}
//深拷贝
{
  function deepClone(params) {
    if (typeof params !== "object") return params;
    let newObj = Array.isArray(params) ? [] : {};
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        const element = params[key];
        if (element instanceof Date) {
          newObj[key] = new Date(element.getTime());
        }
        if (element instanceof RegExp) {
          newObj[key] = new RegExp(element);
        }
        if (typeof element === "object" && element.nodeType == 1) {
          // 判断 DOM 元素节点

          let domEle = document.getElementsByTagName(element.nodeName)[0];

          newObj[key] = domEle.cloneNode(true);
        } else {
          newObj[key] = typeof element === "object" ? deepClone(element) : element;
        }
      }
    }
    return newObj;
  }

  //    console.log( deepClone(obj));
  let obj = { name: "test", age: 18, arr: [1, 2, 3] };
  // console.log(deepClone(obj));
}
//防抖
{
  const debounce = (fn, time) => {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this);
      }, time);
    };
  };
}
//节流
{
  const throttle = (fn, time) => {
    let flat = true;
    if (!flat) return;
    return function () {
      flat = false;
      setTimeout(() => {
        fn(this);
        flat = true;
      }, time);
    };
  };
}
//数组扁平 函数递归
{
  const arr = [1, [2, [3, [4, 5]]], 6];
  let res = [];
  function fn(arr) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (Array.isArray(element)) {
        fn(element);
      } else {
        res.push(element);
      }
    }
  }
  // fn(arr)
  // console.log(res);
}
//数组扁平 reduce
{
  const arr = [1, [2, [3, [4, 5]]], 6];

  const flatten = (arr) => {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
  };
  // const res = flatten(arr)
  // console.log(res);
}
//数组扁平 正则
{
  const arr = [1, [2, [3, [4, 5]]], 6];
  let res = JSON.parse("[" + JSON.stringify(arr).replace(/\[|]/g, "") + "]");
  // console.log(res);
}
//数组扁平 栈 利用 ... 拿出非数组项
{
  const arr = [1, [2, [3, [4, 5]]], 6];
  function Stack(arr) {
    let stack = arr;
    let res = [];
    while (stack.length !== 0) {
      let item = stack.shift();
      if (!Array.isArray(item)) {
        res.push(item);
      } else {
        stack.unshift(...item);
      }
    }
    return res;
  }
  // console.log(Stack(arr));
}
//数组去重 for + splice
{
  const arr = [1, 1, "1", 17, true, true, false, false, "true", "a", {}, {}];
  function unique(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (arr[i] === arr[j]) {
          arr.splice(j, 1);
          len--;
          j--;
        }
      }
    }
    return arr;
  }
  // console.log(unique(arr));
}
//数组去重 filter + indexOf
{
  const arr = [1, 1, "1", 17, true, true, false, false, "true", "a", {}, {}];
  function unique(arr) {
    return arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    });
  }
  // console.log(unique(arr));
}
//函数珂里化
//指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
{
  function curry(fn, args) {
    // console.log(args);
  }
  function multiFn(a, b, c) {
    return a * b * c;
  }
  curry(multiFn);
}
//实现new
{
  function _new(fn, ...args) {
    if (typeof fn !== "function") {
      return;
    }
    let obj = Object.create(fn.prototype);
    let res = fn.apply(obj, args);
    return (typeof res === "object" && res !== null) || typeof res === "function" ? res : obj;
  }
}
//寄生组合式继承
{
  function inheritPrototype(Sup, Sub) {
    const obj = Object.create(Sup.prototype);
    obj.constrctor = Sub;
    Sub.prototype = obj;
  }
  function Sup(name, age) {
    this.color = ["red", "green", "blue"];
    this.name = name;
    this.age = age;
  }
  Sup.prototype.sayname = function () {
    console.log(this.name);
  };
  function Sub(age, name) {
    Sup.apply(this, [age, name]);
  }
  inheritPrototype(Sup, Sub);
  // const name = new Sup('yms',18);
  // console.log(name.age);
  // name.sayname()
}
// instanceof
{
  function _instanceof(obj, fn) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    let proto = Object.getPrototypeOf(obj);
    while (true) {
      if (proto === null) {
        return false;
      }
      if (proto === fn.prototype) {
        return true;
      }
      proto = Object.getPrototypeOf(proto);
    }
  }
  let obj = {};
  // console.log(_instanceof(obj, Array));
  // console.log(obj.__proto__.prototype);
}
//获取URL参数
{
  const url = "https://baidu.com/abc?token=123&task=undefined";
  function getParams(url) {
    const res = {};
    if (url.includes("?")) {
      const str = url.split("?")[1];
      const arr = str.split("&");
      arr.forEach((element) => {
        const key = element.split("=")[0];
        const value = element.split("=")[1];
        res[key] = decodeURIComponent(value);
        //decodeURIComponent解码
      });
      return res;
    } else {
      return res;
    }
  }
  //    console.log(getParams(url));
}
//发布订阅
{
  class EventEmit {
    constructor() {
      this.cache = {};
    }
    on(name, fn) {
      if (this.cache[name]) {
        this.cache[name].push(fn);
      } else {
        this.cache[name] = [fn];
      }
    }
    off(name, fn) {
      if (this.cache[name]) {
        this.cache[name] = this.cache[name].filter((item) => item !== fn);
      }
    }
    emit(name, ...args) {
      if (this.cache[name]) {
        //创建副本，如果回调函数内继续注册相同事件，会造成死循环
        const tasks = this.cache[name].splice();
        for (const cb of tasks) {
          cb(...args);
        }
      } else {
        return;
      }
    }
    once(name, fn) {
      let fn1 = () => {
        fn();
        this.off(name, fn);
      };
      this.on(name, fn1);
    }
  }
}
//正则匹配号码
{
  let str = "010-12345678";
  let reg = /^\{3}-(\d{8}|10010|110)$/g;
  // console.log(reg.test(str));
}
//正则匹配邮箱
{
  let reg = /^([\w\-\.])+\@([\w\-\.])+\.[A-Za-z]{2,4}$/;
  let str = "ifat3@42du.online";
  // console.log(reg.test(str));
}
{
  class EventEmit {
    constrctor() {
      this.cache = [];
    }
    on(name, fn) {}
    emit(name, ...args) {
      if (this.cache[name]) {
        let tasks = this.cache[name].splice();
        for (const task of tasks) {
          task(...args);
        }
      }
    }
    off(name, fn) {
      if (this.cache[name]) {
        this.cache[name] = this.cache[name].filter((item) => {
          return item !== fn;
        });
      }
    }
    once(name, fn) {
      function fn1(params) {
        if (this.cache[name]) {
          fn();
          this.off(name, fn);
        }
      }
      this.on(name, fn1);
    }
  }
}
//观察者模式
{
  class Notifier {
    constructor() {
      this.observerList = [];
    }
    add(obj) {
      this.observerList.push(obj);
    }
    remove(obj) {
      this.observerList = this.observerList.filter((o) => o !== obj);
    }
    notify() {
      this.observerList.forEach((obj) => {
        obj.update();
      });
    }
  }
  class Observer {
    constructor(name) {
      this.name = name;
    }
    update() {
      console.log("收到通知了");
    }
  }
  let notifier = new Notifier();
  let oberver1 = new Observer("张三");
  // notifier.add(oberver1)
  // notifier.remove(oberver1)
  // notifier.notify()
}
//es6继承
{
  class Parent {
    constructor(value) {
      this.val = value;
    }
    getValue() {
      console.log(333);
    }
  }
  // class Child extends Parent {
  //     constructor(value){
  //         //看成 Parent.call(this, value)。
  //         super(value)

  //         this.val = value
  //     }
  // }
  // let child = new Child(1)
  // child.getValue()
  // child instanceof Parent
  // Parent.prototype.getValue()
}
//深拷贝
{
  //map = new Map()用来存储拷贝过的对象
  // 循环引用时 如果拷贝过 直接返回出去 没有拷贝过就继续拷贝
  function DeepClone(target, map = new Map()) {
    if (typeof target !== "object") {
      return target;
    }
    //处理数组属性
    let cloneTarteg = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarteg);

    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        if (target[key] instanceof Date) {
          cloneTarteg[key] = new Date(target[key].getTime());
        } else if (target[key] instanceof RegExp) {
          cloneTarteg[key] = new RegExp(target[key]);
        } else {
          // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝
          cloneTarteg[key] = typeof target[key] === "object" ? DeepClone(target[key], map) : target[key];
        }
      }
    }
    return cloneTarteg;
  }
  const target = {
    field1: 1,
    field2: /\d/,
    field3: "ConardLi",
    field4: {
      child: "child",
      child2: {
        child2: "child2",
      },
    },
    field5: [1, 2, 3],
  };
  target.target = target;
  // console.log(DeepClone(target));
}
//发布订阅
{
  class EventEmit {
    constructor() {
      this.cache = {};
    }
    emit(name, ...args) {
      if (this.cache[name]) {
        const tasks = this.cache[name].slice();
        for (const cb of tasks) {
          cb(...args);
        }
      }
    }
    on(name, fn) {
      if (this.cache[name]) {
        this.cache[name].push(fn);
      } else {
        this.cache[name] = [fn];
      }
    }
    off(name, fn) {
      if (this.cache[name]) {
        this.cache[name] = this.cache[name].filter((item) => {
          return item !== fn;
        });
      } else {
        return;
      }
    }
    once(name, fn) {
      let fn1 = function () {
        fn();
        this.off(name, fn1);
      };
      this.on(name, fn1);
    }
  }
  const ev = new EventEmit();
  function fun1(params) {
    console.log(params);
  }
  // ev.on('say', fun1);
  // ev.emit('say','visa','yms');
  // ev.off('say', fun1);
  // ev.once('say', fun1)
}
{
  //观察者模式
  class Notify {
    constructor() {
      this.watcherlist = [];
    }
    add(watcher) {
      this.watcherlist.push(watcher);
    }
    move(watcher) {
      this.watcherlist = this.watcherlist.filter((w) => w !== watcher);
    }
    notify() {
      this.watcherlist.forEach((w) => {
        w.update();
      });
    }
  }
  class watche {
    constructor(name) {
      this.name = name;
    }
    update() {
      console.log("收到通知了");
    }
  }
  const a = new watche("yms");
  const n = new Notify();
  // n.add(a)
  // n.notify()
}
//手写深拷贝
{
  function deepClone(target, map = new Map()) {
    if (typeof target !== "object") return target;
    const cloneTarteg = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarteg);

    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        const element = target[key];
        if (element instanceof Date) {
          cloneTarteg[key] = new Date(element.getTime());
        } else if (element instanceof RegExp) {
          cloneTarteg[key] = new RegExp(element);
        } else {
          cloneTarteg[key] = typeof element === "object" ? DeepClone(element, map) : element;
        }
      }
    }
    return cloneTarteg;
  }
  // let obj = {
  //     a:'1',
  //     b:2,
  //     c:/\d/,
  //     d: new Date(),
  //     e:{
  //         f:{
  //             g:[1,2,3,4]
  //         }
  //     }
  // }
  // obj.obj = obj
  // let newobj =  deepClone(obj)
  // console.log(newobj.obj);
}
//手写10进制转其他进制
{
  function to_string(num, radix) {
    let digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (num == 0) return 0;
    if (!Number.isInteger(num)) {
      console.log("目前不支持小数");
      return;
    }
    let res = "",
      rate,
      i;
    if (num < 0) {
      res = +"-";
      num = Math.abs(num);
    }
    //下面循环为了获得最高的幂数，比如上面的110转换为16进制为6e,其中i为1;也就是16**1*6中的1;
    //获取最高的幂数是为了下面根据幂数来推算每一位的倍数和相应的字符
    for (i = 0; i < num; i++) {
      if (Math.pow(radix, i) <= num && num <= Math.pow(radix, i + 1)) {
        break;
      }
    }
    console.log(i);
    //一位一位看
    while (i >= 0) {
      rate = Math.floor(num / Math.pow(radix, i));
      res += digits[rate];
      num -= rate * Math.pow(radix, i);
      i--;
    }
    return res;
  }
  // console.log(to_string(25,2));
}
{
  //手写call
  Function.prototype._call = function (ctx, ...args) {
    const context = ctx == undefined ? window : Object(ctx);
    //给context新增一个唯一的属性避免覆盖原属性
    const key = Symbol();
    context[key] = this;
    //执行
    const res = context[key](...args);
    //删除这个属性
    delete context[key];
    return res;
  };
  const obj = {};
  function test(name) {
    console.log(name);
  }
  // test._call(obj,'yms')
}
{
  //手写bind
  Function.prototype._bind = function (ctx, ...args) {
    const _self = this;
    //返回一个函数
    const newFn = function (...rest) {
      return _self.call(ctx, ...args, ...rest);
    };
    if (_self.prototype) {
      newFn.prototype = Object.create(_self.prototype);
    }
    return newFn;
  };
  function test(param1, param2) {
    console.log(param1, param2);
  }
  const obj = {};
  // const res = test._bind(obj, 'yms')
  // res('jwd')
}
{
  //手写promiseAll
  function _promiseAll(args) {
    let result = [];
    let arr = Array.from(args);
    let len = arr.length;
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        Promise.resolve(arr[i])
          .then((res) => {
            result[i] = res;
            count++;
            if (count == len) {
              resolve(result);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  // const p1 = new Promise((resolve, reject) => {
  //     resolve('1')
  // })
  // const p2 = new Promise((resolve, reject) => {
  //     reject('2')
  // })
  // const p3 = 3
  // _promiseAll([p1, p2, p3]).then(res=>{
  //     // console.log(res);
  //     console.log(11);
  // }).catch(err=>{
  //     console.log(err);
  // })
}
{
  //对象数组去重
  const arr = [{ a: 2 }, { a: 2 }, { a: 2, b: 1 }, { a: { b: 1, c: { a: 1 } } }, { a: { b: 1, c: { a: 1 } } }];
  //判断两个对象是否完全一样
  function isSame(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key in obj1) {
      if (Object.prototype.toString.call(obj1[key]) == "[object Object]" || Object.prototype.toString.call(obj2[key]) == "[object Object]") {
        if (isSame(obj1[key], obj2[key]) == false) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
  let obj1 = {
    b: { c: { d: 1 } },
    a: 1,
  };
  let obj2 = {
    b: { c: { d: 1 } },
    a: 2,
  };
  // console.log(isSame(obj1, obj2));

  // console.log(isObjectValueEqual(obj1, obj2)); // false
}

{
  //Promise.retry
  function PromiseRetry(fn, time, delay) {
    return new Promise((resolve, reject) => {
      let index = 1;
      let attemp = function () {
        fn()
          .then((res) => {
            console.log("第" + index + "次成功值为" + res);
          })
          .catch((err) => {
            if (time == 0) {
              reject(err);
            } else {
              console.log("第" + index + "次失败" + "再次尝试");
              time--;
              index++;
              setTimeout(() => {
                attemp();
              }, delay);
            }
          });
      };
      attemp();
    });
  }

  function getUrl() {
    return new Promise((resolve, reject) => {
      let count = Math.random();
      if (count > 0.5) {
        resolve(count);
      } else {
        reject("失败");
      }
    });
  }
  // PromiseRetry(getUrl, 5, 1000);
}
{
  //节流 时间戳版
  function throttle(fn, delay) {
    let last = 0;
    return function () {
      const context = this;
      const args = arguments;
      const now = new Date();
      if (now - last > delay) {
        fn.call(context, args);
        last = now;
      }
    };
  }
}
{
  //节流 定时器版
  function throttle(fn, delay) {
    let flat;
    return function () {
      const context = this;
      const args = arguments;
      if (!flat) {
        flat = true;
        setTimeout(() => {
          fn.call(context, args);
          flat = false;
        }, delay);
      }
    };
  }
}
{
  //深拷贝
  function DeepClone(target, map = new Map()) {
    if (typeof target !== "object") {
      return target;
    }
    let newobj = Array.isArray(target) ? [] : {};
    if (map.has(target)) {
      return map.get(target);
    } else {
      map.set(target, newobj);
    }
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        const element = target[key];
        if (element instanceof Date) {
        }
        if (element instanceof RegExp) {
        }
        if (element instanceof Symbol) {
        } else {
          newobj[key] = typeof element === "object" ? deepClone(element, map) : element;
        }
      }
    }
  }
}
{
  function test(params) {
    let a = 1;
    console.log(11);
    return function test1(params) {
      let a = 2;
      console.log(a);
      console.log(this);
    };
  }
  // test()()
}
{
  //函数珂里化
  function add(x, y) {
    return x + y;
  }
  function CurryAdd(params1) {
    return function (params2) {
      return params1 + params2;
    };
  }
  //   console.log(CurryAdd(1)(2));
}
{
  function delay(s) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, s);
    });
  }
  // delay()
  //   .then(() => {
  //     console.log(1);
  //     return delay(1000);
  //   })
  //   .then(() => {
  //     console.log(2);
  //     return delay(1000);
  //   })
  //   .then(() => {
  //     console.log(3);
  //   });
}
{
  let test = /img\d?\d?\.(suankuai|meituan|)\.com/;
  let str = "img..com";

  // console.log(test.test(str));
}
{
  let url = "http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16";
  function getUrl(url) {
    const res = [];
    if (url.includes("?")) {
      const str = url.split("?")[1];
      const arr = str.split("&");
      arr.forEach((element) => {
        let key = element.split("=")[0];
        let value = element.split("=")[1];
        res[key] = decodeURIComponent(value);
      });
    }
    return res;
  }
  // console.log(getUrl(url));
}
{
  //手写instanceof
  function _instanceof(obj, fn) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    let __proto__ = Object.getPrototypeOf(obj);
    while (true) {
      if (__proto__ === null) {
        return false;
      }
      if (__proto__ === fn.prototype) {
        return true;
      } else {
        __proto__ = Object.getPrototypeOf(__proto__);
      }
    }
  }
  let obj = {};
  // console.log(_instanceof(obj, Array));
}
{
  //手写发布订阅
  class EventEmit {
    constructor() {
      this.cache = {};
    }
    on(name, fn) {
      if (this.cache[name]) {
        this.cache[name].push(fn);
      } else {
        this.cache[name] = [];
        this.cache[name].push(fn);
      }
    }
    off(name, fn) {
      if (this.cache[name]) {
        this.cache[name] = this.cache[name].filter((item) => {
          return item !== fn;
        });
      }
    }
    once(name, fn) {
      let fn1 = function (params) {
        fn();
        this.off(name);
      };
      this.on(name, fn1);
    }
    emit(name, ...args) {
      if (this.cache[name]) {
        let tasks = this.cache[name].slice();
        for (const fn of tasks) {
          fn(...args);
        }
      }
    }
  }
}
{
  //观察者模式
  class Notify {
    constructor(watcher) {
      this.watcherlist = [];
    }
    add(watcher) {
      this.watcherlist.push(watcher);
    }
    move(watcher) {
      this.watcherlist = this.watcherlist.filter((item) => {
        return item !== watcher;
      });
    }
    notify() {
      for (const watcher of this.watcherlist) {
        watcher.update();
      }
    }
  }
  class watch {
    constructor(name) {
      this.name = name;
    }
    update() {
      console.log("收到通知了");
    }
  }
}
{
  //手写bind
  function _bind(context, ...args) {
    let fn = this;
    let newFn = function (...args2) {
      console.log(this instanceof newFn);
      return fn.call(this instanceof newFn ? this : context, ...args, ...args2);
      //针对new 创建实例,使实例能够继承绑定函数的原型
    };
    newFn.prototype = fn.prototype;
    return newFn;
  }
}
{
  //手写call
  function _call(context, ...args) {
    context = context === undefined ? window : Object(context);
    //新增一个唯一属性避免覆盖
    let fn = Symbol("fn ");
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
  }
}
{
  //手写ajax
}
//数组转树 较优
{
  const data = [
    { id: 0, name: "name0", pid: -1 },
    { id: 1, name: "name1", pid: 0 },
    { id: 2, name: "name2", pid: 0 },
    { id: 3, name: "name3", pid: 0 },
    { id: 4, name: "name4", pid: 1 },
    { id: 5, name: "name5", pid: 2 },
    { id: 6, name: "name6", pid: 3 },
    { id: 7, name: "name7", pid: 4 },
    { id: 8, name: "name8", pid: 5 },
    { id: 9, name: "name9", pid: 6 },
    { id: 10, name: "name10", pid: 7 },
  ];

  function toTree(arr) {
    const list = JSON.parse(JSON.stringify(arr));
    const objs = {};
    let root = null;
    while (list.length > 0) {
      //从头往前依次弹出
      let item = list.shift();
      //如果objs中没有这一项 则放入
      if (!objs[item.id]) {
        objs[item.id] = item;
      }
      //处理树根
      if (item.pid === -1 && !root) {
        root = item;
        continue;
      }
      const parent = objs[item.pid];
      if (!parent) {
        list.push(item); //没看懂
      } else {
        //该父节点有没有子节点数组
        parent.children = parent.children ? parent.children.concat(item) : [item];
      }
    }
    return root;
  }
  // console.log(toTree(data));
}
{
  //数组转树
  // 递归
  const currentArray = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];
  function arrToTree(list, pid) {
    let flag = list.filter((item) => item.pid === pid);
    return flag.length === 0
      ? []
      : flag.map((i) => {
          let obj = { label: i.name, children: arrToTree(list, i.id) };
          return obj.children.length === 0 ? { label: obj.label } : obj;
        });
  }
  // console.log(arrToTree(currentArray, ""));
}
{
  //a==1 && a==2 && a==3
  //a === 1 && a=== 2 && a===3
  //重写
  //== 隐式转换判断时先会调用valueof函数 数组调用valueof后返回的还是数组本身就会再调用tostring
  // 1.对象
  let a = {
    i: 1,
    valueOf: function () {
      return this.i++;
      // 或
      // return a.i++;
    },
  };
  // console.log(a == 1 && a == 2 && a == 3);
  // 2.数组
  let b = [1, 2, 3];
  b.toString = b.shift;
  // console.log(b.valueOf().toString());
  // console.log(b.valueOf().toString());
  // console.log(b.valueOf().toString());
  // console.log(b == 1 && b == 2 && b == 3);
  //直接改写valueOf方法也一样
  let c = [1, 2, 3];
  c.valueOf = c.shift;
  // console.log(c == 1 && c == 2 && c == 3);
  let d = {
    value: [3, 2, 1],
    valueOf: function (params) {
      return this.value.pop();
    },
  };
  // console.log(d == 1 && d == 2 && d == 3);

  //代理
  // 1.Object.defineProperty()
  var _e = 1;
  Object.defineProperty(this, "e", {
    get: function () {
      return _e++;
    },
  });
  // console.log(e === 1 && e === 2 && e === 3);
  // 2.Proxy
}
{
  //驼峰命名转化为_
  let a = "aTextHello";
  function translate(str) {
    //判断是否是大写
    let arr = str.split("");

    function isA(s) {
      if (s === s.toLocaleUpperCase()) {
        return true;
      } else {
        return false;
      }
    }
    console.log(arr);
    arr.forEach((element, index) => {
      if (isA(element)) {
        // console.log(111);
        arr[index] = "_" + element.toLocaleLowerCase();
      }
    });
    return arr.join("");
  }
  // console.log(translate(a));
  //正则
  function translateReg(str) {
    let reg = /[(A-Z)]/g;
    return str.replace(reg, function (param) {
      console.log(param);
      return "_" + param.toLocaleLowerCase();
    });
  }
  // console.log(translateReg(a));
}
{
  //_转驼峰命名
  let s = "a_text_hello";
  function translate(str) {
    let reg = /_[a-z]/g;
    return str.replace(reg, function (match) {
      console.log(match);
      return match.slice(1).toLocaleUpperCase();
    });
  }
  // console.log(translate(s));
}
{
  //a^b
}
{
  //手写instanceOf
  function _instanceof(obj, fn) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    let testPrototype = fn.prototype;
    let __proto__ = Object.getPrototypeOf(obj);
    while (true) {
      if (__proto__ === testPrototype) {
        return true;
      } else if (__proto__ === null) {
        return false;
      } else {
        __proto__ = Object.getPrototypeOf(__proto__);
      }
    }
  }
  const name = new Function();
  // console.log(_instanceof(name, Function));
  // console.log(Function.prototype.constructor === Function);
  // console.log(name.__proto__ === Function.prototype);
  // console.log(name instanceof Function);
}
{
  //节流
  function throttle(fn, time) {
    let flag = true;
    return function (params) {
      const context = this;
      const args = arguments;
      if (!flag) return;
      flag = false;
      setTimeout(() => {
        fn().call(context, args);
        flag = true;
      }, time);
    };
  }
}
{
  //防抖
  function debounce(fn, time) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      const context = this;
      const args = arguments;
      timer = setTimeout(() => {
        fn.call(context, args);
      }, time);
    };
  }
}
//promise实现一秒打印一个数字
{
  function PromiseNum(num) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(num);
        resolve();
      }, 1000);
    });
  }
  // 1.利用then链式调用
  let promise = Promise.resolve();
  for (let i = 0; i <= 5; i++) {
    // promise = promise.then(() => PromiseNum(i));
  }
  // 2.利用 async
  async function test(params) {
    for (let i = 0; i < 5; i++) {
      await PromiseNum(i);
    }
  }
  // test();
}
//promise实现红绿灯
{
  // 1.只用settimeot 三个灯互相调用

  function red() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("红");
        green();
      }, 2000);
    });
  }
  function green() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("绿");
        yellow();
      }, 2000);
    });
  }
  function yellow() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("黄");
        red();
      }, 2000);
    });
  }
  // red();
  //2.利用链式调用 + finall方法
  function red() {
    console.log("红灯亮");
  }
  function yellow() {
    console.log("黄灯亮");
  }
  function green() {
    console.log("绿灯亮");
  }
  function light(cb, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        cb && cb();
        resolve();
      }, time);
    });
  }
  function start() {
    light(red, 3000)
      .then(() => {
        return light(yellow, 2000);
      })
      .then(() => {
        return light(green, 1000);
      })
      .finally(() => {
        start();
      });
  }
  // start();
  // 3.还是利用async 实现延迟
  async function lightStep() {
    await light(red, 3000);
    await light(yellow, 2000);
    await light(green, 1000);
    await lightStep();
  }
  // lightStep();
}
{
  //手写深拷贝
  let obj = {
    a: "1",
    b: 2,
    c: /\d/,
    d: new Date(),
    e: {
      f: {
        g: [1, 2, 3, 4],
      },
    },
  };
  function deepClone(target) {
    if (typeof target !== "object") return target;
    let newobj = Array.isArray(obj) ? [] : {};
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        const element = target[key];
        if (element instanceof RegExp) {
          newobj[element] = new RegExp(element);
        } else if (element instanceof Date) {
          newobj[element] = new Date(element.getTime());
        } else {
          newobj[element] = typeof element === "object" ? deepClone(element) : element;
        }
      }
    }
    return newobj;
  }
  let newobj = deepClone(obj);
  // console.log(newobj);
}
//实现一个sleep函数
{
  function sleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() - start < delay) {
      continue;
    }
    console.log("freeze结束");
  }
  // sleep(5000);
  //定时器
  //promise + 定时器
  //async + 定时器
}
//数组扁平
{
  //reduce递归
  const flatten = (arr) => {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
  };
  const arr = [1, [2, [3, [4, 5]]], 6];
  // const res4 = flatten(arr);
  // console.log(res4);
}
//函数递归
{
  function flatten(arr) {
    let res = [];
    function fn(arr) {
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (Array.isArray(element)) {
          fn(element);
        } else {
          res.push(element);
        }
      }
    }
    fn(arr);
    return res;
  }
  const arr = [1, [2, [3, [4, 5]]], 6];
  // const res = flatten(arr);
}
//栈 扁平
{
  function stack(arr) {
    let stack = [];
    let res = [];
    stack.push(arr);
    while (stack.length > 0) {
      let item = stack.shift();
      if (Array.isArray(item)) {
        stack.unshift(...item);
      } else {
        res.push(item);
      }
    }
    return res;
  }
  const arr = [1, [2, [3, [4, 5]]], 6];
  // console.log(stack(arr));
}
//手写call
{
  function _call(ctx, ...args) {
    // console.log(this, "this");
    let context = ctx === undefined ? window : Object(ctx);
    let symbol = Symbol();
    context[symbol] = this; //被借用的fn
    let res = context[symbol](...args);
    delete context[symbol];
    return res;
  }

  const obj = {
    a: 1,
  };
  Function.prototype._call = _call;
  function test(params) {
    console.log(this.a, params);
  }
  // test._call(obj, "yms");
}
//手写bind
{
  function _bind(ctx, ...args) {
    let context = ctx === undefined ? window : Object(ctx);
    let fn = this;
    return function newFn(...fnArgs) {
      // console.log(11111);
      // console.log(this, "this");
      // let res
      if (this instanceof newFn) {
        res = new fn(...args, ...fnArgs);
      } else {
        res = fn.call(context, ...args, ...fnArgs);
      }
      return res;
    };
  }
  // function test(params) {
  //   console.log(111, params);
  // }
  // let obj = {
  //   a: 1,
  // };
  // Function.prototype._bind = _bind;
  // let fn = test._bind(obj, "yms");
  // fn();
  // console.log(fn);
  // let item = new fn();
  // console.log(item);
}

//手写new
{
  function _new(fn, ...args) {
    if (typeof fn !== "function") return;
    let newobj = Object.create(fn.prototype);
    let res = fn.apply(newobj, args);
    return (typeof res === "object" && res !== null) || typeof res === "function" ? res : newobj;
  }
}
{
  //   类似与实现一个函数 find(obj, str)，满足:
  // 如var obj = {a:{b:{c:1}}};
  let obj = {
    a: {
      b: {
        c: 1,
      },
    },
  };
  function get(key, obj) {
    if (key in obj) {
      return obj[key];
    } else {
      return false;
    }
  }
  function find(obj, str) {
    let arr = str.split(".");
    let newObj = JSON.parse(JSON.stringify(obj));
    while (arr.length) {
      let key = arr.shift();
      if (get(key, newObj) !== false) {
        newObj = get(key, newObj);
        continue;
      } else {
        return undefined;
      }
    }
    return newObj;
  }
  // console.log(find(obj, "a.d.c"));

  // find(obj, "a.d.c"); //undefined
}
{
  // 手写订阅发布
  class EventEmit {
    constructor() {
      this.cache = {};
    }
    on(name, fn) {
      if (this.cache[name]) {
        this.cache[name].push(fn);
      } else {
        this.cache[name] = [];
        this.cache[name].push(fn);
      }
    }
    off(name, fn) {
      if (this.cache[name]) {
        this.cache[name] = this.cache[name].filter((item) => {
          return item !== fn;
        });
      } else {
        return;
      }
    }
    emit(name, ...args) {
      if (this.cache[name]) {
        let task = this.cache[name].slice();
        for (const fn of task) {
          fn(...args);
        }
      } else {
        return;
      }
    }
    once(name, fn) {
      let fn1 = () => {
        fn();
        this.off(name);
      };
      this.on(name, fn1);
    }
  }
}
//手写观察者
{
  class watch {
    constructor(name) {
      this.name = name;
    }
    update() {
      console.log("收到通知了");
    }
  }
  class Notify {
    constructor() {
      this.watcherlist = [];
    }
    add(watcher) {
      this.watcherlist.push(watcher);
    }
    off(watcher) {
      this.watcherlist = this.watcherlist.filter((item) => {
        return item !== watcher;
      });
    }
    notify() {
      this.watcherlist.forEach((element) => {
        element.update();
      });
    }
  }
}
//手写promiseall
{
  function myPromiseAll(iterable) {
    let arr = Array.from(iterable);
    let len = arr.length;
    let count = 0;
    let result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        const element = arr[i];
        Promise.resolve(element)
          .then((res) => {
            result[i] = res;
            count++;
            if (count === len) {
              resolve(result);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
{
  function myPromiseRace(iterable) {
    let arr = Array.from(iterable);
    return new Promise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        Promise.resolve(element)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
//防抖
{
  function debounce(fn, time) {
    let timeout = null;
    return function (params) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.call(this);
      }, time);
    };
  }
}
//节流
{
  function throttle(fn, time) {
    let flat = true;
    return function (params) {
      if (!flat) {
        return;
      }
      flat = false;
      setTimeout(() => {
        fn.call(this);
        flat = true;
      }, time);
    };
  }
}
//字节一面
{
  let obj = {
    a: {
      b: [
        {
          c: {
            b: 1,
          },
        },
      ],
    },
  };
  function loadshGet(str) {
    let reg = /\[/g;
    let reg1 = /\]/g;
    let res = str.replace(reg, ".").replace(reg1, "");

    console.log(res);
  }
  // loadshGet("a.b[0].c.d");
}
//函数珂里化
{
  // sum(1)(2,3)(4).valueOf = 10
  function sum(...args) {
    let res = 0;
    let add = (...args) => {
      console.log(args);
      res = args.reduce((pre, cur) => {
        return pre + cur;
      }, res);
      return add;
    };
    add(...args);
    add.valueOf = () => {
      return res;
    };
    return add;

    // return;
  }
  // console.log(sum(1)(2, 3)(4).valueOf());
}
//promise实现并发请求
// 1.不用Promise.race
{
  //自定义请求函数
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`任务${url}完成`);
      }, 2000);
    }).then((res) => {
      console.log("外部逻辑", res);
    });
  }
  //添加任务
  function addTask(url) {
    let task = request(url);
    pool.push(task);
    task.then((res) => {
      //请求结束后将该Promise 任务从并发池中移除
      pool.splice(pool.indexOf(task), 1);
      console.log(`${url} 结束，当前并发数：${pool.length}`);
      url = urls.shift();
      //跑完一个就加入一个
      if (url !== undefined) {
        addTask(url);
      }
    });
  }
  let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
  let pool = []; //并发池子
  let max = 3; //最大并发数量
  // while (pool.length < max) {
  //   let url = urls.shift();
  //   addTask(url);
  // }
}
//通过Promise.race
{
  //自定义请求函数
  function request(url) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`任务${url}完成`);
      }, 1000);
    }).then((res) => {
      console.log("外部逻辑", res);
      return 123;
    });
  }
  //添加任务
  function addTask(url) {
    let task = request(url);
    pool.push(task);
    task.then((res) => {
      pool.splice(pool.indexOf(task), 1);
      console.log(`${url} 结束，当前并发数：${pool.length}`);
      return 456;
    });
  }

  //每当并发池跑完一个任务,就再塞入一个任务
  function run(race) {
    race.then((res) => {
      console.log(res, "res");
      let url = urls.shift();
      if (url !== undefined) {
        addTask(url);
        run(Promise.race(pool));
      }
    });
  }

  let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
  let pool = []; //并发池子
  let max = 3; //最大并发数量
  // while (pool.length < max) {
  //   let url = urls.shift();
  //   addTask(url);
  // }
  //利用promise.race来获取并发池中某任务完成的信号
  // let race = Promise.race(pool);
  // setTimeout(() => {
  //   console.log(race, "race");
  // }, 2000);
  // run(race);
}

//3.Promise.race和异步函数
{
  //自定义请求函数
  function request(url) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`任务${url}完成`);
      }, 1000);
    }).then((res) => {
      console.log("外部逻辑", res);
    });
  }
  //执行任务
  async function fn() {
    let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
    let pool = []; //并发池子
    let max = 3; //最大并发数量
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i];
      let task = request(url);
      task.then((res) => {
        pool.splice(pool.indexOf(task), 1);
        console.log(`${url} 结束，当前并发数：${pool.length}`);
      });
      pool.push(task);
      //利用Promise.race方法来获得并发池中某任务完成的信号
      //跟await结合当有任务完成才让程序继续执行,让循环把并发池塞满
      if (pool.length === max) {
        await Promise.race(pool);
      }
    }
  }
  // fn();
}

//4.通过Promise.all
{
  const delay = function delay(interval) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(interval);
      }, interval);
    });
  };

  let tasks = [
    () => {
      return delay(1000);
    },
    () => {
      return delay(1003);
    },
    () => {
      return delay(1005);
    },
    () => {
      return delay(1002);
    },
    () => {
      return delay(1004);
    },
    () => {
      return delay(1006);
    },
  ];

  function createRequest(tasks, pool) {
    pool = pool || 5;
    let results = [];
    let together = new Array(pool).fill(null);
    let index = 0;
    together = together.map((item, i) => {
      return new Promise((resolve, reject) => {
        function run() {
          console.log(index);
          if (index >= tasks.length) {
            resolve();
            return;
          }
          let old_index = index;
          // 从任务池拿任务，由于index是升级作用域的变量，所以多个Promise共享一个index
          //这样可以让一个数组里面的任务一次执行
          let task = tasks[index++];
          task()
            .then((result) => {
              // 将返回的结果放置在results里面，实现请求数据的集中存储。
              results[old_index] = result;
              // 只有在上一个任务执行成功后才会执行一个异步任务
              run();
            })
            .catch((reason) => {
              reject(reason);
            });
        }
        run();
      });
    });
    // 多个promise同时处理，根据pool来限制同一时刻并发请求的个数
    return Promise.all(together).then(() => results);
  }
  // createRequest(tasks, 3)
  //   .then((results) => {
  //     console.log("success->", results);
  //   })
  //   .catch((reason) => {
  //     console.log("fail->", reason);
  //   });
}
//函数珂里化 收集一次累加一次
{
  //实现add(1)(2)(3)(4).valueOf=10; 、 add(1)(1,2,3)(2).valueOf=9;
  function add(...args) {
    let res = 0;
    function sum(...args) {
      console.log(args);
      res = args.reduce((pre, cur) => {
        return pre + cur;
      }, res);
      return sum;
    }
    sum(...args);
    sum.valueOf = () => {
      return res;
    };
    return sum;
  }
  // console.log(add(1, 2, 3)(2)(1).valueOf());
}
//函数珂里化 全部收集完最后再加
{
  function add() {
    let arr = [...arguments];
    function fn() {
      arr.push(...arguments);
      return fn;
    }
    fn.toString = function (params) {
      return arr.reduce((pre, cur) => {
        return pre + cur;
      });
    };
    return fn;
  }
  // console.log(add(1)(1, 2, 3)(2).toString());
}
//青蛙跳台阶
{
  //一次可以跳1阶 也可以跳两阶 求跳上n阶有多少种跳法
  // 1.递归
  function jump(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return jump(n - 1) + jump(n - 2);
  }
  // console.log(jump(7));
  // 2.动态规划
  function jump1(n) {
    let dp = Array(n).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 2] + dp[i - 1];
    }
    return dp[n];
  }
  // console.log(jump1(7));
}
//数组转树 递归map
{
  const currentArray = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];
  function arrToTree(arr, pid) {
    //找父亲
    let flag = arr.filter((item) => item.pid === pid);
    if (flag.length === 0) {
      return [];
    } else {
      //给父亲找儿子
      return flag.map((i) => {
        let children = arrToTree(arr, i.id);
        if (children.length) {
          i.children = children;
          return i;
        } else {
          return i;
        }
      });
    }
  }
  // console.log(arrToTree(currentArray));
}
//数组转树 递归 reduce
{
  const currentArray = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];
  function arrToTree(arr, pid) {
    return arr.reduce((pre, cur) => {
      if (cur.id === pid) {
        //找儿子
        const children = arrToTree(arr, cur.id);
        if (children.length) {
          cur.children = children;
        }
        //找父亲
        pre.push(cur);
      }
      return pre;
    }, []);
  }
}
//数组转树 迭代 核心是新建一个 objs记录每一人 给objs里的对象加属性 假如root 是张大大
// 在objs里给张大大加children root里的张大大也会有了这个children属性
// 因为公用同一个地址
{
  const currentArray = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];
  function arrToTree(arr) {
    let list = JSON.parse(JSON.stringify(arr));
    let root = null;
    // !!!!!!!!拿一个obj 记录每一个人 方便找父亲
    let objs = {};
    while (list.length) {
      let item = list.shift();
      if (!objs[item.id]) {
        objs[item.id] = item;
      }
      //处理树根
      if (item.pid === "" && !root) {
        root = item;
        continue;
      }
      //给这个item找父亲
      let parent = objs[item.pid];
      if (!parent) {
        //父亲还没出现 再push回去  因为可能是乱序的
        list.push(item);
      } else {
        parent.children = parent.children ? parent.children.concat(item) : [item];
      }
    }
    return root;
  }
}
//快速排序
{
  function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    let pivot = arr.slice(0)[0];
    let hight = [];
    let low = [];
    let middle = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > pivot) {
        hight.push(arr[i]);
      } else if (arr[i] < pivot) {
        low.push(arr[i]);
      } else {
        middle.push(arr[i]);
      }
    }
    return quickSort(low).concat(middle).concat(quickSort(hight));
  }
  let arr = [1, 8, 5, 6, 9, 2, 7, 6];
  // console.log(quickSort(arr));
}
//数组扁平
{
  //1.api
  const arr = [1, [2, [3, [4, 5]]], 6];
  let res = arr.flat(Infinity);
  // console.log(res);
  //2.正则
  let res1 = JSON.parse("[" + JSON.stringify(arr).replace(/\[|\]/g, "") + "]");
  // console.log(res1);
  //3.函数递归
  let res2 = [];
  const fn = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (Array.isArray(element)) {
        fn(element);
      } else {
        res2.push(element);
      }
    }
  };
  fn(arr);
  // console.log(res2);
  // [1, [2, [3, [4, 5]]], 6];
  //3.reduce + 递归
  const flatten = (arr) => {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
  };
  // console.log(flatten(arr));
}
//promiseAll
{
  function myPromiseAll(iterable) {
    let promises = Array.from(iterable);
    let len = promises.length;
    let count = 0;
    let results = [];
    return new Promise((resolve, reject) => {
      promises.forEach((element, index) => {
        Promise.resolve(element)
          .then((res) => {
            results[index] = res;
            count++;
            if (count === len) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }
}
// css的颜色有哪些形式，rgb/rgba，pink之类的字符串，'#666fff'为什么有6位，各表示什么，
// 手写一个生成随机颜色（颜色表示方式用'#666fff'这种）的函数
{
  function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);
    return "#" + red + green + blue;
  }
  // console.log(randomColor());
}
// 手写千分位转换（三位一加逗号）
//正则
{
  let num = "123456.7890";
  function test(num) {
    let arr = num.split(".");
    let integerPart = arr[0];
    let decimalPart = arr[1];
    let reg = /(\d)(?=(\d{3})+$)/g;
    // let reg = /(\d)(?=(\d{3})+$)/g;
    integerPart = integerPart.replace(reg, ($1) => {
      return $1 + ",";
    });
    console.log(integerPart + "." + decimalPart);
  }
  // test(num);
}
//不用正则
{
}
// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。
// 完善代码中Scheduler类，
// 使得以下程序能正确输出
{
  class Scheduler {
    constructor() {
      this.count = 2;
      this.queue = [];
      this.run = [];
    }
    excute(task) {
      this.run.push(task);
      Promise.resolve(task()).then(() => {
        task.resolve();
        this.run.splice(this.run.findIndex(task), 1);
        if (this.queue.length) {
          this.excute(this.queue.shift());
        }
      });
    }
    add(task) {
      return new Promise((resolve, reject) => {
        task.resolve = resolve;
        if (this.run.length < this.count) {
          this.excute(task);
        } else {
          this.queue.push(task);
        }
      });
    }
  }

  const timeout = (time) =>
    new Promise((resolve) => {
      setTimeout(resolve, time);
    });

  const scheduler = new Scheduler();
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order, "res"));
  };

  // addTask(1000, "1");
  // addTask(500, "2");
  // addTask(300, "3");
  // addTask(400, "4");
  // output: 2 3 1 4

  // 一开始，1、2两个任务进入队列
  // 500ms时，2完成，输出2，任务3进队
  // 800ms时，3完成，输出3，任务4进队
  // 1000ms时，1完成，输出1
  // 1200ms时，4完成，输出4
  //答案
  // class Scheduler {
  //  constructor() {
  //    this.count = 2
  //    this.queue = []
  //    this.run = []
  //  }

  //  excute(task) {
  //    this.run.push(task)
  //    Promise.resolve(task()).then(() => {
  //      task.resolve()
  //      this.run.splice(this.run.findIndex(task), 1)
  //      if (this.queue.length) {
  //        this.excute(this.queue.shift())
  //      }
  //    })
  //  }

  //  add(task) {
  //    return new Promise((resolve, reject) => {
  //      task.resolve = resolve
  //      if (this.run.length < this.count) {
  //        this.excute(task)
  //      } else this.queue.push(task)
  //    })
  //  }
  // }

  // const timeout = (time) =>
  //  new Promise((resolve) => {
  //    setTimeout(resolve, time)
  //  })

  // const scheduler = new Scheduler()
  // const addTask = (time, order) => {
  //  scheduler.add(() => timeout(time)).then(() => console.log(order))
  // }
  // addTask(1000, '1')
  // addTask(500, '2')
  // addTask(300, '3')
  // addTask(400, '4')
}
//promise.retry
{
  function getUrl() {
    return new Promise((resolve, reject) => {
      // do...
      let count = Math.random();
      if (count > 0.5) {
        resolve(count);
      } else {
        reject("失败");
      }
    });
  }
  function PromiseRetry(fn, times, delay) {
    return new Promise((resolve, reject) => {
      let time = 0;
      let attemp = () => {
        fn()
          .then((res) => {
            resolve(res);
            // console.log("成功");
          })
          .catch((err) => {
            time++;
            if (time === times) {
              // console.log("请求失败");
              reject(err);
            }
            setTimeout(() => {
              console.log("重试");
              attemp();
            }, delay);
          });
      };
      attemp();
    });
  }
  // PromiseRetry(getUrl, 5, 1000)
  //   .then((res) => {
  //     console.log("最后成功了", res);
  //   })
  //   .catch((err) => {
  //     console.log("最后还是失败了");
  //   });
}
//promise并发
{
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then((res) => {
      console.log(`任务${url}完成`);
    });
  }
  function addTask(url) {
    let task = request(url);
    pool.push(task);
    task.then((res) => {
      pool.splice(pool.indexOf(task), 1);
      console.log(`${url}任务结束,当前任务池的数量${pool.length}`);
      url = urls.shift();
      if (url !== undefined) {
        addTask(url);
      }
    });
  }
  let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
  let pool = []; //并发池子
  let max = 3; //最大并发数量
  // while (pool.length < max) {
  //   let url = urls.shift();
  //   addTask(url);
  // }
}
//通过Promise.race
{
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then((res) => {
      console.log(`任务${url}完成`);
      return 11111;
    });
  }
  let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
  let pool = [];
  let max = 3;
  function addTask(url) {
    let task = request(url);
    pool.push(task);
    task.then((res) => {
      pool.splice(pool.indexOf(task), 1);
      console.log(`${url} 结束，当前并发数：${pool.length}`);
    });
  }
  function run(race) {
    race.then((res) => {
      let url = urls.shift();
      if (url !== undefined) {
        addTask(url);
        run(Promise.race(pool));
      }
    });
  }
  // while (pool.length < max) {
  //   let url = urls.shift();
  //   addTask(url);
  // }
  // let race = Promise.race(pool);
  // run(race);
}
//Promise.race和异步函数
{
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then((res) => {
      console.log(`任务${url}完成`);
      return 11111;
    });
  }
  async function fn(params) {
    let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
    let pool = [];
    let max = 3;
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i];
      let task = request(url);
      task.then((res) => {
        pool.splice(pool.indexOf(task), 1);
        console.log(`${url} 结束，当前并发数：${pool.length}`);
      });
      pool.push(task);
      if (pool.length === max) {
        await Promise.race(pool);
      }
    }
  }
  // fn();
}
//手写bind apply call
{
  Function.prototype._call = function (ctx, ...args) {
    ctx = ctx === undefined ? window : Object(ctx);
    let fn = this;
    let symbol = Symbol();
    ctx[symbol] = fn;
    let res = ctx[symbol](...args);
    delete ctx[symbol];
    return res;
  };
  function sayName() {
    console.log(this.name);
    console.log(arguments);
  }
  let obj = {
    name: "yms",
  };
  // sayName._call(obj, "哈哈哈哈");

  Function.prototype._bind = function (ctx, ...args) {
    ctx = ctx === undefined ? window : Object(ctx);
    let fn = this;
    let newFn = function (...fnArgs) {
      if (this instanceof newFn) {
        res = new fn(...args, ...fnArgs);
      } else {
        res = fn.call(ctx, ...args, ...fnArgs);
      }
      return res;
    };
    return newFn;
  };
  // let fn = sayName._bind(obj, "哈哈哈哈");
  // let item = new fn();
  // console.log(item);
}
//手写new
{
  function _new(fn, ...args) {
    if (typeof fn !== "function") return;
    let obj = Object.create(fn.prototype);
    let res = fn.call(obj, ...args);
    return (typeof res === "object" && res !== null) || typeof res === "function" ? res : obj;
  }
}
//数组转树 迭代
{
  const currentArray = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];
  function arrToTree(arr) {
    let root = null;
    let list = JSON.parse(JSON.stringify(arr));
    let obj = {};
    while (list.length > 0) {
      let item = list.shift();
      if (!obj[item.id]) {
        obj[item.id] = item;
      }
      if (item.pid === "" || root === null) {
        root = item;
        continue;
      }

      let parent = obj[item.pid];
      if (parent) {
        if (obj[item.pid].child) {
          obj[item.pid].child.push(item);
        } else {
          obj[item.pid].child = [item];
        }
      } else {
        list.push(item);
      }
    }
    return root;
  }
  // console.log(arrToTree(currentArray));
}
//数组转树 递归
{
  const currentArray = [
    { id: "01", name: "张大大", pid: "", job: "项目经理" },
    { id: "02", name: "小亮", pid: "01", job: "产品leader" },
    { id: "03", name: "小美", pid: "01", job: "UIleader" },
    { id: "04", name: "老马", pid: "01", job: "技术leader" },
    { id: "05", name: "老王", pid: "01", job: "测试leader" },
    { id: "06", name: "老李", pid: "01", job: "运维leader" },
    { id: "07", name: "小丽", pid: "02", job: "产品经理" },
    { id: "08", name: "大光", pid: "02", job: "产品经理" },
    { id: "09", name: "小高", pid: "03", job: "UI设计师" },
    { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
    { id: "11", name: "小华", pid: "04", job: "后端工程师" },
    { id: "12", name: "小李", pid: "04", job: "后端工程师" },
    { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
    { id: "14", name: "小强", pid: "05", job: "测试工程师" },
    { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  ];
  function arrToTree(arr, pid) {
    return arr.reduce((pre, cur) => {
      if (cur.pid === pid) {
        pre.push(cur);
        const child = arrToTree(arr, cur.id);
        if (child.length) {
          cur.child = child;
        }
      }
      return pre;
    }, []);
  }
  // arrToTree(currentArray, "");
}
// const arr = [{a:2}, {a:2}, {a:2, b:1}, {a:{b:1, c:{a:1}}},{a:{b:1, c:{a:1}}}] 去重
//isEqualWith
// 递归比较两个对象是否相同
{
  let obj1 = { a: { b: 1, c: { a: 1, b: 1 } } };
  let obj2 = { a: { b: 1, c: "2" } };
  function isEqualWith(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key in obj1) {
      if (Object.prototype.toString.call(obj1[key]) === "[object Object]" || Object.prototype.toString.call(obj2[key]) === "[object Object]") {
        if (isEqualWith(obj1[key], obj2[key]) === false) {
          return false;
        }
      } else {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
    return true;
  }
  // console.log(isEqualWith(obj1, obj2));
}
//手写instancof方法
{
  function _instanceof(obj, fn) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    let prototype = fn.prototype;
    let __proto__ = Object.getPrototypeOf(obj);
    while (true) {
      if (__proto__ === prototype) {
        return true;
      } else {
        if (__proto__ === null) {
          return false;
        } else {
          __proto__ = Object.getPrototypeOf(__proto__);
        }
      }
    }
  }
}
// Promise.retry
{
  function request() {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject();
      }
    });
  }
  function retry(req, time) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let run = () => {
        req()
          .then((res) => {
            resolve("最终成功了");
          })
          .catch((err) => {
            count++;
            if (count === time) {
              reject("最终失败了");
            }
            console.log("失败了");
            setTimeout(() => {
              run();
            }, 1000);
          });
      };
      run();
    });
  }
  // retry(request, 5)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}
//实现红绿灯(三个灯互相调用)
{
  function red() {
    new Promise((resolve, reject) => {
      console.log("红灯开始");
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then((res) => {
      console.log("红灯结束");
      green();
    });
  }
  function green(params) {
    new Promise((resolve, reject) => {
      console.log("绿灯开始");
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then((res) => {
      console.log("绿灯灯结束");
      yellow();
    });
  }
  function yellow(params) {
    new Promise((resolve, reject) => {
      console.log("黄灯开始");
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then((res) => {
      console.log("黄灯结束");
      red();
    });
  }
  // red();
}
//利用.then链式调用 最后利用finall递归
{
  function test(params) {
    new Promise((resolve, reject) => {
      console.log("红灯开始");
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then((res) => {
      console.log("红灯结束");
      new Promise((resolve, reject) => {
        console.log("绿灯开始");
        setTimeout(() => {
          resolve();
        }, 3000);
      }).then((res) => {
        console.log("绿灯灯结束");
        new Promise((resolve, reject) => {
          console.log("黄灯开始");
          setTimeout(() => {
            resolve();
          }, 3000);
        })
          .then((res) => {
            console.log("黄灯结束");
          })
          .finally(() => {
            test();
          });
      });
    });
  }
  // test();
}
//利用async 达到延迟的效果
{
  async function test(params) {
    await new Promise((resolve, reject) => {
      console.log("红灯开始");
      setTimeout(() => {
        resolve();
        console.log("红灯结束");
      }, 3000);
    });
    await new Promise((resolve, reject) => {
      console.log("绿灯开始");
      setTimeout(() => {
        resolve();
        console.log("绿灯结束");
      }, 3000);
    });
    await new Promise((resolve, reject) => {
      console.log("黄灯开始");
      setTimeout(() => {
        resolve();
        console.log("黄灯结束");
      }, 3000);
    });
    test();
  }
  // test();
}
//同时发出多个请求，怎么保证按顺序返回结果
{
  // 模拟异步请求的函数
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`请求${url}的结果`);
      }, Math.random() * 1000);
    });
  }

  // 并行发送多个请求
  async function sendParallelRequests(urls) {
    let promises = urls.map((url) => {
      return request(url);
    });
    const results = await Promise.all(promises);
    results.forEach((res, index) => {
      console.log(`处理请求 ${urls[index]} 的结果: ${res}`);
    });
  }
  // 测试
  const urls = ["url1", "url2", "url3"];
  // sendParallelRequests(urls);
}
//按顺序 但是阻塞了
{
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`请求${url}的结果`);
      }, Math.random() * 1000);
    });
  }
  async function logInOrder(urls) {
    for (const url of urls) {
      let res = await request(url);
      console.log(res);
    }
  }
  const urls = ["url1", "url2", "url3"];
  // logInOrder(urls);
}
//优化
{
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`请求${url}的结果`);
      }, Math.random() * 5000);
    });
  }
  const urls = ["url1", "url2", "url3"];
  async function logInOrder() {
    const promises = urls.map(async (url) => {
      let res = await request(url);
      return res;
    });
    for (const p of promises) {
      console.log(await p);
    }
  }
  // logInOrder(urls);
}
//并发限制
{
  let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
  let pool = [];
  let max = 3;
  function request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then((res) => {
      console.log(`请求${url}完成`);
    });
  }
  async function fn(params) {
    for (let i = 0; i < urls.length; i++) {
      let task = request(urls[i]);
      pool.push(task);
      task.then(() => {
        pool.splice(pool.indexOf(task), 1);
      });
      if (pool.length === max) {
        await Promise.race(pool);
      }
    }
  }
  // fn();
}
//千分位转换
{
  let num = "1234567890";
  function test(str) {
    //先行断言
    let reg = /(\d)(?=(\d{3})+$)/g;
    return str.replace(reg, ($1) => {
      return $1 + ",";
    });
  }
  // console.log(test(num));
}
//promiseAll 实现并发请求
{
  let urls = ["bytedance.com", "tencent.com", "alibaba.com", "microsoft.com", "apple.com", "hulu.com", "amazon.com"];
  let pool = [];
  let max = 3;

  function test(params) {
    return new Promise((resolve, reject) => {});
  }
}

//js实现继承的方式
{
  function Father(name, age) {
    this.name = name;
    this.age = age;
    this.color = ["red", "green", "black"];
  }
  Father.prototype.obj = {
    a: 1,
  };
  Father.prototype.sayhi = function (params) {
    console.log("你好我是" + this.name);
  };

  const f = new Father("yms", 18);
  // f.sayhi();
  //原型继承
  // function Son(params) {}
  // Son.prototype = new Father("yms", 18);
  // const son = new Son();
  // console.log(son.__proto__.sayhi);
  //构造函数继承
  // function Son(params) {
  //   Father.call(this, "yms", 18);
  // }
  // const son = new Son(arguments);
  // son.color = [];
  // console.log(f.color);
  //组合继承就是原型继承+构造函数继承

  // 原型式继承
  // let obj = Object.create(Father.prototype);
  //寄生式继承 在原型式继承的基础上，增强对象，返回构造函数
  //寄生组合式继承
  function Son(name, age) {
    Father.call(this, name);
    this.age = age;
  }
  let prototype = Object.create(Father.prototype);
  prototype.constrctor = Son;
  Son.prototype = prototype;
  const son = new Son("yms", 18);
  son.sayhi = function (params) {
    console.log(6666);
  };
  son.obj.c = 0;
  // console.log(f.obj);
  son.color = [];
  // son.sayhi();
  // f.sayhi();
  // console.log(f.color);
}
//ES6继承
{
  class Parent {
    #p;
    constructor(value) {
      this.val = value;
      this.#p = 1;
      this.getValue1 = function (params) {
        console.log(1231);
      };
    }
    getP() {
      return this.obj;
    }
    getValue() {
      console.log(333);
    }
    obj = {
      a: 1,
      b: 3,
    };
  }
  class Child extends Parent {
    constructor(value) {
      //看成 Parent.call(this, value)。
      super(value);
      this.a = 1;
      this.val = value;
    }
  }
  const f = new Parent(6);
  let child = new Child(1);
  // console.log(Child.prototype.__proto__ === Parent.prototype);
  // console.log(child.hasOwnProperty("getValue1"));
  // console.log(child.obj);
  // console.log(f.obj);

  // child.getValue()
  // child instanceof Parent
  // Parent.prototype.getValue()
}
// 将输入字符串去重按字典序输出
{
  function test(str) {
    let arr = Array.from(new Set(str));
    console.log(arr.sort());
  }
  // test("abracadabra");
}
//实现工厂模式 并实现继承
{
  function createPerson(name, age) {
    let obj = {
      name: name,
      age: age,
      sayHello: function () {
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
      },
    };
    return obj;
  }
  // const person1 = createPerson("Alice", 25);
  // person1.sayHello(); // 输出: Hello, my name is Alice and I'm 25 years old.
}
//大数求和
{
  const num1 = "12345678901234567895";
  const num2 = "98765432109876543215";
  function addStrings(num1, num2) {
    let res = "";
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    while (i >= 0 || j >= 0 || carry != 0) {
      let n1 = num1[i] >= 0 ? parseInt(num1[i]) : 0;
      let n2 = num2[j] >= 0 ? parseInt(num2[j]) : 0;
      let sum = n1 + n2 + carry;
      res = (sum % 10) + res;
      carry = Math.floor(sum / 10);
      i--;
      j--;
    }
    return res;
  }
  const sum = addStrings(num1, num2);
  // console.log(sum); // 输出: 111111111011111111110
}
//使用es6的bigInt
{
  const num1 = "12345678901234567895";
  const num2 = "98765432109876543215";
  const bigint1 = BigInt(num1);
  const bigint2 = BigInt(num2);
  // console.log((bigint1 + bigint2).toString());
}
//手写reduce
{
  let arr = [1, 2, 3, 4, 5];
  arr.reduce(() => {});
  Array.prototype._reduce = function (cb, initialValue) {
    let k = 0;
    const O = Object(this);
    let accumulator = initialValue == undefined ? O[k++] : initialValue;
    let len = this.length;
    while (k < len) {
      if (k in O) {
        accumulator = cb(accumulator, O[k], k, O);
      }
      k++;
    }
    return accumulator;
  };

  let res = arr._reduce((pre, cur) => {
    return pre + cur;
  });
  // console.log(res);
}
//迭代器
{
  function myIterantion(arr) {
    let index = 0;
    return {
      next: function () {
        return index < arr.length
          ? {
              value: arr[index++],
              done: false,
            }
          : {
              value: undefined,
              done: true,
            };
      },
    };
  }
  // let arr = [1, 2, 3];
  // let test = myIterantion(arr);
  // console.log(test.next());
  // console.log(test.next());
  // console.log(test.next());
  // console.log(test.next());
  // let iter = arr[Symbol.iterator]();
  // console.log(iter.next());
  // console.log(iter.next());
  // console.log(iter.next());
}
//自定义迭代器
{
  let obj = { name: "前端小鹿", age: "18", sex: "男" };
  //改造
  obj = {
    data: ["name:前端小鹿", "age:18", "sex:男"],
    [Symbol.iterator]: function () {
      let self = this;
      let index = 0;
      return {
        next: function () {
          return index < self.data.length
            ? {
                value: self.data[index++],
                done: false,
              }
            : {
                value: undefined,
                done: true,
              };
        },
      };
    },
  };
  for (const i of obj) {
    // console.log(i);
  }
  obj = {
    0: "前端小鹿",
    1: "18",
    2: "男",
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
  };
  // for (const I of obj) {
  //   console.log(I);
  // }
}
{
  // function test() {
  //   console.log(...arguments);
  //   for (const iterator of arguments) {
  //   }
  // }
  // test(1, 2, 3, 4);
}
