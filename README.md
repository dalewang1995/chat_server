# 😎 A Vue Chat
### 技术栈
> Vue Socket.io Express mongodb
Vue 部分使用 scss 预处理，axios接口请求
## Build Setup

# install dependencies
`npm install`

# serve with hot reload at localhost:8080
👉 前端 vue `npm run dev`   端口 localhost:8080  
👉 后端 express node `nodemon app.js` 端口 localhost:4005
   数据库服务 `mongod --dbpath ~/Desktop/chat_server/database` database 目录需要新建
   进入数据库 mongo 
👉 跨域 webpack代理
# build for production with minification
`npm run build`

# build for production and view the bundle analyzer report
`npm run build --report`
### 功能

#### 用户

- ✅ 登录注册
- ❎ 个人信息
- ✅ 头像生成

#### 聊天

- ✅ 多人聊天
- ❎ 单独聊天
- ✅ 在线人数
- ❎ 消息缓存

#### 系统

- ✅ 路由拦截


### 分支

- master 项目主分支
- vNext  开发测试分支