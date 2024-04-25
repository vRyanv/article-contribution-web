const ArticleService = require('./ArticleService')
const MagazineService = require('./MagazineService')
const SecurityService = require('./SecurityService')
const FacultyService = require('./FacultyService')
const UserService = require('./UserService')
const CommentService = require('./CommentService')

//coordinator
const ArticleCoordinatorService = require('./coordinator/ArticleCoordinatorService')

module.exports = {
    ArticleService,
    SecurityService,
    MagazineService,
    FacultyService,
    UserService,
    ArticleCoordinatorService,
    CommentService
}