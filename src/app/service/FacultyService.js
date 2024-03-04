const {FacultyRepository} = require('../repository')

const FacultyService = {
    Create(req) {
        try {
            return FacultyRepository.Create({...req.body})
        } catch (error) {
            return false
        }
    },
    GetFacultyList(){
        return FacultyRepository.FacultyList()
    },
    GetFacultyById(req){
        const {faculty_id} = req.params
        return FacultyRepository.FindById(faculty_id)
    },
    Update(req){
        const {faculty_id, name} = req.body
        try {
            return FacultyRepository.Update(faculty_id, name)
        } catch (error){
            return false
        }
    },
    Delete(req){
        const {faculty_id} = req.body
        try{
            return FacultyRepository.Delete(faculty_id)
        } catch (error){
            return false
        }
    }
}

module.exports = FacultyService