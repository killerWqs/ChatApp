let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users')

let db = mongoose.connection

db.on('err', console.error.bind(console, 'connection error:'))

db.on('open', function(callback) {
    console.log('mongodb connected')
})

let kittySchema = mongoose.Schema({
    name: String,
    pwd: String
})

kittySchema.methods.speak = function() {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name"
    
    console.log(greeting)
}

let Kitten = mongoose.model('kitty', kittySchema)

let silence = new Kitten({name: 'Silence', pwd: 'wert'})

// save
// silence.save((err, silence) => {
//     err ? console.log(err) :
//         silence.speak()
// })

// let jack = Kitten.create({name: 'jack'}): error

// let jack = new Kitten({name: 'jack'})

// jack.save((err, jack) => {
//     err ?  console.error(err) :
//         jack.speak()
// })

// find
// Kitten.find({ name: /Silence/ }, function(err, kittens) {
//     console.log(err ? err : kittens)
// })

//update

let id = '5a37aa73e7c2521f10aeb5de'
// Kitten.findById(id, function(err, tank) {

//     tank.name = 'silence'
//     tank.save((err) => {
//         //
//     })

// })

Kitten.update({_id: id }, { $set: { pwd: 'large' }}, (err, raw) => {
    console.log(raw)
})