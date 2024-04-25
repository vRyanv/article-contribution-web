const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {type: String, required: true}
}, {timestamps: true})

module.exports = CommentSchema