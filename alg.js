let str = "c";
// console.log(str.charCodeAt());
function parseStr(params) {}
//获取字母ascll码

//修改几次后 不包含两个连续相同的数字字符
//例如，对于字符串”111222333”。她可以进行3次格故将其变为”121212313”
{
  let str = "111115222";
  let count = 0;
  function test(str) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === str[i - 1] && str[i] === str[i + 1]) {
        i++;
        count++;
      } else if (str[i] === str[i - 1]) {
        count++;
      }
    }
    return count;
  }
  // console.log(test(str));
  test(str);
  // console.log(str.__proto__[Symbol.iterator]);
}
//小美是一位天文爱好者，她收集了接下来一段时问中所有会划过她所在的观测地上空的流星信息。n个流星在地所在观测地上空的出现时刻和消失时刻。对于一个流星，若其的出现时刻为s，消失时刻对t，那么小关在时间段[s,t]都能够观测到它。对于一个时刻，观测地上空出现的流星数量越多越好。小关希望能够选择一个最佳的时处进行观测，观测到最多流星，现在小关想知道，在这个最佳时刻，她最多能观测别多少个流星以及一共有多少个最佳时刻可供她选择
{
  let n = 3;
  let str1 = "215";
  let str2 = "637";

  function test(str1, str2) {
    const res = new Map();
    let arr1 = str1.split("");
    let arr2 = str2.split("");
    for (let i = 0; i < arr1.length; i++) {
      const start1 = arr1[i];
      const end1 = arr2[i];
      for (let j = i + 1; j < arr1.length; j++) {
        let start2 = arr1[j];
        let end2 = arr2[j];
        if (start2 >= start1 && start2 <= end1) {
          for (let k = start2; k <= end1; k++) {
            if (res.has(k)) {
              res[k] = res[k] + 1;
            } else {
              res.set(k, 2);
            }
          }
        } else if (end2 <= end1 && end2 >= start1) {
          for (let k = start1; k <= end2; k++) {
            if (res.has(k)) {
              res[k] = res[k] + 1;
            } else {
              res.set(k, 2);
            }
          }
        }
      }
    }
    let a = res.values();
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
  let arr = [1, 1, 3, 1, 1, 3, 2, 3, 2, 1, 2, 3, 2];
  function isStable(a, b) {
    if (Math.abs(a - b) <= 1) {
      return true;
    } else {
      return false;
    }
  }
  function test(arr) {
    let max = 1;
    let count = 1;
    for (let i = 0; i < arr.length; i++) {
      if (isStable(arr[i], arr[i + 1])) {
        count++;
        if (max < count) {
          max = count;
        }
      } else {
        count = 1;
      }
    }
    return max;
  }
  // console.log(test(arr));
}
//长度为n的字符，每次选择一个区间，将第i个字母到第r个字母各重复一次，插入到该字母的后面。如，对字符”abcd”，选区间[2,3]，变成”abbccd",进行q次操作结束后，最终的字符串?
{
  function test(n, q, str, ...arr) {
    str = str.split("");
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      let a = element[0] - 1;
      let b = element[1] - 1;
      for (let j = a; j <= b; j++) {
        str.splice(j, 0, str[j]);
        j++;
        b++;
      }
    }
    return str;
  }
  // console.log(test(6,2,'abcdef',[2,4],[3,6]));
  // abbccddef
}
//版本号排序 [“1.45.0”, “1.5”, “6”, “2.3.4.5”]，将其排序后得到：[ ‘1.5’, ‘1.45.0’, ‘2.3.4.5’, ‘6’ ]
{
  function mysort(arr) {
    return arr.sort((a, b) => {
      let list1 = a.split(".");
      let list2 = b.split(".");
      let i = 0;
      while (true) {
        let s1 = list1[i];
        let s2 = list2[i];
        i++;
        if (s1 === s2) {
          continue;
        }
        if (s1 == undefined || s2 == undefined) {
          return list1.length - list2.length;
        }
        return s1 - s2;
      }
    });
  }
  let arr = ["1.45.0", "1.45"];
  // console.log(mysort(arr));
}

//*** 贪心相关 */

//简单 找零问题
{
  const allMoney = [100, 50, 20, 5, 1]; //表示手上有的面值
  function changeMoney(n, allMoney) {
    let l = allMoney.length;
    let res = [];
    let rest = n;
    for (let i = 0; i < l; i++) {
      if (rest >= allMoney[i]) {
        res[i] = parseInt(rest / allMoney[i]);
        rest = rest - res[i] * allMoney[i];
      } else {
        res[i] = 0;
      }
    }
    return res;
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
    { name: "Edward", value: 21 },
    { name: "Sharpe", value: 37 },
    { name: "And", value: 45 },
    { name: "The", value: -12 },
    { name: "Magnetic" },
    { name: "Zeros", value: 37 },
  ];
  // console.log(items[0].name.toUpperCase());

  let res = items.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });
  //   console.log(res);
}
//调整数组顺序使奇数位于偶数前面
{
  let nums = [1, 2, 3, 4];
  function exchange(nums) {
    let res = nums.sort((a, b) => {
      return (b % 2) - (a % 2);
    });
    return res;
  }
  //    console.log(exchange(nums));
}
//调整数组中数的位置 使拼接成的数字最小
{
  let arr = [3, 30, 34, 5, 9];
  let minNumber = function (nums) {
    return nums
      .sort((a, b) => {
        return a + "" + (b + "") - 0 - (b + "" + (a + "") - 0);
      })
      .join("");
  };
  //    console.log(minNumber(arr));
}
//分糖果
{
  //相邻两个孩子 得分高的糖果要比低的多
  let arr = [5, 2, 4, 6, 3, 4, 1];
  // [1, 1, 2, 3, 1, 2, 1]

  function candy(arr) {
    const len = arr.length;
    if (len <= 1) return len;
    let nums = new Array(len);
    nums = nums.fill(1);
    //正序保证相邻符合规则
    for (let i = 1; i < len; i++) {
      if (arr[i] > arr[i - 1]) {
        nums[i] = nums[i - 1] + 1;
      }
    }
    //倒序保证相邻符合规则
    let res = nums[len - 1];
    for (let i = len - 2; i >= 0; i--) {
      if (arr[i] > arr[i + 1] && nums[i] <= nums[i + 1]) {
        nums[i] = nums[i + 1] + 1;
      }
      res += nums[i];
    }
    return res;
  }
  // console.log(candy(arr));
}
//分发饼干
{
  let g = [1, 2, 3],
    s = [1, 1];
  function findContentChildren(g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let [num, i, j] = [0, 0, 0];
    while (i < g.length && j < s.length) {
      console.log(11111);
      if (s[j] >= g[i]) {
        num++;
        j++;
        i++;
      } else if (s[j] < g[i]) {
        j++;
      }
    }
    return num;
  }
  // console.log(findContentChildren(g,s));
}
//购买股票的时机 (不含手续费)
{
  let prices = [7, 1, 3, 5, 6, 7, 9];
  function maxProfit(prices) {
    let sum = 0;
    for (let i = 1; i < prices.length; i++) {
      sum += Math.max(0, prices[i] - prices[i - 1]);
    }
    return sum;
  }
  // console.log(maxProfit(prices));
}
// 购买股票的时机 含手续费
{
  //核心贪心思想:当我们卖出一支股票时，我们就立即获得了以相同价格并且免除手续费买入一支股票的权利
  let prices = [1, 3, 7, 5, 10, 3];
  let fee = 3;
  function maxProfit(prices, fee) {
    let buy = prices[0] + fee;
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] + fee < buy) {
        buy = prices[i] + fee;
      } else if (prices[i] > buy) {
        profit += prices[i] - buy;
        buy = prices[i];
      }
    }
    return profit;
  }
  // console.log(maxProfit(prices,fee));
}
//最多删除一个字符得到回文
{
  function validPalindrome(str) {
    let len = str.length;
    let l = 0;
    let r = len - 1;
    let flat = true;
    while (l <= r) {
      if (str[l] == str[r]) {
        l++;
        r--;
      } else {
        if (flat === true) {
          flat = false;
          return Palindrome(str, l + 1, r) || Palindrome(str, l, r - 1);
        } else {
          return false;
        }
      }
    }
    return true;
    function Palindrome(s, l, r) {
      // console.log('进来');
      while (l <= r) {
        // console.log(s[l],s[r]);
        if (s[l] === s[r]) {
          l++;
          r--;
        } else {
          return false;
        }
      }
      return true;
    }
  }
  // console.log(validPalindrome("atbbga"));
}
//跳跃游戏II
//贪的是找到能跳到的范围内中的最大步子
{
  let arr = [2, 1, 4, 5, 5, 4, 3, 2];
  function jump(arr) {
    let end = 0;
    let maxposition = 0;
    let steps = 0;
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      maxposition = Math.max(maxposition, i + arr[i]);
      if (i == end) {
        end = maxposition;
        steps++;
        if (maxposition >= len - 1) {
          break;
        }
      }
    }
    return steps;
  }
}
//跳跃游戏 能否跳出去
//只关心此位置能不能跳到 然后范围内能不能跳出去 否则前移
{
  let nums = [2, 3, 1, 5, 0, 1];
  function canJump(nums) {
    let maxposition = 0;
    for (let i = 0; i < nums.length; i++) {
      if (i <= maxposition) {
        maxposition = Math.max(maxposition, i + nums[i]);
        let jump = i + nums[i];
        if (jump >= nums.length - 1) {
          return true;
        }
      }
    }
    return false;
  }
}

