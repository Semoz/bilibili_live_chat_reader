# bilibili_live_reader

####前因
哔哩哔哩直播姬自带了朗读弹幕的功能，但是只有windows版本，而mac系统只能用obs推流，则无直播姬。因此自己想了个办法能读出聊天内容，可以专心直播

####重点
这玩意目前不支持大量并发弹幕可以支持1秒1条的聊天频率，其他待测。

###该项目只是脚本，需要对应的环境

### reader.js

这个是nodejs脚本，目的是搭建一个本地的http服，通过http接口访问之后用mac自带的```say```命令朗读内容

例如：```http://127.0.0.1:9999/reader?auther=用户1&content=你是谁```

安装nodejs之后启动：```node live_reader.js```

### catcher.js
这是一个```Tampermonkey```油猴脚本，匹配地址```https://live.bilibili.com/*```
可以对了聊天内容进行提取，然后调用本地接口朗读出来

环境需要再浏览器安装```Tampermonkey```插件，再安装这份js脚本即可


