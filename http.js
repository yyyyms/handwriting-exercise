const http = require('http')

const server = http.createServer((require,respose)=>{
    console.log('有客户端请求数据');
    respose.end('success')
})
server.listen(3000,()=>{
    console.log('服务启动成功');
})