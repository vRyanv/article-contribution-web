const {Roles, StatusCode} = require("../constant");
const {ArticleService, MagazineService, FacultyService, CommentService, UserService} = require("../service");

const GuestController = {
    async GuestPage(req, res) {
        const faculty_id = req.user.faculty._id
        const article_list = await ArticleService.GetAllArticleAccepted()
        const magazine_list = await MagazineService.GetMagazineList()
        article_list.forEach(article => {
            const corresponding_magazine = magazine_list.find(
                magazine => magazine._id.toString() === article.magazine.toString()
                    && article.student.faculty._id.toString() === faculty_id.toString()
            );
            if (corresponding_magazine) {
                if (!corresponding_magazine.articles) {
                    corresponding_magazine.articles = [];
                }
                corresponding_magazine.articles.push(article);
            }
        });

        console.log(magazine_list)

        const data = {
            page_title: 'Contribution',
            role: Roles.GUEST,
            magazine_list
        }

        return res.render(
            'guest/contribute/contribute',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async Dashboard(req, res){
        const magazine_list = await MagazineService.GetMagazineList()
        const role = req.user.role

        const data = {
            page_title: 'Dashboard',
            magazine_list,
            role
        }
        return res.render(
            'guest/dashboard/dashboard',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async StatisticalContributionOfFaculty(req, res){
        const faculty_id = req.user.faculty._id
        console.log(faculty_id)
        const statistical_contribute_faculty_data = await ArticleService.StatisticalForContributeOfFacultyOfGuest(faculty_id)
        const faculty_name =  req.user.faculty.name
        console.log('statistical_contribute_faculty_data', statistical_contribute_faculty_data)
        return res.status(200).json({code:StatusCode.OK, faculty_name, statistical_contribute_faculty_data})
    },
    async StatisticalContributionOfYear(req, res){
        const faculty_id = req.user.faculty._id
        const statistical_Contribute_year_data = await ArticleService.StatisticalForContributeOfYearOfGuest(faculty_id)
        return res.status(200).json({code:StatusCode.OK, statistical_Contribute_year_data})
    }
}

module.exports = GuestController