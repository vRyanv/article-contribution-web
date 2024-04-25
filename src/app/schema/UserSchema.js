const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, default: 'user.svg'},
    full_name: {type: String, required: true},
    birth_date: {type: String, required: true},
    phone: {type: String, required: true},
    gender: {type: String, required: true},
    role: {type: String, required: true},
    start_year: {type: String, required: true},
    end_year: {type: String, required: true},
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    deleted: {type:Boolean, default: false},
    is_2fa_enable: {type: Boolean, default: false},
    secret: {type: String, required: true},
    OTP:  {type: String, default: ""}
}, {timestamps: true})

module.exports = UserSchema