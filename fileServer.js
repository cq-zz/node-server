'use strict';

var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    url = require('url');

//从命令行获取root目录，默认是当前目录
var root = path.resolve(process.argv[2]||'.');
console.log('static root dir:'+root);

//创建服务器
var server = http.createServer(function(request,response){
    //获取url的path，类似'/css/common.css';
    var pathname = url.parse(request.url).pathname;
    console.log(pathname);
    //获得对应的本地文件路径
    var filepath = path.join(root,pathname);
    console.log(filepath);
    //获取文件状态
    fs.stat(filepath,function(err,stats){
        if(!err&&stats.isFile()){
            //没有出错并且文件存在
            console.log('200'+request.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response)
        }else{
            //出错了或者文件不存在
            console.log('404'+request.url);
            //发送404响应
            response.writeHead(404);
            response.end('404 NOT FOUND');
        }
    });
});

//设置监听端口 
server.listen(8080);
console.log('server is running at http://127.0.0.1:8080');
