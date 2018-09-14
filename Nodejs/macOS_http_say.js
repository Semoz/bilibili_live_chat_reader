// =============================================================================
// This is a mac os speaker by http server.
// 这是一个基于http的macos语音阅读接口
// How to use
// need nodejs
// Start: node macOS_http_say.js
// URL:   http://127.0.0.1:9999/reader?user=user01&content=content
// =============================================================================
// init http server
var HTTP = require("http");
var URL = require("url");
HTTP.createServer(function(request, response) {
  var user = URL.parse(request.url, true).query.user;
  var content = URL.parse(request.url, true).query.content;
  var level = URL.parse(request.url, true).query.level;
  if(user != undefined && content != undefined){
    say(level, user, content);
  }
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("success");
  response.end();
}).listen(9999);
console.log("语音助手已就位，监听端口9999");
readFromMac("语音助手已就位，监听端口9999");

function say(level, user, content){
  // code>>
  if(level<10){level="0"+level;}
  console.log("["+showTime()+"]" + " UL" + level + " [" + user + "]:" + content);
  if(content.indexOf("23") || content.indexOf("66")){
    content = content.replace(/(\d{1})/g,'$1 ').replace(/\s*$/,'');
  }
  // code<<
  readFromMac(content);
}

// macos say
function readFromMac(content){
  var process = require('child_process');
  process.exec('say ' + content,function (error, stdout, stderr) {
    if(error != null) {
        //console.log("stdout:" + stdout);
        //console.log("stderr" + stderr);
        //process.exec('say "对不起，我不知道你说了什么😂"',function (error, stdout, stderr) {});
        console.log("-> 助手消息：[对不起，无法朗读<" + content + ">]");
    }
	});
}

function showTime() {
  var currentDT = new Date();
  var y,m,date,day,hs,ms,ss,theDateStr;
  y = currentDT.getFullYear();// 年
  m = currentDT.getMonth() + 1;// 月
  if(m<10){m = "0" + m;}
  date = currentDT.getDate();// 日
  if(date<10){date = "0" + date;}
  hs = currentDT.getHours();// 时
  if(hs<10){hs = "0" + hs;}
  ms = currentDT.getMinutes();// 分
  if(ms<10){ms = "0" + ms;}
  ss = currentDT.getSeconds();// 秒
  if(ss<10){ss = "0" + ss;}
  theDateStr = y+"-"+  m +"-"+date+" "+hs+":"+ms+":"+ss;
  return theDateStr;
};