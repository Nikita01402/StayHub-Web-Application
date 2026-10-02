const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new schema({
    email:{
        type:String,
        required:true
    }
})
//plugin for adding username,password,hashing,salting by-default
userSchema.plugin(passportLocalMongoose.default);

module.exports = mongoose.model("User", userSchema);