const express = require('express')
const route = express.Router()

const {DashboardController} = require('../../controller')

route.get('/', DashboardController.DashboardPage)
route.get('/statistical-contribution-faculties/:magazine_id', DashboardController.StatisticalContributionOfFaculty)
route.get('/statistical-contribution-years/:faculty_id', DashboardController.StatisticalContributionOfYear)
route.get('/statistical-exception-comment/:magazine_id', DashboardController.StatisticalExceptionComment)

module.exports = route