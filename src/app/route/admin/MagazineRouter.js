const express = require('express')
const route = express.Router()

const {MagazineController} = require('../../controller')

route.get('/', MagazineController.MagazineManagementPage)

route.get('/new', MagazineController.NewMagazinePage)
route.post('/new', MagazineController.CreateMagazine)

route.get('/edit/:magazine_id', MagazineController.EditMagazinePage)
route.put('/update', MagazineController.UpdateMagazine)

route.delete('/delete', MagazineController.DeleteMagazine)

module.exports = route