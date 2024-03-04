const express = require('express')
const route = express.Router()

const {DashboardController} = require('../../controller')

route.get('/', DashboardController.DashboardPage)
route.get('/statistical', DashboardController.Statistical)

module.exports = route