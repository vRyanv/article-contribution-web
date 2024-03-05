const {ArticleCoordinatorService, CommentService} = require('../../service')
const {BAD_REQUEST, OK} = require("../../constant/StatusCode");

const ArticleCoordinatorController = {
    async ArticleContributionPage(req, res){

    },
    async AcceptArticle(req, res){
        const update_result =  await ArticleCoordinatorService.AcceptArticle(req)
        if(update_result){
            return res.status(200).json({code: OK, message: `updated article status successfully`})
        }
        return res.status(200).json({code: BAD_REQUEST, message: `updating article status failed`})
    },
    async ArticleDetailPage(req, res){
        const article = await ArticleCoordinatorService.GetArticleDetail(req)
        const comment_list = await CommentService.CommentList(req)
        const role = req.user.role
        const data = {
            page_title: 'Contribution',
            article,
            comment_list,
            role
        }
        return res.render(
            'coordinator/article/article-detail',
            {
                layout: 'layout/portal/portal',
                data
            }
        )
    }
}

module.exports = ArticleCoordinatorController