/*加载模块*/
var express = require("express");
var http = require("http");
var path = require("path");
/*创建服务*/
var app = express();
/*指定端口*/
app.set("port",8800);
/*指定静态资源访问目录*/
app.use(express.static(path.join(__dirname,"public")));
/*启动服务*/
http.createServer(app).listen(app.get("port"),function(){
    console.log("node本地服务器已启动:"+app.get("port"));
})