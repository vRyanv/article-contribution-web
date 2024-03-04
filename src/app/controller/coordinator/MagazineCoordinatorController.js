const {MagazineService} = require('../../service')

const MagazineCoordinatorController = {
    async MagazinePage(req, res){
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
    async MagazineDetail(req, res){
        console.log(123)
        const magazine = await MagazineService.GetMagazineDetail(req)

        if(!magazine){
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }

        const contribute_list = await MagazineService.GetContributeOfFaculty()
        const data = {
            page_title: 'Magazine',
            magazine,
            contribute_list
        }
        return res.render(
            'coordinator/magazine/magazine-detail',
            {layout: 'layout/portal/coordinator/portal', data}
        )
    }
}

module.exports = MagazineCoordinatorController