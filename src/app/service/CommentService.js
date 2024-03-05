const {CommentRepository} = require('../repository')
const CommentService = {
    async Create(req){
        const user_id = req.user.id
        const {article_id, content} = req.body
        const comment = {
            user: user_id,
            article: article_id,
            content
        }

        try{
            return await CommentRepository.Create(comment)
        }catch (error){
            console.log(error)
            return false
        }
    },
    async CommentList(req){
        const {article_id} = req.params
        try{
            return await CommentRepository.GetCommentList(article_id)
        } catch (error){
            console.log(error)
            return null
        }
    }
}

module.exports = CommentService