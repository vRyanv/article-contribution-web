const express = require('express')
const route = express.Router()

const MagazineRouter = require('./MagazineRouter')
const AccountRouter = require('./AccountRouter')
const FacultyRouter = require('./FacultyRouter')
const DashboardRouter = require('./DashboardRouter')


route.use('/dashboard', DashboardRouter)
route.use('/magazine', MagazineRouter)
route.use('/account', AccountRouter)
route.use('/faculty', FacultyRouter)
route.use('/profile', MagazineRouter)



module.exports = route