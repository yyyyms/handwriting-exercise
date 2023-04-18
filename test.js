let arr = [1, 2, 5, 6, 6]
let res = arr[arr.length - 1]
// console.log(res);

// console.log( new Date() instanceof Object );
// console.log( typeof new Array());
// console.log( typeof new Function() );
let str = 'yms'
// console.log(str.toString());
{
    let str = 'n_i ha+ohh-h'
    let res = str.split(/[_+-]|\s/)
    // console.log(res);
}
{
    let obj = {
        a: [1,2,3]
    }
    let obj1 = {
        a:[1,2,3]
    }
    let a = [1,2,3]
    Object.defineProperty(a,'a',{
        // value:[1,2,4],
        set(){
            console.log('obj发生变化');
        },
        get(){
            console.log('obj被获取');
        },
    })
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
    function Debounce(timeout,fn) {
        let timer = null
        return function (params) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn()
            }, timeout);
        }
    }
}
{
    let str = '5'
    let res =  str.split('.')
    // console.log(res);
}
{
    let arr = [1,2,3]
    let test = []
    for (let i = 0; i < arr.length; i++) {
        Object.defineProperty(test,i,{
            value:arr[i]
            // get(){
            //     return arr[i];
            // }
        })
    }


    arr[0] = 0
    // console.log(test);
}
{
    function f1(params) {
        let a = 1
        function f2(params) {
            console.log(a);
        }
        return f2
    }

    const fn =  f1()

    function test(fn) {
        let a = 2
        fn()
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
        a : 1,
        b : {
            c : 1 
        }
    }
    
    const newobj =  Object.assign(obj)
    newobj.b.c = 2
    // console.log(obj);
}
{
    const obj = {
        value:10,
        test:1
    }
    // console.log({...obj});
    const arr = [1,2,3,0]
    let foo = {...arr}
    // console.log(foo);
    let res = arr.sort((a,b)=>a-b)
    // console.log(arr === res);
}
{
    const arr = new Array(5);
    arr.map((item)=>{
        return item+1
    })
    console.log(arr[0]);
}
