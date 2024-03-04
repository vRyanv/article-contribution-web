const express = require('express')
const route = express.Router()

const {MagazineStudentController} = require('../../controller')

route.get('/', MagazineStudentController.MagazinePage)
route.get('/detail/:magazine_id', MagazineStudentController.DetailMagazine)

module.exports = route