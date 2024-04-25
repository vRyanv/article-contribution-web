const {CommentService} = require('../service')
const {BAD_REQUEST, CREATED} = require("../constant/StatusCode");

const CommentController = {
    async Create(req, res) {
        const result_create = await CommentService.Create(req)
        if (result_create) {
            const date = [
                String(result_create.createdAt.getMonth() + 1).padStart(2, '0'),
                String(result_create.createdAt.getDate()).padStart(2, '0'),
                result_create.createdAt.getFullYear()
            ].join('-')
            const time = [
                String(result_create.createdAt.getHours()).padStart(2, '0'),
                String(result_create.createdAt.getMinutes()).padStart(2, '0'),
            ].join(':')
            const date_time =   time + ' ' + date

            const comment = {
                user: {
                    full_name: req.user.full_name,
                    avatar: req.user.avatar,
                },
                content: result_create.content,
                date_time
            }
            return res.status(200).json({code: CREATED, comment, message: 'created comment successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: `creating comment failed!`})
    }
}

 module.exports = CommentController