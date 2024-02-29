const express = require('express')
const route = express.Router()

const {SecurityController} = require('../controller')

route.get('/sign-in', SecurityController.SignInPage)
route.post('/sign-in', SecurityController.SignIn)

module.exports = route