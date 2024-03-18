const express = require('express')
const route = express.Router()

const {RegisterController} = require('../controller')

route.get('/', RegisterController.NewRegisterPage)
route.get('/create', RegisterController.CreateRegister)


module.exports = route