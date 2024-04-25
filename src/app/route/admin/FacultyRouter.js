const express = require('express')
const route = express.Router()

const {FacultyController} = require('../../controller')

route.get('/', FacultyController.FacultyManagementPage)
route.get('/new', FacultyController.NewFacultyPage)
route.post('/new', FacultyController.CreateFaculty)

route.get('/edit/:faculty_id', FacultyController.EditFacultyPage)
route.put('/update', FacultyController.UpdateFaculty)

route.delete('/delete', FacultyController.DeleteFaculty)

module.exports = route