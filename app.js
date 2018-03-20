const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const public_view = '/public/view/';

server.listen(4005);

let totalPerson = 0;
app.get('/', function (req, res) {
    // res.status(200).send('欢迎！');
    res.sendFile(__dirname + `${public_view}index.html`);
});


// 连接
io.on('connection', (socket) => {
    totalPerson ++;
    console.log(new Date(),"客户端连接成功");


    socket.on('send-msg',function (data) {
        console.log(data);
    });

    io.emit('system', {  // 向所有用户广播该用户进入房间
        name: "one coming",
        status: '0'
    });

    io.emit('disUser', {
        num:totalPerson
    })



});



// 离开
io.on('disconnect', (socket) => {
    console.log(new Date(),"客户端断开连接");

});

// 错误
io.on('error', (socket) => {
    console.log(new Date(),"发送错误");
});

// 房间
// io.of('chat').on('connection',function(socket){
//     // 参数验证
//     // let query = socket.request._query;
//     // let uid = query.uid;
//     // console.log(uid);
//
//     console.log(new Date(),"客户端连接到 chat");
//     socket.broadcast.to('chat').emit('broadcast_data',{"msg": "dale coming ..."});
// });


