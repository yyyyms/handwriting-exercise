const http = require('http')
const url = require('url')
const server = http.createServer((req,res)=>{
    const params = url.parse(req.url,true)
    console.log(params);
    res.write('hello')
    res.end('world')
})
server.on('close',()=>{
    console.log('服务关闭了');
})
server.on('error',(e)=>{
    console.log(e);
})
server.listen(3000,()=>{
    console.log('启动在3000了');
    // server.close()
})