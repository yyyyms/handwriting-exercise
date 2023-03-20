// 获取元素节点
var containerDom = document.getElementsByClassName("container")[0]; // 容器
var ulDom = document.getElementsByClassName("ul-img")[0]; // 图片盒子
var prevDom = document.getElementsByClassName("prev")[0].firstElementChild; // 上一张按钮
var nextDom = document.getElementsByClassName("next")[0].firstElementChild; // 下一张按钮
var numUlDom = document.getElementsByClassName("num-ul")[0]; // 数字按钮父级容器
var numList = document
  .getElementsByClassName("num-ul")[0]
  .getElementsByTagName("li"); // 数字切换按钮列表

// 定义全局变量
var currentIndex = 0; // 当前显示的图片索引
var timer = null; // 自动播放定时器
numList[currentIndex].style.backgroundColor = "#ccc"; // 默认选中第一个数字
// 上一张
prevDom.addEventListener("click", prevFun);
// 下一张
nextDom.addEventListener("click", nextFun);
// 鼠标移入容器，停止自动播放
containerDom.addEventListener("mouseenter", stopAutoPlay);
// 鼠标移出容器，开启自动播放
containerDom.addEventListener("mouseleave", autoPlay);
// 数字按钮点击事件
numUlDom.addEventListener("click", numClick);

// 开启自动播放
autoPlay();

// 切换上一张
function prevFun() {
  ulDom.style.transition = "0.5s";
  numList[currentIndex].style.backgroundColor = ""; // 清空上一个按钮的样式
  if (currentIndex === 0) {
    ulDom.style.transition = "0s"; // 为了实现无缝滚动，清除动画
    currentIndex = 4;
  } else {
    --currentIndex;
  }
  ulDom.style.left = `-${currentIndex * 600}px`;
  numList[currentIndex].style.backgroundColor = "#ccc";
}

// 切换下一张
function nextFun() {
  ulDom.style.transition = "0.5s";
  numList[currentIndex].style.backgroundColor = ""; // 清空上一个按钮的样式
  if (currentIndex === 4) {
    ulDom.style.transition = "0s"; // 为了实现无缝滚动，清除动画
    currentIndex = 0; // 重新播放第一张
  } else {
    ++currentIndex;
  }
  ulDom.style.left = `-${currentIndex * 600}px`;
  numList[currentIndex].style.backgroundColor = "#ccc"; // 设置按钮选中样式
}

// 数字按钮点击事件
function numClick(e) {
  ulDom.style.transition = "0.5s";
  let index = e.target.dataset.index;
  if (index == undefined) {
    return;
  }
  numList[currentIndex].style.backgroundColor = ""; // 清空上一个按钮的样式
  currentIndex = Number(index);
  numList[currentIndex].style.backgroundColor = "#ccc";
  ulDom.style.left = `-${currentIndex * 600}px`;
}

// 循环播放
function autoPlay() {
  timer = setInterval(nextFun, 1000);
}

// 关闭自动播放
function stopAutoPlay() {
  // 清除定时器
  clearInterval(timer);
}