const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test')

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// 跨域
const cors = require('cors')
// 加密
const crypto = require('crypto');

// hash.update('Hello, nodejs!');

//数据库model
var User = require('./Model/User.js')


const index = require('./router/index')
// const movie = require('./router/movie')

const bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())

//cors跨域
app.use(cors())

app.use('/', index)
// app.use('/api', movie)

function getuserId(){
    var result=''
    for(var i=0; i<32; i++) {
      result += Math.floor(Math.random()*16).toString(16)//获取0-15并通过toString转16进制
    }
    return result
  }

// 登录用户
app.post('/api/login', function(req, res) {
    const hash = crypto.createHash('md5');

    const data = req.body;
    data.password  = hash.update(data.password).digest('hex')
    User.findOne({username: data.username,password: data.password}, (err, user) => {
      if (err) {
        console.log('login err')
        return
      }
      if (user) {
        res.json({
          ret: true,
          data: {
            stateText: '登录成功！',
            userId: user.userId,
            username: user.username
          }
        })
      }else{
        res.json({
          ret: false,
          data: {
            stateText: '用户名或者密码错误！'
          },
          errmsg: '用户名或者密码错误！'
        })
      }
    })
  })

// 注册用户
app.post('/api/register', function(req, res) {
    const hash = crypto.createHash('md5');
    const userInfo = req.body
    //设置userId
    userInfo.userId = getuserId()
    User.findOne({username: userInfo.username}, (err, user) => {
      if (err){
        console.log('find user error!')
      }
      console.log(user)
      if (user) {
        res.json({
          ret: false,
          data: {
            stateText: '用户已存在!'
          },
          errmsg: "用户已存在"
        })
      }else {
        // 密码加密
        userInfo.password  = hash.update(userInfo.password).digest('hex')
        let user=new User(userInfo)
        user.save(function(err) {
          if (err) {
            console.log('Inser user error!')
            return
          }
          res.json({
            ret: true,
            data: {
              stateText: '注册成功！'
            }
          })
        })
      }
    })
  })


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('room', (info) => {
        // 添加到房间
        // socket.join(info.roomId)
        console.log(info)
        let joinInfo = {
          status: 1,
          text: '后端'
        }
        socket.emit('room', joinInfo)
    });

    socket.on('chat-msg', (msg) => {
        console.log(msg)
    })
});

http.listen(4005, function () {
    console.log('listening on *:4005');
});