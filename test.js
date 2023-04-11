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
