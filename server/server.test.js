// process.env.NODE_ENV = 'production'

const app = require('express')()
const session = require('express-session')
const store = require('memorystore')(session)
// let store = session.MemoryStore

app.use(session({
    secret: 'test',
    saveUninitialized: true,
    resave: true,
    store: new store({
        checkPeriod: 86400000
    }),
    cookie: {
        path: '/path/hhh'
    }
}))

app.get('/', (req, res) => {
    if(!req.session || !req.session.cookie) {
        res.write('no cookie send!')
    }
    res.status(200)
    res.end('hello')
})

app.get('/path/hhh', (req, res) => {
    if(req.session.visited) {
        res.end('welcome again')
    }else {
        req.session.visited = true
        res.end('welcome my friend')
    }
    // req.sessionStore.get(req.sessionID, (err, session) => {
    //     console.log(session, session == req.session);
    // })
})

app.listen(80, '0.0.0.0', () => {
    console.log('listening')
})