let str = 'c'
// console.log(str.charCodeAt());
function parseStr(params) {

}
//获取字母ascll码

//修改几次后 不包含两个连续相同的数字字符
//例如，对于字符串”111222333”。她可以进行3次格故将其变为”121212313”
{
    let str = '111115222'
    let count = 0
    function test(str) {
        for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i - 1] && str[i] === str[i + 1]) {
                i++
                count++
            } else if (str[i] === str[i - 1]) {
                count++
            }

        }
        return count

    }
    // console.log(test(str));
    test(str)
    // console.log(str.__proto__[Symbol.iterator]);

}
 //小美是一位天文爱好者，她收集了接下来一段时问中所有会划过她所在的观测地上空的流星信息。n个流星在地所在观测地上空的出现时刻和消失时刻。对于一个流星，若其的出现时刻为s，消失时刻对t，那么小关在时间段[s,t]都能够观测到它。对于一个时刻，观测地上空出现的流星数量越多越好。小关希望能够选择一个最佳的时处进行观测，观测到最多流星，现在小关想知道，在这个最佳时刻，她最多能观测别多少个流星以及一共有多少个最佳时刻可供她选择
{
   
    let n = 3
    let str1 = '215'
    let str2 = '637'
    
    function test(str1,str2) {
        const res = new Map();
        let arr1 = str1.split("");
        let arr2 = str2.split("")
        for (let i = 0; i < arr1.length; i++) {
            const start1 = arr1[i];
            const end1 = arr2[i];
            for (let j = i+1; j < arr1.length; j++) {
                let start2 = arr1[j];
                let end2 = arr2[j];
                if ((start2>=start1 && start2<=end1)) {
                    for (let k = start2; k <= end1; k++) {
                        if (res.has(k)) {
                            res[k] = res[k] + 1
                        }else {
                            res.set(k,2)
                        }
                        
                    }
                }else if((end2<=end1 && end2>=start1)){
                    for (let k = start1; k <= end2; k++) {
                        if (res.has(k)) {
                            res[k] = res[k] + 1
                        }else {
                            res.set(k,2)
                        }
                        
                    }
                }
                
            }
        }
        let a =  res.values()
        // let max = Math.max(a)
        // let count = 0
        // for (let i = 0; i < a.length; i++) {
        //     const element = a[i];
        //     if (element === max) {
        //         count++
        //     }
        // }
        console.log(a);
    }
    // test(str1,str2)
}
//数组相邻的两个元素之差的绝对值不超过1称为稳定。如[2,3,2,2,1]是稳定的，而[1,3,2]则是不稳定的。求出一个数组的最长的“稳定的”连续了数组的长度?
{
    let arr =  [1,1,3,1,1,3,2,3,2,1,2,3,2]
    function isStable(a,b) {
        if (Math.abs(a-b)<=1) {
            return true
        }else{
            return false
        }
    }
    function test(arr) {
        let max = 1
        let count = 1
        for (let i = 0; i < arr.length; i++) {
            if (isStable(arr[i],arr[i+1])) {
                count++
                if (max<count) {
                    max = count
                }
            }else {
                count = 1
            }
            
        }
        return max
    }
    // console.log(test(arr));
}
 //长度为n的字符，每次选择一个区间，将第i个字母到第r个字母各重复一次，插入到该字母的后面。如，对字符”abcd”，选区间[2,3]，变成”abbccd",进行q次操作结束后，最终的字符串?
{
   
    function test(n,q,str,...arr) {
         str = str.split('')
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let a = element[0]-1
            let b = element[1]-1
           for (let j = a; j <= b; j++) {
            str.splice(j,0,str[j])
            j++
            b++
           }
        }
        return str
    }
    // console.log(test(6,2,'abcdef',[2,4],[3,6])); 
    // abbccddef
}