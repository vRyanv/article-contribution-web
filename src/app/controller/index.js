//admin controller
const MagazineController = require('./admin/MagazineController')
const AccountController = require('./admin/AccountController')
const DashboardController = require('./admin/DashboardController')
const FacultyController = require('./admin/FacultyController')

//student controller
const ArticleStudentController = require('./student/ArticleStudentController')
const MagazineStudentController = require('./student/MagazineStudentController')

//coordinator
const ArticleCoordinatorController = require('./coordinator/ArticleCoordinatorController')
const MagazineCoordinatorController = require('./coordinator/MagazineCoordinatorController')

//marketing manager
const ArticleMarketingManagerController = require('./marketing-manager/ArticleMarketingManagerController')
const MagazineMarketingManagerController = require('./marketing-manager/MagazineMarketingManagerController')

//general
const DownloadFileController = require('./DownloadFileController')
const ProfileController = require('./ProfileController')
const ClientController = require('./ClientController')
const SecurityController = require('./SecurityController')
const CommentController = require('./CommentController')
const ChatController = require('./ChatController')
const GuestController = require('./GuestController')

module.exports = {
    ChatController,
    GuestController,
    ArticleMarketingManagerController,
    MagazineMarketingManagerController,
    ArticleStudentController,
    MagazineStudentController,
    ClientController,
    DashboardController,
    SecurityController,
    MagazineController,
    FacultyController,
    AccountController,
    DownloadFileController,
    CommentController,
    ArticleCoordinatorController,
    ProfileController,
    MagazineCoordinatorController
}