const {ArticleRepository}  = require('../../repository')
const {DateUtil} = require("../../utils");

const ArticleCoordinatorService = {
    async GetFilesByArticleId(req) {
        let {article_id} = req.params
        try{
            const article = await ArticleRepository.GetAllFilesOfArticleById(article_id)

            if(article){
                return article
            }
            return null
        } catch (error){
            return null
        }
    },
    async AcceptArticle(req){
        const {article_id, status} = req.body
        try{
            return await ArticleRepository.UpdateArticleStatus(article_id, status)
        }catch (error){
            return false
        }
    },
    async GetArticleDetail(req){
        const {article_id} = req.params
        let article
        try {
            article = await ArticleRepository.FindById(article_id)
        } catch (error){
            return null
        }

        if(!article){
            return null
        }

        const magazine = article.magazine
        magazine.is_closure = DateUtil.IsPassedDate(magazine.closure_date)
        magazine.is_final_closure = DateUtil.IsPassedDate(magazine.final_closure_date)
        article.days_left_to_comment = DateUtil.NumberOfDaysRemaining(article.createdAt.toString(), 14)
        return article
    }
}

module.exports = ArticleCoordinatorService

