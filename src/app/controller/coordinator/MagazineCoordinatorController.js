const {MagazineService, ArticleService} = require('../../service')

const MagazineCoordinatorController = {
    async MagazinePage(req, res) {
        const magazine_list = await MagazineService.GetMagazineList()
        const role = req.user.role
        const data = {
            page_title: 'Magazine',
            magazine_list,
            role
        }
        return res.render(
            'coordinator/magazine/magazine-coordinator',
            {
                layout: 'layout/portal/portal',
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
        const role = req.user.role
        const data = {
            page_title: 'Magazine',
            magazine,
            contribute_list,
            faculty_name,
            role
        }
        return res.render(
            'coordinator/magazine/magazine-detail-coordinator',
            {layout: 'layout/portal/portal', data}
        )
    }
}

module.exports = MagazineCoordinatorController