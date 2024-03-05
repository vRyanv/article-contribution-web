const {MagazineService, ArticleService} = require('../../service')

const MagazineCoordinatorController = {
    async MagazinePage(req, res) {
        const magazine_list = await MagazineService.GetMagazineList()

        const data = {
            page_title: 'Magazine',
            magazine_list
        }
        return res.render(
            'coordinator/magazine/magazine-coordinator',
            {
                layout: 'layout/portal/coordinator/portal',
                data
            }
        )
    },
    async MagazineDetailPage(req, res) {
        const magazine = await MagazineService.GetMagazineDetail(req)

        if (!magazine) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
        const faculty_name = req.user.faculty.name
        const contribute_list = await ArticleService.GetArticleListForCoordinator(req)
        const data = {
            page_title: 'Magazine',
            magazine,
            contribute_list,
            faculty_name
        }
        return res.render(
            'coordinator/magazine/magazine-detail-coordinator',
            {layout: 'layout/portal/coordinator/portal', data}
        )
    }
}

module.exports = MagazineCoordinatorController