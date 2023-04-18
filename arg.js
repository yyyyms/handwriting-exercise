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

    function test(str1, str2) {
        const res = new Map();
        let arr1 = str1.split("");
        let arr2 = str2.split("")
        for (let i = 0; i < arr1.length; i++) {
            const start1 = arr1[i];
            const end1 = arr2[i];
            for (let j = i + 1; j < arr1.length; j++) {
                let start2 = arr1[j];
                let end2 = arr2[j];
                if ((start2 >= start1 && start2 <= end1)) {
                    for (let k = start2; k <= end1; k++) {
                        if (res.has(k)) {
                            res[k] = res[k] + 1
                        } else {
                            res.set(k, 2)
                        }

                    }
                } else if ((end2 <= end1 && end2 >= start1)) {
                    for (let k = start1; k <= end2; k++) {
                        if (res.has(k)) {
                            res[k] = res[k] + 1
                        } else {
                            res.set(k, 2)
                        }

                    }
                }

            }
        }
        let a = res.values()
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
    let arr = [1, 1, 3, 1, 1, 3, 2, 3, 2, 1, 2, 3, 2]
    function isStable(a, b) {
        if (Math.abs(a - b) <= 1) {
            return true
        } else {
            return false
        }
    }
    function test(arr) {
        let max = 1
        let count = 1
        for (let i = 0; i < arr.length; i++) {
            if (isStable(arr[i], arr[i + 1])) {
                count++
                if (max < count) {
                    max = count
                }
            } else {
                count = 1
            }

        }
        return max
    }
    // console.log(test(arr));
}
//长度为n的字符，每次选择一个区间，将第i个字母到第r个字母各重复一次，插入到该字母的后面。如，对字符”abcd”，选区间[2,3]，变成”abbccd",进行q次操作结束后，最终的字符串?
{

    function test(n, q, str, ...arr) {
        str = str.split('')
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let a = element[0] - 1
            let b = element[1] - 1
            for (let j = a; j <= b; j++) {
                str.splice(j, 0, str[j])
                j++
                b++
            }
        }
        return str
    }
    // console.log(test(6,2,'abcdef',[2,4],[3,6])); 
    // abbccddef
}
//版本号排序 [“1.45.0”, “1.5”, “6”, “2.3.4.5”]，将其排序后得到：[ ‘1.5’, ‘1.45.0’, ‘2.3.4.5’, ‘6’ ]
{
    function mysort(arr) {
        return arr.sort((a, b) => {
            let list1 = a.split('.')
            let list2 = b.split('.')
            let i = 0
            while (true) {
                let s1 = list1[i]
                let s2 = list2[i]
                i++
                if (s1 === s2) {
                    continue
                }
                if (s1 == undefined || s2 == undefined) {
                    return list1.length - list2.length
                }
                return s1 - s2
            }
        })
    }
    let arr = ['1.45.0', '1.45']
    // console.log(mysort(arr));
}

//*** 贪心相关 */

