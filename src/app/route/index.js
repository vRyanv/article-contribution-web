const CoordinatorRouter = require('./coordinator')
const StudentRouter = require('./student')
const MarketingManagerRouter = require('./marketing-manager')
const AdminRouter = require('./admin')
const ClientRouter = require('./ClientRouter')
const SecurityRouter = require('./SecurityRouter')
const CommentRouter = require('./CommentRouter')
const DownloadRouter = require('./DownloadRouter')
const ProfileRouter = require('./ProfileRouter')
const ChatRouter = require('./ChatRouter')

const Auth = require('../middleware/Auth')
const {COORDINATOR, STUDENT, ADMIN, MARKETING_MANAGER} = require("../constant/Roles");

module.exports = (app) => {
    app.use('/security', SecurityRouter)

    app.use(
        '/student',
        (req, res, next) => Auth.Authorize(req, res, next, [STUDENT]),
        StudentRouter
    )
    app.use(
        '/coordinator',
        (req, res, next) => Auth.Authorize(req, res, next, [COORDINATOR]),
        CoordinatorRouter
    )

    app.use(
        '/marketing-manager',
        (req, res, next) => Auth.Authorize(req, res, next, [MARKETING_MANAGER]),
        MarketingManagerRouter
    )

    app.use(
        '/admin',
        (req, res, next) => Auth.Authorize(req, res, next, [ADMIN]),
        AdminRouter
    )

    app.use(
        '/comment',
        (req, res, next) => Auth.Authorize(req, res, next, [STUDENT, COORDINATOR]),
        CommentRouter
    )

    app.use(
        '/download',
        (req, res, next) => Auth.Authorize(req, res, next, [MARKETING_MANAGER, COORDINATOR]),
        DownloadRouter
    )

    app.use(
        '/profile',
        (req, res, next) => Auth.Authorize(req, res, next, [STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN]),
        ProfileRouter
    )

    app.use(
        '/chat',
        (req, res, next) => Auth.Authorize(req, res, next, [STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN]),
        ChatRouter
    )

    app.use('*', (req, res) => {
        res.render('layout/not-found', {layout: false})
    })
}