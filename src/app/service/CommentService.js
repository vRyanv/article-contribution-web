const {CommentRepository} = require('../repository')
const CommentService = {
    async Create(req) {
        const user_id = req.user.id
        const {article_id, content} = req.body
        const comment = {
            user: user_id,
            article: article_id,
            content
        }

        try {
            return await CommentRepository.Create(comment)
        } catch (error) {
            console.log(error)
            return false
        }
    },
    async CommentList(req) {
        const {article_id} = req.params
        try {
            const comment_list = await CommentRepository.GetCommentList(article_id)
            if (comment_list) {
                comment_list.map(comment => {
                    const date = [
                        String(comment.createdAt.getMonth() + 1).padStart(2, '0'),
                        String(comment.createdAt.getDate()).padStart(2, '0'),
                        comment.createdAt.getFullYear()
                    ].join('-')
                    const time = [
                        String(comment.createdAt.getHours()).padStart(2, '0'),
                        String(comment.createdAt.getMinutes()).padStart(2, '0'),
                    ].join(':')
                    comment.datetime = time + ' ' + date
                })

            }
            return comment_list
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = CommentService