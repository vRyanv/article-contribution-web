//admin controller
const MagazineController = require('./admin/MagazineController')
const AccountController = require('./admin/AccountController')
const DashboardController = require('./admin/DashboardController')
const FacultyController = require('./admin/FacultyController')

//student controller
const ArticleStudentController = require('./student/ArticleStudentController')
const MagazineStudentController = require('./student/MagazineStudentController')


const CoordinatorController = require('./CoordinatorController')
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
    CommentController,
    CoordinatorController
}