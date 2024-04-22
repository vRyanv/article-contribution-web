const {MagazineService, FacultyService, ArticleService, UserService, CommentService} = require("../../service");
const {StatusCode} = require("../../constant");
const DashboardController = {
    async DashboardPage(req, res) {
        const magazine_list = await MagazineService.GetMagazineList()
        const faculty_list = await FacultyService.GetFacultyList()
        const all_student_quantity = await UserService.CountStudentQuantity()
        const all_contribute_quantity = await ArticleService.CountArticleQuantity()
        const role = req.user.role

        const data = {
            page_title: 'Dashboard',
            magazine_list,
            faculty_list,
            all_student_quantity,
            all_contribute_quantity,
            role
        }
        return res.render(
            'admin/dashboard/dashboard',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async StatisticalContributionOfFaculty(req, res){
        const statistical_contribute_faculty_data = await ArticleService.StatisticalForContributeOfFaculty(req)
        return res.status(200).json({code:StatusCode.OK, statistical_contribute_faculty_data})
    },
    async StatisticalContributionOfYear(req, res){
        const statistical_Contribute_year_data = await ArticleService.StatisticalForContributeOfYear(req)
        return res.status(200).json({code:StatusCode.OK, statistical_Contribute_year_data})
    },
    async StatisticalExceptionComment(req, res){
        const {magazine_id} = req.params
      
        const article_without_comment_quantity = await CommentService.ArticleWithoutCommentQuantity(magazine_id)
        const article_not_comment_after_14_day_quantity = await CommentService.ArticleWithoutCommentAfater14Quantity(magazine_id)
        return res.status(200).json({code:StatusCode.OK, article_without_comment_quantity, article_not_comment_after_14_day_quantity})
    },
    async StatisticalContributor(req, res){
        const {magazine_id} = req.params
        const statistical_contributor = await ArticleService.GetAllContributors(magazine_id)
        return res.status(200).json({code:StatusCode.OK, statistical_contributor})
    }
}

module.exports = DashboardController