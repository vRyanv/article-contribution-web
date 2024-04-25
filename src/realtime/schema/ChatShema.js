const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {type: String, required: true},
        time: {type: Date, require: true},
    }]
}, {timestamps: true})

module.exports = ChatSchema