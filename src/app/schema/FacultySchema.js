const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FacultySchema = new Schema({
    name: {type: String, require: true}
}, {timestamps: true})

module.exports = FacultySchema