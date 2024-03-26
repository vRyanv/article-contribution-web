const {Roles} = require("../constant");
const {ArticleService, MagazineService, FacultyService} = require("../service");

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
    }
}

module.exports = GuestController