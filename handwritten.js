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
            executor(this.resolve, this.reject)

        } catch (e) {
            this.reject(e)
        }
    }
    initValue() {
        this.PromiseResult = null //终值
        this.PromiseState = 'pending'//状态
        this.resolveCallbacks = []//成功回调的函数数组
        this.rejectCallbacks = []
    }
    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }
    resolve(value) {
        //如果执行resolve,状态变为fulfilled
        if (this.PromiseState !== 'pending') return
        this.PromiseState = 'fulfilled'
        //终值为传来的值
        this.PromiseResult = value
        while (this.resolveCallbacks.length) {
            this.resolveCallbacks.shift().onFulfilled(this.PromiseResult)
        }
    }
    reject(value) {
        // console.log(this);
        if (this.PromiseState !== 'pending') return

        this.PromiseState = 'rejected'
        this.PromiseResult = value
        while (this.rejectCallbacks.length) {
            this.rejectCallbacks.shift().onRejected(this.PromiseResult)
        }
    }
    then(onFulfilled, onRejected) {
        //接收两个回调
        //确保参数是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        return new Mypromise((resolve, reject) => {

            if (this.PromiseState === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let res = onFulfilled(this.PromiseResult)
                        resolve(res)
                    } catch (error) {
                        reject(error)
                    }
                },);

            } else if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    try {
                        let res = onRejected(this.PromiseResult)
                        resolve(res)
                    } catch (error) {
                        reject(error)
                    }

                },);

            } else if (this.PromiseState === 'pending') {
                setTimeout(() => {
                    // let res =  onFulfilled(this.PromiseResult)

                    this.resolveCallbacks.push({
                        onFulfilled: value => {
                            try {
                                let res = onFulfilled(value)
                                resolve(res)
                            } catch (error) {
                                onRejected(error)
                            }
                        }
                    })
                    this.rejectCallbacks.push({
                        onRejected: value => {
                            try {
                                let res = onRejected(value)
                                resolve(res)
                            } catch (error) {
                                onRejected(error)
                            }
                        }
                    })
                },);
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
    const result = []
    //可迭代对象转换为数组
    const promises = Array.from(iterable)
    let count = 0 //定义一个计数器判断是否所有都执行完
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(res => {
                result[i] = res
                count++
                if (count == promises.length) {
                    resolve(result)
                }
            }).catch(err => reject(err))
        }
    })
}
//手写Promise.any
function MypromiseAny(iterable) {
    let errors = []
    return new Promise((resolve, reject) => {
        let count = 0
        const promises = Array.from(iterable)
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(res => {
                // result[i] = res
                resolve(res)
            }).catch(err => {
                count++
                errors.push(err)
                if (count === promises.length) {
                    reject(new AggregateError(errors))
                }
            })
        }
    })

}
//手写promise.race
function myPromiseRace(iterable) {
    let promises = Array.from(iterable)
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })

        }

    })
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
    let res = []
    let stack = [...arr]
    while (stack.length) {
        let first = stack.shift()
        if (Array.isArray(first)) {
            stack.unshift(...first)
        } else {
            res.push(first)
        }
    }
    return res
}
// console.log(stack(arr));
//利用join 或 tostring 扁平化 
arr.toString().split(',').map(item => +item)

//使用正则
JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(item => +item)

//用reduce 结合递归
function flatten(arr) {
    arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}
// flatten(arr)

let a = {
    name: 'yms'
}
function b(a) {
    a.age = 12
    a = {
        num: 1
    }
    return a
}
var a1 = b(a)
// console.log(a,a1);


// a.age = 10
// let a1 = a
// a1.age = 18
// a1 = {
//     num:1
// }
//手写寄生组合式继承
function inheritPrototype(Sub, Sup) {
    let prototype = Object.create(Sup.prototype)
    prototype.constrctor = Sub
    Sub.prototype = prototype
}

function Sup(name, age) {
    this.color = ['red', 'green', 'blue']
    this.name = name
    this.age = age
}
Sup.prototype.sayname = function () {
    console.log(this.name);
}

