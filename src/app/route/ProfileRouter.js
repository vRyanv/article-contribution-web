const express = require('express')
const route = express.Router()

const {ProfileController} = require('../controller')

route.get('/', ProfileController.ProfilePage)
route.put('/update-password', ProfileController.UpdatePassword)

module.exports = route