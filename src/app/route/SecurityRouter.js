const express = require('express')
const route = express.Router()

const {SecurityController} = require('../controller')

route.get('/sign-in', SecurityController.SignInPage)
route.post('/sign-in', SecurityController.SignIn)
route.post('/forgot-pass', SecurityController.ForgotPass)
route.get('/reset-password/:email', SecurityController.ResetPasswordPage)
route.post('/reset-password', SecurityController.ResetPassword)

module.exports = route