//动态规划
//爬楼梯 递归
{
  function cStaris(n) {
    if (n === 1 || n === 2) {
      return 1;
    } else {
      return cStaris(n - 1) + cStaris(n - 2);
    }
  }
}
//打家劫舍
//当前位置n可盗窃的最大值 dp[i] = max(dp[i-1],dp[i-2]+nums[i])
{
  let arr = [1, 2, 3, 1];
  function rob(nums) {
    let len = nums.length;
    if (len == 0) return 0;
    if (len == 1) return nums[0];
    let dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for (let i = 2; i <= len; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }
    return dp[len];
  }
  // console.log(rob(arr));
}
//使用最小花费爬楼梯
{
  // dp[i] 是爬上当前的最小花费
  // dp[i] = Math.min(dp[i-1]+ cost[i-1] , dp[i-2]+ cost[i-2])
  let cost = [10, 15, 10];
  function minCostClimbingStairs(cost) {
    let len = cost.length;
    const dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = 0;
    for (let i = 2; i <= len; i++) {
      dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }
    return dp[len];
  }
  // console.log(minCostClimbingStairs(cost));
}
//机器人 不同路径
{
  let m = 3,
    n = 7;
  // dp[i][j] = dp[i-1][j] + dp[i][j-1]
  function uniquePaths(m, n) {
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0)); //初始dp数组
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if ((j === 0 && i === 0) || (j === 0 && i !== 0) || (j !== 0 && i === 0)) {
          dp[i][j] = 1;
        } else if (j !== 0 && i !== 0) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
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

    return dp[m - 1][n - 1];
  }
  // console.log(uniquePaths(m,n));
}
//小孩上楼梯 1阶 2阶 或者3阶
{
  let n = 4;
  function waysToStep(n) {
    const dp = [];
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;
    for (let i = 4; i <= n; i++) {
      dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
    }
    return dp[n] % 1000000007;
  }
  // console.log(waysToStep(n));
}
//连续数列
{
  //只关心到某个结尾下标时 最大的数列是多少
  function maxSubArray(nums) {
    let len = nums.length;
    let dp = [];
    dp[0] = nums[0];
    for (let i = 1; i < len; i++) {
      dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    }
    return Math.max(...dp);
  }
  let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  // console.log(maxSubArray(arr));
}
//机器人最短路径
{
  let grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ];
  function minPathSum(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    dp[0][0] = grid[0][0];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (i == 0 && j > 0) {
          dp[0][j] = dp[0][j - 1] + grid[0][j];
        } else if (j == 0 && i > 0) {
          dp[i][0] = dp[i - 1][0] + grid[i][0];
        } else if (i > 0 && j > 0) {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
        console.log(dp[i][j], i, j);
      }
    }
    return dp[m - 1][n - 1];
  }
  // console.log(minPathSum(grid));
}
//遍历拿到节点的name
{
  const tree = {
    name: "root",
    children: [
      {
        name: "c1",
        children: [
          {
            name: "c11",
            children: [],
          },
          {
            name: "c12",
            children: [],
          },
        ],
      },
      {
        name: "c2",
        children: [
          {
            name: "c21",
            children: [],
          },
          {
            name: "c22",
            children: [],
          },
        ],
      },
    ],
  };
}
//机器人的运动范围
{
  function movingCount(m, n, k) {
    const visited = Array(m)
      .fill(0)
      .map(() => Array(n).fill(false));

    function sum(n) {
      let res = 0;
      while (n) {
        res += n % 10;
        n = Math.floor(n / 10);
      }
      return res;
    }

    function dfs(x, y) {
      //终值条件
      if (sum(x) + sum(y) > k || x >= m || y >= n || visited[x][y]) {
        return 0;
      } else {
        visited[x][y] = true;
        return 1 + dfs(x + 1, y) + dfs(x, y + 1);
      }
    }
    return dfs(0, 0);
  }
  // movingCount()
}
{
  //二分查找
  function searchInsert(nums, target) {
    let middle;
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
      middle = l + ((r - l) >> 1);
      if (nums[middle] > target) {
        r = middle - 1;
      } else if (nums[middle] < target) {
        l = middle + 1;
      } else {
        return middle;
      }
      console.log(l, r);
    }

    return l;
  }
  let nums = [1, 3, 5, 6];
  let target = 7;
  // console.log(searchInsert(nums,target));
}
{
  //二分进阶
  function searchRange(nums, target) {
    let l = 0,
      r = nums.length - 1,
      middle;
    let left = 0,
      right = 0;
    let count1 = -1;
    let count2 = -1;
    let is = false;
    while (l <= r) {
      middle = l + ((r - l) >> 1);
      console.log(middle);

      if (nums[middle] < target) {
        l = middle + 1;
      } else if (nums[middle] > target) {
        r = middle - 1;
      } else if (nums[middle] == target) {
        count1 = middle;
        count2 = middle;
        is = true;
        break;
      } else {
        break;
      }
    }
    if (is == true) {
      while (nums[count1 + 1] == nums[count1]) {
        count1++;
        right = count1;
      }
      while (nums[count2 - 1] == nums[count2]) {
        // console.log(count1,count2);

        count2--;
        left = count2;
      }
    }
    return [count2, count1];
  }
  let nums = [1];
  let target = 1;
  // console.log(searchRange(nums,target));
}
{
  //判断两个区间是否重叠 并且 合并
  function isOverlapped(first, second) {
    first.strat > second.start ? ([first, second] = [second, first]) : "";
    if (second.start <= first.end) return true;
    return false;
  }
  const a = { start: 3, end: 5 };
  const b = { start: 9, end: 10 };
  const c = { start: 4, end: 6 };
  const d = { start: 5, end: 8 };
  // console.log(isOverlapped(c, d));

  function merge(interval) {
    interval = interval.sort((a, b) => {
      if (a.strat === b.start) {
        return a.end - b.end;
      }
      return a.start - b.start;
    });
    console.log(interval);
    const res = [];

    let now = interval[0];
    for (let i = 1; i < interval.length; i++) {
      if (isOverlapped(now, interval[i])) {
        now.end = interval[i].end > now.end ? interval[i].end : now.end;
      } else {
        res.push(now);
        now = interval[i];
      }
    }
    res.push(now);
    return res;
  }
  const e = [
    { start: 2, end: 5 },
    { start: 9, end: 10 },
    { start: 3, end: 4 },
    { start: 5, end: 8 },
    { start: 10, end: 12 },
    { start: 11, end: 14 },
  ];

  const f = [
    { start: 4, end: 7 },
    { start: 6, end: 9 },
    { start: 1, end: 3 },
    { start: 8, end: 10 },
  ];
  const g = [
    { start: 4, end: 7 },
    { start: 9, end: 10 },
    { start: 7, end: 9 },
  ];
  //   console.log(merge(e));
}
{
  var sortedSquares = function (nums) {
    let res = [];
    let len = nums.length;
    let l = 0,
      r = len - 1;
    while (l <= r) {
      let left = nums[l] * nums[l];
      let right = nums[r] * nums[r];
      console.log(left, right);
      if (Math.abs(left) < Math.abs(right)) {
        res.unshift(right);
        r--;
      } else {
        res.unshift(left);
        l++;
      }
    }
    return res;
  };
  // console.log(sortedSquares([-4,-1,0,3,10]));
}
{
  function backspaceCompare(s, t) {
    function check(str) {
      while (str.indexOf("#") !== -1) {
        str = str.replace(/.?\#/, "");
      }
      return str;
    }
    return check(s) === check(t);
  }
  let s = "ab#c";
  let t = "ad#c";
  // console.log(backspaceCompare(s,t));
}
//搜索旋转排序数组
{
  function search(nums, target) {
    // 初始化左指针为0，右指针为数组最后一个元素
    let left = 0,
      right = nums.length - 1;
    // 当左指针超过右指针，证明遍历完成，跳出循环
    while (left <= right) {
      // 寻找中间值
      let middle = Math.floor((left + right) / 2);
      // 如果中间值等于目标值，直接返回索引
      if (nums[middle] == target) return middle;

      // 找到有顺序的一半数组（无论如何分割数组，总有一半是全为升序的）
      // 如果nums[left]<=nums[middle]证明[left,middle]该区间全为升序
      if (nums[left] <= nums[middle]) {
        // 如果目标值不在该区间值的范围内，则去掉区间[left,middle]从
        // [middle+1,right]区间继续遍历
        if (target < nums[left] || target > nums[middle]) left = middle + 1;
        // 否则目标值在区间[left,middle]中，则去掉[middle,right]区间
        // 从[left,middle-1]继续遍历
        else right = middle - 1;
      }
      // 否则[middle,right]区间全为升序
      else {
        // 如果目标值不在该区间值的范围内，则去掉区间[middle,right]从
        // [left,middle-1]区间继续遍历
        if (target < nums[middle] || target > nums[right]) right = middle - 1;
        // 否则目标值在区间[middle,right]中，则去掉[left,middle]区间
        // 从[middle+1,right]继续遍历
        else left = middle + 1;
      }
    }
    // 遍历完数组元素后仍未找到目标值，直接返回-1
    return -1;
  }
}
//搜索二维矩阵
{
  var searchMatrix = function (matrix, target) {
    let low = matrix.length;

    let count;
    for (let i = 0; i < low; i++) {
      if (matrix[i][0] <= target) {
        count = i;
      }
    }
    let l = 0,
      r = matrix[count].length - 1;
    let middle;
    console.log(count);
    while (l <= r) {
      console.log(l, r);
      middle = l + Math.floor((r - l) / 2);
      if (matrix[count][middle] === target) {
        return true;
      } else if (matrix[count][middle] > target) {
        r = middle - 1;
      } else if (matrix[count][middle] < target) {
        l = middle + 1;
      }
    }
    return false;
  };
  let matrix = [
    [-10, -8, -6, -4, -3],
    [0, 2, 3, 4, 5],
    [8, 9, 10, 10, 12],
  ];

  let target = 0;
  // console.log(searchMatrix(matrix,target));
}
//长度最小的子数组 滑动窗口
{
  function minSubArrayLen(target, nums) {
    let len = nums.length,
      l = 0,
      r = 0;
    let sum = 0;
    let ans = Infinity;
    while (r < len) {
      sum += nums[r];
      while (sum >= target) {
        ans = Math.min(ans, r - l + 1);
        sum -= nums[l];
        l++;
      }
      end++;
    }
    return ans;
  }
}
//四数相加
{
  let nums1 = [1, 2],
    nums2 = [-2, -1],
    nums3 = [-1, 2],
    nums4 = [0, 2];
  function fourSumCount(A, B, C, D) {
    let res = 0;
    const MapAB = new Map();
    for (const a of A) {
      for (const b of B) {
        if (MapAB.has(a + b)) {
          MapAB.set(a + b, MapAB.get(a + b) + 1);
        } else {
          MapAB.set(a + b, 1);
        }
      }
    }
    for (const c of C) {
      for (const d of D) {
        if (MapAB.has(-c - d)) {
          res += MapAB.get(-c - d);
        }
      }
    }
    return res;
  }
  // console.log(fourSumCount(nums1,nums2,nums3,nums4));
}
//赎金信
{
  function canConstruct(S, T) {
    const arr = Array(26).fill(0);
    let base = "a".charCodeAt();
    for (const t of T) {
      arr[t.charCodeAt() - base]++;
    }
    for (const s of S) {
      const index = s.charCodeAt() - base;
      if (!arr[index]) return false;
      arr[index]--;
    }
    return true;
  }
  let ransomNote = "aa",
    magazine = "aab";
  // console.log(canConstruct(ransomNote,magazine));
}
//三数之和
{
  function threeSum(nums) {
    let res = [];
    let num = nums.sort((a, b) => {
      return a - b;
    });
    let len = num.length;
    console.log(num);
    for (let i = 0; i < num.length; i++) {
      if (num[i] > 0) break;
      if (i > 0 && num[i] == num[i - 1]) continue;
      let l = i + 1,
        r = len - 1;
      while (l < r) {
        const sum = num[i] + num[l] + num[r];
        if (sum < 0) {
          l++;
        } else if (sum > 0) {
          r--;
        } else {
          res.push([num[i], num[l], num[r]]);
          while (l < r && num[l] == num[l + 1]) l++;
          while (l < r && num[r] == num[r + 1]) r--;
          l++;
          r--;
        }
      }
    }
    return res;
  }
  let nums = [-1, 0, 1, 2, -1, -4];
  // console.log(threeSum(nums));
}
//排序
{
  //冒泡排序
  //比较相邻的元素 交换位置
  let arr = [2, 9, 6, 7, 4, 3, 1, 7];
  function BubbleSort(arr, flat = 0) {
    let isOrder = false;
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      isOrder = true;
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          isOrder = false;
        }
      }
      if (isOrder) {
        break;
      }
    }
    return arr;
  }

  // console.log(BubbleSort(arr));
  // 计数排序
  // 1.计算出差值d,最小值小于0,加上本身add
  // 2.创建统计数组并统计对应元素个数
  // 3.统计数组做变形，后面的元素等于前面的元素之和,也就是排名数组
  // 4.遍历原始数组,从统计数组中找到正确位置,输出到结果数组
  function countingSort(arr) {
    let min = arr[0],
      max = arr[0],
      len = arr.length;
    //求最大最小值
    for (let i = 0; i < len - 1; i++) {
      max = Math.max(arr[i], max);
      min = Math.min(arr[i], min);
    }
    //1.计算出差值d，最小值小于0，加上本身add
    let d = max - min,
      add = min < 0 ? -min : 0;
    //2.统计数组并统计对应元素个数
    let countArray = new Array(d + 1 + add).fill(0);
    for (let i = 0; i < len; i++) {
      let demp = arr[i] - min + add;
      countArray[demp] += 1;
    }
    //3.统计数组做变形，后面的元素等于前面的元素之和，也就是排名数组
    let sum = 0;
    //这里需要遍历的是countArray数组的长度
    for (let i = 0; i < d + 1 + add; i++) {
      sum += countArray[i];
      countArray[i] = sum;
    }
    let res = new Array(len);
    //4.遍历原始数组，从统计数组中找到正确位置
    for (let i = 0; i < len; i++) {
      let demp = arr[i] - min + add;
      res[countArray[demp] - 1] = arr[i];
      countArray[demp]--;
    }
    return res;
  }
  // console.log(countingSort(arr));
}
//快速排序
{
  let arr = [2, 9, 6, 7, 4, 3, 1, 7];
  let quickSort = function (arr) {
    //递归出口就是数组长度为1
    if (arr.length <= 1) return arr;
    //获取中间值得索引
    let index = Math.floor(arr.length / 2);
    //使用splice截取
    //如果此处使用pivot=arr;那么将出现无限递归的错误
    let pivot = arr.splice(index, 1)[0],
      left = [],
      right = [];
    for (let i = 0; i < arr.length; i++) {
      if (pivot > arr[i]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat([pivot], quickSort(right));
  };
  // console.log(quickSort(arr));
}
//插入排序
{
  let arr = [2, 9, 6, 7, 4, 3, 1, 7, 0, -1, -2];
  let insertionSort = function (arr) {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      let preIndex = i - 1,
        cur = arr[i];
      while (preIndex >= 0 && arr[preIndex] > cur) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
      }
      arr[preIndex + 1] = cur;
    }
    return arr;
  };
  // console.log(insertionSort(arr));
}
{
  //选择排序
  let selectSort = function (arr, flag = 0) {
    let len = arr.length,
      temp = 0;

    // 一共需要排序len-1次
    for (let i = 0; i < len - 1; i++) {
      temp = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[temp]) temp = j;
      }
      // 每一趟保证第i位为最小值
      if (temp !== i) {
        [arr[i], arr[temp]] = [arr[temp], arr[i]];
      }
    }

    return flag ? arr.reverse() : arr;
  };
  let arr = [2, 9, 6, 7, 4, 3, 1, 7, 0, -1, -2];
  // console.log(selectSort(arr))
}
{
  String.prototype.giveLydiaPizza = () => {
    return "Just give Lydia pizza already!";
  };
  const name = "Lydia";
  // name.giveLydiaPizza()
}
//回溯
{
  //字符串排列
  function permutation(s) {
    //用path 一层一层去递归 直到递归到最后一层
    let len = s.length;
    const visited = {};
    const res = new Set();
    function dfs(path) {
      if (path.length === len) return res.add(path);
      for (let i = 0; i < len; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        dfs(path + s[i]);
        visited[i] = false;
      }
    }
    dfs("");
    return [...res];
  }
  // console.log(permutation('abc'));
}
{
  //回溯 二叉树中和为某一值的路径
  var pathSum = function (root, target) {
    const stack = [];
    const res = [];
    let targetSum = target;
    root && backTrack(root, stack, 0, res, targetSum);
    return res;
  };
  function backTrack(node, stack, sum, res, targetSum) {
    stack.push(node.val);
    sum += node.val;
    //判断是不是叶子节点 并且 和满足
    if (node.left == null && node.right === null && sum == targetSum) {
      res.push([...stack]);
    }
    if (node.left !== null) backTrack(node.left, stack, sum, res, targetSum);
    if (node.right !== null) backTrack(node.right, stack, sum, res, targetSum);
    //回溯到上个节点
    stack.pop();
  }
}
{
  //回溯
  function combine(n, k) {
    const path = [];
    const res = [];
    function backTrack(startIndex, path) {
      if (path.length === k) {
        return res.push([...path]);
      }
      for (let i = startIndex; i <= n; i++) {
        path.push(i);
        backTrack(i + 1, path);
        path.pop();
      }
    }
    backTrack(1, path);
    return res;
  }
  // console.log(combine(4,2));
}
{
  //回溯 所有子集
  function subsets(nums) {
    let res = [];
    let path = [];
    let len = nums.length;
    function backTrack(nums, path, startIndex) {
      res.push([...path]);
      for (let i = startIndex; i < len; i++) {
        path.push(nums[i]);
        backTrack(nums, path, i + 1);
        path.pop();
      }
    }
    backTrack(nums, path, 0);
    return res;
  }
  // console.log(subsets([1,2,3]));
}
{
  //回溯 全排列
  function permute(nums) {
    let len = nums.length;
    let visited = [];
    const res = [];
    const path = [];
    function backTrack(visited, path, nums, len) {
      if (path.length === len) {
        // console.log(path);
        res.push([...path]);
        return;
      }
      for (let i = 0; i < len; i++) {
        if (visited[i] == false) continue;
        path.push(nums[i]);
        visited[i] = false;
        backTrack(visited, path, nums, len);
        path.pop();
        visited[i] = true;
      }
    }
    backTrack(visited, path, nums, len);
    return res;
  }
  // console.log(permute([1, 2, 3]));
}
{
  //求n个 2-32的不重复的随机数
  // console.log(res);
  function random(n) {
    let set = new Set();
    while (set.size < n) {
      set.add(Math.floor(2 + Math.random() * 30));
    }
    console.log(set);
    const res = [...set];
    return res;
  }
  // console.log(random(5));
}
{
  //打乱数组顺序 不在原来的位置
  function shuffle(arr) {
    let newArr = arr.slice(0);
    let len = newArr.length;
    let indexArr = [];
    for (let i = 0; i < len; i++) {
      if (indexArr[i]) {
        continue;
      }
      let random = parseInt(Math.random() * len);
      while (random === i) {
        random = parseInt(Math.random() * len);
      }
      indexArr[i] = indexArr[random] = true;
      [newArr[i], newArr[random]] = [newArr[random], newArr[i]];
    }
    return newArr;
  }
  // console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
}
{
  //二分法
  function dichotomy(arr, target) {
    let len = arr.length;
    let l = 0,
      r = len - 1;
    while (l <= r) {
      let middle = l + Math.floor((r - l) >> 1);
      if (arr[middle] == target) {
        return middle;
      }
      if (arr[middle] > target) {
        r = middle - 1;
      }
      if (arr[middle] < target) {
        l = middle + 1;
      }
    }
    return -1;
  }
  let arr = [1, 2, 6, 4, 8, 7];
  // console.log(dichotomy(arr,9));
}
{
  //快速排序
  function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const pivot = arr[0];
    const pivotArr = []; //一样大的放中间
    const lowArr = []; //小的放左边
    const hightArr = []; //大的放右边
    arr.forEach((element) => {
      if (element == pivot) {
        pivotArr.push(element);
      } else if (element > pivot) {
        hightArr.push(element);
      } else {
        lowArr.push(element);
      }
    });
    return quickSort(lowArr).concat(pivotArr).concat(quickSort(hightArr));
  }

  let arr = [1, 5, 8, 21, 585, 74];
  // console.log(quickSort(arr));
}
{
  let str = "AsdbuicBasd";
  //字符串去重 忽略大小写
  function duplicateRemoval(s) {
    const arr = [];
    let newStr = "";
    for (let i = 0; i < s.length; i++) {
      const element = s[i];
      if (arr.indexOf(element.toUpperCase()) == -1 && arr.indexOf(element.toLowerCase()) == -1) {
        arr.push(element);
      }
    }
    return arr.join("");
  }
  // console.log(duplicateRemoval(str));
}
{
  //数组中第k大的数字
  function Max(arr) {}
}
{
  //快速排序
  function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const pivot = arr.splice(0, 1);
    let low = [],
      hight = [];

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element < pivot) {
        low.push(element);
      }
      // else if (element > pivot) {
      //   hight.push(element);
      // }
      else {
        // pivotArr.push(element);
        hight.push(element);
      }
    }
    return quickSort(low).concat(pivot).concat(quickSort(hight));
  }
  let arr = [1, 5, 8, 21, 585, 74];
  // let arr = [464, 64, 8, 8, 9];
  // console.log(quickSort(arr));
}
{
  let str = "11222333";
  function test(str) {
    let index = 0;
    let l = 0,
      len = str.length;
    while (l < len) {
      if ((str[l] === str[l + 1]) === str[l + 2]) {
        index++;
        str[l + 1] = "8";
      } else if (str[l] == str[l + 1] && str[l + 1] !== str[l + 2]) {
        index++;
        str[l] = "8";
      }
      l++;
    }
    return index;
  }
  // console.log(test(str));
}
{
  //有效的括号
  function isValid(str) {
    let sta = [];
    const map = new Map([
      [")", "("],
      ["}", "{"],
      ["]", "["],
    ]);
    for (const c of str) {
      if (c == "(" || c == "{" || c == "[") {
        sta.push(c);
      } else {
        if (sta.length && map.get(c) === sta[sta.length - 1]) {
          sta.pop();
        } else {
          return false;
        }
      }
    }
    if (sta.length !== 0) {
      return false;
    } else {
      return true;
    }
  }
  // console.log(isValid("()[]{}"));
}
{
  //最大子序列和
  //求每个下标作为结束点时的最大和
  //动态转换方程
  // dp[i] = Math.max(nums[i],nums[i]+dp[i-1])
  let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  function maxSubArray(arr) {
    let len = arr.length;
    let dp = Array(len).fill(0);
    dp[0] = arr[0];
    let max = dp[0];

    for (let i = 1; i < len; i++) {
      dp[i] = Math.max(arr[i], arr[i] + dp[i - 1]);
      max = Math.max(dp[i], max);
    }
    return max;
  }
  // console.log(maxSubArray(arr));
}
{
  //跳台阶
  function numWays(n) {
    if (n == 0 || n == 1) return 1;
    else return numWays(n - 1) + numWays(n - 2);
  }
  // console.log(numWays(7));
}
{
  //两个YYYYMMDD是否在同一周
  let stringTime = "2012-10-12";
  // console.log(Date.parse(new Date(stringTime)));
}
{
  //股票一
  //贪心
  function maxProfit(arr) {
    if (arr.length === 0) {
      return 0;
    }
    let max = 0;
    let min = arr[0];
    for (const p of arr) {
      min = Math.min(min, p);
      max = Math.max(max, p - min);
    }
    return max;
  }
  let arr = [7, 1, 5, 3, 6, 4];
  // console.log(maxProfit(arr));
  //动态规划
  function _maxProfit(arr) {
    let len = arr.length;
    const dp = Array(len).fill(new Array(2));
    console.log(dp);
    dp[0][0] = 0;
    dp[0][1] = -7;
    dp[1][0] = Math.max(arr[1] - dp[0][1], dp[0][0]);
    dpp[1][1] = Math.max(dp[0][1], dp[0][0]);
  }
  // console.log(_maxProfit(arr));
}
{
  //‘rgrgr’r表示红色，g表示绿色，可以对其颜色进行反转，使其满足红色全在绿色的左侧，找出次数最小是多少？
  // dp[i]表示从i处开始左边是红 右边是绿
  function minSwaps(s) {
    let count = 0; //某个点开始 后面需要r变g的个数
    for (const item of s) {
      if (item == "r") {
        count++;
      }
    }
    let minNum = Infinity;
    let len = s.length;
    // let dp = Array(len).fill(0); //最小操作数
    // dp[0] = count;
    let gcount = 0;
    for (let i = 1; i < len; i++) {
      const element = s[i];
      if (element == "r") {
        minNum = Math.min(minNum, count + gcount);
      } else {
        minNum = Math.min(minNum, --count + gcount);
        gcount++;
      }
    }
    return minNum;
  }
  // console.log(minSwaps("rgrgrgr"));
}
{
  //不含重复字符的最长子字符串
  function lengthOfLongestSubstring(s) {
    let len = s.length;
    const dp = Array(len).fill(0);
    dp[0] = 1;
    let max = 0;
    const map = new Map();
    for (let i = 0; i < len; i++) {
      if (i > 0) {
        dp[i] = map.has(s[i]) ? Math.min(i - map.get(s[i]), dp[i - 1] + 1) : dp[i - 1] + 1;
      }
      map.set(s[i], i);
      max = max > dp[i] ? max : dp[i];
    }
    return max;
  }
  // console.log(lengthOfLongestSubstring("abba"));
}
{
  // 1.有一批货物需要抽检，抽检从第一个或者第二个开始，依次从第i+1个，或者i+2个抽检，问抽检的最短时间？
}
{
  //打乱数组顺序，要求每个元素不在原来的位置
  function shuffle(arr) {
    var newArr = arr.slice(0),
      indexArr = [];
    let len = newArr.length;
    for (let i = 0; i < len; i++) {
      if (indexArr[i]) {
        continue;
      }
      let random = parseInt(Math.random() * len);
      while (random === i) {
        random = parseInt(Math.random() * len);
      }
      indexArr[i] = indexArr[random] = true;
      [newArr[i], newArr[random]] = [newArr[random], newArr[i]];
      return newArr;
    }
  }
  //可能还在原来的位置
  function shuffle1(arr) {
    let res = arr.sort((a, b) => {
      return Math.random() - 0.5;
    });
    return res;
  }
  // console.log(shuffle1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
}
{
  //合并两个有序数组
  function merge(arr1, m, arr2, n) {}
}
{
  //求交集 去重版
  function intersection(nums1, nums2) {
    const set = new Set();
    const res = nums1.reduce((pre, cur) => {
      nums2.indexOf(cur) === -1 ? "" : pre.add(cur);
      return pre;
    }, set);
    return Array.from(res);
  }
  // console.log(intersection([1, 2, 2, 1], [2, 2]));
  //多数组求交集
  function intersectNoRepeatTwice(arrs) {
    return arrs.reduce((pre, cur) => {
      return Array.from(new Set(cur.filter((item) => pre.includes(item))));
    });
  }
  // console.log(
  //   intersectNoRepeatTwice([
  //     [1, 2, 3, 5],
  //     [2, 5, 6],
  //     [2, 3, 5],
  //   ])
  // );
}
{
  //算法题 给定字符串Str, 待求重复的子串的长度Num, 找出所有的重复子串  如输入abcab，输出a ab b
  function maxRepOpt(str) {
    let result = [];
    if (str.length <= 1) {
      return result;
    }
    let len = str.length;
    for (let i = 0; i < len; i++) {
      let s = str.slice(i);
      console.log(s, "s");
      let l = s.length;
      while (l > 0) {
        t = s.slice(0, l);
        let reg = new RegExp(t, "gi");
        let res = s.match(reg);
        if (res[1] && res[1] !== "") {
          result.push(res[1]);
        }
        l--;
      }
    }
    return result;
  }
  // console.log(maxRepOpt("abcab"));
}
//判断回文
{
  function isPalindrome(str) {
    return str === str.split("").reverse().join("") ? true : false;
  }
  // console.log(isPalindrome("abbac"));
  function isPalindrome(str) {} //中心扩散
}

