const {UserService, FacultyService} = require("../../service");
const {Roles} = require('../../constant')
const {CREATED, BAD_REQUEST, UPDATED, DELETED} = require("../../constant/StatusCode");
const {DateUtil} = require("../../utils");
const AccountController = {
    async AccountManagementPage(req, res) {
        const account_list = await UserService.GetAccountList()
        const role = req.user.role
        const data = {
            page_title: 'Account',
            account_list,
            role
        }
        return res.render(
            'admin/account/account-management',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async NewAccountPage(req, res) {
        const role_list = [Roles.STUDENT, Roles.COORDINATOR, Roles.MARKETING_MANAGER]
        const faculty_list = await FacultyService.GetFacultyList()
        const role = req.user.role
        const data = {
            page_title: 'Account',
            role_list,
            faculty_list,
            role
        }
        return res.render(
            'admin/account/new-account',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async CreateAccount(req, res) {
        const account = await UserService.CreateAccount(req)
        if (account === 'user_existed') {
            return res.status(200).json({
                code: BAD_REQUEST,
                message: `Account already exists with email: ${req.body.email}`
            })
        } else if (account === 'invalid avatar') {
            return res.status(200).json({code: BAD_REQUEST, message: `Avatar must be an image`})
        } else if (account) {
            return res.status(200).json({code: CREATED, message: 'created account successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'creating account failed'})
    },
    async EditAccountPage(req, res) {
        const role_list = [Roles.STUDENT, Roles.COORDINATOR, Roles.MARKETING_MANAGER]
        const faculty_list = await FacultyService.GetFacultyList()
        const account = await UserService.GetAccountById(req)

        if (!account) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }

        account.birth_date = DateUtil.ConvertDate(account.birth_date, 'yyyy-MM-dd')
        const role = req.user.role
        const data = {
            page_title: 'Account',
            role_list,
            faculty_list,
            account,
            role
        }
        return res.render(
            'admin/account/edit-account',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    },
    async UpdateAccount(req, res) {
        const result_update = await UserService.UpdateAccount(req)
        if (result_update === 'not found user') {
            return res.status(200).json({code: BAD_REQUEST, message: `not found user with email: ${req.body.email}`})
        } else if (result_update) {
            return res.status(200).json({code: UPDATED, message: `updated account successfully`})
        }
        return res.status(200).json({code: BAD_REQUEST, message: 'updating account failed'})
    },
    async DeleteAccount(req, res) {
        const result_delete = await UserService.Delete(req)

        if (result_delete) {
            return res.status(200).json({code: DELETED, message: `deleted account successfully`})
        }
        return res.status(200).json({code: BAD_REQUEST, message: `deleting account failed`})
    },
    async DetailAccountPage(req, res) {
        const account = await UserService.GetAccountById(req)

        if (!account) {
            return res.render(
                'layout/not-found',
                {layout: false}
            )
        }
        const role = req.user.role
        const data = {
            page_title: 'Account',
            account,
            role
        }
        return res.render(
            'admin/account/detail-account',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    }
}

module.exports = AccountController