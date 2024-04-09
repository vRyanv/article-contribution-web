const {CommentRepository, ArticleRepository} = require('../repository')
const {DateUtil} = require("../utils");
const CommentService = {
    async ArticleExceptionCommentQuantity(magazine_id) {
        // article comment
        let article_comment = await CommentRepository.GetArticleComment()
        if (magazine_id !== 'all') {
            article_comment = article_comment.filter(artilce => {
                return artilce.magazine.toString() === magazine_id
            })
        }
        const article_comment_quantity = article_comment.length

        //article not comment
        let article_list = await ArticleRepository.GetAllArticle()
        if (magazine_id !== 'all') {
            article_list = article_list.filter(article => {
                return article.magazine.toString() === magazine_id
            })
        }

        const id_article_not_comment = article_comment.map(id => {
            return id.toString()
        })
        const article_not_comment_list = article_list.filter(article => {
            const number_of_date_remain = DateUtil.NumberOfDaysRemaining(article.createdAt, 14)
            return !id_article_not_comment.includes(article._id.toString()) && number_of_date_remain <= 0
        })

        return {
            article_comment_quantity,
            article_not_comment_after_14_day_quantity: article_not_comment_list.length
        }
    },
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