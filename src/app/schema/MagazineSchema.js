const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MagazineSchema = new Schema({
    closure_date: {type:String, require: true},
    final_closure_date: {type:String, require: true},
    title: {type:String, require: true},
    end_academic_year: {type:String, require: true},
    start_academic_year: {type:String, require: true},
    description: {type:String, require: true},
    deleted: {type: Boolean, default: false}
},{timestamps: true})

module.exports = MagazineSchema