//简单 找零问题
{
    const allMoney = [100, 50, 20, 5, 1]; //表示手上有的面值
    function changeMoney(n, allMoney) {
        let l = allMoney.length
        let res = []
        let rest = n
        for (let i = 0; i < l; i++) {
            if (rest >= allMoney[i]) {
                res[i] = parseInt(rest / allMoney[i])
                rest = rest - res[i] * allMoney[i]
            } else {
                res[i] = 0
            }

        }
        return res
    }

    // console.log(changeMoney(126,allMoney));
}
{
    //parseInt向下取整
    // let a = 3.5
    // let b = 2
    // let res = a/b
    // console.log(parseInt(res));
}
// sort的高阶用法
{
    var items = [
        { name: 'Edward', value: 21 },
        { name: 'Sharpe', value: 37 },
        { name: 'And', value: 45 },
        { name: 'The', value: -12 },
        { name: 'Magnetic' },
        { name: 'Zeros', value: 37 }
    ];
    // console.log(items[0].name.toUpperCase());

    let res = items.sort((a, b) => {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()
        if (nameA < nameB) {
            return 1
        }
        if (nameA > nameB) {
            return -1
        }
        return 0
    })
    //   console.log(res);
}
//调整数组顺序使奇数位于偶数前面
{
    let nums = [1, 2, 3, 4]
    function exchange(nums) {
        let res = nums.sort((a, b) => {
            return b % 2 - a % 2
        })
        return res
    }
    //    console.log(exchange(nums)); 
}
//调整数组中数的位置 使拼接成的数字最小
{
    let arr = [3, 30, 34, 5, 9]
    let minNumber = function (nums) {
        return nums.sort((a, b) => {
            return ((a + '') + (b + '') - 0) - ((b + '') + (a + '') - 0)
        }).join('')
    };
    //    console.log(minNumber(arr)); 
}
//分糖果
{
    //相邻两个孩子 得分高的糖果要比低的多
    let arr = [5, 2, 4, 6, 3, 4, 1]
    // [1, 1, 2, 3, 1, 2, 1]

    function candy(arr) {
        const len = arr.length
        if (len <= 1) return len
        let nums = new Array(len)
        nums = nums.fill(1)
        //正序保证相邻符合规则
        for (let i = 1; i < len; i++) {
            if (arr[i] > arr[i - 1]) {
                nums[i] = nums[i - 1] + 1
            }
        }
        //倒序保证相邻符合规则
        let res = nums[len - 1]
        for (let i = len - 2; i >= 0; i--) {
            if (arr[i] > arr[i + 1] && nums[i] <= nums[i + 1]) {
                nums[i] = nums[i + 1] + 1
            }
            res += nums[i]
        }
        return res
    }
    // console.log(candy(arr)); 
}
//分发饼干
{
    let g = [1,2,3], s = [1,1]
    function findContentChildren(g,s) {
       g = g.sort((a,b)=>a-b)
       s = s.sort((a,b)=>a-b)
       let [num,i,j ] = [0,0,0]
       while (i<g.length && j<s.length) {
        console.log(11111);
        if (s[j]>=g[i]) {
            num++
            j++
            i++
        }else if(s[j]<g[i]){

            j++
        }
       }
       return num
    }
    // console.log(findContentChildren(g,s)); 
}
//购买股票的时机 (不含手续费)
{
    let prices = [7,1,3,5,6,7,9]
    function maxProfit (prices) {
        let sum = 0
        for (let i = 1; i < prices.length; i++) {
          sum += Math.max(0,prices[i] - prices[i-1])
        }
        return sum
    }
    // console.log(maxProfit(prices));
}
// 购买股票的时机 含手续费
{
    //核心贪心思想:当我们卖出一支股票时，我们就立即获得了以相同价格并且免除手续费买入一支股票的权利
    let prices = [1,3,7,5,10,3]
    let fee = 3
    function maxProfit(prices,fee) {
        let buy = prices[0] + fee
        let profit = 0
        for (let i = 1; i < prices.length; i++) {
            if (prices[i]+fee<buy) {
                buy = prices[i]+fee
            }else if(prices[i] > buy){
                profit+=prices[i]-buy
                buy = prices[i]
            }
            
        }
        return profit
    }
    // console.log(maxProfit(prices,fee)); 
}
//最多删除一个字符得到回文
{
    function validPalindrome(str) {
        let len = str.length
        let l = 0
        let r = len-1
        let flat = true
        while (l<=r) {
            if (str[l]==str[r]) {
                l++
                r--
            }else {
                if (flat === true) {
                    flat = false
                    return Palindrome(str,l+1,r) || Palindrome(str,l,r-1)
                }else {
                    return false
                }
            }
        }
        return true
        function Palindrome(s,l,r) {
            // console.log('进来');
            while(l<=r) {
                // console.log(s[l],s[r]);
                if (s[l] === s[r]) {
                    l++
                    r--
                }else {
                    return false
                }
            }
            return true
        }


    } 
    // console.log(validPalindrome("atbbga")); 
}
//跳跃游戏II
//贪的是找到能跳到的范围内中的最大步子
{
    let arr = [2,1,4,5,5,4,3,2]
    function jump(arr) {
        let end = 0
        let maxposition = 0
        let steps = 0
        let len = arr.length
        for (let i = 0; i < len-1; i++) {
            maxposition = Math.max(maxposition,i+arr[i])
            if (i == end) {
                end = maxposition
                steps++
                if (maxposition>=len-1) {
                    break
                }
            }
        }
        return steps
    }
}
//跳跃游戏 能否跳出去
//只关心此位置能不能跳到 然后范围内能不能跳出去 否则前移
{
   let nums = [2,3,1,5,0,1]
   function canJump(nums) {
    let maxposition = 0
    for (let i = 0; i < nums.length; i++) {
        if (i <= maxposition) {
            maxposition = Math.max(maxposition , i + nums[i]) 
            let jump = i + nums[i]
            if (jump>=nums.length-1) {
                return true
            }
        }
       
        
    }
    return false
   }
}


