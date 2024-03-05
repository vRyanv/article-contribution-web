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

const DownloadFileController = require('./DownloadFileController')
const ClientController = require('./ClientController')
const SecurityController = require('./SecurityController')

const CommentController = require('./CommentController')

module.exports = {
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
    MagazineCoordinatorController
}