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
        on(type,callback) {
            if (!this.event[type]) {
                this.event[type] = [callback]
            }else {
                this.event[type].push(callback)
            }
        }
        emit(type,...params) {
            if (this.event[type]) {
                this.event[type].forEach(cb => {
                    cb(...params)
                });
            }else {
                return 
            }
        }
        off(type,callback) {
            if (this.event[type]) {
                this.event[type] = this.event[type].filter(item => item!==callback)
            }else {
                return 
            }
        }
        once(type,callback) {
            let fn = ()=>{
                callback();
                this.off(type,fn)
            }
            this.on(type,fn)
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
{
    function deepClone(params) {
        if(typeof params !== 'object') return params
        let newObj = Array.isArray(params) ? [] : {}
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                const element = params[key];
                if(element instanceof Date){
                    newObj[key] = new Date( element.getTime() )
                }
                if(element instanceof RegExp){
                    newObj[key] = new RegExp(element)
                }
                if(typeof element === 'object'&& element.nodeType==1){
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
   const debounce = (fn,time)=>{
    let timer = null
    return function(){
        clearTimeout(timer)
        setTimeout(() => {
            fn.call(this)
        }, time);
    }
   }
}
//节流
{
   const throttle = (fn,time)=>{
    let flat = true
    if(!flat) return 
    return function(){
        let flat = false
        setTimeout(() => {
            fn(this)
            flat = true
        }, time);
    }
   }
}





