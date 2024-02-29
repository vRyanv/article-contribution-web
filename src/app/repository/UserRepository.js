const mongoose = require("mongoose");

const UserSchema = require('../schema/UserSchema');
const User = mongoose.model("User", UserSchema);


const UserRepository = {
    FindByEmail(email){
        return User.findOne({email}).lean()
    }
}

module.exports = UserRepository