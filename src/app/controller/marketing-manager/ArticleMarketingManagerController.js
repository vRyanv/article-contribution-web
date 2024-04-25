const {ArticleCoordinatorService, ArticleService, MagazineService, FacultyService} = require("../../service");
const ArticleMarketingManagerController = {
    async ArticlePage(req, res) {

        const contribute_list = await ArticleService.GetAllContributeForMarketingManager()
        const magazine_list = await MagazineService.GetMagazineList()
        const faculty_list = await FacultyService.GetFacultyList()

        let combine_magazines = []
        magazine_list.forEach(magazine => {
            let faculties = []
            faculty_list.map(faculty =>{
                    const article_belong = contribute_list.filter(article => {
                        return article.student.faculty.toString() === faculty._id.toString() && magazine._id.toString() === article.magazine.toString()
                    })
                faculties.push({
                    ...faculty,
                    articles: article_belong
                })
            })

            combine_magazines.push({
                ...magazine,
                faculties: faculties
            })
        })

        combine_magazines.map(magazine => {
            console.log('======faculty======')
            console.log(magazine.faculties)
            console.log('======articles======')
            magazine.faculties.map(articles => {
                console.log(articles)
            })
            console.log('============')
        })

        const role = req.user.role
        const data = {
            page_title: 'Contribution',
            combine_magazines,
            role
        }
        return res.render(
            'marketing-manager/article/management/article-management-marketing-manager',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async ArticleDetailPage(req, res) {
        const article = await ArticleCoordinatorService.GetArticleDetail(req)
        const role = req.user.role
        const data = {
            page_title: 'Contribution',
            article,
            role
        }
        return res.render(
            'marketing-manager/article/detail/article-detail-marketing-manager',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    }
}

module.exports = ArticleMarketingManagerController