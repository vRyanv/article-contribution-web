const mongoose = require("mongoose")
const Types = mongoose.Types
const {UserSchema} = require('../schema')
const {Roles} = require("../constant");
const User = mongoose.model("User", UserSchema)


const UserRepository = {
    GetUserListForChat(roles){
        return User.find({role: {$in: roles}, deleted: false}).lean()
    },
    FindMailOfCoordinator(faculty_id){
        return User.findOne({
            role: Roles.COORDINATOR,
            faculty: faculty_id
        }).select('email').lean()
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
        const roles = [Roles.GUEST, Roles.MARKETING_MANAGER, Roles.STUDENT, Roles.COORDINATOR]
        return User.find({deleted:false})
            .where({role : { $in : roles}})
            .populate('faculty')
            .lean()
    },
    Create(user){
        return User.create(user)
    },
    CreateRegister(user){
        return User.create(user)
    },
    Delete(id){
        return User.updateOne({_id:id},{deleted:true})
    }
}

module.exports = UserRepository