var HTTP = require("http");
var URL = require("url");
HTTP.createServer(function(request, response) {
  var content = URL.parse(request.url, true).query.content;
  var auther = URL.parse(request.url, true).query.auther;
  if(content != undefined){
    console.log("收到消息：{\"user:\"" + auther + "\",\"content:\"" + content + "\"}");
    readFromMac(auther, content);
  }
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World 9999 ");
  response.end();
}).listen(9999);
console.log("语音助手已就位!");


// 启动 node live_reader.js
// http://127.0.0.1:9999/reader?auther=用户1&content=你是谁😂1111

//用mac自带语音朗读消息
//var content = "骚气up，，";
//var auther = "aaaaa";
// readFromMac(auther, content);
function readFromMac(auther, content){
	var process = require('child_process');

	//console.log("语音朗读：来自" +auther + "的消息：" + content);
	//process.exec('say 来自' + auther + "的消息：" + content,function (error, stdout, stderr) {
	console.log("语音朗读：" + content);
	process.exec('say ' + content,function (error, stdout, stderr) {
	  if(error != null) {
	    console.log(stdout);
	    console.log(stderr);
	    process.exec('say "对不起，我不知道你说了什么😂"',function (error, stdout, stderr) {});
	    console.log("对不起，我不知道你说了什么😂");
	  }
	});
}

