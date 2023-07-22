const express = requirecors("express");
const cors = require("cors");
const app = express();
const expressWs = require("express-ws")(app); // 混入 相当于为app添加.ws方法
//使用body-paser中间件解析post请求的主体
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Router = require("./router");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:54255");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(Router);
app.listen(8080, (req, res) => {
  console.log("后端服务端口地址为:8080");
});
