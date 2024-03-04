const mongoose = require("mongoose");
const {MagazineSchema} = require("../schema");
const Magazine = mongoose.model("Magazine", MagazineSchema);

const MagazineRepository = {
    Create(magazine){
        return Magazine.create(magazine);
    },
    GetMagazineList(){
        return Magazine.find({deleted:false})
            .sort({start_academic_year: 'desc'})
            .lean()
    },
    FindById(id){
        return Magazine.findById(id).where({deleted:false}).lean()
    },
    Update(id, magazine){
        return Magazine.updateOne({_id:id, deleted:false}, magazine)
    },
    Delete(id){
        return Magazine.updateOne({_id:id},{deleted: true})
    },
}

module.exports = MagazineRepository