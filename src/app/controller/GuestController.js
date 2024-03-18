const { Roles } = require("../constant");
const {ArticleService, MagazineService, FacultyService} = require("../service");

    const GuestController ={
        async GuestPage(req, res) {
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

        // combine_magazines.map(magazine => {
        //     console.log('======faculty======')
        //     console.log(magazine.faculties)
        //     console.log('======articles======')
        //     magazine.faculties.map(articles => {
        //         console.log(articles)
        //     })
        //     console.log('============')
        // })

        const data = {
            page_title: 'Guest',
            combine_magazines,
            role: Roles.GUEST
        }
        console.log('ádf');
        return res.render(
            'guest/home',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    }
}

module.exports = GuestController