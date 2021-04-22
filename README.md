## serverBot

利用wechat-puppet-wechat实现的微信消息推送服务，相关内容请进入以下连接查看

[重磅：使用UOS微信桌面版协议登录，wechaty免费版web协议重放荣光](https://wechaty.js.org/2021/04/13/wechaty-uos-web/) 

不足百行代码仅作为示例项目，需要更多功能自行fork开发
## 快速开始
第一步
```shell
docker pull mtnbgx/serverbot:latest
docker run -d -p 3000:3000 --name serverbot \ 
    -e KEY=uuid \ 
    -e NICKNAME=发送对象微信昵称，非备注请注意 \ 
    mtnbgx/serverbot:latest
```
第二步
```shell
sleep 10 ## 启动慢稍等
docker logs serverbot
##得到连接用浏览器打开登录即可
```
第三步
```
curl -X GET 'http://localhost:3000/send/uuid?txt=hello'
```
