const {MagazineService} = require('../../service')
const {BAD_REQUEST, CREATED, UPDATED, DELETED} = require("../../constant/StatusCode");
const {DateUtil} = require('../../utils')

const MagazineController = {
    async MagazineManagementPage(req, res){
        const magazine_list = await MagazineService.GetMagazineList()
        const role = req.user.role
        const data = {
            page_title: 'Magazine',
            magazine_list,
            role
        }
        return res.render(
            'admin/magazine/magazine-management',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    NewMagazinePage(req, res){
        const role = req.user.role
        const data = {
            page_title: 'Magazine',
            role
        }
        return res.render(
            'admin/magazine/new-magazine',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    CreateMagazine(req, res){
        const magazine = MagazineService.Create(req)
        if(magazine){
            return res.status(200).json({code:CREATED, message: 'created magazine successfully'})
        }
        return res.status(200).json({code:BAD_REQUEST, message: 'creating magazine failed'})
    },
    async EditMagazinePage(req, res){
        const magazine = await MagazineService.GetMagazineById(req)
        const role = req.user.role
        if(!magazine){
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
        magazine.closure_date = DateUtil.ConvertDate(magazine.closure_date, 'yyyy-MM-dd')
        magazine.final_closure_date = DateUtil.ConvertDate(magazine.final_closure_date, 'yyyy-MM-dd')

        const data = {
            page_title: 'Magazine',
            magazine,
            role
        }
        return res.render(
            'admin/magazine/edit-magazine',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async UpdateMagazine(req, res){
        const result_update = await MagazineService.Update(req)
        if(result_update){
            return res.status(200).json({code:UPDATED, message: 'updated magazine successfully'})
        }
        return res.status(200).json({code:BAD_REQUEST, message: 'updated magazine failed'})
    },
    async DeleteMagazine(req, res){
        const result_delete = await MagazineService.Delete(req)
        if(result_delete){
            return res.status(200).json({code:DELETED, message: 'delete magazine successfully'})
        }
        return res.status(200).json({code:BAD_REQUEST, message: 'delete magazine failed'})
    }
}

module.exports = MagazineController