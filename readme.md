### 前端脚手架搭建

> 1. 本项目为演示项目: 通过拉取 Github 上配置好的模板项目,快速启动新项目开发,使得项目开发规范统一。
> 2. 后续会补充常用的一些操作函数等。

#### 初始化目录

`npm init -y`

#### 安装依赖

`npm i commander download-git-repo ora figlet clear chalk -s`

#### 初始化目录

1. bin
   - zg-cli.js 配置操作命令
2. lib
   - init.js 初始化项目命令对应的处理过程
   - init-process.js 初始化项目流程函数封装
   - utils.js 通用工具函数

#### 配置 package.json

1. bin 配置
2. downloadRepoConfig: 模板路径配置

```json
{
  "bin": {
    "zg-cli": "./bin/zg-cli.js"
  },
  "downloadRepoConfig": {
    "url": "github:OSpoon/vue-cli-vant-starter"
  }
}
```

#### 脚手架发布

> 提前注册[npmjs](https://www.npmjs.com/)`账号 执行命令`bash publish.sh`

```sh
#!/usr/bin/env bash
npm config get registry # 检查仓库镜像库
npm config set registry=http://registry.npmjs.org
echo '请进行登录相关操作：'
npm login # 登陆
echo "-------publishing-------"
npm publish # 发布
npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
echo "发布完成"
exit
```

#### 将 npm 模块链接到对应的运行项目中去

`npm link`

#### 删除的情况

`ls /usr/local/bin/`
`rm /usr/local/bin/zg-cli`
