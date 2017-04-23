
# 准备raspberrypi

1. 下载

```
https://www.raspberrypi.org/downloads/raspbian/
```

2. 安装sd卡软件

也有下的，58MB

3. 写入，并验证，我用的32G的SD卡

4. 插入SD卡，插入网线，插入HDMI线，插入USB鼠标，有键盘也可以插入键盘，但不是必要的；

5. 接入电源

6. 秒启动成功

7. 进入系统设置，赶紧打开SSH和VNC

8. 默认密码是pi/raspberrypi

9. ssh过去，做免登陆

```
       mkdir .ssh
       vim authorized_keys
```
       然后把自己的公钥加进去就是了

10. 调教bash_profile

```
CLICOLOR=1
LSCOLORS=gxfxcxdxbxegedabagacad
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;36m\]\w\[\033[00m\]\$ '
#enables colorfor iTerm
export TERM=xterm-color

alias ll='ls -lG'
alias ls='ls -G'
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
```

11. 安装brew

这里：http://linuxbrew.sh/

```
export PATH="/home/pi/.linuxbrew/bin:$PATH"
export MANPATH="/home/pi/.linuxbrew/share/man:$MANPATH"
export INFOPATH="/home/pi/.linuxbrew/share/info:$INFOPATH"
```

12. 安装nvm

```
brew install nvm 

then

export NVM_DIR="/home/pi/.nvm"

. "/home/pi/.linuxbrew/opt/nvm/nvm.sh"
```


13. 安装最新的node
```
        nvm install v7.9.0
        nvm alias default v7.9.0
```

14. 安装最新的gcc

15. 参考链接：

http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/
写得很烂，但是有图

https://www.losant.com/blog/how-to-install-nodejs-on-raspberry-pi
写得对的，但是不如用brew把nvm装了再说

好了，有了brew，基本上和mac的使用体验就很像了

16. 清理系统原有的node.js

https://github.com/sandeepmistry/bleno/issues/295

```
sudo apt-get remove nodejs

然后：

sudo apt-get autoremove
```

#开始编码

1. git clone 本项目

2. 准备client 端环境

```
停掉原有的树莓派的蓝牙服务：sudo service bluetooth stop
启动hic界面：sudo hciconfig hci0 up
安装cap：sudo apt-get install libcap2-bin
给node权力：sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

3. 启动
```
node client.js
```
4. 服务端监听
```
node server.js
```
两边都可以npm install 先



