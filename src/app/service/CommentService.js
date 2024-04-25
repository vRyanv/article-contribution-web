const {CommentRepository, ArticleRepository} = require('../repository')
const {DateUtil} = require("../utils");
const CommentService = {
    async ArticleWithoutCommentQuantity(magazine_id) {
        let article_list = await ArticleRepository.GetAllArticle()
        let article_comment = await CommentRepository.GetArticleComment()
        const article_comment_id = []
        article_comment.map(art_cmt => {
            article_comment_id.push(art_cmt._id.toString())
        })

        article_list = article_list.filter(artilce => {
            return !article_comment_id.includes(artilce._id.toString()) 
        })

        article_list =  article_list.filter(article => {
            const number_of_date_remain = DateUtil.NumberOfDaysRemaining(article.createdAt, 14)
            return number_of_date_remain >= 0
        })

        if (magazine_id !== 'all') {
            article_list = article_list.filter(artilce => {
                return artilce.magazine.toString() === magazine_id
            })
        }
        return article_list.length
    },
    async ArticleWithoutCommentAfater14Quantity(magazine_id) {
        let article_list = await ArticleRepository.GetAllArticle()
        let article_comment = await CommentRepository.GetArticleComment()
        const article_comment_id = []
        article_comment.map(art_cmt => {
            article_comment_id.push(art_cmt._id.toString())
        })

        article_list = article_list.filter(artilce => {
            return !article_comment_id.includes(artilce._id.toString())
        })
    
        article_list =  article_list.filter(article => {
            const number_of_date_remain = DateUtil.NumberOfDaysRemaining(article.createdAt, 14)
            return number_of_date_remain <= 0
        })
        if (magazine_id !== 'all') {
            article_list = article_list.filter(artilce => {
                return artilce.magazine.toString() === magazine_id
            })
        }
        return article_list.length

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