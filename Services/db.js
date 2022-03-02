const mongoose = require('mongoose')


// connection string
mongoose.connect('mongodb://localhost:27017/LanwareDB', {
    useNewUrlParser: true
})

// model creation
const User = mongoose.model('User', {
    admin:String,
    password:String,
    user:[],
    product: []
})

// export model
module.exports = {
    User
}