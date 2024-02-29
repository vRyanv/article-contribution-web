const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    logo:{
        name: {type: String, required: true},
        size: {type: Number, required: true}
    },
    deleted: {type:Boolean, default: false}
}, {timestamps: true})

module.exports = UserSchema