//动态规划
//爬楼梯 递归
{
    function cStaris(n) {
        if (n === 1 || n === 2) {
            return 1
        } else {
            return cStaris(n - 1) + cStaris(n - 2)
        }
    }
}
//打家劫舍
//当前位置n可盗窃的最大值 dp[i] = max(dp[i-1],dp[i-2]+nums[i])
{
    let arr = [1,2,3,1]
    function rob(nums) {
       let len = nums.length
        if(len == 0)return 0
        if(len == 1)return nums[0]
        let dp = new Array(len+1)
        dp[0] = 0
        dp[1] = nums[0]
        for (let i = 2; i <= len; i++) {
            dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i-1]) 
        }
      return dp[len]
    }
    // console.log(rob(arr));
}
//使用最小花费爬楼梯
{
    // dp[i] 是爬上当前的最小花费
    // dp[i] = Math.min(dp[i-1]+ cost[i-1] , dp[i-2]+ cost[i-2])
    let cost = [10,15,10]
    function minCostClimbingStairs(cost) {
        let len = cost.length
        const dp = new Array(len+1)
        dp[0] = 0
        dp[1] = 0
        for (let i = 2; i <= len; i++) {
            dp[i] = Math.min(dp[i-1]+ cost[i-1] , dp[i-2]+ cost[i-2])

        }
        return dp[len]
    }
    // console.log(minCostClimbingStairs(cost));
}
//机器人 不同路径
{
    let m = 3, n = 7
    // dp[i][j] = dp[i-1][j] + dp[i][j-1]
function uniquePaths(m,n) {
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0)); //初始dp数组
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (j===0 && i===0 || j===0 && i!==0 || j!==0 && i===0) {
                dp[i][j] = 1
            }else if (j!==0&&i!==0) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]   
            }
        }
    }
    // for (let i = 0; i < m; i++) {
    //     for (let j = 0; j < n; j++) {
    //       if (i === 0 && j === 0 || i === 0 && j !== 0 || i !== 0 && j === 0) {
    //         dp[i][j] = 1
    //       } else if (i !== 0 && j !== 0) {
    //         dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    //       }
    //     }
    //   }

    return dp[m-1][n-1]
}
    // console.log(uniquePaths(m,n));
}
//小孩上楼梯 1阶 2阶 或者3阶
{
    let n = 4
    function waysToStep(n) {
        const dp = []
        dp[0] = 0
        dp[1] = 1
        dp[2] = 2
        dp[3] = 4
        for (let i = 4; i <= n; i++) {
            dp[i] = dp[i-3] + dp[i-2] + dp[i-1]
        }
        return dp[n]%1000000007
    }
    // console.log(waysToStep(n));
}
//连续数列
{
    //只关心到某个结尾下标时 最大的数列是多少
    function maxSubArray(nums) {
        let len = nums.length
        let dp = []
        dp[0] = nums[0]
        for (let i = 1; i < len; i++) {
            dp[i] = Math.max((dp[i-1]+nums[i]),nums[i])
        }
        return Math.max(...dp) 
    }
    let arr = [-2,1,-3,4,-1,2,1,-5,4]
    // console.log(maxSubArray(arr));
}
//机器人最短路径
{
    let grid = [[1,3,1],[1,5,1],[4,2,1]]
    function minPathSum(grid) {
        let m = grid.length
        let n = grid[0].length
        let dp = new Array(m).fill(0).map(()=>new Array(n).fill(0))
        dp[0][0] = grid[0][0]

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (i==0&&j>0) {
                    dp[0][j] = dp[0][j-1] + grid[0][j]
                }else if(j==0&&i>0){
                    dp[i][0] = dp[i-1][0] + grid[i][0]
                }else if (i>0&&j>0) {
                    dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1]) + grid[i][j]
                }
                console.log(dp[i][j],i,j);
            }
        }
        return dp[m-1][n-1]
    }
    // console.log(minPathSum(grid));
}
//遍历拿到节点的name
{
    const tree = {
        name: 'root',
        children: [
            {
                name: 'c1',
                children: [
                    {
                            name: 'c11',
                        children: []		
                        },
                        {
                            name: 'c12',
                        children: []		
                    }
                ]
            },
            {
                name: 'c2',
                children: [
                    {
                            name: 'c21',
                        children: []		
                        },
                        {
                            name: 'c22',
                        children: []		
                    }
                ]
            }
        ]
    }
    
}
{
    
}