function Sub(name, age) {
    Sup.call(this, name)
    this.age = age
}
inheritPrototype(Sup, Sub)
Sub.prototype.sayage = function () {
    console.log(this.age);
}
var instance1 = new Sub("xyc", 23);
var instance2 = new Sub("lxy", 23);
instance1.color.push("2"); // ["red", "blue", "green", "2"]
instance2.color.push("3")// ["red", "blue", "green", "3"]
// console.log(instance1);
// console.log(instance2);
// console.log(Sub);
// instance1.sayage()
// instance1.sayname()
{
    const arr = [{ a: 1, b: 'g', c: false, d: "355" },
    { a: 2, b: 's', c: true, d: "854" },
    { a: 3, b: 'g', c: false, d: "685" },
    { a: 4, b: 'e', c: false, d: "158" },
    { a: 5, b: 'g', c: true, d: "444" },]
    const res = arr.findIndex((item) => {
        item.a === 5
    }
    )
    // console.log(res);
}
//浅拷贝 深拷贝
{
    const obj = {
        name: 'yms',
        obj: {
            name: 'json'
        }
    }
    const newObj = Object.assign({}, obj)
    obj.name = 'jwd'
    // console.log(newObj);
    // console.log(obj.obj == newObj.obj);
    //Object.assign  slice 和 concat  Array.from 扩展运算符 都是浅拷贝
}
//手写深拷贝 对对象内部进行深拷贝，支持 Array、Date、RegExp、DOM
function deepClone(params) {
    //如果不是对象则退出(停止递归)
    if (typeof params !== 'object') return params
    //深拷贝初始值:对象/数组
    let newObj = params instanceof Array ? [] : {}
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

                } else if ((typeof params[i] === 'object') && params[i].nodeType === 1) {

                    // 判断 DOM 元素节点

                    let domEle = document.getElementsByTagName(params[i].nodeName)[0];

                    newObj[i] = domEle.cloneNode(true);

                } else {

                    // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝

                    newObj[i] = (typeof params[i] === 'object') ? deepClone(params[i]) : params[i];

                }
            }

        }
    }
    return newObj
}
const date = new Date();

// console.log(obj);

