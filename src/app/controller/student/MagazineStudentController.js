const {MagazineService, ArticleService} = require("../../service");
const MagazineStudentController = {
    async MagazinePage(req, res) {
        const magazine_list =  await MagazineService.GetMagazineList()
        const data = {
            page_title: 'Magazine',
            magazine_list
        }
        return res.render(
            'student/magazine/magazine-student',
            {
                layout: 'layout/portal/student/portal',
                data
            }
        )
    },
    async DetailMagazine(req, res) {
        const magazine = await MagazineService.GetMagazineDetail(req)

        if (!magazine) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }

        const contribute_list =  await ArticleService.GetStudentContributeListOfMagazine(req, magazine._id)
        const data = {
            page_title: 'Magazine',
            magazine,
            contribute_list
        }
        return res.render(
            'student/magazine/detail-magazine',
            {
                layout: 'layout/portal/student/portal',
                data
            }
        )
    }
}

module.exports = MagazineStudentController