const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {ArticleStatus} = require('../constant')

const ArticleSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    magazine:   {
        type: Schema.Types.ObjectId,
        ref: 'Magazine',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: {type: String, required: true},
    files: {type:Array, required: true},
    accept_date: {type: String, required: false},
    status: {type: String, default: ArticleStatus.QUEUE}
}, {timestamps: true})

module.exports = ArticleSchema