// （1）function 关键字和函数之间有一个星号(*),且内部使用yield表达式，定义不同的内部状态。
// （2）调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。


function* fn(params) {
    yield 'hello'
     yield 'world'
    return 'end'

}
// yield表达式是暂停执行的标记，而next方法可以恢复执行。
// let f1 = fn()
// console.log(f1);
// console.log(f1.next());
// console.log(f1.next(1));
// console.log(f1.next());
// console.log(f1.next());

function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var b = foo(5)
console.log(b.next());
console.log(b.next(12));
console.log(b.next(13));



