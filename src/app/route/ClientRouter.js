const express = require('express')
const route = express.Router()

const {ClientController} = require('../controller')

route.get('/', ClientController.HomePage)

module.exports = route