// ==UserScript==
// @name         哔哩哔哩直播室朗读弹幕(macOS)
// @namespace    http://hisemoz.com
// @version      1.0
// @description  拦截websocket，监听数据，发送到nodejs脚本
// @author       Semoz
// @match        https://live.bilibili.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
(function () {
    WebSocket.prototype._send = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
        this._send(data);
        this.addEventListener('message', function (msg) {
            var str = ab2str(msg.data);
            if(str.indexOf("{")>-1){
                var jsonString = str.substring(str.indexOf("{"), str.indexOf("}",str.indexOf("}") + 1)+1);
                if(jsonString.indexOf("\"cmd\":\"DANMU_MSG\"") > -1){
                    //console.log(jsonString);
                    var jsonObj = evil(jsonString);
                    var array = jsonObj.info;
                    //console.log(array);
                    var user = array[2][1];
                    var content = array[1];
                    //var level = array[4][0];
                    //console.log(user+":"+content);
                    read(user, content);
                }
            }
        }, false);
        this.send = function (data) {
            this._send(data);
        };
    };

    function read(user,content){
        var url= "http://127.0.0.1:9999/reader";
        url+="?user="+ user;
        url+="&content="+ content;
        $.ajax({
            type:"GET",
            cache:false,
            url:url,
            async:true,
            success:function() {
                console.log("成功");
            },
            error : function() {
                console.log("接口失败");
            }
        });
    }
    function evil(fn) {
        var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)();
    }
    var decoder = new TextDecoder("utf-8");
    function ab2str(buf) {
        return decoder.decode(new Uint8Array(buf));
    }
})();