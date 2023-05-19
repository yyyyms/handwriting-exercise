const express = require("express");
const route = express.Router();

const getNowTime = require("./utils/index");

route.get("/demo", (req, res) => {
  console.log(req);
  let apiRes = {
    code: 0,
    msg: "成功",
    data: "请求通过",
  };
  res.type("json");
  res.cookie("token", "123456", {
    httpOnly: true,
    expires: new Date(2030, 10, 10),
    // domain: 'http://127.0.0.1',
    path: "/",
    sameSite: "none",
    secure: true,
  });
  res.send(apiRes);
});

route.post("/sub", (req, res) => {
  console.log(req, "data1");
  console.log();
  res.send("成功");
});

//定义 route.ws('/url',(ws,req)=>{})
//建立websocket服务,并指定对应接口url，及相应回调
//ws.send 向客户端发送信息
//ws.on 监听事件
route.ws("/mySocketUrl", (ws, req) => {
  console.log("连接成功");
  ws.send("来自服务端推送的消息");
  ws.on("message", (msg) => {
    ws.send(`收到客户端的消息为:${msg}`);
  });
  //不断向客户端推送消息
  let timer = setInterval(() => {
    ws.send(`服务端定时推送消息:${getNowTime()}`);
  }, 5000);
  ws.on("close", () => {
    clearInterval(timer);
    timer = null;
  });
});
route.get("/bigData", (req, res) => [{}]);
route.get("/jsonp", (req, res) => {
  const { name, age, cb } = req.query;
  console.log(name, age, cb);
  const userInfo = `${name}今年${age}岁`;
  const str = `${cb}(${JSON.stringify(userInfo)})`;
  console.log(str);
  res.send(str);
});
module.exports = route;
