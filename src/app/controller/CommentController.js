const {CommentService} = require('../service')
const {BAD_REQUEST, CREATED} = require("../constant/StatusCode");

const CommentController = {
    async Create(req, res) {
        const result_create = await CommentService.Create(req)
        if (result_create) {
            const date = [
                result_create.createdAt.getMonth() + 1,
                result_create.createdAt.getDate(),
                result_create.createdAt.getFullYear()
            ].join('-')
            const comment = {
                user: {
                    full_name: req.user.full_name,
                    avatar: req.user.avatar,
                },
                content: result_create.content,
                date
            }
            return res.status(200).json({code: CREATED, comment, message: 'created comment successfully'})
        }
        return res.status(200).json({code: BAD_REQUEST, message: `creating comment failed!`})
    }
}

 module.exports = CommentController