//手写发布订阅
{
    class EventEmit {
        constructor() {
            this.event = {
            }
        }
        on(type, callback) {
            if (!this.event[type]) {
                this.event[type] = [callback]
            } else {
                this.event[type].push(callback)
            }
        }
        emit(type, ...params) {
            if (this.event[type]) {
                this.event[type].forEach(cb => {
                    cb(...params)
                });
            } else {
                return
            }
        }
        off(type, callback) {
            if (this.event[type]) {
                this.event[type] = this.event[type].filter(item => item !== callback)
            } else {
                return
            }
        }
        once(type, callback) {
            let fn = () => {
                callback();
                this.off(type, fn)
            }
            this.on(type, fn)
        }
    }
    const ev = new EventEmit(arguments);
    const fun1 = (str) => {
        console.log(str);
    }
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
        if (typeof params !== 'object') return params
        let newObj = Array.isArray(params) ? [] : {}
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                const element = params[key];
                if (element instanceof Date) {
                    newObj[key] = new Date(element.getTime())
                }
                if (element instanceof RegExp) {
                    newObj[key] = new RegExp(element)
                }
                if (typeof element === 'object' && element.nodeType == 1) {
                    // 判断 DOM 元素节点

                    let domEle = document.getElementsByTagName(element.nodeName)[0];

                    newObj[key] = domEle.cloneNode(true);
                } else {
                    newObj[key] = (typeof element === 'object') ? deepClone(element) : element
                }
            }
        }
        return newObj
    }


    //    console.log( deepClone(obj));
    let obj = { name: 'test', age: 18, arr: [1, 2, 3] }
    // console.log(deepClone(obj));

}
//防抖
{
    const debounce = (fn, time) => {
        let timer = null
        return function () {
            clearTimeout(timer)
            setTimeout(() => {
                fn.call(this)
            }, time);
        }
    }
}
//节流
{
    const throttle = (fn, time) => {
        let flat = true
        if (!flat) return
        return function () {
            let flat = false
            setTimeout(() => {
                fn(this)
                flat = true
            }, time);
        }
    }
}
//数组扁平 函数递归
{
    const arr = [1, [2, [3, [4, 5]]], 6];
    let res = []
    function fn(arr) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (Array.isArray(element)) {
                fn(element)
            } else {
                res.push(element)
            }

        }
    }
    // fn(arr)
    // console.log(res);
}
//数组扁平 reduce
{
    const arr = [1, [2, [3, [4, 5]]], 6];

    const flatten = arr => {
        return arr.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
        }, [])
    }
    // const res = flatten(arr) 
    // console.log(res);
}
//数组扁平 正则
{
    const arr = [1, [2, [3, [4, 5]]], 6];
    let res = JSON.parse('[' + JSON.stringify(arr).replace(/\[|]/g, '') + ']')
    // console.log(res);
}
//数组扁平 栈 利用 ... 拿出非数组项
{
    const arr = [1, [2, [3, [4, 5]]], 6];
    function Stack(arr) {
        let stack = arr
        let res = []
        while (stack.length !== 0) {
            let item = stack.shift()
            if (!Array.isArray(item)) {
                res.push(item)
            } else {
                stack.unshift(...item)
            }
        }
        return res
    }
    // console.log(Stack(arr)); 
}
//数组去重 for + splice
{
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
    function unique(arr) {
        let len = arr.length
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (arr[i] === arr[j]) {
                    arr.splice(j, 1)
                    len--
                    j--
                }

            }

        }
        return arr
    }
    // console.log(unique(arr));
}
//数组去重 filter + indexOf
{
    const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
    function unique(arr) {
        return arr.filter((item, index) => {
            return arr.indexOf(item) === index
        })
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
        return a * b * c
    }
    curry(multiFn)
}
//实现new
{
    function _new(fn, ...args) {
        if (typeof fn !== 'function') {
            return
        }
        let obj = Object.create(fn.prototype)
        let res = fn.apply(obj, args)
        return typeof res === 'object' && res !== null || typeof res === 'function' ? res : obj
    }
}
//寄生组合式继承
{
    function inheritPrototype(Sup, Sub) {
        const obj = Object.create(Sup.prototype)
        obj.constrctor = Sub
        Sub.prototype = obj
    }
    function Sup(name, age) {
        this.color = ['red', 'green', 'blue']
        this.name = name
        this.age = age
    }
    Sup.prototype.sayname = function () {
        console.log(this.name);
    }
    function Sub(age, name) {
        Sup.apply(this, [age, name])
    }
    inheritPrototype(Sup, Sub)
    // const name = new Sup('yms',18);
    // console.log(name.age);
    // name.sayname()
}
// instanceof
{
    function _instanceof(obj, fn) {
        if (typeof obj !== 'object' || obj === null) {
            return false
        }
        let proto = Object.getPrototypeOf(obj)
        while (true) {
            if (proto === null) {
                return false
            }
            if (proto === fn.prototype) {
                return true
            }
            proto = Object.getPrototypeOf(proto)
        }

    }
    let obj = {

    }
    // console.log(_instanceof(obj,Object)); 
    // console.log(obj.__proto__.prototype);
}
//获取URL参数
{
    const url = 'https://baidu.com/abc?token=123&task=undefined'
    function getParams(url) {
        const res = {}
        if (url.includes('?')) {
            const str = url.split('?')[1]
            const arr = str.split('&')
            arr.forEach(element => {
                const key = element.split('=')[0]
                const value = element.split('=')[1]
                res[key] = decodeURIComponent(value)
                //decodeURIComponent解码
            });
            return res
        } else {
            return res
        }
    }
    //    console.log(getParams(url)); 
}
//发布订阅
{
    class EventEmit {
        constructor() {
            this.cache = {}
        }
        on(name, fn) {
            if (this.cache[name]) {
                this.cache[name].push(fn)
            } else {
                this.cache[name] = [fn]
            }
        }
        off(name, fn) {
            if (this.cache[name]) {
                this.cache[name] = this.cache[name].filter(item => item !== fn)
            }
        }
        emit(name, ...args) {
            if (this.cache[name]) {
                //创建副本，如果回调函数内继续注册相同事件，会造成死循环
                const tasks = this.cache[name].splice()
                for (const cb of tasks) {
                    cb(...args)
                }
            } else {
                return
            }

        }
        once(name, fn) {
            let fn1 = () => {
                fn()
                this.off(name, fn)
            }
            this.on(name, fn1)
        }
    }
}
//正则匹配号码
{
    let str = '010-12345678'
    let reg = /^\{3}-(\d{8}|10010|110)$/g
    // console.log(reg.test(str)); 
}
//正则匹配邮箱
{
    let reg = /^([\w\-\.])+\@([\w\-\.])+\.[A-Za-z]{2,4}$/
    let str = 'ifat3@42du.online'
    // console.log(reg.test(str)); 
}
{
    class EventEmit {
        constrctor() {
            this.cache = []
        }
        on(name, fn) {

        }
        emit(name, ...args) {
            if (this.cache[name]) {
                let tasks = this.cache[name].splice()
                for (const task of tasks) {
                    task(...args)
                }
            }
        }
        off(name, fn) {
            if (this.cache[name]) {
                this.cache[name] = this.cache[name].filter(item => {
                    return item !== fn
                })
            }
        }
        once(name, fn) {
            function fn1(params) {
                if (this.cache[name]) {
                    fn()
                    this.off(name, fn)
                }
            }
            this.on(name, fn1)

        }
    }
}
//观察者模式
{
    class Notifier {
        constructor() {
            this.observerList = []
        }
        add(obj) {
            this.observerList.push(obj)
        }
        remove(obj) {
            this.observerList = this.observerList.filter(o => o !== obj)
        }
        notify() {
            this.observerList.forEach((obj) => {
                obj.update()
            })
        }
    }
    class Observer {
        constructor(name) {
            this.name = name
        }
        update() {
            console.log('收到通知了');
        }
    }
    let notifier = new Notifier()
    let oberver1 = new Observer('张三')
    // notifier.add(oberver1)
    // notifier.remove(oberver1)
    // notifier.notify()
}
//es6继承
{
    class Parent {
        constructor(value) {
            this.val = value
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
        if (typeof target !== 'object') { return target }
        //处理数组属性
        let cloneTarteg = Array.isArray(target) ? [] : {}
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneTarteg)

        for (const key in target) {
            if (Object.hasOwnProperty.call(target, key)) {
                if (target[key] instanceof Date) {
                    cloneTarteg[key] = new Date(target[key].getTime())
                }else if(target[key] instanceof RegExp){
                    cloneTarteg[key] = new RegExp(target[key])
                }else{
                    // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝
                    cloneTarteg[key] = (typeof target[key] === 'object') ? DeepClone(target[key],map) : target[key];
                }

            }
        }
        return cloneTarteg

    }
    const target = {
        field1: 1,
        field2: /\d/,
        field3: 'ConardLi',
        field4: {
            child: 'child',
            child2: {
                child2: 'child2'
            }
        },
        field5: [1, 2, 3]
    };
    target.target = target
    // console.log(DeepClone(target));
}
//发布订阅
{
    class EventEmit {
        constructor(){
            this.cache = {
            }
        }
        emit(name,...args){
            if (this.cache[name]) {
                const tasks = this.cache[name].slice()
                for (const cb of tasks) {
                    cb(...args)
                }
            }
        }
        on(name,fn){
            if (this.cache[name]) {
                this.cache[name].push(fn)
            }else {
                this.cache[name] = [fn]
            }
        }
        off(name,fn){
            if (this.cache[name]) {
                this.cache[name] = this.cache[name].filter((item)=>{
                    return item!==fn
                })
            }else {
                return 
            }
        }
        once(name,fn){
            let fn1 = function(){
                fn()
                this.off(name,fn1)
            }
            this.on(name,fn1)
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
        constructor(){
            this.watcherlist = []
        }
        add(watcher){
            this.watcherlist.push(watcher)
        }
        move(watcher){
            this.watcherlist = this.watcherlist.filter((w)=>w!==watcher)
        }
        notify(){
            this.watcherlist.forEach((w)=>{
                w.update()
            })
        }
    }
    class watche {
        constructor(name){
            this.name = name
        }
        update(){
            console.log('收到通知了');
        }
    }
    const a = new watche('yms');
    const n = new Notify();
    // n.add(a)
    // n.notify()
}
//手写深拷贝
{
   
    function deepClone(target,map = new Map()) {
        if (typeof target !== 'object')  return target
        const cloneTarteg = Array.isArray(target) ? [] : {}
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target,cloneTarteg)

        for (const key in target) {
            if (Object.hasOwnProperty.call(target, key)) {
                const element = target[key];
                if (element instanceof Date) {
                    cloneTarteg[key] = new Date(element.getTime())
                }
                else if (element instanceof RegExp) {
                    cloneTarteg[key] = new RegExp(element)
                }else {
                    cloneTarteg[key] = (typeof element === 'object') ? DeepClone(element,map) : element;
                }

            }
        }
        return cloneTarteg
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





