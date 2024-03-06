const {MagazineService, ArticleService, FacultyService} = require("../../service");

const MagazineMarketingManagerController = {
    async MagazinePage(req, res){
        const magazine_list = await MagazineService.GetMagazineList()
        const role = req.user.role
        const data = {
            page_title: 'Magazine',
            magazine_list,
            role
        }
        return res.render(
            'marketing-manager/magazine/magazine-marketing-manager',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async MagazineDetail(req, res){
        const magazine = await MagazineService.GetMagazineDetail(req)

        if (!magazine) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }

        const faculty_list = await FacultyService.GetFacultyList()
        const contribute_list = await ArticleService.GetContributeForMarketingManager(req)

        contribute_list.forEach( article => {
            const corresponding_faculty = faculty_list.find(
                faculty => faculty._id.toString() === article.student.faculty.toString()
            )
            if (corresponding_faculty) {
                if (!corresponding_faculty.contributes) {
                    corresponding_faculty.contributes = [];
                }
                corresponding_faculty.contributes.push(article);
            }
        })

        const role = req.user.role
        const data = {
            page_title: 'Magazine',
            magazine,
            faculty_list,
            role
        }
        return res.render(
            'marketing-manager/magazine/magazine-detail-marketing-manager',
            {layout: 'layout/portal/portal', data}
        )
    }
}

module.exports = MagazineMarketingManagerController