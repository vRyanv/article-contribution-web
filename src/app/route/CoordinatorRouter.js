const express = require('express')
const route = express.Router()
const {MagazineCoordinatorController} = require('../controller')

route.get('/magazine', MagazineCoordinatorController.MagazinePage)
route.get('/magazine/detail/:magazine_id', MagazineCoordinatorController.MagazineDetail)


module.exports = route