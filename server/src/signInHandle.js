// 处理登录注册， 使用mongodb
console.log(Object.keys(module))
const mongoose = require('mongoose')

exports = module.exports = signInHandle;

function signInHandle(req, res) {
    switch(req.params.type)
    {
        case 'signin':
            signIn(req, res)
            return
        case 'register':
            register(req, res)
            return
        default:
            let err = new Error("path err")
            handleErr(err)
    }
    
}

signIn = (req, res) => {

    let userSchema = mongoose.Schema({
        name: string,
        pwd: string
    })

    let User = mongoose.model('user', userSchema)

    mongoose.connect('mongodb://localhost/user')
    db = mongoose.connection
    db.on('err', (err) => {
        handleErr(err)
    })

    db.on('open', () => {
        let name = req.body.name
        let nameRegExp = new RegExp( '/' + name + '/', i);
        User.find({ name: nameRegExp },(err, data) => {
            if(err) return console.error(err)
            if(data !== null) {
                if(data[pwd] === req.body.pwd) {
                    // store sessions
                    delete data[pwd]
                    req.session = data
                    res.set('content-type', 'application/json')
                    res.status(200).end(data)
                }                
            }
        })
    })
}

register = (req, res) => {
    let userSchema = mongoose.Schema({
        name: string,
        pwd: string
    })
    let User = mongoose.model('user', userSchema)

    mongoose.connect('mongodb://localhost/user')

    db = mongoose.connection
    db.on('err', (err) => {
        handleErr(err)
    })

    db.on('open', () => {
        let user = new User(req.body.toString())
        user.save((err, user) => {
            if(err) handleErr(err)
        })
    })
}

handleErr = (err) => {
    console.log(err)
}


