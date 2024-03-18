const express = require('express')
const route = express.Router()

const {GuestController} = require('../controller')

route.get('/', GuestController.GuestPage)

module.exports = route