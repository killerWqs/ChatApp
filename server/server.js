const express = require('express')
const session = require('express-session')
const memoryStore = require('memorystore')(session)
const bodyParser = require('body-parser')

const app = express();
let server = require('http').Server(app)
let io = require('socket.io')(server)

const signInHandle = require('./src/signInHandle')
const messageHandle = require('./src/messageHandle')
const friendHandle = require('./src/friendHandle')
const refresh = require('./src/refresh')
const verfiyId = require('./src/verifyId')
const fileHandle = require('./src/fileHandle')

let store = {} // memory store

app.use(bodyParser.json({type: 'application/*+json'}))

// session info 用户信息保存

app.use(session({
    secret: 'chatapp',
    store: new memoryStore({
        checkPeriod: 86400000
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/chatapp/signin'
    },
    output: store
}))

// session state 用户状态信息保存

// app.use(session({
//     secret: 'chatapp',
//     store: new memoryStore({
//         checkPeriod: 86400000
//     }),
//     name: 'state',
//     saveUninitialized
// }))

io.on('connection', (socket) => {
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // });

    // add socket to store
    // 如何知道这个socket身份 自定义验证
    let verified = false
    socket.on('verifyId', (id) => {
        let session = store.get(id)
        if(session) {
            session.socket = this
            verified = true
        }else {
            verified = false
        }
    })
    

    socket.on('message', (mes) => {
        // this 代指 socket
        handleMessage(mes, store)
    })
  });

// 处理登录注册
app.get('/signin/:type', signInHandle)

// 处理发送信息
// 使用socket.io处理

app.get('/verifyId', verfiyId)

// 添加好友
// :type add remove
app.get('/friend/:type', friendHandle())

// refresh friends state
app.get('/refresh', refresh())

app.post('/file/:type', fileHandle())

app.listen(80, '0.0.0.0', function() {
    console.log('listening...')
})