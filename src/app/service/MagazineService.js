const {MagazineRepository} = require('../repository')
const {DateUtil} = require("../utils");

const MagazineService = {
    Create(req) {
        const magazine = {
            ...
                req.body
        }
        try {
            return MagazineRepository.Create(magazine)
        } catch (error) {
            return null
        }
    },
    GetMagazineList() {
        return MagazineRepository.GetMagazineList()
    },
    GetMagazineById(req) {
        const magazine_id = req.params.magazine_id
        return MagazineRepository.FindById(magazine_id)
    },
    async Update(req) {
        const magazine_id = req.body.magazine_id
        delete req.body.magazine_id
        const magazine = {
            ...
                req.body
        }
        try {
            await MagazineRepository.Update(magazine_id, magazine)
            return true
        } catch (error) {
            return false
        }
    },
    async Delete(req) {
        const magazine_id = req.body.magazine_id
        try {
            await MagazineRepository.Delete(magazine_id)
            return true
        } catch (error) {
            return false
        }
    },
    async GetMagazineStudentDetail(req) {
        const {magazine_id} = req.params
        let magazine
        try{
            magazine = await MagazineRepository.FindById(magazine_id)
        } catch (error){
            return null
        }
        if (!magazine) {
            return null
        }

        magazine.is_closure = DateUtil.IsPassedDate(magazine.closure_date)
        magazine.is_final_closure = DateUtil.IsPassedDate(magazine.final_closure_date)
        return magazine
    }
}

module.exports = MagazineService