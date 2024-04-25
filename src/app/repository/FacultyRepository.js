const mongoose = require("mongoose");
const {FacultySchema} = require("../schema");
const Faculty = mongoose.model("Faculty", FacultySchema);

const FacultyRepository = {
    FindById(id) {
        return Faculty.findOne({_id: id}).lean()
    },
    Create(faculty) {
        return Faculty.create(faculty)
    },
    FacultyList() {
        return Faculty.find({}).lean()
    },
    Update(id, name) {
        return Faculty.updateOne({_id: id}, {name}).lean()
    },
    Delete(id) {
        return Faculty.deleteOne({_id:id}).exec()
    }
}

module.exports = FacultyRepository