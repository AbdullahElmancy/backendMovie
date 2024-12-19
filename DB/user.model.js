const mongoose = require('mongoose');
const becrypt = require('bcrypt');
const saltRound = process.env.SALTROUND
const userSchema = new mongoose.Schema({
    first_name:String,
    email:{type:String,required:true},
    last_name:String,
    password:{type:String,required:true},
    age:String
})
userSchema.pre('save',function(next){
    this.password = becrypt.hashSync(this.password,parseInt(saltRound))
    next()
} )

const userModel = mongoose.model('user',userSchema)

module.exports = userModel