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
const GuestRoute = require('./GuestRoute')
const RegisterRouter = require('./RegisterRoute')
const TwoFactorAuthRouter = require('./TwoFactorAuthRouter')


const Auth = require('../middleware/Auth')
const {COORDINATOR, STUDENT, ADMIN, MARKETING_MANAGER, GUEST} = require("../constant/Roles");
const DashboardRouter = require("./admin/DashboardRouter");

module.exports = (app) => {
    app.get('/', (req, res) => {
        return res.render(
            'index',
            {
                layout: false
            }
        )
    })

    app.get('/help-center', (req, res) => {
        return res.render(
            'help/help-center',
            {
                layout: false
            }
        )
    })

    app.use('/security', SecurityRouter)
    app.use('/register', RegisterRouter)

    app.use(
        '/student',
        (req, res, next) => Auth.Authorize(req, res, next, [STUDENT]),
        StudentRouter
    )
    app.use(
        '/guest',
        (req, res, next) => Auth.Authorize(req, res, next, [GUEST, STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN]),
        GuestRoute
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
        '/dashboard',
        (req, res, next) => Auth.Authorize(req, res, next, [GUEST, ADMIN]),
        DashboardRouter
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
        (req, res, next) => Auth.Authorize(req, res, next, [GUEST, STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN]),
        ProfileRouter
    )

    app.use(
        '/chat',
        (req, res, next) => Auth.Authorize(req, res, next, [STUDENT, COORDINATOR, MARKETING_MANAGER, ADMIN]),
        ChatRouter
    )

    app.use(
        '/two-factor-authentication',
        TwoFactorAuthRouter
    )

    app.use('*', (req, res) => {
        res.render('layout/not-found', {layout: false})
    })
}