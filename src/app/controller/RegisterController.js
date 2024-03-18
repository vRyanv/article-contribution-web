const {UserService, FacultyService} = require("../service");
const {Roles} = require('../constant')
const {CREATED, BAD_REQUEST, UPDATED, DELETED} = require("../constant/StatusCode");
const {DateUtil} = require("../utils");


const RegisterController = {
    async NewRegisterPage(req, res) {
        const faculty_list = await FacultyService.GetFacultyList()
        const data = {
            page_title: 'Account',
            faculty_list,
            role: Roles.GUEST
        }
        return res.render(
            'register/register-page',
            {
                layout: false,
                data
            }
        )
    },
    async CreateRegister(req, res) {
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
}

module.exports = RegisterController