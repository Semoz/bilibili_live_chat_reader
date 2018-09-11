// ==UserScript==
// @name         直播消息朗读
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  分析直播界面聊天内容并输出
// @author       Semoz
// @match        https://live.bilibili.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {

    var time = setInterval(function() {
        process();
    },1000);

    var lastIndex = 0;
    function process(){
        if(lastIndex!==0){
            $("#chat-history-list").find(".chat-item:gt("+(lastIndex-1)+")").each(function() {
                var name = $(this).find(".user-name").html();
                var content = $(this).find(".danmaku-content").html();
                if(name!==undefined){
                    console.log(name + content);
                    var url = "http://127.0.0.1:9999/reader?auther="+name+"&content="+content;
                    $.ajax({
                        type:"GET",
                        cache:false,
                        url:url,
                        async:false,
                        data:"",
                        success:function() {
                            console.log("成功");
                        },
                        error : function() {
                            console.log("接口失败");
                        }
                    });
                }
            });
        }
        lastIndex = $("#chat-history-list").find(".chat-item").length;
        //console.log("load Index: " + lastIndex);

    }


})();