const express = require('express')
const route = express.Router()
const {MagazineCoordinatorController} = require('../../controller')

route.get('/', MagazineCoordinatorController.MagazinePage)
route.get('/detail/:magazine_id', MagazineCoordinatorController.MagazineDetailPage)


module.exports = route