const mongooose = require('mongoose')


const userSchema = new mongooose.Schema({
    name : String,
    email  : {
        type : String,
        unique : true

    },
    password : String
})


const userModel = mongooose.model('user', userSchema)



module.exports = userModel 