{
  //归并排序
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
  }
  function merge(left, right) {
    const res = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        res.push(left.shift());
      } else {
        res.push(right.shift());
      }
    }
    return res.concat(left, right);
  }
  // console.log(mergeSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));
}
{
  //快速排序
  function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    let pivot = arr[0];
    let low = []; //比基准值小
    let hight = []; //比基准值大
    let middle = []; //和基准值一样大
    arr.forEach((element) => {
      if (element > pivot) {
        hight.push(element);
      } else if (element < pivot) {
        low.push(element);
      } else {
        middle.push(element);
      }
    });
    return quickSort(low).concat(middle).concat(quickSort(hight));
  }
  // console.log(quickSort([1, 5, 6, 2, 3, 8, 4, 9]));
}
{
  //插入排序
}

//全排列 回溯
{
  let nums = [1];
  function permute(nums) {
    let res = [];
    let len = nums.length;
    let visited = {};
    let path = [];
    function backTrack(path, visited, nums, len) {
      if (path.length === len) {
        res.push([...path]);
      }
      for (let i = 0; i < nums.length; i++) {
        if (visited[nums[i]]) {
          continue;
        } else {
          path.push(nums[i]);
          visited[nums[i]] = true;
          backTrack(path, visited, nums, len);
          visited[nums[i]] = false;
          path.pop();
        }
      }
    }
    backTrack(path, visited, nums, len);
    return res;
  }
  // console.log(permute(nums));
}
//组合
{
  function combine(n, k) {
    let path = [];
    let res = [];
    function backTrack(startIndex, path) {
      if (path.length === k) {
        res.push([...path]);
      }
      for (let i = startIndex; i <= n; i++) {
        path.push(i);
        backTrack(i + 1, path);
        path.pop();
      }
    }
    backTrack(1, path);
    return res;
  }
  // console.log(combine(1, 1));
}
{
  //组合总和iii
  function combinationSum3(k, n) {
    let sum = 0,
      path = [],
      res = [];
    function backTrack(startIndex, path, sum) {
      console.log(path, sum, "check");
      if (sum > n || path.length > k) {
        return;
      }
      if (path.length === k && sum === n) {
        res.push([...path]);
      }
      for (let i = startIndex; i <= 9; i++) {
        path.push(i);
        sum += i;
        backTrack(i + 1, path, sum);
        path.pop();
        sum -= i;
      }
    }
    backTrack(1, path, sum);
    return res;
  }
  // console.log(combinationSum3(3, 9));
}
//组合总和
{
  function combinationSum(candidates, target) {
    let res = [];
    let path = [];
    let sum = 0;
    let startIndex = 0;
    function backTrack(path, sum, startIndex) {
      // console.log(path);
      if (sum > target) {
        return;
      }
      if (sum === target) {
        res.push([...path]);
        return;
      }
      for (let i = startIndex; i < candidates.length; i++) {
        path.push(candidates[i]);
        sum += candidates[i];
        backTrack(path, sum, i);
        sum -= candidates[i];
        path.pop();
      }
    }
    backTrack(path, sum, startIndex);
    return res;
  }
  // console.log(combinationSum([2, 3, 6, 7], 7));
}
//组合总和ii //排序再去重 因为排序后相同的只可能相邻
{
  function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b);
    let res = [],
      path = [],
      sum = 0,
      visited = {};
    startIndex = 0;
    function backTrack(path, sum, startIndex) {
      if (sum > target) {
        return;
      }
      if (sum === target) {
        res.push([...path]);
        return;
      }
      for (let i = startIndex; i < candidates.length; i++) {
        if (i > startIndex && candidates[i] === candidates[i - 1]) {
          //若当前元素和前一个元素相等
          //则本次循环结束，防止出现重复组合
          continue;
        }
        path.push(candidates[i]);
        sum += candidates[i];
        backTrack(path, sum, i + 1);
        path.pop();
        sum -= candidates[i];
      }
    }
    backTrack(path, sum, startIndex);
    return res;
  }
  // console.log(combinationSum2([2, 5, 2, 1, 2], 5));
}
//全排列ii
{
  var permuteUnique = function (nums) {
    nums.sort((a, b) => {
      return a - b;
    });
    let result = [];
    let path = [];

    function backtracing(used) {
      if (path.length === nums.length) {
        result.push([...path]);
        return;
      }
      for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
          continue;
        }
        if (!used[i]) {
          used[i] = true;
          path.push(nums[i]);
          backtracing(used);
          path.pop();
          used[i] = false;
        }
      }
    }
    backtracing([]);
    return result;
  };
  // console.log(permuteUnique([1, 1, 2]));
}
//子集ii
{
  function subsets(nums) {
    let res = [];
    let path = [];
    let len = nums.length;
    nums.sort((a, b) => a - b);
    function backTrack(nums, path, startIndex) {
      res.push([...path]);
      for (let i = startIndex; i < len; i++) {
        if (i > startIndex && nums[i] === nums[i - 1]) {
          continue;
        }
        path.push(nums[i]);
        backTrack(nums, path, i + 1);
        path.pop();
      }
    }
    backTrack(nums, path, 0);
    return res;
  }
  // console.log(subsets([1, 2, 2]));
}
//堆排序
{
  //建立大顶堆
  function buildMaxHeap(arr, len) {
    let i,
      iParent = Math.floor((len - 1) / 2); //最后一个叶子节点的父节点
    for (i = iParent; i >= 0; i--) {
      heapify(arr, i, len);
    }
  }
  //堆调整
  function heapify(arr, i, len) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;
    //判断左子节点比当前节点更大
    if (left < len && arr[largest] < arr[left]) {
      largest = left;
    }
    //判断右子节点比当前节点更大
    if (right < len && arr[largest] < arr[right]) {
      largest = right;
    }
    //如果发生过交换
    if (largest !== i) {
      swap(arr, i, largest);
      heapify(arr, largest, len);
    }
  }
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function heapSort(arr) {
    let len = arr.length;
    buildMaxHeap(arr, len);
    for (let i = len - 1; i > 0; i--) {
      swap(arr, 0, i); //交换后
      //调整
      heapify(arr, 0, i);
    }
  }
}
//topK 堆排序
{
  function findKthLargest(nums, k) {
    let len = nums.length;
    buildMaxHeap(nums, len);
    for (let i = len - 1; i >= len - k + 1; i--) {
      swap(nums, 0, i); //交换后
      //调整
      heapify(nums, 0, i);
    }
    return nums[0];
    //建立大顶堆
    function buildMaxHeap(arr, len) {
      let iParent = Math.floor(len - 1 / 2);
      for (let i = iParent; i >= 0; i--) {
        heapify(arr, i, len);
      }
    }
    function heapify(arr, i, len) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;
      if (left < len && arr[largest] < arr[left]) {
        largest = left;
      }
      if (right < len && arr[largest] < arr[right]) {
        largest = right;
      }
      if (largest !== i) {
        swap(arr, i, largest);
        heapify(arr, largest, len);
      }
    }
    function swap(arr, i, j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let arr = [1, 3, 4, 5, 6, 7];
  // console.log(findKthLargest(arr, 3));
}
//topK 快排 ？？
{
  function findKthLargest(nums, k) {
    let targetIdex = nums.length - k;
    let start = 0,
      end = nums.length - 1;
    let index = partition(nums, start, end);

    function partition(nums, startIndex, endIdex) {
      let pivot = nums[startIndex];
      let mark = startIndex; //指针用来记录最后分区完的界限
      for (let i = startIndex + 1; i <= endIdex; i++) {
        const element = nums[i];
        if (element) {
        }
      }
    }
  }
  let nums = [3, 2, 1, 5, 6, 4];
}
//两数之和
{
  function twoSum(arr, target) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      if (map.has(target - element)) {
        return [map.get(target - element), i];
      } else {
        map.set(element, i);
      }
    }
  }
  // console.log(twoSum([2, 7, 11, 15], 9));
}
//最长回文子串
{
  function longestPalindrome(s) {
    let len = s.length;
    let max = "";
    for (let i = 0; i < len; i++) {
      helper(i, i);
      helper(i, i + 1);
    }
    return max;
    function helper(l, r) {
      while (l >= 0 && r < len) {
        if (s[l] === s[r]) {
          l--;
          r++;
        } else {
          break;
        }
      }
      max = r - 1 - (l + 1) + 1 > max.length ? s.slice(l + 1, r) : max;
    }
  }
  let s = "cbbd";
  // console.log(longestPalindrome(s));
}
// 算法，输入字符串：“3[a4[b]]” 输出字符串： “abbbbabbbbabbbb”
{
  function decodeString(s) {
    let result = "";
    let i = 0;
    while (s.length > i) {
      //如果不是数字
      if (isNaN(s[i])) {
        result += s[i];
        i++;
      } else {
        let num = "";
        while (!isNaN(s[i])) {
          num += s[i];
          i++;
        }
        num = parseInt(num);
        //处理后面的
        let sub = "";
        i++;
        let j = 1;
        while (j > 0) {
          if (s[i] == "[") {
            j++;
          } else if (s[i] == "]") {
            j--;
          }
          if (j > 0) {
            sub += s[i];
          }
          i++;
        }
        sub = decodeString(sub);
        for (let k = 0; k < num; k++) {
          result += sub;
        }
      }
    }
    return result;
  }
  const str = "3[a4[b]]";
  // console.log(decodeString(str));
}
// 下面的arr中的时间进行求平均，比较简单，5分钟撕掉吧
// 8分钟
{
  const arr = ["8:15", "6:35", "11:22"];

  function averg(arr) {
    let sum = arr.reduce((pre, cur) => {
      let arr = cur.split(":");
      return pre + arr[0] * 60 + arr[1] * 1;
    }, 0);
    sum = sum / 3;
    let m = sum % 60;
    let h = (sum - m) / 60;
    console.log(h, m);
  }
  // console.log(averg(arr));
}
//爬楼梯
{
  function climbStairs(n) {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
  }
  // console.log(climbStairs(4));
}
{
  // [1,0,1,1,0,0,1,0] 使其改变成[0,0,0,0,1,1,1,1]
  // 零放前面，时间复杂度为O(n),空间复杂度为O(1)
  function change(arr) {
    let l = 0;
    let r = arr.length - 1;
    while (r - 1 > l) {
      if (arr[r] == 0 && arr[l] == 1) {
        arr[r] = 1;
        arr[l] = 0;
        r--;
        l++;
        continue;
      } else if (arr[r] == 0 && arr[l] == 0) {
        let test = l;
        while (arr[test] == 0) {
          test++;
        }
        arr[test] = 0;
        arr[r] = 1;
        l++;
        r--;
        continue;
      } else if (arr[r] == 1 && arr[l] == 1) {
        let test2 = r;
        while (arr[test2] == 1) {
          test2--;
        }
        arr[l] = 0;
        arr[test2] = 1;
        l++;
        r--;
        continue;
      } else {
        l++;
        r--;
      }
    }
    return arr;
  }
  // console.log(change([1, 0, 1, 1, 1, 0, 1, 0]));
}
//有效的括号
{
  function isValid(s) {
    let len = s.length;
    let map = new Map([
      [")", "("],
      ["}", "{"],
      ["]", "["],
    ]);
    let stack = [];
    for (let i = 0; i < len; i++) {
      const element = s[i];
      if (element == "(" || element == "{" || element == "[") {
        stack.push(element);
      } else {
        let r = map.get(element);
        let test = stack.pop();
        if (r == test) {
          continue;
        } else {
          return false;
        }
      }
    }
    console.log(stack);
    if (stack.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  // console.log(isValid("()"));
}
//两数之和的改编
{
  const arr = [1, 2, 3, 4, 4];
  const target = 5;
  //得出 arr中有几对相加等于 target，不能复用数字
  //比如这里答案是2  只有 1,4   2,3 （因为1不能复用给两个4）
  function test(arr, target) {
    let count = 0;
    let len = arr.length;
    let path = [];
    let sum = 0;
    arr = Array.from(new Set(arr));
    let visited = {};
    function backTrack(index, path, arr, visited, sum) {
      if (sum === target) {
        console.log(path, sum);
        count++;
      }
      if (sum > target) {
        return;
      }
      for (let i = index; i < len; i++) {
        const element = arr[i];
        if (visited[element]) {
          continue;
        } else {
          path.push(element);
          sum += element;
          visited[element] = true;
          backTrack(i + 1, path, arr, visited, sum);
          path.pop();
          sum -= element;
          visited[element] = false;
        }
      }
    }
    backTrack(0, path, arr, visited, sum);
    return count;
  }
  // console.log(test(arr, target));
}
{
  function longestConsecutive(nums) {
    if (nums.length === 0) {
      return 0;
    }
    let len = nums.length;
    nums = nums.sort((a, b) => a - b);
    console.log(nums);
    let max = 1;
    let queue = [];
    for (let i = 0; i < len; i++) {
      if (i > 0 && nums[i] - nums[i - 1] == 0) {
        continue;
      } else if (i > 0 && nums[i] - nums[i - 1] > 1) {
        max = queue.length > max ? queue.length : max;
        queue = [];
        console.log(i);
      }
      const element = nums[i];
      queue.push(element);
    }
    max = queue.length > max ? queue.length : max;
    return max;
  }
  // console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]));
}
{
  //冒泡排序
  let arr = [1, 6, 23, 9, 8, 7];
  function BubbleSort(arr) {
    let isOrder = false;
    for (let i = 0; i < arr.length; i++) {
      isOrder = true;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          isOrder = false;
        }
      }
      if (isOrder) {
        break;
      }
    }
    console.log(arr);
  }
  // BubbleSort(arr);
}
//斐波那契数列
{
  function fib(n) {
    let dp = [];
    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n] % 1000000007;
    // console.log(dp[n]);
  }
  fib(2);
}
//冒泡排序
{
  // 时间复杂度 n 到 n的平方
  // 空间复杂度1
  let arr = [1, 5, 6, 3, 2, 9, 4];
  function BubbleSort(arr) {
    let isSort = false;
    for (let i = 0; i < arr.length; i++) {
      isSort = true;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          isSort = false;
        }
      }
      if (isSort) {
        return arr;
      }
    }
    return arr;
  }
  // console.log(BubbleSort(arr));
}
//插入排序
{
  // 时间复杂度n 到 n方
  // 空间复杂度 1
  function insertionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let preIndex = i - 1;
      let cur = arr[i];
      while (preIndex >= 0 && arr[preIndex] > cur) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
      }
      arr[preIndex + 1] = cur;
    }
    return arr;
  }
  let arr = [1, 5, 6, 3, 2, 9, 4];
  // console.log(insertionSort(arr));
}
//选择排序
{
  // 时间复杂度 n方
  function selectSort(arr) {
    let len = arr.length;
    let temp = 0;
    for (let i = 0; i < len - 1; i++) {
      temp = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[temp]) {
          temp = j;
        }
      }
      if (temp !== i) {
        [arr[i], arr[temp]] = [arr[temp], arr[i]];
      }
    }
    return arr;
  }
  let arr = [1, 5, 6, 3, 2, 9, 4];
  // console.log(selectSort(arr));
}
//快速排序
{
  // 时间复杂度 nlog(n)
  function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    let pivot = arr[0];
    let low = []; //比基准值小
    let hight = []; //比基准值大
    let middle = []; //和基准值一样大
    arr.forEach((element) => {
      if (element > pivot) {
        hight.push(element);
      } else if (element < pivot) {
        low.push(element);
      } else {
        middle.push(element);
      }
    });
    return quickSort(low).concat(middle).concat(quickSort(hight));
  }
  let arr = [1, 5, 6, 3, 2, 9, 4];
  // console.log(quickSort(arr));
}
// 写代码，数组里的0移到最后
{
  let arr = [1, 2, 0, 4, 0, 6, 7, 9, 0];
  function test(arr) {
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
      if (arr[l] == 0) {
        let r1 = r;
        while (arr[r1] == 0) {
          r1--;
        }
        [arr[l], arr[r1]] = [arr[r1], arr[l]];
        r = r1;
      }

      if (arr[r] !== 0) {
        let l1 = l;

        while (arr[l1] !== 0) {
          l1++;
        }
        console.log(l1);
        [arr[l1], arr[r]] = [arr[r], arr[l1]];
        l = l1;
      }
      l++;
      r--;
    }
    return arr;
  }
  // console.log(test(arr));
}
//leecode926 翻转0或1最少次数使二进制字符串单调递增
{
  // 找一个位置 这个位置左边都是0右边都是1
  let s = "11011";
  var minFlipsMonoIncr = function (s) {
    let len = s.length;
    let zero = 0;
    let one = 0;
    for (let i = 0; i < len; i++) {
      const element = s[i];
      if (element == 0) {
        zero++;
      }
      one = len - zero;
    }
    let dp = [];
    let res = Infinity;
    dp[0] = zero;
    res = Math.min(res, dp[0]);
    for (let i = 1; i <= len; i++) {
      if (s[i - 1] == 0) {
        dp[i] = dp[i - 1] - 1;
        res = Math.min(res, dp[i]);
      } else {
        dp[i] = dp[i - 1] + 1;
        res = Math.min(res, dp[i]);
      }
    }
    return res;
  };
  // console.log(minFlipsMonoIncr(s));
}
//岛屿的数量
{
  let grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  function dfs(i, j, grid, dp) {
    if (i >= grid.length || i < 0 || j < 0 || j >= grid[0].length || grid[i][j] === "0") {
      return;
    }
    grid[i][j] = "0";
    dfs(i + 1, j, grid, dp);
    dfs(i - 1, j, grid, dp);
    dfs(i, j + 1, grid, dp);
    dfs(i, j - 1, grid, dp);
  }
  var numIslands = function (grid) {
    let res = 0;
    let column = grid[0].length;
    let row = grid.length;

    // console.log(dp);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (grid[i][j] === "1") {
          res++;
          dfs(i, j, grid);
        }
      }
    }
    return res;
  };
  // console.log(numIslands(grid));
}
//岛屿的最大面积
{
  let grid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ];

  var maxAreaOfIsland = function (grid) {
    let res = 0;
    let column = grid[0].length;
    let row = grid.length;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (grid[i][j] === 1) {
          res = Math.max(res, dfs(i, j, grid, 0));
        }
      }
    }
    function dfs(i, j, grid, num) {
      if (i >= grid.length || i < 0 || j < 0 || j >= grid[0].length || grid[i][j] === 0) {
        return 0;
      }
      grid[i][j] = 0;
      num++;
      // console.log(num);
      const bottom = dfs(i + 1, j, grid, num);
      const top = dfs(i - 1, j, grid, num);
      const right = dfs(i, j + 1, grid, num);
      const left = dfs(i, j - 1, grid, num);
      return bottom + top + right + left + 1;
    }
    return res;
  };
  // console.log(maxAreaOfIsland(grid));
}
//回溯
{
  //   输入：candidates = [2,3,6,7], target = 7
  // 输出：[[2,2,3],[7]]
  // 解释：
  // 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
  // 7 也是一个候选， 7 = 7 。
  // 仅有这两种组合。
  function test(arr, target) {
    let res = [];
    let path = [];
    let sum = 0;
    function backTrack(startIndex, path, sum) {
      if (sum > target) {
        return;
      }
      if (sum === target) {
        // console.log(path);
        res.push(path.slice());
        // console.log(res);
      }
      for (let i = startIndex; i < arr.length; i++) {
        const element = arr[i];
        sum += element;
        path.push(element);
        backTrack(i, path, sum);
        sum = sum - element;
        path.pop();
      }
    }
    backTrack(0, path, sum);
    // console.log(res);
  }
  test([2, 3, 6, 7], 7);
}
//写一个二分查找
{
  let nums = [-1, 0, 3, 5, 9, 12];
  function search(nums, target) {
    let len = nums.length;
    let l = 0;
    let r = len - 1;
    let middle;
    while (l <= r) {
      middle = (l + r) >> 1;
      if (nums[middle] < target) {
        l = middle + 1;
      } else if (nums[middle] > target) {
        r = middle - 1;
      } else {
        return middle;
      }
    }
  }
  // console.log(search(nums, 9));
}
//盛最多水的容器
{
  var maxArea = function (height) {
    let l = 0;
    let r = height.length - 1;
    var max = 0;
    while (l < r) {
      let tep = (r - l) * Math.min(height[l], height[r]);
      if (tep > max) {
        max = tep;
      }
      if (height[l] < height[r]) {
        l++;
      } else {
        r--;
      }
    }
    return max;
  };
}
//全排列
{
  let arr = [1, 0];
  function permute(nums) {
    let res = [];
    let len = nums.length;
    let path = [];
    let visitd = {};
    function backTrack(path, visitd, arr, len) {
      console.log(path);
      if (path.length == len) {
        res.push(path.slice());
      }
      for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (visitd[element]) {
          continue;
        }
        path.push(element);

        visitd[element] = true;
        backTrack(path, visitd, arr, len);
        visitd[element] = false;
        path.pop();
      }
    }
    backTrack(path, visitd, nums, len);
    return res;
  }
  // console.log(permute(arr));
}
//LRU
{
  let LRUCache = function (capacity) {
    this.capacity = capacity;

    this.map = new Map();
  };
  LRUCache.prototype.get = function (key) {
    if (!this.map.has(key)) {
      return -1;
    } else {
      let value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
  };
  LRUCache.prototype.put = function (key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
  };
  // let lRUCache = new LRUCache(2);
  // lRUCache.put(1, 1); // 缓存是 {1=1}
  // lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
  // console.log(lRUCache.get(1)); // 返回 1
  // lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
  // console.log(lRUCache.get(2)); // 返回 -1 (未找到)
  // lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
  // console.log(lRUCache.get(1)); // 返回 -1 (未找到)
  // console.log(lRUCache.get(3)); // 返回 3
  // console.log(lRUCache.get(4)); // 返回 4
}
//罗马数字转整数
{
  function romanToInt(S) {
    const symbolValues = new Map();
    symbolValues.set("I", 1);
    symbolValues.set("V", 5);
    symbolValues.set("X", 10);
    symbolValues.set("L", 50);
    symbolValues.set("C", 100);
    symbolValues.set("D", 500);
    symbolValues.set("M", 1000);
    let res = 0;
    let len = S.length;
    for (let i = 0; i < len; i++) {
      let value = symbolValues.get(S[i]);
      if (i < len - 1 && value < symbolValues.get(S[i + 1])) {
        res -= value;
      } else {
        res += value;
      }
    }
    return res;
  }
  let s = "MCMXCIV";
  // console.log(romanToInt(s));
}
//整数转罗马数字
{
  function intToRoman(num) {
    let intArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let RomanArr = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let index = 0;
    let res = "";
    while (index <= 13) {
      while (num >= intArr[index]) {
        res += RomanArr[index];
        num -= intArr[index];
      }
      index++;
    }
    return res;
  }
  // console.log(intToRoman(58));
}
//零钱兑换
{
  function change(amount, coins) {
    let dp = Array(amount + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < coins.length; i++) {
      for (let j = coins[i]; j <= amount; j++) {
        dp[j] = dp[j] + dp[j - coins[i]];
      }
    }
  }
  // console.log(change(5, [2, 4, 5]));
}
//最长重复子数组
{
  let findLength = function (nums1, nums2) {};
  let nums1 = [1, 2, 3, 2, 1];
  let nums2 = [3, 2, 1, 4, 7];
  console.log(findLength(nums1, nums2));
}
// 最大岛屿面积
{
}
//手撕快排
{
}
//归并排序
{
}
