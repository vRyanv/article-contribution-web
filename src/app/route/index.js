const CoordinatorRouter = require('./CoordinatorRouter')
const StudentRouter = require('./StudentRouter')
const MarketingManagerRouter = require('./MarketingManagerRouter')
const AdminRouter = require('./AdminRouter')
const ClientRouter = require('./ClientRouter')
const SecurityRouter = require('./SecurityRouter')

const Auth = require('../middleware/Auth')
const {COORDINATOR, STUDENT, ADMIN, MARKETING_MANAGER} = require("../constant/Roles");

module.exports = (app) => {
    app.use('/security', SecurityRouter)

    app.use(
        '/student',
        (req, res, next) => Auth.Authorize(req, res, next,[STUDENT, ADMIN]),
        StudentRouter
    )
    app.use(
        '/coordinator',
        (req, res, next) => Auth.Authorize(req, res, next,[COORDINATOR, ADMIN]),
        CoordinatorRouter
    )

    app.use(
        '/marketing-manager',
        (req, res, next) => Auth.Authorize(req, res, next,[MARKETING_MANAGER, ADMIN]),
        MarketingManagerRouter
    )

    app.use(
        '/admin',
        (req, res, next) => Auth.Authorize(req, res, next,[ADMIN]),
        AdminRouter
    )

    app.use('/', ClientRouter)

    app.use('*', (req, res)=>{
        res.render('layout/not-found', {layout: false})
    })
}