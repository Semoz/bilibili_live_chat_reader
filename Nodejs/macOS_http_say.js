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
  if(user != undefined && content != undefined){
    say(user, content);
  }
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("success");
  response.end();
}).listen(9999);
readFromMac("语音助手已就位，监听端口9999");

function say(author, content){
  var book = "";
  // code>>
  console.log(author + " say: " + content);
  book = content;
  // code<<
  readFromMac(book);
}

// macos say
function readFromMac(content){
  var process = require('child_process');
  process.exec('say ' + content,function (error, stdout, stderr) {
    if(error != null) {
        console.log("stdout:" + stdout);
        console.log("stderr" + stderr);
        process.exec('say "对不起，我不知道你说了什么😂"',function (error, stdout, stderr) {});
    }
  });
}