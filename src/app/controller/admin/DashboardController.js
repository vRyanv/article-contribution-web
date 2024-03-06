const {MagazineService, FacultyService, ArticleService, UserService} = require("../../service");
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
    }
}

module.exports = DashboardController