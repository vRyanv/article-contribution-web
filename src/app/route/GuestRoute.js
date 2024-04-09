const express = require('express')
const route = express.Router()

const {GuestController} = require('../controller')

route.get('/', GuestController.GuestPage)
route.get('/dashboard', GuestController.Dashboard)
route.get('/dashboard/statistical-contribution-faculty/:magazine_id', GuestController.StatisticalContributionOfFaculty)
route.get('/dashboard/statistical-contribution-years', GuestController.StatisticalContributionOfYear)

module.exports = route