const {UserService} = require('../service')
const {StatusCode} = require("../constant");
const {DateUtil} = require("../utils");

const ProfileController = {
    async ProfilePage(req, res){
        const account = await UserService.GetProfileByUserId(req)
        if (!account) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
        account.birth_date = DateUtil.ConvertDate(account.birth_date, 'MM-dd-yyyy')
        const role = req.user.role

        const data = {
            page_title: 'Profile',
            account,
            role
        }
        return res.render(
            'profile/profile',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async UpdatePassword(req, res){
        const result_update = await UserService.UpdatePassword(req)

        if(result_update === StatusCode.NOT_FOUND){
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: `not found user with email: ${req.user.email}`})
        } else if(result_update === StatusCode.BAD_REQUEST){
            return res.status(200).json({code: StatusCode.BAD_REQUEST, message: `current password is wrong!`})
        } else if(result_update){
            return res.status(200).json({code: StatusCode.UPDATED, message: `Updated password successfully!`})
        }
        return res.status(200).json({code: StatusCode.BAD_REQUEST, message: `Updating password failed!`})
    }
}

module.exports = ProfileController