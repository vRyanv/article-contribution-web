const mongoose = require("mongoose")
const Types = mongoose.Types
const {UserSchema} = require('../schema')
const {Roles} = require("../constant");
const User = mongoose.model("User", UserSchema)


const UserRepository = {
    FindMailOfCoordinator(){
        return User.findOne({role: Roles.COORDINATOR}).select('email').lean()
    },
    GetStudentQuantity(){
        return User.countDocuments({role: Roles.STUDENT})
    },
    Update(id, user){
        return User.updateOne({_id:id.toString(), deleted: false}, user).exec()
    },
    FindById(id){
        return User.findById(id).where({deleted: false}).populate('faculty').lean()
    },
    FindByEmail(email){
        return User.findOne({email, deleted: false}).populate('faculty').lean()
    },
    GetUserList(){
        return User.find({deleted:false})
            .populate('faculty')
            .lean()
    },
    Create(user){
        return User.create(user)
    },
    Delete(id){
        return User.updateOne({_id:id},{deleted:true})
    }
}

module.exports = UserRepository