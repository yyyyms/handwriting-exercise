//获取当前的时间
module.exports = function getNowTime() {
    let today = new Date()
    let y = today.getFullYear()
    let m = today.getMonth()
    let d = today.getDay()
    let h = today.getHours()
    let i = today.getMinutes()
    let s = today.getSeconds()
    m = m + 1;
    d = d < 10 ? "0" + d : d
    m = m < 10 ? "0" + m : m
    i = i < 10 ? "0" + i : i
    s = s < 10 ? "0" + s : s
    return (y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s)
}